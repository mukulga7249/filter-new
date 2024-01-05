let moviesData
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var movieTitle = urlParams.get('title');

    fetch('../database/db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            moviesData = data.movies;
            var selectedMovieDetails = getMovieDetailsByTitle(movieTitle);
            displayMovieDetails(selectedMovieDetails);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});

function getMovieDetailsByTitle(title) {

    var selectedMovie = moviesData.find(function (movie) {
        return movie.title === title;
    });

    return selectedMovie || {};
}

function displayMovieDetails(movieDetails) {
    var movieDetailsContainer = $('#movie-details-content');

    var imageElement = $('<img class="movie-details-image" src="' + movieDetails.img + '" alt="' + movieDetails.title + '">');
    movieDetailsContainer.append(imageElement);
    movieDetailsContainer.append('<h2>' + movieDetails.title + '</h2>');
    movieDetailsContainer.append('<p>Category: ' + movieDetails.category + '</p>');
    movieDetailsContainer.append('<p>Language: ' + movieDetails.language + '</p>');
    movieDetailsContainer.append('<p>Artist: ' + movieDetails.artist + '</p>');
    movieDetailsContainer.append('<p>Date: ' + movieDetails.date + '</p>');
    movieDetailsContainer.append('<p>Price: $' + movieDetails.price + '</p>');

    var bookTicketsButton = $('<button id="book-tickets-btn">Book Tickets</button>');
    bookTicketsButton.on('click', function () {
        // Add your logic for booking tickets or navigate to a booking page
        alert('Booking Ticket is Under Process. Contact Admin. Thanks For Your Patience ');
    });
    movieDetailsContainer.append(bookTicketsButton);

    movieDetailsContainer.append('<h4>Cast</h4>');
    const castList = $('<ul class="cast-list">');


    movieDetails.cast.forEach(member => {
        const castItem = $(`
        <li>
            <a href="cast_detail.html?name=${encodeURIComponent(member.name)}" onclick="navigateToCastDetail('${encodeURIComponent(member.name)}')">
                <img src="${member.image}" alt="${member.name}">
                <p>${member.name}</p>
            </a>
        </li>
    `);
        castList.append(castItem);
    });

    movieDetailsContainer.append(castList);
}

function navigateToCastDetail(name) {
    window.location.href = 'castDetail.html?name=' + encodeURIComponent(name);
}