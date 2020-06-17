$(document).ready(function () {
  var currentDate = moment().format("L");
  var apiKey = "1935f5d7d75a269680ddfadd7b264dcb";
  var searchInput = $("#search-input").val().trim();
  var previouslySearchedCities = localStorage.getItem(
    $("#search-input").val().trim()
  );
  $("#previous-search").append(previouslySearchedCities);

  $("#search-button").on("click", function (event) {
    $("#current-city").empty();
    event.preventDefault();
    var textValue = $(this).siblings("#search-input").val();
    var textKey = "City Searched";
    console.log(textKey, textValue);
    localStorage.setItem(textKey, textValue);
    // This line of code will grab the input from the textbox
    var searchInput = $("#search-input").val().trim();
    $("#current-city")
      .append(searchInput)
      .append(" " + currentDate);
    // $("#previous-search").addClass("<li>");
    // $("#previous-search").append("#search-input");
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchInput +
      "&units=imperial&appid=" +
      apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
    
      var tempEl = response.main.temp;
      var humidityEl = response.main.humidity;
      var windSpeedEl = response.wind.speed;
      var latEl = response.coord.lat;
      var longEl = response.coord.lon;
      $("#temperature").text(
        "Temperature: " + Math.round(tempEl) + String.fromCharCode(176) + "F"
      );
      $("#humidity").text("Humidity: " + humidityEl + "%");
      $("#wind-speed").text("Wind Speed: " + windSpeedEl + " MPH");
      
      var uviURL =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      latEl +
      "&lon=" +
      longEl +
      "&appid=" +
      apiKey;

      $.ajax({
        url: uviURL,
        method: "GET",
      }).then(function (response) {
        var uvIndexEl = response.value;
        $("#uv-index").text("UV Index: " + uvIndexEl);
    });
    //five day forcast in a loop
  });
})
});
