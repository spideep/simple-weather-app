const weatherComponent = document.createElement('div');
weatherComponent.appendChild(document.createTextNode('Weather Component'));
weatherComponent.className = 'weather-component';
document.querySelector('body').appendChild(weatherComponent);

const celsiusToFahrenheit = (celsius) => {
  return ((celsius * 9) / 5 + 32).toFixed(2);
};

const fahrenheitToCelsius = (fahrenheit) => {
  return (((fahrenheit - 32) * 5) / 9).toFixed(2);
};

const getWeatherIcon = (weather) => {
  let iconname;
  switch (weather) {
    case 'Clouds':
      iconname = 'cloudy';
    case 'Clear':
      iconname = 'sun';
    case 'Rain':
      iconname = 'rain';
    default:
      iconname = 'sun';
  }

  const img = document.createElement('img');
  img.classList.add('weather-icon');
  img.src = `images/${iconname}.png`;
  return img;
};

// Get Geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    console.log(lat, lon);
    const { ajax } = rxjs.ajax;
    // console.log(ajax);
    ajax
      .getJSON(
        `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`
      )
      .subscribe((data) => {
        console.log(data);
        const weather = document.createElement('div');
        const temperature = { unit: '°C', value: data.main.temp };
        const location = document.createElement('div');
        location.className = 'location';
        location.appendChild(
          document.createTextNode(`${data.name},${data.sys.country}`)
        );
        weather.appendChild(location);

        const temp = document.createElement('div');
        temp.className = 'temperature';
        temp.appendChild(document.createTextNode(`${temperature.value}`));
        const button = document.createElement('a');
        button.classList.add('btn');
        button.textContent = temperature.unit;
        button.attributes.href = '#';
        button.addEventListener('click', () => {
          const { unit, value } = temperature;
          if (unit === '°C') {
            temperature.unit = '°F';
            temperature.value = celsiusToFahrenheit(value);
            button.textContent = temperature.unit;
          } else {
            temperature.unit = '°C';
            temperature.value = fahrenheitToCelsius(value);
            button.textContent = temperature.unit;
          }
          temp.innerHTML = '';
          temp.appendChild(document.createTextNode(`${temperature.value}`));
          temp.appendChild(button);
        });

        temp.appendChild(button);
        weather.appendChild(temp);

        const weatherDescription = document.createElement('div');
        weatherDescription.className = 'weather-description';
        weatherDescription.textContent = data.weather[0].main;
        console.log('data.weather[0].main :', data.weather[0].main);
        const icon = getWeatherIcon(data.weather[0].main);
        console.log('icon :', icon);
        weatherDescription.appendChild(icon);
        weather.appendChild(weatherDescription);

        weatherComponent.appendChild(weather);
      });
  });
}
