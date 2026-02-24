module.exports = {
  mongooseControllerCatch: (func, fallbackMessage) => {
    return async (req, res, next) => {
      try {
        await func(req, res, next);
      } catch (error) {
        console.log(error);
        res.status(error.httpStatus ? error.httpStatus : 400);
        if (error.errors) {
          res.json({
            errors: Object.entries(error.errors).map((error) => {
              return { field: error[0], message: error[1].message };
            }),
          });
        } else if (error.message) {
          res.json({
            error: error.message,
          });
        } else {
          // DEBUG, TO-DO, REMOVE: This prints if the error isn't handled in a nice way, make sure that all possible errors that come up in testing are handled properly, and disable this for a production version!
          console.error(error);
          res.json({
            error: fallbackMessage,
          });
        }
      }
    };
  },

  throwHttpError: (message, httpStatus) => {
    const error = new Error(message);
    error.httpStatus = httpStatus;
    throw error;
  },
};
