import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

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

const dateStyle = {
    width: "max-content",
    marginLeft: "180px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}
class CoverDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false,
            coverName: "",
            coverEvent : ""
        };
    }
    sendState() {
        return this.state;
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
   
    render() {
        const { classes } = this.props;
        return (
            <div>
                <h4 style={{ color: '#407ba4' }}>Insured/Member Details</h4>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                            <InputLabel
                                htmlFor="cover-name"
                                className={classes.selectLabel}
                            >
                                Cover 
                  </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select
                                }}
                                value={this.state.coverName}
                                onChange={this.handleSimple}
                                inputProps={{
                                    name: "coverName",
                                    id: "cover-name"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                   Cover Name
                    </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value="2"
                                >
                                    Paris
                    </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value="3"
                                >
                                    Bucharest
                    </MenuItem>
                            </Select>
                        </FormControl>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                            <InputLabel
                                htmlFor="cover-name"
                                className={classes.selectLabel}
                            >
                                Cover Event
                  </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select
                                }}
                                value={this.state.coverEvent}
                                onChange={this.handleSimple}
                                inputProps={{
                                    name: "coverEvent",
                                    id: "cover-event"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    Cover Event
                    </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value="2"
                                >
                                    option 1
                    </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value="3"
                                >
                                    option 2
                    </MenuItem>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Cover Event Factor"
                            id="ceFactor"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                 

                </GridContainer>
               
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Cover Period/Unit"
                            id="coverUnit"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Cover Event Factor Value From"
                            id="ceValFrom"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Cover Event Factor Value To"
                            id="ceValTo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <InputLabel className={classes.label}>Cover Effective From</InputLabel>
                        <br />
                        <FormControl fullWidth>
                            <Datetime
                                timeFormat={false}
                                inputProps={{ placeholder: "Cover Effective From" }}
                            /><button style={dateStyle}><i className="fa fa-calendar fa-lg"></i></button>
                        </FormControl>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(style)(CoverDetails);
