class ProjectileBehavior extends Sup.Behavior { 
  private projectiles : Array<Sup.Actor>;
  
  
  awake() {
      
  }

  update() {
  }
  
  public fire(actor: Sup.Actor) {
    this.createProjectile(actor);
    Sup.log('boom');
    // 1. Create animation for shot.
    // 2. Check for collision with target.
    // 3. Handle collision.
    //this.actor.arcadeBody2D.setMovable
  }
  
  
   createProjectile(actor: Sup.Actor) {
    let direction  = actor.getZ();
     Sup.log(direction);
    let owner = actor.getName();
     Sup.log(owner);
    let projectile = new Sup.Actor('projectile');
     Sup.log(projectile.getName());
     
     var body = ;
    projectile.setPosition(actor.arcadeBody2D.getOffset().x, actor.arcadeBody2D.getOffset().y, 0);
     var velocity = actor.arcadeBody2D.getVelocity();
     if(velocity.x === 0 || velocity.y === 0) {
       velocity.x = 0.3;
       velocity.y = 0.3
     }
    projectile.arcadeBody2D.setVelocity(velocity);
    new Sup.SpriteRenderer(projectile, "Player/Sprite");
    
  }
}
Sup.registerBehavior(ProjectileBehavior);

 class Projectile {
   direction: number;
   owner : string;
   
   
   public constructor(direction: number, owner: string) { 
     this.direction = direction;
     this.owner = owner;
   };
   
  projectile = new Sup.Actor("Projectile");


  
   
  
 }


