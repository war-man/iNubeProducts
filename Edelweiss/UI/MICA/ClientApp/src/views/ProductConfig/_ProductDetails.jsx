import React from "react";
// @material-ui/icons
import Settings from "@material-ui/icons/Settings";
import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import Extension from "@material-ui/icons/Extension";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";


import Insurables from "./Covers/_Insurables.jsx";
import Covers from "./Covers/_Covers.jsx";
import Benefits from "./Covers/_Benefits.jsx";
import Premium from "./Covers/_Premium.jsx";

import Clauses from "./Clauses/_Clauses.jsx";
import Exclusions from "./Clauses/_Exclusions.jsx";
import Warranties from "./Clauses/_Warranties.jsx";

import Channels from "./Others/_Channels.jsx";
import Claims from "./Others/_Claims.jsx";
import Risks from "./Others/_Risks.jsx";

class ProductDetails extends React.Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <NavPills
                        color="rose"
                        horizontal={{
                            tabsGrid: { xs: 12, sm: 12, md: 2 },
                            contentGrid: { xs: 12, sm: 12, md: 10 }
                        }}
                        tabs={[
                            {
                                tabButton: "Covers",
                                tabIcon: ChromeReader,
                                tabContent: (
                                    <Wizard
                                        validate
                                        steps={[
                                            { stepName: "Insurables", stepComponent: Insurables, stepId: "insurables" },
                                            { stepName: "Covers", stepComponent: Covers, stepId: "covers" },
                                            { stepName: "Benefits", stepComponent: Benefits, stepId: "benefits" },
                                            { stepName: "Premium", stepComponent: Premium, stepId: "premium" }
                                        ]}
                                        title=""
                                        subtitle=""
                                    />
                                )
                            },
                            {
                                tabButton: "Clauses",
                                tabIcon: Settings,
                                tabContent: (
                                    <Wizard
                                        validate
                                        steps={[
                                            { stepName: "Clauses", stepComponent: Clauses, stepId: "Clauses" },
                                            { stepName: "Warranties", stepComponent: Warranties, stepId: "Warranties" },
                                            { stepName: "Exclusions", stepComponent: Exclusions, stepId: "Exclusions" }
                                        ]}
                                        title=""
                                        subtitle=""
                                    />
                                )
                            },
                            {
                                tabButton: "Others",
                                tabIcon: Extension,
                                tabContent: (
                                    <Wizard
                                        validate
                                        steps={[
                                            { stepName: "Channels", stepComponent: Channels, stepId: "Channels" },
                                            { stepName: "Risks", stepComponent: Risks, stepId: "Risks" },
                                            { stepName: "Claims", stepComponent: Claims, stepId: "Claims" }
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
            );
    }
}
export default ProductDetails;