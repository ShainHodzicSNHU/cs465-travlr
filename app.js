const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const cors = require('cors');

const app = express();

require('./app_server/models/db');
require('./app_api/models/travlr');
require('./app_api/models/user'); 


const routes = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

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

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Travlr server running at http://localhost:${port}`);
});

module.exports = app;
