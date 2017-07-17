/**
 * @description
 * Manage 403/404/500 etc errors

 * @module lib/errors
 * @param app {object} - express app
 */

/**
 * @description
 * init errors function
 * @param app {object} - express app
 * @param app
 */
exports.init = function (app) {

    /*
    app.use(function (err, req, res, next) {
      if (err) {
          return  res.status(401).json({error:98,'message':err});
      }
    });
    */

    //jwt error
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
           return  res.status(401).json({error:98,'message':'you are not authorized'});
        }
        next(err);
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {

        var systemError = null;

         res.status(err.status || 500);


        if (app.get("env") === 'development') {
            systemError = err;
        }

        return res.json({error: 99, message: err.message, systemError: systemError});
    });
};
