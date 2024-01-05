
  function addMovie() {
      const form = document.getElementById('movieForm');
      console.log(form, "FORMMMMx")
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
            const title = form.title.value;
            const category = form.category.value;
            const language = form.language.value;
            const artist = form.artist.value;
            const date = form.date.value;
            const price = parseFloat(form.price.value);
            const img = form.img.value;
        
            // Add new movie object to the movies array
            moviesData.push({ title, category, language, artist, date, price, img });
        
            // Display a success message (you can customize this part)
            alert('Movie added successfully!');
            console.log("moviesData ----->", moviesData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      
      // Get values from the form

  
      // You can optionally clear the form fields after adding
      form.reset();
  }
  