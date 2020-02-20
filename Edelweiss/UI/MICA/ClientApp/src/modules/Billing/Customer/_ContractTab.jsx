
import React from "react";
// @material-ui/icons
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
//import CorpAddress from "./_CorpAddress";
//import MailAddress from "./_MailAddress";
import CreateBilling from "./Billing/CreateBilling";
import Add from "@material-ui/icons/FeaturedPlayList";
import InvoiceConfiguration from "./Invoice/InvoiceConfiguration.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


const ContractTab = (props) => {
    console.log("data of props", props);
    return (
        
            <CardBody>
                               
                <Wizard
                validate
                steps={[
                    { stepName: <TranslationContainer translationKey="BillingConfiguration" />, stepComponent: CreateBilling, stepId: "billing", stepData: props },
                    { stepName: <TranslationContainer translationKey="InvoiceConfiguration" />, stepComponent: InvoiceConfiguration, stepId: "invoice", stepData: props },
                   
                ]}
                title=""
                subtitle=""
            />
            </CardBody>
       
    );
}
export default ContractTab;


