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
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchInput +
      "&units=imperial&appid=" +
      apiKey;
    console.log(fiveDayUrl);
    $.ajax({
      url: fiveDayUrl,
      method: "GET",
    }).then(function (response) {
      //   console.log(response.list[0].dt_txt);
      //   console.log(response.list[0].main.temp);
      //   console.log(response.list[0].main.humidity);
      //Day One Variables
      var dayOneDate = response.list[0].dt_txt;
      var dayOneTemp = response.list[0].main.temp;
      var dayOneHumidity = response.list[0].main.humidity;
      //Day Two Variables
      var dayTwoDate = response.list[2].dt_txt;
      var dayTwoTemp = response.list[2].main.temp;
      var dayTwoHumidity = response.list[2].main.humidity;
      //Day Three Variables
      var dayThreeDate = response.list[10].dt_txt;
      var dayThreeTemp = response.list[10].main.temp;
      var dayThreeHumidity = response.list[10].main.humidity;
      //Day Four Variables
      var dayFourDate = response.list[17].dt_txt;
      var dayFourTemp = response.list[17].main.temp;
      var dayFourHumidity = response.list[17].main.humidity;
      //Day Five Variables
      var dayFiveDate = response.list[25].dt_txt;
      var dayFiveTemp = response.list[25].main.temp;
      var dayFiveHumidity = response.list[25].main.humidity;
      //Day One Text
      $("#day1-date").text(dayOneDate);
      $("#day1-temp").text(
        "Temp: " + dayOneTemp + String.fromCharCode(176) + "F"
      );
      $("day1-humidity").text("Humidity: " + dayOneHumidity + "%");
      //Day Two Text
      $("#day2-date").text(dayTwoDate);
      $("#day2-temp").text(
        "Temp: " + dayTwoTemp + String.fromCharCode(176) + "F"
      );
      $("day2-humidity").text("Humidity: " + dayTwoHumidity + "%");
      //Day Three Text
      $("#day3-date").text(dayThreeDate);
      $("#day3-temp").text(
        "Temp: " + dayThreeTemp + String.fromCharCode(176) + "F"
      );
      $("day3-humidity").text("Humidity: " + dayThreeHumidity + "%");
      //Day Four Text
      $("#day4-date").text(dayFourDate);
      $("#day4-temp").text(
        "Temp: " + dayFourTemp + String.fromCharCode(176) + "F"
      );
      $("day4-humidity").text("Humidity: " + dayFourHumidity + "%");
      //Day Five Text
      $("#day5-date").text(dayFiveDate);
      $("#day5-temp").text(
        "Temp: " + dayFiveTemp + String.fromCharCode(176) + "F"
      );
      $("day5-humidity").text("Humidity: " + dayFiveHumidity + "%");

      $;
    });
  });
});
