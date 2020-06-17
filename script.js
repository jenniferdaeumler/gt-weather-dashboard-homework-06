$(document).ready(function () {
  var currentDate = moment().format("L");
  var apiKey = "482946adea1a0b6915daedbe6e02b237";

  //Local storange display on left side, not working
  // var searchInput = $("#search-input").val().trim();
  var previouslySearchedCities = localStorage.getItem(
    $("#search-input").val().trim()
  );
  $("#previous-search").append(previouslySearchedCities);

  //Search for city
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

    //Current weather for city
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
      //UV index URL and vars
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
        //UV value and color coordination badge. Works on refresh, not just new search
        $("#uv-index").text("UV Index: " + uvIndexEl);
        if (uvIndexEl < 3) {
          $("#uv-index").addClass("badge badge-pill badge-success");
        } else if (uvIndexEl > 7) {
          $("#uv-index").addClass("badge badge-pill badge-danger");
        } else {
          $("#uv-index").addClass("badge badge-pill badge-warning");
        }
      });
      //five day forcast in a loop
    });

    var fiveDayUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=atlanta&units=imperial&appid=" +
      apiKey;
    $.ajax({
      url: fiveDayUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response.list[0].dt_txt);
      console.log(response.list[0].main.temp);
      console.log(response.list[0].main.humidity);
    });
  });
});
