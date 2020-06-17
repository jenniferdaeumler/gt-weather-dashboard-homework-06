$(document).ready(function () {
    var currentDate = moment().format("L");
    var apiKey = "1935f5d7d75a269680ddfadd7b264dcb";

    function displayLocationCurrentWeather() {
        var queryURL =
            "http://api.openweathermap.org/data/2.5/forecast?q=atlanta&units=imperial&appid=" +
            apiKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);

        
        })
        displayLocationCurrentWeather();
        //five day forcast in a loop
    }

      //     // //Search for city, display  by date
      $("#search-button").on("click", function (event) {
        $("#current-city").empty();
        event.preventDefault();
        console.log("submit button clicked");
        // This line of code will grab the input from the textbox
        var searchInput = $("#search-input").val().trim();
        $("#current-city").append(searchInput).append(" " +currentDate);

    })
});
