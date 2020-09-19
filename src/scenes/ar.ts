// import { Engine } from "@babylonjs/core/Engines/engine";
// import { Scene } from "@babylonjs/core/scene";
// import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
// import { Vector3 } from "@babylonjs/core/Maths/math.vector";
// import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
// import { SphereBuilder } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
// import { GroundBuilder } from "@babylonjs/core/Meshes/Builders/groundBuilder";
// import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import * as BABYLON from "@babylonjs/core";
// import * as MATERIALS from "babylonjs-materials";
import {CreateSceneClass} from "../createScene";

// If you don't need the standard material you will still need to import it since the scene requires it.
// import "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";

import grassTextureUrl from "../../assets/grass.jpg";

export class DefaultSceneWithTexture implements CreateSceneClass {

    createScene = async (
        engine: BABYLON.Engine,
        canvas: HTMLCanvasElement
    ): Promise<BABYLON.Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(engine);
    
        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera(
            "camera1",
            new BABYLON.Vector3(0, 5, -10),
            scene
          );
    
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
    
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    
        // Our built-in 'sphere' shape.
        const sphere = BABYLON.SphereBuilder.CreateSphere(
            "sphere",
            { diameter: 2, segments: 32 },
            scene
        );
    
        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;
        // scene.createDefaultEnvironment();
        // Our built-in 'ground' shape.
        // const ground = GroundBuilder.CreateGround(
        //     "ground",
        //     { width: 6, height: 6 },
        //     scene
        // );
    
        // Load a texture to be used as the ground material
        // const groundMaterial = new StandardMaterial("ground material", scene);
        // groundMaterial.diffuseTexture = new Texture(grassTextureUrl, scene);
    
        // ground.material = groundMaterial;
          

                const xr = await scene.createDefaultXRExperienceAsync({
                    // ask for an ar-session
                    uiOptions: {
                      sessionMode: "immersive-ar",
                    },
                  });
            // }

        return scene;
    };
}

export default new DefaultSceneWithTexture();