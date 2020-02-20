import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import Favorite from "@material-ui/icons/Favorite";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";


import FormControlLabel from "@material-ui/core/FormControlLabel";
import Datetime from "react-datetime";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


import Heading from "components/Heading/Heading.jsx";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";


class Premium extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedA: true,
            checkedB: false,
            simpleSelect: "",
            simpleeSelect: "",
            productStatus: "",
            partnertype: "",
            partnername: "",
            partnerid: "",
            multipleSelect: [],
            tags: ["pizza", "pasta", "parmesan"]
        };
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

            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Premium Amount"
                        id="gstnumber"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}
export default withStyles(extendedFormsStyle)(Premium);