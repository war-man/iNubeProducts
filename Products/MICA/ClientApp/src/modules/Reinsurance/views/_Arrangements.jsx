import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Modal from '@material-ui/core/Modal';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

};
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

const Arrangements = (props) => {
    console.log("ppp",props);
    let arrangementDetails = props;
    return (
        <div>
            <h3 align="left"><center><b><TranslationContainer translationKey="Arrangements" /></b></center></h3>
           
            <card>
                <h5 align="left"><b><TranslationContainer translationKey="TreatyGroup" /></b>:{props.treatydata[props.index].treatyGroupName}</h5>

            </card>
            <GridContainer>
                 <GridItem xs={12} sm={12} md={3}>
                    <MasterDropdown
                        labelText="Allocationon"
                        id="ddlstatus"
                        lstObject={props.masterList}
                        filterName='AllocationOn'
                        value={arrangementDetails.treatydata[arrangementDetails.index].tblArrangement[0].allocationOnId}
                        name='allocationOnId'
                        onChange={(e) => arrangementDetails.handleAggrement(e)}
                        formControlProps={{ fullWidth: true }} />

                </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                    <Dropdown
                        labelText="AllocationLogic"
                        id="ddlstatus"
                        lstObject={props.allocationList}
                        filterName='AllocationLogic'
                        value={arrangementDetails.treatydata[arrangementDetails.index].tblArrangement[0].allocationLogicId}
                        name='allocationLogicId'
                        onChange={(e) => arrangementDetails.handleAggrement(e)}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
               {/*   <GridItem xs={12} sm={12} md={3}>
                    <MasterDropdown
                        labelText="AllocationLogic"
                        id="ddlstatus"
                        lstObject={props.masterList}
                        filterName='AllocationLogic'
                        value={arrangementDetails.treatydata[arrangementDetails.index].tblArrangement[0].allocationLogicId}
                        name='allocationLogicId'
                        onChange={(e) => arrangementDetails.handleAggrement(e)}
                        formControlProps={{ fullWidth: true }} />

                </GridItem>*/}
                {props.showPercentage &&
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Percent"
                            id="percentage"
                            value={props.treatydata[props.index].tblArrangement[0].percentage}
                            name='percentage'
                            error={props.percentageState}
                            onChange={(e) => arrangementDetails.handleAggrement1("numeric", e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }
                {props.showlimit &&
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Limit"
                            id="amount"
                            value={props.treatydata[props.index].tblArrangement[0].amount}
                            name='amount'
                            error={props.amountState}
                            onChange={(e) => arrangementDetails.handleAggrement1("numeric", e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }
                {props.shownooflines &&
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="No Of Lines"
                            id="nooflines"
                        value={props.treatydata[props.index].tblArrangement[0].noOfLines}
                        name='noOfLines'
                            //error={props.amountState}
                            onChange={(e) => arrangementDetails.handleAggrement1("numeric", e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }
                <GridItem xs={12} sm={12} md={3}>
                    <MasterDropdown
                        labelText="HigherLower"
                        id="ddlstatus"
                        lstObject={props.masterList}
                        filterName='HigherLower'
                        value={arrangementDetails.treatydata[arrangementDetails.index].tblArrangement[0].higherOrLowerId}
                        name='higherOrLowerId'
                        onChange={(e) => arrangementDetails.handleAggrement(e)}
                        formControlProps={{ fullWidth: true }} />

                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <MasterDropdown
                        labelText="AllocationBasis"
                        id="ddlstatus"
                        lstObject={props.masterList}
                        filterName='AllocationBasis'
                        value={arrangementDetails.treatydata[arrangementDetails.index].tblArrangement[0].allocationBasisId}
                        name='allocationBasisId'
                        onChange={(e) => arrangementDetails.handleAggrement(e)}
                        formControlProps={{ fullWidth: true }} />

                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        labelText="PLA"
                        id="ReinsurerName"
                        value={arrangementDetails.treatydata[arrangementDetails.index].tblArrangement[0].pla}
                        name='pla'
                        error={props.plaState}
                        //onChange={(e) => arrangementDetails.handleAggrement(e)}
                        onChange={(e) => arrangementDetails.handleAggrement1("numeric", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        labelText="CLA"
                        id="ReinsurerName"
                        value={arrangementDetails.treatydata[arrangementDetails.index].tblArrangement[0].cla}
                        name='cla'
                        error={props.claState}
                        //onChange={(e) => arrangementDetails.handleAggrement(e)}
                        onChange={(e) => arrangementDetails.handleAggrement1("numeric", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridContainer justify="center">
                <GridItem>
                        <Button round color="info" onClick={props.handleClose}>Ok</Button>
                    </GridItem>
                </GridContainer>
            </GridContainer>
        </div>
    );

}
export default Arrangements;