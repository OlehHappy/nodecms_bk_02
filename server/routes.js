var postsRoutes = require('server/posts/routes');

module.exports = function routes(app) {
    app.use('/posts', postsRoutes);
};
