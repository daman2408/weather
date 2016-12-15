$.ajax({
  url:"https://api.wunderground.com/api/a496a438d6e77ae4/forecast/q/autoip.json",
  method: 'GET',
  success: function(data) {
    console.log(data);
  }
});

$.ajax({
  url:"https://api.wunderground.com/api/a496a438d6e77ae4/geolookup/q/autoip.json",
  method: 'GET',
  success: function(data) {
    var city = data.location.nearby_weather_stations.pws.station[0].neighborhood;
    console.log(city);
  }
});
