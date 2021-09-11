const scoreLimit = 100;
const startScore = 0;

const players = [1, 2]
var currentPlayer = 0;
var roundScore = 0;

const dice = document.getElementById('dice')


const newGame = () => {
  //close modal  
  $('#myModal').modal('hide')

  //Set first player as active player
  currentPlayer = 0;

  //set current visualy active
  $('#player'+players[currentPlayer]).addClass('activePlayer')
  $('#player'+players[1]).removeClass('activePlayer')
  
  //reset players labels
  $('#currentScorePlayer'+players[0]).innerText = 0;
  $('#globalScorePlayer'+players[0]).innerText = startScore;  
  $('#currentScorePlayer'+players[1]).innerText = 0;
  $('#globalScorePlayer'+players[1]).innerText = startScore;
  
}

const rollAdice = () => {
  //rand * (max - min) + 1)
  let random = Math.floor(Math.random() * 6) + 1;  
  dice.src = `../images/dice_${random}.png`

  if(random !== 1)
  {    
    roundScore += random;
    $('#currentScorePlayer'+players[currentPlayer]).text(roundScore);
  }else{    
    switchToNextPlayer()
  }
  holdBtn.removeAttribute('disabled')
}

const switchToNextPlayer = () => {
  roundScore = 0;
  //end round for actual player
  $('#currentScorePlayer'+players[currentPlayer]).text(roundScore);
  $('#player'+players[currentPlayer]).toggleClass('activePlayer')
  //switch to other player
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  //init other player
  $('#player'+players[currentPlayer]).toggleClass('activePlayer')
}

const hold = () => {
  holdBtn.setAttribute('disabled', 'disabled')

  let currentScore_lbl = $('#currentScorePlayer'+players[currentPlayer])
  let globalScore_lbl = $('#globalScorePlayer'+players[currentPlayer])  

  let score = Number(currentScore_lbl.text())
  let playerGlobalScore = Number(globalScore_lbl.text())
  
  let newScore = playerGlobalScore + score
  globalScore_lbl.text(newScore)

  if(newScore >= scoreLimit)
  {
    gameOver()
  }else{
    switchToNextPlayer(0)
  }
  
}

const gameOver = () => {  
  $(".modal-title").text(`PLAYER ${players[currentPlayer]} IS THE WINNER !!! `)
  $(".modal-body p").text(`HE WON WITH ${$('#globalScorePlayer'+players[currentPlayer]).text()} POINTS`)
  $('#myModal').modal('show')
}


//Generate handlers on buttons
$('#newGameBtn').on('click', newGame )
$('#rollDiceBtn').on('click', rollAdice)
$('#holdBtn').on('click', hold)



//When Jquery is ready, we can load a new game
$( () => {

  newGame()
})

