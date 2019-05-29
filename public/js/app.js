const weatherEndPoint = "http://localhost:3000/weather?location=";

function getForecast() {
    const location = document.getElementById("locationInput").value;
    if (!location || location.trim().length === 0) return alert("Enter a location.");

    fetch(weatherEndPoint + encodeURIComponent(location)).then(res => {
        res.json().then(success => {
            document.getElementById("forecastLocation").textContent = success.location
            document.getElementById("forecastText").textContent = success.forecast
            document.getElementById("forecastSummary").textContent = success.summary
            document.getElementById("locationInput").value = ""
        }, error => {
            console.log("error", error);
        })
    }, error => {
        console.log("Failed to connect with the server");
    })
}