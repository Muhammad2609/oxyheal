let reviewIndex = 0;

        function showReview(index) {
            const slider = document.querySelector('.review-slider');
            const cards = document.querySelectorAll('.review-card');
            const cardWidth = cards[0].offsetWidth;

            if (index < 0) {
                index = cards.length - 1;
            } else if (index >= cards.length) {
                index = 0;
            }

            slider.style.transform = `translateX(${-index * cardWidth}px)`;
            reviewIndex = index;
        }

        function nextReview() {
            showReview(reviewIndex + 1);
        }

        function prevReview() {
            showReview(reviewIndex - 1);
        }

        setInterval(() => {
            nextReview();
        }, 5000);