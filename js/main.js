simplySlider = () => {
    var nextBtn = document.querySelector(".gallery .buttons .next");
    var prevBtn = document.querySelector(".gallery .buttons .prev");
    var slide = document.querySelectorAll(".gallery .photos .block");
    var i = 0;

    function sliderAuto(time) {
        setInterval(next, time);
    };


    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        previous();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        next();
    });

    function previous() {
        slide[i].classList.remove("active");
        i--;
        if (i < 0) {
            i = slide.length - 1;
        }
        slide[i].classList.add("active");
    }


    function next() {
        slide[i].classList.remove("active");
        i++;
        if (i >= slide.length) {
            i = 0;
        }
        slide[i].classList.add("active");
    }

    slider();
}

document.addEventListener('DOMContentLoaded', simplySlider);