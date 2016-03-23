/**
 * Created by Administrator on 2016/1/19.
 */
$(function () {//.html?dealerIds=1,2,3
        (function getData() {
            url="https://www.rentou.net/home/interfaceforapp/dealer/queryByIDListForApp";
            url+=window.location.search;
            $.ajax({
                type: "get",
                url: url,
                dataType: "json",
                success: function (data) {
                    setData(data);
                }
            });
            function setData(data) {
                var content = data.content;
                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //返佣比列、外汇返佣
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30'>"
                    + content.dealer[i].rebateStandard*100 + "%</td><td class='font30'>"
                    + content.dealer[i].forexratio + "</td></tr>";
                }
                $("#threeCol_0").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //黄金返佣、点差类型
                    var dealer = "dealer_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td  class='font30'>"
                    + content.dealer[i].goldratio + "</td><td class='font30'>";

                    var judge = 0;
                    for (var j = 0; j < content[dealer].length; j++) {
                        if (content[dealer][j].dicType == "Z012" && judge == 0) {
                            html += content[dealer][j].dicidName;
                            judge = 1;
                        } else if (content[dealer][j].dicType == "Z012" && judge == 1) {
                            html += "、" + content[dealer][j].dicidName;
                        }
                    }
                    html+="</td></tr>";
                }
                $("#threeCol_1").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //欧美点差、黄金点差
                    var diancha = "diancha_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30'>";
                    var judge = 0;
                    for (var j = 0; j < content[diancha].length; j++) {
                        if (content[diancha][j].varietiesName == "欧美点差" && judge == 0) {
                            html += content[diancha][j].diancha;
                            judge = 1;
                        } else if (content[diancha][j].varietiesName == "欧美点差" && judge == 1) {
                            html += "、" + content[diancha][j].diancha;
                        }
                    }
                    if(judge==0){
                        html+="无";
                    }
                    html+="</td><td class='font30'>";
                    var judge = 0;
                    for (var j = 0; j < content[diancha].length; j++) {
                        if (content[diancha][j].varietiesName == "黄金点差" && judge == 0) {
                            html += content[diancha][j].diancha;
                            judge = 1;
                        } else if (content[diancha][j].varietiesName == "黄金点差" && judge == 1) {
                            html += "、" + content[diancha][j].diancha;
                        }
                    }
                    if(judge==0){
                        html += "无";
                    }
                    html += "</td></tr>";
                }
                $("#threeCol_2").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //人民币远期、A股指数
                    var diancha = "diancha_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30'>";

                    var judge = 0;
                    for (var j = 0; j < content[diancha].length; j++) {
                        if (content[diancha][j].varietiesName == "人民币远期" && judge == 0) {
                            html += content[diancha][j].diancha;
                            judge = 1;
                        } else if (content[diancha][j].varietiesName == "人民币远期" && judge == 1) {
                            html += "、" + content[diancha][j].diancha;
                        }
                    }
                    if(judge==0){
                        html+="无";
                    }
                    html+="</td><td class='font30'>";
                    var judge = 0;
                    for (var j = 0; j < content[diancha].length; j++) {
                        if (content[diancha][j].varietiesName == "A股指数" && judge == 0) {
                            html += content[diancha][j].diancha;
                            judge = 1;
                        } else if (content[diancha][j].varietiesName == "A股指数" && judge == 1) {
                            html += "、" + content[diancha][j].diancha;
                        }
                    }
                    if(judge==0){
                        html += "无";
                    }
                    html += "</td></tr>";
                }
                $("#threeCol_3").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //监管机构、平台类型
                    var dealer = "dealer_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30'>";
                    var judge = 0;
                    for (var j = 0; j < content[dealer].length; j++) {
                        if (content[dealer][j].dicType == "Z001" && judge == 0) {
                            html += content[dealer][j].dicidName;
                            judge = 1;
                        } else if (content[dealer][j].dicType == "Z001" && judge == 1) {
                            html += "、" + content[dealer][j].dicidName;
                        }
                    }
                    html += "</td><td class='font30'>";

                    var judge = 0;
                    for (var j = 0; j < content[dealer].length; j++) {
                        if (content[dealer][j].dicType == "Z003" && judge == 0) {
                            html += content[dealer][j].dicidName;
                            judge = 1;
                        } else if (content[dealer][j].dicType == "Z003" && judge == 1) {
                            html += "、" + content[dealer][j].dicidName;
                        }
                    }
                    html += "</td></tr>";
                }
                $("#threeCol_4").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //剥头皮、对冲
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30'>";
                    if (content.dealer[i].scalp == "01") {
                        html += "支持"
                    } else if (content.dealer[i].scalp == "02") {
                        html += "不支持";
                    }
                    html += "</td><td class='font30'>";
                    if (content.dealer[i].hedging == "01") {
                        html += "支持"
                    } else if (content.dealer[i].hedging == "02") {
                        html += "不支持";
                    }
                    html += "</td></tr>";
                }
                $("#threeCol_5").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //交易最小手数、最少入金
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30'>"
                    + content.dealer[i].trademinamount + "</td><td class='font30'>"
                    + content.dealer[i].minmoney + "</td></tr>";
                }
                $("#threeCol_6").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //最高杠杆率、最大交易量
                    var dealer = "dealer_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30'>";
                    var max = 0;
                    for (var j = 0; j < content[dealer].length; j++) {
                        if (content[dealer][j].dicTypeName == "杠杆") {
                            var lever = parseInt(content[dealer][j].dicidName.slice(2));
                            if (lever > max) {
                                max = lever;
                            }
                        }
                    }
                    html += "1:" + max;
                    html += "</td><td class='font30'>";
                    html += content.dealer[i].maxbusiness + "</td></tr>";
                }
                $("#threeCol_7").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //交易品种
                    var dealer = "dealer_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30' colspan='2'>";

                    var judge = 0;
                    for (var j = 0; j < content[dealer].length; j++) {
                        if (content[dealer][j].dicType == "Z002" && judge == 0) {
                            html += content[dealer][j].dicidName;
                            judge = 1;
                        } else if (content[dealer][j].dicType == "Z002" && judge == 1) {
                            html += "、" + content[dealer][j].dicidName;
                        }
                    }
                }
                $("#twoCol_0").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //开设账户类型
                    var dealer = "dealer_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30' colspan='2'>";

                    var judge = 0;
                    for (var j = 0; j < content[dealer].length; j++) {
                        if (content[dealer][j].dicType == "Z005" && judge == 0) {
                            html += content[dealer][j].dicidName;
                            judge = 1;
                        } else if (content[dealer][j].dicType == "Z005" && judge == 1) {
                            html += "、" + content[dealer][j].dicidName;
                        }
                    }
                    html += "</td></tr>";
                }
                $("#twoCol_1").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //出金方式
                    var dealer = "dealer_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30' colspan='2'>";

                    var judge = 0;
                    for (var j = 0; j < content[dealer].length; j++) {
                        if (content[dealer][j].dicType == "Z006" && judge == 0) {
                            html += content[dealer][j].dicidName;
                            judge = 1;
                        } else if (content[dealer][j].dicType == "Z006" && judge == 1) {
                            html += "、" + content[dealer][j].dicidName;
                        }
                    }
                    html += "</td></tr>";
                }
                $("#twoCol_2").append(html);

                var html = "";
                for (var i = 0; i < content.dealer.length; i++) {
                    //入金方式
                    var dealer = "dealer_" + content.dealer[i].dealerId;
                    html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                    "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                    + content.dealer[i].dealerId + "' alt='"
                    + content.dealer[i].name + "'/></td><td class='td_left'>"
                    + content.dealer[i].name + "</td><td class='font30' colspan='2'>";

                    var judge = 0;
                    for (var j = 0; j < content[dealer].length; j++) {
                        if (content[dealer][j].dicType == "Z007" && judge == 0) {
                            html += content[dealer][j].dicidName;
                            judge = 1;
                        } else if (content[dealer][j].dicType == "Z007" && judge == 1) {
                            html += "、" + content[dealer][j].dicidName;
                        }
                    }
                    html += "</td></tr>";
                }
                $("#twoCol_3").append(html);

                //出金手续费
                putTwoCol("twoCol_4", "outfee");
                //入金手续费
                putTwoCol("twoCol_5", "infee");
                //账户结算币种
                putTwoCol("twoCol_6", "closecurrency");
                //爆仓比例
                putTwoCol("twoCol_7", "explosionra");

                function putTwoCol(id, vString) {
                    var html = "";
                    for (var i = 0; i < content.dealer.length; i++) {
                        html += " <tr><td class='table_img_td'><img class='table_img' src='" +
                        "https://www.rentou.net/home/openaccount/app/readDealerpic?dealerId="
                        + content.dealer[i].dealerId + "' alt='"
                        + content.dealer[i].name + "'/></td><td class='td_left'>"
                        + content.dealer[i].name + "</td><td class='font30' colspan='2'>"
                        + content.dealer[i][vString] + "</td></tr>";
                    }
                    $("#" + id).append(html);
                }
            }
        })();
});