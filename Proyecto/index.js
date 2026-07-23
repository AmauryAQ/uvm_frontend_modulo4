require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Render asignará un puerto automáticamente, si no, usa el 3000 en local
const PORT = process.env.PORT || 3000;

app.get('/clima', async (req, res) => {
    const ciudad = req.query.ciudad;
    if (!ciudad) return res.status(400).send({ error: 'Debes proporcionar una ciudad' });

    try {
        const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${ciudad}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Error al consultar WeatherStack' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});