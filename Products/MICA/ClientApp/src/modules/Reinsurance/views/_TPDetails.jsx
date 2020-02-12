import React from "react";
// @material-ui/icons
//import Settings from "@material-ui/icons/Settings";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import Extension from "@material-ui/icons/Extension";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";

import AddTreaty from "modules/Reinsurance/views/AddTreaty.jsx";
import AddParticipant from "modules/Reinsurance/views/AddParticipant.jsx";


import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { Transform } from "stream";

import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import cover from "@material-ui/icons/VerifiedUser";
import Extension from "@material-ui/icons/Widgets";
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
const TPDetails = (props) => {
    console.log("my props", props);

    return (
        <div >
<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <Card  className="TPDetails">
            <CardBody>

                                <div >
                                    <Wizard id="proWiz"  
                                    validate
                                    steps={[
                                        { stepName: <TranslationContainer translationKey="AddTreatyGroup" />, stepComponent: AddTreaty, stepId: "addtreaty", stepData: props },
                                        { stepName: <TranslationContainer translationKey="AddTreatyParticipant" />, stepComponent: AddParticipant, stepId: "addparticipant", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                // onLoadData={props.ProductDTO}
                                    />
                                </div>
               
               
            </CardBody>

            </Card>
            </Animated>
        </div>
    );

}
export default TPDetails;