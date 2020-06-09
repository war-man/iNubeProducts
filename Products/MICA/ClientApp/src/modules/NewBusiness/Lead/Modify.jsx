import React from "react";
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Icon from "@material-ui/core/Icon";
import Pending from "assets/img/Pending.png";
import Button from "components/CustomButtons/Button.jsx";
import { Animated } from "react-animated-css";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";



const Modify = (props) => {

    let classes = props.classes;
    if (props.modifypage === "true") {
        props = props.props;
    }
    console.log("props.LeadDTO", props);
    console.log("prop.Address", props.LeadDTO[0].address);

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
               <Card className="assignCard">
              
                <CardBody>

                    <GridContainer>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.nicnoState === "success"}
                                error={props.nicnoState === "error"}
                                required={true}
                                labelText="Emirates ID"
                                id="emiratesId"
                                name="nicno"
                                value={props.LeadDTO[0].nicno}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Type"
                                id="LeadDTO.TypeId"
                                value={props.LeadDTO[0].contactTypeId}
                                lstObject={props.masterList}
                                required={true}
                                filterName='Type'
                                model="LeadDTO"
                                name='ContactTypeId'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Salutation"
                                id="LeadDTO.salutation"
                                value={props.LeadDTO[0].salutation}
                                lstObject={props.masterList}
                                required={true}
                                filterName='Salutation'
                                model="LeadDTO"
                                name='salutation'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                       
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.firstNameState === "success"}
                                error={props.firstNameState === "error"}
                                labelText="Given Name"
                                id="givenName"
                                name="firstName"
                                value={props.LeadDTO[0].firstName}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.lastNameState === "success"}
                                error={props.lastNameState === "error"}
                                labelText="Sur Name"
                                id="surName"
                                name="lastName"
                                value={props.LeadDTO[0].lastName}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.mobileNoState  === "success"}
                                error={props.mobileNoState === "error"}
                                labelText="Mobile"
                                id="mobile"
                                name="mobileNo"
                                value={props.LeadDTO[0].mobileNo}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.phoneNoState === "success"}
                                error={props.phoneNoState === "error"}
                                labelText="Home"
                                id="home"
                                name="phoneNo"
                                value={props.LeadDTO[0].phoneNo}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.workState  === "success"}
                                error={props.workState  === "error"}
                                labelText="Office"
                                id="office"
                                name="work"
                                value={props.LeadDTO[0].work}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.emailIDState  === "success"}
                                error={props.emailIDState  === "error"}
                                labelText="E-Mail"
                                id="email"
                                name="emailID"
                                value={props.LeadDTO[0].emailID}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.placeState === "success"}
                                error={props.placeState === "error"}

                                labelText="Place"
                                id="place"
                                name="place"
                                value={props.LeadDTO[0].place}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Gender"
                                id="LeadDTO.gender"
                                value={props.LeadDTO[0].gender}
                                lstObject={props.masterList}
                                filterName='Gender'
                                model="LeadDTO"
                                name='gender'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Marital Status"
                                id="LeadDTO.maritalStatusID"
                                value={props.LeadDTO[0].maritalStatusID}
                                lstObject={props.masterList}
                                filterName='MaritalStatus'
                                model="LeadDTO"
                                name='maritalStatusID'
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomDatetime
                                required={true}
                                success={props.dateOfBirthState  === "success"}
                                error={props.dateOfBirthState  === "error"}
                                value={props.LeadDTO[0].dateOfBirth}
                                labelText="Date Of Birth"
                                id='dob'
                                name='dateOfBirth' onChange={(e) => props.onDateChange("date", "dateOfBirth", e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>



                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.ageState === "success"}
                                error={props.ageState === "error"}
                                labelText="Age"
                                id="age"
                                name="age"
                                value={props.LeadDTO[0].age}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.occupationIDState === "success"}
                                error={props.occupationIDState === "error"}
                                labelText="Occupation"
                                id="occupation"
                                name="occupationID"
                                value={props.LeadDTO[0].occupationID}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                
        
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.monthlyIncomeState === "success"}
                                error={props.monthlyIncomeState === "error"}

                                labelText="Average Annual Income"
                                id="monthlyIncome"
                                name="monthlyIncome"
                                value={props.LeadDTO[0].monthlyIncome}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Currency"
                                id="LeadDTO.currency"
                                value={props.LeadDTO[0].currency}
                                lstObject={props.masterList}
                                filterName='Currency'
                                model="LeadDTO"
                                name='currency'
                                onChange={(e) => props.SetValue("string", e)}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.passportNoState === "success"}
                                error={props.passportNoState === "error"}
                                labelText="Passport"
                                id="passport"
                                name="passportNo"
                                value={props.LeadDTO[0].passportNo}
                                onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                    </GridContainer>


                </CardBody >


                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={Pending} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Communication Address </small>
                        </h4>
                    }
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.address1State === "success"}
                                error={props.address1State === "error"}
                                labelText="Address 1"
                                id="address1"
                                name="address1"

                                value={props.addressDTO.address1}
                                onChange={(e) => props.SetaddressValue("string", e)}

                                SetValue
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                required={true}
                                success={props.address2State === "success"}
                                error={props.address2State === "error"}
                                labelText="Address 2"
                                id="address2"
                                name="address2"
                                value={props.addressDTO.address2}
                                onChange={(e) => props.SetaddressValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.address3State === "success"}
                                error={props.address3State === "error"}
                                labelText="Address 3"
                                id="address3"
                                name="address3"
                                value={props.addressDTO.address3}
                                onChange={(e) => props.SetaddressValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <Dropdown labelText="Country" required={true} lstObject={props.LocationDTO.Country} value={props.addressDTO.countryId} name="countryId" onChange={(e) => props.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <Dropdown labelText="State" required={true} lstObject={props.LocationDTO.State} value={props.addressDTO.stateId} name="stateId" onChange={(e) => props.GetLocation('District', e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <Dropdown labelText="District" required={true}lstObject={props.LocationDTO.District} value={props.addressDTO.districtId} name="districtId" onChange={(e) => props.GetLocation('City', e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <Dropdown labelText="City" required={true}lstObject={props.LocationDTO.City} value={props.addressDTO.cityId} name="cityId" onChange={(e) => props.GetLocation('Pincode', e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <Dropdown labelText="Pincode" required={true} lstObject={props.LocationDTO.Pincode} value={props.addressDTO.areaId} name="areaId" onChange={(e) => props.GetLocation('', e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>

                        
                    </GridContainer>

                    <GridContainer lg={8} >
                        <GridItem xs={3}>
                            <Button color="info" round className="edit" onClick={props.modifySuspect}>Save</Button>
                        </GridItem>
                    </GridContainer>




                </CardBody>
                   
                        </Card>
                    </Animated>
                </GridItem>
            </GridContainer>
       </div>
         

    );



}

export default Modify;
