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
          // fetchForecastData(cityInput, forecastEl);
          // function that adds city to search history
          addHistory(cityInput);
     }
});

// function that adds the city input to search history
 historyEl.on("click", ".list-group-item", function () {
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
          var historyItem = $("<a>").addClass("list-group-item").text(city);
          historyEl.prepend(historyItem)
     });
 }

 function fetchWeatherData(city, todayEl) {
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

// buttonEl.on("click", function (event) {
//      event.preventDefault();
//      cityInput = $("#search-input").val();
//      currentQueryURL = currentApiURL+ "q=" + cityInput + key;
//      // console.log(currentQueryURL)
     
//      fetch(currentQueryURL).then(function (response) {
//           return response.json();
//      }).then(function (data) {
//           console.log(data);
//           // empty input area
     

//      // adds current weather section 
//      var today = dayjs();
//      var cityName = $("<h2>").text(data.name + today.format(" (DD/MM/YYYY)") + "" + data.weather.icon)
//      todayEl.append(cityName)


//      // create p tags, add text + data file path and append to class
//      var temp = $("<p>").text("Temp: " + data.main.temp + "°C");
//      todayEl.append(temp);

//      var wind = $("<p>").text("Wind: " + data.wind.speed + "m/s");
//      todayEl.append(wind);

//      var humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
//      todayEl.append(humidity);

//      todayEl.css({"border": '1px solid black', "padding": "2px 5px"});

     

//      })
     
// });

// buttonEl.on("click", function (event) {
//      event.preventDefault();
//      cityInput = $("#search-input").val();
//      forecastQueryURL = forecastApiURL + "q=" + cityInput + key;

//      fetch(forecastQueryURL).then(function (response) {
//           return response.json();
//      }).then(function (data) {
//           console.log(data);

//           // add section title 
//           var heading = $("<h2>").text("5-Day Forecast");
//           forecastEl.append(heading);


//           // create div for day 1
//           var box1 = $("<div>");
//           box1.addClass("day1");
//           var day1Title = $("<h3>").text(data.list[5].dt_txt);
//           box1.append(day1Title);
          

//           // add icon, temp, wind, humidity
//           var iconURL1 = "https://openweathermap.org/img/wn/04d@2x.png"
//           var icon = $("<img>").attr('src', iconURL1);
//           box1.append(icon);

//           var temp = $("<p>").text("Temp: " + data.list[5].main.temp + "°C");
//           box1.append(temp);

//           var wind = $("<p>").text("Wind: " + data.list[5].wind.speed + "m/s");
//           box1.append(wind);
          
//           var humidity = $("<p>").text("humidity: " + data.list[5].main.humidity + "%");
//           box1.append(humidity);

//           forecastEl.append(box1);
          
//           // creatde div for day 2
//           var box2 = $("<div>");
//           box2.addClass("day2");
//           var day2Title = $("<h3>").text(data.list[13].dt_txt);
//           box2.append(day2Title);
          

//           // add icon, temp, wind, humidity
//           var iconURL2 = "https://openweathermap.org/img/wn/04d@2x.png"
//           var icon = $("<img>").attr('src', iconURL2);
//           box2.append(icon);

//           var temp = $("<p>").text("Temp: " + data.list[13].main.temp + "°C");
//           box2.append(temp);

//           var wind = $("<p>").text("Wind: " + data.list[13].wind.speed + "m/s");
//           box2.append(wind);
          
//           var humidity = $("<p>").text("humidity: " + data.list[13].main.humidity + "%");
//           box2.append(humidity);

//           forecastEl.append(box2);

//           // box 3

//           var box3 = $("<div>");
//           box3.addClass("day3");
//           var day3Title = $("<h3>").text(data.list[21].dt_txt);
//           box3.append(day3Title);
          

//           // add icon, temp, wind, humidity
//           var iconURL3 = "https://openweathermap.org/img/wn/04d@2x.png"
//           var icon = $("<img>").attr('src', iconURL3);
//           box3.append(icon);

//           var temp = $("<p>").text("Temp: " + data.list[21].main.temp + "°C");
//           box3.append(temp);

//           var wind = $("<p>").text("Wind: " + data.list[21].wind.speed + "m/s");
//           box3.append(wind);
          
//           var humidity = $("<p>").text("humidity: " + data.list[21].main.humidity + "%");
//           box3.append(humidity);

//           forecastEl.append(box3);

//           // box 4

//           var box4 = $("<div>");
//           box4.addClass("day4");
//           var day4Title = $("<h3>").text(data.list[29].dt_txt);
//           box4.append(day4Title);
         

//           // add icon, temp, wind, humidity
//           var iconURL4 = "https://openweathermap.org/img/wn/04d@2x.png"
//           var icon = $("<img>").attr('src', iconURL4);
//           box4.append(icon);

//           var temp = $("<p>").text("Temp: " + data.list[29].main.temp + "°C");
//           box4.append(temp);

//           var wind = $("<p>").text("Wind: " + data.list[29].wind.speed + "m/s");
//           box4.append(wind);
          
//           var humidity = $("<p>").text("humidity: " + data.list[29].main.humidity + "%");
//           box4.append(humidity);

//           forecastEl.append(box4);

//           // box 5

//           var box5 = $("<div>");
//           box5.addClass("day5");
//           var day1Title = $("<h3>").text(data.list[37].dt_txt);
//           box5.append(day1Title);
          

//           // add icon, temp, wind, humidity
//           var iconURL5 = "https://openweathermap.org/img/wn/04d@2x.png"
//           var icon = $("<img>").attr('src', iconURL5);
//           box5.append(icon);

//           var temp = $("<p>").text("Temp: " + data.list[37].main.temp + "°C");
//           box5.append(temp);

//           var wind = $("<p>").text("Wind: " + data.list[37].wind.speed + "m/s");
//           box5.append(wind);
          
//           var humidity = $("<p>").text("humidity: " + data.list[37].main.humidity + "%");
//           box5.append(humidity);

//           forecastEl.append(box5);



//           var rightContainer = $(".col-lg-9 pb-3")
//           rightContainer.append(forecastEl);

//           // styling for all the boxes
         
//           forecastEl.css({"display": "flex"});
//      })
     
// });
     // styling for all the boxes:

          // box1.css({"border": '1px solid black', "background-color": "#0D4F7A", "font-color": "#FEF9CE"})


// use day js to add current date 

// const clearPreviouslySearched = () => {
//      window.localStorage.setItem("prevCities", "[]");
//      $("#previous-searches").text("");
     // display users current city choice temp, wind, humidity

// add 5 day forecast from openweather api

//  store users search history to local storgae and


