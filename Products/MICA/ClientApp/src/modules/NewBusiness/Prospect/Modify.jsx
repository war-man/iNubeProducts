import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import profileDetails from "assets/img/profile-details.png";
import Icon from "@material-ui/core/Icon";
import { withStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
//import ProspectInfo from "./_ProspectInfo"; 
import InputAdornment from "@material-ui/core/InputAdornment";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Button from "components/CustomButtons/Button.jsx";
import NeedAnalysis from "./NeedAnalysis.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";

const Modify =(props)=> {

    let classes = props.classes;
  
       
    return (
        <div>
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={PermIdentity} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Prospect Information </small>
                        </h4>
                    }
                </CardHeader>

            <CardBody>
               
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}

                                    labelText="Emirates ID"
                                    id="EmiratesId"
                                name="EmiratesId"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.EmiratesId}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                      
                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="Type"
                                id="ContactsDTO.TypeId"
                                value={props.ContactsDTO.ContactTypeId}
                                lstObject={props.masterList}
                                required={true}
                                filterName='Type'
                                model="ContactsDTO"
                                name='ContactTypeId'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>



                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="Salutation"
                                id="ContactsDTO.SalutationId"
                                value={props.ContactsDTO.Salutation}
                                lstObject={props.masterList}
                                required={true}
                                filterName='Salutation'
                                model="ContactsDTO"
                                name='Salutation'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                      

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}

                                    labelText="Given Name"
                                    id="GivenName"
                                   name="GivenName"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.GivenName}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}
                                    labelText="Sur Name"
                                    id="SurName"
                                   name="SurName"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.SurName}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}

                                    labelText="Mobile"
                                    id="MobileNo "
                                    name="MobileNo"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.MobileNo}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Home"
                                    id="Home"
                                    name="Home"
                                   onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.Home}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Office"
                                       id="Office"
                                     name="Office"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.Office}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}

                                    labelText="E-Mail"
                                    id="Email"
                                   name="Email"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.Email}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}

                                labelText="Place"
                                id="Place"
                                name="Place"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.Place}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="Gender"
                                id="ContactsDTO.GenderId"
                                value={props.ContactsDTO.Gender}
                                lstObject={props.masterList}
                                required={true}
                                filterName='Gender'
                                model="ContactsDTO"
                                name='Gender'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="MaritialStatus"
                                id="ContactsDTO.MaritialStatusId"
                                value={props.ContactsDTO.MaritialStatus}
                                lstObject={props.masterList}
                                required={true}
                                filterName='MaritialStatus'
                                model="ContactsDTO"
                                name='MaritialStatus'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                          

                            <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime required={true} onFocus={props.onClick}  validdate={props.validdate} labelText="Date Of Birth" id='dob' name='dob' onChange={(evt) => props.onDateChange('datetime', 'ProductDTO', 'activeFrom', evt)} formControlProps={{ fullWidth: true }} />
                            </GridItem>


                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}

                                    labelText="Age"
                                       id="Age"
                                     name="Age"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.Age}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}

                                    labelText="Occupation"
                                    id="Occupation"
                                     name="Occupation"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.Occupation}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                required={true}

                                    labelText="Average Annual Income"
                                     id="AverageAnnualIncome"
                                   name="AverageAnnualIncome"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.AverageAnnualIncome}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="Currency"
                                id="ContactsDTO.CurrencyId"
                                value={props.ContactsDTO.Currency}
                                lstObject={props.masterList}
                                required={true}
                                filterName='Currency'
                                model="ContactsDTO"
                                name='Currency'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                                         
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Passport"
                                     id="Passport"
                                    name="Passport"
                                onChange={(e) => props.SetValue("string", e)}
                                value={props.ContactsDTO.Passport}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                                            </GridContainer>
                                      </CardBody >
                  <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={PermIdentity} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Communication Address </small>
                        </h4>
                    }
                </CardHeader>
                <CardBody>
                    <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                                required={true}

                        labelText="Address 1"
                        id="address1"
                        name="address1"
                                //onChange={(e) => props.SetValue("string", e)}
                                //value={props.ContactsDTO.Passport}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                                required={true}

                            labelText="Address 2"
                            id="address2"
                            name="address2"
                            //value={this.state.PartnerSearchDTO.partnerCode}
                            //onChange={this.onInputChange}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          
                            labelText="Address 3"
                            id="address3"
                            name="address3"
                            //value={this.state.PartnerSearchDTO.partnerCode}
                            //onChange={this.onInputChange}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                                required={true}

                            labelText="Postal Code | City"
                            id="postalCode|city"
                            name="postalCose|city"
                            //value={this.state.PartnerSearchDTO.partnerCode}
                            //onChange={this.onInputChange}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                                required={true}

                            labelText="District "
                            id="district"
                            name="district"
                            //value={this.state.PartnerSearchDTO.partnerCode}
                            //onChange={this.onInputChange}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                                required={true}

                            labelText="Province"
                            id="province"
                            name="province"
                            //value={this.state.PartnerSearchDTO.partnerCode}
                            //onChange={this.onInputChange}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                        </GridItem>
                    </GridContainer>

                   <div>
                        <Button color="info" round className="edit" onClick={props.handleClose}>Save</Button>
                    </div>
                </CardBody>

            </Card>

            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={PermIdentity} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Prospect Information </small>
                        </h4>
                    }
                </CardHeader>
                <CardBody>
                    <GridContainer lg={12} justify="center">
                        <GridItem xs={12}>
                            <Accordion
                                active={0}
                                collapses={[
                                   
                                    {
                                        title: "Need Analysis",
                                        content: <NeedAnalysis props={props} />

                                    }
                                ]}
                            />
                        </GridItem>
                    </GridContainer>

               </CardBody>
                  
            </Card>
        </div>
        );
    


            }

 export default Modify;
