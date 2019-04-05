/// <reference path="webgl.d.ts" />

let train = class {
    constructor(gl, pos) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);



        this.positions = [
             // Front face
             -0.5, -0.5, 0.5,
             0.5, -0.5, 0.5,
             0.5, 0.5, 0.5,
             -0.5, 0.5, 0.5,
             //Back Face
             -0.5, -0.5, -0.5,
             0.5, -0.5, -0.5,
             0.5, 0.5, -0.5,
             -0.5, 0.5, -0.5,
             //Top Face
             -0.5, 0.5, -13,
             0.5, 0.5, -13,
             0.5, 0.5, 0.5,
             -0.5, 0.5, 0.5,
             //Bottom Face
             -0.5, -0.5, -13,
             0.5, -0.5, -13,
             0.5, -0.5, 0.5,
             -0.5, -0.5, 0.5,
             //Left Face
             -0.5, -0.5, -13,
             -0.5, 0.5, -13,
             -0.5, 0.5, 0.5,
             -0.5, -0.5, 0.5,
             //Right Face
             0.5, -0.5, -13,
             0.5, 0.5, -13,
             0.5, 0.5, 0.5,
             0.5, -0.5, 0.5,

        ];

        this.rotation = 0;

        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

  this.textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);

  this.textureCoordinates = [
    // Front
    0.0,  0.0,
    1  ,  0.0,
    1,  1,
    0.0, 1,
    // Back
    0.0,  0.0,
    0.5,  0.0,
    0.5,  0.5,
    0.0,  0.5,
    // Top
    0.0,  0.0,
    0.5,  0.0,
    0.5,  0.5,
    0.0,  0.5,
    // Bottom
    0.0,  0.0,
    0.5,  0.0,
    0.5,  0.5,
    0.0,  0.5,
    // Right
    0.0,  0.0,
    0.5,  0.0,
    0.5,  0.5,
    0.0,  0.5,
    // Left
    0.0,  0.0,
    0.5,  0.0,
    0.5,  0.5,
    0.0,  0.5,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates),
                gl.STATIC_DRAW);




        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        const indices = [
            0, 1, 2,    0, 2, 3, // front
            4, 5, 6,    4, 6, 7,
            8, 9, 10,   8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23,

        ];



        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            textureCoord: this.textureCoordBuffer,
            indices: indexBuffer,
        }

    }

    drawtrain(gl, projectionMatrix, programInfo, deltaTime,texture) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );

      //  this.rotation += 0.007

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [1, 1, 1]);

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
   const numComponents = 2;
   const type = gl.FLOAT;
   const normalize = false;
   const stride = 0;
   const offset = 0;
   gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer.textureCoord);
   gl.vertexAttribPointer(
       programInfo.attribLocations.textureCoord,
       numComponents,
       type,
       normalize,
       stride,
       offset);
   gl.enableVertexAttribArray(
       programInfo.attribLocations.textureCoord);
}

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

            gl.activeTexture(gl.TEXTURE0);

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(programInfo.uniformLocations.uSampler, 0);


        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
};
