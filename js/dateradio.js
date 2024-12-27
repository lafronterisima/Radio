
 
document.addEventListener('DOMContentLoaded', function() {
    var radioPlayer = document.getElementById('track');
    var radioSource = document.getElementClass('radioSource');
    
    var regularStreamUrl = 'https://stream.zeno.fm/t100n9re6bruv';
    var specialStreamUrl = 'https://play8.tikast.com/proxy/lucas?mp=/stream';
    
    function getCurrentDay() {
        return new Date().getDay(); 
    }
    
    function getCurrentHour() {
        return new Date().getHours(); 
    }
    
    function isFridayBetween21And23() {
        var currentDay = getCurrentDay();
        var currentHour = getCurrentHour();
        return currentDay === 4 && currentHour >= 21 && currentHour < 23;
    }
    
     function updateStream() {
        if (isFridayBetween21And23()) {
            radioSource.src = specialStreamUrl;
        } else {
            radioSource.src = regularStreamUrl;
        }
        radioPlayer.load(); 
        radioPlayer.play(); 
    }

    function scheduleStreamUpdate() {
        var now = new Date();
        var updateInterval = 60 * 1000; 

        function checkTime() {
            updateStream();
            setTimeout(checkTime, updateInterval);
        }

        checkTime();
    }

    scheduleStreamUpdate();
});
