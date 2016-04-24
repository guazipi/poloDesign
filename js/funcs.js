/**
 * Created by Administrator on 2016/4/23.
 */
$("a.various").fancybox({
    autoDimensions: !1,
    autoScale: !1,
    scrolling: "no",
    width:1080,
    height:700,
    speedIn:600,
    speedOut:200,
    overflow: "hidden",
    hideOnOverlayClick: !0,
});
function showShirtInApp(styleName) {
    $(".polo-real").html("");
    var poloReal = document.getElementsByClassName("polo-real")[0];
    switch (styleName) {
        case "huanghei":
            var divArr = getHtmlFromStyleName("huanghei/huanghei")
            $.each(divArr, function (key, val) {
                poloReal.appendChild(val);
            })
            poloReal.setAttribute("styleType","huanghei");
            break;
        case "huanglan":
            var divArr = getHtmlFromStyleName("huanglan/hl")
            $.each(divArr, function (key, val) {
                poloReal.appendChild(val);
            })
            poloReal.setAttribute("styleType","huanglan");
            break;
        case "huise":
            var divArr = getHtmlFromStyleName("huise/hs")
            $.each(divArr, function (key, val) {
                poloReal.appendChild(val);
            })
            poloReal.setAttribute("styleType","huise");
            break;
        case "lanhei":
            var divArr = getHtmlFromStyleName("lanhei/lanhei")
            $.each(divArr, function (key, val) {
                poloReal.appendChild(val);
            })
            poloReal.setAttribute("styleType","lanhei");
            break;
    }
}
function getHtmlFromStyleName(styleName) {
    var divArr = [];
    var div1 = document.createElement("div");
    div1.style.backgroundImage = "url(./images/wholePolo/" + styleName + 1 + ".jpg)";
    div1.style.backgroundSize = "cover";
    div1.style.display = "block";
    div1.className = "piece";
    divArr.push(div1);
    var div2 = document.createElement("div");
    div2.style.backgroundImage = "url(./images/wholePolo/" + styleName + 2 + ".jpg)";
    div2.style.backgroundSize = "cover";
    div2.style.display = "none";
    div2.className = "piece";
    divArr.push(div2);

    var div3 = document.createElement("div");
    div3.style.backgroundImage = "url(./images/wholePolo/" + styleName + 3 + ".jpg)";
    div3.style.backgroundSize = "cover";
    div3.style.display = "none";
    div3.className = "piece";
    divArr.push(div3);

    var div4 = document.createElement("div");
    div4.style.backgroundImage = "url(./images/wholePolo/" + styleName + 4 + ".jpg)";
    div4.style.backgroundSize = "cover";
    div4.style.display = "none";
    div4.className = "piece";
    divArr.push(div4);
    return divArr;
}
