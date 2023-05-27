import conditions from './conditions.js'

const API_KEY = 'd62a793d1119496aab484300232505'
// http://api.weatherapi.com/v1/current.json?key=d62a793d1119496aab484300232505&q=London
const WEATHER__HEADER = document.querySelector('.weather__card-header')
const FORM = document.querySelector('.form')
const INPUT = document.querySelector('.input')

function removeCard() {
	const PREV_CARD = document.querySelector('.weather')
	if (PREV_CARD) PREV_CARD.remove()
}
function removeError() {
	const PREV_ERROR = document.querySelector('.error')
	if (PREV_ERROR) PREV_ERROR.remove()
}

function showError() {
	const HTML = `<section class="error">
			<h3 class="error__text">Incorrectly entered data</h3>
		</section>`
	WEATHER__HEADER.insertAdjacentHTML('afterend', HTML)
}

function showCard({ temp, conditions, humidity, wind, weather_icon }) {
	const HTML = `<section class="weather">
			
			<div class="weather__card-main">
				<img src="${weather_icon}" alt="Weather text" />
				<h2 class="card__temp weather__num">${temp}<sup>°c</sup></h2>
				<h3 class="card__condition weather__text">${conditions}</h3>
			</div>
			<div class="weather__card-footer">
				<div class="humidity__item">
					<img
						class="humidity__icon"
						src="img/humidity-svgrepo-com.svg"
						alt=""
					/>
					<div class="humidity__item-info">
						<p class="humidity__number weather__num">${humidity}<sup>%</sup></p>
						<p class="humidity__text weather__text">Humidity</p>
					</div>
				</div>
				<div class="wind__item">
					<img class="wind__icon" src="img/wind-svgrepo-com.svg" alt="" />
					<div class="wind__item-info">
						<p class="wind__number weather__num">${wind}<sup>Km/H</sup></p>
						<p class="wind__text weather__text">Wind Speed</p>
					</div>
				</div>
			</div>
		</section>`
	//
	WEATHER__HEADER.insertAdjacentHTML('afterend', HTML)
}

async function getWeather(city) {
	const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`

	const response = await fetch(URL)
	const data = await response.json()

	return data
}

FORM.onsubmit = async function (e) {
	e.preventDefault()

	let city = INPUT.value.trim()
	const data = await getWeather(city)

	if (data.error) {
		removeCard()
		removeError()
		showError()
	} else {
		removeCard()
		removeError()

		const FILE_PATH = 'img/weather-icons/'
		const WEATHER_NAME = data.current.condition.text + '.svg'
		const ICON_PATH = FILE_PATH + WEATHER_NAME
		console.log(ICON_PATH)
		const WEATHER_DATA = {
			temp: data.current.temp_c,
			conditions: data.current.condition.text,
			humidity: data.current.humidity,
			wind: data.current.wind_kph,
			weather_icon: ICON_PATH,
		}
		showCard(WEATHER_DATA)
	}
}
