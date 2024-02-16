import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })
const debugObject ={};

debugObject.depthColor = '#186691';
debugObject.surfaceColor = '#9bd8ff';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * mesh
 */
// Geometry
const geometry = new THREE.SphereGeometry(10,10,10)
const attributes = {
    displacement: {
      type: 'f', // a float
      value: [] // an empty array
    }
  };
// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    attributes
    // uniforms: {
    //     uBigWavesElevation: {value: 0.2},
    //     uBigWavesFrequency: {value: new THREE.Vector2(4,1.5)},
    //     uTime: { vlue: 0 },
    //     uBigWavesSpeed: { value: 0.75},
    //     uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
    //     uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
    //     uColorOffset: {value: 0.08},
    //     uColorMultiplier: {value: 5},
    //     uSmallWavesElevation: { value: 0.15 },
    //     uSmallWavesFrequency: { value: 3 },
    //     uSmallWavesSpeed: { value: 0.2 },
    //     uSmallIterations: { value: 4 },

    // }
})

// gui.add(material.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
// gui.add(material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
// gui.add(material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
// gui.add(material.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')
// gui.add(material.uniforms.uColorOffset, 'value').min(0).max(4).step(0.001).name('uDepthColor')
// gui.add(material.uniforms.uColorMultiplier, 'value').min(0).max(4).step(0.001).name('uColorMultiplier')
// gui.addColor(debugObject, 'depthColor').onChange(() => { material.uniforms.uDepthColor.value.set(debugObject.depthColor) })
// gui.addColor(debugObject, 'surfaceColor').onChange(() => { material.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) })
// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = - Math.PI * 0.5
scene.add(mesh)
console.log({mesh});
const verts =
    geometry.vertices;

const values = attributes.displacement.value;

for (var v = 0; v < verts.length; v++) {
  values.push(Math.random() * 30);
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // material.uniforms.uTime.value = elapsedTime;
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()