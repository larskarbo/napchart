window.helpers = {};

console.horse=function(){
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhhhhho");
};
    
    //Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    helpers.requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
    }());
    helpers.cancelAnimFrame = (function(){
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            function(callback) {
                return window.clearTimeout(callback, 1000 / 60);
            };
    }());

//Easing functions adapted from Robert Penner's easing equations
//http://www.robertpenner.com/easing/
helpers.easingEffects = {
    linear: function (t) {
        return t;
    },
    easeInQuad: function (t) {
        return t * t;
    },
    easeOutQuad: function (t) {
        return -1 * t * (t - 2);
    },
    easeInOutQuad: function (t) {
        if ((t /= 1 / 2) < 1){
            return 1 / 2 * t * t;
        }
        return -1 / 2 * ((--t) * (t - 2) - 1);
    },
    easeInCubic: function (t) {
        return t * t * t;
    },
    easeOutCubic: function (t) {
        return 1 * ((t = t / 1 - 1) * t * t + 1);
    },
    easeInOutCubic: function (t) {
        if ((t /= 1 / 2) < 1){
            return 1 / 2 * t * t * t;
        }
        return 1 / 2 * ((t -= 2) * t * t + 2);
    },
    easeInQuart: function (t) {
        return t * t * t * t;
    },
    easeOutQuart: function (t) {
        return -1 * ((t = t / 1 - 1) * t * t * t - 1);
    },
    easeInOutQuart: function (t) {
        if ((t /= 1 / 2) < 1){
            return 1 / 2 * t * t * t * t;
        }
        return -1 / 2 * ((t -= 2) * t * t * t - 2);
    },
    easeInQuint: function (t) {
        return 1 * (t /= 1) * t * t * t * t;
    },
    easeOutQuint: function (t) {
        return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
    },
    easeInOutQuint: function (t) {
        if ((t /= 1 / 2) < 1){
            return 1 / 2 * t * t * t * t * t;
        }
        return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
    },
    easeInSine: function (t) {
        return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
    },
    easeOutSine: function (t) {
        return 1 * Math.sin(t / 1 * (Math.PI / 2));
    },
    easeInOutSine: function (t) {
        return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
    },
    easeInExpo: function (t) {
        return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
    },
    easeOutExpo: function (t) {
        return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
    },
    easeInOutExpo: function (t) {
        if (t === 0){
            return 0;
        }
        if (t === 1){
            return 1;
        }
        if ((t /= 1 / 2) < 1){
            return 1 / 2 * Math.pow(2, 10 * (t - 1));
        }
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
    },
    easeInCirc: function (t) {
        if (t >= 1){
            return t;
        }
        return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
    },
    easeOutCirc: function (t) {
        return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
    },
    easeInOutCirc: function (t) {
        if ((t /= 1 / 2) < 1){
            return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
        }
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    easeInElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0){
            return 0;
        }
        if ((t /= 1) == 1){
            return 1;
        }
        if (!p){
            p = 1 * 0.3;
        }
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else{
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
    },
    easeOutElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0){
            return 0;
        }
        if ((t /= 1) == 1){
            return 1;
        }
        if (!p){
            p = 1 * 0.3;
        }
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else{
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
    },
    easeInOutElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0){
            return 0;
        }
        if ((t /= 1 / 2) == 2){
            return 1;
        }
        if (!p){
            p = 1 * (0.3 * 1.5);
        }
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        if (t < 1){
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));}
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    easeInBack: function (t) {
        var s = 1.70158;
        return 1 * (t /= 1) * t * ((s + 1) * t - s);
    },
    easeOutBack: function (t) {
        var s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
    },
    easeInOutBack: function (t) {
        var s = 1.70158;
        if ((t /= 1 / 2) < 1){
            return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
        }
        return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
    },
    easeInBounce: function (t) {
        return 1 - easingEffects.easeOutBounce(1 - t);
    },
    easeOutBounce: function (t) {
        if ((t /= 1) < (1 / 2.75)) {
            return 1 * (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
            return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
        } else if (t < (2.5 / 2.75)) {
            return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
        } else {
            return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
        }
    },
    easeInOutBounce: function (t) {
        if (t < 1 / 2){
            return easingEffects.easeInBounce(t * 2) * 0.5;
        }
        return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
    }
},

helpers.shortestWay = function (s) {
    console.log(s);
    if (s < -720)
        return calc(1440, s);
    if (s > 720)
        return s - 1440;
    return s;
};

helpers.range = function (start, end) {
    if (end < start) {
        return 1440 - start + end;
    } else {
        return end - start;
    }
};

helpers.rangeObject = function (arr) {
    return range(arr.start, arr.end);
};

helpers.middlepointFinder = function (obj) {
    return calc(rangeObject(obj) / 2, obj.start);
};

helpers.calc = function (minutes, plus) {
    if (minutes + plus < 0) {
        return minutes + plus + 1440;
    } else if (minutes + plus > 1440) {
        return minutes + plus - 1440;
    } else {
        return minutes + plus;
    }
};

helpers.totalWidth = function (percent) {
    return (document.getElementById("canvas").clientHeight * (percent / 100));
};

helpers.currentProp = function () {
    return (document.getElementById("canvas").clientHeight / 500);
};

helpers.minutesToClock = function (minutes) {
    minutes = Math.floor(minutes);
    if (minutes >= 1440)
        minutes -= 1440;
    hours = Math.floor(minutes / 60) + "";
    minutes = minutes % 60 + "";
    if (hours.length == 1) {
        hours = "0" + hours;
    }
    if (minutes.length == 1) {
        minutes = "0" + minutes;
    }

    return (hours + minutes);

};

helpers.minutesToStatistics = function (minutes) {
    hours = Math.floor(minutes / 60) + "";
    minutes = minutes % 60 + "";
    returnArr = [hours, Math.floor(minutes)];
    return (returnArr);

};

helpers.degreesToRadiens = function (deg) {
    return ((Math.PI / 180) * (deg));
};

helpers.minutesToRadians = function (minutt) {
    return ((Math.PI / 720) * (minutt - 360));
};

helpers.radiensTilMinutt = function (deg) {
    return ((Math.PI / 180) * (deg));
};

helpers.minutesToXY = function (minutes, radius, basewidth, baseheight) {
    if(typeof basewidth == 'undefined')
        var basewidth = 0;
    if(typeof baseheight == 'undefined')
        var baseheight = 0;

    o = {};
    o.y = Math.sin((minutes / 1440) * (Math.PI * 2) - (Math.PI / 2)) * radius + baseheight;
    o.x = Math.cos((minutes / 1440) * (Math.PI * 2) - (Math.PI / 2)) * radius + basewidth;
    return o;
};

helpers.distance = function (x1,y1,x2,y2){
    var y = y2-y1;
    var x = x2-x1;
    return Math.sqrt(y*y+x*x);
}

helpers.XYtoMinutes = function (x,y) {
    minutes = (Math.atan(y /x) / (Math.PI * 2)) * 1440 + 360;
    if (x < 0) {
        minutes += 720;
    }
    minutes = Math.round(minutes);

    return minutes;
};