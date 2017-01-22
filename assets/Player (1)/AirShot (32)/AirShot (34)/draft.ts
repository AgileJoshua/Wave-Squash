class AirShot extends Sup.Behavior { 
  velocity: Sup.Math.Vector2 
  direction : Sup.Math.Vector3
  position : Sup.Math.Vector3
  
  awake() {
      
  }

  update() {
  }
  
  start() {
    this.actor.setPosition(this.position);
        
     if(this.velocity.x === 0 || this.velocity.y === 0) {
       this.velocity.x = 0.3;
       this.velocity.y = 0.3
     } else {
    }
    this.actor.arcadeBody2D.setVelocity(this.velocity);
  }
}

Sup.registerBehavior(AirShot);

