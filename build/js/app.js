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

    // Decides what to do when clicking on a link
    $('#projects-selector a').click(function() {
        var clickedHref = $(this).attr('href');    // Stores the href of clicked link in clickedHref
        event.preventDefault();                    // don't go to the link in the HTML
        $('#projects-container').fadeOut('', function() {
            $('.all').hide();            // hide the .page you were on
            $(clickedHref).show();                 // show the .page you are going to
            $('#projects-container').fadeIn();
        });
    });

    var fadeIn = $('.fade-item');

    $(document).on('scroll', function() {
        var currScrollPos = $(document).scrollTop();

        fadeIn.each(function() {
            var elemOffsetBottom = ($(this).offset().top - $(window).height());
            if (currScrollPos < elemOffsetBottom) {
                $(this).css('opacity', 0)
            }
            if (currScrollPos > elemOffsetBottom) {
                $(this).css('opacity', (currScrollPos - elemOffsetBottom)/100)
            };
        })
    })

    $(window).resize(function() {
        var currScrollPos = $(document).scrollTop();

        fadeIn.each(function() {
            var elemOffsetBottom = ($(this).offset().top - $(window).height());
            if (currScrollPos < elemOffsetBottom) {
                $(this).css('opacity', 0)
            }
            if (currScrollPos > elemOffsetBottom) {
                $(this).css('opacity', (currScrollPos - elemOffsetBottom)/100)
            };
        })
    });

    // var fadeOut = $('.fade-item');
    //
    // $(document).on('scroll', function() {
    //     var currScrollPos = $(document).scrollTop();
    //
    //     fadeOut.each(function() {
    //         var elemOffsetTop = ($(this).offset().top - 100);
    //         if (currScrollPos > elemOffsetTop) {
    //             $(this).css('opacity', 1 - (currScrollPos - elemOffsetTop)/100)
    //         }
    //     })
    // })

});
