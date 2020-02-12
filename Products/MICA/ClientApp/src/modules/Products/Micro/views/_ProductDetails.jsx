import React from "react";
// @material-ui/icons
//import Settings from "@material-ui/icons/Settings";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import Extension from "@material-ui/icons/Extension";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";


import Insurables from "./Covers/_Insurables.jsx";
import Covers from "./Covers/_Covers.jsx";
import Benefits from "./Covers/_Benefits.jsx";
import Premium from "./Covers/_Premium.jsx";
import Clauses from "./Clauses/_Clauses.jsx";
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
import {Animated} from "react-animated-css";
const ProductDetails = (props) => {
    console.log("my props", props);

    return (
        <div >
        <Card  className="productDetails">
            <CardBody>

                <NavPills
                    color="rose"
                    horizontal={{
                        tabsGrid: { xs: 12, sm: 12, md: 2 },
                        contentGrid: { xs: 12, sm: 12, md: 10 }
                    }}
                    tabs={[
                        {
                            tabButton: "Coverage",
                            tabIcon: cover,
                            tabContent: (
                                <div >
                                    <Wizard id="proWiz"  
                                    validate
                                    steps={[
                                        { stepName: "Insurables", stepComponent: Insurables, stepId: "insurables", stepData: props },
                                        { stepName: "Covers", stepComponent: Covers, stepId: "covers", stepData: props },
                                        { stepName: "Benefits", stepComponent: Benefits, stepId: "benefits", stepData: props },
                                        { stepName: "Premium", stepComponent: Premium, stepId: "premium", stepData: props }
                                    ]}
                                    title=""
                                    subtitle=""
                                // onLoadData={props.ProductDTO}
                                    />
                                </div>
                            )
                        },
                        {
                            tabButton: "Clauses",
                            tabIcon: ChromeReader,
                            tabContent: (
                                <div className="wizWarr">
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: "Clauses, Warranties, Exclusions", stepComponent: Clauses, stepId: "Clauses", stepData: props },
                                        //{ stepName: "Warranties", stepComponent: Warranties, stepId: "Warranties" },
                                        //{ stepName: "Exclusions", stepComponent: Exclusions, stepId: "Exclusions" }
                                    ]}
                                    title=""
                                    subtitle=""
                                    />
                                </div>
                            )
                        },
                        {
                            tabButton: "Others",
                            tabIcon: Extension,
                            tabContent: (
                         
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: "Channels", stepComponent: Channels, stepId: "Channels", stepData: props },
                                        { stepName: "Risks", stepComponent: Risks, stepId: "Risks", stepData: props },
                                        { stepName: "Claims", stepComponent: Claims, stepId: "Claims", stepData: props },
                                       // { stepName: "Claims", stepComponent: Claims, stepId: "Claims", stepData: props }
                                    ]}
                                    title=""
                                    subtitle=""
                                    />

                            )
                        }
                    ]}
                />
               
            </CardBody>

            </Card>
        </div>
    );

}
export default ProductDetails;