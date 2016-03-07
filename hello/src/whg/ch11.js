/**
 * Created by Administrator on 2016/3/7.
 */

var Chapter11Scene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var layerGradient = new cc.LayerGradient(cc.color(255, 0, 0), cc.color(0, 0, 255));
        this.addChild(layerGradient, 0);

        //this.addChild(new AnimationLayer(false));
        //this.addChild(new ArmatureLayer());
        this.addChild(new DragonBonesLayer());
    }
});

var AnimationLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var size = cc.winSize;
        var person = new cc.Sprite();
        var animation = new cc.Animation();
        for(var i=0;i<grossiniPngs.length;i++){
            //trace(grossiniPngs[i]);
            animation.addSpriteFrameWithFile(grossiniPngs[i]);
        }
        animation.setDelayPerUnit(1/14);

        var action = cc.animate(animation).repeatForever();
        person.runAction(action);

        this.addChild(person);
        person.x = size.width/2;
        person.y = size.height/2;

        return true;
    }
});

var ArmatureLayer = cc.Layer.extend({
    _armature:null,
    _direction:1,
    onEnter:function () {
        this._super();

        var winSize = cc.winSize;
        ccs.armatureDataManager.addArmatureFileInfo("res/images/ch11/DemoPlayer/DemoPlayer.ExportJson");
        this._armature = new ccs.Armature("DemoPlayer");
        this._armature.getAnimation().play("walk_fire");
        this._armature.scaleX = -0.25;
        this._armature.scaleY = 0.25;
        this._armature.x = winSize.width / 2 - 150;
        this._armature.y = winSize.height / 2;
        this._armature.getAnimation().setMovementEventCallFunc(this.animationEventHandler,this);
        this.addChild(this._armature);

        this._direction = 1;
    },

    animationEventHandler:function (armature, movementType, movementID) {
        if (movementType == ccs.MovementEventType.loopComplete) {
            if (movementID == "walk_fire") {
                var moveBy = cc.moveBy(2, cc.p(300 * this._direction, 0));
                this._armature.stopAllActions();
                this._armature.runAction(cc.sequence(moveBy, cc.callFunc(this.callback, this)));
                this._armature.getAnimation().play("walk");

                this._direction *= -1;
            }
        }
    },

    callback:function () {
        this._armature.runAction(cc.scaleTo(0.1, 0.25 * this._direction * -1, 0.25));
        this._armature.getAnimation().play("walk_fire", 10);
    }
});

var DragonBonesLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        ccs.armatureDataManager.addArmatureFileInfo("res/images/ch11/dragonbones/skeleton.png", "res/images/ch11/dragonbones/skeleton.plist", "res/images/ch11/dragonbones/skeleton.xml");
        var armature = new ccs.Armature("Dragon");
        armature.getAnimation().play("walk");
        armature.getAnimation().setSpeedScale(24/60);
        this.addChild(armature);
        armature.x = cc.winSize.width/2;
        armature.y = cc.winSize.height/3;
    }
});