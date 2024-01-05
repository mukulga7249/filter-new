let eventsData
$(document).ready(function() {
    // Extract movie title from the URL query parameters
    var urlParams = new URLSearchParams(window.location.search);
    var eventTitle = urlParams.get('title');

    fetch('../database/db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Process the data here
            eventsData = data.events;
            var selectedEventDetails = getEventDetailsByTitle(eventTitle);

            // Update the movie details content on the page
            displayEventDetails(selectedEventDetails);
            // Initial display of movies
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});

function getEventDetailsByTitle(title) {

    var selectedEvent = eventsData.find(function(event) {
        return event.title === title;
    });

    return selectedEvent || {}; // Return an empty object if no matching movie is found
}

function displayEventDetails(eventDetails) {
    var eventDetailsContainer = $('#event-details');
    

    var title = eventDetails.title;
    var category = eventDetails.category;
    var artist = eventDetails.artist;
    var date = eventDetails.date;
    var price = eventDetails.price;
    var imageSrc = eventDetails.img 


    var imageElement = $('<img class="event-image" src="' + imageSrc + '" alt="' + title + '">');

    eventDetailsContainer.append(imageElement);
    eventDetailsContainer.append('<h2>' + eventDetails.title + '</h2>');
    eventDetailsContainer.append('<p>Category: ' + category + '</p>');
    eventDetailsContainer.append('<p>Artist: ' + artist + '</p>');
    eventDetailsContainer.append('<p>Date: ' + date + '</p>');
    eventDetailsContainer.append('<p>Price: $' + price + '</p>');

    
}