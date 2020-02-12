import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import profileStyles from "./profileStyles.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import $ from 'jquery';

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



class AddEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.removeEmail = this.removeEmail.bind(this);
    }

    removeEmail() {
        var val = document.getElementById('emailId');
        val.remove();
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer id="emailId">
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Email Id"
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem><button className={classes.minus} onClick={this.removeEmail.bind(this)}><i className="fa fa-minus-circle fa-lg"></i></button>
            </GridContainer>

        );
    }
}

export default withStyles(style)(AddEmail);
