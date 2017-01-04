
  navigator.geolocation.getCurrentPosition(function(pos) {
    var doc = document.body;
    var celsius = '°C';
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;
    /* MAKING CALLS TO WEATHER UNDERGROUND API */
        //get current weather conditions
        $.ajax({
          url:"https://api.wunderground.com/api/a496a438d6e77ae4/conditions/q/" + lat + "," + lng +  ".json",
          method: "GET",
          success: function(data) {

            var cityName = data.current_observation.display_location.city;
            var currentTemperature = data.current_observation.temp_c;
            var feelsLike = data.current_observation.feelslike_c;
            var weatherCondition = data.current_observation.weather;

            $('#currentTemperature').text(Math.round(data.current_observation.temp_c) + celsius);
            $('#feels-like').text('Feels like ' +  feelsLike + celsius);
            $('#current-weather-condition').text(weatherCondition);

          }
        });

        // $.ajax({
        //   url:"https://api.wunderground.com/api/a496a438d6e77ae4/forecast/q/" + lat + "," + lng +  ".json",
        //   method: 'GET',
        //   success: function(data) {
        //
        //     for (var i = 0; i < 3; i++) {
        //       var day_temp = data.
        //     }
        //
        //
        //
        //     console.log(data);
        //   }
        // });

        //get the hourly forecast
        $.ajax({
          url:"https://api.wunderground.com/api/a496a438d6e77ae4/hourly/q/" + lat + "," + lng +  ".json",
          method: 'GET',
          success: function(data) {

            //display hourly forecast
            for (var i = 0; i < 3; i++) {
              var hour_temp = data.hourly_forecast[i].temp.metric + celsius;
              var hour_time = data.hourly_forecast[i].FCTTIME.civil;
              var hour_conditions = data.hourly_forecast[i].condition;
              var feelsLike = 'Feels like ' + data.hourly_forecast[i].feelslike.metric + celsius;

              // set the weather icon
              var hourly_weather_icon = data.hourly_forecast[i].icon_url;
              var safe_url = hourly_weather_icon.replace(/http/, 'https');
              doc.getElementsByClassName('hourly-weather-icon')[i].src = safe_url;

              // set the time
              doc.getElementsByClassName('hourTime')[i].innerHTML = hour_time;

              //s et the temperature
              doc.getElementsByClassName('hour_temp')[i].innerHTML = hour_temp;

              // set the condition e.g.'Cloudy'
              doc.getElementsByClassName('weather-condition')[i].innerHTML = hour_conditions;

              // set the 'feels like' temperature
              doc.getElementsByClassName('hourly-feels-like')[i].innerHTML = feelsLike;
            };

            // display 36 hour forecast
            // loop through the data and pull only the 12, 24, and 36th hour data
            var thirtySixHours = new Array();

            for (var i = 11; i < data.hourly_forecast.length; i+=12) {
              thirtySixHours.push(data.hourly_forecast[i]);
            };
            // loop through the thirtySixHours array
            for (var i = 0; i < thirtySixHours.length; i++) {
              // set the weather icon, request with https instead of http
              let unSafe_url = thirtySixHours[i].icon_url;
              let safe_url = unSafe_url.replace(/http/, 'https');
              doc.getElementsByClassName('thirtySix-weather-icon')[i].src = safe_url;

              // set the time
              doc.getElementsByClassName('thirtySixTimeOfDay')[i].innerHTML = thirtySixHours[i].FCTTIME.civil;

              // set the temperature
              doc.getElementsByClassName('thirtySixTemperature')[i].innerHTML = thirtySixHours[i].temp.metric + celsius;

              // set the weather condition
              doc.getElementsByClassName('thirtySix-weather-condition')[i].innerHTML = thirtySixHours[i].condition;

              // set the 'feels like' text
              doc.getElementsByClassName('thirtySix-feels-like')[i].innerHTML = 'Feels like ' + thirtySixHours[i].feelslike.metric + celsius;

            }
          }
        });

        //get the daily forecast. this will be used to generate the 14 Day forecast
        $.ajax({
          url:"https://api.wunderground.com/api/a496a438d6e77ae4/forecast10day/q/" + lat + "," + lng +  ".json",
          method: 'GET',
          success: function(data) {
            for (var i = 0; i < 5; i++) {
              var dayOfWeek = data.forecast.simpleforecast.forecastday[i].date.weekday;
              var day_weather_icon = (data.forecast.simpleforecast.forecastday[i].icon_url).replace(/http/, 'https');
              var day_temp_high = data.forecast.simpleforecast.forecastday[i].high.celsius + celsius;
              var day_temp_low = data.forecast.simpleforecast.forecastday[i].low.celsius + celsius;
              var day_weather_condition = data.forecast.simpleforecast.forecastday[i].conditions;

              // set the day of the week title-div
              doc.getElementsByClassName('day')[i].innerHTML = dayOfWeek;

              // set the weather icon for the day
              doc.getElementsByClassName('daily-weather-icon')[i].src = day_weather_icon;

              // inject daily high and low
              doc.getElementsByClassName('daily_temp_high')[i].innerHTML = '<small class="text-muted">High: </small>' + day_temp_high;
              doc.getElementsByClassName('daily_temp_low')[i].innerHTML = '<small class="text-muted">Low: </small>' + day_temp_low;

              // inject weather condition for the day
              doc.getElementsByClassName('daily-weather-condition')[i].innerHTML = day_weather_condition;

            }
          }
        });

        // get the location based on the browser's geolocation object
        $.ajax({
          url:"https://api.wunderground.com/api/a496a438d6e77ae4/geolookup/q/" + lat + "," + lng +  ".json",
          method: 'GET',
          success: function(data) {
            var city = data.location.city;
            $('#city').text(city);
          }
        });

  });
