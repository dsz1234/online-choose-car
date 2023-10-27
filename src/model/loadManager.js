// 专门加载模型文件
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadManager(path, successFn) {
    // 实例化模型加载器
    const gltLoader = new GLTFLoader()
    // 加载模型资源
    gltLoader.load(path, gltf => successFn(gltf),process => {
        // console.log(process);
     }, error => {
        throw new Error(error)
    })
}
