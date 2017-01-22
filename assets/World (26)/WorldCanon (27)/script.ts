class WorldCanonBehavior extends Sup.Behavior {
  
  private gameSong : Sup.Audio.SoundPlayer;
  awake() {
    Game.Init();
   Game.StartTimer(90);
    
    Game.World.addBody(Sup.getActor("WallLeft").cannonBody.body);
    
    Game.World.addBody(Sup.getActor("WallTop").cannonBody.body);
    
    Game.World.addBody(Sup.getActor("WallRight").cannonBody.body);
    
    Game.World.addBody(Sup.getActor("WallBottom").cannonBody.body);
    
    Sup.getActor("WallLeft").cannonBody.body.material = Game.WallMaterial;
    Sup.getActor("WallTop").cannonBody.body.material = Game.WallMaterial;
    Sup.getActor("WallRight").cannonBody.body.material = Game.WallMaterial;
    Sup.getActor("WallBottom").cannonBody.body.material = Game.WallMaterial;
    
    this.gameSong = Sup.Audio.playSound("Audio/GamePlaySong",0.3,{loop:true});
    
  }

  update() {
    Game.CannonUpdate();
    Game.UpdateTime();
    if(Game.SecondsLeft()<=0){
      this.gameSong.stop();
      Sup.loadScene("Menu/GameOverScene");
    }
  }
}
Sup.registerBehavior(WorldCanonBehavior);

namespace Game{
  export var GenericDamping:number;
  export var World:CANNON.World;
  export var Ground:CANNON.Body;
  export var Wall:CANNON.Body;
  export var WaterMaterial:CANNON.Material;
  export var BallMaterial:CANNON.Material;
  export var ScooterMaterial:CANNON.Material;
  export var WallMaterial:CANNON.Material;
  export var SharkMaterial:CANNON.Material;
  
  export var Score1:number;
  export var Score2:number;
  
  export var BallOwner:number;
  
  export function Init(){
    Game.Score1 = 0;
    Game.Score2 = 0;
    Game.BallOwner = -1;
    Game.GenericDamping = 0.3;
    Game.WaterMaterial = new CANNON.Material("Water");
    Game.BallMaterial = new CANNON.Material("Ball");
    Game.ScooterMaterial = new CANNON.Material("Scooter");
    Game.WallMaterial = new CANNON.Material("Wall");
    Game.SharkMaterial = new CANNON.Material("Shark");
    
    Game.World = new CANNON.World();
    Game.World.gravity.set(0,0,-9.82);
    Game.World.broadphase = new CANNON.NaiveBroadphase();
    
    let ScooterWallContact = new CANNON.ContactMaterial(
    Game.WallMaterial, Game.ScooterMaterial, {
      friction: 0.6,
      restitution: 0.5
    })
    let BallWallContact = new CANNON.ContactMaterial(
    Game.WallMaterial, Game.BallMaterial, {
      friction: 0,
      restitution: 1
    })
    
    let WaterBallContact = new CANNON.ContactMaterial(
      Game.WaterMaterial, Game.BallMaterial, {
        friction: 1,
        restitution: 0.1,
    });

    let WaterScooterContact = new CANNON.ContactMaterial(
      Game.WaterMaterial, Game.ScooterMaterial, {
        friction: 1,
        restitution: 0.3,
        contactEquationStiffness: 1e8,
            contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRelaxation: 3
    });
    let ScooterBallContact = new CANNON.ContactMaterial(
      Game.ScooterMaterial, Game.BallMaterial, {
        friction: 0,
        restitution: 0.8
    });
    let ScooterScooterContact = new CANNON.ContactMaterial(
      Game.ScooterMaterial, Game.ScooterMaterial, {
        friction: 0,
        restitution: 0.7
    });
    
    let ScooterSharkContact = new CANNON.ContactMaterial(
      Game.SharkMaterial, Game.ScooterMaterial, {
        friction: -3,
        restitution: 3 
    });
    
    
            
    // We must add the contact materials to the world
    Game.World.addContactMaterial(WaterBallContact);
    Game.World.addContactMaterial(WaterScooterContact);
    Game.World.addContactMaterial(ScooterBallContact);
    Game.World.addContactMaterial(ScooterScooterContact);
    Game.World.addContactMaterial(ScooterWallContact);
    
    Game.World.addContactMaterial(BallWallContact);
    Game.World.addContactMaterial(ScooterSharkContact);
    
    let groundShape = new CANNON.Plane();
    
    Game.Ground = new CANNON.Body();
    Game.Ground.mass = 0;
    Game.Ground.material = Game.WaterMaterial;
    Game.Ground.addShape(groundShape);
    Game.World.addBody(Game.Ground);
    
    
    
    //let wallShape = new CANNON.Plane();
    //Game.Wall = new CANNON.Body();
   // Game.Wall.material = Game.WallMaterial;
   // Game.Wall.mass = 100;
   // Game.Wall.addShape(wallShape);
    //Game.World.addBody(this.Wall);
    
    
  }
  
  export function CannonUpdate(){
    var timeStep = 1.0 / 60.0; // seconds
    Game.World.step(timeStep);
  }
  
  export function IncreaseScore(playerNumber:number, points:number){
    if(playerNumber == 1 ){
      if(Game.Score1 + points < 0) return;
      Game.Score1+=points;
    }
    if(playerNumber == 2) {
      if(Game.Score2 + points < 0) return;
      Game.Score2+=points;
    }
    
    Sup.getActor("Player1Score").textRenderer.setText("Player1: " + Game.Score1);
    
    Sup.getActor("Player2Score").textRenderer.setText("Player2: " + Game.Score2);
    Sup.log(`P1: ${Game.Score1}`);
    
    Sup.log(`P2: ${Game.Score2}`);
  }
  
  export var StartTime:Date;
  export var TimeLimit:number;
  export function UpdateTime(){
    
    Sup.getActor("TimeLeft").textRenderer.setText(Game.TimeLimit - Game.SecondsPassed());
  }
 export function SecondsLeft():number{
   return Game.TimeLimit - Game.SecondsPassed();
 }
  export function SecondsPassed():number{
    let now = new Date();
    let secondsLeft = now.getTime() - Game.StartTime.getTime();
    return Math.floor(secondsLeft/1000);
  }
  export function StartTimer(maxTime:number){
    Game.TimeLimit = maxTime;
    Game.StartTime = new Date();
  }
}
