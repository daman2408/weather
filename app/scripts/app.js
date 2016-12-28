
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


        //get the daily forecast
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
            // var hour1_temp = data.hourly_forecast[0].temp.metric + '°C';
            // var hour1_time = data.hourly_forecast[0].FCTTIME.civil;
            //
            // var hour2_temp = data.hourly_forecast[1].temp.metric + '°C';
            // var hour2_time = data.hourly_forecast[1].FCTTIME.civil;
            //
            // var hour3_temp = data.hourly_forecast[2].temp.metric + '°C';
            // var hour3_time = data.hourly_forecast[2].FCTTIME.civil;
            //
            // $('#hour1').text(hour1_time);
            // $('#hour1_temp').text(hour1_temp);
            //
            // $('#hour2').text(hour2_time);
            // $('#hour2_temp').text(hour2_temp);
            //
            // $('#hour3').text(hour3_time);
            // $('#hour3_temp').text(hour3_temp);

            for (var i = 0; i < 3; i++) {
              var hour_temp = data.hourly_forecast[i].temp.metric + '°C';
              var hour_time = data.hourly_forecast[i].FCTTIME.civil;
              var hour_conditions = data.hourly_forecast[i].condition;
              var feelsLike = 'Feels like ' + data.hourly_forecast[i].feelslike.metric + '°C';

              document.body.getElementsByClassName('hourTime')[i].innerHTML = hour_time;
              document.body.getElementsByClassName('hour_temp')[i].innerHTML = hour_temp;
              document.body.getElementsByClassName('weather-condition')[i].innerHTML = hour_conditions;
              document.body.getElementsByClassName('hourly-feels-like')[i].innerHTML = feelsLike;
            }

            console.log(data);

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
