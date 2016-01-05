function getCube(gl)
{
  var vertices = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
      ],
      textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
      ],
      cubeVertexIndices = [
            0, 1, 2,      0, 2, 3,    // Front face
            4, 5, 6,      4, 6, 7,    // Back face
            8, 9, 10,     8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15, // Bottom face
            16, 17, 18,   16, 18, 19, // Right face
            20, 21, 22,   20, 22, 23  // Left face
      ];


  var cube = {};

  cube.vertexBuffer = initArrayBuffer(gl, vertices);
  cube.textureCoordBuffer = initArrayBuffer(gl, textureCoords);

  cube.vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.vertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);

  cube.numItems = 24;

  return cube;
}

function getPyramid(gl)
{
  var vertices = [
        // Front face
        0,  1,  0,
        -1, -1,  1,
        1, -1,  1,
        // Right face
        0,  1,  0,
        1, -1,  1,
        1, -1, -1,
        // Back face
        0,  1,  0,
        1, -1, -1,
        -1, -1, -1,
        // Left face
        0,  1,  0,
        -1, -1, -1,
        -1, -1,  1
      ],
      textureCoord = [
        // Front face
        0, 0,
        0.5, 1,
        1, 0,
        // Right face
        0, 0,
        0.5, 1,
        1, 0,
        // Back face
        0, 0,
        0.5, 1,
        1, 0,
        // Left face
        0, 0,
        0.5, 1,
        1, 0
      ];

  var pyramid = {};

  pyramid.vertexBuffer = initArrayBuffer(gl, vertices);
  pyramid.textureCoordBuffer = initArrayBuffer(gl, textureCoord);

  pyramid.numItems = 12

  return pyramid;
}
