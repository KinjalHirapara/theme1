$(function() {

    $('[data-toggle="popover"]').popover().click(function() {
        setTimeout(function() {
            $('[data-toggle="popover"]').popover('hide');
        }, 5000);
    });

    $('.sidebar-collapse').click(function(e) {

        $('.sidebar').toggleClass('visible');
        if ($('.sidebar').hasClass('visible')) {
            $('.sidebar-conflict').hide();

        } else {
            $('.sidebar-conflict').show();
        }
        e.stopPropagation();
        return false;

    })


    $('img').each(function() {
            var windowx = $(window).width();
            var h = $(this).height();
            var w = $(this).width();
            if (h >= w && windowx > 415) {
                $(this).addClass('square');
            }
        })
        // Scrolling Animation for LInks
    $('a[href*="#"]').click(function(event) {
        // Only Scroll to in site links
        var duration = 500;
        $('.sidebar').removeClass('visible');
        if ($('.sidebar').hasClass('visible')) {
            $('.sidebar-conflict').hide();

        } else {
            $('.sidebar-conflict').show();
        }

        if ($(this).hasClass('nav-link')) {
            duration = 0;
        }
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) {
            //check for ID
            var target = $(this.hash);
            // If not check for name
            if (!target.length) {
                target = $('[name=' + this.hash.slice(1) + ']');
            }

            // Does a target exist?
            if (target.length) {
                // Prevent Default
                event.preventDefault();

                //Consider Fixed/Unfixed Menu difference for Scrolling
                var scrollOffsetHeight = 0;

                //Scroll
                $('html, body').animate({ scrollTop: target.offset().top - scrollOffsetHeight }, duration, function() {
                    // Callback after animation
                    var $target = $(target);
                    //change focus
                    $(target).focus();
                    if ($(target).is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $(target).attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $(target).focus(); // Set focus again
                    };
                });
                return false;



            }
        }
    })

    function insertCut(selector, count, repsize, repflag) {
        var oldcount = count;
        if (selector.get(0).nodeType == 3) {
            count += $.trim(selector.text()).length;
            if (count > repsize) {
                var txt = $.trim(selector.text());
                // Begin Insertion Process for features cut
                if (oldcount <= repsize && !repflag) {
                    var range = repsize - oldcount;
                    var str1 = txt.substring(0, range);
                    var str2 = txt.substring(range);
                    if (str2.indexOf(" ") > 0) {
                        str2 = str2.replace(" ", '<span class="features-cut"></span> ')
                    } else {
                        str2 += '<span class="features-cut"></span>';
                    }
                    var strnew = str1 + str2;
                    repflag = true;
                    selector.replaceWith(strnew);
                }
            }
        } else {
            selector.contents().each(function() {
                count = insertCut($(this), count, repsize, repflag);
            })
        }
        return count;

    }

    if ($('.features-text-wrap').length > 0) {
        var repsize = 1500;
        var parentx = $('.features-text-wrap');
        parentx.find('.features-cut').remove();
        var featureCount = insertCut(parentx, 0, 1500, false);
        if (featureCount <= repsize) {
            $('.features-wrapper').addClass('fullvisible');
            $('.features-buttons').hide();
        } else {

            var selectorx = $('.features-text-wrap').find('.features-cut');
            var dx = parentx.offset().top
            var cx = (selectorx.offset().top);
            var hx = cx - dx;

            $('.features-wrapper').removeClass('fullvisible');
            $('.features-text').css('max-height', hx + 'px');
            $('.features-buttons').show();


            $('.features-expand').click(function() {
                AOS.refresh();
                $('.features-wrapper').addClass('fullvisible');
                $('.features-text').css('max-height', '100%');
                window.setTimeout(function() {
                    $(window).trigger('resize.px.parallax');
                    $('.features-text').css('max-height', 'none');
                }, 100)
                AOS.refresh();
            })
            $('.features-collapse').click(function() {
                AOS.refresh();
                $('.features-wrapper').removeClass('fullvisible');
                $('.features-text').css('max-height', hx + 'px');
                window.setTimeout(function() {
                    $(window).trigger('resize.px.parallax');
                }, 200)
                $(window).scrollTop($('#features .features-wrapper').offset().top - 80);
                AOS.refresh();
            })
        }
    }

    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "zoom",
            //"share",
            "slideShow",
            "fullScreen",
            //"download",
            "thumbs",
            "close"
        ],

    });
    var demoDiv = document.getElementById('scrollbar');
    const ps = new PerfectScrollbar(demoDiv);

    if ($('.agent-bio').length > 0) {
        $('.agent-bio').each(function() {
            var current = $(this);
            var repsizeAgent = 800;
            var parent_agent = current.find('.agent-bio-text-wrap');
            parent_agent.find('.features-cut').remove();
            var agentCount = insertCut(parent_agent, 1, 800, false);
            if (agentCount <= repsizeAgent) {
                current.find('.agent-bio-wrapper').addClass('fullvisible');
                current.find('.agent-bio-buttons').hide();
            } else {

                var selectoragent = current.find('.agent-bio-text-wrap').find('.features-cut');
                var d_agent = parent_agent.offset().top
                var c_agent = (selectoragent.offset().top);
                var h_agent = c_agent - d_agent;
                current.find('.agent-bio-wrapper').removeClass('fullvisible');
                current.find('.agent-bio-text').css('max-height', h_agent + 'px');
                current.find('.agent-bio-buttons').show();
                current.find('.agent-bio-expand').click(function() {
                    AOS.refresh();
                    current.find('.agent-bio-wrapper').addClass('fullvisible');
                    current.find('.agent-bio-text').css('max-height', '100%');
                    window.setTimeout(function() {
                        $(window).trigger('resize.px.parallax');
                        current.find('.agent-bio-text').css('max-height', 'none');
                    }, 100)
                    AOS.refresh();
                })
                current.find('.agent-bio-collapse').click(function() {
                    AOS.refresh();
                    current.find('.agent-bio-wrapper').removeClass('fullvisible');
                    current.find('.agent-bio-text').css('max-height', h_agent + 'px');
                    window.setTimeout(function() {
                        $(window).trigger('resize.px.parallax');
                    }, 200);
                    $('html,body').animate({
                            scrollTop: current.parents('.agents-container').offset().top - 80
                        },
                        500);
                    AOS.refresh();
                })
            }
        });

    }
    $("table").wrap("<div class='table-responsive'></div>");
})