
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //var layer = new HelloWorldLayer();
        //this.addChild(layer);

        var layerGradient = new cc.LayerGradient(cc.color(255, 0, 0), cc.color(0, 0, 255));
        this.addChild(layerGradient, 0);

        var bg = new cc.LayerColor(cc.color(100, 100, 100), 200, 200);
        bg.x = 100;
        bg.y = 100;
        this.addChild(bg, 1);

        var ball = new cc.Sprite(res.item2);
        //var size = cc.director.getWinSize();
        //ball.x = size.width / 2;
        //ball.y = size.height / 2;
        ball.x = 100;
        ball.y = 300;
        this.addChild(ball, 2);

        var ball2 = new cc.Sprite(res.item3);
        ball2.x = 100;
        ball2.y = 100;
        bg.addChild(ball2, 1);

        var ball3 = new cc.Sprite(res.item3);
        ball.addChild(ball3, 1);

        this.scheduleOnce(function(){
            cc.director.runScene(new cc.TransitionFade(2, new SecondScene()));
        }, 5);
    }
});


var SecondScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new cc.LayerGradient(cc.color(128, 0, 0), cc.color(0, 0, 128));
        this.addChild(layer);

        this.scheduleOnce(function(){
            cc.director.runScene(new cc.TransitionTurnOffTiles(2, new HelloWorldScene()));
        }, 5);
    }
});
