/**
 * Created by Administrator on 2016/1/23.
 */
/**
 * Created by Administrator on 2016/1/22.
 */
$(function () {
    function setWidth() {
        var width = document.body.clientWidth;
        var fontEm = width / 750 * 1.25;
        var height = $(window).height() - fontEm * 16 * 0.8 - fontEm * 10 * 16;
        $("body").css({
            "font-size": fontEm + "em"
        });
        $(".content").css({
            "width": 100 + "%",
            "height": height
        });
    }

    $(window).resize(function () {
        setWidth();
    });
    setWidth();

    url = "https://www.rentou.net/home/interfaceforapp/question/getListByQuestionTypeId";
    url += window.location.search;
    url += "&page=1&rows=20";
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        success: function (data) {
            console.log(data);
            var data = data.list;
            setData(data);
        }
    });
    function setData(data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += "<li><div class='ques_div'>"
            + data[i].questionTitle + "</div><div class='ans_div'>"
            + data[i].questionContent + "</div></li>";
        }
        $(".content_ul").html(html);


        $(".ques_div").click(function () {
            if ($(this).hasClass("arr_down")) {
                var $li = $(this).parent("li");
                $li.removeClass("active");
                $li.children(".ans_div").slideUp("fast");
                $li.children(".ans_div").siblings(".ques_div").removeClass("arr_down");
                $(".ques_div").removeClass("noBorder");
            } else {
                $(".ques_div").removeClass("noBorder");
                $(".content_ul li:last-child .ques_div").css("border-bottom","none");
                $(this).addClass("arr_down");
                var $li = $(this).parent("li");
                $li.addClass("active").siblings("li").removeClass("active");
                $li.siblings("li").children(".ans_div").slideUp("fast");
                $li.siblings("li").children(".ans_div").siblings(".ques_div").removeClass("arr_down");
                $(this).siblings(".ans_div").slideDown("fast");
                if($li.prev("li").length>0){
                    $li.prev("li").children(".ques_div").addClass("noBorder");
                }
            }
        });
        $(".ans_div").click(function () {
            var $li = $(this).parent("li");
            $li.removeClass("active");
            $li.children(".ans_div").slideUp("fast");
            $li.children(".ans_div").siblings(".ques_div").removeClass("arr_down");
            $(".ques_div").removeClass("noBorder");
        });
        $(".content_ul li:last-child .ques_div").click(function(){
            if ($(this).hasClass("arr_down")) {
                $(".content_ul li:last-child .ques_div").css("border-bottom","1px solid #e6e6e6");
            }else{
                $(".content_ul li:last-child .ques_div").css("border-bottom","none");
            }
        });
        $(".content_ul li:last-child .ans_div").click(function(){
            $(".content_ul li:last-child .ques_div").css("border-bottom","none");
        });
    }
});