import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import user from "assets/img/user.png";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import { Animated } from "react-animated-css";

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

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}




class SuspectEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: "",
            MiddleName: "",
            LastName: "",
            Mobile: "",
            Email: "",
        };
    }
    render() {

        const { classes } = this.props;

        return (
            <div>
                <Card className="assignCard">

                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={user} /></Icon>
                        </CardIcon>
                        {
                            <GridItem>
                                <h4>Schedule Interview</h4>


                            </GridItem>
                        }
                    </CardHeader>


                    <CardBody>

                        <GridContainer>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    success={this.FirstNameState === "success"}
                                    error={this.FirstNameState === "error"}
                                    labelText="First Name"
                                    name="FirstName"
                                    required={true}
                                    onChange={(e) => this.detailsChange("string", e)}
                                    value={this.FirstName}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                       
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    success={this.LastNameState === "success"}
                                    error={this.LastNameState === "error"}
                                    labelText="Last Name"
                                    name="LastName"
                                    required={true}
                                    onChange={(e) => this.detailsChange("string", e)}
                                    value={this.LastName}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Mobile Number"
                                    //value={props.ProductDTO.ProductName}
                                    name="NIC"
                                    //onChange={props.SetValue}
                                    id="NIC"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime required={true} onFocus={this.onClick} validdate={this.validdate} labelText="Date" id='dob' name='dob' onChange={(evt) => this.onDateChange('datetime', 'ProductDTO', 'activeFrom', evt)} formControlProps={{ fullWidth: true }} />
                            </GridItem>


                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    success={this.Age === "success"}
                                    error={this.Age === "error"}
                                    labelText="Time "
                                    name="Age"
                                    required={true}
                                    onChange={(e) => this.detailsChange("string", e)}
                                    value={this.Age}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridContainer justify="center">
                            <GridItem>
                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleCreateSuspectdata} >
                                Save
                                               </Button>
                                </GridItem>
                               
                            </GridContainer>
                        </GridContainer>
                    </CardBody>
                </Card>

               

            </div>

        );
    }
}
export default withStyles(style)(SuspectEdit);