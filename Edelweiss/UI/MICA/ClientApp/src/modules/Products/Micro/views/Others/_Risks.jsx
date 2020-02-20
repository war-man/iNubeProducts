import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {Animated} from "react-animated-css";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
//import CustomCheckbox from "components/Checkbox/CustomCheckbox.jsx";
import ProductConfig from "modules/Products/Micro/views/ProductConfig.jsx";
import bindModel from 'components/ModelBinding/bindModel.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"

    },
    ...customSelectStyle
};


//class Risks extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            checked: [24, 22],
//            selectedValue: null,
//            selectedEnabled: "b"
//        };
//       this.handleChange = this.handleChange.bind(this);
//        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
//    }
//const Risks = (props) => {
//    console.log("props  ", props);

function handleChange(event) {
    this.setState({ selectedValue: event.target.value });
};
function handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
};
function handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    this.setState({
        checked: newChecked
    });
}
const Risk = (props) => {
   // debugger;
    //console.log('Risks demo data', props.componentData.MasterDTO.Risk[0]);
    console.log('Risks demo data', props.componentData.MasterDTO);
    const { model } = bindModel(props.componentData.MasterDTO.Risk);
    let truedata = props.componentData.MasterDTO.Risk.filter(item => item.disable == true);
    let falsedata = props.componentData.MasterDTO.Risk.filter(item => item.disable == false);
    console.log("truedata",truedata);
    return (
        (truedata.length>0 ||falsedata.length>0)?(
        <div>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <CardBody>
            <GridContainer>
               
                {truedata.map((item, i) => (

                        <GridItem xs={12} sm={12} md={3} className="uplevel">
                        <CustomCheckbox key={i}
                            name={item.mValue}
                            labelText={item.mValue}
                            value={item.mIsRequired}
                            onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Risk', e)}
                            disabled={(item.disable == true) ? true : null}
                            checked={item.mIsRequired}
                            formControlProps={{
                                fullWidth: true
                            }}

                        />
                        </GridItem>
                        ))}

            </GridContainer>
                            
           <GridContainer>

                {falsedata.map((item, i) => (

              
                        <GridItem xs={12} sm={12} md={3} className="downlevel">
                            <CustomCheckbox key={i}
                                name={item.mValue}
                                labelText={item.mValue}
                                value={item.mIsRequired}
                                onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Risk', e)}
                                disabled={(props.componentData.viewdisable==true)?true:false}
                                    checked={item.mIsRequired}
                                formControlProps={{
                                    fullWidth: true
                                }}

                            />
                    </GridItem>
                ))}

            </GridContainer>
        </CardBody> 
        </Animated>       
        </div>):null



    );
    //  }
}
export default Risk;
