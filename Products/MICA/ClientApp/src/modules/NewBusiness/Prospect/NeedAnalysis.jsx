﻿/// <reference path="_officedetails.jsx" />
import React from "react";
// @material-ui/icons
import ChromeReader from "@material-ui/icons/ChromeReaderMode";


import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";

import FinancialAnalysis from "./Calculator.jsx";
import PersonalInformation from "./PersonalInformation.jsx";
import NeedIdentification from "./NeedIdentification.jsx";
import ProductSelection from "./ProductSelection.jsx";
import Calculator from "./Calculator.jsx";
import NeedAnalysisCompleted from "./NeedAnalysisCompleted.jsx";
import FNA from "./FNA.jsx";

const NeedAnalysis = (props) => {
  //console.log("bbbb", props);
    //const props = props.props;
    
    
    console.log("NeedAnalysis Analysis: ",props);
    return (
        <Card>
            <CardBody>
               
                                <Wizard
                                    validate
                                    steps={[
                                        
                                        { stepName: "Personal Information", stepComponent: PersonalInformation, stepId: "PersonalInformation", stepData:props },
                                        { stepName: "Need Identification", stepComponent: NeedIdentification, stepId: "NeedIdentification", stepData: props },                                      
                                        //{ stepName: "FinancialAnalysis", stepComponent: Calculator, stepId: "Calculator", stepData: props },
                                        { stepName: "Product Selection", stepComponent: ProductSelection, stepId: "ProductSelection", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                />
               
            </CardBody>
        </Card>
    );
}
export default NeedAnalysis;

