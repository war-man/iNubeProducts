import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import HierarchyConfig from "modules/Hierarchy/HierarchyConfig.js";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

import Dropdown from "components/Dropdown/Dropdown.jsx";





const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}

class Decision extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtable: false,
            decisionDD:[ {
                mId: 1,
                mValue: "To Be Promoted"
            },
                {
                    mId: 2,
                    mValue: "To Be Demoted"
                },
                {
                    mId: 3,
                    mValue: "Remain Same"
                },
                {
                    mId: 4,
                    mValue: "To be Terminated"
                }],
            movArray: [],
            decArrData:[],

        }
    };

   
    tableshow = () => {
        this.setState({ showtable: true });
    };

    componentDidMount() {
        debugger
        console.log("mov id", this.props.movementId, this.props.decisionDTO);
        if (this.props.movementId != undefined) {
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetMovementDetails?MovementId=` + this.props.movementId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Coa data: ", data);
                    this.setState({ decArrData: data });
                    let fields = this.props.decisionDTO;
                    var fieldsLength = this.state.decArrData.length-1;
                    fields.movementTypeId = this.state.decArrData[parseInt(fieldsLength)].movementTypeId;
                    fields.newBranchId = this.state.decArrData[parseInt(fieldsLength)].newBranchId;
                    fields.newPositionId = this.state.decArrData[parseInt(fieldsLength)].newPositionId;
                    fields.reason = this.state.decArrData[parseInt(fieldsLength)].reason;
                    this.setState({fields});
                    console.log("decision", this.props.decisionDTO, this.state.decArrData,fieldsLength);
                });
        }
    }

    render() {
        const { classes } = this.props;
        console.log("props dec data", this.props);
        return (
            <Card>
                <CardHeader color="rose" icon>
                    { /*  <CardIcon color="rose">
                       

                        <Icon><img id="icon" src={searchproduct} /></Icon>

                    </CardIcon>  */}
                    <h4 className={this.props.cardIconTitle}>
                        <small><TranslationContainer translationKey="Recommendation"/></small>
                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={4}>
                            {/* <Dropdown
                                labelText="Decision"
                               
                               // value={}
                                lstObject={this.state.decisionDD}
                                name='decisionId'
                               // onChange={(e) => this.SetCategory("string", e, props.index)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            /> */}
                            <MasterDropdown
                                labelText="Decision"
                                value={this.props.decisionDTO.movementTypeId}
                                disabled={this.props.disabled}
                                lstObject={this.props.masterList}
                                filterName='MovementType'
                                model="decisionDTO"
                                name='movementTypeId'
                                onChange={(e) => this.props.Setdecisiondd("string", e)}
                              
                                formControlProps={{ fullWidth: true }} />

                            {/* <CustomInput
                                labelText="Decision"
                                // name="mobileNumber"
                                // value={this.state.ClaimDTO.mobileNumber}
                                //  onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            /> */}
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            {/* <CustomInput
                                labelText="New Branch"
                                // name="mobileNumber"
                                // value={this.state.ClaimDTO.mobileNumber}
                                //  onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            /> */}
                            <Dropdown
                                labelText="NewBranch"

                                // value={}
                                lstObject={this.props.branchList}
                                disabled={this.props.disabled}
                                name='newBranchId'
                                value={this.props.decisionDTO.newBranchId}
                                onChange={(e) => this.props.SetDecision("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            /> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            
                            <MasterDropdown
                                labelText="NewDesignation"
                                value={this.props.decisionDTO.newPositionId}
                                disabled={this.props.disabled}
                                lstObject={this.props.designationList}
                                filterName='Designation'
                                model="decisionDTO"
                                name='newPositionId'
                                onChange={(e) => this.props.SetDecision("string", e)}
                                formControlProps={{ fullWidth: true }} />
                            
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Reason"
                                name="reason"
                                value={this.props.decisionDTO.reason}
                                disabled={this.props.disabled}
                                onChange={(e) => this.props.SetDecision("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        
                    </GridContainer>
                  
                        

                </CardBody>
            </Card>


        );
    }
}
export default withStyles(style)(Decision);