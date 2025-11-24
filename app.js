const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();

/* -------------------- DATABASE SETUP -------------------- */

require('./app_server/models/db');


require('./app_api/models/travlr');

/* -------------------- ROUTES -------------------- */
// HTML routes (server-side rendered pages)
const routes = require('./app_server/routes/index');

// API routes (JSON endpoints)
const apiRoutes = require('./app_api/routes/index');

/* -------------------- VIEW ENGINE SETUP -------------------- */
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'app_server', 'views', 'partials'),
    defaultLayout: 'layout',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

/* -------------------- MIDDLEWARE -------------------- */
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

/* -------------------- ROUTE MOUNTING -------------------- */
app.use('/', routes);        // HTML pages
app.use('/api', apiRoutes);  // JSON API

/* -------------------- START SERVER -------------------- */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Travlr server running at http://localhost:${port}`);
});

module.exports = app;
