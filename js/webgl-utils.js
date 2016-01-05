function initGL(canvas)
{
  var gl = canvas.getContext('webgl');
  gl.viewport(0, 0, canvas.width, canvas.height);
  return gl;
}

function initShaderProgram(gl, vertexSource, fragmentSource)
{
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexSource);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
    console.log(gl.getShaderInfoLog(vertexShader));

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentSource);
  gl.compileShader(fragmentShader);

  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    console.log(gl.getShaderInfoLog(fragmentShader));

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if(!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.log('Could not initialize shaders');

  return program;
}

function initArrayBuffer(gl, data)
{
  var glBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data),  gl.STATIC_DRAW);

  return glBuffer;
}

function setAttributes3(gl, attrArray, bufferArray)
{
  attrArray.forEach(function(attr, i){
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferArray[i]);
    gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);
  });
}

function initTexture(gl)
{
  var texture = gl.createTexture();
  texture.image = new Image();
  texture.image.onload = function()
  {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  texture.image.src = './pyramid.gif';
  return texture;
}
