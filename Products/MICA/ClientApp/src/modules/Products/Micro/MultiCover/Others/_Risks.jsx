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
import { Animated } from "react-animated-css";
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
import Dropdown from "components/Dropdown/Dropdown.jsx";
import SwitchONParameter from "./_SwtichPage.jsx";

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
    console.log('Risks props data', props.componentData);
    console.log('Risks demo data', props.componentData.insurableRcbdetails);
    const { model } = bindModel(props.componentData.MasterDTO.Risk);
    let truedata = props.componentData.MasterDTO.Risk.filter(item => item.disable == true);
    let insurablelen = props.componentData.insurableRcbdetails.length - 1;

    let falsedata = props.componentData.MasterDTO.Risk.filter(item => item.disable == false);

    let truepaymentdata = props.componentData.MasterDTO.Payment.filter(item => item.disable == true);
    let falsepaymentpdata = props.componentData.MasterDTO.Payment.filter(item => item.disable == false);
    // const filterRisk = props.componentData.MasterDTO.Risk.filter(item => item.levelId == "");
    console.log("truedata", truedata);
    console.log("truedata", props.componentData.RiskList);
    const titleLen = props.componentData.Insurabletitle.length;
    return (

        (props.componentData.RiskList.length > 0) ? (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>{
                    props.componentData.RiskList.map((m, id) => (

                        ((truedata.length > 0 || falsedata.length > 0)) ? (



                            <CardBody>


                                <GridContainer> <h5 className="bold-font">{m.mValue}</h5></GridContainer>

                                <GridContainer>

                                    {truedata.map((item, i) => (
                                        ((truedata[i].levelId == m.mID) ?
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
                                            </GridItem> : null)
                                    ))}

                                </GridContainer>

                                <GridContainer>

                                    {falsedata.map((item, i) => (

                                        ((falsedata[i].levelId == m.mID) ?
                                            <GridItem xs={12} sm={12} md={3} className="downlevel">
                                                <CustomCheckbox key={i}
                                                    name={item.mValue}
                                                    labelText={item.mValue}
                                                    value={item.mIsRequired}
                                                    onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Risk', e)}
                                                    disabled={(props.componentData.viewdisable == true) ? true : false}
                                                    checked={item.mIsRequired}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}

                                                />
                                            </GridItem> : null)
                                    ))}
                                </GridContainer>
                                <GridContainer style={{ 'position': 'relative', 'left': '46px' }}>
                                    {(props.componentData.insurableRcbdetails.length > 1) ?

                                        (props.componentData.insurableRcbdetails.map((list, index) => (


                                            <GridContainer>
                                                {(list.levelId == m.mID && (list.insurableChildRcbdetails.length > 0)) ?
                                                    <GridContainer> <p className="bold-font">{list.inputType}</p></GridContainer> : null}

                                                {/*(list.levelId == m.mID && list.insurableChildRcbdetails.length > 1) ? <GridContainer><GridItem xs={12} sm={12} md={4}>
                                                    <Dropdown required={true} disabled={props.viewdisable} required={true} labelText="Identification Number" lstObject={list.insurableChildRcbdetails} onChange={(e) => props.componentData.SetIdentification(e, index)} name='IdentificationNumber' formControlProps={{ fullWidth: true }} />
                                                </GridItem>  </GridContainer> : null*/}

                                                {((list.insurableChildRcbdetails.length > 0) ? (

                                                    (list.insurableChildRcbdetails.map((prop, k) => (
                                                        ((prop.levelId == m.mID) ?

                                                            <GridItem xs={12} sm={12} md={3} className="downlevel">

                                                                <CustomCheckbox key={k}
                                                                    name={prop.mValue}
                                                                    labelText={prop.mValue}
                                                                    value={prop.mIsRequired}
                                                                    onChange={(e) => props.componentData.SetInsurableRiskClaimsDetailsValue(e, index)}
                                                                    // disabled={(props.componentData.viewdisable == true) ? true : false}
                                                                    disabled={(prop.disable == true) ? true : null}
                                                                    checked={prop.mIsRequired}
                                                                    formControlProps={{
                                                                        fullWidth: true
                                                                    }}

                                                                />

                                                            </GridItem>

                                                            : null)
                                                    )))) : null)}
                                                {(list.levelId == m.mID && list.coverRcbdetails.length > 0) ? <GridContainer> <h5 className="bold-font">Cover</h5>   </GridContainer> : null}
                                                {((list.coverRcbdetails.length > 0) ? (
                                                    (list.coverRcbdetails.map((Clist, pos) => (
                                                        <GridContainer style={{ 'position': 'relative', 'left': '46px' }}>
                                                            {(Clist.levelId == m.mID) ?
                                                                <GridContainer>
                                                                    {(Clist.coverChildRcbdetails.length > 0) ? <GridContainer> <p className="bold-font">{Clist.inputType}</p>   </GridContainer>:null}

                                                                    {((Clist.coverChildRcbdetails.length > 0) ? (

                                                                        (Clist.coverChildRcbdetails.map((pr, lineno) => (

                                                                            //  ((pr.levelId == m.mID) ?
                                                                            <GridItem xs={12} sm={12} md={3} className="downlevel">

                                                                                <CustomCheckbox key={lineno}
                                                                                    name={pr.mValue}
                                                                                    labelText={pr.mValue}
                                                                                    value={pr.mIsRequired}
                                                                                    onChange={(e) => props.componentData.SetCoverRiskClaimsDetailsValue(e, index, pos)}
                                                                                    //disabled={(props.componentData.viewdisable == true) ? true : false}
                                                                                    disabled={(pr.disable == true) ? true : null}
                                                                                    checked={pr.mIsRequired}
                                                                                    formControlProps={{
                                                                                        fullWidth: true
                                                                                    }}

                                                                                />

                                                                            </GridItem>
                                                                            //:
                                                                            //null)
                                                                        )))) : null)}
                                                                </GridContainer>
                                                                : null}
                                                        </GridContainer>
                                                    )))
                                                ) : null)}
                                                {/*  {
                                                truedata.map((item, i) => (
                                                    ((truedata[i].levelId == m.mID) ?
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
                                                        </GridItem> : null)
                                                ))
                                            }
                                            {
                                                falsedata.map((item, i) => (

                                                    ((falsedata[i].levelId == m.mID) ?
                                                        <GridItem xs={12} sm={12} md={3} className="downlevel">
                                                            <CustomCheckbox key={i}
                                                                name={item.mValue}
                                                                labelText={item.mValue}
                                                                value={item.mIsRequired}
                                                                onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Risk', e)}
                                                                disabled={(props.componentData.viewdisable == true) ? true : false}
                                                                checked={item.mIsRequired}
                                                                formControlProps={{
                                                                    fullWidth: true
                                                                }}

                                                            />
                                                        </GridItem> : null)
                                                ))
                                            }
                                             */}
                                            </GridContainer>))
                                        ) : null}

                                </GridContainer>
                            </CardBody>


                        ) : null


                    )
                    )



                } {props.componentData.ProductDTO.ProductDTO.isMasterPolicy == true ? < SwitchONParameter {...props} /> : ""}
                    {
                        (truepaymentdata.length > 0 || falsepaymentpdata.length > 0) ? (
                            <div>
                                <GridContainer> <h5 className="bold-font">Payment</h5></GridContainer>
                                <GridContainer>

                                    {truepaymentdata.map((item, j) => (

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomCheckbox key={j}
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
                                        </GridItem>
                                    ))}
                                </GridContainer>
                                <GridContainer>
                                    {falsepaymentpdata.map((item, j) => (
                                        <GridItem xs={12} sm={12} md={3} >
                                            <CustomCheckbox key={j}
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
                                        </GridItem>
                                    ))}

                                </GridContainer>

                            </div>) : null
                    }
                </Animated> </div>) : null);
    //  }
}
export default Risk;
