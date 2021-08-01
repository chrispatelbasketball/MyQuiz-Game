class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow")

    //write code to show a heading for showing the result of Quiz
    textSize(33);
    fill("black")
    text("Result of the Quiz", 300, 53)
    text("----------------------------", 270,73)
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined) {
       //write code to add a note here
      var dp = 240
      textSize(20)
      fill("Blue")
      text("*NOTE: Contestant who answered correct are highlighted in green color!", 130, 230)
    }

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
        fill("Green")
      }
      else{
        fill("red")
      }
      textSize(23)
      dp+=30
      text(allContestants[plr].name + ": "+ allContestants[plr].answer,250,dp)
    }

  }

}
