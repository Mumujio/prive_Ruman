import Experience from "../Experience";
import * as THREE from "three";
export default class Animations {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.shopAndLightModel = this.resources.items.shopAndLightModel;
    this.mixer = null;
    this.clock = new THREE.Clock();
    this.playAnimations();
  }
  playAnimations() {
    const animations = this.shopAndLightModel.animations;
    this.mixer = new THREE.AnimationMixer(this.shopAndLightModel.scene);

    const actions = animations.map((animation) =>
      this.mixer.clipAction(animation)
    );

    // 监听动画播放完成事件
    actions.forEach((action) => {
      action.clampWhenFinished = true; // 确保动画不循环
      // action.loop = THREE.LoopOnce; // 设置动画为单次循环
      action.play();
    });
  }
  update() {
    const elapsed = this.clock.getDelta();
    this.mixer.update(elapsed);
  }
}
