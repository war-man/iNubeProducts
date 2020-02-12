import React from "react";
// @material-ui/icons

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import RegAddress from "./_RegAddress";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Add from "@material-ui/icons/FeaturedPlayList";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


import { Animated } from "react-animated-css";

const UserAddress = (props) => {
    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
                <CardBody>
                    <NavPills
                        color="rose"
                        horizontal={{
                            tabsGrid: { xs: 12, sm: 12, md: 2 },
                            contentGrid: { xs: 12, sm: 12, md: 10 }
                        }}
                        tabs={[
                            {
                                tabButton: <TranslationContainer translationKey="Address" />,
                                tabIcon: Add,
                                tabContent: (
                                    <Wizard
                                        validate
                                        steps={[
                                            //{ stepName: "Permanent Address", stepComponent: RegAddress, stepId: "pCorpAddress", stepData: props },
                                            //{ stepName: "Communication Address", stepComponent: RegAddress, stepId: "pOffAddress", stepData: props },
                                            { stepName: <TranslationContainer translationKey="PermanentAddress" />, stepComponent: RegAddress, stepId: "permAddress", stepData: props },
                                            { stepName: <TranslationContainer translationKey="CommunicationAddress" />, stepComponent: RegAddress, stepId: "commAddress", stepData: props },
                                        ]}
                                        title=""
                                        subtitle=""
                                    />
                                )
                            }
                        ]}
                    />
                </CardBody>
            </GridItem>
        </GridContainer>
    );
}
export default UserAddress;