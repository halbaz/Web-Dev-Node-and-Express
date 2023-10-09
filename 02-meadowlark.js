const express = require('express')
// NOTE: this is based on version 3.x of express-handlebars.
// express-handlebars is now on version 6.x, so this is rather
// out-of-date, but reflects what's in the book.  if you want
// to use a newer version of express-handlebars, import it as so:
// const { engine: expressHandlebars } = require('express-handlebars')
const expressHandlebars = require('express-handlebars')

const app = express()

// configure Handlebars view engine
 app.engine('handlebars', expressHandlebars.engine({
 defaultLayout: 'main',
  }))
// app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))


app.get('/roll', (req, res) => {
  const min = 1;
  const max = 6;
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  res.json({ result });
});

app.get('/about', (req, res) => res.render('about'))

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
