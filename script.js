$(document).ready(function () {
  var currentDate = moment().format("L");
  var apiKey = "482946adea1a0b6915daedbe6e02b237";

  //Local storange display on left side, NOT WORKING
  var previouslySearchedCities = localStorage.getItem(
    $("#search-input").val().trim()
  );
  $("#previous-search").append(previouslySearchedCities);

  //Search for city
  $("#search-button").on("click", function (event) {
    //Clears Header w/ City name for new searches
    $("#current-city").empty();
    //Attempt local storage.  Only saves on, replaces value with every new search
    event.preventDefault();
    var textValue = $(this).siblings("#search-input").val();
    var textKey = "City Searched";
    console.log(textKey, textValue);
    localStorage.setItem(textKey, textValue);

    // Variable that will be used for queryURl so we can search for city
    var searchInput = $("#search-input").val().trim();
    //Heading appended with current city and state.
    //Attemp to capitalize first letter.
    // searchInput.substr(0,1).toUpperCase()+searchInput.substr(1);
    $("#current-city")
      .append(searchInput)
      .append(" " + currentDate);

    //API query w/ city name variable inserted.
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchInput +
      "&units=imperial&appid=" +
      apiKey;
    //AJAX for current weather
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      //Variables for current city weather and UV index.
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
      //AJAX for UV index info, conditional for UV color badge
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
      //Five Day API url
    });

    var fiveDayUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchInput +
      "&units=imperial&appid=" +
      apiKey;
    //AJAX for five day forecast
    $.ajax({
      url: fiveDayUrl,
      method: "GET",
    }).then(function (response) {

      //Dates for Forecast Card Variables
      var dayOneDate = moment().format("L");
      var dayTwoDate = moment().add(1, "day");
      var dayThreeDate = moment().add(2, "day");
      var dayFourDate = moment().add(3, "day");
      var dayFiveDate = moment().add(4, "day");
      var forecastDate = moment().format("M/D/YYYY");
      //Day One Weather Variables
      // var dayOneDate = response.list[0].dt_txt;
      var dayOneTemp = response.list[0].main.temp;
      var dayOneHumidity = response.list[0].main.humidity;
      var dayOneIcon = response.list[0].weather[0].icon;
      var dayOneIconURL =
        "http://openweathermap.org/img/w/" + dayOneIcon + ".png";
      //Day Two Weather Variables
      // var dayTwoDate = response.list[2].dt_txt;
      var dayTwoTemp = response.list[2].main.temp;
      var dayTwoHumidity = response.list[2].main.humidity;
      var dayTwoIcon = response.list[2].weather[0].icon;
      var dayTwoIconURL =
        "http://openweathermap.org/img/w/" + dayTwoIcon + ".png";
      //Day Three Weather Variables
      // var dayThreeDate = response.list[10].dt_txt;
      var dayThreeTemp = response.list[10].main.temp;
      var dayThreeHumidity = response.list[10].main.humidity;
      var dayThreeIcon = response.list[10].weather[0].icon;
      var dayThreeIconURL =
        "http://openweathermap.org/img/w/" + dayThreeIcon + ".png";
      //Day Four Weather Variables
      // var dayFourDate = response.list[17].dt_txt;
      var dayFourTemp = response.list[17].main.temp;
      var dayFourHumidity = response.list[17].main.humidity;
      var dayFourIcon = response.list[17].weather[0].icon;
      var dayFourIconURL =
        "http://openweathermap.org/img/w/" + dayFourIcon + ".png";
      //Day Five Weather Variables
      // var dayFiveDate = response.list[25].dt_txt;
      var dayFiveTemp = response.list[25].main.temp;
      var dayFiveHumidity = response.list[25].main.humidity;
      var dayFiveIcon = response.list[25].weather[0].icon;
      var dayFiveIconURL =
        "http://openweathermap.org/img/w/" + dayFiveIcon + ".png";
      //Day One Text
      $("#day1-date").text(dayOneDate);
      $("#day-1-icon").attr("src", dayOneIconURL);
      $("#day1-temp").text(
        "Temp: " + dayOneTemp + String.fromCharCode(176) + "F"
      );
      $("#day1-humidity").text("Humidity: " + dayOneHumidity + "%");

      //Day Two Text
      $("#day2-date").text(dayTwoDate.format("M/D/YYYY"));
      $("#day-2-icon").attr("src", dayTwoIconURL);
      $("#day2-temp").text(
        "Temp: " + dayTwoTemp + String.fromCharCode(176) + "F"
      );
      $("#day2-humidity").text("Humidity: " + dayTwoHumidity + "%");

      //Day Three Text
      $("#day3-date").text(dayThreeDate.format("M/D/YYYY"));
      $("#day-3-icon").attr("src", dayThreeIconURL);
      $("#day3-temp").text(
        "Temp: " + dayThreeTemp + String.fromCharCode(176) + "F"
      );
      $("#day3-humidity").text("Humidity: " + dayThreeHumidity + "%");

      //Day Four Text
      $("#day4-date").text(dayFourDate.format("M/D/YYYY"));
      $("#day-4-icon").attr("src", dayFourIconURL);
      $("#day4-temp").text(
        "Temp: " + dayFourTemp + String.fromCharCode(176) + "F"
      );
      $("#day4-humidity").text("Humidity: " + dayFourHumidity + "%");

      //Day Five Text
      $("#day5-date").text(dayFiveDate.format("M/D/YYYY"));
      $("#day-5-icon").attr("src", dayFiveIconURL);
      $("#day5-temp").text(
        "Temp: " + dayFiveTemp + String.fromCharCode(176) + "F"
      );
      $("#day5-humidity").text("Humidity: " + dayFiveHumidity + "%");

      $;
    });
  });
});
