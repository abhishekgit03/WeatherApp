function getWeather(){
    let lon;
    let lat;

    const kelvin = 273;
    window.addEventListener("load", () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                //console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(lon + " : " + lat);
            
            
            geolocation_permission = true;

            // API ID
            const api = "569c5e169082d4ec0b5c38c0cc5eaebf";
        
            // API URL
            const base =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +`lon=${lon}&appid=569c5e169082d4ec0b5c38c0cc5eaebf`;
        
            // Calling the API
            fetch(base)
                .then((response) => {
                return response.json();
                })
                .then((data) => {
                    console.log(data);
                    var temp = Math.floor(data.main.temp - kelvin) + "°C";
                    var summary = data.weather[0].description;
                    var location = data.name + ", " + data.sys.country;
                    var humidity = data.main.humidity;
                    var windspeed = data.wind.speed;
                    var icon = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";

                    $('.weathervideo').css('display', 'none')

                    if(summary.toLowerCase() == 'haze'){

                        $('.hazeCloud').css('display', 'block')
                    }
                    else if (summary.toLowerCase == 'rainy'){

                        $('.rainyVideo').css('display', 'block')

                    }

                    $('.temp').html(temp);
                    $('.city').text('Weather in: ' + location)
                    $('.description').text(summary)
                    $('.icon').attr('src', icon)
                    $('.humidity').text('Humidity: '+humidity+'%')
                    $('.wind').text('Windspeed: ' + windspeed + 'km/h')
                    
                });
            });

        }
        });

    
  }

  getWeather();

  navigator.geolocation.watchPosition(function(position) {
    geolocation_permission == true;
    
  },
  function(error) {
    if (error.code == error.PERMISSION_DENIED)
        geolocation_permission = false;
        console.log(geolocation_permission);
  });