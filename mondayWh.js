const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000; // You can choose any available port

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

webhookUrl = 'https://hooks.zapier.com/hooks/catch/15130199/39qmsl8/'

// Define the webhook endpoint (e.g., /webhook)
app.post('/webhook', (req, res) => {
  try {
    console.log('webhook triggered')
    const webhookData = req.body;
    console.log(JSON.stringify(req.body, 0, 2))
    console.log('Received webhook data:', webhookData);

    // Add your custom logic here to process the webhook data
    axios.post(webhookUrl, webhookData)
  .then(function (response) {
    console.log('Webhook sent successfully:', response.data);
  })
  .catch(function (error) {
    console.error('Error sending webhook:', error);
  });
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
