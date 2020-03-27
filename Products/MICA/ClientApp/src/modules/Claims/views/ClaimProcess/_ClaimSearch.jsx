import React from "react";
// @material-ui/icons
//import Settings from "@material-ui/icons/Settings";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import Extension from "@material-ui/icons/Extension";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PolicyDetails from "./_PolicyDetails.jsx";
import ClaimDetails from "./_ClaimDetails.jsx";
import DocDetails from "./_DocDetails.jsx";
//import PaymentDetails from "./_PaymentDetails.jsx";
//import MyFileUploader from "./ClaimProceed/DocumentFileUpload.jsx";
import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import cover from "@material-ui/icons/VerifiedUser";
import Extension from "@material-ui/icons/Widgets";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


const ClaimSearch = (props) => {
  
    return (
        <div>
            {
                props.approved &&

                <GridItem xl={12}>
                    <Wizard
                        validate
                        steps={[
                            { stepName: <TranslationContainer translationKey="PolicyDetails" />, stepComponent: PolicyDetails, stepId: "PolicyDetails", stepData: props },

                            { stepName: <TranslationContainer translationKey="DocumentDetails" />, stepComponent: DocDetails, stepId: "DocDetails", stepData: props },

                            { stepName: <TranslationContainer translationKey="ClaimDetails" />, stepComponent: ClaimDetails, stepId: "ClaimDetails", stepData: props },

                        ]}
                    //title=""
                    //subtitle=""

                    />

                </GridItem>
            }
        </div>



    );
}
export default ClaimSearch;