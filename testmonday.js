const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fetch = require('fetch');

const app = express();
const port = 3001; // You can choose any available port

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

webhookUrl = 'https://hooks.zapier.com/hooks/catch/15130199/3iulwew/'

function CallZap(id){

    apiData = ""

    const apiUrl = 'https://api.monday.com/v2';
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI2MDMwMzMwNywiYWFpIjoxMSwidWlkIjo0MzM5NDcyNiwiaWFkIjoiMjAyMy0wNi0wM1QwMTowOTozMS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY5NjAwNzUsInJnbiI6ImFwc2UyIn0.JFILgXE6wJbSqzXMe_2hSTGgVpHPmaadWzdmFdDKzVs'; // Replace with your API key
    const query = `query {boards(ids: 1802223826) {items(ids: ${id}) {column_values {value text}}}}`; // Replace with your GraphQL query
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': apiKey,
    };
    
    axios.post(apiUrl, { query }, { headers })
      .then(response => {
        const apiData = response.data;
        console.log(JSON.stringify(apiData, null, 2));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
   
   axios.post(webhookUrl, apiData)
  .then(function (response) {
    console.log('Webhook sent successfully:', response.data);
  })
  .catch(function (error) {
    console.error('Error sending webhook:', error);
  });

}

// Define the webhook endpoint (e.g., /webhook)
app.post('/webhook', (req, res) => {
  try {
    console.log('webhook triggered')
    const webhookData = req.body;
    console.log(JSON.stringify(req.body, 0, 2))
    console.log('Received webhook data:', webhookData);
    console.log('PulseId:',webhookData.event.pulseId );

    // Add your custom logic here to process the webhook data
    CallZap(webhookData.event.pulseId)
    // Send a response with a 200 OK status code
    res.status(200).send(req.body);
  } catch (error) {
    console.error('Error parsing webhook data:', error);

    // Send a response with a 400 Bad Request status code
    res.status(400).send('Bad Request');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
