/**
 * Created by Administrator on 2016/2/29.
 */

var Chapter06Scene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        //this.addChild(new ScheduleUpdateLayer());
        //this.addChild(new ScheduleLayer());
        //this.addChild(new ResumeLayer());
        //this.addChild(new InaccuracyTestLayer());
        this.addChild(new BetterScheduleLayer());
    }
});

var ScheduleUpdateLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.scheduleUpdate();
        return true;
    },
    update:function(){
        //do something
    }
});

var ScheduleLayer = cc.Layer.extend({
    tickCount:0,
    ctor:function(){
        this._super();
        this.schedule(this.tick, 1, cc.REPEAT_FOREVER, 2);
        //setInterval(this.tick, 1000);
        //this.schedule(this.tick.bind(this), 1, cc.REPEAT_FOREVER, 2);
        return true;
    },
    tick:function(){
        trace("tick-"+(++this.tickCount));
        if(this.tickCount == 5){
            this.unschedule(this.tick);
        }
    }
});

var ResumeLayer = cc.Layer.extend({
    frame:0,
    ctor:function(){
        this._super();
        this.scheduleUpdate();
        this.schedule(this.scheduleTest, 1);
        this.scheduleOnce(this.scheduleOnceTest, 3);

        setTimeout(function(){
            trace("pause", this.currentTime());
            this.pause();
        }.bind(this), 2000);

        setTimeout(function(){
            trace("resume", this.currentTime());
            this.resume();
        }.bind(this), 5000);

        trace(this.currentTime());
        return true;
    },
    update:function(){
        if(++this.frame %10 == 0){
            trace("update 10 frame");
        }
    },
    scheduleTest:function(){
        trace("scheduleTest", this.currentTime());
    },
    scheduleOnceTest:function(){
        trace("scheduleOnceTest", this.currentTime());
    },
    currentTime:function(){
        return parseInt(new Date().getTime() / 1000);
    }
});

var InaccuracyTestLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var startTime = new Date().getTime();
        var count = 0;
        this.schedule(function(){
            var timePass = new Date().getTime() - startTime;
            count++;
            var detal = timePass - (count * 100);
            trace("time pass", timePass, "total detal", detal, "count", count);
        }, 0.1);
        this.scheduleUpdate();
        return true;
    },
    update:function(){
        for(var i=0;i<10000000;i++){
            b = 1/0.22222;
        }
    }
});

var BetterScheduleLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var startTime = new Date().getTime();
        var count = 0;
        this.schedule2(function(){
            var timePass = new Date().getTime() - startTime;
            count++;
            var detal = timePass - (count * 100);
            trace("time pass", timePass, "total detal", detal, "count", count);
        }, 0.1);
        this.scheduleUpdate();
        return true;
    },
    update:function(){
        for(var i=0;i<10000000;i++){
            b = 1/0.22222;
        }
    },
    schedule2:function(callback, interval){
        var then = Date.now();
        interval = interval * 1000;
        this.schedule(function(){
            var now = Date.now();
            var detal = now - then;
            if(detal > interval){
                then = now - (detal % interval);
                callback.call(this);
            }
        }.bind(this), 0);
    }
});