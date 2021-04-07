import { Engine } from "@babylonjs/core/Engines/engine";
import { getSceneModuleWithName } from "./createScene";
import { StandardMaterial } from '@babylonjs/core';

const getModuleToLoad = (): string | undefined => {
    // ATM using location.search
    if(!location.search) {
        return;
    } else {
        return location.search.substr(location.search.indexOf('scene=') + 6);
    }
}

// const xrPolyfillPromise = new Promise((resolve) => {
//     if (navigator.xr) {
//         return resolve();
//     }
//     define('polyfill', ['https://cdn.jsdelivr.net/npm/webxr-polyfill@latest/build/webxr-polyfill.js'], (polyfill) => { new polyfill(); resolve(); });
// });

export const babylonInit = async (): Promise<void>  => {
    // get the module to load
    const moduleName = getModuleToLoad();
    const createSceneModule = await getSceneModuleWithName(moduleName);

    // Execute the pretasks, if defined
    await Promise.all(createSceneModule.preTasks || []);
    // Get the canvas element
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; 
    // Generate the BABYLON 3D engine
    const engine = new Engine(canvas, true); 

    // Create the scene
    const scene = await createSceneModule.createScene(engine, canvas);

    // Register a render loop to repeatedly render the scene
    // scene.then(()=>{
        engine.runRenderLoop(function () {
            if (scene) {
                scene.render();
            }
        });
    // })

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

babylonInit().then(() => {
    // scene started rendering, everything is initialized
});