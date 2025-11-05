const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// logging
app.use(morgan('dev'));

// view engine setup
app.engine('hbs', engine({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'app_server', 'views', 'partials'),
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes (MVC)
const routes = require('./app_server/routes/index');
app.use('/', routes);

// default root redirect to /travel for rubric testing
app.get('/', (_req, res) => res.redirect('/travel'));

app.listen(PORT, () => {
  console.log(`Travlr server running at http://localhost:${PORT}`);
});
