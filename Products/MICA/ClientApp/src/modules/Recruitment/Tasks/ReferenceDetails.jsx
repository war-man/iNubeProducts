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

class ReferenceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],

        }
  
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer lg={12}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardBody>
                                <h3><b>Prospect Introduced By</b></h3>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Category"
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
                                            labelText="Code/EPF No"
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
                                            labelText="Name"
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
                                            labelText="Company"
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
                                            labelText="Designation"
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
                                            labelText="Relationship"
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
                                    </GridContainer>
                            </CardBody>
                            <CardBody>
                                <h3><b>Non-Related Reference Details 1</b></h3>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Name"
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
                                            labelText="Occupation"
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
                                            labelText="Mobile"
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
                                            labelText="Address1"
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
                                            labelText="Address2"
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
                                            labelText="Province"
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
                                            labelText="District"
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
                                            labelText="City/Town
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
                                            labelText="Pin Code"
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
                            </CardBody>
                            <CardBody>
                                <h3><b>Non-Related Reference Details 2</b></h3>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Name"
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
                                            labelText="Occupation"
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
                                            labelText="Mobile"
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
                                            labelText="Address1"
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
                                            labelText="Address2"
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
                                            labelText="Province"

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
                                            labelText="District"
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
                                            labelText="City/Town"
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
                                            labelText="Zip/Pin Code"
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

export default withStyles(styles)(ReferenceDetails);
