document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function (e) {
            e.preventDefault();
            addEvent();
        });
    }
});

function loadEvents() {
    fetch('./events.json')
        .then(response => response.json())
        .then(events => {
            const eventContainer = document.querySelector('.events-container');
            if (eventContainer) {
                eventContainer.innerHTML = '';
                events.forEach(event => {
                    eventContainer.innerHTML += `
                        <div class="event-card">
                            <h2>${event.name}</h2>
                            <p>Date: ${event.date}</p>
                            <p>Price: $${event.price}</p>
                            <button onclick="purchaseTicket('${event.name}', ${event.price})">Buy Ticket</button>
                        </div>
                    `;
                });
            }
        });
}

function addEvent() {
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const price = document.getElementById('eventPrice').value;

    const newEvent = {
        name: name,
        date: date,
        price: parseInt(price)
    };

    fetch('./events.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message);
            document.getElementById('eventForm').reset();
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function purchaseTicket(eventName, eventPrice) {
    // Add your ticket purchase logic here
    alert(`Ticket purchased for ${eventName} at $${eventPrice}`);
}
