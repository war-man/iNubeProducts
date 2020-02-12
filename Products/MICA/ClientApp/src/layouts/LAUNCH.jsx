import React from "react";
import Dialog from '@material-ui/core/Dialog';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import MicaVideo from "./MICA.mp4";
import "./style.css";

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class LAUNCH extends React.Component {

                     
	constructor(props)
	{
		super(props);
		this.state={
			launched:false,
			showanimation:false
		}
	}
    render() {
        return (
        	(this.state.launched)?
        	<Redirect to="/pages/login-page" />
        	:
        	<Dialog fullScreen open PaperProps={{style: {backgroundColor: 'transparent',boxShadow: 'none',}}} >
            	<center style={{height:"100%",width:"100%"}}>
            		{this.state.showanimation?
            			<div style={{height:"100%",width:"100%"}} >
            				<video id='vid'  autoPlay onEnded={()=>{let state=this.state; state.launched=1;this.setState(state);}} style={{height:"100%",width:"100%"}}>
            			         <source src={MicaVideo} type="video/mp4"/>
                             </video>
                        </div>
            			:
                        <div style={{height:"100%",width:"100%"}}>
                        <div style={{height:"100%", width:"100%"}}className="confetti">

                        
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="confetti-piece"></div>
                        <div className="button"
                             onClick={()=>{let state=this.state; state.showanimation=true; this.setState(state);}}
                            ><a>LAUNCH</a></div>
                        </div>
                      </div>
            		}
            		
            	</center>
            </Dialog>
            
        );
    }
}
export default LAUNCH;