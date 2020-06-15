import React from "react";
// @material-ui/icons

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import RegAddress from "modules/Hierarchy/views/_RegAddress.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Add from "@material-ui/icons/FeaturedPlayList";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";


import { Animated } from "react-animated-css";
import { CardHeader } from "@material-ui/core";

const BankDetails = (props) => {
    console.log("bankdetz",props);
    return (
        <div>
           
            <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                        labelText="BankName"
                        required={true}
                        id="bankname"
                        value={props.componentData.peopledetails1.avoOrgEmployee.bankName}
                        name='bankName'
                        onChange={(e) => props.componentData.SetValue(e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                        labelText="BranchName"
                        required={true}
                        id="branchname"
                        value={props.componentData.peopledetails1.avoOrgEmployee.branchName}
                        name='branchName'
                        onChange={(e) => props.componentData.SetValue(e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                        labelText="AccountNo"
                        required={true}
                        id="AC No"
                        inputType="number"
                        value={props.componentData.peopledetails1.avoOrgEmployee.accountNumber}
                        name='accountNumber'
                        onChange={(e) => props.componentData.SetValue(e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                        </GridContainer>
         
        </div>
    );
}
export default BankDetails;