Sup.ArcadePhysics2D.setGravity(0, 0);

class Player extends Sup.Behavior {
  
  protected speedX = 0.3;
  protected speedY = 0.3;
  accelerationForce = 1.1;

  private velocity: Sup.Math.Vector2 = new Sup.Math.Vector2(0, 0);

  setControllerData(command: directions, action? : string) {
    // handle inputs...
    this.velocity = this.actor.arcadeBody2D.getVelocity();

    switch (command) {
      case directions.Left:
        this.velocity.x = -this.speedX;
        this.actor.rotateLocalEulerZ(90);
        break;
      case directions.Right:
        this.velocity.x = this.speedX;
        this.actor.setEulerZ(0);
        break;
      case directions.Up:
        this.velocity.y = this.speedY;
        this.actor.setEulerZ(0);
        break;
      case directions.Down:
        this.velocity.y = -this.speedY;
        this.actor.setEulerZ(0);
        break;
      default:
        break;
    }
    if(action) {
          // Initialize a new missile
    let airShot: Sup.Actor;
    // If the ship is ship 1 then create a Ship 1 missile and set the variable missile to the Missile actor
      
    // Set position of the actor to the current position of the ship
    airShot = Sup.appendScene("Player/AirShot/Prefab")[0];

    //airShot.getBehavior(AirShot).position setLocalPosition(this.actor.getPosition());
    // Set local variables of the missile behavior
    // Report the position of the ship to the variable position of the behavior
    airShot.getBehavior(AirShot).position = this.actor.getPosition();
    airShot.getBehavior(AirShot).velocity = this.velocity;

    // Report the angle of the ship to the angle direction of the missile
    // Set the shipIndex related to this missile
    //missile.getBehavior(AirShot) = this.index;
    // Set Shooting timer to be able to shoot again
    //this.shootCooldown = Ships.shootingTimer;
      
    }
    
    this.actor.arcadeBody2D.setVelocity(this.velocity);
  }


  awake() {
    this.actor.arcadeBody2D.setCustomGravityY(0);
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
  }

  update() {

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();
    decelerate(velocity);
    
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
    
  }
}

Sup.registerBehavior(Player);


const enum directions {
  Up,
  Down,
  Left,
  Right,
  RightUp,
  RightDown,
  LeftUp
}

function decelerate(velocity: Sup.Math.Vector2) {
  //Decelerate
  if (velocity.x != 0) velocity.x = velocity.x * 0.9;
  if (velocity.y != 0) velocity.y = velocity.y * 0.9;
  if (velocity.x < 0.01 && velocity.x > -0.01) velocity.x = 0;
  if (velocity.y < 0.01 && velocity.y > -0.01) velocity.y = 0;
}