
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
import savemoney from "assets/img/flags/savemoney.png";
import fund from "assets/img/flags/fund.png";
import Exercise from "assets/img/flags/Exercise.png";
import BuildingAssets from "assets/img/flags/BuildingAssets.png";
import FamilyTarget from "assets/img/flags/FamilyTarget.png";
import OverSea from "assets/img/flags/OverSea.png";
import Healthy from "assets/img/flags/Healthy.png";
import Family from "assets/img/flags/Family.png";
import Coins from "assets/img/flags/Coins.png";
import MutualFund from "assets/img/flags/MutualFund.png";
import HappyFamily from "assets/img/flags/HappyFamily.png";
import SecretMoney from "assets/img/flags/SecretMoney.png";
import Savings from "assets/img/flags/Savings.png";
import UniversityDegree from "assets/img/flags/UniversityDegree.png";
import PhysicalDamage from "assets/img/flags/PhysicalDamage.png";
import FamilyEvent from "assets/img/flags/FamilyEvent.png";

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
                <GridItem xs={12} sm={12} md={12}>
                    <div>
                    <h3><b>1. My strongest belief in Life is</b></h3>
                        <p class="need-identification-answer-note"><small>Select the 1 thing that is true about you</small></p><br/>
                    </div>
                </GridItem>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                    <img src={FNAEDU} alt="...." style={FnaeduStyle}/>
                    <div class="need-identification-answer-value">
                        <p>Education is the best asset for children</p>
                       
                    </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                    <img src={FNA2} alt="...." style={FnaeduStyle} />
                    <div class="need-identification-answer-value">
                        <p>Everybody needs a happy and peaceful retirement</p>
                    </div>
                  

                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                    <img src={FNA3} alt="...." style={FnaeduStyle} />
                    <div class="need-identification-answer-value">
                        <p>Good health is the real wealth in life</p>
                    </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <img src={FNA4} alt="...." style={FnaeduStyle} />
                    <div class="need-identification-answer-value">
                        <p>Liability towards family goes beyond the death of a person.</p>
                    </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={savemoney} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>You must decide the amount of savings before you spend money.</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
            </GridContainer>


            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <div>
                        <h3><b>2.  Key focus areas in my life are</b></h3>
                        <p class="need-identification-answer-note"><small>Select maximum of 2 things that is true about you</small></p><br />
                    </div>
                </GridItem>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={FNAEDU} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Ensuring my kids to receive best education available</p>

                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={fund} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Building a fund that will help me not to depend on my children during old age</p>
                        </div>


                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={Exercise} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Having regular exercise and better food intake</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={BuildingAssets} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Building assets so that my family can utilize even I am not there</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={FamilyTarget} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Saving money to achieve important family targets/milestones</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
            </GridContainer>

            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <div>
                        <h3><b>3. If I can achieve all the dreams in life, I would dream of</b></h3>
                        <p class="need-identification-answer-note"><small>Select maximum of 3 things that is true about you</small></p><br />
                    </div>
                </GridItem>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={FNAEDU} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>The graduation day of my son/daughter</p>

                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={OverSea} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Travelling overseas frequently after I retire</p>
                        </div>


                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={Healthy} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p> Enjoying each moment as a healthy person</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={Family} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>My family being secured from all misfortune</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={Coins} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Cash rich day where I am in full control</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
            </GridContainer>

            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <div>
                        <h3><b>4. I believe it is my duty to</b></h3>
                        <p class="need-identification-answer-note"><small>Select maximum of 4 things that is true about you</small></p><br />
                    </div>
                </GridItem>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={savemoney} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Build a reserve as an education fund for my children</p>

                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={MutualFund} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Build my own pension fund for retirement</p>
                        </div>


                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={HappyFamily} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p> Save money that will be used during an unforeseen health issue in the future </p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={SecretMoney} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p> Build a secret money reserve for my family when I am not there </p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={Savings} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>Save enough money to enjoy each life event fully</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
            </GridContainer>

            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <div>
                        <h3><b>5. I am least prepared for (only 2 things)</b></h3>
                        <p class="need-identification-answer-note"><small>Select maximum of 2 things that is true about you</small></p><br />
                    </div>
                </GridItem>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={UniversityDegree} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p>If my child requests me to sponsor a university degree program at a private university</p>

                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={Coins} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p> To cover up my financial needs at retirement</p>
                        </div>


                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={PhysicalDamage} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p> If I get into a bad health situation which I won’t be able to work for few weeks </p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={MutualFund} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p> With a lump sum for family if something bad happens to me </p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={Savings} alt="...." style={FnaeduStyle} />
                        <div class="need-identification-answer-value">
                            <p> Family events that require large amount of money (ex: wedding, foreign tour etc)</p>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <div>
                            <CustomCheckbox
                                name="Checked"
                                labelText=""
                                //value={props.Checked}
                                //onChange={(e) => props.handleChangeCalc(e)}
                                //checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
            </GridContainer>

            <GridContainer justify="center">
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