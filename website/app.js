// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// The URL to retrieve weather information from his API (country : US)
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//API Key from OpenWeatherMap API
const apiKey = ",&appid=d24bf70d6dae818a6893be61edd0ae3c&units=metric";

// the URL of the server to post data
const server = "http://localhost:3000";

// showing the error to the user
const error = document.getElementById("error");

// generateData //

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", () => { 
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

 

// GET Web API Data
const getWeatherData = async (zipCode) => {
    const res = await fetch(baseURL + zipCode + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      alert (data.message);
    }
    return data;
};
 // getWeatherData return promise
 getWeatherData(zipCode).then((data) => { 
  if (data) {
    const {
      main: { temp },
      name: city,
      weather: [{ description }],
    } = data;

    const information = {
      newDate,
      city,
      temp: Math.round(temp), // to get integer number
      description,
      feelings,
    };

    postData(server + "/add", information);

    showDetails();
    document.getElementById('entry').style.opacity = 1;
  }
});
});

//POST data
const postData = async (url = "", information = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(information),
  });
};

//GET Project Data
const showDetails = async () => {
  const res = await fetch(server + "/all");
    const newData = await res.json();

    document.getElementById("date").innerHTML = newData.newDate;
    document.getElementById("temp").innerHTML = newData.temp + '&degC';
    document.getElementById("city").innerHTML = newData.city;
    document.getElementById("description").innerHTML = newData.description;
    document.getElementById("feel").innerHTML = newData.feelings;
  
};