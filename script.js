var fgImg=null,bgImg=null;
var can1;
var can2;
function loadfgImage(){
  can1=document.getElementById("fgcan");
  var fileinput=document.getElementById("fginput");
  fgImg=new SimpleImage(fileinput);
  fgImg.drawTo(can1);
}
function loadbgImage(){
  can2=document.getElementById("bgcan"); 
  var fileinput=document.getElementById("bginput");
  bgImg=new SimpleImage(fileinput);
  bgImg.drawTo(can2);
}
function clearCanvas() {
  doClear(can1);
  doClear(can2);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}
function createComposite(){
  var output=new SimpleImage(fgImg.getWidth(),fgImg.getHeight());

for(var pixel of fgImg.values())
{
    if(pixel.getGreen()>pixel.getRed()+pixel.getBlue())
    {
        var bgPixel=bgImg.getPixel(pixel.getX(),pixel.getY());
        output.setPixel(pixel.getX(),pixel.getY(),bgPixel);
    }
    else
    {
        output.setPixel(pixel.getX(),pixel.getY(),pixel);
    }
}
  return output;
}
function doGreenScreen(){
  if(fgImg==null || !fgImg.complete())
    {
      alert("Foreground Image Not Loaded!");
    }
  if(bgImg==null || !bgImg.complete())
    {
      alert("Background Image Not Loaded!");
    }
  clearCanvas();
  var final=createComposite();
  final.drawTo(can1);
}