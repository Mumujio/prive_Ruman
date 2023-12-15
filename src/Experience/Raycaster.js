import Experience from "./Experience";
import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter";

export default class RayCaster extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.camera = this.experience.camera.instance;
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.sounds = this.experience.sounds;
    this.overlay = document.querySelector(".overlay");
    this.controller = this.experience.controller;
    // 需要检测的物体
    this.raycasters = [];
    // 需要检测的物体名
    this.raycastersNames = ["text_aboutMe", "text_articles", "text_projects"];
    this.resources.on("ready", () => {
      this.setRaycaster();
    });
  }
  setRaycaster() {
    // 筛选需要检测的物体
    this.experience.scene.traverse((object3D) => {
      object3D.name && this.raycastersNames.includes(object3D.name)
        ? this.raycasters.push(object3D)
        : null;
    });
    window.addEventListener("click", this.click.bind(this));
  }
  click(event) {
    // over黑色幕布未消失时点击没效果
    if ([...this.overlay.classList].includes("fade")) {
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.camera);

      this.intersect();
    }
  }
  intersect() {
    const intersects = this.raycaster.intersectObjects(this.raycasters);

    if (intersects.length) {
      const intersectName = intersects[0].object.name;
      console.log(intersectName);
      switch (intersectName) {
        // 点击about me
        case "text_aboutMe":
          this.controller.menuControls.aboutMe(intersects[0].object, "black");
          break;

        default:
          break;
      }
    }
  }
}
