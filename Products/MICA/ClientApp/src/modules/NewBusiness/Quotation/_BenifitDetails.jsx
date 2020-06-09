import React from "react";
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Icon from "@material-ui/core/Icon";
import Pending from "assets/img/Pending.png";
import Button from "components/CustomButtons/Button.jsx";
import { Animated } from "react-animated-css";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Wizard from "components/Wizard/Wizard.jsx";

import MainLife from "./_MainLife.jsx"
import Spouse from "./_Spouse.jsx"



const Benifit = (props) => {

        const MainlifeData = props.MainRiderTableData;

        const SpouseData = props.SpouseRiderTableData;

        console.log("BenifitpageRiderDTO", props);


    return (
        <Card className="assignCard">
            
          
                <CardBody>
                
                        <Wizard
                            id="proWiz" 
                    validate



                    steps={(props.SpouseFlag==true)?([
                                { stepName: "MainLife", stepComponent: MainLife, stepId: "MainLife", stepData: MainlifeData },
                                  { stepName: "Spouse", stepComponent: Spouse, stepId: "Spouse", stepData: SpouseData},
                                //{ stepName: "Address", stepComponent: Step3, stepId: "address" }
                    ]) : ([{ stepName: "MainLife", stepComponent: MainLife, stepId: "MainLife", stepData: MainlifeData }]
                               )}
                            title="Build Your Profile"
                            subtitle="This information will let us know more about you."
                        />
                  


                </CardBody>
            
        </Card>



    );



}

export default Benifit;
