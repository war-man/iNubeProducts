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
import ProductClauses from "./Clauses/_ProductClauses.jsx";
import Channels from "./Others/_Channels.jsx";
import Claims from "./Others/_Claims.jsx";
import Risks from "./Others/_Risks.jsx";
import SwitchONParameter from "./Others/_SwtichPage.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProductSave from "./_ProductSave.jsx";
import { Transform } from "stream";
import Accordion from "components/Accordion/Accordion.jsx";
import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import cover from "@material-ui/icons/VerifiedUser";
import Extension from "@material-ui/icons/Widgets";
import { Animated } from "react-animated-css";
import AddCover from "./_AddCover.jsx";


const ProductDetails = (props) => {
    console.log("my props", props);
    console.log("productDetails clauses", props.clauses);

    //const [addinusrable, addinsurablefun] = React.useState([{
    //    title: ((props.productInsurableItemList.length>0)?props.productInsurableItemList[0].insurableCategoryId:"pk"),content: <AddCover props={props}  />
    //}]);
    const [addinusrable, addinsurablefun] = React.useState([]);


    return (
        <div >
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Card className="productDetails">
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            {/*  <FilterNone /> */}
                            <Icon><img id="icon" src={ProductConfigIcon} /></Icon>
                        </CardIcon>
                        {
                            <h4 className={props.cardIconTitle}>
                                <small>Coverages</small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <Insurables props={props} />


                    </CardBody>

                </Card>
            </Animated>
            <Card className="productDetails">
                <CardBody>
                
                        <Wizard //id="proWiz"
                            validate
                            steps={(props.ProductDTO.ProductDTO.isMasterPolicy == true) ?[

                                { stepName: "C/W/E", stepComponent: ProductClauses, stepId: "ProductClauses", stepData: props },
                                { stepName: "Channels", stepComponent: Channels, stepId: "Channels", stepData: props },
                                { stepName: "Premium", stepComponent: Premium, stepId: "premium", stepData: props },

                                { stepName: "Risk Parameters", stepComponent: Risks, stepId: "Risk", stepData: props },
                                { stepName: "Claim Parameters", stepComponent: Claims, stepId: "Claims", stepData: props },
                                //{ stepName: "SwitchONParameter", stepComponent: SwitchONParameter, stepId: "SwitchONParameter", stepData: props },
                               

                            ] : [
                                    { stepName: "C/W/E", stepComponent: ProductClauses, stepId: "ProductClauses", stepData: props },
                                    { stepName: "Channels", stepComponent: Channels, stepId: "Channels", stepData: props },
                                    { stepName: "Premium", stepComponent: Premium, stepId: "premium", stepData: props },

                                    { stepName: "Risk Parameters", stepComponent: Risks, stepId: "Risk", stepData: props },
                                    { stepName: "Claim Parameters", stepComponent: Claims, stepId: "Claims", stepData: props },
                                   

                                ]}
                            title=""
                            subtitle=""

                        /> 

                </CardBody>

            </Card>
        </div>
    );

}
export default ProductDetails;