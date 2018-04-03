const t = require('tap')
const ruSSML = require('../lib/polly-ru-ssml')
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
    t.equal(ruSSML.ssml(texts[0]), texts[1])
})

testData.forEach(texts => {
    t.equal(ruSSML.speak(texts[0]), `<speak>${texts[1]}</speak>`)
})

/*-----------------------------------------------------------------------------
 *  Configuration validation tests
 *----------------------------------------------------------------------------*/

const validConfigs = [
    {},
    { volume: 'loud' },
    { country: 'uk', volume: 'x-soft', globalVolume: 'soft', rate: 'slow' },
    { volume: 'x-loud', rate: 'slow' },
    { volume: 'x-loud', rate: '' },
]

validConfigs.forEach(options => {
    t.doesNotThrow(function() {
        ruSSML.configure(options)
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
        ruSSML.configure(options)
    }, ValidationError)
})

const p = require('../index')