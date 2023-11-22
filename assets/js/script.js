//  add background colour, font colour, centre to heading 
var headerEl = $(".header");
var buttonEl = $("#search-button");
var todayEl = $("#today");

headerEl.css({ "background-color": "#0C629B ", "color": "#FEF9CE", "text-align": "center", "borderRadius": "25px", "padding": "0.5px"});



var currentApiURL = "https://api.openweathermap.org/data/2.5/weather?"
var forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?"
var key = "&appid=4b17256124fe4b45a926122e6d82cd99&units=metric"
var cityInput = "";
var forecastQueryURL;
var currentQueryURL;




buttonEl.on("click", function (event) {
     event.preventDefault();
     cityInput = $("#search-input").val();
     currentQueryURL = currentApiURL+ "q=" + cityInput + key;
     // console.log(currentQueryURL)
     
     fetch(currentQueryURL).then(function (response) {
          return response.json();
     }).then(function (data) {
          console.log(data);
          // empty input area
     

     // adds current weather section 
     var today = dayjs();
     var cityName = $("<h2>").text(data.name + today.format(" (DD/MM/YYYY)"))
     todayEl.append(cityName)


     // create p tags, add text + data file path and append to class
     var temp = $("<p>").text("Temp: " + data.main.temp + "°C");
     todayEl.append(temp);

     var wind = $("<p>").text("Wind: " + data.wind.speed + "m/s");
     todayEl.append(wind);

     var humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
     todayEl.append(humidity);

     todayEl.css({"border": '1px solid black', "padding": "2px 5px"});




     })
     
});

// forecastQueryURL = forecastApiURL + "q=" + cityInput + key;




// use day js to add current date 


     // display users current city choice temp, wind, humidity

// add 5 day forecast from openweather api

//  store users search history to local storgae and