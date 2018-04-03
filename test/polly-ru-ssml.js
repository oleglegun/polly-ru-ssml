const t = require('tap')
const pollyRuSSML = require('../lib/polly-ru-ssml')
const { ValidationError } = require('../lib/errors')

/*-----------------------------------------------------------------------------
 *  SSML generation tests
 *----------------------------------------------------------------------------*/

 const testData = [
    ['123', '123'],
    [' eng ', ' <lang xml:lang="en-US">eng </lang>'],
    ['ENG', '<lang xml:lang="en-US">ENG</lang>'],
    ['рус eng', 'рус <lang xml:lang="en-US">eng</lang>'],
    ['eng рус', '<lang xml:lang="en-US">eng </lang>рус'],
    ['engрус', '<lang xml:lang="en-US">eng</lang>рус'],
    ['рус eng рус', 'рус <lang xml:lang="en-US">eng </lang>рус'],
]

testData.forEach(texts => {
    t.equal(pollyRuSSML.ssml(texts[0]), texts[1])
})

testData.forEach(texts => {
    t.equal(pollyRuSSML.speak(texts[0]), `<speak>${texts[1]}</speak>`)
})

/*-----------------------------------------------------------------------------
 *  Configuration validation tests
 *----------------------------------------------------------------------------*/

t.throws(function() {
    pollyRuSSML.configure()
})

t.throws(function() {
    pollyRuSSML.configure("")
})

const validConfigs = [
    {},
    { volume: 'loud' },
    { country: 'uk', volume: 'x-soft', globalVolume: 'soft', rate: 'slow' },
    { volume: 'x-loud', rate: 'slow' },
    { volume: 'x-loud', rate: '' },
]

validConfigs.forEach(options => {
    t.doesNotThrow(function() {
        pollyRuSSML.configure(options)
    })
})

validConfigs.forEach(options => {
    t.doesNotThrow(function() {
        pollyRuSSML.speak("", options)
    })
})

const invalidConfigs = [
    { country: 'ru' },
    { volume: 'lou' },
    { vol: 'x-loud', rate: 'slow' },
    { volume: {} },
]

invalidConfigs.forEach(options => {
    t.throws(function() {
        pollyRuSSML.configure(options)
    }, ValidationError)
})

invalidConfigs.forEach(options => {
    t.throws(function() {
        pollyRuSSML.speak("", options)
    }, ValidationError)
})
