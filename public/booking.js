function loadBookings() {
  fetch("http://localhost:3000/api/bookings")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("bookings-table-body");
      if (!tableBody) {
        console.error("Element with ID 'bookings-table-body' not found.");
        return;
      }

      tableBody.innerHTML = ""; // Clear previous rows
      let count = 1;

      data.forEach((booking) => {
      
        const checkInDate = new Date(booking.checkin)
          .toISOString()
          .slice(0, 10); // "YYYY-MM-DD"
        const checkoutDate = new Date(booking.checkout)
          .toISOString()
          .slice(0, 10); // "YYYY-MM-DD"

        // Determine status color class
        let statusClass = "bg-gray-100 text-gray-800";
        if (booking.paymentStatus === "confirmed") {
          statusClass = "bg-green-100 text-green-800";
        } else if (booking.paymentStatus === "pending") {
          statusClass = "bg-yellow-100 text-yellow-800";
        } else if (booking.paymentStatus === "cancelled") {
          statusClass = "bg-red-100 text-red-800";
        }

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${count++}</td>
          <td>${booking.name}</td>
          <td>${booking.roomType}</td>
          <td>${checkInDate}</td>
          <td>${checkoutDate}</td>
          <td><span class="px-2 py-1 text-xs rounded-full ${statusClass}">
            ${booking.paymentStatus || "N/A"}
          </span></td>
          <td>
            <button class="text-green-600 hover:text-[#012305] mr-3">
              <i class="fas fa-eye"></i>
            </button>
            <button class="text-yellow-600 hover:text-yellow-900 mr-3">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-600 hover:text-red-900">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error loading bookings:", error);
    });
}
