/**
 * Created by Administrator on 2016/3/8.
 */
$(function () {
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    function setWidth() {
        if(!IsPC()) {
            var width = document.body.clientWidth;
            var fontEm = width / 1080 * 1.25;
            $("body").css({
                "font-size": fontEm + "em"
            });
            $(".content").css({
                "width": "100%"
            });
        }else{
            $("body").css({
                "font-size": 0.8 + "em"
            });
        }
    }

    $(window).resize(function () {
        setWidth();
    });
    setWidth();

    $("#topIphone").click(function(){
        alert("topIphone");
    });
    $("#topAndroid").click(function(){
        alert("topAndroid");
    });
    $("#bottomIphone").click(function(){
        alert("bottomIphone");
    });
    $("#bottomAndroid").click(function(){
        alert("bottomAndroid");
    });
});