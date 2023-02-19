import * as THREE from 'three';
import "./style.css";
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Scenes
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(5,64,32,6.283185307179586,6.283185307179586,6.283185307179586,6.283185307179586);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 1000);
camera.position.z = 20;
scene.add(camera);

//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0,10,10);
scene.add(light);
const light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(0,10,10);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2); 
renderer.render(scene,camera);


//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


//Resize
window.addEventListener('resize', () => {
  //Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update camera
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene,camera);
})

const loop = () =>{
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
  controls.update();
}
loop();

//Timeline magic
const tl = gsap.timeline({defaults:{duration:1}});
tl.fromTo(sphere.scale,{z:0,x:0,y:0},{z:1,x:1,y:1});
tl.fromTo('nav',{y:"-100%"},{y:"0%"});
tl.fromTo(".title",{opacity:0},{opacity:1});
tl.fromTo(".subtitle",{opacity:0},{opacity:1});
tl.fromTo(".subtitle2",{opacity:0},{opacity:1});

//Mouse Animation Color
let mouseDown = false;
let rgb = [12,35,55];
window.addEventListener('mousedown',()=>mouseDown = true);
window.addEventListener('mouseup',()=>mouseDown = false);
window.addEventListener('mousemove',(e)=>{
  if(mouseDown){
    rgb = [
      Math.round(e.pageX / window.innerWidth * 255),
      Math.round(e.pageY / window.innerHeight * 255),
      150,
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join( ', ')})`);
    gsap.to(sphere.material.color.add,{r:newColor.r,g:newColor.g,b:newColor.b})
  }
});