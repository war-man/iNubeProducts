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
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

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

const PartialMemberDetails = (props) => {

    const { classes } = props;
    console.log("CheckingProps", props, props.PolicyOwnerDetailsDto, props.tblPolicyMemberDetails[0])

    return (
        <div>

            <CardBody>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <div style={{ marginTop: "24px" }}>
                            Is Prosper Same As Life To Be Assured?
                                    <FormControlLabel
                                control={
                                    <Radio

                                        checked={props.singleValueSelected === "0"}
                                        onChange={(e) => { props.handleRadioChange(e) }}
                                        value={0}
                                        name="radio button demo"
                                        aria-label="B"
                                        icon={
                                            <FiberManualRecord
                                                className={classes.radioUnchecked}
                                            />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord
                                                className={classes.radioChecked}
                                            />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="yes"
                            />

                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={props.singleValueSelected === "1"}
                                        onChange={(e) => { props.handleRadioChange(e) }}
                                        value={1}
                                        name="radio button demo"
                                        aria-label="B"
                                        icon={
                                            <FiberManualRecord
                                                className={classes.radioUnchecked}
                                            />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord
                                                className={classes.radioChecked}
                                            />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="No"
                            />
                        </div>
                    </GridItem>

                    {
                        props.singleValueSelectedProposer === "1" ?
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Please Select Relationship"
                                    // id="LeadDTO.gender"
                                    value={props.singleValueSelectedProposer === "0" ? "" : props.tblPolicyMemberDetails.relationShipWithProposer}
                                    lstObject={props.MasterDataDto}
                                    filterName='Relationshipwiththepolicyowner'
                                    //  model="LeadDTO"
                                    name='relationShipWithProposer'
                                    onChange={(e) => props.MasterSetValue(e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            : null
                    }

                    <GridContainer lg={12}>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                //success={props.Salutation === "success"}
                                //error={props.Salutation === "error"}
                                disabled={(props.singleValueSelectedProposer === "0")?true:false}
                                labelText="Salutation "
                                value={props.singleValueSelectedProposer === "1" ? ""  : props.tblPolicyMemberDetails.salutation}
                                name="salutation"
                                required={true}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                //props.singleValueSelectedProposer === "0" ? "" :
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="Name With Initials"
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.nameWithInitial}
                                name="nameWithInitial"
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                id="NameWithInitials"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.GivenName === "success"}
                                error={props.GivenName === "error"}
                                labelText="Given Name"
                                disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                                name="givenName"
                                required={true}
                                value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.givenName}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                //success={props.surName === "success"}
                                //error={props.surName === "error"}
                                disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                                labelText="Sur Name"
                                name="surname"
                                required={true}
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.surname}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.EmiratesId === "success"}
                                error={props.EmiratesId === "error"}
                                disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                                labelText="Emirates Id"
                                name="emiratesId"
                                required={true}
                                // value={props.singleValueSelectedProposer === "1" ? "" : props.SaveProposalDto.tblPolicyMemberDetails.nameWithInitial}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomDatetime required={true}
                                onFocus={props.onClick}
                                disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                                validdate={props.validdate}
                                labelText="Date Of Birth"
                                id='dob'
                                name='dob'
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.dob}
                                onChange={(evt) => props.DateChange('dob', evt)}
                                formControlProps={{ fullWidth: true }} />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.Age === "success"}
                                error={props.Age === "error"}
                                disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                                labelText="Age "
                                name="age"
                                required={true}
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.age}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Gender"
                                disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.gender}
                                onChange={(e) => props.MasterSetValue(e)}
                                lstObject={props.MasterDataDto}
                                filterName='Gender'
                                name='gender'
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>





                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Marital Status"
                                disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.maritialStatus}
                                onChange={(e) => props.MasterSetValue(e)}

                                lstObject={props.MasterDataDto}
                                filterName='MaritalStatus'

                                name='maritialStatus'

                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Occupation"
                                disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                                //value={props.singleValueSelectedProposer === "0" ? "" : props.tblPolicyMemberDetails[0].occupationId}
                                onChange={(e) => props.MasterSetValue(e)}

                                lstObject={props.MasterDataDto}

                                filterName='Occupation'
                                //  model="LeadDTO"
                                name='occupationId'

                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                success={props.AnnualIncome === "success"}
                                error={props.AnnualIncome === "error"}
                                labelText="Annual Income "
                                name="annualIncome"
                                required={true}
                                disabled={(props.singleValueSelectedProposer === "0")?true:false}
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.annualIncome}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="PassportNumber"

                                name="passportNumber"
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.passportNumber}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                id="PassportNumber"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="Name Of Employee"
                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.nameWithInitial}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                name="nameWithInitial"

                                id="NameOfEmployee"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Nationality"

                                value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.nationality}
                                onChange={(e) => props.MasterSetValue(e)}
                                lstObject={props.MasterDataDto}
                                filterName='Country'

                                name='nationality'

                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Country Of Residence"
                                // id="LeadDTO.gender"
                                //value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.residentialNationality}
                                value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.nationality}
                                onChange={(e) => props.MasterSetValue(e)}
                                lstObject={props.MasterDataDto}
                                filterName='Country'
                                //  model="LeadDTO"
                                name='residentialNationality'

                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Age Proof"
                                // id="LeadDTO.gender"
                                // value={[]}
                                lstObject={props.MasterDataDto}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                filterName='AgeProofList'

                                name='ageProof'

                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>



                        <GridItem xs={12} sm={12} md={4}>
                            <div style={{ marginTop: "24px" }}>
                                Occupation Requires Any Harzadous Work?
                                    <FormControlLabel
                                    control={
                                        <Radio

                                            checked={props.singleValueSelected === "0"}
                                            onChange={(e) => { props.handleRadioChange(e) }}
                                            //value={0}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="yes"
                                />

                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={props.singleValueSelected === "1"}
                                            onChange={() => { props.handleRadioChange() }}
                                            value={1}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="No"
                                />
                            </div>
                        </GridItem>
                        {props.singleValueSelected === "0" ?
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    success={props.SpecifyOccupationWork === "success"}
                                    error={props.SpecifyOccupationWork === "error"}
                                    labelText="Specify Occupation Work "
                                    name="specifyOccupationWork"
                                    required={true}
                                    // value={props.singleValueSelectedProposer === "1" ? "": props.SaveProposalDto.tblPolicyMemberDetails.nameWithInitial}
                                    onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            : null}
                        <GridItem xs={12} sm={12} md={3}>
                            <MasterDropdown
                                labelText="Country Of Occupation"
                                // id="LeadDTO.gender"
                                value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.nationality}
                                onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                                lstObject={props.MasterDataDto}
                                filterName='Country'

                                name='countryOfOccupation'

                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="downlevel">
                            <CustomCheckbox
                                name="checkbox"

                                formControlProps={{
                                    fullWidth: true
                                }}

                            />
                            Dual you Have Dual CitizenShip
                            </GridItem>
                    </GridContainer>

                </GridContainer>
            </CardBody>

            <CardHeader color="rose" icon>

                {
                    <h4 >
                        <small>Contact Details</small>
                    </h4>
                }
            </CardHeader>
            <CardBody>
                <GridContainer>

                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Mobile No"
                            value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.mobile}
                            onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                            name="mobile"

                            id="MobileNo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Home"
                            value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.home}
                            onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                            name="home"

                            id="Home"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="OfficeNo"
                            value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.work}
                            onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                            name="work"

                            id="work"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>




                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="E-Mail"
                            value={props.singleValueSelectedProposer === "1" ? "" :props.tblPolicyMemberDetails.email}
                            onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                            name="email"

                            id="Email"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </CardBody>


            <CardHeader color="rose" icon>

                {
                    <h4 >
                        <small> Communication  Address </small>
                    </h4>
                }
            </CardHeader>
            <CardBody>
                <GridContainer>


                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            success={props.Address1 === "success"}
                            error={props.Address1 === "error"}
                            labelText="Address 1"
                            name="address1"
                            required={true}
                            // onChange={props.PolicyOwnerDetailsSetValue}
                            //props.singleValueSelectedProposer === "1" ? props.PolicyOwnerDetailsdataOnNoCondition[0].address1 :
                            value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.address1}
                            onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            success={props.Address2 === "success"}
                            error={props.Address2 === "error"}
                            labelText="Address 2"
                            name="address2"
                            required={true}
                            onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                            value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.address2}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Address 3"
                            //value={props.singleValueSelectedProposer === "1" ? props.PolicyOwnerDetailsdataOnNoCondition[0].address3 : props.PolicyOwnerDetailsdataOnYesConditioinDto[0].address3}
                            value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.address3}
                            name="address3"
                            // onChange={props.PolicyOwnerDetailsSetValue}
                            id="Address3"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            success={props.City === "success"}
                            error={props.City === "error"}
                            labelText="Postal Code|City "
                            name="city"
                            required={true}
                            onChange={(e) => props.proposalPolicyOwnerSetValue(e)}
                            value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.city}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                            success={props.District === "success"}
                            error={props.District === "error"}
                            labelText="District "
                            name="district"
                            required={true}
                            // onChange={props.PolicyOwnerDetailsSetValue}
                            value={props.singleValueSelectedProposer === "1" ? "" : props.tblPolicyMemberDetails.district}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                            success={props.Province === "success"}
                            error={props.Province === "error"}
                            labelText="Province "
                            name="province"
                            required={true}
                            // onChange={props.PolicyOwnerDetailsSetValue}
                            //value={props.singleValueSelectedProposer === "1" ? props.PolicyOwnerDetailsdataOnNoCondition[0].province : props.PolicyOwnerDetailsdataOnYesConditioinDto[0].province}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>






                </GridContainer>
                <GridContainer justify="center" >

                </GridContainer>


            </CardBody>


            <CardHeader color="rose" icon>

                {
                    <h4 >
                        <small> Permanent Address </small>
                    </h4>
                }
            </CardHeader>
            <CardBody>
                <GridContainer>

                    <GridItem xs={12} sm={12} md={12} className="downlevel">
                        <CustomCheckbox
                            name="isPermanentAddrSameasCommAddr"
                            value={props.tblPolicyMemberDetails.isPermanentAddrSameasCommAddr}
                            //checked={props.tblPolicyMemberDetails.isPermanentAddrSameasCommAddr}
                            onChange={(e) => props.SetPermanentAddCheckBox(e)}
                            formControlProps={{
                                fullWidth: true
                            }}

                        />
                        Is Permanent Address Same As Communication Address?
                            </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            success={props.Address1 === "success"}
                            error={props.Address1 === "error"}
                            labelText="Address 1"
                            name="pAddress1"
                            required={true}
                            // onChange={props.PolicyOwnerDetailsSetValue}
                            value={props.singleValueCheckboxSelected === true ? props.tblPolicyMemberDetails.address1 : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            success={props.Address2 === "success"}
                            error={props.Address2 === "error"}
                            labelText="Address 2"
                            name="pAddress2"
                            required={true}
                            //onChange={props.PolicyOwnerDetailsSetValue}
                            //value={props.singleValueSelectedProposer === "1" ? props.PolicyOwnerDetailsdataOnNoCondition[0].address2 : props.PolicyOwnerDetailsdataOnYesConditioinDto[0].address2}
                            value={props.singleValueCheckboxSelected === true ? props.tblPolicyMemberDetails.address2 : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Address 3"
                            //value={props.singleValueSelectedProposer === "1" ? props.PolicyOwnerDetailsdataOnNoCondition[0].address3 : props.PolicyOwnerDetailsdataOnYesConditioinDto[0].address3}
                            value={props.singleValueCheckboxSelected === true ? props.tblPolicyMemberDetails.address3 : ""}
                            name="pAddress3"
                            //onChange={props.PolicyOwnerDetailsSetValue}
                            id="Address3"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            success={props.City === "success"}
                            error={props.City === "error"}
                            labelText="Postal Code|City "
                            name="pPostalCode"
                            required={true}
                            //onChange={props.PolicyOwnerDetailsSetValue}
                            //value={props.singleValueSelectedProposer === "1" ? props.PolicyOwnerDetailsdataOnNoCondition[0].city : props.PolicyOwnerDetailsdataOnYesConditioinDto[0].city}
                            value={props.singleValueCheckboxSelected === true ? props.tblPolicyMemberDetails.city : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                            success={props.District === "success"}
                            error={props.District === "error"}
                            labelText="District "
                            name="pDistrict"
                            required={true}
                            //onChange={props.PolicyOwnerDetailsSetValue}
                            //value={props.singleValueSelectedProposer === "1" ? props.PolicyOwnerDetailsdataOnNoCondition[0].district : props.PolicyOwnerDetailsdataOnYesConditioinDto[0].district}
                            value={props.singleValueCheckboxSelected === true ? props.tblPolicyMemberDetails.district : "" }
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            disabled={(props.singleValueSelectedProposer === "0") ? true : false}
                            success={props.Province === "success"}
                            error={props.Province === "error"}
                            labelText="Province "
                            name="pProvince"
                            required={true}
                            //onChange={props.PolicyOwnerDetailsSetValue}
                            //value={props.singleValueSelectedProposer === "1" ? props.PolicyOwnerDetailsdataOnNoCondition[0].province : props.PolicyOwnerDetailsdataOnYesConditioinDto[0].province}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>






                </GridContainer>
                <GridContainer justify="center" >

                </GridContainer>


            </CardBody>



        </div>

    );

}


export default withStyles(style)(PartialMemberDetails);