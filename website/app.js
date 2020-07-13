/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '6350f06087921f586d64def4fc067a60';
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
(document.getElementById('generate')).addEventListener('click', getTemprature);

/* Function called by event listener */
function getTemprature(event) {
    const zip = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;
    getWeatherData(apiURL, zip, apiKey)
        .then(function (data) {
            let d = new Date();
            let newDate = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
            postWeatherData('/add', { temperature: data?.main?.temp, date: newDate, userResponse: userFeeling });
            updateHtmlElments('/all');
        })
};

/* Function to GET Web API Data */
const getWeatherData = async (apiURL, zip, appKey) => {
    const apiResponse  = await fetch(apiURL + zip + '&appid=' + appKey + '&units=imperial');
    try {
        const data = await apiResponse.json();
        return data;
    } catch(error) {
        console.log('error', error);
    };
};

/* Function to POST data */
const postWeatherData = async (url = '', data = {}) => {
    const apiResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const returnedData = await apiResponse.json();
        return returnedData;
    } catch(error) {
        console.log('error happened with Details :/n', error);
    };
};


/* Function to GET Project Data */
const updateHtmlElments = async(url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].userResponse;
    } catch(error) {
        console.log('error', error);
    };
};