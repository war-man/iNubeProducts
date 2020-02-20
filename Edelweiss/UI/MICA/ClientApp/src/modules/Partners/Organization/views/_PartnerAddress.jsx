import React from "react";
// @material-ui/icons

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import RegAddress from "./_RegAddress";
//import CorpAddress from "./_CorpAddress";
//import MailAddress from "./_MailAddress";
//import License from "./_LicenseDetails";
//import SpocDetails from "./_SpocDetails";
//import GridContainer from "components/Grid/GridContainer.jsx";
//import GridItem from "components/Grid/GridItem.jsx";
import Add from "@material-ui/icons/FeaturedPlayList";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

import {Animated} from "react-animated-css";

const PartnerAddress = (props) => {
    return (
        <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
        <Card>
          
            <CardBody>
                {console.log(props.LocationDTO.Country)}
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
                                        { stepName: <TranslationContainer translationKey="CorporateAddress" />, stepComponent: RegAddress, stepId: "pCorpAddress", stepData: props },
                                        { stepName: <TranslationContainer translationKey="OfficeAddress" />, stepComponent: RegAddress, stepId: "pOffAddress", stepData: props},
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
        </Animated>
    );
}
export default PartnerAddress;


