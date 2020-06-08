import React from "react";
import PropTypes from "prop-types";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
// @material-ui/icons
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";
import FilterNone from "@material-ui/icons/FilterNone";


//General Components
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

//Module Components

import profileStyles from "./profileStyles.jsx";

import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import OfficeAddress from "./_OfficeAddress.jsx";
import License from "./_LicenseDetails";
import SpocDetails from "./_SpocDetails.jsx";
import OfficeProfile from "./_OfficeProfile.jsx";
import Office from "@material-ui/icons/Business";
import OfficeSpocDetails from "./OfficeSpocDetails.jsx";
import PositionCreation from "./_PositionCreation.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const SpocDet = (props) => {

    console.log("data of props", props);

    return (
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
                            tabButton: <TranslationContainer translationKey=" Office" />,
                            tabIcon: Office,
                            tabContent: (
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: <TranslationContainer translationKey="ProfileDetails" /> , stepComponent: OfficeProfile, stepId: "Address", stepData: props },
                                        { stepName: <TranslationContainer translationKey="MailAddress" />, stepComponent: OfficeAddress, stepId: "offAddress", stepData: props },
                                        { stepName: <TranslationContainer translationKey="SpocDetails" />, stepComponent: OfficeSpocDetails, stepId: "spocDet", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                />


                            )
                        },
                        {
                            tabButton: <TranslationContainer translationKey="Position" />,
                            tabIcon: Office,
                            tabContent: (
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: <TranslationContainer translationKey="PositionCreation" /> , stepComponent: PositionCreation, stepId: "PostionCreation", stepData: props },

                                    ]}
                                    title=""
                                    subtitle=""
                                />
                            )
                        }
                    ]}
                />

            </CardBody>
        </Card >
    );
}
export default SpocDet;