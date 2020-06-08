import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";

    

const styles = {
    cardTitle,
    pageSubcategoriesTitle: {
        color: "#3C4858",
        textDecoration: "none",
        textAlign: "center"
    },
    cardCategory: {
        margin: "0",
        color: "#999999"
    }

    

};
const homeBtn = {
    marginLeft: "250px",
    height: "35px",
    textAlign: "center",
    backgroundColor: "#1068ac",
    color: "white"
}

class PersonalDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
            masterList: [],
        }
  
    }

    SetValue = (type, event) => {
        //let LeadDTO = this.state.LeadDTO;
        //let name = event.target.name;
        //let value = event.target.value;
        //LeadDTO[0][name] = value;
        //this.setState({ LeadDTO });
        //this.change(event, name, type);

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer lg={12}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardBody>
                                <h3><b>Personal Details</b></h3>
                                <GridContainer>


                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Title"
                                            id="TitleId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            //model="LeadDTO"
                                            //name='contactTypeId'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="First Name"
                                            id="FirstNameId"
                                            //name="passportNo"
                                            //value={this.state.LeadDTO[0].passportNo}
                                            onChange={(e) => this.SetValue("passportNo", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Middle Name"
                                            id="MiddleNameId"
                                            //name="passportNo"
                                            //value={this.state.LeadDTO[0].passportNo}
                                            onChange={(e) => this.SetValue("passportNo", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Last Name"
                                            id="LastNameId"
                                            //name="passportNo"
                                            //value={this.state.LeadDTO[0].passportNo}
                                            onChange={(e) => this.SetValue("passportNo", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomDatetime
                                            required={true}
                                            //value={this.state.LeadDTO[0].dateOfBirth}
                                            labelText="Date Of Birth"
                                            id='AppointmentId'
                                            //name='dateofApplication'
                                            onChange={(e) => this.onDateChange(e)}
                                            formControlProps={{ fullWidth: true }} />

                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Gender"
                                            id="GenderId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            //model="LeadDTO"
                                            //name='contactTypeId'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Marital Status"
                                            id="MaritalStatusId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            //model="LeadDTO"
                                            //name='contactTypeId'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                               </GridContainer>
                            </CardBody>
                            <CardBody>
                                <h3><b>Other Details</b></h3>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Nationality"
                                            id="TitleId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            //model="LeadDTO"
                                            //name='contactTypeId'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="NIC"
                                            id="FirstNameId"
                                            //name="passportNo"
                                            //value={this.state.LeadDTO[0].passportNo}
                                            onChange={(e) => this.SetValue("passportNo", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Profession"
                                            id="TitleId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            //model="LeadDTO"
                                            //name='contactTypeId'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Sales Experience"
                                            id="TitleId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            //model="LeadDTO"
                                            //name='contactTypeId'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Industry Experience"
                                            id="TitleId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            //model="LeadDTO"
                                            //name='contactTypeId'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="SLII Registration No"
                                            id="FirstNameId"
                                            //name="passportNo"
                                            //value={this.state.LeadDTO[0].passportNo}
                                            onChange={(e) => this.SetValue("passportNo", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify='center'>
                                    <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleCreateSuspectdata} >
                                        Save
                                               </Button>
                                    </GridContainer>
                                </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>
            
            </div>
        );
    }
}

export default withStyles(styles)(PersonalDetails);
