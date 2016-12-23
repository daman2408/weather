
//get current weather conditions
$.ajax({
  url:"https://api.wunderground.com/api/a496a438d6e77ae4/conditions/q/autoip.json",
  method: "GET",
  success: function(data) {
    console.log(data);

    var currentTemperature = data.current_observation.temp_c;
    var feelsLike = data.current_observation.feelslike_c;
    var weatherCondition = data.current_observation.weather;
    $('#currentTemperature').text(Math.round(data.current_observation.temp_c) + '°C');
    $('#feels-like').text('Feels like ' +  feelsLike + '°C');
    $('#current-weather-condition').text(weatherCondition)
  }
});


//get the forecast
$.ajax({
  url:"https://api.wunderground.com/api/a496a438d6e77ae4/forecast/q/autoip.json",
  method: 'GET',
  success: function(data) {
    console.log(data);
  }
});

//get local information
$.ajax({
  url:"https://api.wunderground.com/api/a496a438d6e77ae4/geolookup/q/autoip.json",
  method: 'GET',
  success: function(data) {
    var city = data.location.nearby_weather_stations.pws.station[0].neighborhood;
    console.log(data);
  }
});
