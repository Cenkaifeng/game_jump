/**
 * Created by Jervis on 2017/12/29.
 */
var PORT = 3309;
var http = require('http');
var fs = require('fs');
var process = require('child_process');
var server = http.createServer(function (request, response) {
    if (request.url.indexOf("tiaoyitiao") > 0) {
        fs.readFile("./screen_tmp/tiaoyitiao.png", "binary", function (err, file) {
            response.writeHead(200, {
                'Content-Type': 'image/png'
            });
            response.write(file, "binary");
            response.end();
        });
    } else if (request.url.indexOf("jump") > 0) {
        var url = request.url;

        var arr = url.split("&&&");

        var len = arr[1];

        //TODO 调整这个，用来适应不同手机
        //TODO 调整这个，用来适应不同手机
        //TODO 调整这个，用来适应不同手机
        var JUMP_PARAM = 3.95;

        var time = 0;
        try {
            time = parseInt(len * JUMP_PARAM);
        } catch (e) {
        }

        console.log("准备起跳了，长按时间:" + time);

        process.exec('jump.bat ' + time, function (error, stdout, stderr) {
            console.log('exec error: ' + error);
            console.log('exec stdout: ' + stdout);
            console.log('exec stderr: ' + stderr);


            setTimeout(function () {
                //响应数据
                response.writeHead(200);
                response.write("ok");
                response.end();
            }, time * 2);
        });
    } else {
        fs.readFile("./index.html", "binary", function (err, file) {
            
            process.exec('get_screen.bat', function (error, stdout, stderr) {
                console.log('exec error: ' + error);
                console.log('exec stdout: ' + stdout);
                console.log('exec stderr: ' + stderr);

                //响应数据
                response.writeHead(200);
                response.write(file, "binary");
                response.end();
            });
        });
    }

});
server.listen(PORT);
console.log("服务已启动");
console.log("请访问页面 http://127.0.0.1:" + PORT);
console.log("请将手机游戏启动到开始页面，然后到上述网页操作就可以飞了！！！");



