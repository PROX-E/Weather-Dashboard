// store the value of the input
let city = $("#searchTerm").val();
// store api key
const apiKey = "9c5d8249153b78dd3891a22baf0b3d6b";

let date = new Date();

$("#searchTerm").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

$("#searchBtn").on("click", function() {

    $('#forecastH5').addClass('show');
  
    // get the value of the input from user
    city = $("#searchTerm").val();
    
    // clear input box
    $("#searchTerm").val("");  
  
    // full url to call api
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
  
    $.ajax({
      url: queryUrl,
      method: "GET"
    })
    .then(function (response){
  
      console.log(response)
  
      console.log(response.name)
      console.log(response.weather[0].icon)
  
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;
      console.log(Math.floor(tempF))
  
      console.log(response.main.humidity)
  
      console.log(response.wind.speed)
  
      getCurrentConditions(response);
      getCurrentForecast(response);
      makeList();
  
      })
    });
    
  function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }

  function getCurrentConditions (response) {

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // get and set the content 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
   
  }

  function getCurrentForecast () {
  
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
      method: "GET"
    }).then(function (response){
  
      console.log(response)
      console.log(response.dt)
      $('#forecast').empty();
  
      // results variable to hold response.list
      let results = response.list;
      console.log(results)
      
      //declare start date to check against
      //have end date, endDate = startDate + 5
  
      for (let i = 0; i < results.length; i++) {
  
        let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
        let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
        console.log(day);
        console.log(hour);
      }
    });
  
  }