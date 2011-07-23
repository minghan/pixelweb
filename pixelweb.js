/*

javascript:(function(){ document.body.appendChild(document.createElement("script").src = "file.js"; })();

*/

var PX_PATH = "file:///Users/minghan/Documents/hanworks/pixelweb/";

var libs = [
    PX_PATH + "lib/jquery-1.6.2.min.js",
    PX_PATH + "lib/html2canvas.min.js"
    // PX_PATH + "lib/jquery.plugin.html2canvas.js"
];

var css = [
    PX_PATH + "pixelweb.css"
];

function canvasify() {
    // alert($('body').html());
    // $('body').html2canvas();

    var div = document.createElement("div");
    $(div).width($(window).width());
    $(div).height($(window).height());
    $(div).css('background', 'yellow');
    $(div).css('zIndex', '10000');
    $(div).css('top', '0');
    $(div).css('left', '0');
    div.id = "pixelwebRect";
    document.body.appendChild(div);



    var object = $.extend({},{
        logging: false,
        proxyUrl: "http://html2canvas.appspot.com/", // running html2canvas-python proxy
        ready: function(renderer) {
            
            var finishTime = new Date();
           // console.log((finishTime.getTime()-timer)/1000);
            

            document.body.appendChild(renderer.canvas);
            
            
            
            var canvas = $(renderer.canvas);
            canvas.css('position','absolute')
            .css('left',0).css('top',0);
            

            
           // $('body').append(canvas);
            $(canvas).siblings().toggle();
            
            throwMessage('Screenshot created in '+ ((finishTime.getTime()-timer)/1000) + " seconds<br />Total of "+renderer.numDraws+" draws performed",4000);
            
            
            $(window).click(function(){
                if (!canvas.is(':visible')){
                    $(canvas).toggle().siblings().toggle();  
                    throwMessage("Canvas Render visible");
                } else{
                    $(canvas).siblings().toggle();  
                    $(canvas).toggle();
                    throwMessage("Canvas Render hidden");
                }
                
      
            });
        }
        
    },options)
    
    new html2canvas(this.get(0), object);

}

// load css

function loadcss(i) {
    if (i >= css.length) return;
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
        return;
    }
    var script = document.createElement("script");
    script.src = libs[i];
    script.type = "text/javascript";
    script.onload = loadscript(i+1); // wait until loaded
    document.body.appendChild(script);
}

loadcss(0);
loadscript(0);
setTimeout("canvasify()", 500);


