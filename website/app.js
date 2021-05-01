/* Global Variables */
const API_KEY = '49d6cfca308afdd44906a2ca5ff91505';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const submitButton = document.querySelector('#generate');
const feedbackInput = document.querySelector('#feelings');
const zipInput = document.querySelector('#zip');

submitButton.onclick = async () => {
  const zip = zipInput.value;

  const feedback = feedbackInput.value;
  const temp = await getWeatherData(zip);
  const date = getDate();

  saveUserData({ feedback, date, temp });

  // const {
  //   temp: userTemp,
  //   feedback: userFeedback,
  //   date: userDate
  // } = await getUserData();

  updateUI(await getUserData());
};

// Create a  new date instance dynamically with JS
const getDate = () => {
  const d = new Date();
  return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};

// Get current temperature from OpenWeatherMap
const getWeatherData = async zipCode => {
  const response = await fetch(
    `${BASE_URL}?zip=${zipCode}&appid=${API_KEY}&units=metric`
  );

  return (await response.json()).main.temp;
};

// Save data to api using POST request
const saveUserData = async data => {
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

// Get user data from api
const getUserData = async () => {
  const response = await fetch('/all');

  return await response.json();
};

// Update UI with dynamically fetched data
const updateUI = ({ temp, feedback, date }) => {
  document.querySelector('#date').innerHTML = `Date: ${date}`;
  document.querySelector('#temp').innerHTML = `Temperature: ${temp}°c`;
  document.querySelector('#content').innerHTML = `You're feeling: ${feedback}`;
};
