const express = require('express');
const app = express();

app.get('/other-request', (req, res) => {
  res.send(
    {message: "Hello World!"}
  );
});

app.get('/non-blocking', (req, res) => {
  console.log('Start NON-BLOCKING request');
  
  setTimeout(() => {
    console.log('Finished async task');
    res.send(
        {message: 'NON-BLOCKING response after 5 seconds'}
    );
  }, 5000);

  console.log('Can handle other requests in the meantime');
});

app.get('/blocking', (req, res) => {
  console.log('Start BLOCKING request');

  const start = Date.now();
  while (Date.now() - start < 10000) {
    // Busy-wait for 5 seconds (completely blocks the event loop!)
  }

  console.log('Finished BLOCKING task');
  res.send(
    {message: 'BLOCKING response after 5 seconds'}
    );
});

app.listen(3000, () => console.log('Server running on port 3000'));
