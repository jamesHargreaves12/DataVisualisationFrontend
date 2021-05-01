import { ImageBitmapLoader } from "three";
import * as THREE from "three";
import { TopicSubscriptionManager } from "../../../OffscreenCanvasMiddleware/TopicSubscriptionManager";

// Improve scoping of this
const materialCache: Record<string, ImageBitmap> = {};
const loadingMaterials: string[] = [];
const loadingMaterialManager: TopicSubscriptionManager<any> = new TopicSubscriptionManager<any>();
const cachedGetMaterial = (materialLocation: string) => {
  // Material is Loaded?
  if (materialCache[materialLocation])
    return Promise.resolve(materialCache[materialLocation]);
  // Material is Loading?
  if (loadingMaterials.includes(materialLocation)) {
    const subscriptionId = Math.random().toString(36).substring(10);
    return new Promise((res, rej) => {
      loadingMaterialManager.subscribe(
        materialLocation,
        subscriptionId,
        (ibm: ImageBitmap) => {
          loadingMaterialManager.unsubscribe(materialLocation, subscriptionId);
          res(ibm);
        }
      );
    });
  }
  // Material Needs to be loaded
  const imageBitmapLoader = new ImageBitmapLoader();
  return new Promise((res, rej) => {
    loadingMaterials.push(materialLocation);
    imageBitmapLoader.load(materialLocation, (ibm) => {
      materialCache[materialLocation] = ibm;
      loadingMaterialManager.pushMessage(materialLocation, ibm);
      res(ibm);
    });
  });
};

export const getMaterialCreator = async (imageLocation: string) => {
  const imageBitMap = await cachedGetMaterial(imageLocation);
  const texture = new THREE.CanvasTexture(imageBitMap as any);
  const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(3, 3, 3),
    name: "viridis",
    side: THREE.DoubleSide,
    specular: new THREE.Color(1, 1, 1),
    map: texture,
  });
  return {
    create: () => material,
  };
};
