
let eventsData;

$(document).ready(function() {
    fetch('../database/db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            
            eventsData = data.events;

            displayEventResults(eventsData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


    $('#event-results').on('click', '.event', function() {

        var clickedTitle = $(this).find('h3').text();
        console.log('Clicked Title:', clickedTitle);
        var eventIndex = $(this).index();
        var selectedEvent = eventsData[eventIndex-1];
        window.location.href = 'event_details.html?title=' + encodeURIComponent(clickedTitle);
    });

    $('#event-tab').click(function() {
        $('html, body').animate({
            scrollTop: $('#events').offset().top
        }, 1000); 
    });
});


function searchEvents() {
    var category = $('#category').val();
    var artist = $('#artist').val();
    var date = $('#date').val();
    var price = $('#price').val();
    console.log("eventsData --->",eventsData )

    var filteredEvents = eventsData.filter(function (event) {
        return (
            (category === 'all' || event.category.toLowerCase().includes(category.toLowerCase())) &&
            (artist === '' || event.artist.toLowerCase().includes(artist.toLowerCase())) &&
            (date === '' || event.date === date) &&
            (price === '' || event.price <= price)
        );
    });

    displayEventResults(filteredEvents);
}

function displayEventResults(events) {
    var eventResultsContainer = $('#event-results');
    var loadingMessage = $('#loading-message');

    loadingMessage.text('');

    eventResultsContainer.empty();

    if (events.length === 0) {
        loadingMessage.text('No events found.');
        return;
    }

    var headlineSection = $('<section class="event-headline">');
    headlineSection.append('<h2> Events  || Now Showing </h2>');
    eventResultsContainer.append(headlineSection);

    events.forEach(function (event) {
        var title = event.title;
        var category = event.category;
        var artist = event.artist;
        var date = event.date;
        var price = event.price;
        var imageSrc = event.img 
        var eventElement = $('<div class="event">');
        
        var imageElement = $('<img class="event-image" src="'+ imageSrc + '" alt="' + event.title + '">');
        eventElement.append(imageElement);
        eventElement.append('<h3>' + title + '</h3>');
        eventElement.append('<p>Category: ' + category + '</p>');
        eventElement.append('<p>Artist: ' + artist + '</p>');
        eventElement.append('<p>Date: ' + date + '</p>');
        eventElement.append('<p>Price: $' + price + '</p>');

        eventResultsContainer.append(eventElement);
    });
}
