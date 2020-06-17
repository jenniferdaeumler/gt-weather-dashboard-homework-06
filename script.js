$(document).ready(function () {
    
var currentDate = moment().format("L");
$("#current-city").append(currentDate);
//   function displayLocationCurrentWeather() {


//     var queryURL =
//       "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=9ac0eaae4cb7573a493c5ffeea19100f";

//     $.ajax({
//       url: queryURL,
//       method: "GET",
//     }).then(function (response) {
//       console.log(response);
//     });





//     // //Search for city, display on screen
//     // $("search-button").on("click", function (event) {
//     //   event.preventDefault();
//     //   // This line of code will grab the input from the textbox
//     //   var cityName = $("#search-input").val().trim();
//     //   console.log(cityName);
//     // });
//   }
//   displayLocationCurrentWeather();
  //five day forcast in a loop
});
