function getCube(gl)
{
  var vertices = [
        // Front face
        -1, -1, -1,
        1, -1, -1,
        -1, -1, 1,

        1, -1, 1,
        -1, -1, 1,
        1, -1, -1,
        // Back face
        -1, 1, -1,
        -1, 1, 1,
        1, 1, -1,

        1, 1, 1,
        1, 1, -1,
        -1, 1, 1,
        // Bottom face
        -1, -1, -1,
        -1, 1, -1,
        1, -1, -1,

        1, 1, -1,
        1, -1, -1,
        -1, 1, -1,
        // Top face
        -1, -1, 1,
        1, -1, 1,
        -1, 1, 1,

        1, 1, 1,
        -1, 1, 1,
        1, -1, 1,
        // Left face
        -1, -1, -1,
        -1, -1, 1,
        -1, 1, -1,

        -1, 1, 1,
        -1, 1, -1,
        -1, -1, 1,
        // Right face
        1, -1, -1,
        1, 1, -1,
        1, -1, 1,

        1, 1, 1,
        1, -1, 1,
        1, 1, -1
      ],
      colors = [
        [1, 0.5, 0.5],    // Front face
        [1, 0.5, 0.5],    // Back face
        [0.5, 0.7, 1],    // Bottom face
        [0.5, 0.7, 1],    // Top face
        [0.3, 1, 0.3],    // Left face
        [0.3, 1, 0.3]     // Right face
      ],
      unpackedColors = [];

  var cube = {};

  colors.forEach(function(color){
    for(var i=0;i<6;i++) unpackedColors = unpackedColors.concat(color);
  });

  cube.vertexBuffer = initArrayBuffer(gl, vertices);
  cube.colorBuffer = initArrayBuffer(gl, unpackedColors);
  cube.numItems = 36;

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
        0.5, 0.5,
        1, 0,
        // Right face
        0, 0,
        0.5, 0.5,
        1, 0,
        // Back face
        0, 0,
        0.5, 0.5,
        1, 0,
        // Left face
        0, 0,
        0.5, 0.5,
        1, 0
      ];

  var pyramid = {};

  pyramid.vertexBuffer = initArrayBuffer(gl, vertices);
  pyramid.textureCoordBuffer = initArrayBuffer(gl, textureCoord);

  pyramid.numItems = 12

  return pyramid;
}
