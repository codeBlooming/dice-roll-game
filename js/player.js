import $ from 'jquery'
export default class Player {
  globalScore = 0;
  currentScore = 0;
  isActive = false;
  id;
  globalScoreHtmlElement;
  currentScoreHtmlElement;
  playerBackGroundHtmlElement;
  playerNameHtmlElement;

  constructor(id, globalScoreHtmlElement, currentScoreHtmlElement, playerBackGroundHtmlElement, playerNameHtmlElement) {
    this.id = id;
    this.currentScoreHtmlElement = currentScoreHtmlElement;
    this.globalScoreHtmlElement = globalScoreHtmlElement;
    this.playerBackGroundHtmlElement = playerBackGroundHtmlElement
    this.playerNameHtmlElement = playerNameHtmlElement
  }

  getId = () => {
    return this.id;
  }

  getGlobalScore = () => {
    return this.globalScore
  }

  getCurrentScore = () => {
    return this.currentScore
  }

  setGlobalScore = () => {   
    console.log(this.globalScore); 
    let actualGlobalScore = this.globalScore
    let newGlobalScore = this.globalScore + this.currentScore
    this.showCounter(actualGlobalScore,newGlobalScore, this.globalScoreHtmlElement )
    this.globalScore = newGlobalScore
    this.resetCurrentScore()
  }

  resetGlobalScore = () => {
    this.globalScore = 0
    $(this.globalScoreHtmlElement).text(0)
  }

  setCurrentScore = (score) => {
    let actualCurrentScore= this.currentScore
    let newCurrentScore = actualCurrentScore + score
    this.showCounter(actualCurrentScore, newCurrentScore, this.currentScoreHtmlElement)
    this.currentScore += score
  }

  resetCurrentScore = () => {
    this.currentScore = 0
    $(this.currentScoreHtmlElement).text(0)
  }

  reset = () => {
    this.resetCurrentScore()
    this.resetGlobalScore()
  }

  getActive = () => {
    return this.isActive
  }

  setActive = () => {
    this.playerBackGroundHtmlElement.addClass('activePlayer')
    this.playerNameHtmlElement.addClass('redBall')
  }

  setInactive = () => {
    this.playerBackGroundHtmlElement.removeClass('activePlayer')
    this.playerNameHtmlElement.removeClass('redBall')
  }


  showCounter = (startValue, targetValue, targetPlayerField) => {   

    let interv = setInterval(()=> {
      // console.log('control interval');
      if(startValue===targetValue)
      {
        clearInterval(interv)
        return
      }
      startValue ++ ;
      targetPlayerField.text(startValue)  
    },50)
  }

}