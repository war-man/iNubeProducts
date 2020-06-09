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

const SpouseMedicalHistory = (props) => {
    console.log("props", props);
    let classes = props.classes;
    return (
        <div>
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    <h3>State of Health </h3>

                    <h5>Have you ever been investigated, treated or diagnosed, currently
                        receiving or intending to seek any medical advice for any of the
                        following conditions:</h5>
                </GridItem>
            </GridContainer>

            {/*Question1*/}
            <GridContainer lg={12}>

                <GridItem xs={12}>
                    1.Are you pregnant at present ?
                    </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question2*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    2. Have you been advised of or treated for any complicaions in your previous pregnancies or 
                    have you suffered from any diseaseof the uterus appendage, breast or any other disorder of
                    the female organ ?

                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question3*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    3. Diabetes mellitus, high blood sugar levels or sugar in urine?

                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question4*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    4. Asthma, tuberculosis, chronic cough, chronic bronchitis, emphysema, pneumonia
                    or any other disease of the respiratory system

                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question5*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    5. High blood pressure, Angina, chest pain, heart attack, heart murmur, rheumatic 
                    fever, shortness of breath or any other heart condition, Stroke, paralysis, transient 
                    ischemic attack

                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question6*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    6.Rheumatic arthritis, joint disease, persistent neck/back pain, Osteoporosis, bone disorders,
                    muscular dystrophies or any physical deformity or congenital birth defects

                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question7*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    7. Cancer, tumor, leukemia, enlarged lymph nodes or any abnormal growth or any 
                    hormonal disorders or disorders of the blood and lymphatic system, thalassaemia,
                    eyes, ear, nose, throat
                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question8*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    8.Any nervous or mental disorder, epilepsy, head injury, tremors, dizzy
                    or fainting spells, blurred or double vision, anxiety, depression, nervous
                    breakdown ?
                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question9*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    9.Recurrent indigestion, gastritis, ulcer, jaundice, hepatitis B or C, liver cirrhosis, kidney
                    stone, kidney failure or any other disease of the stomach, bowels, liver, kidney, urinary bladder,
                    urinary tract infection, hernia, prostate or reproductive system ?
 
 
                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>


            {/*Question10*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    10. Any other medical condition, illnesses, diseases, disorders, disability, surgery or treatment not
                    specifically mentioned above such as but not limited to hyperthyroidism or hypothyroidism ?

                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>


            {/*Question11*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    11.  Have you or your spouse ever tested positive or treated for any sexually transmitted 
                    disease, HIV/AIDS or are you awaiting results of such a test ?

                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

            {/*Question12*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    12.   Are you currently receiving or in the past 5 years received any medical treatment, 
                    medical observation, hospitalized, undergone surgical operation, been advised to seek 
                    treatment or to undergo further tests to confirm a medical impairment/ Have you ever received 
                    or donated blood or been refused as a blood donor?

                        </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "TabacoYes"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoYes"
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
                                checked={props.selectedValue === "TabacoNo"}
                                onChange={props.handleRadioChangeT}
                                value="TabacoNo"
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
            </GridContainer>

        </div>
    )
}
export default withStyles(style)(SpouseMedicalHistory);