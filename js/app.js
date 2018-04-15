$(document).ready(function() {

    /* Makes nav-button work - clicking it opens/closes the #mini-nav menu */
    $("#nav-button").click(function() {
        $("#mini-nav").slideToggle()
    });

    /* Closes #mini-nav if the browser window is resized */
    $(window).resize(function() {
        $("#mini-nav").hide();
    });

    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 500);
        }
    });

    $("a").click(function() {
        if ($(this).hasClass("return-to-top-button")) {      /* is the link the .return-to-top-button at the bottom of each .page,  */
            $("#mini-nav").slideUp();                        /* hide the #mini-nav                                                  */
            $("html, body").animate({scrollTop: "0px" });    /* scroll the window to the top of the page                            */
        }
    });

});
