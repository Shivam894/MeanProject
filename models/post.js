const { Title } = require('@angular/platform-browser');
const mongoose = require('mongoose'); 

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true}
})

module.exports = mongoose.model('Post',postSchema);