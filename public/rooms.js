let selectedPrice = 0;

    function selectRoom(room, price) {
        document.getElementById('bookingTable').style.display = 'block';
        document.getElementById('roomType').innerText = room;
        document.getElementById('pricePerNight').innerText = `$${price}`;
        selectedPrice = price;

        // Reset form
        document.getElementById('checkin').value = '';
        document.getElementById('checkout').value = '';
        document.getElementById('totalDays').innerText = '';
        document.getElementById('totalPayment').innerText = '';
        document.getElementById('proceedBtn').classList.add('disabled');

        document.getElementById('bookingTable').scrollIntoView({ behavior: 'smooth' });
    }

    function calculateTotal() {
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;

        if (checkin && checkout && new Date(checkout) > new Date(checkin)) {
            const date1 = new Date(checkin);
            const date2 = new Date(checkout);
            const timeDiff = Math.abs(date2 - date1);
            const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            const totalPayment = totalDays * selectedPrice;

            document.getElementById('totalDays').innerText = totalDays;
            document.getElementById('totalPayment').innerText = `$${totalPayment}`;

            document.getElementById('proceedBtn').classList.remove('disabled');
        } else {
            document.getElementById('totalDays').innerText = '';
            document.getElementById('totalPayment').innerText = '';
            document.getElementById('proceedBtn').classList.add('disabled');
        }
    }