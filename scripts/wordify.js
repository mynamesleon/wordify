/*
 * unjumble letters into words
 * Leon Slater
 * http://mynamesleon.com
 * github.com/mynamesleon/wordify
 */

(function () {
    'use strict';

    var length = 0,
        letters = [],
        lettersObj = {};

    /*
     * create object from passed in string
     *      stored as object so that entries can be easily deleted
     * @return {object}
     */
    function createLettersObj() {
        var o = {},
            i;
        for (i = 0; i < length; i += 1) {
            o[i] = letters[i];
        }
        return o;
    }

    /*
     * check letter from dictionary word against letter from passed in string
     * @param letter {string}: letter from dictionary word
     * @return {boolean}: if that letter is available in the passed in string
     */
    function checkLetter(letter) {
        var n;
        for (n in lettersObj) {
            if (lettersObj.hasOwnProperty(n)) {
                if (letter === lettersObj[n]) {
                    // delete letter if it was to not match letter more than once
                    delete lettersObj[n];
                    return true;
                }
            }
        }
        return false;
    }

    /*
     * check word from dictionary against the chosen string
     * @param word {string}: word from dictionary
     * @return {boolean}: if word is contained in the passed in string
     */
    function checkWord(word) {
        var splitWord = word.split(''),
            n;

        for (n = 0; n < splitWord.length; n += 1) { // cycle through letters
            if (!checkLetter(splitWord[n])) {
                return false;
            }
        }
        return true;
    }

    /*
     * get results array
     * @param str {string}
     * @return {array}: array of matching words (if any)
     */
    function getResults(str) {
        var words = window.wordify.dictionary,
            result = [],
            w;

        if (typeof words === 'undefined' || !words.length) {
            return [];
        }

        // reset values
        length = str.length;
        letters = str.split('');
        lettersObj = {};

        for (w = 0; w < words.length; w += 1) {
            if (words[w].length <= length && words[w] !== '') {

                lettersObj = createLettersObj();

                if (checkWord(words[w].toLowerCase())) {
                    result.push(words[w]);
                }
            }
        }
        return result;
    }

    /*
     * order the main results array
     * @param results {array}: array of word entries
     * @return {return}: array of child arrays consisting of words of equal length
     */
    function orderResults(results) {
        var o = {},
            a = [],
            i,
            p;

        // use an object to sort results into categories
        for (i = 0; i < results.length; i += 1) {
            if (typeof o[results[i].length] === 'undefined') {
                o[results[i].length] = [results[i]];
            } else {
                o[results[i].length].push(results[i]);
            }
        }

        // convert object to an array
        for (p in o) {
            if (o.hasOwnProperty(p)) {
                a.push(o[p]);
            }
        }

        return a;
    }

    /*
     * unjumble letters into words
     * @param str (string): string to unjumble
     * @param all {boolean} optional: return all found words if true
     * @return {string|array}: return array of arrays if all is true,
     *      otherwise returns first matching word of greatest length
     *      or returns empty string if no matching words were found
     */
    window.wordify = window.wordify || function (str, all) {
        var results = getResults(str),
            ordered;

        if (typeof results === 'undefined' || !results.length) {
            return all ? [] : '';
        }

        ordered = orderResults(results);

        if (all) {
            return ordered;
        } else {
            return ordered[results.length - 1][0];
        }
    };

    /*
     * dictionary storage - expects array of strings
     */
    window.wordify.dictionary = [];

    /*
     * store wordify on the string prototype
     * @param all {boolean} optional: return all found words if true
     * @return {string|array}: see details on main wordify function above
     */
    String.prototype.wordify = function (all) {
        return window.wordify(this, all);
    };

}());
