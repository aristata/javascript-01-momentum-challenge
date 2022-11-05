// HTML Element 선택자 ----------------------------------------------------------
const locationElement = document.querySelector("#location");
const weatherElement = document.querySelector("#weather");
const temperatureElement = document.querySelector("#temperature");

// 전역 변수 --------------------------------------------------------------------
const API_KEY = config.weatherApikey;

// 함수 -------------------------------------------------------------------------
function onGeoOk(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(`현재 당신의 위치는 ${latitude}, ${longitude} 입니다`);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      locationElement.innerText = `접속 위치: ${data.name}`;
      weatherElement.innerText = `날씨: ${data.weather[0].main}`;
      temperatureElement.innerText = `, ${data.main.temp} 도`;
    });
}

function onGeoError() {
  alert(
    "당신의 위치를 찾을 수 없습니다. 그렇기 때문에 당신을 위한 날씨 정보도 찾을 수 없습니다."
  );
}

// 이벤트 -----------------------------------------------------------------------
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
