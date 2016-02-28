/**
 * Created by Administrator on 2016/2/28.
 */

var Chapter05Scene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        //this.addChild(new MouseEventLayer());
        this.addChild(new KeyboardTestLayer());
    }
});

var MouseEventLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        if('mouse' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:function(event){
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    if(event.getButton() === cc.EventMouse.BUTTIN_RIGHT){
                        trace("onRightMouseDown at: "+pos.x+", "+pos.y);
                    }else if(event.getButton() === cc.EventMouse.BUTTON_LEFT){
                        trace("onLeftMouseDown at: "+pos.x+", "+pos.y);
                    }
                },
                onMouseMove:function(event){
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    trace("onMouseMove at: "+pos.x+", "+pos.y);
                },
                onMouseUp:function(event){
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    trace("onMouseUp at: "+pos.x+", "+pos.y);
                }
            }, this);
        }else{
            trace("MOUSE not supported");
        }

        return true;
    }
});

var KeyboardTestLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        if('keyboard' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.KEYBOARD,
                onKeyReleased:function(keyCode, event){
                    if(keyCode == cc.KEY.back){
                        trace("return button clicked. keycode: "+keyCode);
                        cc.director.end();
                    }else if(keyCode == cc.KEY.menu){
                        trace("menu button clicked. keycode: "+keyCode);
                    }else{
                        trace("keycode: "+keyCode);
                    }
                }
            }, this);
        }else{
            trace("KEYBOARD not supported");
        }

        return true;
    }
});