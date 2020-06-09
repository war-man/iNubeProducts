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
import BankDetails from "modules/Hierarchy/views/BankDetails.jsx";
import EducationDetails from "modules/Hierarchy/views/EducationDetails.jsx";

import { Animated } from "react-animated-css";

const UserAddress = (props) => {
    console.log("UAprops",props);
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
                            },
                            {
                                tabButton: "Bank Details",
                                tabIcon: Add,
                                tabContent: (
                                    <Wizard
                                        validate steps={[
                                            { stepName: "Bank Details", stepComponent: BankDetails, stepId: "Bankdetails", stepData: props },
                                        ]}
                                        title=""
                                        subtitle=""
                                    />
                                )
                            },
                            {
                                tabButton: "Education Details",
                                tabIcon: Add,
                                tabContent: <EducationDetails tableData={props.tableData} educationdata={props.avoOrgEmpEducation}/>
                            }

                        ]}
                    />
                </CardBody>
            </GridItem>
        </GridContainer>
    );
}
export default UserAddress;