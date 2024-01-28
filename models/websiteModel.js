const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  "website-url": String,
  "website-info": String,
});

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;

