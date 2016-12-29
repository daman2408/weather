
  navigator.geolocation.getCurrentPosition(function(pos) {
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;
    /* MAKING CALLS TO WEATHER UNDERGROUND API */
        //get current weather conditions
        $.ajax({
          url:"https://api.wunderground.com/api/a496a438d6e77ae4/conditions/q/autoip.json",
          method: "GET",
          success: function(data) {

            var cityName = data.current_observation.display_location.city;
            var currentTemperature = data.current_observation.temp_c;
            var feelsLike = data.current_observation.feelslike_c;
            var weatherCondition = data.current_observation.weather;

            $('#currentTemperature').text(Math.round(data.current_observation.temp_c) + '°C');
            $('#feels-like').text('Feels like ' +  feelsLike + '°C');
            $('#current-weather-condition').text(weatherCondition);

          }
        });


        //get the daily forecast. this will be used to generate the 36-hour forecast
        $.ajax({
          url:"https://api.wunderground.com/api/a496a438d6e77ae4/forecast/q/autoip.json",
          method: 'GET',
          success: function(data) {
            console.log(data);
          }
        });

        //get the hourly forecast
        $.ajax({
          url:"https://api.wunderground.com/api/a496a438d6e77ae4/hourly/q/autoip.json",
          method: 'GET',
          success: function(data) {

            //display hourly forecast
            for (var i = 0; i < 3; i++) {
              var doc = document.body;
              var hour_temp = data.hourly_forecast[i].temp.metric + '°C';
              var hour_time = data.hourly_forecast[i].FCTTIME.civil;
              var hour_conditions = data.hourly_forecast[i].condition;
              var feelsLike = 'Feels like ' + data.hourly_forecast[i].feelslike.metric + '°C';

              doc.getElementsByClassName('hourTime')[i].innerHTML = hour_time;
              doc.getElementsByClassName('hour_temp')[i].innerHTML = hour_temp;
              doc.getElementsByClassName('weather-condition')[i].innerHTML = hour_conditions;
              doc.getElementsByClassName('hourly-feels-like')[i].innerHTML = feelsLike;
            };

            //display 36 hour forecast
            //loop through the data and pull only the 12, 24, and 36th hour data
            var thirtySixHours = new Array();
            for (var i = 11; i < data.hourly_forecast.length; i+=12) {
              thirtySixHours.push(data.hourly_forecast[i]);
            };

            for (var i = 0; i < thirtySixHours.length; i++) {
              doc.getElementsByClassName('thirtySixTimeOfDay')[i].innerHTML = thirtySixHours[i].FCTTIME.weekday_name_night;
              doc.getElementsByClassName('thirtySixTemperature')[i].innerHTML = thirtySixHours[i].temp.metric + '°C';
            }

            console.log(thirtySixHours);

          }
        });

        //get the location
        $.ajax({
          url:"https://api.wunderground.com/api/a496a438d6e77ae4/geolookup/q/" + lat + "," + lng +  ".json",
          method: 'GET',
          success: function(data) {
            var city = data.location.city;
            $('#city').text(city);

            console.log(data);
          }
        });

  });
