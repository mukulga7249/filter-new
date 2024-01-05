
let moviesData; 

$(document).ready(function () {
    // Fetch movie data from JSON file
    fetch('../database/db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Process the data here
            moviesData = data.movies;
            // Initial display of movies
            displayMovieResults(moviesData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Event listener for movie clicks
    $('#movie-results').on('click', '.movie', function () {
        var clickedTitle = $(this).find('h3').text();
        // ... (unchanged code)
        console.log('Clicked Title:', clickedTitle);
        var movieIndex = $(this).index();
        var selectedMovie = moviesData[movieIndex-1];
        // Redirect to the movie details page with the selected movie data
        window.location.href = 'movie_details.html?title=' + encodeURIComponent(clickedTitle);
    });

    // Smooth scroll to the movie section when the movie tab is clicked
    $('#movie-tab').click(function () {
        $('html, body').animate({
            scrollTop: $('#movies').offset().top
        }, 1000);
    });
});

function searchMovies() {
    var category = $('#category').val();
    var artist = $('#artist').val();
    var date = $('#date').val();
    var price = $('#price').val();
    var language = $('#language').val();
    // console.log("moviesData --->",moviesData )

    var filteredMovies = moviesData.filter(function (movie) {
        return (
            (category === 'all' || movie.category.toLowerCase().includes(category.toLowerCase())) &&
            (language === 'all' || movie.language.toLowerCase().includes(language.toLowerCase())) &&
            (artist === '' || movie.artist.toLowerCase().includes(artist.toLowerCase())) &&
            (date === '' || movie.date === date) &&
            (price === '' || movie.price <= price)
        );
    });

    displayMovieResults(filteredMovies);
}

function displayMovieResults(movies) {
    var movieResultsContainer = $('#movie-results');
    var loadingMessage = $('#loading-message');

    loadingMessage.text('');


    movieResultsContainer.empty();
   

    if (movies.length === 0) {
        loadingMessage.text('No movies found.');
        return;
    }

    var headlineSection = $('<section class="movie-headline">');
    headlineSection.append('<h2> Movies  || Now Showing </h2>');
    movieResultsContainer.append(headlineSection);

    movies.forEach(function (movie) {
        var title = movie.title;
        var category = movie.category;
        var artist = movie.artist;
        var date = movie.date;
        var price = movie.price;
        var imageSrc = movie.img 
        var movieElement = $('<div class="movie">');
        // var imageSrc = movieImages[movie.title]
        var imageElement = $('<img class="movie-image" src="'+ imageSrc + '" alt="' + movie.title + '">');
        movieElement.append(imageElement);
        movieElement.append('<h3>' + title + '</h3>');
        movieElement.append('<p>Category: ' + category + '</p>');
        movieElement.append('<p>Artist: ' + artist + '</p>');
        movieElement.append('<p>Date: ' + date + '</p>');
        movieElement.append('<p>Price: $' + price + '</p>');

        movieResultsContainer.append(movieElement);
    });
}
