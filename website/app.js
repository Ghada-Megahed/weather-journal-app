// Personal API Key for OpenWeatherMap API And Change Units To Imperial
const apiKey = '1a8d0c024d41449777fd0ea0b710e97a&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
// Get Month Plus 1 Because Count Start from 0
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
// sellect generate button
const generateButton = document.getElementById("generate");
// Add event listener for generate button 
generateButton.addEventListener("click",action);
async function action(){
    //To get the value of the element with id "zip"
    const zipCode = document.querySelector("#zip").value
    //console.log the value of zip code
    console.log("Zip code is: " + zipCode);
    //To get the value of the element with id "feelings"
    const userFeeling = document.querySelector("#feelings").value
    //console.log the value of user feeling
    console.log("User Feeling is: " + userFeeling);
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`
    // Alert Message When Zip Code Is Empty
    if(document.getElementById("zip").value.length==0){
        alert("Enter Zip Code At First!");
    } else {
        const res = await fetch(url);
        try{
            // Transform into JSON
            const data = await res.json();
            // Select The "temp" Element From Data
            const temperature = data['main']['temp'];
            //console.log the temperature
            console.log("Temperature in Fahrenheit is: " + temperature)
            await fetch('/setData', {
                method: 'POST', 
                credentials: 'same-origin', 
                headers: {
                    'Content-Type': 'application/json',
                },
                //To match body data type with "Content-Type" header 
                body: JSON.stringify({
                    date: newDate,
                    temp: temperature,
                    feel: userFeeling,
                })
            });
            // Call "retrieveData" Function to Update UI
            retrieveData();
        } catch(error) {
            // Handle the error
            console.log("error", error);
        }
    }
}

// Function to GET Project Data
const retrieveData = async () =>{
    const req = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await req.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = "Temperature in Fahrenheit Is: " + Math.round(allData.temp)+ '&deg;F';
    document.getElementById('content').innerHTML = "Feeling Is: " +allData.feel;
    document.getElementById('date').innerHTML ="Date Is: " + allData.date;
    }
    catch(error) {
        // Handle the error
        console.log("error", error);
    }
}