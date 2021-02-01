// Get dependencies
import express, { static } from 'express';
import { join } from 'path';
import { createServer } from 'http';
import { json, urlencoded } from 'body-parser';
import proxy from 'express-http-proxy';
import cors from 'cors';

const app = express();

const appName = 'CreditCardPaymentNgRx';

// Parsers for POST data
app.use(json({limit: '20mb'}));
app.use(urlencoded({ extended: false, limit: '20mb' }));

app.use(cors());

// Point static path to dist
app.use(static(join(__dirname, 'dist/' + appName)));

// Set our api routes proxy to point to spring boot server
app.use('/server', proxy('http://localhost:8080'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/'+ appName + '/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
 const port = '4200';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on ${port}`));
