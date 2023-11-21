//  add background colour, font colour, centre to heading 
var headerEl = $(".header");
var buttonEl = $("#search-button");

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
     console.log(currentQueryURL)
     
     fetch(currentQueryURL).then(function (response) {
          return response.json();
     }).then(function (data) {
          console.log(data);
     })

});

// forecastQueryURL = forecastApiURL + "q=" + cityInput + key;




// use day js to add current date 


     // display users current city choice temp, wind, humidity

// add 5 day forecast from openweather api

//  store users search history to local storgae and