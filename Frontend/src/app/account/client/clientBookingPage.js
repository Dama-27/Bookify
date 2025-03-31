import React, { useState, useEffect } from "react";
import {
  fetchServiceProviders,
  fetchServiceProviderDetails,
  createBooking,
} from "../../../services/api";
import { useNavigate } from "react-router-dom";

const ClientBookingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [serviceData, setServiceData] = useState(null);

  // State for calendar and booking
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Fetch service providers on component mount
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");

      if (!token || userRole !== "CONSUMER") {
        navigate("/Consumer/login");
        return false;
      }
      return true;
    };

    const fetchProviders = async () => {
      if (!checkAuthentication()) return;

      setLoading(true);
      try {
        const providers = await fetchServiceProviders();
        setServiceProviders(providers);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch service providers:", err);
        setError("Failed to fetch service providers. Please try again later.");
        setLoading(false);
      }
    };

    fetchProviders();
  }, [navigate]);

  // Fetch selected provider details
  useEffect(() => {
    const fetchProviderDetails = async () => {
      if (!selectedProvider) return;

      setLoading(true);
      try {
        const details = await fetchServiceProviderDetails(selectedProvider);

        // Convert the API data to match the component's expected format
        const formattedData = {
          providerName: details.name || details.username || "-",
          specialty: details.specialty || "-",
          qualification: details.qualification || "-",
          contactNumber: details.contactNumber || "-",
          workplace: details.workplace || "-",
          workHours: details.workHours || { start: "09:00", end: "17:00" },
          timePackages: details.timeSlots || 4,
          workingDays: details.workingDays || {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false,
          },
          address: details.address || {
            clinic: "-",
            district: "-",
            county: "-",
          },
        };

        setServiceData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch provider details:", err);
        setError("Failed to fetch provider details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProviderDetails();
  }, [selectedProvider]);

  // Function to check if a day is a working day
  const isWorkingDay = (date) => {
    if (!serviceData || !serviceData.workingDays) return false;

    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayName = daysOfWeek[date.getDay()];
    return serviceData.workingDays[dayName] === true;
  };

  // Function to generate time slots based on working hours and time packages
  const generateTimeSlots = (date) => {
    if (!date || !serviceData || !isWorkingDay(date)) return [];

    try {
      const startTime = serviceData.workHours?.start || "09:00";
      const endTime = serviceData.workHours?.end || "17:00";
      const timePackages = serviceData.timePackages || 4;

      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      const totalMinutes = endMinutes - startMinutes;

      // If invalid time range, return empty array
      if (totalMinutes <= 0) return [];

      const slotDuration = Math.floor(totalMinutes / timePackages);

      const slots = [];
      for (let i = 0; i < timePackages; i++) {
        const slotStartMinutes = startMinutes + i * slotDuration;
        const slotEndMinutes = slotStartMinutes + slotDuration;

        const slotStartHour = Math.floor(slotStartMinutes / 60);
        const slotStartMin = slotStartMinutes % 60;
        const slotEndHour = Math.floor(slotEndMinutes / 60);
        const slotEndMin = slotEndMinutes % 60;

        const formatTime = (h, m) =>
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        const slotStart = formatTime(slotStartHour, slotStartMin);
        const slotEnd = formatTime(slotEndHour, slotEndMin);

        slots.push({
          id: i,
          time: `${slotStart} - ${slotEnd}`,
          available: true, // You can add availability logic here
        });
      }

      return slots;
    } catch (err) {
      console.error("Error generating time slots:", err);
      return [];
    }
  };

  // Update time slots when date is selected
  useEffect(() => {
    if (selectedDate && serviceData) {
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
    }
  }, [selectedDate, serviceData]);

  // Next and previous month navigation
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Calendar generation
  const renderCalendar = () => {
    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const rows = [];
    let days = [];
    let day = startDate;

    // Days of week header
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Format the month name
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
    const monthName = monthFormatter.format(currentMonth);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const isToday = cloneDay.toDateString() === new Date().toDateString();
        const isCurrentMonth = cloneDay.getMonth() === currentMonth.getMonth();
        const isSelected =
          selectedDate &&
          cloneDay.toDateString() === selectedDate.toDateString();
        const isAvailable = isWorkingDay(cloneDay) && isCurrentMonth;

        days.push(
          <div
            key={cloneDay.toString()}
            className={`p-2 border text-center cursor-pointer ${
              isToday ? "bg-blue-500" : ""
            } ${isCurrentMonth ? "" : "text-gray-400"} ${
              isSelected ? "bg-blue-500 text-white" : ""
            } ${
              isAvailable
                ? "hover:bg-blue-400"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => isAvailable && setSelectedDate(cloneDay)}
          >
            {cloneDay.getDate()}
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {monthName} {currentMonth.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-2 bg-gray-200 rounded hover:bg-gray-500"
            >
              &lt;
            </button>
            <button
              onClick={nextMonth}
              className="p-2 bg-gray-100 rounded hover:bg-gray-500"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-black">
          {daysOfWeek.map((day) => (
            <div key={day} className="bg-cyan-200 text-center py-1 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="bg-cyan-300 gap-px">{rows}</div>
      </div>
    );
  };

  // Render time slots
  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const formattedDate = dateFormatter.format(selectedDate);

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">
          Available Time Slots for {formattedDate}
        </h3>
        {availableTimeSlots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableTimeSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`p-3 border rounded-md text-center cursor-pointer ${
                  selectedTimeSlot && selectedTimeSlot.id === slot.id
                    ? "bg-blue-500 text-white"
                    : "bg-blue-50 hover:bg-blue-100"
                }`}
              >
                {slot.time}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No available time slots for this date.
          </p>
        )}
      </div>
    );
  };

  // Handle booking submission
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedProvider) return;

    setLoading(true);
    try {
      // Format date for API
      const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD format

      const bookingData = {
        providerId: selectedProvider,
        appointmentDate: formattedDate,
        appointmentTime: selectedTimeSlot.time,
        status: "PENDING",
      };

      // Call API to create booking
      const result = await createBooking(bookingData);

      // Show success message
      alert("Your appointment has been booked successfully!");

      // Reset selection
      setSelectedDate(null);
      setSelectedTimeSlot(null);
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert(`Failed to book appointment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Render provider selection
  const renderProviderSelection = () => {
    return (
      <div className="rounded-lg shadow-md p-6 mb-6 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-200">
        <h2 className="text-xl font-semibold mb-4">
          Select a Service Provider
        </h2>

        {loading && (
          <p className="text-center py-4">Loading service providers...</p>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <div className="mt-2">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-200 hover:bg-red-300 text-red-800 px-4 py-1 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {serviceProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceProviders.map((provider) => (
              <div
                key={provider.id}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition ${
                  selectedProvider === provider.id
                    ? "bg-blue-50 border-blue-500"
                    : "bg-white"
                }`}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <h3 className="font-medium text-lg">
                  {provider.name || provider.username || "-"}
                </h3>
                <p className="text-gray-600">{provider.specialty || "-"}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {provider.address?.district || "-"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No service providers found.</p>
              <p className="text-sm text-gray-400 mt-1">
                Please try again later or contact support.
              </p>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-60 py-8">
      <div className="container mx-auto px-4 md:px-10 py-8 bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Client Booking Information</h1>
        </div>

        {/* Provider Selection */}
        {renderProviderSelection()}

        {/* Provider Details */}
        {serviceData && (
          <div className="rounded-lg shadow-md p-6 mb-6 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Provider Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Provider Name:</span>{" "}
                    {serviceData.providerName || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Specialty:</span>{" "}
                    {serviceData.specialty || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Qualification:</span>{" "}
                    {serviceData.qualification || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Workplace:</span>{" "}
                    {serviceData.workplace || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Contact Number:</span>{" "}
                    {serviceData.contactNumber || "-"}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Location Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Clinic/Location:</span>{" "}
                    {serviceData.address.clinic || "-"}
                  </p>
                  <p>
                    <span className="font-medium">District:</span>{" "}
                    {serviceData.address.district || "-"}
                  </p>
                  <p>
                    <span className="font-medium">County/City:</span>{" "}
                    {serviceData.address.county || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Available Days</h2>
              <div className="flex flex-wrap gap-2">
                {Object.keys(serviceData.workingDays).map((day) => (
                  <div
                    key={day}
                    className={`py-2 px-4 rounded-md ${
                      serviceData.workingDays[day]
                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                        : "bg-cyan-50 text-gray-600"
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
              <p className="bg-cyan-100 p-3 rounded-md inline-block">
                {serviceData.workHours?.start || "09:00"} -{" "}
                {serviceData.workHours?.end || "17:00"}
              </p>
            </div>
          </div>
        )}

        {/* Booking Calendar - only show if a provider is selected */}
        {serviceData && (
          <div className="rounded-lg shadow-md p-6 mb-6 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-200">
            <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
            <p className="mb-4">
              Please select a date and time slot for your appointment:
            </p>

            {renderCalendar()}
            {renderTimeSlots()}

            {selectedTimeSlot && (
              <div className="mt-6">
                <button
                  onClick={handleBookAppointment}
                  className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                >
                  Book Appointment for {selectedDate?.toDateString()} at{" "}
                  {selectedTimeSlot.time}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg shadow-md p-6 mb-6 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-200">
          <h2 className="text-xl font-semibold mb-4">
            Client Booking Instructions
          </h2>
          <div className="bg-cyan-100 p-4 rounded-md">
            <ol className="list-decimal list-inside space-y-2">
              <li>Select a service provider from the list</li>
              <li>
                Select an available date in the calendar (highlighted dates)
              </li>
              <li>Choose a time slot from the available options</li>
              <li>
                Click the "Book Appointment" button to confirm your selection
              </li>
              <li>Wait for confirmation from the provider</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientBookingPage;
