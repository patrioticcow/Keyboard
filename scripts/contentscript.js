'use strict';

console.log('contentscript');

$(document).ready(function () {
    var inputs = $(document).find('input[type="text"]');
    var textarea = $(document).find('textarea');

    $bod
    $.each(inputs, function (k, el) {
        if ($(el).prop('type') !== 'hidden') {
            $(el).on('click', function () {
                console.log('clicked');

                chrome.runtime.sendMessage({open: "true"}, function(response) {
                    console.log(response);
                });
            });

        }
    });
});


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log(request);
        console.log(sender);

        console.log("from the extension");

        sendResponse({farewell: "goodbye"})
    });
