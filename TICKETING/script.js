function purchaseTicket(eventName, price) {
    const ticket = {
        event: eventName,
        price: price,
        date: new Date().toLocaleString(),
        ticketId: generateTicketId()
    };
    
    localStorage.setItem('ticket', JSON.stringify(ticket));
    window.location.href = 'ticket.html';
}

function generateTicketId() {
    return 'TCKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function displayTicket() {
    const ticket = JSON.parse(localStorage.getItem('ticket'));

    if (ticket) {
        document.getElementById('event-name').innerText = ticket.event;
        document.getElementById('event-date').innerText = ticket.date;
        document.getElementById('ticket-id').innerText = ticket.ticketId;
        generateBarcode(ticket.ticketId);
    }
}

function generateBarcode(ticketId) {
    const barcode = document.getElementById('barcode');
    JsBarcode(barcode, ticketId, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: true
    });
}






//Admin
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
    fetch('data/events.json')
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

    fetch('data/events.json')
        .then(response => response.json())
        .then(events => {
            events.push(newEvent);

            return fetch('TICKETING/events.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(events)
            });
        })
        .then(() => {
            alert('Event added successfully!');
            eventForm.reset();
        })
        .catch(error => console.error('Error:', error));
}
