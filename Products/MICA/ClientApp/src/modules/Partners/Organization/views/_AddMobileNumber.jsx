import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import profileStyles from "./profileStyles.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

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
    ...profileStyles,
    ...customCheckboxRadioSwitch
};



class AddMobileNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.removeMobile = this.removeMobile.bind(this);
    }

    removeMobile() {
        var val = document.getElementById('mblNumb');
        val.remove();
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer id="mblNumb">
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Mobile Number"
                        id="mblNumbers"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem><button className={classes.minus} onClick={this.removeMobile.bind(this)}><i className="fa fa-minus-circle fa-lg"></i></button>
            </GridContainer>

        );
    }
}

export default withStyles(style)(AddMobileNumber);
