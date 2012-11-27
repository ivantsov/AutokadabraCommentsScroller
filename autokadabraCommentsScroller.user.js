// ==UserScript==
// @name autokadabraCommentsScroller
// @description scroll to user comments
// @author Alexander Ivantsov
// @license MIT
// @version 1.0
// @include http://autokadabra.ru/shouts/*
// ==/UserScript==
if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
    (function page_scope_runner() {
        var my_src = "(" + page_scope_runner.caller.toString() + ")();";
        var script = document.createElement('script');

        script.setAttribute("type", "text/javascript");
        script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

        setTimeout(function () {
            document.body.appendChild(script);
            document.body.removeChild(script);
        }, 0);
    })();

    return;
};


function scrollComments(){
    (function($){
        var arrowUp = "<div id='commentsScrollerUp' style='width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-bottom: 25px solid #6495ED; cursor: pointer; opacity: 0.5'></div>";
        var arrowDown = "<div id='commentsScrollerDown' style='width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #6495ED; cursor: pointer; opacity: 0.5'></div>";
        var countComments_text = "<div id='countComments'></div>";
        var arrowsArea = "<div id='arrowsArea' style='text-align: center; position: fixed; right: 20px; top: 300px'>" + arrowUp + countComments_text + arrowDown + "</div>";

        var countComments = $(".comment.my").length;
        var curComment = -1;

        if (countComments == 0) return;

        $("body").append(arrowsArea);
        $("#countComments").html(curComment + 1 + " из " + countComments);

        $("#commentsScrollerUp, #commentsScrollerDown").hover(

        function () {
            $(this).css("opacity", 1);
        },

        function () {
            $(this).css("opacity", 0.5);
        });

        function scrollToComment() {
            $('html, body').animate({
                scrollTop: $(".comment.my").eq(curComment).offset().top
            }, 1000);
        };

        $("#commentsScrollerUp").click(function () {
            if (curComment > 0) {
                curComment--;
                scrollToComment();
                $("#countComments").html(curComment + 1 + " из " + countComments);
            };
        });

        $("#commentsScrollerDown").click(function () {
            if (curComment < countComments) {
                curComment++;
                scrollToComment();
                $("#countComments").html(curComment + 1 + " из " + countComments);
            };
        });
})(jQuery);
};

scrollComments();