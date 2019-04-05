const canvas = document.querySelector('#glcanvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
var cubeRotation = 0.0;
var Tracks = [];
var Trains_right = [];
var Trains_center = [];
var Trains_left = [];
var coinss = [];
var gray = 0;
var dead=false;

var score=0;

var walls_left = [];
var walls_right = [];
var s;
var coin_tex;
var obstacle1_tex;
var traffic_tex;
var c;
var play;
var Police;
var p_tex;
var pant_tex;
var cap_tex;
var traffix_tex;
var count = 0;
var playerx = 2;
var playery = 0;
var playerz = -10;
var timer_police = 0;
var timer_boost=0;
var policex = 2;
var policey = 0;
var policez = -6;
var dogx=-0.1;
var dogy=0;
var dogz=-9.75;

var slow_down=false;
var jump = false;
var jumping_boot = false;
var timer = 0;
var timer2 = 0;
var jetpack = false;
var crouch = false;
var timer_crouch = false;
var train_stand = false;
var train_stand1 = false;
var train_stand2 = false;
var train_stand3 = false;
var Player = [];
var Train = [];
var Coins = [];
var Obstacle1=[];
var Obstacle2=[];
var Obstacle3=[];
var obs1_collision=[];
var obs2_collision=[];
var obs3_collision=[];
var powerup1_collision=[];
var powerup3_collision=[];

var powerup2_collision=[];
var timer_slow=0;
var coins_collision=[];
var powerup1=[];
var powerup2=[];
powerup3=[];
var coins_jetpack=[];
var flag=0;
var dog_tex;
var dog_tex2;
var speed_boost=false;

var dog;

var Signal=[];

var flash = 0;

for(var i=0;i<40;i++){
coins_jetpack.push(new coins(gl,[-1,5.5,-50-2*i]))

coins_jetpack.push(new coins(gl,[5,5.5,-50-2*i]))
}
for(var i=0;i<40;i++){
coins_jetpack.push(new coins(gl,[-1,5.5,-500-2*i]))
coins_jetpack.push(new coins(gl,[5,5.5,-500-2*i]))
}
for(var i=0;i<40;i++){
coins_jetpack.push(new coins(gl,[-1,5.5,-1000-2*i]))
coins_jetpack.push(new coins(gl,[5,5.5,-1000-2*i]))
}

document.getElementById('intro').play();

function gameover() {
    dead=true
    $("#canvasDiv").html("<h1>Game Over</h1>");
    document.getElementById('theme').pause();
}

main();

var c;
var c1;
count = count + 1;

function main() {
  document.getElementById('theme').play();

 const texture = loadTexture(gl, 'images/rail2.jpeg');
 const train_texture = loadTexture(gl, 'images/train1.jpg')
 const train_texture2 = loadTexture(gl, 'images/train2.jpg')
 const train_texture3 = loadTexture(gl, 'images/train3.jpg')
 const wall1_texture = loadTexture(gl, 'images/wall1.png')
 const wall2_texture = loadTexture(gl, 'images/wall2.jpg')
 coin_tex = loadTexture(gl, 'images/coin.jpg')
 obstacle1_tex = loadTexture(gl, 'images/obstacle1.jpeg')
 obstacle2_tex = loadTexture(gl, 'images/grass.jpg')
 p_tex = loadTexture(gl, 'images/player.jpg');
 pant_tex = loadTexture(gl, 'images/pant.jpg');
 cap_tex = loadTexture(gl, 'images/cap.jpg');
 traffic_tex = loadTexture(gl, 'images/traffic.jpg');

 police_tex= loadTexture(gl, 'images/police1.png');
 police_tex1= loadTexture(gl, 'images/police2.png');


 powerup1_tex=loadTexture(gl, 'images/powerup1.png');
 powerup3_tex=loadTexture(gl, 'images/powerup3.png');
 powerup2_tex=loadTexture(gl, 'images/powerup2.jpg');
 dog_tex=loadTexture(gl, 'images/dog1.png');

powerup3.push(new powerup(gl,[-1,2,-50]))

powerup1.push(new powerup(gl,[2,2,-50]))
powerup1.push(new powerup(gl,[5,2,-500]))
powerup1.push(new powerup(gl,[-1,2,-1000]))

powerup2.push(new powerup(gl,[-1,2,-60]))
powerup2.push(new powerup(gl,[2,2,-400]))


powerup2.push(new powerup(gl,[5,2,-1200]))




Obstacle1.push(new obstacle(gl, [1.8,2,-100]))
Obstacle3.push(new obstacle2(gl, [-1,3,-20]))
Obstacle2.push(new obstacle(gl, [4.7,2,-100]))



 walls_left[0] = new wall(gl, [-2.5, 2.0, -5])
 walls_left[1] = new wall(gl, [-2.5, 2.0, -26])
 walls_left[2] = new wall(gl, [-2.5, 2.0, -47])
 walls_left[3] = new wall(gl, [-2.5, 2.0, -68])
 walls_left[4] = new wall(gl, [-2.5, 2.0, -89])


 walls_right[0] = new wall(gl, [6.5, 2.0, -5])
 walls_right[1] = new wall(gl, [6.5, 2.0, -26])
 walls_right[2] = new wall(gl, [6.5, 2.0, -47])
 walls_right[3] = new wall(gl, [6.5, 2.0, -68])
 walls_right[4] = new wall(gl, [6.5, 2.0, -89])



 Trains_left[0] = new train(gl, [3.8, 3.0, -70.0]);
 Trains_center[0] = new train(gl, [2, 3.0, -100.0]);
 Trains_right[0] = new train(gl, [0, 3.0, -150.0]);




 Tracks[0] = new track(gl, [0, 0, -10]);
 Tracks[1] = new track(gl, [0, 0, -60])
 Tracks[2] = new track(gl, [0, 0, -110])
 Tracks[3] = new track(gl, [0, 0, -160])
 Tracks[4] = new track(gl, [0, 0, -210])



 Signal.push(new traffic(gl, [4, 0, -100]));
 Signal.push(new traffic(gl, [0, 0, -120]));




 count = count + 1;



 // If we don't have a GL context, give up now

 if (!gl) {
  alert('Unable to initialize WebGL. Your browser or machine may not support it.');
  return;
 }

 // Vertex shader program
 const vsSource = `
   attribute vec4 aVertexPosition;
   attribute vec3 aVertexNormal;
   attribute vec2 aTextureCoord;

   uniform mat4 uNormalMatrix;
   uniform mat4 uModelViewMatrix;
   uniform mat4 uProjectionMatrix;
   uniform highp float uFlash;
   uniform int uLevel;

   varying highp vec2 vTextureCoord;
   varying highp vec3 vLighting;

   void main(void) {
     gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
     vTextureCoord = aTextureCoord;
     // Apply lighting effect
     highp vec3 ambientLight = vec3(0.3 + uFlash, 0.3 + uFlash, 0.3 + uFlash);
     highp vec3 directionalLightColor = vec3(1, 1, 1);
     highp vec3 directionalVector = normalize(vec3(0, -1, 1));

     highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

     highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
     if(uLevel==1 || uLevel==3)
       vLighting = ambientLight + (directionalLightColor * directional);
     else
       vLighting = vec3(1.0 + uFlash, 1.0 + uFlash, 1.0 + uFlash);
   }
   `;
   const fsSource = `
   varying highp vec2 vTextureCoord;
   varying highp vec3 vLighting;

   uniform sampler2D uSampler;
   uniform bool uGray;
   uniform highp float uFlash;

   void main(void) {
     if(uGray)
     {
       highp vec4 texelColor = texture2D(uSampler, vTextureCoord).rgba;
       highp float grayScale = dot(texelColor.rgb, vec3(0.199, 0.587, 0.114));
       highp vec3 grayImage = vec3(grayScale+uFlash, grayScale+uFlash, grayScale+uFlash);
       gl_FragColor = vec4(grayImage * vLighting, texelColor.a);
     }
     else
     {
       highp vec4 texelColor = texture2D(uSampler, vTextureCoord).rgba;
       highp vec3 Image = vec3(texelColor.r + uFlash, texelColor.g + uFlash, texelColor.b + uFlash);
       gl_FragColor = vec4(Image * vLighting, texelColor.a);
     }

   }
   `;

 // Initialize a shader program; this is where all the lighting
 // for the vertices and so forth is established.
 const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

 // Collect all the info needed to use the shader program.
 // Look up which attributes our shader program is using
 // for aVertexPosition, aVevrtexColor and also
 // look up uniform locations.
 const programInfo = {
  program: shaderProgram,
  attribLocations: {
   vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
   textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
  },
  uniformLocations: {
   projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
   modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
   uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
  },
 };

 // Here's where we call the routine that builds all the
 // objects we'll be drawing.
 //const buffers



 var then = 0;

 // Draw the scene repeatedly
 function render(now) {
  now *= 0.001; // convert to seconds
  const deltaTime = now - then;
  then = now;

  if(dead==true)
  return;


   $("#score").text("Score: " + (Math.round(score)));
  count=count+1;
  var a = Math.floor(now * 3)

  if (a % 2 == 0)
   play = new player(gl, [playerx, playery, playerz]);
  else {
   play = new player2(gl, [playerx, playery, playerz]);
  }

  policex=playerx;

  if (a % 2 == 0)
   Police = new player(gl, [policex, policey, policez]);
  else {
   Police = new player2(gl, [policex, policey, policez]);
  }

  if (a % 2 == 0)
   dog = new player(gl, [dogx, dogy, dogz]);
  else {
   dog = new player2(gl, [dogx, dogy, dogz]);
  }


if(a%2==0)
flash=0.1


  //
  if (a % 2 == 0 && jumping_boot == true) {
   timer = timer + 1;
  }
  if (timer == 500) {
   jumping_boot = false;
   timer = 0;
  }

  if (a % 2 == 0 && speed_boost == true) {
   timer_boost = timer_boost + 1;
  }
  if (timer_boost == 100) {
   speed_boost = false;
   timer_boost = 0;
  }

  if (a % 2 == 0 && jetpack == true) {
   timer2 = timer2 + 1;
  }
  if (timer2 == 600) {
   jetpack = false;
   timer2 = 0;
  }
  if (a % 2 == 0 && crouch == true) {
   timer_crouch = timer_crouch + 1;
  }
  if (timer_crouch == 30) {
   crouch = false;
   jump = false
   playery = 1
   timer_crouch = 0;
  }

  if(now-timer_slow>10){
    policez=1;
    flag=0
  }

if(slow_down==true && policez==-6 && flag>2){
document.getElementById('guard2').play();
polizez=playerz
gameover()
console.log("dead")
}
  // policez+=0.05;

  if(slow_down==true){
    timer_slow=now;
    document.getElementById('guard1').play();
    flag+=1
    policez=-6;
    slow_down=false;
  }


  dogx=playerx-1;
  if(dogx<-1)
  dogx=1
  dogy=-0.7;
  dogz=policez-2;




if(gray==0)
gl.clearColor(0.0, 255.0, 255.0, 1.0);

Mousetrap.bind('b',function(){gray=(gray+1)%2;
  gl.clearColor(220/256, 220/256,220/256, 1.0);
});

  Mousetrap.bind('a', function() {
   playerx -= 3;
   if (playerx <= -1)
    playerx = -1
    document.getElementById('move').play();

  });

  Mousetrap.bind('d', function() {
   playerx += 3;
   if (playerx >= 5)
    playerx = 5

  document.getElementById('move').play();

  });
  Mousetrap.bind('space', function() {
   if (playery <= 0.1)
    jump = true;
    document.getElementById('move').play();
  });
  Mousetrap.bind('c', function() {
   crouch = true;
    document.getElementById('move').play();
  });





  if (jump === true && jumping_boot == false) {
   playery += 0.1;
   if (playery > 2.3)
    jump = false
  }


  if (jump === true && jumping_boot == true) {
   playery += 0.1;
   if (playery > 4)
    jump = false
  }

  if (jump === false && playery >= 0.1 && jetpack == false && train_stand == false) {
   playery -= 0.05;
   // console.log(playery)
  }


  if (jetpack == true ) {
   playery = 4
   for (var i = 0; i < 5; i++)
    Tracks[i].pos[2] += 0.09;
  }

  if (crouch == true && train_stand == false && jetpack == false && jumping_boot==false)
   playery = -0.5


  //collisions
  Player.x = play.pos[0];
  Player.y = playery;
  Player.z = play.pos[2];

  Player.x1 = play.pos[0] + 0.4;
  Player.y1 = playery + 0.5;
  Player.z1 = play.pos[2] + 0.1;



  for (var i = 0; i < Trains_center.length; i++) {
   Train.x = 2;
   Train.y = -0.5;
   Train.z = Trains_center[i].pos[2];

   Train.x1 = 3;
   Train.y1 = 3;
   Train.z1 = Trains_center[i].pos[2] - 13;


   if (intersect(Player, Train)) {
    if (playery > 2.4 && jump == false) {
     console.log('bcha ho gya')
     document.getElementById('move').play();

     playery = 2.4
     train_stand1 = true;
    }
   } else {
    train_stand1 = false
   }

   if (intersect(Player, Train) && train_stand1 == false){
    console.log('Dead')
    document.getElementById('crash').play();
    gameover()

  }
  }



  for (var i = 0; i < Trains_right.length; i++) {
   Train.x = -1;
   Train.y = -0.5;
   Train.z = Trains_right[i].pos[2];

   Train.x1 = 1;
   Train.y1 = 3;
   Train.z1 = Trains_right[i].pos[2] - 13;


   if (intersect(Player, Train)) {
    if (playery > 2.4 && jump == false) {
     console.log('bcha ho gya')
     document.getElementById('move').play();

     playery = 2.4
     train_stand2 = true;
    }
   } else {
    train_stand2 = false
   }

   if (intersect(Player, Train) && train_stand2 == false){
     document.getElementById('crash').play();
     gameover()
    console.log('Dead')
    gameover()
  }
  }


  for (var i = 0; i < Trains_left.length; i++) {
   Train.x = 5;
   Train.y = -0.5;
   Train.z = Trains_left[i].pos[2];

   Train.x1 = 6;
   Train.y1 = 3;
   Train.z1 = Trains_left[i].pos[2] - 13;


   if (intersect(Player, Train)) {
    if (playery > 2.4 && jump == false) {
      document.getElementById('move').play();
     console.log('bcha ho gya')
     playery = 2.4
     train_stand3 = true;
    }
   } else {
    train_stand3 = false
   }

   if (intersect(Player, Train) && train_stand3 == false){
    console.log('Dead')
    document.getElementById('crash').play();
    gameover()

  }
  }
  if (train_stand1 == true || train_stand2 == true || train_stand3 == true)
   train_stand = true
  else {
   train_stand = false
  }
  obs1_collision.x=Obstacle1[0].pos[0];
  obs1_collision.y=Obstacle1[0].pos[1];
  obs1_collision.z=Obstacle1[0].pos[2];


if(Math.abs(Player.x-obs1_collision.x)<=0.3 && Math.abs(Player.y<obs1_collision.y) &&Math.abs(Player.z-obs1_collision.z)<0.1){
document.getElementById('crash').play();
gameover()
console.log('Game Over')
}


obs2_collision.x=Obstacle2[0].pos[0];
obs2_collision.y=Obstacle2[0].pos[1];
obs2_collision.z=Obstacle2[0].pos[2];


if(Math.abs(Player.x-obs2_collision.x)<=0.3 && Math.abs(Player.y<obs2_collision.y) &&Math.abs(Player.z-obs2_collision.z)<0.1){
  document.getElementById('stumble_bush').play();
  slow_down=true;
}

obs3_collision.x=Obstacle3[0].pos[0];
obs3_collision.y=Obstacle3[0].pos[1];
obs3_collision.z=Obstacle3[0].pos[2];


if(Math.abs(Player.x-obs3_collision.x)<=0.3 && Math.abs(Player.y<obs3_collision.y) &&Math.abs(Player.z-obs3_collision.z)<0.2 && Player.y!=-0.5){
slow_down=true;
document.getElementById('stumble').play();

}
if(Math.abs(Player.x-obs3_collision.x)<=0.3 && Math.abs(Player.y<obs3_collision.y) && Player.y>1.5 &&Player.y<2.5 && Math.abs(Player.z-obs3_collision.z)<0.2 && Player.y!=-0.5){
console.log('Gameover')
document.getElementById('crash').play();
gameover()

}
if(Math.abs(Player.x-obs3_collision.x)<=0.3 && Player.y<obs3_collision.y &&Math.abs(Player.z-obs3_collision.z)<0.2 && Player.y!=-0.5){
slow_down=true;
document.getElementById('stumble').play();
}




for(var i=0;i<coinss.length;i++){
  coins_collision.x=coinss[i].pos[0];
  coins_collision.y=coinss[i].pos[1];
  coins_collision.z=coinss[i].pos[2];


  if((Math.abs(Player.x-coins_collision.x)<=0.5 && Math.abs(Player.z-coins_collision.z)<0.5) && Math.abs(Player.y+2-coins_collision.y)<0.5){
      document.getElementById('coins').play();
      score+=10
      coinss.splice(i,1)

}}

for(var i=0;i<coins_jetpack.length;i++){
  coins_collision.x=coins_jetpack[i].pos[0];
  coins_collision.y=coins_jetpack[i].pos[1];
  coins_collision.z=coins_jetpack[i].pos[2];


  if((Math.abs(Player.x-coins_collision.x)<0.2 && Math.abs(Player.z-coins_collision.z)<0.5) && Math.abs(Player.y+1.5-coins_collision.y)<0.5){
      coins_jetpack.splice(i,1)
      score+=10;
        document.getElementById('coins').play();
}}


if(powerup1.length>0){
powerup1_collision.x=powerup1[0].pos[0];
powerup1_collision.y=powerup1[0].pos[1];
powerup1_collision.z=powerup1[0].pos[2];

if(Math.abs(Player.x-powerup1_collision.x)==0 && Math.abs(Player.y+2-powerup1_collision.y)<0.5 && Math.abs(Player.z-powerup1_collision.z)<0.5){
jetpack=true;
document.getElementById('powerup').play();
}
}

if(powerup3.length>0){
powerup3_collision.x=powerup3[0].pos[0];
powerup3_collision.y=powerup3[0].pos[1];
powerup3_collision.z=powerup3[0].pos[2];

if(Math.abs(Player.x-powerup3_collision.x)==0 && Math.abs(Player.y+2-powerup3_collision.y)<0.5 && Math.abs(Player.z-powerup3_collision.z)<0.5){
speed_boost=true;
  document.getElementById('powerup').play();
}
}
if(speed_boost==true){
    for(var i=0;i<coinss.length;i++)
      coinss[i].pos[2]+=0.1

      for(var i=0;i<Tracks.length;i++)
        Tracks[i].pos[2]+=0.1

        for(var i=0;i<Obstacle1.length;i++)
          Obstacle1[i].pos[2]+=0.1

          for(var i=0;i<Obstacle2.length;i++)
            Obstacle2[i].pos[2]+=0.1

          for(var i=0;i<Obstacle3.length;i++)
          Obstacle3[i].pos[2]+=0.1

            for(var i=0;i<powerup1.length;i++)
              powerup1[i].pos[2]+=0.1

              for(var i=0;i<Trains_center.length;i++)
                Trains_center[i].pos[2]+=0.1

                for(var i=0;i<Trains_left.length;i++)
                  Trains_left[i].pos[2]+=0.1
                  for(var i=0;i<Trains_right.length;i++)
                    Trains_right[i].pos[2]+=0.1

                    for(var i=0;i<Signal.length;i++)
                      Signal[i].pos[2]+=0.1

                      for(var i=0;i<coins_jetpack.length;i++)
                        coins_jetpack[i].pos[2]+=0.1

                        for(var i=0;i<powerup2.length;i++)
                          powerup2[i].pos[2]+=0.1

                          for(var i=0;i<walls_left.length;i++)
                            walls_left[i].pos[2]+=0.1

                            for(var i=0;i<walls_right.length;i++)
                              walls_right[i].pos[2]+=0.1
}


if(powerup2.length>0){
powerup2_collision.x=powerup2[0].pos[0];
powerup2_collision.y=powerup2[0].pos[1];
powerup2_collision.z=powerup2[0].pos[2];

if(Math.abs(Player.x-powerup2_collision.x)==0 && Math.abs(Player.y+2-powerup2_collision.y)<0.5 && Math.abs(Player.z-powerup2_collision.z)<0.5){
jumping_boot=true;
powerup2[0].pos[2]=1;
  document.getElementById('powerup').play();
}
}












      //   (obs1_collision.y <= Player.y && obs1_collision.y1 >= Player.y1)&&
      //   (obs1_collision.z <= Player.z && obs1_collision.z1 >= Player.z1))
      //   console.log('akhil')

  drawScene(gl, programInfo, deltaTime, texture, train_texture, train_texture2, train_texture3, wall1_texture, wall2_texture);
  var GrayBuffer = gl.getUniformLocation(programInfo.program, "uGray");
      gl.uniform1i(GrayBuffer, gray);
      var FlashBuffer = gl.getUniformLocation(programInfo.program, "uFlash");
      gl.uniform1f(FlashBuffer, flash);
      if(flash>0)
        flash-=0.01;
      else
        flash=0;
  requestAnimationFrame(render);
 }
 requestAnimationFrame(render);
}

//
// Draw the scene.
//
function getrand(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function intersect(b, a) {
 // console.log("Train",a.z,a.z1)
 // console.log("Player",b.z,b.z1)

 return (a.z1 <= b.z1 && a.z >= b.z) &&
  (a.y <= b.y && a.y1 >= b.y1) &&
  (a.x <= b.x && a.x1 >= b.x1);
}

function drawScene(gl, programInfo, deltaTime, texture, train_texture, train_texture2, train_texture3, wall1_texture, wall2_texture) {
  // Clear to black, fully opaque
 gl.clearDepth(1.0); // Clear everything
 gl.enable(gl.DEPTH_TEST); // Enable depth testing
 gl.depthFunc(gl.LEQUAL);


 // Near things obscure far things

 // Clear the canvas before we start drawing on it.

 gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

 // Create a perspective matrix, a special matrix that is
 // used to simulate the distortion of perspective in a camera.
 // Our field of view is 45 degrees, with a width/height
 // ratio that matches the display size of the canvas
 // and we only want to see objects between 0.1 units
 // and 100 units away from the camera.

 const fieldOfView = 45 * Math.PI / 180; // in radians
 const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
 const zNear = 0.1;
 const zFar = 150.0;
 const projectionMatrix = mat4.create();

 // note: glmatrix.js always has the first argument
 // as the destination to receive the result.
 mat4.perspective(projectionMatrix,
  fieldOfView,
  aspect,
  zNear,
  zFar);

 // Set the drawing position to the "identity" point, which is
 // the center of the scene.
 var cameraMatrix = mat4.create();
 mat4.translate(cameraMatrix, cameraMatrix, [-2, -4, 0]);
 var cameraPosition = [
  cameraMatrix[12],
  cameraMatrix[13],
  cameraMatrix[14],
 ];

 //var up = [0, 1, 0];

 //  mat4.lookAt(cameraMatrix, cameraPosition , c.pos, up);

 var viewMatrix = cameraMatrix; //mat4.create();

 //mat4.invert(viewMatrix, cameraMatrix);

 var viewProjectionMatrix = mat4.create();

 mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

 //c.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime,texture);




 Tracks[0].drawtrack(gl, viewProjectionMatrix, programInfo, deltaTime, texture);
 Tracks[1].drawtrack(gl, viewProjectionMatrix, programInfo, deltaTime, texture);
 Tracks[2].drawtrack(gl, viewProjectionMatrix, programInfo, deltaTime, texture);


 if (Trains_left[0].pos[2] > -50)
  Trains_left[0].drawtrain(gl, viewProjectionMatrix, programInfo, deltaTime, train_texture);


 if (Trains_center[0].pos[2] > -50)
  Trains_center[0].drawtrain(gl, viewProjectionMatrix, programInfo, deltaTime, train_texture2);

 if (Trains_right[0].pos[2] > -50)
  Trains_right[0].drawtrain(gl, viewProjectionMatrix, programInfo, deltaTime, train_texture3);

for(var i=0;i<Signal.length;i++)
   Signal[i].drawtraffic(gl, viewProjectionMatrix, programInfo, deltaTime, traffic_tex);

 for (var i = 0; i < Trains_left.length; i++)
  Trains_left[i].pos[2] += 0.15;

 for (var i = 0; i < Trains_right.length; i++)
  Trains_right[i].pos[2] += 0.15;

 for (var i = 0; i < Trains_center.length; i++)
  Trains_center[i].pos[2] += 0.15;

 if (Trains_left[0].pos[2] > 60) {
  var z = getrand(60,100 )
  Trains_left.push(new train(gl, [Trains_left[0].pos[0], 3.0, -z]))
  Trains_left.shift();
 }

 if (Trains_center[0].pos[2] > 60) {
  var z = getrand(150, 200)
  Trains_center.push(new train(gl, [Trains_center[0].pos[0], 3.0, -z]))
  Trains_center.shift();
 }
 if (Trains_right[0].pos[2] > 60) {
  var z = getrand(200, 250)
  Trains_right.push(new train(gl, [Trains_right[0].pos[0], 3.0, -z]))
  Trains_right.shift();
 }

 if(coinss.length<50)
 {
   var i;
   var i=getrand(0,2)
   if(i==0)x=1.7
   if(i==1)x=-0.75
   if(i==2)x=4.75

   var z=getrand(50,100)

   coinss.push(new coins(gl,[x,2,-z-2]))
   coinss.push(new coins(gl,[x,2,-z-4]))
   coinss.push(new coins(gl,[x,2,-z-8]))

 }

 for(var i=0;i<coinss.length;i++)
  coinss[i].drawcoin(gl, viewProjectionMatrix, programInfo, deltaTime,coin_tex);

   for(var i=0;i<coinss.length;i++){
       coinss[i].pos[2]+=0.1
       if(coinss[i].pos[2]>50)
         coinss.shift()
   }

   for(var i=0;i<coins_jetpack.length;i++)
    coins_jetpack[i].drawcoin(gl, viewProjectionMatrix, programInfo, deltaTime,coin_tex);

     for(var i=0;i<coins_jetpack.length;i++){
         coins_jetpack[i].pos[2]+=0.1
         if(coins_jetpack[i].pos[2]>60)
           coins_jetpack.shift()
     }


 Obstacle1[0].drawobstacle1(gl, viewProjectionMatrix, programInfo, deltaTime,obstacle1_tex)
 Obstacle2[0].drawobstacle1(gl, viewProjectionMatrix, programInfo, deltaTime,obstacle2_tex)
 Obstacle3[0].drawobstacle2(gl, viewProjectionMatrix, programInfo, deltaTime,obstacle1_tex)

if(powerup1.length>0)
 powerup1[0].drawpowerup(gl, viewProjectionMatrix, programInfo, deltaTime,powerup1_tex)

 if(powerup3.length>0)
  powerup3[0].drawpowerup(gl, viewProjectionMatrix, programInfo, deltaTime,powerup3_tex)

 if(powerup2.length>0)
  powerup2[0].drawpowerup(gl, viewProjectionMatrix, programInfo, deltaTime,powerup2_tex)


 for(var i=0;i<Obstacle3.length;i++){
   Obstacle3[i].pos[2]+=0.1;
 }
 if(Obstacle3[0].pos[2]>50){
  var z=getrand(80,90)
  var a=getrand(0,2)
  var x=1.8
  if(a==1)x=1.8
  if(a==0)x=-1
  if(a==2)x=4.7

  Obstacle3.push( new obstacle2(gl,[x,3,-z]))
  Obstacle3.shift();
}


 for(var i=0;i<Obstacle1.length;i++){
   Obstacle1[i].pos[2]+=0.1;
 }
 if(Obstacle1[0].pos[2]>20){
  var z=getrand(80,90)
  var a=getrand(0,2)
  var x=1.8
  if(a==1)x=1.8
  if(a==0)x=-1
  if(a==2)x=5.25

  Obstacle1.push( new obstacle(gl,[x,2,-z]))
  Obstacle1.shift();
}

for(var i=0;i<powerup1.length;i++){
  powerup1[i].pos[2]+=0.1;
}
for(var i=0;i<powerup1.length;i++){
  if(powerup1[i].pos[2]>50)
   powerup1.shift()
}

for(var i=0;i<powerup3.length;i++){
  powerup3[0].pos[2]+=0.1;
  if(powerup3[i].pos[2]>50)
   powerup3.shift()
}


for(var i=0;i<powerup2.length;i++){
  powerup2[i].pos[2]+=0.1;
}
for(var i=0;i<powerup2.length;i++){
  if(powerup2[i].pos[2]>50)
   powerup2.shift()
}

for(var i=0;i<Obstacle2.length;i++){
  Obstacle2[i].pos[2]+=0.1;
}
if(Obstacle2[0].pos[2]>20){
 var z=getrand(80,90)
 var a=getrand(0,2)
 var x=1.8
 if(a==1)x=1.8
 if(a==0)x=-1
 if(a==2)x=4.7

 Obstacle2.push( new obstacle(gl,[x,2,-z]))
 Obstacle2.shift();
}

 play.drawplayer(gl, viewProjectionMatrix, programInfo, deltaTime, p_tex, pant_tex, cap_tex);
 Police.drawplayer(gl, viewProjectionMatrix, programInfo, deltaTime, police_tex, police_tex, cap_tex);
 dog.drawplayer(gl, viewProjectionMatrix, programInfo, deltaTime, dog_tex, dog_tex, dog_tex);


 for (var i = 0; i < 5; i++) {
  walls_left[i].drawwall(gl, viewProjectionMatrix, programInfo, deltaTime, wall1_texture);
  walls_right[i].drawwall(gl, viewProjectionMatrix, programInfo, deltaTime, wall2_texture);
 }

 for (var i = 0; i < 5; i++) {
  walls_left[i].pos[2] += 0.09
  walls_right[i].pos[2] += 0.09
 }


 if (walls_right[0].pos[2] > 16) {
  walls_right.push(new wall(gl, [6.5, 2.0, -90]))
  walls_right.shift();
 }
 if (walls_left[0].pos[2] > 16) {
  walls_left.push(new wall(gl, [-2.5, 2.0, -90]))
  walls_left.shift();
 }
 //o.pos[2]+=0.2;

for(var i=0;i<Signal.length;i++)
  Signal[i].pos[2]+=0.13;

for(var i=0;i<Signal.length;i++){
  var z=getrand(0,1)
  if(z==0)z=4;
  if(z==1)z=0;
var p=getrand(100,150)

  if(Signal[0].pos[2]>10){
   Signal.push(new traffic(gl, [z, 0, -p]))
   Signal.shift();
 }
}




 for (var i = 0; i < 5; i++)
  Tracks[i].pos[2] += 0.1;

 if (Tracks[0].pos[2] > 50) {
  Tracks.push(new track(gl, [0, 0, -200]))
  Tracks.shift()
 }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
 const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
 const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

 // Create the shader program

 const shaderProgram = gl.createProgram();
 gl.attachShader(shaderProgram, vertexShader);
 gl.attachShader(shaderProgram, fragmentShader);
 gl.linkProgram(shaderProgram);

 // If creating the shader program failed, alert

 if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
  alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
  return null;
 }

 return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
 const shader = gl.createShader(type);

 // Send the source to the shader object

 gl.shaderSource(shader, source);

 // Compile the shader program

 gl.compileShader(shader);

 // See if it compiled successfully

 if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
  alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
 }

 return shader;
}
