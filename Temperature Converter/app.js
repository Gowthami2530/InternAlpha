function convertTemperature() {
    let inputTemperature = document.getElementById("num").value.trim();
    let unit = document.getElementById("units").value;
    let resultElement = document.getElementById("result");
    let celsius, fahrenheit, kelvin;
 
    if (inputTemperature === "") {
        alert("Please enter a temperature value.");
        return; // Exit the function early if input is empty
    }
 
    if (unit === "celsius") {
        celsius = parseFloat(inputTemperature);
        fahrenheit = celsiusToFahrenheit(celsius);
        kelvin = celsiusToKelvin(celsius);
        resultElement.innerHTML = "Fahrenheit: " + fahrenheit.toFixed(2) + "<br>" +
                                  "Kelvin: " + kelvin.toFixed(2);
    } else if (unit === "fahrenheit") {
        fahrenheit = parseFloat(inputTemperature);
        celsius = fahrenheitToCelsius(fahrenheit);
        kelvin = celsiusToKelvin(celsius);
        resultElement.innerHTML = "Celsius: " + celsius.toFixed(2) + "<br>" +
                                  "Kelvin: " + kelvin.toFixed(2);
    } else if (unit === "kelvin") {
        kelvin = parseFloat(inputTemperature);
        celsius = kelvinToCelsius(kelvin);
        fahrenheit = celsiusToFahrenheit(celsius);
        resultElement.innerHTML = "Celsius: " + celsius.toFixed(2) + "<br>" +
                                  "Fahrenheit: " + fahrenheit.toFixed(2);
    }
 }
 
 function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
 }
 
 function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
 }
 
 function celsiusToKelvin(celsius) {
    return celsius + 273.15;
 }
 
 function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
 }
 