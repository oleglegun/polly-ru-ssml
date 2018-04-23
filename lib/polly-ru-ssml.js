const { ValidationError } = require('./errors')

/**
 * Polly SSML generator for russian texts, that contain latin characters.
 * @module polly-ru-ssml
 * @example
 * const pollyRuSSML = require('polly-ru-ssml')
 */

/**
 * Configuration options.
 * @typedef {Object} ConfigurationOptions
 * @property {string} [country=us] Country code for `<lang/>` tags. Valid values: `us`, `uk`.
 * @property {string} [rate] Speech rate for latin characters. Valid values: `x-slow`, `slow`, `medium`, `fast`, `x-fast`.
 * @property {string} [globalVolume] Global audio volume. Valid values: `x-soft`, `soft`, `medium`, `loud`, `x-loud`.
 * @property {string} [volume] Local audio volume for latin characters. Valid values: `x-soft`, `soft`, `medium`, `loud`, `x-loud`.
 */

 // Private prop
const _config = Symbol()

// Private methods
const _validateOptions = Symbol()
const _render = Symbol()
const _isLatinChar = Symbol()
const _isWhitespace = Symbol()


/**
 * @class PollyRuSSML
 * @constructor
 */
class PollyRuSSML {
    constructor() {
        // default configuration
        this[_config] = {
            country: 'us',
        }
    }

    /**
     * Wrap all english words with `<lang/>` SSML tags.
     *
     * @param {string} text String input for converting to SSML.
     * @param {ConfigurationOptions} [options] Local configuration options.
     * @returns {string} SSML text with wrapped latin characters.
     *
     * @example
     * const pollyRuSSML = require('polly-ru-ssml')
     * pollyRuSSML.ssml("текс text")
     */
    ssml(text, options) {
        // use local configuration if passed
        options = options || this[_config]

        // add default country option if not passed
        if (!options.country) {
            options.country = 'us'
        }

        // check if options are valid, otherwise - throw an error
        this[_validateOptions](options)

        let globalOpenTags = ''
        let globalCloseTags = ''

        if (options.globalVolume) {
            globalOpenTags = `<prosody volume="${options.globalVolume}">`
            globalCloseTags = '</prosody>'
        }

        let openTags = `<lang xml:lang="en-${options.country.toUpperCase()}">`
        let closeTags = `</lang>`

        if (options.volume) {
            openTags += `<prosody volume="${options.volume}">`
            closeTags = '</prosody>' + closeTags
        }

        if (options.rate) {
            openTags += `<prosody rate="${options.rate}">`
            closeTags = '</prosody>' + closeTags
        }

        return this[_render](text, globalOpenTags, globalCloseTags, openTags, closeTags)
    }

    /**
     * Wrap all english words with `<lang/>` SSML tags and enclose the result with `<speak/>` tags.
     *
     * @param {string} text String input for converting to SSML.
     * @param {ConfigurationOptions} [options]  Local configuration options.
     * @returns {string} Processed text ready for Polly TTS.
     *
     * @example
     * const pollyRuSSML = require('polly-ru-ssml')
     * pollyRuSSML.speak("текс text")
     */
    speak(text, options) {
        return '<speak>' + this.ssml(text, options) + '</speak>'
    }

    /**
     * Set the global configuration options.
     *
     * @param {ConfigurationOptions} options  Object with configuration options.
     *
     * @example
     * const pollyRuSSML = require('polly-ru-ssml')
     * pollyRuSSML.configure({country: "uk", volume: "loud"})
     */
    configure(options) {
        if (this[_validateOptions](options)) {
            // merge options with global configuration
            this[_config] = Object.assign({}, this[_config], options)
        }
    }

    /**
     * @param {object} options
     * @private
     */
    [_validateOptions](options) {
        if (!options) {
            throw new ValidationError('Parameter "options" is missing.')
        }

        if (typeof options !== 'object') {
            throw new ValidationError('Parameter "options" must be an object.')
        }

        const validOptions = {
            country: ['us', 'uk'],
            rate: ['x-slow', 'slow', 'medium', 'fast', 'x-fast'],
            globalVolume: ['x-soft', 'soft', 'medium', 'loud', 'x-loud'],
            volume: ['x-soft', 'soft', 'medium', 'loud', 'x-loud'],
        }

        const validOptionsKeys = Object.keys(validOptions)

        Object.keys(options).forEach(option => {
            if (validOptionsKeys.indexOf(option) === -1) {
                throw new ValidationError(`'${option}' is not a valid option.`)
            }
        })

        validOptionsKeys.forEach(optionName => {
            if (options[optionName]) {
                const optionValue = options[optionName]
                if (validOptions[optionName].indexOf(optionValue) === -1) {
                    const message = `Value of option '${optionName}' = '${optionValue}' is not valid. Valid values: ${validOptions[
                        optionName
                    ].join(', ')}.`
                    throw new ValidationError(message)
                }
            }
        })

        return true
    }

    /**
     * Find and wrap latin characters with `<lang/>` tags.
     *
     * @param {string} text
     * @param {string} globalOpenTags
     * @param {string} globalCloseTags
     * @param {string} openTags
     * @param {string} closeTags
     * @private
     */
    [_render](text, globalOpenTags, globalCloseTags, openTags, closeTags) {
        const len = text.length
        let started
        let startPos

        let ssml = globalOpenTags

        // iterate over all chars
        for (let i = 0; i < len; i++) {
            if (this[_isLatinChar](text[i])) {
                if (!started) {
                    started = true
                    startPos = i
                }
            } else {
                if (started) {
                    // if whitespace - continue
                    if (this[_isWhitespace](text[i])) {
                        started = false
                        ssml += openTags + text.slice(startPos, i) + closeTags + text[i]
                    }
                } else {
                    // if not whitespace - stop and wrap words with tags
                    ssml += text[i]
                }
            }
        }

        // check if word was not closed
        if (started) {
            ssml += openTags + text.slice(startPos, len) + closeTags
        }

        return ssml + globalCloseTags
    }

    /**
     * Check if a character is ASCII latin character.
     *
     * @param {string} char
     * @returns {boolean}
     * @private
     */
    [_isLatinChar](char) {
        const cp = char.codePointAt(0)
        return (cp > 64 && cp < 91) || (cp > 96 && cp < 123)
    }

    /**
     * Check if a character is a space character or equivalent.
     *
     * @param {string} char
     * @returns {boolean}
     * @private
     */
    [_isWhitespace](char) {
        return ' \t\n\r\v'.indexOf(char) === -1
    }
}

module.exports = new PollyRuSSML()
