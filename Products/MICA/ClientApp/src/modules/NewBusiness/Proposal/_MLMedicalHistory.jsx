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
import ReactTable from 'components/MuiTable/MuiTable.jsx';
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
    console.log("My Life Styleprops1", props.MedHistQuesDTO, props);
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
                   
                     <p>1. {(props.MedHistQuesDTO[2] !== undefined) ? props.MedHistQuesDTO[2].questionText : ""}</p>
                    
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


               
                {props.showMHQ1 &&
                    <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[53] !== undefined) ? props.MedHistQuesDTO[53].questionText : ""}
                        value={props.medicalHistoryDTO.Question1of1}
                        name='Question1of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.1"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    </GridItem>
                }

                {props.showMHQ1 &&
                    <GridItem xs={12}>
                    
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[54] !== undefined) ? props.MedHistQuesDTO[54].questionText : ""}
                        value={props.medicalHistoryDTO.Question1of2}
                        name='Question1of2'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.2"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    </GridItem>
                }

                {props.showMHQ1 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[55] !== undefined) ? props.MedHistQuesDTO[55].questionText : ""}
                        value={props.medicalHistoryDTO.Question1of3}
                        name='Question1of3'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.3"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}

                {props.showMHQ1 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[56] !== undefined) ? props.MedHistQuesDTO[56].questionText : ""}
                        value={props.medicalHistoryDTO.Question1of4}
                        name='Question1of4'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.4"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}

                {props.showMHQ1 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[57] !== undefined) ? props.MedHistQuesDTO[57].questionText : ""}
                        value={props.medicalHistoryDTO.Question1of5}
                        name='Question1of5'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
              
              
            </GridContainer>
            {/*Question2*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                  
                        <p>2. {(props.MedHistQuesDTO[3] !== undefined) ? props.MedHistQuesDTO[3].questionText : ""}</p>
                   
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
                        value={props.medicalHistoryDTO.Question2of1}
                        name='Question2of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ2.1"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[38] !== undefined) ? props.MedHistQuesDTO[38].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of2}
                        name='Question2of2'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[39] !== undefined) ? props.MedHistQuesDTO[39].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of3}
                        name='Question2of3'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[40] !== undefined) ? props.MedHistQuesDTO[40].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of4}
                        name='Question2of4'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[42] !== undefined) ? props.MedHistQuesDTO[41].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of5}
                        name='Question2of5'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[43] !== undefined) ? props.MedHistQuesDTO[43].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of6}
                        name='Question2of6'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[44] !== undefined) ? props.MedHistQuesDTO[44].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of7}
                        name='Question2of7'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[45] !== undefined) ? props.MedHistQuesDTO[45].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of8}
                        name='Question2of8'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[46] !== undefined) ? props.MedHistQuesDTO[46].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of9}
                        name='Question2of9'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[47] !== undefined) ? props.MedHistQuesDTO[47].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of10}
                        name='Question2of10'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[48] !== undefined) ? props.MedHistQuesDTO[48].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of11}
                        name='Question2of11'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[49] !== undefined) ? props.MedHistQuesDTO[49].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of12}
                        name='Question2of12'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[50] !== undefined) ? props.MedHistQuesDTO[50].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of13}
                        name='Question2of13'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}
                {props.showMHQ2 && <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[51] !== undefined) ? props.MedHistQuesDTO[51].questionText : ""}
                        value={props.medicalHistoryDTO.Question2of14}
                        name='Question2of14'
                        onChange={(e) => props.MHDetailsSetValue(e)}
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
                    
                        <p>3. {(props.MedHistQuesDTO[4] !== undefined) ? props.MedHistQuesDTO[4].questionText : ""}</p>
                    
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
                        value={props.medicalHistoryDTO.Question3of1}
                        name='Question3of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
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
                    
                        <p>4. {(props.MedHistQuesDTO[5] !== undefined) ? props.MedHistQuesDTO[5].questionText : ""}</p>
                   
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


                {props.showMHQ4 &&
                    <GridItem xs={12} sm={12} md={12}>

                    <CustomInput
                        labelText={(props.MedHistQuesDTO[7] !== undefined) ? props.MedHistQuesDTO[7].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of1}
                        name='Question4of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>}

                    {props.showMHQ4 &&
                    <GridItem xs={12} sm={12} md={12}>

                        <CustomInput
                            labelText={(props.MedHistQuesDTO[8] !== undefined) ? props.MedHistQuesDTO[8].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of2}
                        name='Question4of2'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>}

                {props.showMHQ4 &&
                    <GridItem xs={12} sm={12} md={12}>

                        <CustomInput
                            labelText={(props.MedHistQuesDTO[9] !== undefined) ? props.MedHistQuesDTO[9].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of3}
                        name='Question4of3'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>}

                {props.showMHQ4 &&
                    <GridItem>

                    <p>{(props.MedHistQuesDTO[10] !== undefined) ? props.MedHistQuesDTO[10].questionText : ""}</p>

                    <GridItem xs={12}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValueMH === "MHQues4.4Yes"}
                                    onChange={props.handleRadioChangeMH}
                                    value="MHQues4.4Yes"
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
                                    checked={props.selectedValueMH === "MHQues4.4No"}
                                    onChange={props.handleRadioChangeMH}
                                    value="MHQues4.4No"
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

                    </GridItem>
                }

                {props.show4MHQ4 &&
                    <GridItem>

                        <p>4. {(props.MedHistQuesDTO[11] !== undefined) ? props.MedHistQuesDTO[11].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.4.1Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.4.1Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.4.1No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.4.1No"
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

                    </GridItem>
                }
                {props.showMHQ4 &&
                    <GridItem xs={12} sm={12} md={12}>

                        <CustomInput
                            labelText={(props.MedHistQuesDTO[12] !== undefined) ? props.MedHistQuesDTO[12].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of5}
                        name='Question4of5'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>}
                {props.showMHQ4 &&
                    <GridItem xs={12} sm={12} md={12}>

                        <CustomInput
                            labelText={(props.MedHistQuesDTO[13] !== undefined) ? props.MedHistQuesDTO[13].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of6}
                        name='Question4of6'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>}

                {props.showMHQ4 &&
                    <GridItem>

                        <p>{(props.MedHistQuesDTO[14] !== undefined) ? props.MedHistQuesDTO[14].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.7Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.7Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.7No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.7No"
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

                    </GridItem>
                }
                {props.show4MHQ7 &&
                    <GridItem xs={12} sm={12} md={12}>

                        <CustomInput
                            labelText={(props.MedHistQuesDTO[15] !== undefined) ? props.MedHistQuesDTO[15].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of7of1}
                        name='Question4of7of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>}


                {props.showMHQ4 &&
                    <GridItem>

                        <p>{(props.MedHistQuesDTO[16] !== undefined) ? props.MedHistQuesDTO[16].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.8Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.8Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.8No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.8No"
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

                    </GridItem>
                }
                {props.show4MHQ8 &&
                    <GridItem xs={12} sm={12} md={12}>

                        <CustomInput
                            labelText={(props.MedHistQuesDTO[17] !== undefined) ? props.MedHistQuesDTO[17].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of8of1}
                        name='Question4of8of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>}

                {props.showMHQ4 &&
                    <GridItem>

                        <p>{(props.MedHistQuesDTO[18] !== undefined) ? props.MedHistQuesDTO[18].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.9Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.9Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.9No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.9No"
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

                    </GridItem>
                }
                {props.show4MHQ9 &&
                    <GridItem>
                    <p>{(props.MedHistQuesDTO[19] !== undefined) ? props.MedHistQuesDTO[19].questionText : ""}</p>

                    <GridItem xl={12} sm={4} md={3}>
                        <Button color="info"
                            round className={props.classes.marginRight}
                            onClick={props.handleCMAddButton}
                            id="saveBtn" >
                            Add Medicine Details
                                </Button>
                    </GridItem>

                    <GridItem lg={12}>
                       
                            <CardBody>

                                <ReactTable
                                data={props.CMdatatable}
                                    filterable
                                    columns={[
                                        {
                                            Header: "NAME OF MEDICATION",
                                            accessor: "nameOfMedication",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,

                                        },
                                        {
                                            Header: "DOSE",
                                            accessor: "dose",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "FREQUENCY",
                                            accessor: "frequency",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "DELETE",
                                            accessor: "actions",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },

                                    ]}
                                    defaultPageSize={10}
                                    showPaginationTop={false}
                                    // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                            </CardBody>
                    </GridItem>
                    </GridItem>
                }


                {props.showMHQ4 &&
                    <GridItem>

                        <p>{(props.MedHistQuesDTO[20] !== undefined) ? props.MedHistQuesDTO[20].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.10Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.10Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.10No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.10No"
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

                    </GridItem>
                }
                {props.show4MHQ10 &&
                    <GridItem>
                        <p>{(props.MedHistQuesDTO[21] !== undefined) ? props.MedHistQuesDTO[21].questionText : ""}</p>

                        <GridItem xl={12} sm={4} md={3}>
                            <Button color="info"
                                round className={props.classes.marginRight}
                            onClick={props.handleLMAddButton}
                                id="saveBtn" >
                                Add Medicine Details
                                </Button>
                        </GridItem>

                        <GridItem lg={12}>

                            <CardBody>

                                <ReactTable
                                data={props.LMdataTable}
                                    filterable
                                    columns={[
                                        {
                                            Header: "NAME OF MEDICATION",
                                            accessor: "nameOfMedication",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,

                                        },
                                        {
                                            Header: "DOSE",
                                            accessor: "dose",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "FREQUENCY",
                                            accessor: "frequency",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "DATE LAST TAKEN",
                                            accessor: "dateLastTaken",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "DELETE",
                                            accessor: "actions",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },

                                    ]}
                                    defaultPageSize={10}
                                    showPaginationTop={false}
                                    // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                            </CardBody>
                        </GridItem>
                    </GridItem>
                }


                {props.showMHQ4 &&
                    <GridItem>

                        <p>{(props.MedHistQuesDTO[22] !== undefined) ? props.MedHistQuesDTO[22].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.11Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.11Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.11No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.11No"
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

                    </GridItem>
                }
                {props.show4MHQ11 &&
                    <GridItem>
                        <p>{(props.MedHistQuesDTO[23] !== undefined) ? props.MedHistQuesDTO[23].questionText : ""}</p>

                        <GridItem xl={12} sm={4} md={3}>
                            <Button color="info"
                                round className={props.classes.marginRight}
                            onClick={props.handleTreatAddButton}
                                id="saveBtn" >
                                Add Medicine Details
                                </Button>
                        </GridItem>

                        <GridItem lg={12}>

                            <CardBody>

                                <ReactTable
                                data={props.TreatdataTable}
                                    filterable
                                    columns={[
                                        {
                                            Header: "NAME OF TREATMENT,TEST OR INVESTMENT",
                                            accessor: "nameOfTreatment",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,

                                        },
                                        {
                                            Header: "LOCATION",
                                            accessor: "location",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "DATE",
                                            accessor: "date",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "RESULT",
                                            accessor: "result",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "DELETE",
                                            accessor: "actions",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },

                                    ]}
                                    defaultPageSize={10}
                                    showPaginationTop={false}
                                    // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                            </CardBody>
                        </GridItem>
                    </GridItem>
                }

                {props.showMHQ4 &&
                    <GridItem>

                        <p>{(props.MedHistQuesDTO[24] !== undefined) ? props.MedHistQuesDTO[24].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.12Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.12Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.12No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.12No"
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

                    </GridItem>
                }
                {props.show4MHQ12 &&
                    <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.MedHistQuesDTO[25] !== undefined) ? props.MedHistQuesDTO[25].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of12of1}
                        name='Question4of12of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    </GridItem>
                }

                {props.showMHQ4 &&
                    <GridItem>
                        <p>{(props.MedHistQuesDTO[26] !== undefined) ? props.MedHistQuesDTO[26].questionText : ""}</p>

                        <GridItem xl={12} sm={4} md={3}>
                            <Button color="info"
                                round className={props.classes.marginRight}
                                onClick={props.handleDHCAddButton}
                                id="saveBtn" >
                                Add Details
                                </Button>
                        </GridItem>

                        <GridItem lg={12}>
                        {props.DHCdataTable.length > 0 &&
                            <CardBody>

                                <ReactTable
                                    data={props.DHCdataTable}
                                    filterable
                                    columns={[
                                        {
                                            Header: "NAME OF DOCTOR,HOSPITAL OR CLINIC",
                                            accessor: "nameOfDoctor",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,

                                        },
                                        {
                                            Header: "ADDRESS",
                                            accessor: "address",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "DATE OF LAST CONSULT",
                                            accessor: "dateOfLastConsult",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        },
                                        {

                                            Header: "DELETE",
                                            accessor: "actions",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                        }

                                    ]}
                                    defaultPageSize={10}
                                    showPaginationTop={false}
                                    // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                            </CardBody>
                        }
                        </GridItem>
                    </GridItem>
                }


                {props.showMHQ4 &&
                    <GridItem>

                        <p>{(props.MedHistQuesDTO[27] !== undefined) ? props.MedHistQuesDTO[27].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.14Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.14Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.14No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.14No"
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

                    </GridItem>
                }
                {props.show4MHQ14 &&
                    <GridItem xs={12}>
                        <CustomInput
                            labelText={(props.MedHistQuesDTO[28] !== undefined) ? props.MedHistQuesDTO[28].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of14of1}
                        name='Question4of14of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }

                {props.showMHQ4 &&
                    <GridItem>

                        <p>{(props.MedHistQuesDTO[29] !== undefined) ? props.MedHistQuesDTO[29].questionText : ""}</p>

                        <GridItem xs={12}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.selectedValueMH === "MHQues4.15Yes"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.15Yes"
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
                                        checked={props.selectedValueMH === "MHQues4.15No"}
                                        onChange={props.handleRadioChangeMH}
                                        value="MHQues4.15No"
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

                    </GridItem>
                }
                {props.show4MHQ15 &&
                    <GridItem xs={12}>
                        <CustomInput
                            labelText={(props.MedHistQuesDTO[30] !== undefined) ? props.MedHistQuesDTO[30].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of15of1}
                        name='Question4of15of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }

                {props.showMHQ4 &&
                    <GridItem xs={12}>
                        <CustomInput
                            labelText={(props.MedHistQuesDTO[31] !== undefined) ? props.MedHistQuesDTO[31].questionText : ""}
                        value={props.medicalHistoryDTO.Question4of16of1}
                        name='Question4of16of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }


            </GridContainer>

            {/*Question5*/}
            <GridContainer lg={12}>
                <GridItem>
                    
                        <p>5. {(props.MedHistQuesDTO[6] !== undefined) ? props.MedHistQuesDTO[6].questionText : ""}</p>
                   
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueMH === "MHQues5Yes"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues5Yes"
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
                                checked={props.selectedValueMH === "MHQues5No"}
                                onChange={props.handleRadioChangeMH}
                                value="MHQues5No"
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

            

            {props.showMHQ5 && <GridItem xs={12}>
                <CustomInput
                    labelText={(props.MedHistQuesDTO[61] !== undefined) ? props.MedHistQuesDTO[61].questionText : ""}
                        value={props.medicalHistoryDTO.Question5of1}
                        name='Question5of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                </GridItem>}
            </GridContainer>

            {/*Question6*/}
            <GridContainer lg={12}>
                <GridItem>
                    
                        <p>6. {(props.MedHistQuesDTO[32] !== undefined) ? props.MedHistQuesDTO[32].questionText : ""}</p>
                    
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
            

            {props.showMHQ6 && <GridItem xs={12}>
                <CustomInput
                    labelText={(props.MedHistQuesDTO[61] !== undefined) ? props.MedHistQuesDTO[61].questionText : ""}
                        value={props.medicalHistoryDTO.Question6of1}
                        name='Question6of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                </GridItem>}
            </GridContainer>

            {/*Question7*/}
            <GridContainer lg={12}>
                <GridItem>
                    
                        <p>7. {(props.MedHistQuesDTO[33] !== undefined) ? props.MedHistQuesDTO[33].questionText : ""}</p>
                   
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
            

            {props.showMHQ7 && <GridItem xs={12}>
                <CustomInput
                    labelText={(props.MedHistQuesDTO[61] !== undefined) ? props.MedHistQuesDTO[61].questionText : ""}
                        value={props.medicalHistoryDTO.Question7of1}
                        name='Question7of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                </GridItem>}
            </GridContainer>

            {/*Question8*/}
            <GridContainer lg={12}>
                <GridItem>
                    
                        <p>8. {(props.MedHistQuesDTO[34] !== undefined) ? props.MedHistQuesDTO[34].questionText : ""}</p>
                    
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
            

            {props.showMHQ8 && <GridItem xs={12}>
                <CustomInput
                    labelText={(props.MedHistQuesDTO[61] !== undefined) ? props.MedHistQuesDTO[61].questionText : ""}
                        value={props.medicalHistoryDTO.Question8of1}
                        name='Question8of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                </GridItem>}
            </GridContainer>

            {/*Question9*/}
            <GridContainer lg={12}>
                <GridItem>
                   
                        <p>9. {(props.MedHistQuesDTO[35] !== undefined) ? props.MedHistQuesDTO[35].questionText : ""}</p>
               
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
            

            {props.showMHQ9 && <GridItem xs={12}>
                <CustomInput
                    labelText={(props.MedHistQuesDTO[61] !== undefined) ? props.MedHistQuesDTO[61].questionText : ""}
                        value={props.medicalHistoryDTO.Question9of1}
                        name='Question9of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                </GridItem>}
            </GridContainer>


            {/*Question10*/}
            <GridContainer lg={12}>
                <GridItem>
                   
                        <p>10. {(props.MedHistQuesDTO[36] !== undefined) ? props.MedHistQuesDTO[36].questionText : ""}</p>
                    
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
            
            {props.showMHQ10 && <GridItem xs={12}>
                <CustomInput
                    labelText={(props.MedHistQuesDTO[61] !== undefined) ? props.MedHistQuesDTO[61].questionText : ""}
                        value={props.medicalHistoryDTO.Question10of1}
                        name='Question10of1'
                        onChange={(e) => props.MHDetailsSetValue(e)}
                        //id="MHQ1.5"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>}
            </GridContainer>
        </div>
    )
}
export default withStyles(style)(MLMedicalHistory);