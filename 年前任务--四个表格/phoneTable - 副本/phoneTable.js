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
            color: "#ba2636"
        });
    });
    $(".dates td").on("mouseout",function(){
        $(this).css({
            color: "#333"
        });
    });
});