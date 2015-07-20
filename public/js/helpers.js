window.helpers = {};

console.horse=function(){
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhhhhho");
};



helpers.merge = function(data, names){
    //merges specified bars into a new array where no elements overlap
    var start,end;
    var data = helpers.clone(data);
    var preMerge = [],
    merged = [];



    //go through the specified names in the data object
    //and save all elements in a new preMerge array
    for(var i=0; i < names.length; i++){
        for(count in data[names[i]]){
            preMerge.push(data[names[i]][count])
        }
    }


    //(example) preMerge = [{start:440,end:460},{start:1100,end:100}]

    //to avoid confusion when the end value is lower than the start value, split up those elements

    for(var i = 0; i < preMerge.length; i++){
        start = preMerge[i].start;
        end = preMerge[i].end;

        if(start > end){
            // ex. start:1100 end:100
            preMerge[i].end = 1440;
            preMerge.push ({start:0,end:end})
            // now start:1100 end:1440
            // and start:0 end:100
        }
    }

    //sort preMerge by start value:

    preMerge = preMerge.sort(function(a, b){
        return a.start-b.start
    });


    //push first element
    merged.push(preMerge[0]);

    //then iterate the rest
    for(var i = 1;i < preMerge.length; i++){
        start = preMerge[i].start;
        end = preMerge[i].end;
        prevEnd = merged[merged.length-1].end;

        if(start <= prevEnd && end > prevEnd){
            //start is inside prev. element
            //merge:
            merged[merged.length-1].end = end;
        }
        else if(start > prevEnd){
            //start is outside prev. element
            //create new element in array:
            merged.push({
                start:start,
                end:end
            })
        }

    }

    return merged;
}
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

    helpers.clone = function (obj){
    //clone an object
    return JSON.parse(JSON.stringify(obj));
}

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

helpers.middle = function (start, end) {
    var distance, middle;
    distance = helpers.range(start, end);
    middle = helpers.calc(start, distance/2);

    return middle;
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


helpers.pointIsInside = function (point,start,end){
    if(end > start){
        if(point < end && point > start)
            return true;
    }else if(start > end){
        if(point > start || point < end)
            return true;
    }
    return false;
}

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

helpers.clockToMinutes = function (clock) {
    var hours, minutes, total;

    if(clock.length != 4){
        console.warn('clock value not correct length');
        return
    }

    hours = clock.substring(0,2);
    minutes = clock.substring(2,4)*1;
    total = minutes + (hours*60);

    return total;
}

helpers.degreesToRadiens = function (deg) {
    return ((Math.PI / 180) * (deg));
};

helpers.minutesToRadians = function (minutt) {
    return ((Math.PI / 720) * (minutt - 360));
};

helpers.minutesToHoursMinutes = function (min){

    hours = Math.floor(min / 60) + "";
    minutes = min % 60 + "";
    minutes = Math.floor(minutes);

    return {
        hours:hours,
        minutes:minutes
    };
};

helpers.minutesToReadable = function (min,breakpoint){
    //extends minutesToHoursMinutes and adds h and m
    var hm;
    if(typeof breakpoint == 'undefined'){
        breakpoint = 60
    }

    if(min > breakpoint){
        hm = helpers.minutesToHoursMinutes(min);
        return hm.hours + 'h ' + hm.minutes + 'm';
    }else{
        return min + 'm';
    }
}

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