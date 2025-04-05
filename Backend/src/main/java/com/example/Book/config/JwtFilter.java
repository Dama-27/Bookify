package com.example.Book.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.Book.service.JWTService;
import com.example.Book.service.MyUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Log the request path for debugging
        System.out.println("Processing request: " + request.getMethod() + " " + request.getRequestURI());

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7).trim();
                if (!token.isEmpty()) {
                    try {
                        // Log the token for debugging (only first few characters)
                        System.out.println("Received token: " + token.substring(0, Math.min(token.length(), 10)) + "...");
                        
                        // Check if token contains whitespace
                        if (token.contains(" ")) {
                            System.out.println("Token contains whitespace, removing...");
                            token = token.replaceAll("\\s+", "");
                        }
                        
                        username = jwtService.extractUserName(token);
                        System.out.println("Username Extracted: " + username);
                    } catch (Exception e) {
                        System.out.println("Token validation error: " + e.getMessage());
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("{\"error\": \"Invalid token: " + e.getMessage() + "\"}");
                        return;
                    }
                } else {
                    System.out.println("Empty token after Bearer prefix");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\": \"Empty token\"}");
                    return;
                }
            } else {
                // For debugging purposes, log when no auth header is present
                // This is normal for public endpoints
                if (!request.getRequestURI().contains("/auth/") && 
                    !request.getRequestURI().contains("/uploads/") && 
                    !request.getRequestURI().contains("/images/")) {
                    System.out.println("No Authorization header for: " + request.getRequestURI());
                }
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);
                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("Token validated successfully for user: " + username);
                } else {
                    System.out.println("Token validation failed for user: " + username);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\": \"Token validation failed\"}");
                    return;
                }
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            System.out.println("Error in JWT filter: " + e.getMessage());
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Authentication error: " + e.getMessage() + "\"}");
        }
    }
}
