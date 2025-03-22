document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.slider');
    let slideIndex = 0;
    let autoSlideIntervalId;

    function showSlide(index) {
        const totalSlides = slider.children.length;
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }

        slider.style.transform = `translateX(${-index * 100}%)`;
        slideIndex = index;

        // Restart the 7-second timer when the picture changes manually
        clearInterval(autoSlideIntervalId);
        startAutoSlide();
    }

    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    function prevSlide() {
        showSlide(slideIndex - 1);
    }

    function startAutoSlide() {
        autoSlideIntervalId = setInterval(() => {
            nextSlide();
        }, 7000);
    }

    startAutoSlide();

    document.querySelector('.left-arrow').addEventListener('click', function () {
        prevSlide();
    });

    document.querySelector('.right-arrow').addEventListener('click', function () {
        nextSlide();
    });
});
