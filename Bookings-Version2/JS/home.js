$(document).ready(function () {
        const carousel = document.getElementById('carousel');
        let currentIndex = 0;

        function showNext() {
            currentIndex = (currentIndex + 1) % 6; 
            updateCarousel();
        }

        function showPrevious() {
            currentIndex = (currentIndex - 1 + 3) % 6; 
            updateCarousel();
        }

        function updateCarousel() {
            const translateValue = -currentIndex * 100 + '%';
            carousel.style.transform = 'translateX(' + translateValue + ')';
        }

        setInterval(showNext, 2000);
        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                showPrevious();
            } else if (event.key === 'ArrowRight') {
                showNext();
            }
        });
})

function redirectToMoviePage(moviePage) {
    window.location.href = moviePage;
}