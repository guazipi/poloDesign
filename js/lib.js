/**
 * Created by Administrator on 2016/7/10.
 */
var CSDWPOLO = {};
CSDWPOLO.app = {};
CSDWPOLO.registerEvents = function () {
    //注册fancybox的弹出事件----begin
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
    //注册鼠标滑动显示tips事件----begin
    $(".each-part").mouseover(function (e) {
        var title = this.getAttribute("tipName");

        var left = $(this).offset().left;
        var top = $(this).offset().top;
        $(".tip em").text(title);
        $(".tip").css({"left": left + "px", "top": top + "px", "opacity": 1})
    })
    $(".each-part").mouseout(function () {
        $(".tip").css({"opacity": 0});
    })
    //注册鼠标滑动显示tips事件----end
    //注册polo-container中左右按钮的切换图片----begin
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
    //注册polo-container中左右按钮的切换图片----end
    //注册点选事件，选择某一项就把选中的tick.png加上----begin
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
    $.each(tickDivArray, function (key, val) {
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
    //注册点选事件，选择某一项就把选中的tick.png加上----end
}
//window.onload = init;
CSDWPOLO.init = function () {
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
                CSDWPOLO.app.logoMesh.visible = true;
                $(".model-container").fadeIn();
                $(".polo-container").fadeOut();

            } else {
                if (!$(".polo-container").is(":visible")) {
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

            CSDWPOLO.changeStatsOnStepsPanelPre(currentPanel);
        } else {
            CSDWPOLO.changeStatsOnStepsPanelPre(currentPanel);
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
            CSDWPOLO.getAllCustomInfo();

            CSDWPOLO.app.logoMesh.visible = true;
            $(".polo-container").fadeOut();
            $(".model-container").fadeIn();

            CSDWPOLO.changeStatsOnStepsPanelNext(currentPanel);
        } else if (typeof(currentPanel) == "undefined") {
            alert("未定义");
        } else {
            CSDWPOLO.changeStatsOnStepsPanelNext(currentPanel);
        }
    });

    setTimeout(function () {
        CSDWPOLO.init3DView();
    }, 400)
}
CSDWPOLO.changeStatsOnStepsPanelPre = function (currentPanel) {
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
CSDWPOLO.changeStatsOnStepsPanelNext = function (currentPanel) {
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
CSDWPOLO.getAllCustomInfo = function () {
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
        CSDWPOLO.app.lingkouMesh.material.map = lingkou1;
    } else if (customInfo.fabricCollor[0] == "purple") {
        var lingkou2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou2.jpg");
        CSDWPOLO.app.lingkouMesh.material.map = lingkou2;
    } else {
        var lingkou3 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/maps/T1_map_color.jpg");
        CSDWPOLO.app.lingkouMesh.material.map = lingkou3;

        var newxiukou = THREE.ImageUtils.loadTexture("./js/changeLogo/model/new/newxiukou/baise.jpg");
        CSDWPOLO.app.xiukouMesh.material.map = newxiukou;
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
CSDWPOLO.init3DView = function () {
    var lingkou, geo, uvarr;
    //var logo = THREE.ImageUtils.loadTexture("model/logo.png");
    var logo = THREE.ImageUtils.loadTexture("./js/changeLogo/laozi1.jpg");
    var logo1 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/logo1.png");
    var logo2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/logo2.png");
    var lingkou1 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou1.jpg");
    //var lingkou2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou2.jpg");
    var lingkou2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou_new.jpg");


    var f = !1, g;
    var h = function (a) {
        a.traverse(function (a) {
            a instanceof THREE.Mesh && a.material.color.setHex(8947848)
        })
    };

    var webglRender = new THREE.WebGLRenderer;
    //webglRender.setSize(window.innerWidth, window.innerHeight);
    webglRender.setSize(750, 670);

    webglRender.setClearColor(8947848);
    webglRender.shadowMapEnabled = !0;

    CSDWPOLO.app.webglRender = webglRender;

    document.getElementById("modelContainer").appendChild(webglRender.domElement);
    //document.body.appendChild(webglRender.domElement);

    webglRender.shadowMapEnabled = !0;
    var scene = new THREE.Scene();

    //var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

    camera.position.set(0, 10, 40);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    //var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 2E8);
    //camera2.position.set(0, 15, 40);
    //camera2.lookAt(new THREE.Vector3(0, 15, 0));

    var orbitControls = new THREE.OrbitControls(camera, webglRender.domElement);

    var clock = new THREE.Clock();

    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = stats.domElement.style.right = "0px";
    stats.domElement.style.display = "none";
    //document.body.appendChild(stats.domElement);
    //document.getElementById("modelContainer").appendChild(stats.domElement);

    scene.add(new THREE.AmbientLight(16777215));
    var direcLight = new THREE.DirectionalLight(16777215, 1.0);
    direcLight.position.set(100, 100, 100);
    direcLight.castShadow = !0;
    direcLight.shadowMapWidth = direcLight.shadowMapHeight = 4096;
    direcLight.shadowCameraFar = 500;
    direcLight.shadowCameraNear = 10;
    direcLight.shadowDarkness = 0.35;
    scene.add(direcLight);

    var modelS = new THREE.Group;

    scene.add(modelS);

    var objLoader = new THREE.OBJMTLLoader;
    //objLoader.load("./js/changeLogo/model/yifu_2.obj", "./js/changeLogo/model/yifu_2.mtl", function (a) {
    //    h(a);
    //    a.traverse(function (a) {
    //        a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide)
    //    });
    //    modelS.add(a)
    //});
    objLoader.load("./js/changeLogo/model/new/yishen/yishen.obj", "./js/changeLogo/model/new/yishen/yishen.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide)
        });
        modelS.add(a)
    });
    //objLoader.load("./js/changeLogo/model/lingzi.obj", "./js/changeLogo/model/lingzi.mtl", function (a) {
    //    h(a);
    //    a.traverse(function (a) {
    //        a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide, CSDWPOLO.app.lingkouMesh = a, lingkou = a.material.map)
    //    });
    //    modelS.add(a)
    //});
    objLoader.load("./js/changeLogo/model/new/lingzi/lingzi.obj", "./js/changeLogo/model/new/lingzi/lingzi.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide, CSDWPOLO.app.lingkouMesh = a, lingkou = a.material.map)
        });
        modelS.add(a)
    });
    objLoader.load("./js/changeLogo/model/logo.obj", "./js/changeLogo/model/logo.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material = new THREE.MeshLambertMaterial({
                transparent: !0,
                map: logo
            }), CSDWPOLO.app.logoMesh = a, geo = CSDWPOLO.app.logoMesh.geometry, uvarr = geo.faceVertexUvs[0], CSDWPOLO.app.logoMap = a.material.map)
        });
        CSDWPOLO.app.logoMesh.visible = false;
        a.position.set(0, 15, 0.8);
        modelS.add(a)
    });
    objLoader.load("./js/changeLogo/model/new/xiukou/xiukou.obj", "./js/changeLogo/model/new/xiukou/xiukou.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide, CSDWPOLO.app.xiukouMesh = a)
        });
        modelS.add(a)
    });

    modelS.position.set(0, -20, 0);
    modelS.scale.x = 1;
    modelS.scale.y = 1.2;
    modelS.scale.z = 1;
    render();

    function render() {
        stats.update()
        var delta = clock.getDelta();
        orbitControls.update(delta);
        //trackballControls.update(delta);
        //direcLight.position.copy(camera.position);
        direcLight.position.set(camera.position.x + 20, camera.position.y + 10, camera.position.z);
        ;

        requestAnimationFrame(render);
        webglRender.render(scene, camera);
    };

    CSDWPOLO.app.smallerLogo = function () {
        if (void 0 != CSDWPOLO.app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a) {
                    var d = c[a];
                    d.x = 2 * d.x - 0.5;
                    d.y = 2 * d.y - 0.5
                }
            geo.uvsNeedUpdate = !0
        }
    }
    CSDWPOLO.app.biggerLogo = function () {
        if (void 0 != CSDWPOLO.app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a) {
                    var d = c[a];
                    d.x = (d.x + 0.5) / 2;
                    d.y = (d.y + 0.5) / 2
                }
            geo.uvsNeedUpdate = !0
        }
    }
    var nowScale = 1;
    CSDWPOLO.app.smallerModel = function () {
        nowScale -= 0.1;
        0.7 > nowScale && (nowScale = 0.7);
        modelS.scale.set(nowScale, nowScale, nowScale)
    }
    CSDWPOLO.app.biggerModel = function () {
        nowScale += 0.1;
        1.2 < nowScale && (nowScale = 1.2);
        modelS.scale.set(nowScale, nowScale, nowScale)
    }
    CSDWPOLO.app.moveLeft = function () {
        if (void 0 != CSDWPOLO.app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].x += 0.1;
            geo.uvsNeedUpdate = !0
        }
    }
    CSDWPOLO.app.moveRight = function () {
        if (void 0 != CSDWPOLO.app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].x -= 0.1;
            geo.uvsNeedUpdate = !0
        }
    }
    CSDWPOLO.app.moveTop = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].y -= .1;
            geo.uvsNeedUpdate = !0
        }
    }
    CSDWPOLO.app.moveBottom = function () {
        if (void 0 != CSDWPOLO.app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].y += .1;
            geo.uvsNeedUpdate = !0
        }
    }
    CSDWPOLO.app.changeLogo = function () {
        CSDWPOLO.app.logoMesh.material.map = logo
    }
    CSDWPOLO.app.changeLogo1 = function () {
        CSDWPOLO.app.logoMesh.material.map = logo1
    }
    CSDWPOLO.app.changeLogo2 = function () {
        CSDWPOLO.app.logoMesh.material.map = logo2
    }
    CSDWPOLO.app.changeLingkou = function () {
        CSDWPOLO.app.lingkouMesh.material.map = lingkou
    }
    CSDWPOLO.app.changeLingkou1 = function () {
        CSDWPOLO.app.lingkouMesh.material.map = lingkou1
    }
    CSDWPOLO.app.changeLingkou2 = function () {
        CSDWPOLO.app.lingkouMesh.material.map = lingkou2
    };

    CSDWPOLO.initDIY();
}
//初始化更换logo中上传图片，对图片进行编辑的功能
CSDWPOLO.initDIY = function () {
    var canvas = document.getElementById("logoCanvas");
    canvas.width = 320;
    canvas.height = 300;

    // 默认可编辑区域
    var TShirtScope = {
        x: 65,
        y: 30,
        w: 186,
        h: 249
    };
    var currentScope = TShirtScope;

    // diy自定义配置
    var config = {
        maxSize_image: 5,		// 最多图层限制数量
        scaleScope_max: 2,		// 缩放最大范围限制
        scaleScope_min: 0.1,	// 缩放最小范围限制
        lineWidth: 1,			// 边框线粗细
        strokeStyle: '#000000',	// 边框线颜色
        fillStyle: '#000000',	// 节点填充颜色
        nodeStyle: 0,			// 节点样式:1方块,0圆点
        scaleAreaSize: 4		// 节点大小
    };

    // 初始化diy
    hbdiy.init({
        diyid: 'logoCanvas',			// canvas的id
        scope_x: currentScope.x,			// 可编辑区域范围
        scope_y: currentScope.y,
        scope_width: currentScope.w,
        scope_height: currentScope.h,
        maxSize_image: config.maxSize_image,		// 最多图层限制数量
        maxSize_text: 5,
        scaleScope_max: config.scaleScope_max,	// 缩放范围限制
        scaleScope_min: config.scaleScope_min,
        resizeType: 1,
        lineWidth: config.lineWidth,			// 焦点样式
        strokeStyle: config.strokeStyle,
        fillStyle: config.fillStyle,
        nodeStyle: config.nodeStyle,
        scaleAreaSize: config.scaleAreaSize,
        debug: config.debug,			// 调试
        tools: "./js/changeLogo/test/images/tools.png"
    });
    hbdiy.unlock();

    var fileInput = document.getElementById("uploadedFile");
    //监听是否有文件被选中
    fileInput.onchange = function () {
        //这里判断一下文件长度可以确定用户是否真的选择了文件，如果点了取消则文件长度为0
        if (fileInput.files.length !== 0) {
            var file = fileInput.files[0];
            if (!/image\/\w+/.test(file.type)) {
                alert("看清楚，这个需要图片！");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(fileInput.files[0]);
            reader.onload = function (evt) {
                //console.log(evt.target.result);
                hbdiy.addImage(evt.target.result, evt.target.result, 1);
            }
        }
    };

    $("#uploadImg").bind("click", function () {
        fileInput.click();
    });

    function getImgUrl() {
        var ImgUrl = hbdiy.download();
        hbdiy.unlock();
        //window.location.href=ImgUrl;
        CSDWPOLO.app.logoMap = THREE.ImageUtils.loadTexture(ImgUrl);
        CSDWPOLO.app.logoMesh.material.map = CSDWPOLO.app.logoMap;
        setTimeout(function () {
            hbdiy.unlock();
        }, 100);

    }

    document.getElementById("applyToModel").onclick = getImgUrl;
};

CSDWPOLO.preview = function () {
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
                    CSDWPOLO.app.logoMesh.visible = false;
                    return false;
                }
            });
            CSDWPOLO.getAllCustomInfo_sec();
            document.getElementById("f5list").appendChild(CSDWPOLO.app.webglRender.domElement);
        },
        afterShow: function () {
            document.getElementById("cover").style.display = "none";
        },
        beforeClose: function () {
            document.getElementById("modelContainer").appendChild(CSDWPOLO.app.webglRender.domElement);
        }
    });
};
CSDWPOLO.saveCustomInfo = function () {
    alert("将用户的定制信息提交到当前用户的账户中!");
}
//此函数和main.js中的一个函数重复，此时只是暂时备用吧
CSDWPOLO.getAllCustomInfo_sec = function () {
    var customInfo = {};
    var poloReal = document.getElementsByClassName("polo-real")[0];
    var styleType = poloReal.getAttribute("styleType");
    customInfo.styleType = styleType;
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
        CSDWPOLO.app.lingkouMesh.material.map = lingkou1;
    } else if (customInfo.fabricCollor[0] == "purple") {
        var lingkou2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou2.jpg");
        CSDWPOLO.app.lingkouMesh.material.map = lingkou2;
    } else {
        var lingkou3 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/maps/T1_map_color.jpg");
        CSDWPOLO.app.lingkouMesh.material.map = lingkou3;

        var newxiukou = THREE.ImageUtils.loadTexture("./js/changeLogo/model/new/newxiukou/baise.jpg");
        CSDWPOLO.app.xiukouMesh.material.map = newxiukou;
    }
}

CSDWPOLO.showShirtInApp = function (styleName) {
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
