const express = require('express');
const fs = require('fs');
const app = express();

// Middleware para fazer o parse do corpo da requisição como JSON
app.use(express.json());

// Rota para receber dados do ESP8266
app.post('/data', (req, res) => {
    const data = req.body;
    console.log("Dados recebidos:", data);

    // Salvar os dados em um arquivo JSON
    fs.writeFile('dadosrecebidos.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            return res.status(500).json({ status: 'error', message: 'Erro ao salvar os dados' });
        }
        res.status(200).json({ status: 'success' });
    });
});

// Iniciar o servidor
app.listen(process.env.PORT || 3000);
