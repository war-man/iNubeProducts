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

class InterviewDetailsData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList:[],

        }
  
    }
   
    onDateChange = (format, name, event) => {
        //var today = event.toDate();
        //var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        //var date2 = new Date();
        //var date1 = new Date(today);
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
                                
                                <GridContainer>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Interview Level
"
                                            id="ChannelTypeId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            model="LeadDTO"
                                            name='contactTypeId'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Interviewer Code"
                                            id="ApplicationNoId"
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
                                            labelText="Interviewer Name"
                                            id="ApplicationNoId"
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
                                            labelText="Interview Result"
                                            id="ChannelTypeId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            model="LeadDTO"
                                            name='contactTypeId'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Refer To"
                                            id="ChannelTypeId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            model="LeadDTO"
                                            name='contactTypeId'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomDatetime
                                            required={true}
                                            //value={this.state.LeadDTO[0].dateOfBirth}
                                            labelText="Date Of Joining"
                                            id='AppointmentId'
                                            //name='dateofApplication'
                                            onChange={(e) => this.onDateChange(e)}
                                            formControlProps={{ fullWidth: true }} />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Career Level"
                                            id="ChannelTypeId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            model="LeadDTO"
                                            name='contactTypeId'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Position"
                                            id="ChannelTypeId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            model="LeadDTO"
                                            name='contactTypeId'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Designation"
                                            id="ChannelTypeId"
                                            //value={this.state.LeadDTO[0].contactTypeId}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName=''
                                            model="LeadDTO"
                                            name='contactTypeId'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Branch Code"
                                            id="ApplicationNoId"
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
                                            labelText="Report To"
                                            id="ApplicationNoId"
                                            //name="passportNo"
                                            //value={this.state.LeadDTO[0].passportNo}
                                            onChange={(e) => this.SetValue("passportNo", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify='center' >
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleCreateSuspectdata} >
                                            Save
                                               </Button>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>
            
            </div>
        );
    }
}

export default withStyles(styles)(InterviewDetailsData);
