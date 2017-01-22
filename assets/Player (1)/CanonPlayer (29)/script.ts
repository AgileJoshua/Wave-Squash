Sup.ArcadePhysics2D.setGravity(0, 0);

class CanonPlayer extends Player {
  private explosion: Sup.Actor;

  
  accelerationForce = 1.1;
  decelerationTime = 2;

  playerNumber=1;

private myEngineSound : Sup.Audio.SoundPlayer;

  private velocity3d: CANNON.Vec3 = new CANNON.Vec3(0,0,0);
    setControllerData(command: directions) {
    
   
    // handle inputs...
    this.velocity3d = new CANNON.Vec3(0,0,0);


    switch (command) {
      case directions.Left:
        this.velocity3d.x = -this.speedX;
        /*if(this.velocity3d.x>-this.speedX)
        this.actor.cannonBody.body.applyLocalImpulse(new CANNON.Vec3(-this.speedX,0,0)
                                                    ,this.actor.cannonBody.body.position)
        */ //this.actor.getChild("Face").setOrientation(;
        break;
      case directions.Right:
        this.velocity3d.x = this.speedX;
      //  if(this.velocity3d.x<this.speedX)
      //  this.actor.cannonBody.body.applyLocalImpulse(new CANNON.Vec3(this.speedX,0,0)
      //                                              ,this.actor.cannonBody.body.position)
        break;
      case directions.Up:
        this.velocity3d.y = this.speedY;
      //  this.actor.cannonBody.body.applyLocalImpulse(new CANNON.Vec3(0,this.speedY,0)
      //                                              ,this.actor.cannonBody.body.position)
      //  this.actor.setEulerZ(0);
        break;
      case directions.Down:
        this.velocity3d.y = -this.speedY;
       // this.actor.setEulerZ(0);
      //  this.actor.cannonBody.body.applyLocalImpulse(new CANNON.Vec3(0,-this.speedY,0)
      //                                              ,this.actor.cannonBody.body.position)
      
        break;
     
    }
    this.actor.cannonBody.body.applyImpulse(this.velocity3d,this.actor.cannonBody.body.position);
   if(this.myEngineSound == null) 
      this.myEngineSound = Sup.Audio.playSound("Audio/BoatEngine" + this.playerNumber, 0.3);
      else{
        if(!this.myEngineSound.isPlaying()){ 
          this.myEngineSound = Sup.Audio.playSound("Audio/BoatEngine" + this.playerNumber, 0.3);
        }
      }
    //this.actor.cannonBody.body.velocity = this.velocity3d;
  }


  awake() {
    this.explosion = this.actor.getChild("Face");

    this.speedX = this.speedX*50;
    
    this.speedY = this.speedY*50;
    
    this.actor.cannonBody.body.linearDamping = Game.GenericDamping;
    this.actor.cannonBody.body.material = Game.ScooterMaterial;
    
    
    //this.actor.cannonBody.body.angularDamping = 0.9;
    //this.vehicle.addToWorld(Game.World);
    Game.World.addBody(this.actor.cannonBody.body);
    
    this.actor.cannonBody.body.addEventListener("collide",(event:{name:string, body:CANNON.Body})=>{
      if(event.body!=null){
        
        if(event.body.material == Game.ScooterMaterial)
        {Sup.Audio.playSound("Audio/BallHitsWall");
        }
        else 
        if(event.body.material == Game.BallMaterial){
          Sup.Audio.playSound("Audio/BoatsHitBall");
          Game.BallOwner = this.playerNumber;
         //Game.IncreaseScore(this.playerNumber, 1);
        }
        if(event.body.material == Game.SharkMaterial){
          Game.IncreaseScore(this.playerNumber, -5);
          
          //this.explosion.spriteRenderer.setSprite("Visuals/Bang"); 
          //this.explosion.spriteRenderer.setAnimation("bangbang");
          
          Sup.Audio.playSound("Audio/BoatsHitEachOther");
        }
        
      }
    });
  }

  update() {

  }
}

Sup.registerBehavior(CanonPlayer);

