(function(){
  var gl, program, canvas = document.getElementById('gl-canvas');

  var  vertexSource = document.getElementById('vertexShader').text,
       fragmentSource = document.getElementById('fragmentShader').text;

  var cube, pyramid, pyrTexture;

  var cameraMatrix = mat4.create(), transformMatrix = mat4.create();

  var uTransform, uCamera, uSampler, aPosition, aTextureCoord;

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
  uSampler = gl.getUniformLocation(program, 'u_sampler');
  aPosition = gl.getAttribLocation(program, 'a_position');
  aTextureCoord = gl.getAttribLocation(program, 'a_texture_coord');

  gl.enableVertexAttribArray(aPosition);
  gl.enableVertexAttribArray(aTextureCoord);

  mat4.translate(transformMatrix, transformMatrix, [-2, 0, -7]);


  (function render(){
    requestAnimationFrame(render);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(uTransform, false, transformMatrix);
    gl.uniformMatrix4fv(uCamera, false, cameraMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, pyramid.vertexBuffer);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramid.textureCoordBuffer);
    gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, pyrTexture);
    gl.uniform1i(uSampler, 0);

    gl.drawArrays(gl.TRIANGLES, 0, pyramid.numItems);
  })();

})();
