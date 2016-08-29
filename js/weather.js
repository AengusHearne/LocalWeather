$(document).ready(function() {
    // declare long & lat variables
    var lat;
    var long;

// getCurrentPostion deprecated on insecure origins - temporary switch to Google Maps API
  $.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=" + gkey, function(json) {
    lat = json.location.lat;
    long = json.location.lng;
    getWeather();
  })

/*
    // request location from browser
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0
      };

      function success(position) {
        lat = Math.round(position.coords.latitude * 100) / 100;
        long = Math.round(position.coords.longitude * 100) / 100;
        getWeather();
      }

      function error(err) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            $("#weatherNow").html("<div class=\"alert alert-warning\" role=\"alert\">I'm just a weather-bot. We can't talk about the weather if you don't let me know where you are. Try enabling GPS or 'Location Services' on your device. (error - permission denied)</div>")
            break;
          case error.POSITION_UNAVAILABLE:
            $("#weatherNow").html("<div class=\"alert alert-warning\" role=\"alert\">For some reason, your location is unavailable. But hey it's always sunny somewhere, right? (error response from location provider).</div>")
            break;
          case error.TIMEOUT:
            $("#weatherNow").html("<div class=\"alert alert-warning\" role=\"alert\">Something has taken too long. (error - timed out)</div>")
            break;
          default:
            $("#weatherNow").html("<div class=\"alert alert-danger\" role=\"alert\">Something quite strange has happened. (error - unknown error)</div>")
            break;
        }
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      $("#weatherNow").html("<div class=\"alert alert-info\" role=\"alert\">Sorry, this browser doesn't support geolocation.</div>");
    };
    */

    // dial weather API with loc
    function getWeather() {
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=" + key, function(json) {
        parse(json);
        getForecast();
      });
    };

      function getForecast() {
            $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&units=metric&appid=" + key, function(foreC) {
       parseForecast(foreC);
      });
    };

    // declare weather variables
    var weather;
    var weatherMain;
    var icon;
    var temp;
    var impTemp;
    var windSpeed;
    var impSpeed;
    var windDeg;
    var windDir;
    var location;
    var time;
    var setUnits = 'Met';

    // make human friendly wind direction
    // this function from degToCard.js library https://gist.github.com/felipeskroski/8aec22f01dabdbf8fb6b
    function compass(deg) {
      if (deg > 11.25 && deg < 33.75) {
        return "NNE";
      } else if (deg > 33.75 && deg < 56.25) {
        return "ENE";
      } else if (deg > 56.25 && deg < 78.75) {
        return "E";
      } else if (deg > 78.75 && deg < 101.25) {
        return "ESE";
      } else if (deg > 101.25 && deg < 123.75) {
        return "ESE";
      } else if (deg > 123.75 && deg < 146.25) {
        return "SE";
      } else if (deg > 146.25 && deg < 168.75) {
        return "SSE";
      } else if (deg > 168.75 && deg < 191.25) {
        return "S";
      } else if (deg > 191.25 && deg < 213.75) {
        return "SSW";
      } else if (deg > 213.75 && deg < 236.25) {
        return "SW";
      } else if (deg > 236.25 && deg < 258.75) {
        return "WSW";
      } else if (deg > 258.75 && deg < 281.25) {
        return "W";
      } else if (deg > 281.25 && deg < 303.75) {
        return "WNW";
      } else if (deg > 303.75 && deg < 326.25) {
        return "NW";
      } else if (deg > 326.25 && deg < 348.75) {
        return "NNW";
      } else {
        return "N";
      }
    }

    // parse object data
    function parse(weatherAPI) {
      weather = weatherAPI.weather[0].description.toLowerCase();
      weatherMain = weatherAPI.weather[0].main;
      icon = weatherAPI.weather[0].icon;
      temp = Math.round(weatherAPI.main.temp) + "C";
      impTemp = Math.round((weatherAPI.main.temp * 9) / 5 + 32) + "F";
      windSpeed = Math.round((weatherAPI.wind.speed * 60 * 60) / 1000) + " km/h";
      impSpeed = Math.round(weatherAPI.wind.speed / 0.44704) + " mph";
      windDeg = weatherAPI.wind.deg;
      windDir = compass(weatherAPI.wind.deg);
      location = weatherAPI.name;
      var dt = new Date(weatherAPI.dt * 1000);
      var hours = dt.getHours();
      var minutes = "0" + dt.getMinutes();
      time = hours + ':' + minutes.substr(-2);
      display();
    }

    // display temp and weather details
    function display() {
      if (weatherMain == 'Thunderstorm') {
        $('#bground').css('background-image', 'url("' + "./img/thunderstorm.jpg" + '")');
      } else if (weatherMain == 'Drizzle') {
        $('#bground').css('background-image', 'url("' + "./img/drizzle.jpg" + '")');
      } else if (weatherMain == 'Rain') {
        $('#bground').css('background-image', 'url("' + "./img/rain.jpg" + '")');
      } else if (weatherMain == 'Snow') {
        $('#bground').css('background-image', 'url("' + "./img/snow.jpg" + '")');
      } else if (weatherMain == 'Atmosphere') {
        $('#bground').css('background-image', 'url("' + "./img/atmosphere.jpg" + '")');
      } else if (weatherMain == 'Clear') {
        $('#bground').css('background-image', 'url("' + "./img/clear.jpg" + '")');
      } else if (weatherMain == 'Clouds') {
        $('#bground').css('background-image', 'url("' + "./img/clouds.jpg" + '")');
      } else if (weatherMain == 'Extreme') {
        $('#bground').css('background-image', 'url("' + "./img/extreme.jpg" + '")');
      } else if (weatherMain == 'Additional') {
        $('#bground').css('background-image', 'url("' + "./img/additional.jpg" + '")');
      }
      // info box
      $("#weatherNow").html("<p>I think you're near " + location + ".<p> Looks like " + weather + ", it's <span id='temp'>" + temp + "</span>, wind speed is <span id='speed'>" + windSpeed + "</span> and wind direction is " + windDir + ".<p> <img src=http://openweathermap.org/img/w/" + icon + ".png> </img> <button id='imp'>&deg;F</button> <p><small>Last weather update was at: " + time + " UTC</small>");
    }

  // declare forecast variables
    var Fweather;
    var Ficon;
    var Ftemp;
    var FimpTemp;
    var FwindSpeed;
    var FimpSpeed;
    var FwindDeg;
    var FwindDir;
    var Ftime;
    var cArray = [];
    var fArray = [];
    var FwindArray = [];
    var FimpArray = [];
    var counter = 0;

    // parse forecast data
      function parseForecast(forecastAPI) {
        for (var post in forecastAPI.list){
      Fweather = forecastAPI.list[post].weather[0].main;
      Ficon = forecastAPI.list[post].weather[0].icon;
      Ftemp = Math.round(forecastAPI.list[post].main.temp) + "&deg;C";
      FimpTemp = Math.round((forecastAPI.list[post].main.temp * 9) / 5 + 32) + "&deg;F";
      FwindSpeed = Math.round((forecastAPI.list[post].wind.speed * 60 * 60) / 1000) + " km/h";
      FimpSpeed = Math.round(forecastAPI.list[post].wind.speed / 0.44704) + " mph";
      FwindDeg = forecastAPI.list[post].wind.deg;
      FwindDir = compass(forecastAPI.list[post].wind.deg);
          Ftime = forecastAPI.list[post].dt_txt;

          cArray.push(Ftemp);
          fArray.push(FimpTemp);
          FwindArray.push(FwindSpeed);
          FimpArray.push(FimpSpeed);
          counter++;

       var midday = Ftime.slice(11,13)
    var dt = new Date(forecastAPI.list[post].dt * 1000);
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var dayOfWeek = days[dt.getDay()]

       if (midday == 12) {
        $("#forecast").append("<article class=\"col-xs-2 col-centered text-center weather well story\"><p><strong>"+dayOfWeek+"</strong><p>" +Fweather+" <span id=\"Ftemp"+counter+"\">"+Ftemp+"<span><p><span id=\"Fspeed"+counter+"\">"+FwindSpeed+"</span> "+FwindDir +"<p><img src=http://openweathermap.org/img/w/" + Ficon + ".png> </img>  </article>");
       }
    }
      }

    // onClick function to convert celcius to F
    $('#weatherNow').on('click', '#imp', function() {
      if (setUnits === 'Met') {
        $('#imp').html('&deg;C');
        $('#temp').html(impTemp);
        $('#speed').html(impSpeed);
        for (var i=counter;i>0;i--){
          $('#Ftemp'+i).html(fArray[i]);
          $('#Fspeed'+i).html(FimpArray[i]);
        }
        setUnits = 'Imp';
      } else {
        $('#imp').html('&deg;F');
        $('#temp').html(temp);
        $('#speed').html(windSpeed);
        for (var i=counter;i>0;i--){
          $('#Ftemp'+i).html(cArray[i]);
          $('#Fspeed'+i).html(FwindArray[i]);
        }
        setUnits = 'Met';
      }
    })
  });