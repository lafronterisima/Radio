
	$(document).ready(function () {
		setUpSlider($('#slider1'));
	})

	function setUpSlider($container) {
		var pos = 0,
			slides = $container.find('.sliders'),
			numOfSlides = slides.length;

		function nextSlide() {
	
			slides[pos].video.stopVideo()
		
		}

		function previousSlide() {
			slides[pos].video.stopVideo()
	
		}

		$container.find('.left').click(previousSlide);
		$container.find('.right').click(nextSlide);
	}

	function onYouTubeIframeAPIReady() {
		$('.slide').each(function (index, slide) {
		
			var iframe = $(slide).find('.video')[0]
		
			slide.video = new YT.Player(iframe)
		})
	}

