class BaseError extends Error {
    statusCode: number = 500
    constructor(message) {
        super(message)
    }
}

export default BaseError
