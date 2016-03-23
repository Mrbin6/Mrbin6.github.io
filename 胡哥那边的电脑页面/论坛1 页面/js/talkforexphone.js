/**
 * Created by Administrator on 2016/3/3.
 */
//0truename 1phoneNumber 2email 3taokeUserName 4qqNumber 5ibUserName 6phoneVersion
var checkList = [true, true,true,false,false, true, true];//保存验证true or false的数组
function cktrueName() {
    var trueName = $("#trueName").val().replace(/(^\s*)|(\s*$)/g, "");
    var nameReg = /^[\u4e00-\u9fa5]{2,}$/;
    if (nameReg.test(trueName) || trueName == "") {
        $("#trueNameTip").removeClass("show");
        checkList[0] = true;
    }
    /*else if (trueName == "") {
        $("#trueNameTip").addClass("show");
        $("#trueNameTip span").text("您未输入真实姓名!");
        checkList[0] = false;
    }*/
    else {
        $("#trueNameTip").addClass("show");
        $("#trueNameTip span").text("您输入的姓名格式不对!");
        checkList[0] = false;
    }
}
function ckphoneNumber() {
    var ckphoneNumber=$("#phoneNumber").val().replace(/(^\s*)|(\s*$)/g, "");
    var phoneReg=/^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/;
    if(phoneReg.test(ckphoneNumber) || ckphoneNumber == ""){
        $("#phoneNumberTip").removeClass("show");
        $("#phoneNumberTip").parents(".tips-div").removeClass("height20");
        checkList[1] = true;
    }
    /*else if (ckphoneNumber=="") {
        $("#phoneNumberTip span").text("您未填手机号!");
        $("#phoneNumberTip").addClass("show");
        $("#phoneNumberTip").parents(".tips-div").addClass("height20");
        checkList[1] = false;
    }*/
    else if(ckphoneNumber.length<11){
        $("#phoneNumberTip span").text("您输入的号码不足11位!");
        $("#phoneNumberTip").addClass("show");
        $("#phoneNumberTip").parents(".tips-div").addClass("height20");
        checkList[1] = false;
    }
    else{
        $("#phoneNumberTip span").text("您输入的号码格式不对!");
        $("#phoneNumberTip").addClass("show");
        $("#phoneNumberTip").parents(".tips-div").addClass("height20");
        checkList[1] = false;
    }
}
function ckemail() {
    var emailTip = $("#email").val().replace(/(^\s*)|(\s*$)/g, "");
    var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailReg.test(emailTip) || emailTip == "") {
        $("#emailTip").removeClass("show");
        checkList[2] = true;
    }
    /*else if (emailTip == "") {
        $("#emailTip").addClass("show");
        $("#emailTip span").text("您未输入邮箱!");
        checkList[2] = false;
    }*/
    else {
        $("#emailTip").addClass("show");
        $("#emailTip span").text("您输入的邮箱格式不对!");
        checkList[2] = false;
    }
}
function cktaokeUserName() {
    var taokeUserName=$("#taokeUserName").val().replace(/(^\s*)|(\s*$)/g, "");
    if (taokeUserName!="") {
        $("#taokeUserNameTip").removeClass("show");
        $("#taokeUserNameTip").parents(".tips-div").removeClass("height20");
        checkList[3] = true;
    }
    else{
        $("#taokeUserNameTip span").text("您未填韬客用户名!");
        $("#taokeUserNameTip").addClass("show");
        $("#taokeUserNameTip").parents(".tips-div").addClass("height20");
        checkList[3] = false;
    }
}
function ckqqNumber() {
    var qqNumber = $("#qqNumber").val().replace(/(^\s*)|(\s*$)/g, "");
    var qqReg =/^[0-9]{1,}$/;
    if (qqReg.test(qqNumber) && qqNumber != "") {
        $("#qqNumberTip").removeClass("show");
        checkList[4] = true;
    }else if(qqNumber == ""){
        $("#qqNumberTip").addClass("show");
        $("#qqNumberTip span").text("您未输入qq号码!");
        checkList[4] = false;
    }
    else {
        $("#qqNumberTip").addClass("show");
        $("#qqNumberTip span").text("您输入的qq号码格式不对!");
        checkList[4] = false;
    }
}
function ckibUserName() {
    var ibUserName=$("#ibUserName").val().replace(/(^\s*)|(\s*$)/g, "");
    var ibUserReg = /(^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$)|(^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$)/;
    if (ibUserReg.test(ibUserName) || ibUserName == "") {
        $("#ibUserNameTip").removeClass("show");
        $("#ibUserNameTip").parents(".tips-div").removeClass("height20");
        checkList[5] = true;
    }
    /*else if (ibUserName == "") {
        $("#ibUserNameTip").addClass("show");
        $("#ibUserNameTip").parents(".tips-div").addClass("height20");
        $("#ibUserNameTip span").text("您输入未返佣用户名!");
        checkList[5] = false;
    }*/
    else {
        $("#ibUserNameTip").addClass("show");
         $("#ibUserNameTip").parents(".tips-div").addClass("height20");
        $("#ibUserNameTip span").text("您输入的手机号或邮箱格式不对!");
        checkList[5] = false;
    }
}
function ckphoneVersion() {
    /*var phoneVersion = $("#phoneVersion").val().replace(/(^\s*)|(\s*$)/g, "");
    if (phoneVersion != "") {
        $("#phoneVersionTip").removeClass("show");*/
        checkList[6] = true;
    /*}else if(phoneVersion == ""){
        $("#phoneVersionTip").addClass("show");
        $("#phoneVersionTip span").text("您未输入手机型号!");
        checkList[6] = false;
    }*/
}

function submitJudge() {
    cktrueName();
    ckphoneNumber();
    ckemail();
    cktaokeUserName();
    ckqqNumber();
    ckibUserName();
    ckphoneVersion();
    var canSubmit = true;
    for (var i = 0; i < checkList.length; i++) {
        if (checkList[i] == false) {
            canSubmit = false;
        }
    }
    if (canSubmit == true) {
        path="#";
        $.ajax({
            type: "post",
            dataType : "json",
            url:path,	//把表单数据发送到..
            data:$('#subForm').serialize(),	//要发送的是subForm表单中的数据
            error: function() {
                alert("保存失败！");
            },
            success: function() {
                alert("感谢您的参与，我们会及时与您联系，请密切关注！");
                $("input:not('.submit-btn')").val("");
            }
        });
    }
    return false;
}
$(function(){
    $("#trueName").blur(function(){
        cktrueName();
    });
    $("#phoneNumber").blur(function(){
        ckphoneNumber();
    });
    $("#email").blur(function(){
        ckemail();
    });
    $("#taokeUserName").blur(function(){
        cktaokeUserName();
    });
    $("#qqNumber").blur(function(){
        ckqqNumber();
    });
    $("#ibUserName").blur(function(){
        ckibUserName();
    });
    $("#phoneVersion").blur(function(){
        ckphoneVersion();
    });
});