'use strict';

$(document).ready(function () {
    $('.js-toggleDetails').on('click', function () {
        $(this).next('.js-details').toggle(800);
    });

    $('.js-menuToggle').on('click', function (e) {
        e.preventDefault();

        $('#sidebar').toggleClass('menu-active');
    });
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(function (r) {
        r && r.unregister();
    });
}