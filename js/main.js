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

    //点击collor-shape中的选择项时，添加一个选中的样式
    $(".collar-shape div").each(function () {
        this.onclick = function () {
            if (!this.querySelector("div img")) {
                $(".collar-shape div").each(function () {
                    this.innerHTML = "";
                });
                var img = document.createElement("img");
                img.src = "./images/tick.png";
                this.appendChild(img);
            }
        }
    });

    //点击collor-collor中的选择项时，添加一个选中的样式
    $(".collar-collor div").each(function () {
        this.onclick = function () {
            if (!this.querySelector("div img")) {
                $(".collar-collor div").each(function () {
                    this.innerHTML = "";
                });
                var img = document.createElement("img");
                img.src = "./images/tick.png";
                this.appendChild(img);
            }
        }
    });
    //点击sleeve-shape中的选择项时，添加一个选中的样式
    $(".sleeve-shape div").each(function () {
        this.onclick = function () {
            if (!this.querySelector("div img")) {
                $(".sleeve-shape div").each(function () {
                    this.innerHTML = "";
                });
                var img = document.createElement("img");
                img.src = "./images/tick.png";
                this.appendChild(img);
            }
        }
    });

    //点击sleeve-collor中的选择项时，添加一个选中的样式
    $(".sleeve-collor div").each(function () {
        this.onclick = function () {
            if (!this.querySelector("div img")) {
                $(".sleeve-collor div").each(function () {
                    this.innerHTML = "";
                });
                var img = document.createElement("img");
                img.src = "./images/tick.png";
                this.appendChild(img);
            }
        }
    });
    //点击sleeve-collor中的选择项时，添加一个选中的样式
    $(".fabric-type div").each(function () {
        this.onclick = function () {
            if (!this.querySelector("div img")) {
                $(".fabric-type div").each(function () {
                    this.innerHTML = "";
                });
                var img = document.createElement("img");
                img.src = "./images/tick.png";
                this.appendChild(img);
            }
        }
    });



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
                $(".polo-container").fadeOut();
                $(".model-container").fadeIn();
            } else {
                if(!$(".polo-container").is(':visible')){
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

            app.logoMesh.visible=true;
            $(".polo-container").fadeOut();
            $(".model-container").fadeIn();

            changeStatsOnStepsPanelNext(currentPanel);
        } else if (typeof(currentPanel) == "undefined") {
            alert("未定义");
        } else {
            changeStatsOnStepsPanelNext(currentPanel);
        }
    });

    init();
});

function getAllCustomInfo(){
    var customInfo={};
    var poloReal = document.getElementsByClassName("polo-real")[0];
    var styleType=poloReal.getAttribute("styleType");
    customInfo.styleType=styleType;

    $(".collar-shape > div").each(function(){
        if (this.querySelector("div img")) {
            customInfo.collarShape=this.getAttribute("collarShape");
            return false;
        }
    })
    $(".collar-collor div").each(function(){
        if (this.querySelector("div img")) {
            customInfo.collarCollor=this.getAttribute("collarCollor");
            return false;
        }
    })
    $(".sleeve-shape > div").each(function(){
        if (this.querySelector("div img")) {
            customInfo.sleeveShape=this.getAttribute("sleeveShape");
            return false;
        }
    })
    $(".sleeve-collor > div").each(function(){
        if (this.querySelector("div img")) {
            customInfo.sleeveCollor=this.getAttribute("sleeveCollor");
            return false;
        }
    })
    $(".fabric-type > div").each(function(){
        if (this.querySelector("div img")) {
            customInfo.fabricType=this.getAttribute("fabricType");
            return false;
        }
    })
    if(customInfo.collarCollor=="blue"){
        var lingkou1 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou1.jpg");
        app.lingkouMesh.material.map = lingkou1;
    }else if(customInfo.collarCollor=="purple"){
        var lingkou2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou2.jpg");
        app.lingkouMesh.material.map = lingkou2;
    }else{
        var lingkou3 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/maps/T1_map_color.jpg");
        app.lingkouMesh.material.map = lingkou3;

        var newxiukou = THREE.ImageUtils.loadTexture("./js/changeLogo/model/new/newxiukou/baise.jpg");
        app.xiukouMesh.material.map = newxiukou;
    }


    alert("Well Done！您定制的信息：\n"+"衣服款式："+customInfo.styleType+"\n"+
        "领型："+customInfo.collarShape+"\n"+
        "领子颜色："+customInfo.collarCollor+"\n"+
        "袖型："+customInfo.sleeveShape+"\n"+
        "袖子颜色："+customInfo.sleeveCollor+"\n"+
        "面料："+customInfo.fabricType+"\n"+
        "下一步您可以自定义logo了！"+"\n");
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
