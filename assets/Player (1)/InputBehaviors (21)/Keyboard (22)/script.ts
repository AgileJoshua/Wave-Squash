class Keyboard extends Sup.Behavior {
  
  useArrows:boolean;
  private thePlayerBehavior : Player
  
  update() {
    

    //const ProjectileBehavior = this.actor.getBehavior(ProjectileBehavior);
   
    if ( (Sup.Input.isKeyDown("LEFT") && this.useArrows ) 
        || (Sup.Input.isKeyDown("A") && !this.useArrows )) {
      this.thePlayerBehavior.setControllerData(directions.Left)
    } else if ((Sup.Input.isKeyDown("RIGHT") && this.useArrows )
              || (Sup.Input.isKeyDown("D") && !this.useArrows ) ) {
      this.thePlayerBehavior.setControllerData(directions.Right)
    }
    
    if ((Sup.Input.isKeyDown("UP") && this.useArrows)
        ||(Sup.Input.isKeyDown("W") && !this.useArrows)){
      this.thePlayerBehavior.setControllerData(directions.Up)
    } else if ((Sup.Input.isKeyDown("DOWN") && this.useArrows)
               ||(Sup.Input.isKeyDown("S") && !this.useArrows)){
      this.thePlayerBehavior.setControllerData(directions.Down)
    }
    
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      //this.thePlayerBehavior.setControllerData(directions.Down, 'shoot' )
    }
  }
  awake () {
    this.thePlayerBehavior =  this.actor.getBehavior(Player);
  }
}

Sup.registerBehavior(Keyboard);
