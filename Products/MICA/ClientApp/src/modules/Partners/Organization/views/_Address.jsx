/// <reference path="_officedetails.jsx" />
import React from "react";
// @material-ui/icons
import ChromeReader from "@material-ui/icons/ChromeReaderMode";


import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import RegAddress from "./_RegAddress";
import CorpAddress from "./_CorpAddress";
import MailAddress from "./_MailAddress";
import License from "./_LicenseDetails";
import OrgStructure from "./_OrgStructure.jsx";
import OrgDesignation from "./_OrgDesignation.jsx";
import SpocDetails from "./_SpocDetails";
import Add from "@material-ui/icons/FeaturedPlayList";
import License_Spoc from "@material-ui/icons/Redeem";
import BusinessIcon from '@material-ui/icons/Business';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const Address = (props) => {
    //console.log("data of props",props);
    return (
        <Card>
            <CardBody>
                {/*{console.log(props.LocationDTO.Country)}*/}
                <NavPills
                    color="rose"
                    horizontal={{
                        tabsGrid: { xs: 12, sm: 12, md: 2 },
                        contentGrid: { xs: 12, sm: 12, md: 10 }
                    }}
                    tabs={[
                        {
                            tabButton: <TranslationContainer translationKey="Structure" /> ,
                            tabIcon: BusinessIcon,
                            tabContent: (
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: <TranslationContainer translationKey="OrganizationStructure" /> , stepComponent: OrgStructure, stepId: "orgStructure", stepData: props },
                                        { stepName: <TranslationContainer translationKey="Designation" /> , stepComponent: OrgDesignation, stepId: "orgDesignation", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                />
                            )
                        },
                        {
                            tabButton: <TranslationContainer translationKey="Address" />,
                            tabIcon: Add,
                            tabContent: (
                              //  <Wizard
                              //      validate
                              //      steps={[
                              //          {
                              //              stepName: <TranslationContainer translationKey="RegisteredAddress" />,stepComponent:RegAddress, stepId: "rAddress", stepData: props},
                              //          {stepName:  <TranslationContainer translationKey="CorporateAddress" /> ,stepComponent: RegAddress, stepId: "cAddress", stepData: props },
                              //          {stepName:  <TranslationContainer translationKey="MailAddress" />,stepComponent: RegAddress, stepId: "mAddress", stepData: props },
                              //    ]}
                              //title=""
                              //     subtitle=""
                              ///>
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: <TranslationContainer translationKey="RegisteredAddress" /> , stepComponent: RegAddress, stepId: "rAddress", stepData: props },
                                        { stepName: <TranslationContainer translationKey="CorporateAddress" /> , stepComponent: RegAddress, stepId: "cAddress", stepData: props },
                                        { stepName: <TranslationContainer translationKey="MailAddress" />, stepComponent: RegAddress, stepId: "mAddress", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                />
                        )
                      },
                        {
                            tabButton: <TranslationContainer translationKey="LicenseandSpocDetails" />,
                            tabIcon: License_Spoc,
                            tabContent: (
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: <TranslationContainer translationKey="LicenseandRegistration" />, stepComponent: License, stepId: "License", stepData: props },
                                        { stepName: <TranslationContainer translationKey="SpocDetails" />, stepComponent: SpocDetails, stepId: "spocDet", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                />
                            )
                        },

                    ]}
                />
            </CardBody>
        </Card>
    );
}
export default Address;


