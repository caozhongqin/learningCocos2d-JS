/**
 * Created by Administrator on 2016/3/2.
 */

var Storage = {
    getCurrentLevel:function(){
        var level = cc.sys.localStorage.getItem("level") || 1;
        return parseInt(level);
    },
    setCurrentLevel:function(level){
        cc.sys.localStorage.setItem("level", level);
        return true;
    },
    getCurrentScore:function(){
        var score = cc.sys.localStorage.getItem("score") || 0;
        return parseInt(score);
    },
    setCurrentScore:function(score){
        cc.sys.localStorage.setItem("score", score);
        return true;
    },
};