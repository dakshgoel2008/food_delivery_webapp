// its a call back function:
const ErrorWrapper = (cb) => {
    return async function (req, res, next) {
        try {
            await cb(req, res, next);
        } catch (err) {
            res.status(err.statusCode).json({
                status: err.statusCode,
                message: err.message,
                success: false,
            });
        }
    };
};

export default ErrorWrapper;
