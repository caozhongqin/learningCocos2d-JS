/**
 * Created by Administrator on 2016/3/4.
 */

var HttpScene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var layerGradient = new cc.LayerGradient(cc.color(255, 0, 0), cc.color(0, 0, 255));
        this.addChild(layerGradient, 0);

        this.addChild(new HttpLayer());
    }
});

var HttpLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var winSize = cc.winSize;
        var xhr = cc.loader.getXMLHttpRequest();
        var statusGetLabel = new cc.LabelTTF("Status:", "Thonburi", 18);
        //statusGetLabel.setColor(cc.color(0, 255, 0));
        this.addChild(statusGetLabel, 1);
        statusGetLabel.x = winSize.width / 2;
        statusGetLabel.y = winSize.height - 100;
        statusGetLabel.setString("Status: Send Get Request to httpbin.org");

        //set arguments with <URL>?xxx=xxx&yyy=yyy
        //xhr.open("GET", "http://192.168.80.83:8077/huaTeng/testController/test.ht", true);

        //xhr.open("GET", "http://192.168.80.83:8077/huaTeng/testController/test2.ht?userName=测试123qwer", true);
        xhr.open("POST", "http://192.168.80.83:8077/huaTeng/testController/test2.ht", true);
        //xhr.open("POST", "http://192.168.80.83:8077/huaTeng/userController/getUserInfo.ht", true);

        //xhr.open("GET", "http://192.168.80.83:8077/huaTeng/userController/getUserInfo.ht?requestInfoStr={\"openid\":\"whg333\"}", true);
        //xhr.open("POST", "http://192.168.80.83:8077/huaTeng/userController/getUserInfo.ht");

        //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        //xhr.setRequestHeader("authSecret","3c40803264a0195a_404870");
        //xhr.setRequestHeader("idf_c_key","");

        //set Content-type "text/plain;charset=UTF-8" to post plain text
        //xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");

        var that = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText + "...";
                var responseLabel = new cc.LabelTTF("GET Response (100 chars): \n" + response, "Thonburi", 16);
                //responseLabel.setColor(cc.color(0, 255, 0));
                that.addChild(responseLabel, 1);
                responseLabel.anchorX = 0;
                responseLabel.anchorY = 1;
                responseLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;

                responseLabel.x = 10;
                responseLabel.y = winSize.height / 2;
                statusGetLabel.setString("Status: Got GET response! " + httpStatus);
            }
        };

        var data = {
            userName:"测试123qwer",
            userId:"100123",
        };

        //var data = {
        //    requestInfoStr:"{\"openid\":\"whg333\"}"
        //};

        //var data = "userName=测试123qwer&userId=100123";
        trace(data);

        //xhr.send();
        xhr.send(requestParam(data));

        return true;
    }
});

function requestParam(data){
    if(typeof(data) == "string"){
        return data;
    }
    var result = [];
    for(e in data){
        result.push(e+"="+data[e]);
    }
    return result.join("&");
}

isJson = function(obj){
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}