import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import BulkUpload from "./_BulkUpload.jsx";
import DataEntry from "./_DataEntry.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";


import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

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
    margin : "0 auto"
}

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioVal: "",
            entryFlag: false,
            bulkFlag: false,
            selectedValue : null
        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleRadioChange(e) {
        var rVal = e.target.value;
        this.setState({ selectedValue: e.target.value})
        if (rVal == "de") {
            this.setState({
                entryFlag: true,
                bulkFlag: false,
                
            })
        } else if (rVal == "bu") {
            this.setState({
                bulkFlag: true,
                entryFlag: false,
            })
        } else {}
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                   
                    <GridItem xs={12} sm={12} md={4} style={radioAlign}>
                        <div>
                            
                        <FormControlLabel
                                control={
                                    <Radio
                                        checked={this.state.selectedValue === "de"}
                                        onChange={this.handleRadioChange}
                                        value="de"
                                        name="radio button demo"
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
                                label="Data Entry"
                            />

                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={this.state.selectedValue === "bu"}
                                        onChange={this.handleRadioChange}
                                        value="bu"
                                        name="radio button demo"
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
                                label="Bulk Upload"
                            />
                        </div>
                </GridItem>
               
                </GridContainer>
                
                {this.state.bulkFlag ? <BulkUpload /> : null}
                {this.state.entryFlag ? <DataEntry /> : null}
               
            </div>
        );
    }
}

export default withStyles(style)(Customer);
