var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ourshop');

var Post = mongoose.model('Post', {
    title: String,
    content: String,
    isCompleted: Boolean,
    isEditing: Boolean
});

module.exports.Post = Post;
