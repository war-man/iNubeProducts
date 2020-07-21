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

const MLFamilyBackGround = (props) => {
    console.log("props", props);
    console.log("My Life Styleprops2", props.FBQuesDTO);
    let classes = props.classes;
    return (
        <div>
            
            {/*Question1*/}
            <GridContainer lg={12}>
                <GridItem>
               
                    <p>   1. {(props.FBQuesDTO[0] !== undefined) ? props.FBQuesDTO[0].questionText : ""}</p>
                  
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
export default withStyles(style)(MLFamilyBackGround);