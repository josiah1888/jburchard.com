'use strict';

$(document).ready(function() {
    $('.js-toggleDetails').on('click', function() {
        $(this).next('.js-details').toggle(800);
    });    
});