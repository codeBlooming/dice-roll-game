const scoreLimit = 100;
const startScore = 90;

const players = [1, 2]
var currentPlayer = 0;
var roundScore = 0;

const dice = document.getElementById('dice')


const newGame = () => {
  //close modal  
  $('#myModal').modal('hide')

  //Set first player as active player
  currentPlayer = 0;
  roundScore = 0;
  //set current visualy active
  $('#player'+players[currentPlayer]).addClass('activePlayer')
  $('#player'+players[1]).removeClass('activePlayer')
  $('#playerName'+players[currentPlayer]).addClass('redBall')
  $('#playerName'+players[1]).removeClass('redBall')
  
  //reset players labels
  $('#currentScorePlayer'+players[0]).text("0");
  $('#globalScorePlayer'+players[0]).text(startScore);  
  $('#currentScorePlayer'+players[1]).text("0");
  $('#globalScorePlayer'+players[1]).text(startScore);
  
}

const rollAdice = () => {
  //rand * (max - min) + 1)
  let random = Math.floor(Math.random() * 6) + 1;  
  dice.src = `../images/dice_${random}.png`
  $("#dice").addClass('dice-bounce')
  setTimeout(()=> {
    $("#dice").removeClass('dice-bounce')
  }, 1000)
  // $("#dice").removeClass('dice-bounce')

  let currentScorePlayer = $('#currentScorePlayer'+players[currentPlayer]);
  if(random !== 1)
  {    
    roundScore += random;
    showCounter(currentScorePlayer.text(),roundScore, currentScorePlayer)
    // currentScorePlayer.text(roundScore);
  }else{    

    //animation slideDown currentScore (loose)
    currentScorePlayer.addClass('slide-down')
    toggleBtn()
    setTimeout(() => {
      switchToNextPlayer()
      currentScorePlayer.removeClass('slide-down')
      toggleBtn()
    }, 1200)
    
  }
  holdBtn.removeAttribute('disabled')
}

const switchToNextPlayer = () => {
  roundScore = 0;
  //end round for actual player
  $('#currentScorePlayer'+players[currentPlayer]).text(roundScore);
  $('#player'+players[currentPlayer]).toggleClass('activePlayer')
  $('#playerName'+players[currentPlayer]).toggleClass('redBall')
  //switch to other player
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  //init other player
  $('#player'+players[currentPlayer]).toggleClass('activePlayer')
  $('#playerName'+players[currentPlayer]).toggleClass('redBall')
}

const hold = () => {
  holdBtn.setAttribute('disabled', 'disabled')
  let currentScore_lbl = $('#currentScorePlayer'+players[currentPlayer])
  let globalScore_lbl = $('#globalScorePlayer'+players[currentPlayer])  
  
  
  
  let score = Number(currentScore_lbl.text())
  let playerGlobalScore = Number(globalScore_lbl.text())
  
  let newScore = playerGlobalScore + score

  // globalScore_lbl.text(newScore)

  showCounter(playerGlobalScore, newScore, globalScore_lbl)
 
  if(newScore >= scoreLimit)
  {
    gameOver(newScore)
  }else{
    switchToNextPlayer(0)
  }
  
}

const gameOver = (newScore) => {  
  $(".modal-title").text(`PLAYER ${players[currentPlayer]} IS THE WINNER !!! `)
  $(".modal-body p").text(`HE WON WITH ${newScore} POINTS`)
  $('#myModal').modal('show')
}


//Generate handlers on buttons
$('#newGameBtn').on('click', newGame )
$('#rollDiceBtn').on('click', rollAdice)
$('#holdBtn').on('click', ()=> {
  toggleBtn()
  $('#currentScorePlayer'+players[currentPlayer]).addClass('slide-up')
  setTimeout(() => {
    $('#currentScorePlayer'+players[currentPlayer]).removeClass('slide-up')
    hold()
    toggleBtn()
  }, 1200)
})


const toggleBtn = () => {
  $('#rollDiceBtn').prop('disabled', function(i, v) { return !v; });
  $('#holdBtn').prop('disabled', function(i, v) { return !v; });
}

//show 
const showCounter = (startValue, endValue, targetPlayerField) => {  
  
  let interv = setInterval(()=> {
    if(startValue===endValue)
    {
      clearInterval(interv)
      return
    }
    startValue ++ ;
    targetPlayerField.text(startValue)  
  },100)
}

//When Jquery is ready, we can load a new game
$( () => newGame() )
