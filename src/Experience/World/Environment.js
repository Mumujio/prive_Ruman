import Experience from "../Experience";
import * as THREE from "three";
export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.light = new THREE.AmbientLight(0x404040, 3);
    this.setEnvironment();
  }
  setEnvironment() {
    this.scene.background = new THREE.Color(0x000000);
    // this.scene.add(this.light);
  }
}
