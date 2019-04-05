/// <reference path="webgl.d.ts" />
var c;
var x=0;
var y=0;
var z=0;
let coins = class {
    constructor(gl, pos) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        var positions=[];

        var angle = 0;
        var rang;
        var i;
        rang = (2*Math.PI)/100;

          while(x<100){
              positions.push(0.2*Math.cos(angle),0.2*Math.sin(angle),0);
              positions.push(0,0,0);
              positions.push(0,0,0);
              positions.push(0.2*Math.cos(angle+rang),0.2*Math.sin(angle+rang),0);
              angle+=rang;
              x=x+1
          }
          angle=0;
          x=0;

        while(x<100){
              positions.push(0.2*Math.cos(angle),0.2*Math.sin(angle),0.01);
              positions.push(0,0,0.01);
              positions.push(0,0,0.01);
              positions.push(0.2*Math.cos(angle+rang),0.2*Math.sin(angle+rang),0.01);
              angle+=rang;
              x=x+1
          }
          angle=0;
          x=0;

          while(x<100){
              positions.push(0.2*Math.cos(angle),0.2*Math.sin(angle),0);
              positions.push(0.2*Math.cos(angle+rang),0.2*Math.sin(angle+rang),0);
              positions.push(0.2*Math.cos(angle),0.2*Math.sin(angle),0.01);
              positions.push(0.2*Math.cos(angle+rang),0.2*Math.sin(angle+rang),0.01);
              angle+=rang;
              x=x+1
          }


        c = positions.length/3;

        this.rotation = 0;

        this.pos = pos;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  this.textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);

  var textureCoordinates = [];

  for(i=0;i<c/4;++i){
      textureCoordinates.push(0.0,  0.0);
      textureCoordinates.push(1.0,  0.0);
      textureCoordinates.push(1.0,  1.0);
      textureCoordinates.push(0.0,  1.0);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                gl.STATIC_DRAW);




        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.


        var indices = [];
        for(i=0;i<c/4;i++){
          indices.push(4*i+0);
          indices.push(4*i+1);
          indices.push(4*i+2);

          indices.push(4*i+0);
          indices.push(4*i+2);
          indices.push(4*i+3);
        }



        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            textureCoord: this.textureCoordBuffer,
            indices: indexBuffer,
        }

    }

    drawcoin(gl, projectionMatrix, programInfo, deltaTime,texture) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );

        this.rotation += 0.05

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [0, 1,0]);

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

            gl.drawElements(gl.TRIANGLES, c*6/4, gl.UNSIGNED_SHORT, 0);


    }
};
