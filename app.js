const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const routes = require('./app_server/routes/index');

const app = express();

// View engine setup
app.engine('hbs', engine({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'app_server', 'views', 'partials'),
  defaultLayout: 'layout'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Logging
app.use(morgan('dev'));

// Routes first
app.use('/', routes);

// Static files after routes
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Travlr server running at http://localhost:${port}`);
});
