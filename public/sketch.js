//P5

let capture;

function setup() {
  var c = createCanvas(windowWidth, windowHeight);
  c.parent('p5Div');
  // fill('red');
  // ellipse(width / 2, height / 2, 180, 80);
  capture = createCapture(VIDEO);
  capture.hide();
  // console.log(capture);
}

function draw(){
  image(capture, 0, 0, windowWidth, windowHeight);
}


//THREE

// import {GLTFLoader} from 'three';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

// import * as THREE from 'three';
// const THREE = require('three');
// const loader = new THREE.GLTFLoader();


//finally got it to work from https://stackoverflow.com/questions/64409605/how-do-i-load-gltfloader-from-a-cdn-three-js
// const loader = new THREE.GLTFLoader();
const loader = new THREE.GLTFLoader().setPath('glb/');



var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
document.body.appendChild(renderer.domElement);

// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00
// });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

cam.position.z = 3;


//models
// loader.load('../glb/august.glb', function(gltf) {
// loader.load('august.glb', function(gltf) {

//     scene.add(gltf.scene);
// }, undefined, function(error) { //idk what the undefined is for
//     console.log(error);
// });

//thanks to this tutorial! https://discoverthreejs.com/book/first-steps/load-models/
function setupModel(data){
    const model = data.scene.children[0];
    const clip = data.animations[0];

    // const mixer = new AnimationMixer(model);
    // const action = mixer.clipAction(clip);
    // action.play();

    // model.tick = (delta) => mixer.update(delta);

    return model;
}

async function initFam(){
    const {panzer, barry, michelle, sam, august} = await loadFam();

    loop
    scene.add(panzer, barry, michelle, sam, august);

    // const august = await loadAugust();
    // scene.add(august);
};

async function loadFam(){
    const [panzerData, barryData, michelleData, samData, augustData] = await Promise.all([
        loader.loadAsync('panzer.glb'),
        loader.loadAsync('barry.glb'),
        loader.loadAsync('michelle.glb'),
        loader.loadAsync('sam.glb'),
        loader.loadAsync('august.glb')
    ]);

    console.log('me data: ', augustData);

    const panzer = setupModel(panzerData);
    panzer.position.set(-1, -.5, 0);

    const barry = setupModel(barryData);
    barry.position.set(-.5, -1, 0);

    const michelle = setupModel(michelleData);
    michelle.position.set(0, -1, 0);

    const sam = setupModel(samData);
    sam.position.set(.5, -1, 0);

    const august = setupModel(augustData);
    august.position.set(1, -1, 0);

    return {
        panzer,
        barry,
        michelle,
        sam,
        august
    };
}

// async function loadAugust(){
//     const augData = await loader.loadAsync('august.glb');
//     console.log("august: ", augData);
//     const august = setupModel(augData);
//     return august;
// }

var render = function() {
  requestAnimationFrame(render);

//   cube.rotation.x += 0.1;
//   cube.rotation.y += 0.1;

  renderer.render(scene, cam);
};

render();
initFam();