(function ($, wordify) {
    'use strict';

    var timer,
        $input = $('#wordify-input'),
        $holder = $('#holder');

    function renderMarkup(results) {
        var markup = '',
            i,
            a;

        if (!results.length) {
            markup += '<div class="centre">Nothing to see here</div>';
        } else {
            // cycle through main array
            for (i = results.length - 1; i >= 0; i -= 1) {

                // cycle inner arrays
                for (a = 0; a < results[i].length; a += 1) {
                    if (a === 0) {
                        markup += '<h2>' + (results[i][a].length) + '</h2>'; // set title to match word length
                        markup += '<div>'; // container div - closed outside of loop
                    }
                    markup += '<div>' + results[i][a] + '</div>';
                }

                markup += '</div>';
            }
        }
        $holder[0].innerHTML = markup;
    }

    // get the dictionary array
    $.ajax({
        url: '/dictionary/words.json',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            // set dictionary array
            wordify.dictionary = res;

            $input.on('input', function () {
                if (timer) {
                    clearTimeout(timer);
                }
                if (!$input.hasClass('loading')) {
                    $input.addClass('loading');
                }
                timer = setTimeout(function () {
                    $input.removeClass('loading');
                    renderMarkup($input.val().replace(/[^a-zA-Z]/g, '').toLowerCase().wordify(true));
                }, 250);
            });
        }
    });

}(window.jQuery, window.wordify));
