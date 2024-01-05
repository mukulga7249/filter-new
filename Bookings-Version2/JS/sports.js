
let sportsData;

$(document).ready(function() {

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
            // Initial display of movies
            displaySportResults(sportsData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    $('#sport-results').on('click', '.sport', function() {

        var clickedTitle = $(this).find('h3').text();
    
        // You can also get other details like category, artist, etc.
        // Add more details as needed...
    
        // Log or use the extracted details as needed
        console.log('Clicked Title:', clickedTitle);
        var sportIndex = $(this).index();
        var selectedSport = sportsData[sportIndex-1];

        // Redirect to the movie details page with the selected movie data
        window.location.href = 'sport_details.html?title=' + encodeURIComponent(clickedTitle);
    });
});

    // Smooth scroll to the movie section when the movie tab is clicked
    $('#sport-tab').click(function() {
        $('html, body').animate({
            scrollTop: $('#sports').offset().top
        }, 1000); // You can adjust the scroll speed (in milliseconds)
    });


function searchSports() {
    var category = $('#category').val();
    var date = $('#date').val();
    var price = $('#price').val();
    console.log("sportsData --->",sportsData )

    var filteredSport = sportsData.filter(function (sport) {
        return (
            (category === 'all' || sport.category.toLowerCase().includes(category.toLowerCase())) &&
            (date === '' || sport.date === date) &&
            (price === '' || sport.price <= price)
        );
    });

    displaySportResults(filteredSport);
}

function displaySportResults(sports) {
    var sportResultsContainer = $('#sport-results');
    var loadingMessage = $('#loading-message');

    loadingMessage.text('');

    sportResultsContainer.empty();

    if (sports.length === 0) {
        loadingMessage.text('No sports found.');
        return;
    }

    var headlineSection = $('<section class="sport-headline">');
    headlineSection.append('<h2> Sports  || Now Showing </h2>');
    sportResultsContainer.append(headlineSection);

    sports.forEach(function (sport) {
        var title = sport.title;
        var category = sport.category;
        var date = sport.date;
        var price = sport.price;
        var imageSrc = sport.img 
        var sportElement = $('<div class="sport">');

        var imageElement = $('<img class="sport-image" src="'+ imageSrc + '" alt="' + sport.title + '">');
        sportElement.append(imageElement);
        sportElement.append('<h3>' + title + '</h3>');
        sportElement.append('<p>Category: ' + category + '</p>');
        sportElement.append('<p>Date: ' + date + '</p>');
        sportElement.append('<p>Price: $' + price + '</p>');

        sportResultsContainer.append(sportElement);
    });
}
