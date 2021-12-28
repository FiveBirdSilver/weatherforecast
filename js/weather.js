const API_KEY = "ae9c6f6be6e9b0dde24fb18cde089705"

const city = document.querySelector('.city');
const CurrentTemp = document.querySelector('.weatherInfo span:first-child');
const weatherInfo = document.querySelector('.weatherInfo span:last-child');

const HighTemp = document.querySelector('#HighTemp span');
const LowTemp = document.querySelector('#LowTemp span');
const wind = document.querySelector('#wind span');
const humidity = document.querySelector('#humidity span');
const cloudy = document.querySelector('#cloudy span');

const time = document.querySelector('.time');
const days = document.querySelector('.days');
const IconsImage = document.createElement("img");
const h1 = document.querySelector('h1');
const loading = document.querySelector('.loading');
const result = document.querySelector('#result');
const Icon = document.querySelector(".Icon")

const closeBtn = document.querySelector('#close');
const shareBtn = document.querySelector('#share');

shareBtn.addEventListener('click', function(){
    let url = window.location.href;
    let tmp = document.createElement('input');
    

    document.body.appendChild(tmp);
    tmp.value = url;
    tmp.select();
	document.execCommand("copy");
    document.body.removeChild(tmp);
    
	alert("URL이 복사되었습니다"); 
});


function onGeoOk(Position) {

    const fieldForm = document.querySelector('#field_form');
    fieldForm.addEventListener('submit', searchCity);

    function searchCity(event) {

        h1.style.display = "none";
        fieldForm.style.display = "none";
        loading.style.display = "flex";
        result.style.display = "none";

        setTimeout(function(){
            loading.style.display = "none";
            result.style.display = "flex";
        },1500);

        closeBtn.addEventListener('click', function(){
            result.style.display = "none";
            h1.style.display = "flex";
            fieldForm.style.display = "flex";
        });
        

        event.preventDefault();
        IconsImage.remove();
        let fieldvalue = document.querySelector('#field_value');
        let cityname = fieldvalue.value
        fieldvalue.value = "";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`; // units=metric는 섭씨 온도로 바꿔줌


        fetch(url)
            .then(Response => Response.json())
            .then(data => {

                if (data.cod == "404") {
                    alert("도시를 찾을 수 없습니다. 다시 입력해 주세요.");
                    location.reload();
                }

                const getCurrentTime = new Date().getTime();
                const CurrentTime = new Date(
                    getCurrentTime + data.timezone * 1000 - 9 * 60 * 60 * 1000
                );

                let getYear = CurrentTime.getFullYear();
                let getMonth = CurrentTime.getMonth();
                let MonthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                let getDate = CurrentTime.getDate();
                let getDay = CurrentTime.getDay();
                let DayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                let getHour = String(CurrentTime.getHours()).padStart(2, "0")
                let getMin = String(CurrentTime.getMinutes()).padStart(2, "0");
                time.innerHTML = `${getHour}:${getMin}`;
                days.innerHTML = `${DayArr[getDay]}, ${getDate}, ${MonthArr[getMonth]}, ${getYear}`

    
                const inx = 0;
                const imgURL = 'img/' + data.weather[inx].description + '.png';
                IconsImage.src = imgURL;
                Icon.appendChild(IconsImage); //!!!!!!!!!!!일몰 해결해야돼!!!!!!!!!!!!!!

                console.log(url);
                city.innerHTML = `${data.name}, ${data.sys.country}`;
                weatherInfo.innerHTML = `${data.weather[inx].description}`; // 배열의 0은 고정! 
                CurrentTemp.innerHTML = `${Math.floor(data.main.temp)}℃`;
                HighTemp.innerHTML = `${Math.floor(data.main.temp_max)}℃`;
                LowTemp.innerHTML = `${Math.floor(data.main.temp_min)} ℃`;
                wind.innerHTML = `${Math.floor(data.wind.speed)}m/s`;
                humidity.innerHTML = `${data.main.humidity}%`;
                cloudy.innerHTML = `${data.clouds.all}%`
            });
    }

}

function onGeoError() {
    alert("날씨를 찾을 수 없습니다. 다시 시도해 주세요");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); //user의 위치를 받는 함수.


