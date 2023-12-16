import Experience from "../Experience.js";
import Galaxy from "./Galaxy.js";

import ShopAndLight from "./ShopAndLight.js";

import * as THREE from "three";
export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.shopAndLight = new ShopAndLight();

      // const axesHelper = new THREE.AxesHelper(5);
      // this.scene.add(axesHelper);
    });
  }

  update() {
    // if (this.hologram) {
    //   this.hologram.update();
    // }
  }
}
