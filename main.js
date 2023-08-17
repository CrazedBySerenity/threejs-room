import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor(0xd7eeff, 1);

const loader = new GLTFLoader();
const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xff5733 } );
const cube = new THREE.Mesh( geometry, material );

const light = new THREE.AmbientLight( 0x404040, 1 ); // soft white light
// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(1, 1, 1);
const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.3 );
directionalLight2.position.set(10, 10, 1);
scene.add( directionalLight );
scene.add( directionalLight2 );
scene.add( light );

let RoomModel;

loader.load(
	"/RoomModel2.glb",
	function(gltf) {
		RoomModel = gltf.scene;
		RoomModel.name = 'Room model';
		scene.add(gltf.scene);
	},
	undefined, function (error){
		console.error(error);
	}
 );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}