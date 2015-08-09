# Wordify
Unjumble letters into words - doubles up as a countdown cheat

## Installation
Just grab the zip from the [releases](https://www.github.com/mynamesleon/wordify/releases) here on Git.

Or install via bower `bower install wordify`

## Demo
[Wordify demo page](http://wordify.mynamesleon.com)

## Usage
Wordify creates a global namespace, which needs to contain a dictionary - an array of words - to cycle through when checking the string. This needs to be stored at `wordify.dictionary`. The main wordify file does not contain a word dictionary in order to reduce size - I have included one in the repository though sampled from the [English Open Word List for reference](http://dreamsteep.com/projects/the-english-open-word-list.html).

Once you have a dictionary added, wordify can be called from the global function, or the string prototype:

```js
wordify('jumble of letters');
```

or

```js
('jumble of letters').wordify();
```

This will return the first matching word from the dictionary of the greatest length, or if no word is found, an empty string.

The function accepts a second optional boolean parameter, indicating if you want an array of all matching words returned. For example, for `wordify('enot', true)`, an example returned array might be:

```js
[
    ['no', 'on', 'to'],
    ['eon', 'net', 'not', 'one', 'ten', 'toe', 'ton'],
    ['note', 'tone']
]
```

If no results are found then an empty array will be returned.
