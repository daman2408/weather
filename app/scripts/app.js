//google api call gets the most accurate gps coordinates, wrap the other api calls inside this so that the coordinates can be used
$.ajax({
  url:"https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDbfFdoar93pQWmiW2rDPptDsIbUg4xGZU",
  method: "POST",
  considerIp: false,
  success: function(data) {
    var longitude = data.location.lng;
    var latitude = data.location.lat;


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
        var hour1_temp = data.hourly_forecast[0].temp.metric + '°C';
        var hour1_time = data.hourly_forecast[0].FCTTIME.civil;
        var hour2_temp = data.hourly_forecast[1].temp.metric + '°C';
        var hour3_temp = data.hourly_forecast[2].temp.metric + '°C';

        $('#hour1').text(hour1_time);

      }
    });

    //get the location
    $.ajax({
      url:"https://api.wunderground.com/api/a496a438d6e77ae4/geolookup/q/" + latitude + "," + longitude +  ".json",
      method: 'GET',
      success: function(data) {
        var city = data.location.city;

        $('#city').text(city);

        console.log(data);
      }
    });

  },
  error: function(err) {
    console.log(err);
  }
});
