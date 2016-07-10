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

    //注册点选事件，选择某一项就把选中的tick.png加上
    var tickDivArray = [
        ".fabric-type div",
        ".fabric-color div",
        ".collar-type div",
        ".stripe-type div",
        ".topfly-type div",
        ".cuff-type div",
        ".lowerhem-type div",
        ".fork-type div",
        ".braid-type div",
        ".pocket-type div",
        ".penBag-type div",
        ".turtle-type div"];
    $.each(tickDivArray,function(key,val){
        $(val).each(function () {
            this.onclick = function () {
                if (!this.querySelector("div img")) {
                    $(val).each(function () {
                        this.innerHTML = "";
                    });
                    var img = document.createElement("img");
                    img.src = "./images/tick.png";
                    this.appendChild(img);
                }
            }
        });
    })

    $(".steps div").each(function (index) {
        this.onclick = function () {
            var temp = index;
            //steps中点击相应的块，右边相应顺序的panel的display为block，两者的顺序应该的相对应的--start
            $(".panel-content > div").each(function () {
                this.style.display = "none";
            });
            $(".panel-content > div").eq(temp).css({
                display: "block",
            });

            //点击steps中的按钮时，让其与polo-container和model-container联动起来
            var totalSteps = $(".steps div").length;
            if (temp == totalSteps - 1) {
                app.logoMesh.visible = true;
                $(".model-container").fadeIn();
                $(".polo-container").fadeOut();

            } else {
                if (!$(".polo-container").is(':visible')) {
                    $(".model-container").fadeOut();
                    $(".polo-container").fadeIn();
                }
            }

            //steps中各个按钮点击时，设置其相应的表达样式，边框为亮青色
            $(".steps div").each(function () {
                this.style.borderRight = "1px solid rgb(215, 215, 215)";
                this.style.borderTop = "1px solid rgb(215, 215, 215)";
                this.style.borderLeft = "1px solid rgb(215, 215, 215)";
                this.style.borderBottom = "1px solid rgb(215, 215, 215)";
            })
            $(".steps div").eq(temp).css({
                borderRight: "1px solid rgb(255, 255, 255)",
                borderTop: "2px solid rgb(6, 243, 13)",
                borderLeft: "2px solid rgb(6, 243, 13)",
                borderBottom: "2px solid rgb(6, 243, 13)",
            });
            if (temp == 0) {
                return;
            }
            temp -= 1;
            do {
                $(".steps div").eq(temp).css({
                    borderRight: "2px solid rgb(6, 243, 13)",
                    borderTop: "1px solid rgb(6, 243, 13)",
                    borderLeft: "2px solid rgb(6, 243, 13)",
                    borderBottom: "1px solid rgb(6, 243, 13)",
                });
                temp -= 1;
            } while (temp >= 0);
        }

    });

    $("#preStep").bind("click", function () {
        var currentPanel;
        var totalPanel = $(".panel-content > div").length;
        $(".panel-content > div").each(function (index) {
            if (this.style.display == "block") {
                currentPanel = index;
                this.style.display = "none";
            }
        });
        if (currentPanel == 0) {
            $(".panel-content > div").each(function (index) {
                this.style.display = "block";
                return false;
            });
        } else if (currentPanel == totalPanel - 1) {
            $(".model-container").fadeOut();
            $(".polo-container").fadeIn();

            changeStatsOnStepsPanelPre(currentPanel);
        } else {
            changeStatsOnStepsPanelPre(currentPanel);
        }
    });
    $("#nextStep").bind("click", function () {
        var currentPanel;
        var totalPanel = $(".panel-content > div").length;
        $(".panel-content > div").each(function (index) {
            if (this.style.display == "block") {
                currentPanel = index;
                this.style.display = "none";
            }
        });
        if (currentPanel == totalPanel - 1) {
            alert("恭喜你,需要保存购物车了！");
            $(".panel-content > div").eq(totalPanel - 1).css({
                display: "block",
            });
            $("#nextStep > span").each(function () {
                this.innerHTML = "";
                this.innerHTML = "done@!";
                return false;
            })
        } else if (currentPanel == totalPanel - 2) {
            getAllCustomInfo();

            app.logoMesh.visible = true;
            $(".polo-container").fadeOut();
            $(".model-container").fadeIn();

            changeStatsOnStepsPanelNext(currentPanel);
        } else if (typeof(currentPanel) == "undefined") {
            alert("未定义");
        } else {
            changeStatsOnStepsPanelNext(currentPanel);
        }
    });

    setTimeout(function () {
        init();
    }, 400)
});

function getAllCustomInfo() {
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


    alert("Well Done！您定制的信息：\n" + "衣服款式：" + customInfo.styleType + "\n" +
        "面料类型：" + customInfo.fabricType[0] + " " + customInfo.fabricType[1] + "\n" +
        "面料颜色：" + customInfo.fabricCollor[0] + " " + customInfo.fabricCollor[1] + "\n" +
        "领型：" + customInfo.collarType[0] + " " + customInfo.collarType[1] + "\n" +
        "条纹：" + customInfo.stripeShape[0] + " " + customInfo.stripeShape[1] + "\n" +
        "门襟：" + customInfo.topflyType[0] + " " + customInfo.topflyType[1] + "\n" +
        "袖口：" + customInfo.cuffType[0] + " " + customInfo.cuffType[1] + "\n" +
        "下摆：" + customInfo.lowerhemType[0] + " " + customInfo.lowerhemType[1] + "\n" +
        "脚衩：" + customInfo.forkType[0] + " " + customInfo.forkType[1] + "\n" +
        "织带：" + customInfo.braidType[0] + " " + customInfo.braidType[1] + "\n" +
        "口袋：" + customInfo.pocketType[0] + " " + customInfo.pocketType[1] + "\n" +
        "笔袋：" + customInfo.penBagType[0] + " " + customInfo.penBagType[1] + "\n" +
        "龟背：" + customInfo.turtleType[0] + " " + customInfo.turtleType[1] + "\n" +
        "下一步您可以自定义logo了！" + "\n");
}

function changeStatsOnStepsPanelPre(currentPanel) {
    $(".panel-content > div").eq(currentPanel - 1).css({
        display: "block",
    });
    $(".steps div").eq(currentPanel).css({
        borderRight: "1px solid rgb(215, 215, 215)",
        borderTop: "1px solid rgb(215, 215, 215)",
        borderLeft: "1px solid rgb(215, 215, 215)",
        borderBottom: "1px solid rgb(215, 215, 215)",
    });
    $(".steps div").eq(currentPanel - 1).css({
        borderRight: "1px solid rgb(255, 255, 255)",
        borderTop: "2px solid rgb(6, 243, 13)",
        borderLeft: "2px solid rgb(6, 243, 13)",
        borderBottom: "2px solid rgb(6, 243, 13)",
    });
}
function changeStatsOnStepsPanelNext(currentPanel) {
    $(".panel-content > div").eq(currentPanel + 1).css({
        display: "block",
    });
    $(".steps div").eq(currentPanel).css({
        borderRight: "2px solid rgb(6, 243, 13)",
        borderTop: "1px solid rgb(6, 243, 13)",
        borderLeft: "2px solid rgb(6, 243, 13)",
        borderBottom: "1px solid rgb(6, 243, 13)",
    });
    $(".steps div").eq(currentPanel + 1).css({
        borderRight: "1px solid rgb(255, 255, 255)",
        borderTop: "2px solid rgb(6, 243, 13)",
        borderLeft: "2px solid rgb(6, 243, 13)",
        borderBottom: "2px solid rgb(6, 243, 13)",
    });
}
