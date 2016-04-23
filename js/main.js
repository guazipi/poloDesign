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


});
