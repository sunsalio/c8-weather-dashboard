// //  add background colour, font colour, centre to heading 
// var headerEl = $(".header");
var buttonEl = $("#search-button");
var todayEl = $("#today");
var forecastEl = $("#forecast");
var historyEl = $("#history");
var searchHistory = [];

// headerEl.css({ "background-color": "#0C629B ", "color": "#FEF9CE", "text-align": "center", "borderRadius": "25px", "padding": "0.5px"});

var currentApiURL = "https://api.openweathermap.org/data/2.5/weather?"
var forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?"
var key = "&appid=4b17256124fe4b45a926122e6d82cd99&units=metric"
var cityInput = "";
var forecastQueryURL;
var currentQueryURL;

// event listener for search 

buttonEl.on("click", function (event) {
     event.preventDefault();
     var cityInput = $("#search-input").val().trim();

     // check if input is empty
     if (cityInput !== "") {
          // function that fetches current weather
          fetchWeatherData(cityInput, todayEl);
          // fetch forecast data
          fetchForecastData(cityInput, forecastEl);
          // function that adds city to search history
          addHistory(cityInput);
     }
});

// function that adds the city input to search history
 historyEl.on("click", ".list-group-item-action", function () {
     var city = $(this).text().trim();
     fetchWeatherData(city, todayEl);
     fetchForecastData(city, forecastEl);
 });

 function addHistory(city) {
     if (!searchHistory.includes(city)) {
          // prepend does not work for arrays use unshift instead
          searchHistory.unshift(city);
          localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
          renderSearchHistory();
     }
 }

 function renderSearchHistory() {
     historyEl.empty();
     searchHistory.forEach(function (city) {
          var historyButton = $("<button>").addClass("list-group-item-action").text(city);
          historyEl.prepend(historyButton)
     });
 }

 function fetchWeatherData(cityInput, todayEl) {
     var currentApiURL = "https://api.openweathermap.org/data/2.5/weather?"
     var key = "&appid=4b17256124fe4b45a926122e6d82cd99&units=metric"
     
     cityInput = $("#search-input").val();

     currentQueryURL = currentApiURL+ "q=" + cityInput + key;
     
     fetch(currentQueryURL).then (function (response) {
          return response.json();
     }).then(function (data) {
          console.log(data);

     todayEl.empty(); // clear previous content
     var cityName = $("<h2>").text(data.name);
     var date = $("<p>").text("Date: " + dayjs().format("DD/MM/YYYY"));
     var iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
     var icon = $("<img>").attr("src", iconURL);
     var temperature = $("<p>").text("Temperature: " + data.main.temp + "°C");
     var humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
     var windspeed = $("<p>").text("Wind Speed: " + data.wind.speed + "m/s");

     todayEl.append(cityName, date, icon, temperature, humidity, windspeed);
})

 }

 function fetchForecastData(cityInput, forecastEl) {
     var forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?";
     var key = "&appid=4b17256124fe4b45a926122e6d82cd99&units=metric"
     cityInput = $("#search-input").val();
     forecastQueryURL = forecastApiURL + "q=" + cityInput + key;
     fetch(forecastQueryURL).then (function (response) {
          return response.json();
     }).then(function (data) {
          console.log(data);

     forecastEl.empty();
     var forecastTitle = $("<h2>").text("5 Day Forecast").addClass("forecastHeading");
     forecastEl.append(forecastTitle);

     // use for loop to access data as opposed to seperate for all 5 days
     // instead of i++ ive employed i+= 8 so that the for loop runs on every 8th value
     for (var i = 0; i < data.list.length; i += 8) {
         var forecastItem = data.list[i];
         var date = dayjs(forecastItem.dt_txt).format("DD/MM/YYYY");
         var iconURL = "https://openweathermap.org/img/wn/" + forecastItem.weather[0].icon + ".png";
         var icon = $("<img>").attr("src", iconURL);
         var temperature = $("<p>").text("Temperature: " + forecastItem.main.temp + "°C");
         var humidity = $("<p>").text("Humidity: " + forecastItem.main.humidity + "%");

         var forecastDay = $("<div>").addClass("forecast-day");
         forecastDay.append($("<h3>").text(date), icon, temperature, humidity);
         forecastEl.append(forecastDay);
     }
})
 }
          
