$(document).ready(function(){

function displayLocationCurrentWeather(){

// var weatherLocation = 
// var queryURL = "https://:api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid={9ac0eaae4cb7573a493c5ffeea19100f}";

// var currentCity = $(this)
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName + "&appid=9ac0eaae4cb7573a493c5ffeea19100f";


$.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
  });

}
displayLocationCurrentWeather();
//five day forcast in a loop








});