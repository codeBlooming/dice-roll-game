import Player from './player.js'

const scoreLimit = 100;
let currentPlayer = 0;

const _players = [
                  new Player(1, $("#globalScorePlayer1"), $("#currentScorePlayer1"), $('#player1'), $('#playerName1') ), 
                  new Player(2, $("#globalScorePlayer2"), $("#currentScorePlayer2"), $('#player2'), $('#playerName2'))
                ]


window.reload = function reload() {
  newGame()
}

//Begin a new game
const newGame = () => {

  $('#myModal').modal('hide')  

  //reset players 
  _players[0].reset()
  _players[1].reset()

  _players[0].setActive()
  _players[1].setInactive()

  //enable buttons
  enableBtns()

//for debugging only
  _players[1].setCurrentScore(0)
}



const rollAdice = () => {
  //rand * (max - min) + 1)
  let newRandomValue = Math.floor(Math.random() * 6) + 1;  

  $("#dice").attr('src', `../images/dice_${newRandomValue}.png`)
  $("#dice")
  .addClass('dice-bounce')
  .on("animationend webkitAnimationEnd oAnimationEnd",()=> {
    $("#dice")
      .off()
      .removeClass('dice-bounce')
  })

  let currentScorePlayerHtmlElm = $('#currentScorePlayer'+_players[currentPlayer].getId());

  if(newRandomValue !== 1)
  { 
    //player which make 2 - 6 can continue to roll a dice
    _players[currentPlayer].setCurrentScore(newRandomValue)
    enableBtns()
  }else{    
    //if dice give 1, animation slideDown currentScore (loose)
    currentScorePlayerHtmlElm
    .addClass('slide-down')
    .on("animationend webkitAnimationEnd oAnimationEnd",()=> {
      // console.log('animation slidedown done');
      currentScorePlayerHtmlElm
        .off("animationend webkitAnimationEnd oAnimationEnd")
        .removeClass('slide-down')
        switchToNextPlayer()
    })    
  }
}


const hold = () => {

  _players[currentPlayer].setGlobalScore()

  if(_players[currentPlayer].getGlobalScore() >= scoreLimit)
  {
    gameOver(_players[currentPlayer].getId())
  }else{
    switchToNextPlayer()
  }

}


const switchToNextPlayer = () => {
  
  //end round for actual player
  _players[currentPlayer].resetCurrentScore()
  _players[currentPlayer].setInactive()
       
  //switch to other player
  currentPlayer = currentPlayer === 0 ? 1 : 0;

  //init other player  
  _players[currentPlayer].setActive()
  enableBtns()
}


const enableBtns = () => {
  $('#rollDiceBtn').prop('disabled', false);
  $('#holdBtn').prop('disabled', false);
}
const disableBtns = () => {
  $('#rollDiceBtn').prop('disabled', true);
  $('#holdBtn').prop('disabled', true);
}

//Generate handlers on buttons
$('#newGameBtn').on('click', newGame )
$('#rollDiceBtn').on('click', () => {
  disableBtns()
    rollAdice()
  }
)
$('#holdBtn').on('click', ()=> {
  //to avoid multi click and protect animations
  disableBtns()
  $('#currentScorePlayer'+_players[currentPlayer].getId())
    .addClass('slide-up')
    .on("animationend webkitAnimationEnd oAnimationEnd",()=> {
      $('#currentScorePlayer'+_players[currentPlayer].getId())
        .off()
        .removeClass('slide-up')
      hold()
  } )
  }
)

const gameOver = (player) => {  
  $(".modal-title").text(`PLAYER ${player} IS THE WINNER !!! `)
  $(".modal-body p").text(`Player 1 with ${_players[0].getGlobalScore()} Points VS Player 2 with ${_players[1].getGlobalScore()} Points`)
  $('#myModal').modal('show')
}

//When Jquery is ready, we can load a new game
$( () => {  
  newGame() 
})
