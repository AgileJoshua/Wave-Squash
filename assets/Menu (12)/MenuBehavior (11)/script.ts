class MenuBehavior extends Sup.Behavior {

  
  sceneToOpen:string;
  cameraName:string;
private intro : Sup.Audio.SoundPlayer;
  private myCamera:Sup.Camera;
  
  awake() {
   this.myCamera = Sup.getActor(this.cameraName).camera;
    this.intro = Sup.Audio.playSound("Audio/IntroSong",0.3,{loop : true});
  }

  update() {
    if(Sup.Input.wasMouseButtonJustPressed(0)){
      let ray = new Sup.Math.Ray();
      this.intro.setLoop(false);
      this.intro.setVolume(0.1);
      ray.setFromCamera(this.myCamera, Sup.Input.getMousePosition());
      let hits = ray.intersectActors([this.actor]);
      if(hits.length>0)Sup.loadScene(this.sceneToOpen);
    }
    
  }
}
Sup.registerBehavior(MenuBehavior);
