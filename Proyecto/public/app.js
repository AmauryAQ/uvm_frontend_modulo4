// Referencias a los elementos del DOM
const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const resultDiv = document.getElementById('weather-result');
const errorDiv = document.getElementById('error-message');

const cityName = document.getElementById('city-name');
const tempValue = document.getElementById('temp-value');
const weatherDesc = document.getElementById('weather-desc');

// Backend en Render
const API_URL = 'https://proyecto-modulo-4-ad6f.onrender.com/clima?ciudad=';
// Para uso local, descomenta la siguiente línea y comenta la de arriba
//const API_URL = 'http://localhost:3000/clima?ciudad=';

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue al dar submit

    const ciudad = input.value.trim();
    if (!ciudad) return;

    // Limpiar la interfaz antes de hacer la nueva petición
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');

    try {
        // Hacemos la petición a nuestra propia API
        const response = await fetch(`${API_URL}${ciudad}`);
        const data = await response.json();

        // WeatherStack devuelve una propiedad 'error' si la ciudad no existe o falla la cuota
        if (data.error) {
            throw new Error('Ciudad no encontrada o error en el servicio');
        }

        // Inyectamos los datos en el DOM
        cityName.textContent = `${data.location.name}, ${data.location.country}`;
        tempValue.textContent = data.current.temperature;
        weatherDesc.textContent = data.current.weather_descriptions[0]; 

        // Mostramos el resultado quitando la clase que lo oculta
        resultDiv.classList.remove('hidden');

    } catch (error) {
        errorDiv.textContent = 'Hubo un error al buscar el clima. Verifica el nombre de la ciudad.';
        errorDiv.classList.remove('hidden');
    }
});