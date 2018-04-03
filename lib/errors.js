class ValidationError extends Error {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message)
        this.name = 'Validation Error'
    }
}

exports.ValidationError = ValidationError