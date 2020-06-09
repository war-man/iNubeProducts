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
import Wizard from "components/Wizard/Wizard.jsx";
import ReactTable from "react-table";

const SpouseDetails = (props) => {

    console.log("SpouseDetails",props);
 //   const spouseprops = props.componentData;

    return (
        <GridContainer lg={12}>

           
                        <GridItem xs={6} sm={6} md={3}>

                            <CustomInput
                                labelText="Spouse Given Name"
                                name=''
                                id=""
                              //  onChange={(e) => this.handleQuoteChange("", e)}

                                formControlProps={{
                                    fullWidth: true
                                }}

                            />
                        </GridItem>

                        <GridItem xs={6} sm={6} md={3}>

                            <CustomInput
                                labelText="Spouse Emirate Id "
                                name=''
                                id=""
                               // onChange={(e) => this.handleQuoteChange("", e)}

                                formControlProps={{
                                    fullWidth: true
                                }}

                            />
                        </GridItem>


                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Gender"
                                id="LeadDTO.gender"
                    value={props.SpouseMaster[0].gender}
                    lstObject={props.SpouseMaster}
                                filterName='Gender'
                    model="SpouseMaster"
                                name='gender'
                                //onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>



                        <GridItem xs={12} sm={12} md={3}>
                            <CustomDatetime
                                required={true}
                                success={props.dateOfBirthState === "success"}
                                error={props.dateOfBirthState === "error"}
                    value={props.SpouseMaster[0].dateOfBirth}
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
                    value={props.SpouseMaster[0].age}
                                ///onChange={(e) => props.SetValue("string", e)}
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
                    value={props.SpouseMaster[0].occupationID}
                               // onChange={(e) => props.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>




            </GridContainer>


    );



}

export default SpouseDetails;
