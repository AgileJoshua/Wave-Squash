class IAmASharkBehavior extends Sup.Behavior {
  
  private velocity3d: CANNON.Vec3 = new CANNON.Vec3(0,0,0);
  private isStarted = false;
  private sharkMood:SharkActions = SharkActions.Wait;
  private rng;
  private face: Sup.Actor;
  

  awake() {
    this.rng = new RNG(new Date().toISOString() + this.actor.getName());
    this.face = this.actor.getChild("Face");
    this.actor.cannonBody.body.linearDamping = Game.GenericDamping;
    this.actor.cannonBody.body.material = Game.SharkMaterial;
    this.actor.cannonBody.body.angularDamping = 0.7;
    Game.World.addBody(this.actor.cannonBody.body);
    
    this.actor.cannonBody.body.addEventListener("collide",(event:{name:string, body:CANNON.Body})=>{
      if(event.body !=null){
        if(event.body.material == Game.ScooterMaterial){
          this.face.spriteRenderer.setAnimation("bite");
          Sup.Audio.playSound("Audio/Shark");
        }
      }
    });
    
    Sup.setInterval(2000,()=>{
      let shouldChange = this.rng.random(1,6)>=3;
      if(shouldChange){
        
      Sup.log("change shark...");
        let behavior = this.rng.random(1,4);
        if(behavior == 1)this.sharkMood=SharkActions.Wait;
        if(behavior == 3)this.sharkMood=SharkActions.Surface;
        //this.sharkMood=SharkActions.RandomSwim;


    switch(this.sharkMood){
      case SharkActions.Wait:
        this.face.spriteRenderer.setAnimation("fin");
        Sup.log("shark wait");
        break;
      case SharkActions.Surface:
        Sup.log("surface shark")
        this.face.spriteRenderer.setAnimation("surface");
        break;
                         }
      }

    });
    Sup.setInterval(this.rng.random(50, 250),()=>{
      this.actor.cannonBody.body.velocity = new CANNON.Vec3(this.rng.random(-7,7),this.rng.random(-7,7), 0);
    })
  }

  update() {
    this.rng = new RNG(new Date().toISOString() + this.actor.getName());


    if(!this.isStarted){
      
    //this.velocity3d = new CANNON.Vec3(5,0,0);
    //this.actor.cannonBody.body.velocity = this.velocity3d;
    this.isStarted = true;
    }
   
  }
}

enum SharkActions{
      Wait,
      RandomSwim,
      Surface,
     }
Sup.registerBehavior(IAmASharkBehavior);
