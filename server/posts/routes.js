var mongoose = require('mongoose');
var Post = require('server/db/db').Post;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    Post.find(function(err, results) {
        if (err) { console.log(err); }

        res.send({ posts: results });
    });
});

router.post('/', function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
        if (err) { console.log(err); }

        res.send('Post saved');
    });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    Post.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { title: req.body.title, content: req.body.content }
    }, function(err) {
        if (err) { console.log(err); }

        res.send('Post updated');
    });
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Post.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }

        res.send('Post deleted');
    });
});

module.exports = router;
