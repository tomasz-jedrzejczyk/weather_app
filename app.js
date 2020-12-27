window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const appid = "e36b400afc2a7bfb0922842cb2f9f69f";
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appid}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(date => {
                    console.log(date);
                    //Set DOM elements from API
                    const { temp } = date.main;
                    const { main, description } = date.weather[0];
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = main;
                    locationTimezone.textContent = date.name;
                    //Formula for Celsius
                    let celsius = (temp - 35) * (5/9); 
                    //Set Icon
                    setIcons(description,document.querySelector(".icon"));

                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener("click", () =>{
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temp;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons ({color: "white"});
        const currenIcon = icon.replace(/ /g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currenIcon]);
    }
});