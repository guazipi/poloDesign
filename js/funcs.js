/**
 * Created by Administrator on 2016/4/23.
 */
$("a.various").fancybox({
    autoDimensions: !1,
    autoScale: !1,
    scrolling: "no",
    width: 1080,
    height: 700,
    speedIn: 600,
    speedOut: 200,
    overflow: "hidden",
    hideOnOverlayClick: !0,
});
$(".each-part").mouseover(function (e) {
    var title = this.getAttribute("tipName");

    var left=$(this).offset().left;
    var top=$(this).offset().top;
    $(".tip em").text(title);
    $(".tip").css({"left": left+"px","top":top+"px","opacity": 1})
})
$(".each-part").mouseout(function () {
    $(".tip").css({"opacity": 0});
})
function preview() {
    $.fancybox($("#step3").html(), {
        autoDimensions: !1,
        autoScale: !1,
        scrolling: "no",
        width: 1080,
        height: 700,
        speedIn: 600,
        speedOut: 200,
        overflow: "hidden",
        overlayShow: !0,
        hideOnOverlayClick: !0,
        beforeShow: function () {
            document.getElementById("cover").style.display = "block";
            $(".panel-content > div").each(function (index) {
                if (this.style.display == "block" && index !== $(".panel-content > div").length - 1) {
                    app.logoMesh.visible = false;
                    return false;
                }
            });
            getAllCustomInfo_sec();
            document.getElementById("f5list").appendChild(app.webglRender.domElement);
        },
        afterShow: function () {
            document.getElementById("cover").style.display = "none";
        },
        beforeClose: function () {
            document.getElementById("modelContainer").appendChild(app.webglRender.domElement);
        }
    });
}
//此函数和main.js中的一个函数重复，此时只是暂时备用吧
function getAllCustomInfo_sec() {
    var customInfo = {};
    var poloReal = document.getElementsByClassName("polo-real")[0];
    var styleType = poloReal.getAttribute("styleType");
    customInfo.styleType = styleType;
    /*
     * fabric-type fabricType tipName
     * fabric-color fabricCollorName tipName
     * collar-type collarType tipName
     * stripe-type stripeShape tipName
     * topfly-type topflyType tipName
     * cuff-type cuffType tipName
     * lowerhem-type lowerhemType tipName
     * fork-type forkType tipName
     * braid-type braidType tipName
     * pocket-type pocketType tipName
     * penBag-type penBagType tipName
     * turtle-type turtleType tipName
     * */
    $(".fabric-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.fabricType = [this.getAttribute("fabricType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".fabric-color div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.fabricCollor = [this.getAttribute("fabricCollorName"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".collar-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.collarType = [this.getAttribute("collarType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".stripe-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.stripeShape = [this.getAttribute("stripeType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".topfly-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.topflyType = [this.getAttribute("topflyType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".cuff-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.cuffType = [this.getAttribute("cuffType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".lowerhem-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.lowerhemType = [this.getAttribute("lowerhemType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".fork-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.forkType = [this.getAttribute("forkType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".braid-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.braidType = [this.getAttribute("braidType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".pocket-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.pocketType = [this.getAttribute("pocketType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".penBag-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.penBagType = [this.getAttribute("penBagType"), this.getAttribute("tipName")];
            return false;
        }
    })
    $(".turtle-type > div").each(function () {
        if (this.querySelector("div img")) {
            customInfo.turtleType = [this.getAttribute("turtleType"), this.getAttribute("tipName")];
            return false;
        }
    })


    if (customInfo.fabricCollor[0] == "blue") {
        var lingkou1 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou1.jpg");
        app.lingkouMesh.material.map = lingkou1;
    } else if (customInfo.fabricCollor[0] == "purple") {
        var lingkou2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou2.jpg");
        app.lingkouMesh.material.map = lingkou2;
    } else {
        var lingkou3 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/maps/T1_map_color.jpg");
        app.lingkouMesh.material.map = lingkou3;

        var newxiukou = THREE.ImageUtils.loadTexture("./js/changeLogo/model/new/newxiukou/baise.jpg");
        app.xiukouMesh.material.map = newxiukou;
    }
}


function showShirtInApp(styleName) {
    $(".polo-real").html("");
    var poloReal = document.getElementsByClassName("polo-real")[0];
    switch (styleName) {
        case "huanghei":
            var divArr = getHtmlFromStyleName("huanghei/huanghei")
            $.each(divArr, function (key, val) {
                poloReal.appendChild(val);
            })
            poloReal.setAttribute("styleType", "huanghei");
            break;
        case "huanglan":
            var divArr = getHtmlFromStyleName("huanglan/hl")
            $.each(divArr, function (key, val) {
                poloReal.appendChild(val);
            })
            poloReal.setAttribute("styleType", "huanglan");
            break;
        case "huise":
            var divArr = getHtmlFromStyleName("huise/hs")
            $.each(divArr, function (key, val) {
                poloReal.appendChild(val);
            })
            poloReal.setAttribute("styleType", "huise");
            break;
        case "lanhei":
            var divArr = getHtmlFromStyleName("lanhei/lanhei")
            $.each(divArr, function (key, val) {
                poloReal.appendChild(val);
            })
            poloReal.setAttribute("styleType", "lanhei");
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
