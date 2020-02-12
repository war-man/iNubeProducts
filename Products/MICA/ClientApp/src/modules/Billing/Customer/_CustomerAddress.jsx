
import React from "react";
// @material-ui/icons
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
//import CorpAddress from "./_CorpAddress";
//import MailAddress from "./_MailAddress";
import RegisteredAddress from "./_RegisteredAddress";
import Add from "@material-ui/icons/FeaturedPlayList";
import LicenseAndRegistration from "./_LicenseAndRegistration";
import SpocDetails from "./_SpocDetails";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


const CustomerAddress = (props) => {
    //console.log("data of props",props);
    return (
        
            <CardBody>
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: <TranslationContainer translationKey="RegisteredAddress" />, stepComponent: RegisteredAddress, stepId: "rAddress", stepData: props },
                                        { stepName: <TranslationContainer translationKey="LicenseandRegistration" />, stepComponent: LicenseAndRegistration, stepId: "License", stepData: props },
                                        { stepName: <TranslationContainer translationKey="SpocDetails" />, stepComponent: SpocDetails, stepId: "spocDet", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                />
                           
            </CardBody>
       
    );
}
export default CustomerAddress;


