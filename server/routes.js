const errors = require('./components/errors');
const path = require('path');

/**
 * Sets up all the routes for the Express app.
 * @param {Express} app - contains a reference to the Express App in the app.js file in the root of the project
 * @param {__dirname} root -  contains an Object value pointing to the root of the project 
 */
module.exports = function routes(app, root) {
    // Any new endpoints you create you will want to add them here
    // Example route: app.route('urlpath', RouteJsFile);
    // app.route('/api/users', require('./api/users'));

    /**
     * Here we can handle all error routes and point them to a component in the components folder
     * as well as a view for that component. In this case, we are handling anything that does not have a route
     * registered, and point it to an error 404 message. You can find the error 404 code under
     * server/components/errors/index.js   as for the error 404 view that can be found under server/views/404.html
     */
    app.route('/:url(api|auth|component|app|assets)/*').get(errors[404]);

    // All Other routes get redirected to the index if they not under /api
    app.route('/*').get((req, res) => {
        res.sendFile(path.join(root, 'dist/index.html'));
    });
};