class GameOverBehavior extends Sup.Behavior {
  awake() {
    let winnerText = "It's a DRAW!";
    if(Game.Score1 > Game.Score2) winnerText = "PLAYER1 is the WINNER!";
      else if(Game.Score2 > Game.Score1) winnerText = "PLAYER2 is the WINNER!";
    this.actor.textRenderer.setText(winnerText);
    Sup.Audio.playSound("Audio/PlayerWins");
  }

  update() {
    
  }
}
Sup.registerBehavior(GameOverBehavior);
