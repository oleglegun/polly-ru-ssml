# Polly Russian SSML Enhancer

## Synopsis

Convert russian text, that contains english words into a valid SSML for [AWS Polly TTS](https://aws.amazon.com/ru/polly/), thus enhancing synthesized audio pronunciation for english words within the russian language context.

## Code Example

### Basic usage

```js
const ruSSML = require('polly-ru-ssml')

// Method ssml() returns string with wrapped english words
ruSSML.ssml("русский english")
// русский <lang xml:lang="en-US">english</lang>

// Method speak() additionally wraps result with <speak/> tags
ruSSML.speak("русский english")
// <speak>русский <lang xml:lang="en-US">english</lang></speak>
```

### Configuration

By default configuration is not necessary, but setting one can greatly improve intelligibility of english speech for russian users. Additionally, I found that the default volume for synthesized speech is quite low for using with Amazon Alexa assistant.

[Here](#api-reference) you can find API documentation.

```js
const ruSSML = require('polly-ru-ssml')

// 1. Global configuration for all further usages
ruSSML.configure({
    country: 'uk',
    globalVolume: 'loud',
    volume: 'x-loud',
    rate: 'slow',
})

ruSSML.speak('русский english')
/**
 * <speak>
 *  <prosody volume="loud">
 *      русский
 *      <lang xml:lang="en-UK">
 *          <prosody volume="x-loud">
 *              <prosody rate="slow">
 *                  english
 *              </prosody>
 *          </prosody>
 *      </lang>
 *  </prosody>
 * </speak>
 */

// 2. Local configuration only for current usage (overrides global configuration)
ruSSML.speak('русский english', {
    globalVolume: 'x-loud',
    rate: 'x-slow',
})
/**
 * <speak>
 *  <prosody volume="x-loud">
 *      русский
 *      <lang xml:lang="en-US">
 *          <prosody rate="x-slow">
 *              english
 *          </prosody>
 *      </lang>
 *  </prosody>
 * </speak>
 */
```

## Motivation

By default, russian speakers in [AWS Polly TTS](https://aws.amazon.com/ru/polly/) service (Maxim, Tatiana) are not particularly good at pronouncing english words within the russian language context, so this library fixes it by explicitly wrapping each english word with `<lang xml:lang="en-US">word</lang>` tags.

## Installation

`npm install polly-ru-ssml`

## API Reference

In progress...

## Tests

`npm test`

## Contributors

Any contributions are very welcome.

## License

MIT.

## Change History

### [0.1.2] - 2018-04-03
- Add Readme.

### [0.1.1] - 2018-04-03
- Add default configuration option `country` if it is absent in local configuration. 

### [0.1.0] - 2018-04-03
- Initial release.
