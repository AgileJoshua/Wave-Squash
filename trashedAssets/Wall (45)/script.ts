class Wall extends Sup.Behavior {
  awake() {
    
  }

  update() {
    
  
    this.actor.cannonBody.body.linearDamping = Game.GenericDamping;
    this.actor.cannonBody.body.material = Game.WallMaterial;
           // this.actor.cannonBody.body.angularDamping = 0.9;
    //this.vehicle.addToWorld(Game.World);
    Game.World.addBody(this.actor.cannonBody.body);
  }
}
Sup.registerBehavior(Wall);
