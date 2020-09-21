type Engine = import("@babylonjs/core/Engines/engine").Engine;
type Scene = import("@babylonjs/core/scene").Scene;

const defaultSceneName = 'ar';

export interface CreateSceneClass {
    createScene: (engine: Engine, canvas: HTMLCanvasElement) => Promise<Scene>;
    preTasks?: Promise<unknown>[];
}

export interface CreateSceneModule {
    default: CreateSceneClass;
}

export const getSceneModuleWithName = (
    name = defaultSceneName
): Promise<CreateSceneClass> => {
    return import('./scenes/' + name).then((module: CreateSceneModule) => {
        return module.default;
    });

    // To build quicker, replace the above return statement with:
    // return import(`./scenes/${defaultSceneName}`).then((module: CreateSceneModule) => {
    //     return module.default;
    // });
};

