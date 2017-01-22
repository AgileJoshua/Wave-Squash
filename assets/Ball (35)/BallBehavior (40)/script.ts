class IAmABall extends Sup.Behavior {
  
  private myAnimation : Sup.SpriteRenderer;
  private lastPosition : Sup.Math.Vector3;
  
  awake() {
    this.actor.cannonBody.body.linearDamping = Game.GenericDamping;
    this.actor.cannonBody.body.material = Game.BallMaterial;
    this.actor.cannonBody.body.angularDamping = 0.7;
    Game.World.addBody(this.actor.cannonBody.body);
    this.myAnimation = this.actor.getChild("Face").spriteRenderer;
    
    this.actor.cannonBody.body.addEventListener("collide",(event:{name:string, body:CANNON.Body})=>{
      if(event.body!=null){
        
        if(event.body.material == Game.WallMaterial){
          Sup.Audio.playSound("Audio/BoatsHitEachOther");
           if(Game.BallOwner>0)Game.IncreaseScore(Game.BallOwner, 5);
        }
        if(event.body.material == Game.SharkMaterial){

          if(Game.BallOwner>0){
                      Sup.Audio.playSound("Audio/ShootWave");
            Game.IncreaseScore(Game.BallOwner, 25);
            Game.BallOwner = 0;
          }
        }
        
        }
    });
  }

  update() {
    let distance = 0;
    let currentPos = this.actor.getPosition();
    if(this.lastPosition != null)
      {
        const last2D = this.lastPosition.toVector2();
        const current2D = currentPos.toVector2();
        distance = current2D.distanceTo(last2D);
      }
    if(distance<0.05)this.myAnimation.setPlaybackSpeed(0);
    else if(distance<0.1)this.myAnimation.setPlaybackSpeed(1);
    else if(distance<0.6)this.myAnimation.setPlaybackSpeed(3);
    else this.myAnimation.setPlaybackSpeed(6);
    this.lastPosition = currentPos;
   
  }
}
Sup.registerBehavior(IAmABall);
