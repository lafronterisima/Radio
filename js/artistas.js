        
		document.addEventListener('DOMContentLoaded', () => {
            const sliders = document.querySelectorAll('.sliders');

            sliders.forEach(slider => {
                const slides = slider.querySelectorAll('.slides');
                const prevButton = slider.querySelector('.prev');
                const nextButton = slider.querySelector('.next');
                let currentSlide = 0;

                function showSlide(index) {
                    if (index >= slides.length) {
                        currentSlide = 0;
                    } else if (index < 0) {
                        currentSlide = slides.length - 1;
                    } else {
                        currentSlide = index;
                    }
                    slides.forEach((slide, i) => {
                        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
                    });
                }

                prevButton.addEventListener('click', () => {
                    showSlide(currentSlide - 1);
                });

                nextButton.addEventListener('click', () => {
                    showSlide(currentSlide + 1);
                });

          
            });
        });
   