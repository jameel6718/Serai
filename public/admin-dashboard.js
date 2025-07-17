
        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize Chart.js for occupancy chart
            initializeCharts();
            
            // Close modal when clicking outside
            document.querySelectorAll('.fixed').forEach(el => {
                el.addEventListener('click', e => {
                    if (e.target === el) {
                        el.classList.add('hidden');
                    }
                });
            });

            // Toggle user dropdown
            document.getElementById('user-menu-button').addEventListener('click', function() {
                document.getElementById('user-menu').classList.toggle('hidden');
            });
        });

        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('-translate-x-full');
        }

        // Simple routing between sections
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('main > div').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Show the selected section
            document.getElementById(`${sectionId}-section`).classList.remove('hidden');
            
            // Update the page title
            document.getElementById('page-title').textContent = sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/-/g, ' ');
        }

        function showAddBookingModal() {
            document.getElementById('add-booking-modal').classList.remove('hidden');
        }

        function showAddRoomModal() {
            document.getElementById('add-room-modal').classList.remove('hidden');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
        }

        function showAlert(message, type = 'success') {
            const alert = document.getElementById('alert');
            const alertMessage = document.getElementById('alert-message');
            
            alert.classList.remove('hidden');
            alertMessage.textContent = message;
            
            if (type === 'success') {
                alert.className = 'alert bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4';
            } else if (type === 'error') {
                alert.className = 'alert bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4';
            }
            
            setTimeout(() => {
                alert.classList.add('hidden');
            }, 5000);
        }

        function initializeCharts() {
            const ctx = document.getElementById('occupancy-chart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Occupied', 'Available', 'Maintenance'],
                    datasets: [{
                        data: [45, 40, 15],
                        backgroundColor: [
                            '#3B82F6',
                            '#10B981',
                            '#F59E0B'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Sample function to save new booking
        function saveNewBooking() {
            // In a real app, this would send data to a server
            showAlert('Booking created successfully!');
            closeModal('add-booking-modal');
        }

        // Sample function to save new room
        function saveNewRoom() {
            // In a real app, this would send data to a server
            showAlert('Room added successfully!');
            closeModal('add-room-modal');
        }

        
