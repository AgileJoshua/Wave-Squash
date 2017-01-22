Sup.ArcadePhysics2D.setGravity(0, 0);

class CanonPlayer extends Player {
  
  accelerationForce = 1.1;
  decelerationTime = 2;

  private velocity3d: CANNON.Vec3 = CANNON.Vec3.ZERO;

  setControllerData(command: directions) {
    
    // handle inputs...
    this.velocity3d = CANNON.Vec3.ZERO;


    switch (command) {
      case directions.Left:
        this.velocity3d.x = -this.speedX;
       // this.actor.rotateLocalEulerZ(90);
        break;
      case directions.Right:
        this.velocity3d.x = this.speedX;
       // this.actor.setEulerZ(0);
        break;
      case directions.Up:
        this.velocity3d.y = this.speedY;
       // this.actor.setEulerZ(0);
        break;
      case directions.Down:
        this.velocity3d.y = -this.speedY;
       // this.actor.setEulerZ(0);
        break;
     
    }
    
    let decelerate = function(velocity) {
      //Decelerate
      if (velocity.x != 0) velocity.x = velocity.x / 2;
      if (velocity.y != 0) velocity.y = velocity.y / 2;
      if (velocity.x < 0.01 && velocity.x > -0.01) velocity.x = 0;
      if (velocity.y < 0.01 && velocity.y > -0.01) velocity.y = 0;
    }
    
    this.actor.cannonBody.body.velocity = this.velocity3d;
  }


  awake() {
    this.speedX = this.speedX*100;
    
    this.speedY = this.speedY*100;
    //this.actor.arcadeBody2D.setCustomGravityY(0);
    //Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
  }

  update() {

    // As explained above, we get the current velocity
    //let velocity = this.actor.arcadeBody2D.getVelocity();
    
    
    // Finally, we apply the velocity back to the ArcadePhysics body
    //this.actor.arcadeBody2D.setVelocity(velocity);
    
  }
}

Sup.registerBehavior(CanonPlayer);

