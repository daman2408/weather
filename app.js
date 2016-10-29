
//Open Weather API Key f75a34c7674064d2fa6102a437c7d9a5

// the url to send the request: api.openweathermap.org/data/2.5/weather?lat=43.22&lon=-79.65&APPID=f75a34c7674064d2fa6102a437c7d9a5

//Get Coordinates:
var showCurrentWeather = function() {
  if (!navigator.geolocation) {
    console.log("Could not get coordinates");
    return;
  }

  function success(position) {
      //getting the user's coordinates
      var key = "&APPID=f75a34c7674064d2fa6102a437c7d9a5";
      var longitude = position.coords.longitude;
      var latitude = position.coords.latitude;

      var weather = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + key;

      var threeHourForecast = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + key;

      var sevenDayForecast = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&cnt=7" + key;

      //the GET request using jQuery

      function handleWeather(data) {
        var stats = JSON.stringify(data);
        stats = JSON.parse(stats);

        //display info on page

        //City
        document.getElementById('cityName').innerHTML = stats.name;
        //weather description

        var wDescription = stats.weather[0].main;
        document.getElementById('weatherDescription').innerHTML = wDescription;

        //Current Temperature

        //convert kelvin to celsius
        var celsius = (Math.floor(stats.main.temp - 273.15)).toString() + "&#176" + "C";
        document.getElementById('currentTemp').innerHTML = celsius;

        //current weather condition
        var currCondition = stats.weather[0].description;
        document.getElementById('weatherCondition').innerHTML = currCondition;
      }

      //get three hour forecast for the next 12 hours

      function handleForecast(data) {
        var stats = data;
        var getHour = function() {
          return function(num) {
            var mSecs = stats.list[num].dt * 1000; //getting number of seconds from JSON and convert to milliseconds
            var theHour = (new Date(mSecs)).getHours();

            if (theHour <= 12) {
              return theHour.toString() + "am";
            } else {
              return (theHour - 12).toString() + "pm";
            }
          }
        }();

        //gets the temperature of the designated time slot in degrees celsius
        var getTemp = function() {
          return function(num) {
            return (Math.floor(stats.list[num].main.temp - 273.15) + "&#176" + "C");
          }
        }();


        document.getElementById('threeHours').innerHTML = getHour(0) + "<br>" + getTemp(0);
        document.getElementById('sixHours').innerHTML = getHour(1) + "<br>" + getTemp(1);
        document.getElementById('nineHours').innerHTML = getHour(2) + "<br>" + getTemp(2);
        document.getElementById('twelveHours').innerHTML = getHour(3) + "<br>" + getTemp(3);

      }

      function displayWeeklyForecast(data) {
        var stats = data;
        var date = (new Date(stats.list[0].dt * 1000)).toUTCString();
        var dayOneTemp = document.getElementById('dayOne');

        console.log(date.substr(0, 16));

        dayOneTemp.innerHTML = date.substr(0, 16);
        dayOneTemp.innerHTML += "<br />" + "max: " + (Math.floor(stats.list[0].temp.max - 273.15) + "&#176" + "C");
        dayOneTemp.innerHTML += "<br />" + "min: " + (Math.floor(stats.list[0].temp.min - 273.15) + "&#176" + "C");
        dayOneTemp.innerHTML += "<br />" + (stats.list[0].weather[0].description);

        //create a for loop that:

        /*
          1.loops through each day in the forecast dataset and:
          2. creates a div element with col-md-2 class
          3. adds textContent: the date (mm/dd), the max temperature, the min temperature, and weather description.
          4.

        */
      }


      $.ajax({
        url: weather,
        datatype: "jsonp",
        success: handleWeather
      });

      $.ajax({
        url: threeHourForecast,
        datatype: "jsonp",
        success: handleForecast
      });

      $.ajax({
        url: sevenDayForecast,
        datatype: "jsonp",
        success: displayWeeklyForecast
      });

}

  function error() {
    console.log('Sorry, there was an error.');
  }

  navigator.geolocation.getCurrentPosition(success, error);

}();


document.body.addEventListener("load", showCurrentWeather);
