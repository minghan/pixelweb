/*

Microbookmarklet
----------------

javascript: var s = document.createElement("script");
s.type="text/javascript";
document.body.appendChild(s);
s.src="https://raw.github.com/minghan/pixelweb/master/pixelweb.js";
void(0);

*/

// var PX_PATH = "file:///Users/minghan/Documents/hanworks/pixelweb/";
// var PX_PATH = "http://127.0.0.1:8000/~minghan/pixelweb/";
var PX_PATH = "https://raw.github.com/minghan/pixelweb/master/";

var libs = [
    PX_PATH + "lib/jquery-1.6.2.min.js",
    // PX_PATH + "lib/html2canvas.js",
    PX_PATH + "lib/html2canvas.min.js",
    PX_PATH + "lib/jquery.plugin.html2canvas.js",
    PX_PATH + "lib/close-pixelate.js"
];

var css = [
    PX_PATH + "pixelweb.css"
];

function canvasify() {

    $('body').html2canvas();

}

/*
    var div = document.createElement("div");
    $(div).width($(window).width());
    $(div).height($(window).height());
    $(div).css('background', 'yellow');
    $(div).css('zIndex', '10000');
    $(div).css('top', '0');
    $(div).css('left', '0');
    div.id = "pixelwebRect";
    document.body.appendChild(div);
*/



// load css

function loadcss(i) {
    if (i >= css.length) {
        loadscript(0);
        return;
    }
    var ref = document.createElement("link");
    ref.rel = "stylesheet";
    ref.type = "text/css";
    ref.href = css[i];
    document.body.appendChild(ref);
    loadcss(i+1);
}


// load js

function loadscript(i) {
    if (i >= libs.length) {
        setTimeout("canvasify()", 500);
        return;
    }
    var script = document.createElement("script");
    console.log("Loading:", libs[i]);
    script.src = libs[i];
    script.type = "text/javascript";
    script.onload = setTimeout("loadscript(" + String(i+1) + ")", 0); // wait until loaded
    document.body.appendChild(script);
}

loadcss(0);




