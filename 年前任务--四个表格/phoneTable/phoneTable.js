$(function () {
    function setWidth(){
        var width = document.body.clientWidth ;
        var fontEm = width/750*1.25;
        $("body").css({
            "font-size": fontEm + "em"
        });
        $(".econo_data").css({
            "width":width-32+"px"
        });
    }
    $(window).resize(function(){
        setWidth();
    });
    setWidth();
    $(".dates td").on("mouseover",function(){
        $(this).css({
            color: "#005bac",
            background:"url(blueUnderline.jpg) no-repeat center bottom"
        });
    });
    $(".dates td").on("mouseout",function(){
        $(this).css({
            color: "#646464",
            background:"none"
        });
    });
});