package com.example.Book.service;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    private String secretKey = "";

    public JWTService() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours expiry
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        if (token == null) {
            throw new IllegalArgumentException("Token cannot be null");
        }
        // Clean the token
        token = token.trim();
        if (token.isEmpty()) {
            throw new IllegalArgumentException("Token cannot be empty");
        }
        
        // Remove any whitespace
        if (token.contains(" ")) {
            token = token.replaceAll("\\s+", "");
        }
        
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            // Log the token for debugging (only first few characters)
            System.out.println("Validating token: " + token.substring(0, Math.min(token.length(), 10)) + "...");
            
            return Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            System.out.println("Token validation error: " + e.getMessage());
            throw new IllegalArgumentException("Invalid token format: " + e.getMessage());
        }
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        if (token == null || userDetails == null) {
            System.out.println("Token or userDetails is null");
            return false;
        }
        try {
            token = token.trim();
            final String userName = extractUserName(token);
            boolean isValid = userName.equals(userDetails.getUsername()) && !isTokenExpired(token);
            System.out.println("Token validation result: " + isValid + " for user: " + userName);
            return isValid;
        } catch (Exception e) {
            System.out.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
