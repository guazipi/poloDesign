/**
 * Created by Administrator on 2016/4/14.
 */
var app = {};
function init() {
    var lingkou, geo, uvarr;
    //var logo = THREE.ImageUtils.loadTexture("model/logo.png");
    var logo = THREE.ImageUtils.loadTexture("./js/changeLogo/laozi1.jpg");
    var logo1 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/logo1.png");
    var logo2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/logo2.png");
    var lingkou1 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou1.jpg");
    var lingkou2 = THREE.ImageUtils.loadTexture("./js/changeLogo/model/lingkou2.jpg");

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

    document.getElementById("modelContainer").appendChild(webglRender.domElement);
    //document.body.appendChild(webglRender.domElement);

    webglRender.shadowMapEnabled = !0;
    var scene = new THREE.Scene();

    //var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
    var camera = new THREE.PerspectiveCamera(45, 1, .1, 1000);

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
    stats.domElement.style.display="none";
    //document.body.appendChild(stats.domElement);
    document.getElementById("modelContainer").appendChild(stats.domElement);

    scene.add(new THREE.AmbientLight(16777215));
    var direcLight = new THREE.DirectionalLight(16777215, 1.0);
    direcLight.position.set(100, 100, 100);
    direcLight.castShadow = !0;
    direcLight.shadowMapWidth = direcLight.shadowMapHeight = 4096;
    direcLight.shadowCameraFar = 500;
    direcLight.shadowCameraNear = 10;
    direcLight.shadowDarkness = .35;
    scene.add(direcLight);

    var modelS = new THREE.Group;

    scene.add(modelS);

    var objLoader = new THREE.OBJMTLLoader;
    objLoader.load("./js/changeLogo/model/yifu_2.obj", "./js/changeLogo/model/yifu_2.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide)
        });
        modelS.add(a)
    });
    objLoader.load("./js/changeLogo/model/lingzi.obj", "./js/changeLogo/model/lingzi.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide, app.lingkouMesh = a, lingkou = a.material.map)
        });
        modelS.add(a)
    });
    objLoader.load("./js/changeLogo/model/logo.obj", "./js/changeLogo/model/logo.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material = new THREE.MeshLambertMaterial({
                transparent: !0,
                map: logo
            }), app.logoMesh = a, geo = app.logoMesh.geometry, uvarr = geo.faceVertexUvs[0], app.logoMap = a.material.map)
        });
        modelS.add(a)
    });
    //modelS.scale=THREE.Vector3(1,0.5,1);
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
        direcLight.position.set(camera.position.x+20,camera.position.y+10,camera.position.z);;

        requestAnimationFrame(render);
        webglRender.render(scene, camera);
    };

    app.smallerLogo = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a) {
                    var d = c[a];
                    d.x = 2 * d.x - .5;
                    d.y = 2 * d.y - .5
                }
            geo.uvsNeedUpdate = !0
        }
    }
    app.biggerLogo = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a) {
                    var d = c[a];
                    d.x = (d.x + .5) / 2;
                    d.y = (d.y + .5) / 2
                }
            geo.uvsNeedUpdate = !0
        }
    }
    var nowScale = 1;
    app.smallerModel = function () {
        nowScale -= .1;
        .7 > nowScale && (nowScale = .7);
        modelS.scale.set(nowScale, nowScale, nowScale)
    }
    app.biggerModel = function () {
        nowScale += .1;
        1.2 < nowScale && (nowScale = 1.2);
        modelS.scale.set(nowScale, nowScale, nowScale)
    }
    app.moveLeft = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].x += .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveRight = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].x -= .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveTop = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].y -= .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveBottom = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].y += .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.changeLogo = function () {
        app.logoMesh.material.map = logo
    }
    app.changeLogo1 = function () {
        app.logoMesh.material.map = logo1
    }
    app.changeLogo2 = function () {
        app.logoMesh.material.map = logo2
    }
    app.changeLingkou = function () {
        app.lingkouMesh.material.map = lingkou
    }
    app.changeLingkou1 = function () {
        app.lingkouMesh.material.map = lingkou1
    }
    app.changeLingkou2 = function () {
        app.lingkouMesh.material.map = lingkou2
    };

    initDiy();
}

function initDiy() {
    var canvas = document.getElementById("logoCanvas");
    canvas.width = 320;
    canvas.height = 300;

    // 默认可编辑区域
    var TShirtScope = {
        x: 65,
        y: 30,
        w: 186,
        h: 249
    }
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
    }

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
        tools: './js/changeLogo/test/images/tools.png'
    });
    hbdiy.unlock();

    var fileInput = document.getElementById('uploadedFile');
    //监听是否有文件被选中
    fileInput.onchange = function () {
        //这里判断一下文件长度可以确定用户是否真的选择了文件，如果点了取消则文件长度为0
        if (fileInput.files.length !== 0) {
            var file=fileInput.files[0];
            if(!/image\/\w+/.test(file.type)){
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

    $("#uploadImg").bind("click",function(){
        fileInput.click();
    })


    function getImgUrl() {
        var ImgUrl = hbdiy.download();
        hbdiy.unlock();
        //window.location.href=ImgUrl;
        app.logoMap = THREE.ImageUtils.loadTexture(ImgUrl);
        app.logoMesh.material.map = app.logoMap;
        setTimeout(function(){
            hbdiy.unlock();
        },100);

    }
    document.getElementById("applyToModel").onclick = getImgUrl;
};

//window.onload = init;