
module.exports[404] = function pageNotFound(req, res) {
    // file path name, render engine will add the .html 
    const viewFilePath = '404';
    // status code of error, 404 being page not found
    const statusCode = 404;
    // setup a result, not really needed but for future
    // multiple status codes, this is useful
    const result = {
        status: statusCode
    };

    res.status(result.status);
    // render the file path to the view when this function is called
    res.render(viewFilePath, {}, (err, html) => {
        // if there is an error
        if (err) {
            // then render the error instead of the view
            return res.status(res.status).join(result);
        }
        // otherwise display the viewFilePath+'.html' file
        res.send(html);
    });
};