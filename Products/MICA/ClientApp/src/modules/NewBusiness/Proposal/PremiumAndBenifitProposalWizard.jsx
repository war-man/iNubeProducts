
import React from "react";
// @material-ui/icons
import ChromeReader from "@material-ui/icons/ChromeReaderMode";


import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import PremiumAndBenifitDetail from "./ProposalPremiumAndBenifit.jsx";
import PremiumAndBenifitSpouse from "./PremiumAndBenefitSpouseProposal";




const PremiumAndBenifitWizard = (props) => {
    //console.log("data of props",props);
    return (
        
            <CardBody>
               
                                <Wizard
                                    validate
                                    steps={[
                                        ////{ stepName: "Personal Information", stepComponent: FinancialAnalysis, stepId: "rAddress", stepData: props },
                                        { stepName: "MAIN LIFE", stepComponent: PremiumAndBenifitDetail, stepId: "", stepData: props },
                                        { stepName: "SPOUSE", stepComponent: PremiumAndBenifitSpouse, stepId: "", stepData: props },
                                        //{ stepName: "FinancialAnalysis", stepComponent: FNA, stepId: "", stepData: props },
                                        ////{ stepName: "FinancialAnalysis", stepComponent: Calculator, stepId: "", stepData: props },
                                        //{ stepName: "Product Selection", stepComponent: ProductSelection, stepId: "", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                />
               
            </CardBody>
       
    );
}
export default PremiumAndBenifitWizard;


