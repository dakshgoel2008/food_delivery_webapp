const ErrorWrapper = (cb) => {
    return async function (req, res, next) {
        try {
            await cb(req, res, next);
        } catch (err) {
            const statusCode = err.statusCode || 500; // Default to 500 if undefined
            res.status(statusCode).json({
                status: statusCode,
                message: err.message || "Internal Server Error",
                success: false,
            });
        }
    };
};

export default ErrorWrapper;
