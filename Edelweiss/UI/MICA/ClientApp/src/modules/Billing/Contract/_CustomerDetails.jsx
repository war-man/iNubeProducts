import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from "react-table";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import partnerconfig from "modules/Partners/PartnerConfig.js";
import Dropdown from "components/Dropdown/Dropdown.jsx";

const CustomerDetails =(props)=> {
    
        return (
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Customer Details </small>
                        </h4>
                    }
                </CardHeader>

                <CardBody>

                    <div>

                        <GridContainer>

                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Customer Name"
                                    name="CustomerName"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </CardBody>
           

           
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Customer Registered Address </small>
                        </h4>
                    }
                </CardHeader>

                <CardBody>

                    <div>

                        <GridContainer>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Address Line 1"
                                    name="AddressLine1"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Address Line 2"
                                    name="AddressLine2"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Address Line 3"
                                    name="AddressLine3"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                           
                            <GridItem xs={12} sm={4}>
                                <Dropdown labelText="Country" id="OrganizationDTO.countryId" required={true} lstObject={props.LocationDTO.Country} value={props.addressDTO.countryId} name="countryId" onChange={(e) => this.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            
                                <GridItem xs={12} sm={4}>
                                    <Dropdown labelText="State" id="OrganizationDTO.stateId" required={true} lstObject={props.LocationDTO.State} value={props.addressDTO.stateId} name="stateId" onChange={(e) => this.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />

                                </GridItem>

                               <GridItem xs={12} sm={4}>
                                <Dropdown labelText="District" id="OrganizationDTO.districtId" required={true} lstObject={props.LocationDTO.District} value={props.addressDTO.districtId} name="districtId" onChange={(e) => this.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />

                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <Dropdown labelText="City" id="OrganizationDTO.cityId" required={true} lstObject={props.LocationDTO.City} value={props.addressDTO.cityId} name="cityId" onChange={(e) => this.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />

                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <Dropdown labelText="Pincode" id="OrganizationDTO.pincodeId" required={true} lstObject={props.LocationDTO.Pincode} value={props.addressDTO.pincodeId} name="pincodeId" onChange={(e) => this.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />

                            </GridItem>
                           
                            <GridItem xs={3} sm={3} md={3}>
                                <Button id="round" style={{ marginTop: '25px' }} color="danger" > Cancel  </Button>
                                <Button id="round" style={{ marginTop: '25px' }} color="info"> Next  </Button>
                            </GridItem>

                        </GridContainer>
                    </div>
                </CardBody>
            </Card>

            
            );



    }




export default CustomerDetails;
