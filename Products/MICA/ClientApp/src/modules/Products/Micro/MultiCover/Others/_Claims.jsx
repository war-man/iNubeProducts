import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import ProductConfig from "modules/Products/Micro/views/ProductConfig.jsx";
import { Animated } from "react-animated-css";
import SwitchONParameter from "./_SwtichPage.jsx";
import CardBody from "components/Card/CardBody.jsx";
const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    ...customSelectStyle
};

//class Claims extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            checked: [24, 22],
//            selectedValue: null,
//            selectedEnabled: "b"
//        };
//        this.handleChange = this.handleChange.bind(this);
//        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
//    }
////handleChange(event) {
////    this.setState({ selectedValue: event.target.value });
////}
////handleChangeEnabled(event) {
////    this.setState({ selectedEnabled: event.target.value });
////}
////handleToggle(value) {
////    const { checked } = this.state;
////    const currentIndex = checked.indexOf(value);
////    const newChecked = [...checked];

////    if (currentIndex === -1) {
////        newChecked.push(value);
////    } else {
////        newChecked.splice(currentIndex, 1);
////    }

////    this.setState({
////        checked: newChecked
////    });
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

const Claims = (props) => {

    //console.log('Risks demo data', props.componentData.MasterDTO.Risk[0]);
    console.log('Claims demo data', props.componentData.MasterDTO, props.componentData.ClaimList);
    let truedata = props.componentData.MasterDTO.Claim.filter(item => item.disable == true);
    let falsedata = props.componentData.MasterDTO.Claim.filter(item => item.disable == false);

    return (

        (props.componentData.ClaimList.length > 0) ? (<div>{
            props.componentData.ClaimList.map((m, id) => (

                ((truedata.length > 0 || falsedata.length > 0)) ? (
                    <div>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                            <CardBody>


                                <GridContainer> <h5 className="bold-font">{m.mValue}</h5></GridContainer>
                                <GridContainer>

                                    {truedata.map((item, i) => (
                                        ((truedata[i].levelId == m.mID) ?
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomCheckbox key={i}
                                                    name={item.mValue}
                                                    labelText={item.mValue}
                                                    value={item.mIsRequired}
                                                    checked={item.mIsRequired}
                                                    onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Claim', e)}
                                                    disabled={(item.disable == true) ? true : null}
                                                    //onChange={}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }} />
                                            </GridItem> : null)
                                    ))}
                                </GridContainer>
                                <GridContainer>

                                    {falsedata.map((item, i) => (

                                        ((falsedata[i].levelId == m.mID) ?
                                            <GridItem xs={12} sm={12} md={3} >
                                                <CustomCheckbox key={i}
                                                    name={item.mValue}
                                                    labelText={item.mValue}
                                                    value={item.mIsRequired}
                                                    checked={item.mIsRequired}
                                                    onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Claim', e)}
                                                    disabled={(props.componentData.viewdisable == true) ? true : false}
                                                    //onChange={}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }} />
                                            </GridItem> : null)
                                    ))}

                                </GridContainer>
                            </CardBody>
                        </Animated>
                    </div>) : null


            )

            )

        } {/*{props.componentData.ProductDTO.ProductDTO.isMasterPolicy == true ? < SwitchONParameter {...props} /> : ""}*/}</div>) : null


    );
}

export default Claims;
//export default withStyles(regularFormsStyle)(Claims);