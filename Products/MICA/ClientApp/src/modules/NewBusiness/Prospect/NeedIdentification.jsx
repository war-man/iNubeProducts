
import React from "react";
// @material-ui/icons
import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import cx from "classnames";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import ProceedtoCalculator from "assets/img/flags/ProceedtoCalculator.png";
import GridItem from "components/Grid/GridItem.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import PropTypes from "prop-types";
import Modal from '@material-ui/core/Modal';
import Button from "components/CustomButtons/Button.jsx";
import NeedAnalysisCompleted from "./NeedAnalysisCompleted.jsx";
import Calculator from "./Calculator.jsx";
import FNA from "./FNA.jsx";
import swal from 'sweetalert';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

import FNAEDU from "assets/img/flags/FNAEDU.png";
import ProceedtoFNA from "assets/img/flags/ProceedtoFNA.png";
import FNA2 from "assets/img/flags/FNA2.png";
import FNA3 from "assets/img/flags/FNA3.png";
import FNA4 from "assets/img/flags/FNA4.png";

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}





const calcStyle={
    width:"120px"
}
const FnaeduStyle = {
    width: "106px"
    
}

const NeedIdentification = (props) => {
    console.log("NeedAnalysis Identification: ", props.componentData); 

    return (
        
        <div>
            <GridContainer justify="center">
                <GridItem>
                    <div>
                    <h3><b>1. My strongest belief in Life is</b></h3>
                        <p class="need-identification-answer-note"><small>Select the 1 thing that is true about you</small></p><br/>
                    </div>
                </GridItem>
                <GridItem>
                    <img src={FNAEDU} alt="...." style={FnaeduStyle}/>
                    <div class="need-identification-answer-value">
                        <p>Education is the best asset for children</p>
                       
                    </div>
                    <img src={FNA2} alt="...." style={FnaeduStyle} />
                    <div class="need-identification-answer-value">
                        <p>Everybody needs a happy and peaceful retirement</p>
                    </div>
                  

                </GridItem>
                <GridItem>
                    <img src={FNA3} alt="...." style={FnaeduStyle} />
                    <div class="need-identification-answer-value">
                        <p>Good health is the real wealth in life</p>
                    </div>
                    <img src={FNA4} alt="...." style={FnaeduStyle} />
                    <div class="need-identification-answer-value">
                        <p>Liability towards family goes beyond the death of a person.</p>
                    </div>
                </GridItem>

                <GridItem>
                    <img src={ProceedtoCalculator} alt="...." style={calcStyle} onClick={() => props.componentData.caledit()} />
                </GridItem>

                <GridItem>
                    <img src={ProceedtoFNA} alt="...." style={calcStyle} onClick={props.componentData.FNAedit} />
                </GridItem>
            </GridContainer>
            <Modal
                className="modalpopup"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.componentData.openCal}
                onClose={props.componentData.handleClose}

            >
                <div  id="modal">


                    <Button color="info"
                        round
                        //className={classes.marginRight}
                        style={searchClose}
                        onClick={props.componentData.handleClose}>
                        &times;
                                                        </Button>
                    {/* <ProspectScreen surNameState="" classes={classes} handleSimple={this.handleSimple} handleClose={this.handleClose} />*/}

                    {props.componentData.showCalc && <Calculator RetirementCalculatorDTO={props.componentData.RetirementCalculatorDTO}
                        RetCalSetValue={props.componentData.RetCalSetValue}
                        calcObj={props.componentData.calcObj}
                        handleChangeCalc={props.componentData.handleChangeCalc} showRetirement={props.componentData.showRetirement}
                        showEducation={props.componentData.showEducation} showHumanValue={props.componentData.showHumanValue}
                        showHealth={props.componentData.showHealth} showSavings={props.componentData.showSavings}
                        fundbal={props.componentData.fundbal} Checked={props.componentData.Checked}
                        display={props.componentData.display}
                        FinancilaObligationsData={props.componentData.FinancilaObligationsData} healthAdversitiesData={props.componentData.healthAdversitiesData}
                        handleddtChange={props.componentData.handleddtChange} HealthMasddlDTO={props.componentData.HealthMasddlDTO} masterList={props.componentData.masterList}
                        HealthddlSetValue={props.componentData.HealthddlSetValue}
                    />}
                    {props.componentData.showFNA && <FNA />}
                </div>
            </Modal>
        </div>
        )
}
export default NeedIdentification;