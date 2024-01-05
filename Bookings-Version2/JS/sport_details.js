
let sportsData
$(document).ready(function() {
    // Extract movie title from the URL query parameters
    var urlParams = new URLSearchParams(window.location.search);
    var sportTitle = urlParams.get('title');

    fetch('../database/db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Process the data here
            sportsData = data.sports;
            var selectedSportDetails = getSportDetailsByTitle(sportTitle);

            // Update the movie details content on the page
            displaySportDetails(selectedSportDetails);
            // Initial display of movies
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});

function getSportDetailsByTitle(title) {

    var selectedSport = sportsData.find(function (sport) {
        return sport.title === title;
    });

    return selectedSport || {}; // Return an empty object if no matching movie is found
}

function displaySportDetails(sportDetails) {
    var sportDetailsContainer = $('#sport-details');


    var title = sportDetails.title;
    var category = sportDetails.category;
    var date = sportDetails.date;
    var price = sportDetails.price;
    var imageSrc = sportDetails.img 


    var imageElement = $('<img class="sport-image" src="' + imageSrc + '" alt="' + title + '">');

    sportDetailsContainer.append(imageElement);
    sportDetailsContainer.append('<h2>' + sportDetails.title + '</h2>');
    sportDetailsContainer.append('<p>Category: ' + category + '</p>');
    sportDetailsContainer.append('<p>Date: ' + date + '</p>');
    sportDetailsContainer.append('<p>Price: $' + price + '</p>');

}