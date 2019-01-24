const express = require('express')
const hbs = require('express-handlebars');
const routes = require('./modules/routes');
const app = express();

const port = 3000;

// Register Handlebars view engine
app.engine('handlebars', hbs());
// Use Handlebars view engine
app.set('view engine', 'handlebars');

// Register Handlebars view engine
app.engine('.hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
// Use Handlebars view engine
app.set('view engine', '.hbs');

app.use(routes)

app.listen(port, () => {
  console.log('Example app is running → PORT: ' + port);
  console.log("IP ADDRESS OF SERVER: " + "142.93.27.217:" + port);
});

