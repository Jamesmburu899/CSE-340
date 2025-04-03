const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const static = require('./routes/static');
const inventoryRoute = require('./routes/inventoryRoute');

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', './layouts/layout');

// Middleware
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(static);
app.use('/inventory', inventoryRoute);

// Error Handling Middleware
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  
  if (err.status === 404) {
    res.status(404).render('errors/error', {
      title: '404 - Page Not Found',
      message: err.message,
      nav
    });
  } else {
    res.status(500).render('errors/error', {
      title: '500 - Server Error',
      message: 'Something went wrong. Please try again later.',
      nav
    });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});