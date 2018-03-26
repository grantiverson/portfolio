$(document).ready(function() {

    /* Hide all pages */
    //$("#contact, #history, #professional, #academic, #skills, #portfolio, #references").hide();

    /* Makes nav-button work - clicking it opens/closes the #mini-nav menu */
    $("#nav-button").click(function() {
        $("#mini-nav").slideToggle()
    });

    /* Closes #mini-nav if the browser window is resized */
    $(window).resize(function() {
        $("#mini-nav").hide();
    });

    /* #main-nav animations */
    $("#main-nav ul ul").hide();                         /* Hides submenus */
    $("#main-nav ul li").hover(function() {              /* Makes submenus fadeIn/fadeOut on hover */
        $(this).find("ul").stop(true,true).fadeIn();
    }, function() {
        $(this).find("ul").stop(true,true).fadeOut();
    });
    $("#main-nav ul ul").click(function() {              /* Makes submenus fadeOut on click */
        $(this).fadeOut();
    });

    /* Decides what to do when clicking on a link */
    // $("a").click(function() {
    //     var clickedHref = $(this).attr("href");                          /* Stores the href of clicked link in clickedHref                      */
    //     var hrefTest = /http/i.test(clickedHref)                         /* does it include "http"                                              */
    //                 || /mailto/i.test(clickedHref)                       /* does it include "mailto"                                            */
    //                 || /tel/i.test(clickedHref)                          /* does it include "tel"                                               */
    //                 || /sms/i.test(clickedHref)                          /* does it include "sms"?                                              */
    //                 || /work/i.test(clickedHref)                         /* does it include "work"?                                             */
    //     if (hrefTest) {
    //         return;                                                      /* if it does include any of these, do nothing                         */
    //     } else if ($(this).hasClass("return-to-top-button")) {           /* is the link the .return-to-top-button at the bottom of each .page,  */
    //         event.preventDefault();
    //         $("#mini-nav").slideUp();                                    /* hide the #mini-nav                                                  */
    //     } else {
    //         event.preventDefault();                                      /* otherwise, don't go to the link in the HTML                         */
    //         $("#mini-nav").slideUp();                                    /* hide the #mini-nav                                                  */
    //         $("main").fadeOut("", function() {
    //             $(".page").hide();                                       /* hide the .page you were on                                          */
    //             $("a.active").removeClass("active");                     /* remove the class .active from the #main-nav or #mini-nav link       */
    //             $(clickedHref + "-main-nav").addClass("active").blur();  /* add the class .active to the #main-nav link                         */
    //             $(clickedHref + "-mini-nav").addClass("active").blur()   /* add the class .active to the #mini-nav link                         */
    //             $(clickedHref).show();                                   /* show the .page you are going to                                     */
    //             $("main").fadeIn();
    //         });
    //     }
    //     $("html, body").animate({scrollTop: "0px" });                    /* scroll the window to the top of the page                            */
    // });

});
