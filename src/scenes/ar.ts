import { WebXRPlaneDetector } from '@babylonjs/core';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { SphereBuilder } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';

import { CreateSceneClass } from '../createScene';

// import { Scene } from "@babylonjs/core/Helpers/sceneHelpers"
// import * as MATERIALS from "babylonjs-materials";
// If you don't need the standard material you will still need to import it since the scene requires it.
// import "@babylonjs/core/Materials/standardMaterial";
import { WebXRExperienceHelper } from '@babylonjs/core/XR/webXRExperienceHelper';
export class DefaultSceneWithTexture implements CreateSceneClass {

    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        console.log("AR scene starting");

        // This creates and positions a free camera (non-mesh) at the center
        const camera = new ArcRotateCamera(
            "my first camera",
            0,
            Math.PI / 3,
            10,
            Vector3.Zero(),
            scene
        );

        // This targets the camera to the sphere.
        camera.setTarget(new Vector3(0, 2, 5));

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape.
        const sphere = SphereBuilder.CreateSphere(
            "sphere",
            { diameter: 2, segments: 32 },
            scene
        );

        // Move the sphere upward 1/2 its height
        sphere.position.y = 2;
        sphere.position.z = 5;

        const xr = await scene.createDefaultXRExperienceAsync({
            //     // ask for an ar-session
            uiOptions: {
                sessionMode: "immersive-ar",
                referenceSpaceType: "local-floor"
            },
            optionalFeatures: true
        });

        const fm = xr.baseExperience.featuresManager;
        const xrPlanes = fm.enableFeature(WebXRPlaneDetector.Name, "latest");
        const planes = [];
        xr.baseExperience.sessionManager.onXRSessionInit.add((experienceHelper) => {
            console.log("XR Session init eH", experienceHelper);
        })
        return scene;
    };
}

export default new DefaultSceneWithTexture();