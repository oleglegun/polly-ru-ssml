class ValidationError extends Error {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

exports.ValidationError = ValidationError