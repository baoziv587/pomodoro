/// <reference path="./interface.d.ts" />

namespace app.componets {
  export class TimerCounter extends
    React.Component<ITimerProps, ITimerStates>{

    constructor(props: ITimerProps) {
      super(props);
      this.state={
        min: this.props.timerObject.min,
        sec: this.props.timerObject.second,
        onStart: false
      }
    }
  
    public countDown() {
      this.props.timerObject.countDown();
      this.setState({
        min: this.props.timerObject.min,
        sec: this.props.timerObject.second
      })
    }

    public changes() {
      this.countDown();
    }
    
    public toggleFirst(){
      this.props.todoModel.toggleFirst() 
    }
    
    
    private _getTickingObject(): HTMLAudioElement {
      return ReactDOM.findDOMNode<HTMLAudioElement>(this.refs['audio']);
    }
    
    public playTicking() {
     const audio = this._getTickingObject()
     audio.loop = true
     audio.play();
    }
    
    public pauseTicking() {
      const audio = this._getTickingObject();
      audio.pause();      
    }
    
    public reset(){
      this.props.timerObject.reset()
      this.setState({
        min: this.props.timerObject.min,
        sec: this.props.timerObject.second
      })
      this.props.timerObject.clearInterval()
      this.pauseTicking();
    }
    
    
   
    
    public handleOnStart(e) {
      
      if (this.state.onStart) {
        this.setState({ onStart: false });
        this.reset();
      
      } else {
        
        this.playTicking();
        this.setState({ onStart: true });
        
        var coutDownID:number = setInterval( () => {
          
          if (this.props.timerObject.min === 0){
            
            if ( this.props.timerObject.second > 0  ){
              this.countDown()     
            } else {
              
              //will got a notification at 00:00
              app.utils.createNotification(
                app.constants['NOTIFICATION_TITLE'],
                { 
                  'body':app.constants['NOTIFICATION_BODY'] 
                }
               )
                
              this.reset()
              this.toggleFirst()
            }
            
          } else {
            this.countDown()
          } 
          
        },1200)
        this.props.timerObject.setIntervalID(coutDownID)
        coutDownID = null;
      }
      
    }

    public render() {
      var isDisplay = {
        img:classNames({
        transition: true,
        timer: true,
        fadeIn: !this.state.onStart,
        fadeOut: this.state.onStart
      }),
      timer: classNames({
        fadeIn: !!this.state.onStart,
        fadeOut: !this.state.onStart,
        transition: true,
        timer:true
      })}
    const logoStyle = { width: '3rem', top: '-1rem', left: '4rem', position: 'relative' }
    
      return (  
        <ul className="timeTracker">
          <li className="infinite"><i className="fa fa-recycle"></i></li>
          <li className="pomodoro">
            <img className={isDisplay.img} src={app.constants.LOGO} alt="pomodoro" style={logoStyle}/>
            <strong className={isDisplay.timer}>
              <span className='min'>{this.state.min}</span>
              <span className='spliter'>{':'}</span>
              <span className='sec'>
                {this.state.sec < 10
                  ? this.state.sec ===0? '00':'0'+this.state.sec 
                  :this.state.sec}
              </span>
            </strong>
          </li>
          <li className="start" onClick= { (e) => { this.handleOnStart(e) } }><i className="fa fa-play"></i></li>
          <audio src={app.constants.TICKING_PATH } controls={false} ref="audio" preload="preload" /> 
        </ul>

      )
    }
  }

}