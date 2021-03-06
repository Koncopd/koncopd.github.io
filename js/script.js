(function(){
  var gl, program, canvas = document.getElementById('gl-canvas');

  var  vertexSource = document.getElementById('vertexShader').text,
       fragmentSource = document.getElementById('fragmentShader').text;

  var cube, pyramid, pyrTexture, cubeTexture;

  var cameraMatrix = mat4.create(), transformMatrix = mat4.create(), matrixStack = [];

  var rotPyramid = 0, rotCube = 0, lastTime = 0, timeNow = 0;

  var uTransform, uNormalTransform, uCamera, uAmbientColor, uLightingDir, uDirColor, uUseLighting, uSampler;
  var aPosition, aTextureCoord, aNormalPosition;
  var adjustedLD = vec3.create();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gl = initGL(canvas);

  pyramid = getPyramid(gl);
  cube = getCube(gl);

  program = initShaderProgram(gl, vertexSource, fragmentSource);
  gl.useProgram(program);

  pyrTexture = initTexture(gl, './pyrTexture.jpg');
  cubeTexture = initTexture(gl, './cubeTexture.gif');

  mat4.perspective(cameraMatrix, 0.785, canvas.width / canvas.height, 0.1, 100);

  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  uTransform = gl.getUniformLocation(program, 'u_transform');
  uCamera = gl.getUniformLocation(program, 'u_camera');
  uSampler = gl.getUniformLocation(program, 'u_sampler');
  uNormalTransform = gl.getUniformLocation(program, 'u_normal_transform');
  uAmbientColor = gl.getUniformLocation(program, 'u_ambient_color');
  uLightingDir = gl.getUniformLocation(program, 'u_lighting_dir');
  uDirColor = gl.getUniformLocation(program, 'u_dir_color');
  uUseLighting = gl.getUniformLocation(program, 'u_use_lighting');

  aPosition = gl.getAttribLocation(program, 'a_position');
  aTextureCoord = gl.getAttribLocation(program, 'a_texture_coord');
  aNormalPosition = gl.getAttribLocation(program, 'a_normal_position');

  gl.enableVertexAttribArray(aPosition);
  gl.enableVertexAttribArray(aTextureCoord);

  gl.uniform3f(uAmbientColor, 0.2, 0.2, 0.2);

  vec3.normalize(adjustedLD, [-0.25, -0.25, -1]);
  vec3.scale(adjustedLD, adjustedLD, -1);
  gl.uniform3fv(uLightingDir, adjustedLD);

   gl.uniform3f(uDirColor, 0.8, 0.8, 0.8);

  (function render(){

    requestAnimationFrame(render);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.disableVertexAttribArray(aNormalPosition);
    gl.uniform1i(uUseLighting, false);

    mat4.identity(transformMatrix);
    mat4.translate(transformMatrix, transformMatrix, [-2, 0, -7]);

    matrixStack.push(mat4.clone(transformMatrix));

    mat4.rotate(transformMatrix, transformMatrix, rotPyramid * Math.PI / 180, [0, 1, 0]);

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

    transformMatrix = matrixStack.pop();

    gl.enableVertexAttribArray(aNormalPosition);
    gl.uniform1i(uUseLighting, true);

    mat4.translate(transformMatrix, transformMatrix, [4, 0, -1]);

    mat4.rotate(transformMatrix, transformMatrix, rotCube * Math.PI / 180, [1, 1, 1]);

    gl.uniformMatrix4fv(uTransform, false, transformMatrix);
    gl.uniformMatrix4fv(uCamera, false, cameraMatrix);

    var normalMatrix = mat3.create();
    mat3.fromMat4(normalMatrix, transformMatrix);
    mat3.invert(normalMatrix, normalMatrix);
    mat3.transpose(normalMatrix, normalMatrix);

    gl.uniformMatrix3fv(uNormalTransform, false, normalMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexBuffer);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexNormalBuffer);
    gl.vertexAttribPointer(aNormalPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordBuffer);
    gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0)

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
    gl.uniform1i(uSampler, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.vertexIndexBuffer);

    gl.drawElements(gl.TRIANGLES, cube.numItems, gl.UNSIGNED_SHORT, 0);

    timeNow = new Date().getTime();
    if(lastTime !== 0)
    {
      rotPyramid += (90 * (timeNow - lastTime)) / 1000;
      rotCube -= (75 * (timeNow - lastTime)) / 1000;
    }
    lastTime = timeNow;
  })();

})();
