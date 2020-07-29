

var futuredata;
var imageObj = new Image();
imageObj.onload = function() {
  drawImage(this);
};
imageObj.src = 'Omkar.jpg';

function drawImage(){

var canvas3 = document.getElementById('canvas3');
       
//console.log(imageObj.data);

var context1 = canvas3.getContext('2d');
var imageX = 0;
var imageY = 0;
var imageWidth = imageObj.width;
var imageHeight = imageObj.height;
canvas3.width = imageWidth;
canvas3.height = imageHeight;
console.log(imageWidth);
console.log(imageHeight);


context1.drawImage(imageObj, imageX, imageY);

var imageData = context1.getImageData(imageX, imageY, imageWidth, imageHeight);
var futuredata = imageData.data;
console.log("hello");
console.log(futuredata[0]);
console.log(futuredata[1]);
console.log(futuredata[2]);
console.log(futuredata[3]);

}




var Swidth = 6;

function incrementSwidth()
{
    Swidth<5?Swidth++:Swidth;
    console.log(Swidth);
}

function decrementSwidth()
{
    Swidth>2?Swidth--:Swidth;
    console.log(Swidth);
}

var width = 300;
    var height = 376;
    console.log("size is " + width*height);
    var pixels = new Float32Array(width * height);

 function calculateInitial(){   
    for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
            var offset = (y * width + x);
            
            //pixels[offset] = ((x * y) / (width * height)) * 256000;
            pixels[offset] = 200000;
        }
    }
    
  
    main();
 }

calculateInitial();
console.log(pixels);    

var toggle = false;

function toggleDown()
{
    toggle = true;

}

function toggleUp()
{
    toggle = false;
}






function showCoords(event)
{

    var x = event.clientX;
    var y =376- event.clientY +21;

    if(toggle){
        pointSample(x, y);

        //points.push(x);
        //points.push(y);
        var coords = "X coords: " + x + ", Y coords: " + y;
        //console.log(coords);
        //console.log(event);
        
        main();
    }
}












var pointSample = function sample(x, y)
{
    //console.log("x is "+ x + " y is " + y);
    for (i = -Swidth; i <= Swidth; i++)
    {
        for (j = -Swidth; j <= Swidth; j++)
        {
            var p = x+i;
            var q = y + j;
            //console.log("x + i is "+ p + " y+j is " + q);
            var val = (Swidth * Swidth - Math.max(Math.abs(i), Math.abs(j)) * Math.max(Math.abs(i), Math.abs(j))) / (Swidth * Swidth);
            pixels[(y+j)*width + (x+1)] = 256000//Math.round((1-val)*256*0); 
          
            



            //console.log((y+j)*width + (x+1) + " " +  pixels[(y+j)*width + (x+1)]);
          

            
        }
    }
 //console.log("Over");
};

main();


function main() {
  //console.log("main");
 //var pint = [1,2,3,4,5]
 // console.log(pixels.filter(word => word > 0));
    var canvas = document.getElementById("canvas1");
    var gl = getWebGLContext(canvas);
    if (!gl) {
        alert("no WebGL");
        return;
    }
    var f = gl.getExtension("OES_texture_float");
    if (!f) {
        alert("no OES_texture_float");
        return;
    }
    
    vertexShader = createShaderFromScriptElement(
        gl, "2d-vertex-shader");
    fragmentShader = createShaderFromScriptElement(
        gl, "2d-fragment-shader");
    program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);
    
    var positionLocation = gl.getAttribLocation(
        program, "a_position");
    var resolutionLocation = gl.getUniformLocation(
        program, "u_resolution");
    gl.uniform2f(
        resolutionLocation, canvas.width, canvas.height);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
         -1, -1, 1, -1, -1, 1,
         -1,  1, 1, -1,  1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(
        positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    
    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.LUMINANCE, 
        width, height, 0, gl.LUMINANCE, gl.FLOAT, 
        pixels);
    gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                    
    gl.drawArrays(gl.TRIANGLES, 0, 6);


    
    //console.log(gl.getError());
}



    



function saveReference()
{


    //const vctx = videocanvas.getContext('2d');
    //vctx.drawImage(webGLTestCanvas, 0, 0); 
    //const capturedImage = videocanvas.toDataURL();

    var link = document.getElementById("link");
   
    var canva = document.getElementById('canvas1');
    canva.getContext('2d').drawImage(canva, 0, 0); 
    link.href = link.toDataURL();
    link.download = "varma.jpg";
    //console.log(dataURL);


}




"use strict";

function loadImage(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}

function loadImages(urls, callback) {
  var images = [];
  var imagesToLoad = urls.length;

  // Called each time an image finished
  // loading.
  var onImageLoad = function() {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad === 0) {
      callback(images);
    }
  };

  for (var ii = 0; ii < imagesToLoad; ++ii) {
    var image = loadImage(urls[ii], onImageLoad);
    images.push(image);
  }
}


function main2() {

    var ref = document.getElementById('canvas1');
    var dataURL = ref.toDataURL('image/png');



  loadImages([
    "Omkar.jpg",
    "download.png",
  ], render);
}

function render(images) {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("canvas2");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // setup GLSL program
  var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);
  gl.useProgram(program);

  // look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var texcoordLocation = gl.getAttribLocation(program, "a_texCoord");

  // Create a buffer to put three 2d clip space points in
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Set a rectangle the same size as the image.
  setRectangle(gl, 0, 0, images[0].width, images[0].height);

  // provide texture coordinates for the rectangle.
  var texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0,
  ]), gl.STATIC_DRAW);

  // create 2 textures
  var textures = [];
  for (var ii = 0; ii < 2; ++ii) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[ii]);

    // add the texture to the array of textures.
    textures.push(texture);
  }

  // lookup uniforms
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  var textureSizeLocation = gl.getUniformLocation(program, "u_textureSize");

  // lookup the sampler locations.
  var u_image0Location = gl.getUniformLocation(program, "u_image0");
  var u_image1Location = gl.getUniformLocation(program, "u_image1");

  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the position attribute
  gl.enableVertexAttribArray(positionLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

  // Turn on the teccord attribute
  gl.enableVertexAttribArray(texcoordLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset);

  // set the resolution
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform2f(textureSizeLocation, gl.canvas.width, gl.canvas.height);

  // set which texture units to render with.
  gl.uniform1i(u_image0Location, 0);  // texture unit 0
  gl.uniform1i(u_image1Location, 1);  // texture unit 1

  // Set each texture unit to use a particular texture.
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textures[0]);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, textures[1]);

  // Draw the rectangle.
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function randomInt(range) {
  return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}

