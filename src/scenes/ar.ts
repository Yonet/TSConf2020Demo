/* eslint-disable no-fallthrough */
import { SceneLoader, WebXRAnchorSystem, WebXRFeaturesManager, WebXRPlaneDetector } from '@babylonjs/core';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { SphereBuilder } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';


import { CreateSceneClass } from '../createScene';
import controllerModel from "../../assets/glb/samsung-controller.glb";
// import dino from '../../assets/dino/Mesh_Diplodocus.gltf';
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
        const scene = new Scene( engine );
        console.log( "AR scene starting" );

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
        camera.setTarget( new Vector3( 0, 2, 5 ) );

        // This attaches the camera to the canvas
        camera.attachControl( canvas, true );

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight( "light", new Vector3( 0, 1, 0 ), scene );

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

        // const xr = await scene.createDefaultXRExperienceAsync( {
        //     // ask for an ar-session
        //     uiOptions: {
        //         sessionMode: "immersive-ar",
        //         referenceSpaceType: "local-floor"
        //     },
        //     optionalFeatures: true
        // } );

        // // Basic WebXR Experience. Read more here: https://doc.babylonjs.com/how_to/webxr_experience_helpers#the-basic-experience-helper​
        // // const xr = await WebXRExperienceHelper.CreateAsync(scene);
        // // const sessionManager = await xr.enterXRAsync("immersive-ar", "local-floor" /*, optionalRenderTarget */ );

        // // xr.onStateChangedObservable.add((state) => {
        // //     switch (state) {
        // //         case WebXRState.IN_XR:
        // //             // XR is initialized and already submitted one frame
        // //         case WebXRState.ENTERING_XR:
        // //             // xr is being initialized, enter XR request was made
        // //         case WebXRState.EXITING_XR:
        // //             // xr exit request was made. not yet done.
        // //         case WebXRState.NOT_IN_XR:
        // //             // self explanatory - either our or not yet in XR
        // //     }
        // // })

        // const features = [ "xr-physics-controller", "xr-plane-detection", "xr-hit-test", "xr-anchor-system" ];

        // // const fm: WebXRFeaturesManager = xr.baseExperience.featuresManager;
        // // // features.forEach((val, i) => {fm.enableFeature(val)});
        // // const xrPlanes = fm.enableFeature(WebXRPlaneDetector.Name, "latest");
        // // const xrAnchors = fm.enableFeature(WebXRAnchorSystem.Name, "latest");
        // // console.log("fm ", fm)
        // // const availableFeatures: string[] = fm.getEnabledFeatures();
        // // console.log("available features", availableFeatures);
        // // const planes = [];
        // xr.baseExperience.sessionManager.onXRSessionInit.add( ( experienceHelper ) => {
        //     console.log( "XR Session init event Experience helper", experienceHelper );
        //     experienceHelper.addEventListener( "onselect", ( e: any ) => { console.log( "event is", e ); } );
        //     console.log( "fm ", fm );
        // } );
        return scene;
    };
}

export default new DefaultSceneWithTexture();