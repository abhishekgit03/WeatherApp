

function checkAnim(summary){
  console.log(summary)
  $('.weathervideo').css('display', 'none')

  switch(summary){
    case 'Clouds':
      $('.Cloud').css('display', 'block')
      break
    case 'Haze':
      $('.hazeVideo').css('display', 'block')
      break
    case 'Rain':
      $('.rainyVideo').css('display', 'block')
      break
    case 'Thunderstorm':
      $('.thunderVideo').css('display', 'block')
      break
    default:
      $('.weathervideo').css('display', 'none')

  }




}



let weather = {
    apiKey: "b021120eec85b672f91f2dbabed7400e",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            +city
            +"&appid="
            +this.apiKey
            )
            .then((response) => response.json())
          .then((data) => {
            
            this.displayWeather(data);
            var sum = data.weather[0].main;
            console.log(sum)
            checkAnim(sum)
          
          })
            .catch((err) => alert('Location not found'));
          },
          displayWeather: function (data) {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src =
              "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerText = description
            document.querySelector(".temp").innerText = (parseInt(temp)-273) + "°C";
            document.querySelector(".humidity").innerText ="Humidity: " + humidity +"%";
            document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage =
              "url('https://source.unsplash.com/1600x900/?" + name + "')";
          },
          search: function () {
            this.fetchWeather(document.querySelector(".search-bar").value);
          },
        };
        
        document.querySelector(".search button").addEventListener("click", function () {
          weather.search();
        });
        
        document
          .querySelector(".search-bar")
          .addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
              weather.search();
            }
          });





//weather






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
                            var summary = data.weather[0].main;
                            var location = data.name + ", " + data.sys.country;
                            var humidity = data.main.humidity;
                            var windspeed = data.wind.speed;
                            var icon = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
                            
        
                            $('.weathervideo').css('display', 'none')
        

                            checkAnim(summary)
                           
        
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




          //animations


          
