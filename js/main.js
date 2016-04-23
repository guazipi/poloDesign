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

    $(".steps div").each(function (index) {
        this.onclick = function () {
            $(".steps div").each(function () {
                this.style.borderRight = "1px solid rgb(215, 215, 215)";
                this.style.borderTop = "1px solid rgb(215, 215, 215)";
                this.style.borderLeft = "1px solid rgb(215, 215, 215)";
                this.style.borderBottom = "1px solid rgb(215, 215, 215)";
            })
            var temp = index;
            //steps中点击相应的块，右边相应顺序的panel的display为block，两者的顺序应该的相对应的--start
            $(".panel-content > div").each(function () {
                this.style.display = "none";
            });
            $(".panel-content > div").eq(temp).css({
                display: "block",
            });
            //steps中点击相应的块，右边相应顺序的panel的display为block，两者的顺序应该的相对应的--end
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
        } else {
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
            alert("最后了,需要自定义logo了");
            $("#nextStep > span").each(function(){
                this.innerHTML="";
                this.innerHTML="自定义?";
                return false;
            })

            //下一步需要进行自定义logo了
        } else {
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
    });
});
