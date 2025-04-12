const errorController = {}

errorController.trigger500Error = async function (req, res, next) {
    // Intentionally throw an error for testing
    throw new Error("Internal Server Error Test")
}

errorController.handle404 = async function (req, res, next) {
    const error = new Error("Page Not Found")
    error.status = 404
    next(error)
}

module.exports = errorController