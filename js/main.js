/**
 * Created by Administrator on 2016/4/22.
 */
$(document).ready(function () {
    $(".rotate-left").bind("click", function () {
        $(".polo-real div").each(function (index) {
            if (this.style.display == "block") {
                if (index == 0) {
                    $(".polo-real div").eq(index).css({
                        display: "none"
                    })
                    $(".polo-real div").eq(3).css({
                        display: "block"
                    });
                } else {
                    $(".polo-real div").eq(index).css({
                        display: "none"
                    });
                    $(".polo-real div").eq(index - 1).css({
                        display: "block"
                    });
                }
                return false;
            }
        });
    });
    $(".rotate-right").bind("click", function () {
        $(".polo-real div").each(function (index) {
            if (this.style.display == "block") {
                if (index == 3) {
                    $(".polo-real div").eq(index).css({
                        display: "none"
                    })
                    $(".polo-real div").eq(0).css({
                        display: "block"
                    });
                } else {
                    $(".polo-real div").eq(index).css({
                        display: "none"
                    });
                    $(".polo-real div").eq(index + 1).css({
                        display: "block"
                    });
                }
                return false;
            }
        })
    });
});

function showShirtInApp(styleName) {
    $(".polo-real").html("");
    var poloReal=document.getElementsByClassName("polo-real")[0];
    switch (styleName) {
        case "huanghei":
            var divArr=getHtmlFromStyleName("huanghei/huanghei")
            $.each(divArr,function(key,val){
                poloReal.appendChild(val);
            })
            break;
        case "huanglan":
            var divArr=getHtmlFromStyleName("huanglan/hl")
            $.each(divArr,function(key,val){
                poloReal.appendChild(val);
            })
            break;
        case "huise":
            var divArr=getHtmlFromStyleName("huise/hs")
            $.each(divArr,function(key,val){
                poloReal.appendChild(val);
            })
            break;
        case "lanhei":
            var divArr=getHtmlFromStyleName("lanhei/lanhei")
            $.each(divArr,function(key,val){
                poloReal.appendChild(val);
            })
            break;
    }
}
function getHtmlFromStyleName(styleName) {
    var divArr = [];
    var div1 = document.createElement("div");
    div1.style.backgroundImage = "url(./images/wholePolo/"+styleName+1+".jpg)";
    div1.style.backgroundSize = "cover";
    div1.style.display = "block";
    div1.className = "piece";
    divArr.push(div1);
    var div2 = document.createElement("div");
    div2.style.backgroundImage = "url(./images/wholePolo/"+styleName+2+".jpg)";
    div2.style.backgroundSize = "cover";
    div2.style.display = "none";
    div2.className = "piece";
    divArr.push(div2);

    var div3 = document.createElement("div");
    div3.style.backgroundImage ="url(./images/wholePolo/"+styleName+3+".jpg)";
    div3.style.backgroundSize = "cover";
    div3.style.display = "none";
    div3.className = "piece";
    divArr.push(div3);

    var div4 = document.createElement("div");
    div4.style.backgroundImage = "url(./images/wholePolo/"+styleName+4+".jpg)";
    div4.style.backgroundSize = "cover";
    div4.style.display = "none";
    div4.className = "piece";
    divArr.push(div4);
    return divArr;
}
