(function(){
  var gl, program, canvas = document.getElementById('gl-canvas');

  var  vertexSource = document.getElementById('vertexShader').text,
       fragmentSource = document.getElementById('fragmentShader').text;

  var cube, pyramid, pyrTexture;

  var cameraMatrix = mat4.create(), cubeMatrix = mat4.create();

  var uTransform, uCamera, aPosition, aColor;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gl = initGL(canvas);

  pyramid = getPyramid(gl);

  program = initShaderProgram(gl, vertexSource, fragmentSource);
  gl.useProgram(program);

  pyrTexture = initTexture(gl);

  mat4.perspective(cameraMatrix, 0.785, canvas.width / canvas.height, 0.1, 100);

  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  uTransform = gl.getUniformLocation(program, 'u_transform');
  uCamera = gl.getUniformLocation(program, 'u_camera');
  aPosition = gl.getAttribLocation(program, 'a_position');
  aColor = gl.getAttribLocation(program, 'a_color');

  gl.enableVertexAttribArray(aPosition);
  gl.enableVertexAttribArray(aColor);

  mat4.translate(cubeMatrix, cubeMatrix, [-2, 0, -7]);


  (function render(){
    requestAnimationFrame(render);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(uTransform, false, cubeMatrix);
    gl.uniformMatrix4fv(uCamera, false, cameraMatrix);

    setAttributes3(gl, [aPosition, aColor], [pyramid.vertexBuffer, pyramid.colorBuffer]);

    gl.drawArrays(gl.TRIANGLES, 0, pyramid.numItems);
  })();

})();
