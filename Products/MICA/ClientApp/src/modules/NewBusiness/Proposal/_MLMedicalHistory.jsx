import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "../../../components/Grid/GridContainer";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Questionnaires from "./Questionnaires.jsx";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/CustomButtons/Button.jsx";
import ReactTable from "react-table";
import CardBody from "components/Card/CardBody.jsx";






const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};
const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const MLMedicalHistory = (props) => {
    console.log("props", props);
    console.log("My Life Styleprops1", props.MedHistQuesDTO);
    let classes = props.classes;
    return (
        <div>
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    <h4>State of Health</h4>

                    <h5>
                        <p>Have you ever been investigated, treated or diagnosed, currently
                        receiving or intending to seek any medical advice for any of the
                        following conditions:</p>
                            </h5>
                </GridItem>
            </GridContainer>

            {/*Question1*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                     <p>1.{(props.MedHistQuesDTO[2] !== undefined) ? props.MedHistQuesDTO[2].questionText : ""}</p>
                    </h6>
                </GridItem>
            
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues1Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues1Yes"
                                name="radio1"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues1No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues1No"
                                name="radio1"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>


               
                {props.showMHQ1 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[53] !== undefined) ? props.MedHistQuesDTO[53].questionText : ""}
                        id="MHQ1.1"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}

                {props.showMHQ1 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[54] !== undefined) ? props.MedHistQuesDTO[54].questionText : ""}
                        id="MHQ1.2"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}

                {props.showMHQ1 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[55] !== undefined) ? props.MedHistQuesDTO[55].questionText : ""}
                        id="MHQ1.3"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}

                {props.showMHQ1 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[56] !== undefined) ? props.MedHistQuesDTO[56].questionText : ""}
                        id="MHQ1.4"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}

                {props.showMHQ1 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[57] !== undefined) ? props.MedHistQuesDTO[57].questionText : ""}
                        id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
              
              
            </GridContainer>
            {/*Question2*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                 
                    <h6>
                        <p>2.{(props.MedHistQuesDTO[3] !== undefined) ? props.MedHistQuesDTO[3].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues2Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues2Yes"
                                //name="radio1"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues2No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues2No"
                                //name="radio1"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>

                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[37] !== undefined) ? props.MedHistQuesDTO[37].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[38] !== undefined) ? props.MedHistQuesDTO[38].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[39] !== undefined) ? props.MedHistQuesDTO[39].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[40] !== undefined) ? props.MedHistQuesDTO[40].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[42] !== undefined) ? props.MedHistQuesDTO[41].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[43] !== undefined) ? props.MedHistQuesDTO[43].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[44] !== undefined) ? props.MedHistQuesDTO[44].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[45] !== undefined) ? props.MedHistQuesDTO[45].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[46] !== undefined) ? props.MedHistQuesDTO[46].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[47] !== undefined) ? props.MedHistQuesDTO[47].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[48] !== undefined) ? props.MedHistQuesDTO[48].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[49] !== undefined) ? props.MedHistQuesDTO[49].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[50] !== undefined) ? props.MedHistQuesDTO[50].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[51] !== undefined) ? props.MedHistQuesDTO[51].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
            </GridContainer>

         
            {/*Question3*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                        <p>3.{(props.MedHistQuesDTO[4] !== undefined) ? props.MedHistQuesDTO[4].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues3Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues3Yes"
                                //name="radio1"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues3No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues3No"
                                //name="radio1"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>

                {props.showMHQ3 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[61] !== undefined) ? props.MedHistQuesDTO[61].questionText : ""}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
            </GridContainer>

            {/*Question4*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                        <p>4.{(props.MedHistQuesDTO[5] !== undefined) ? props.MedHistQuesDTO[5].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues4Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues4Yes"
                                //name="radio4"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues4No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues4No"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>


                {props.showMHQ4 && <GridItem xs={12}>
                    <label>4.1 Please state the precise diagnosis, or nature of the condition that you are suffering from e.g Rheumatoid Arthritis, Osteoarthritis, Ank .Reiters Psoriatic Arthritis, etc</label>
                    <CustomInput
                        //labelText="4.1 Please state the precise diagnosis, or nature of the condition that you are suffering from e.g Rheumatoid Arthritis, Osteoarthritis, Ank .Reiters Psoriatic Arthritis, etc"
                        id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}

            </GridContainer>

            {/*Question5*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                        <p>5.{(props.MedHistQuesDTO[6] !== undefined) ? props.MedHistQuesDTO[6].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues5Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues5Yes"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues5No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues5No"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>

                
            </GridContainer>

            {/*Question6*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                        <p>6.{(props.MedHistQuesDTO[32] !== undefined) ? props.MedHistQuesDTO[32].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues6Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues6Yes"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues6No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues6No"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>
            </GridContainer>

            {/*Question7*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                        <p>7.{(props.MedHistQuesDTO[33] !== undefined) ? props.MedHistQuesDTO[33].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues7Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues7Yes"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues7No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues7No"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>
            </GridContainer>

            {/*Question8*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                        <p>8.{(props.MedHistQuesDTO[34] !== undefined) ? props.MedHistQuesDTO[34].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues8Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues8Yes"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues8No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues8No"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>
            </GridContainer>

            {/*Question9*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                        <p>9.{(props.MedHistQuesDTO[35] !== undefined) ? props.MedHistQuesDTO[35].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues9Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues9Yes"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "MHQues9No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues9No"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>
            </GridContainer>


            {/*Question10*/}
            <GridContainer lg={12}>
                <GridItem>
                    <h6>
                        <p>10.{(props.MedHistQuesDTO[36] !== undefined) ? props.MedHistQuesDTO[36].questionText : ""}</p>
                    </h6>
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues10Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues10Yes"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues10No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues10No"
                                //name="radio3"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>
            </GridContainer>
        </div>
    )
}
export default withStyles(style)(MLMedicalHistory);