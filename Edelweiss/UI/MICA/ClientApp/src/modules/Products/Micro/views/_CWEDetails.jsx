import React from "react";
// @material-ui/icons
//import Settings from "@material-ui/icons/Settings";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import Extension from "@material-ui/icons/Extension";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ProductConfigIcon from "assets/img/pro-config.png";
import Insurables from "./Covers/_Insurables.jsx";
import Covers from "./Covers/_Covers.jsx";
import Benefits from "./Covers/_Benefits.jsx";
import Premium from "./Covers/_Premium.jsx";
import Clauses from "./Clauses/_Clauses.jsx";
import CoverClauses from "./Clauses/_CoverCWE.jsx";
import Channels from "./Others/_Channels.jsx";
import Claims from "./Others/_Claims.jsx";
import Risks from "./Others/_Risks.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProductSave from "./_ProductSave.jsx";
import { Transform } from "stream";

import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import cover from "@material-ui/icons/VerifiedUser";
import Extension from "@material-ui/icons/Widgets";
import { Animated } from "react-animated-css";
import MultiCover from "./MultiCover.jsx";
const CWEDetails = (props) => {
    console.log("my props index", props.Iindex);
    console.log("my props", props);
 

    return (
        <Card className="border-hidden">
            <CardBody>
                     
                                            <Wizard id="proWiz"
                                                validate
                                                steps={[
                                                    //{ stepName: "Insurables", stepComponent: Insurables, stepId: "insurables", stepData: props },
                                                   // { stepName: "MultiCover", stepComponent: MultiCover, stepId: "MultiCover", stepData: props },
                                                        { stepName: "Benefits", stepComponent: Benefits, stepId: "benefits", stepData: props },
                                                    //{ stepName: "Premium", stepComponent: Premium, stepId: "premium", stepData: props },
                                                    { stepName: "Cover C/W/E", stepComponent: CoverClauses, stepId: "CoverClauses", stepData: props },
                                                    //{ stepName: "Risks", stepComponent: Risks, stepId: "Risks", stepData: props },
                                                    //{ stepName: "Claims", stepComponent: Claims, stepId: "Claims", stepData: props }
                                                ]}
                                                title=""
                                                subtitle=""
                                            // onLoadData={props.ProductDTO}
                                            />
                                       
             
            </CardBody>
            </Card>
    );

}
export default CWEDetails;