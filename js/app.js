$(document).ready(function() {

    /* Makes nav-button work - clicking it opens/closes the #mini-nav menu */
    $("#nav-button").click(function() {
        $("#mini-nav").slideToggle()
    });

    /* Closes #mini-nav if the browser window is resized */
    $(window).resize(function() {
        $("#mini-nav").hide();
    });

    /* Animation slides page to clicked link */
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 500);
        }
    });

});
