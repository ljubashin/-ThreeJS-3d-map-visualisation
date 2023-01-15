import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BufferGeometry, Vector3 } from 'three';
import { ConvexGeometry } from './node_modules/three/examples/jsm/geometries/ConvexGeometry';
import { bjelovarska } from './borders';
import { posavina } from './borders';
import { neretvanska } from './borders';
import { senjska } from './borders';
import { columbia } from './borders';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio (window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(20);
renderer.render(scene,camera);

const teksturazemlje = new THREE.TextureLoader().load('images/zemlja.png')

const zemlja = new THREE.Mesh (
  new THREE.SphereGeometry(16, 500, 500 ),
  new THREE.MeshStandardMaterial({
    map:teksturazemlje,
  })
);
scene.add(zemlja)

const boja = new THREE.MeshBasicMaterial({
	color: 0xff00cc,        
  side : THREE.DoubleSide,
});
const boja2 = new THREE.MeshBasicMaterial({
	color: 0x2ffe40,        
  side : THREE.DoubleSide,
});
const boja3 = new THREE.MeshBasicMaterial({
	color: 0xfe2f2f,        
  side : THREE.DoubleSide,
});

// Provinces

const posavinageo = new THREE.BufferGeometry().setFromPoints(posavina);
const bjelovarskageo = new BufferGeometry().setFromPoints(bjelovarska);
const neretvanskageo = new BufferGeometry().setFromPoints(neretvanska);
const senjskageo = new BufferGeometry().setFromPoints(senjska)

const posavinalinije = new THREE.Line(posavinageo,boja)
const bjelovarskalinije = new THREE.Line(bjelovarskageo,boja)
const neretvanskalinije = new THREE.Line(neretvanskageo,boja2)
const senjskalinije = new THREE.Line(senjskageo,boja2)

scene.add(posavinalinije,bjelovarskalinije,neretvanskalinije,senjskalinije);

// Full countries

const columbiageo = new BufferGeometry().setFromPoints(columbia)

const columbialinije = new THREE.Line(columbiageo,boja3)

scene.add(columbialinije)

const ambientlight= new THREE.AmbientLight(0xffffff);
scene.add(ambientlight)

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame(animate);
  controls.update();

  renderer.render (scene, camera);
}

controls.enableDamping = true;
controls.dampingFactor = 0.04;
controls.rotateSpeed = 0.07;
controls.maxDistance = 20;
controls.minDistance = 16.5;
controls.enablePan = false;
controls.zoomSpeed = 0.30;

animate()