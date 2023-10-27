// 引入threejs
import * as THREE from 'three'

// 导入模型加载器方法
import { loadManager } from '../model/loadManager'

// 导入汽车类方法
import { Car } from "../model/car"

// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 创建场景、摄像机、渲染器、轨道控制器的全局变量
let scene, camera, renderer, controls

//获取渲染的dom节点
const app = document.querySelector('.app')

// 初始化场景与摄像机
function init() {
    // 创建场景
    scene = new THREE.Scene()

    // 创建摄像机
    camera = new THREE.PerspectiveCamera(75, app.clientWidth / app.clientHeight, 0.1, 1000)

    // 设置相机的位置
    camera.position.z = 5

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
        // 开启抗锯齿
        antialias: true
    })

    // 开启阴影效果
    renderer.shadowMap.enabled = true

    // 设置渲染器画布
    renderer.setSize(app.clientWidth, app.clientHeight)

    // 添加到dom节点中
    app.appendChild(renderer.domElement)

    // 加载模型
    loadManager('glb/Lamborghini.glb', (gltf) => {
        //    获取到模型对象
        const model = gltf.scene

        // 将模型加载到场景中
        const car = new Car(model, scene)
        car.init()
    })
}

// 创建轨道控制器
function createControls() {
    controls = new OrbitControls(camera, renderer.domElement)

}

// 创建坐标轴
function createHelper() {
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)
}

// 场景适配
function resizeRender() {
    window.addEventListener('resize', () => {
        renderer.setSize(app.clientWidth, app.clientHeight)
        camera.aspect = app.clientWidth / app.clientHeight
        camera.updateProjectionMatrix()
    })
}

// 循环渲染
function renderLoop() {
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(renderLoop)
}

// 启动方法
function start() {
    init()
    createControls()
    createHelper()
    resizeRender()
    renderLoop()
}
// 调用启动方法
start()