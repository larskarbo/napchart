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


helpers.XYtoMinutes = function (x,y) {
    minutes = (Math.atan(y /x) / (Math.PI * 2)) * 1440 + 360;
    if (x < 0) {
        minutes += 720;
    }
    minutes = Math.round(minutes);

    return minutes;
};