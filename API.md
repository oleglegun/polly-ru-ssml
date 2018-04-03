<a name="module_polly-ru-ssml"></a>

## polly-ru-ssml
Polly SSML generator for russian texts, that contain latin characters.

**Example**  
```js
const pollyRuSSML = require('polly-ru-ssml')
```

* [polly-ru-ssml](#module_polly-ru-ssml)
    * [~PollyRuSSML](#module_polly-ru-ssml..PollyRuSSML)
        * [.ssml(text, [options])](#module_polly-ru-ssml..PollyRuSSML+ssml) ⇒ <code>string</code>
        * [.speak(text, [options])](#module_polly-ru-ssml..PollyRuSSML+speak) ⇒ <code>string</code>
        * [.configure(options)](#module_polly-ru-ssml..PollyRuSSML+configure)
    * [~ConfigurationOptions](#module_polly-ru-ssml..ConfigurationOptions) : <code>Object</code>

<a name="module_polly-ru-ssml..PollyRuSSML"></a>

### polly-ru-ssml~PollyRuSSML
PollyRuSSML

**Kind**: inner class of [<code>polly-ru-ssml</code>](#module_polly-ru-ssml)  

* [~PollyRuSSML](#module_polly-ru-ssml..PollyRuSSML)
    * [.ssml(text, [options])](#module_polly-ru-ssml..PollyRuSSML+ssml) ⇒ <code>string</code>
    * [.speak(text, [options])](#module_polly-ru-ssml..PollyRuSSML+speak) ⇒ <code>string</code>
    * [.configure(options)](#module_polly-ru-ssml..PollyRuSSML+configure)

<a name="module_polly-ru-ssml..PollyRuSSML+ssml"></a>

#### pollyRuSSML.ssml(text, [options]) ⇒ <code>string</code>
Wrap all english words with `<lang/>` SSML tags.

**Kind**: instance method of [<code>PollyRuSSML</code>](#module_polly-ru-ssml..PollyRuSSML)  
**Returns**: <code>string</code> - SSML text with wrapped latin characters.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | String input for converting to SSML. |
| [options] | <code>ConfigurationOptions</code> | Local configuration options. |

**Example**  
```js
const pollyRuSSML = require('polly-ru-ssml')
pollyRuSSML.ssml("текс text")
```
<a name="module_polly-ru-ssml..PollyRuSSML+speak"></a>

#### pollyRuSSML.speak(text, [options]) ⇒ <code>string</code>
Wrap all english words with `<lang/>` SSML tags and enclose the result with `<speak/>` tags.

**Kind**: instance method of [<code>PollyRuSSML</code>](#module_polly-ru-ssml..PollyRuSSML)  
**Returns**: <code>string</code> - Processed text ready for Polly TTS.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | String input for converting to SSML. |
| [options] | <code>ConfigurationOptions</code> | Local configuration options. |

**Example**  
```js
const pollyRuSSML = require('polly-ru-ssml')
pollyRuSSML.speak("текс text")
```
<a name="module_polly-ru-ssml..PollyRuSSML+configure"></a>

#### pollyRuSSML.configure(options)
Set the global configuration options.

**Kind**: instance method of [<code>PollyRuSSML</code>](#module_polly-ru-ssml..PollyRuSSML)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>ConfigurationOptions</code> | Object with configuration options. |

**Example**  
```js
const pollyRuSSML = require('polly-ru-ssml')
pollyRuSSML.configure({country: "uk", volume: "loud"})
```
<a name="module_polly-ru-ssml..ConfigurationOptions"></a>

### polly-ru-ssml~ConfigurationOptions : <code>Object</code>
Configuration options.

**Kind**: inner typedef of [<code>polly-ru-ssml</code>](#module_polly-ru-ssml)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [country] | <code>string</code> | <code>&quot;us&quot;</code> | Country code for `<lang/>` tags. Valid values: `us`, `uk`. |
| [rate] | <code>string</code> |  | Speech rate for latin characters. Valid values: `x-slow`, `slow`, `medium`, `fast`, `x-fast`. |
| [globalVolume] | <code>string</code> |  | Global audio volume. Valid values: `x-soft`, `soft`, `medium`, `loud`, `x-loud`. |
| [volume] | <code>string</code> |  | Local audio volume for latin characters. Valid values: `x-soft`, `soft`, `medium`, `loud`, `x-loud`. |

