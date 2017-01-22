class Gamepad extends Sup.Behavior {

  private lastGampadX:number = null;
  private lastGampadY:number = null;

  GamePadID:number = 0;
  
  update() {
    const thePlayerBehavior = this.actor.getBehavior(Player);
    
    let x = Sup.Input.getGamepadAxisValue(this.GamePadID, 0);
    let y = Sup.Input.getGamepadAxisValue(this.GamePadID, 1);

    const xNow = Sup.Input.getGamepadAxisValue(this.GamePadID, 0);
    const yNow = Sup.Input.getGamepadAxisValue(this.GamePadID, 1);
    if(xNow!==this.lastGampadX){
      if(x > 0) Sup.log('höger!');

      Sup.log('gp x: ', xNow);
      this.lastGampadX = xNow;
    }
    if(yNow!==this.lastGampadY){
      Sup.log('gp y: ', yNow);
      this.lastGampadY = yNow;
    }
    
    if(thePlayerBehavior!=null){
      if(xNow<0)
      thePlayerBehavior.setControllerData(directions.Left);
    }
    if(thePlayerBehavior!=null){
      if(xNow>0)
      thePlayerBehavior.setControllerData(directions.Right);
    }
    if(thePlayerBehavior!=null){
      if(yNow<0)
      thePlayerBehavior.setControllerData(directions.Up);
    }
    if(thePlayerBehavior!=null){
      if(yNow>0)
      thePlayerBehavior.setControllerData(directions.Down);
    }
  }
}

Sup.registerBehavior(Gamepad);
