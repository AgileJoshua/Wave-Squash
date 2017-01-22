class RepeatingBackgroundBehavior extends Sup.Behavior {
  
  spriteName = "";
  animationName = "";
  
  awake() {
    let spriteSize=1;
   let width = 35;
   let height = 35;
    
    let tileWidth = 14;
    let tileHeight = 14;
    
    for(let x=-10;x<width;x++){
      for(let y=-10;y<height;y++){
      let water =new Sup.Actor(`water${x}${y}`, this.actor);
      water.setX(x*tileWidth);
      water.setY(y*tileHeight);
      water.setZ(-1);
      let customScale = this.actor.getLocalScale();
      water.setLocalScaleX(1);
      water.setLocalScaleY(1);
      water.setLocalScaleZ(1);
      
      let s = new Sup.SpriteRenderer(water,this.spriteName);
      s.setAnimation(this.animationName);
      
      }
    }
  }

  private added = false;
  update() {
    
  }
}
Sup.registerBehavior(RepeatingBackgroundBehavior);
