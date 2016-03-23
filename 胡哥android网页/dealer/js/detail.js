/**
 * Created by Administrator on 2016/1/22.
 */
$(function () {
    function setWidth(){
        var width = document.body.clientWidth ;
        var fontEm = width/750*1.25;
        $("body").css({
            "font-size": fontEm + "em"
        });
        $(".content").css({
            "width":width-fontEm*16*2-fontEm*16*0.5+"px"
        });
    }
    $(window).resize(function(){
        setWidth();
    });
    setWidth();

    url = "https://www.rentou.net/home/interfaceforapp/active/getById";
    url += window.location.search;
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        success: function (data) {
            var data=data.data;
            setData(data);
        }
    });
    function setData(data) {
        $(".head_title h2").html(data.activeTitle);
        var time=new Date(data.createTime);
        $(".head_title span").html(format(time));
        $(".img_and_p").html(data.activeContent);
    }
    function format(date){
        var xingqi=["日","一","二","三","四","五","六"];
        var month=date.getMonth()+1;
        var ri=date.getDate()+1;
        month=month<10?"0"+month:month;
        ri=ri<10?"0"+ri:ri;
        var h=date.getHours();
        var m=date.getMinutes();
        var s=date.getSeconds();
        var shangxia;
        h=h<10?"0"+h:h;
        m=m<10?"0"+m:m;
        s=s<10?"0"+s:s;
        if(date.getHours()>=12){
            shangxia=" 下午 ";
        }
        else{
            shangxia=" 上午 ";
        }
        return date.getFullYear()+"-"+month+"-"+ri+"&nbsp;&nbsp;"+h+":"+m+":"+s;
    }
});

