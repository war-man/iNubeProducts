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
class ClaimDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false,
            coverName: "",
            coverEvent: ""
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
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Event Duration Value/Unit"
                            id="durationVal"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InputLabel className={classes.label}>Event Date/Time</InputLabel>
                        <br />
                        <FormControl fullWidth>
                            <Datetime
                                className="md-form-cal"
                                timeFormat={false}
                                inputProps={{ placeholder: "Event Date" }}
                            /><button style={dateStyle}><i className="fa fa-calendar fa-lg"></i></button>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Claim Status"
                            id="claimStatus"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Claim Amount(INR)"
                            id="claimAmt"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InputLabel className={classes.label}>Claim Paid On</InputLabel>
                        <br />
                        <FormControl fullWidth>
                            <Datetime
                                className="md-form-cal"
                                timeFormat={false}
                                inputProps={{ placeholder: "Claim Paid On" }}
                            /><button style={dateStyle}><i className="fa fa-calendar fa-lg"></i></button>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="UTR/NEFT Ref No"
                            id="refNo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InputLabel className={classes.label}>UTR/NEFT Date</InputLabel>
                        <br />
                        <FormControl fullWidth>
                            <Datetime
                                className="md-form-cal"
                                timeFormat={false}
                                inputProps={{ placeholder: "UTR/NEFT Date" }}
                            /><button style={dateStyle}><i className="fa fa-calendar fa-lg"></i></button>
                        </FormControl>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(style)(ClaimDetails);
