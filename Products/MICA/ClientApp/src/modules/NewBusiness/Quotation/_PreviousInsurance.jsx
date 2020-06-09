import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";




class RegularForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [24, 22],
            selectedValue: null,
            selectedEnabled: "b"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
    }
    handleChange(event) {
        this.setState({ selectedValue: event.target.value });
    }
    handleChangeEnabled(event) {
        this.setState({ selectedEnabled: event.target.value });
    }
    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
              
                        

                <GridContainer>
                              
                       
                                    <CardHeader color="rose" icon>
                                    
                                    </CardHeader>
                        <CardBody>
                            <GridItem xs={6} sm={6} md={4}>
                             
                            </GridItem>

                                    </CardBody>
                                

                            </GridContainer>
              </div>
                          
        );
    }
}

export default withStyles(regularFormsStyle)(RegularForms);
