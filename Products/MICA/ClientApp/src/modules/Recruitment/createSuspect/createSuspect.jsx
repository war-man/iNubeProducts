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

class createSuspect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Suspect: {
                firstName: "",
                middleName: "",
                lastName: "",
                mobileNo: "",
                emailID: "",
            }
        };
    }
 onInputChange = (evt) => {
            const Data = this.state.Suspect;
            Data[evt.target.name] = evt.target.value;
            this.setState({ Data });

            console.log("Data", this.state.Suspect)

    }
    onFormSubmit = (evt) => {

        //fetch(`${LoadConfig.LoadConfigUrl}/api/Lead/SaveSuspect`, {
        //    method: 'POST',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //    body: JSON.stringify(this.state.Suspect)
        //}).then(response => response.json())
        //    .then(data => {
        //        if (data.status == 2) {
        //            debugger;
        //            this.reset();
        //            swal({

        //                //   title: "Perfect",

        //                //text: data.responseMessage,
        //                text: "Data Saved Successfully",
        //                icon: "success"
        //            });
        //            this.setState({ errormessage: false });
        //            //this.HandleApi();
        //            //this.setState({ redirect: true });
        //            //this.renderRedirect();
        //        } else if (data.status == 8) {

        //            swal({
        //                text: data.errors[0].errorMessage,
        //                icon: "error"
        //            });
        //        } else if (data.status == 4) {

        //            swal({
        //                text: data.errors[0].errorMessage,
        //                icon: "error"
        //            });
        //        }
        //    });
    }
        render() {

            const { classes } = this.props;

            return (
                <Card className="assignCard">
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={user} /></Icon>
                        </CardIcon>
                        {
                            <GridItem>
                                <h4>Create Suspect</h4>

                            </GridItem>
                        }
                    </CardHeader>

                    <CardBody>

                        <GridItem>
                            <GridContainer className="search-Product">

                                <GridContainer>

                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            success={this.FirstNameState === "success"}
                                            error={this.FirstNameState === "error"}
                                            labelText="First Name"
                                            name="firstName"
                                            required={true}
                                            onChange={this.onInputChange}
                                            value={this.state.Suspect.firstName}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            labelText="Middle Name"
                                            value={this.state.Suspect.middleName}
                                            name="middleName"
                                            onChange={this.onInputChange}
                                            id="MiddleName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            success={this.LastNameState === "success"}
                                            error={this.LastNameState === "error"}
                                            labelText="Last Name"
                                            name="lastName"
                                            required={true}
                                            onChange={this.onInputChange}
                                            value={this.state.Suspect.lastName}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            success={this.Mobile === "success"}
                                            error={this.Mobile === "error"}
                                            labelText="Mobile"
                                            name="mobileNo"
                                            required={true}
                                            onChange={this.onInputChange}
                                            value={this.state.Suspect.mobileNo}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>


                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            labelText="E-Mail"
                                            value={this.state.Suspect.emailID}
                                            name="emailID"
                                            onChange={this.onInputChange}
                                            id="Email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>


                                </GridContainer>
                                <GridContainer justify="center" >

                                </GridContainer>
                                <GridContainer justify="center">
                                    <GridItem >
                                        <div>

                                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleCreateSuspectdata} >
                                                Submit
                                               </Button>
                                            <Button id="cancelBtn" color="info" round className={classes.marginRight} onClick={this.handleCreateSuspectdata} >
                                                Cancel
                                               </Button>

                                        </div>
                                    </GridItem>
                                </GridContainer>        

                            </GridContainer>
                        </GridItem>
                    </CardBody>
                </Card>


            );
        }
    }
export default withStyles(style)(createSuspect);