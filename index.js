//Сегодня у нас проект! Вы повторяете действия видео и выводите на страницу информацию о погоде. 
//В принципе, после этого вы можете прислать мне ДЗ на проверку. 
//Но, надеюсь, посколько это проект - то вы пойдете дальше - добавите возможность 
//выбирать города в выпадающем списке - или предоставите пользователю вводить имя города на странице, 
//будете выводить всю информацию о погоде, снабдите ее иконками, будете выводить страну, где находится город. 
//Также, если совсем делать красиво, можно получать прогноз погоды на несколько дней вперед! 
//Это проект - и вы решаете когда его закончить! И, надеюсь, вы поймете ценность массивов!
//Обратите внимание, что в данном случае, не нужно использовать blank - оформление отдается вам!

function showTime() {
    let now = new Date()
    let time = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getDay(), now.getUTCHours() + 3, now.getMinutes()]
    let weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', ];
    let weekdaysForForecast = ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', ];

    // Получаем время
    let minStr = String(time[5]);

    if (minStr.length == 1) time[5] = '0' + time[5];
    document.querySelector('.time').innerHTML = `${time[4]} : ${time[5]}`;

    //Получаем дату
    let temp = "";
    let monStr = String(time[1]);
    let dateStr = String(time[2]);


    if (monStr.length == 1) time[1] = '0' + time[1];
    if (dateStr.length == 1) time[2] = '0' + time[2];
    for (let key in weekdays) {
        if (key == time[3]) temp = weekdays[key];
    }

    let date = `${time[2]} ${time[1]} ${time[0]}`

    document.querySelector('.weekday').innerHTML = temp;
    document.querySelector('.date').innerHTML = date;

    //получаем даты прогноза
    let forecastDates = document.querySelectorAll('.forecast-day')
    for (let i = 0; i < forecastDates.length; i++) {
        forecastDates[i].innerHTML = ` ${weekdaysForForecast[time[3] + 1 + i]} ${time[2] + 1 + i}`
        console.log(forecastDates[i]);
    }

    //Заменяем картинку в зависимости от времени суток
    if (time[4] < 12 && time[4] >= 6) {
        document.querySelector('.weather').style['background-image'] = "url('https://img4.goodfon.ru/original/1920x1080/4/b6/kofe-coffee-cup-rassvet-chashka-good-morning-hot-utro.jpg')"
        document.querySelector('.prev').style['color'] = "black";
        document.querySelector('.next').style['color'] = "black";
        document.querySelector('.weather').style['color'] = "black";
    } else if (time[4] <= 17 && time[4] >= 12) {
        document.querySelector('.weather').style['background-image'] = "url('https://eskipaper.com/images/amazing-sunny-day-wallpaper-1.jpg')"
        document.querySelector('.prev').style['color'] = "black";
        document.querySelector('.next').style['color'] = "black";
        document.querySelector('.weather').style['color'] = "black";
    } else if (time[4] < 6 && time[4] >= 1 || time[4] == 0 || time[4] == 23) {
        document.querySelector('.weather').style['background-image'] = "url('https://img3.goodfon.ru/original/2500x1600/1/d1/peyzazh-zvezdy-nebo-luna-mesyac.jpg')"
        document.querySelector('.weather').style['color'] = "#fff";
    }


}



showTime();


function currentWeather() {
    let cityParam = document.querySelectorAll('.city-name');
    let cityId = 0;
    for (let i = 0; i < cityParam.length; i++) {
        cityId = cityParam[i].value;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=efe4b78c6a87d93611741515f35d74a4&lang=ru`)
        //fetch('http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=efe4b78c6a87d93611741515f35d74a4&lang=34');
        .then(function(resp) { return resp.json() }) //convert data to json
        .then(function(data) {

            let temp = (data.main.temp - 273.15).toFixed(1);

            if (data.sys['country'] == 'RU') document.querySelector('.country').innerHTML = 'Россия';



            document.querySelector('.temperature').innerHTML = data.name

            document.querySelector('.temperature').innerHTML = temp + "&#176"

            document.querySelector('.description').textContent = data.weather[0]['description'];



            document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;


        })


    .catch(function() {
        // catch any arrors
    });
    return cityId;
}

currentWeather()
document.querySelector('.city-name').oninput = currentWeather;
//`https://api.openweathermap.org/data/2.5/forecast/daily?id=524894&appid=efe4b78c6a87d93611741515f35d74a4`
function forecastWeather() {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${currentWeather()}&appid=efe4b78c6a87d93611741515f35d74a4&lang=ru`)
        .then(function(tested) { return tested.json() })
        .then(function(dates) {
            console.log(dates);

            function getForecastData() {
                let now = new Date();
                let time = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getDay(), now.getUTCHours(), now.getMinutes()];
                let monStr = String(time[1]);
                let dateStr = String(time[2]);

                let showWeatherTom = {
                    'timeForecast': [],
                    'Forecast': [],
                    'icon': []
                };
                let showWeatherDayAftDay = {
                    'timeForecast': [],
                    'Forecast': [],
                    'icon': []
                };
                let showWeatherThirdDay = {
                    'timeForecast': [],
                    'Forecast': [],
                    'icon': []
                };


                if (monStr.length == 1) time[1] = '0' + time[1];
                if (dateStr.length == 1) time[2] = '0' + time[2];

                for (let i = 0; i < dates.list.length; i++) {
                    if (dates.list[i]['dt_txt'].includes(`${time[0]}-${time[1]}-${time[2] + 1}`)) {
                        showWeatherTom['timeForecast'].push(dates.list[i]['dt_txt']) && showWeatherTom['Forecast'].push(dates.list[i]['main']['temp']) && showWeatherTom['icon'].push(dates.list[i]['weather'][0]['icon'])


                    } else if (dates.list[i]['dt_txt'].includes(`${time[0]}-${time[1]}-${time[2] + 2}`)) {
                        showWeatherDayAftDay['timeForecast'].push(dates.list[i]['dt_txt']) && showWeatherDayAftDay['Forecast'].push(dates.list[i]['main']['temp']) && showWeatherDayAftDay['icon'].push(dates.list[i]['weather'][0]['icon'])
                    } else if (dates.list[i]['dt_txt'].includes(`${time[0]}-${time[1]}-${time[2] + 3}`)) {
                        showWeatherThirdDay['timeForecast'].push(dates.list[i]['dt_txt']) && showWeatherThirdDay['Forecast'].push(dates.list[i]['main']['temp']) && showWeatherThirdDay['icon'].push(dates.list[i]['weather'][0]['icon'])
                    }

                }

                return [showWeatherTom, showWeatherDayAftDay, showWeatherThirdDay]

            }

            //"2020-08-15 18:00:00"

            function getForecast(Arrforecast) {
                console.log(Arrforecast);


                //ForecastTommorow
                document.querySelector('.icon-1-night').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][1]}@2x.png">`
                document.querySelector('.temperature-1-night').innerHTML = `${(Arrforecast[0]['Forecast'][1] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-1-morning').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][3]}@2x.png">`
                document.querySelector('.temperature-1-morning').innerHTML = `${(Arrforecast[0]['Forecast'][3] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-1-noon').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][5]}@2x.png">`
                document.querySelector('.temperature-1-noon').innerHTML = `${(Arrforecast[0]['Forecast'][5] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-1-evening').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][7]}@2x.png">`
                document.querySelector('.temperature-1-evening').innerHTML = `${(Arrforecast[0]['Forecast'][7] - 273.15).toFixed(1)} &#176`;

                //Forecast day after day
                document.querySelector('.icon-2-night').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[1]['icon'][1]}@2x.png">`
                document.querySelector('.temperature-2-night').innerHTML = `${(Arrforecast[1]['Forecast'][1] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-2-morning').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][3]}@2x.png">`
                document.querySelector('.temperature-2-morning').innerHTML = `${(Arrforecast[1]['Forecast'][3] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-2-noon').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][5]}@2x.png">`
                document.querySelector('.temperature-2-noon').innerHTML = `${(Arrforecast[1]['Forecast'][5] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-2-evening').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][7]}@2x.png">`
                document.querySelector('.temperature-2-evening').innerHTML = `${(Arrforecast[1]['Forecast'][7] - 273.15).toFixed(1)} &#176`;
                //Forecast third day
                document.querySelector('.icon-3-night').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[1]['icon'][1]}@2x.png">`
                document.querySelector('.temperature-3-night').innerHTML = `${(Arrforecast[2]['Forecast'][1] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-3-morning').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][3]}@2x.png">`
                document.querySelector('.temperature-3-morning').innerHTML = `${(Arrforecast[2]['Forecast'][3] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-3-noon').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][5]}@2x.png">`
                document.querySelector('.temperature-3-noon').innerHTML = `${(Arrforecast[2]['Forecast'][5] - 273.15).toFixed(1)} &#176`;
                document.querySelector('.icon-3-evening').innerHTML = `<img src="https://openweathermap.org/img/wn/${Arrforecast[0]['icon'][7]}@2x.png">`
                document.querySelector('.temperature-3-evening').innerHTML = `${(Arrforecast[2]['Forecast'][7] - 273.15).toFixed(1)} &#176`;


            };

            getForecast(getForecastData());

            document.querySelector('.icon-1').innerHTML = `<img src="https://openweathermap.org/img/wn/${dates.list[8]['weather'][0]['icon']}@2x.png">`
            document.querySelector('.temperature-1-morning').innerHTML
            document.querySelector('.temperature-1-noon').innerHTML
            document.querySelector('.temperature-1-evening').innerHTML
            document.querySelector('.temperature-1-night').innerHTML





        })

    .catch(function() {

    });

};

forecastWeather()
document.querySelector('.city-name').oninput = forecastWeather;


/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}