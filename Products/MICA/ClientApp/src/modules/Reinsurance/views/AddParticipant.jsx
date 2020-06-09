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

const AddParticipant = (props) => {
    let list = [];
    const { classes } = props;
    console.log('Chanels', props);

    const prop = props.componentData;

    console.log("props componentData: ", props.componentData);

    console.log("channel masterList: ", props.componentData.masterList);

    //console.log("mvalue: ", channels);



    //if (TreatyData.masterList.length > 0) {

    //    let listdata = TreatyData.masterList.filter(item => item.mType == "Channels");

    //    console.log("listdata", listdata)

    //    list = listdata[0].mdata;

    //    console.log("list", list)



    //}
    let treatyDto = props.componentData.participant;
    return (
        <div>
            <Card className="no-shadow" >
                
                <CardBody>
                   
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                        <MasterDropdown
                            labelText="ReinsurerCode"
                                id="ddlstatus"
                                required={true}
                             lstObject={props.componentData.rimasterList}
                             filterName='Reinsurer'
                             value={treatyDto.reInsurerId}
                                name='reInsurerId'
                                onChange={(e) => prop.onddChange(e, treatyDto.reinsurercodeId,'reInsurerId')}
                            formControlProps={{ fullWidth: true }} />

                    </GridItem>
                  
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="ReinsurerName"
                                id="ReinsurerName"
                                value={props.componentData.reinsurername}
                                name='reinsurername'
                                onChange={(e)=>prop.onparticipantInputChange(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="Branch Code"
                                id="ddlstatus"
                                lstObject={props.componentData.bcmasterList}
                                filterName='BrachCode'
                                value={treatyDto.reInsurerBranchId}
                                name='reInsurerBranchId'
                                onChange={(e) => prop.onddChange(e, '', 'reInsurerBranchId')}
                                formControlProps={{ fullWidth: true }} />

                        </GridItem>
                        </GridContainer>
                        
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="BrokerCode"
                                id="ddlstatus"
                                lstObject={props.componentData.bkmasterList}
                                filterName='Broker'
                                value={treatyDto.brokerId}
                                name='brokerId'
                                onChange={(e) => prop.onddlChange(e,'brokerId')}
                                formControlProps={{ fullWidth: true }} />

                        </GridItem>
                
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="BrokerName"
                                id="remarks"
                                value={treatyDto.brokername}
                                name='brokername'
                                onChange={(e) => prop.onparticipantInputChange(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="BranchCode"
                                id="ddlstatus"
                                lstObject={props.componentData.bkbcmasterList}
                                filterName='BrachCode'
                                value={treatyDto.brokerBranchId}
                                name='brokerBranchId'
                                onChange={(e) => prop.onddlChange(e, 'brokerBranchId')}
                                formControlProps={{ fullWidth: true }} />

                            </GridItem>
                        </GridContainer>

                        <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Share"
                                id="remarks"
                                value={treatyDto.sharePercentage}
                                name='sharePercentage'
                                onChange={(e) => prop.onparticipantInputChange(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Brokage"
                                id="remarks"
                                value={treatyDto.brokeragePercentage}
                                name='brokeragePercentage'
                                onChange={(e) => prop.onparticipantInputChange(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="RICommision"
                                id="remarks"
                                value={treatyDto.ricommissionPercentage}
                                name='ricommissionPercentage'
                                onChange={(e) => prop.onparticipantInputChange(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="BordereauxFrequency"
                                id="ddlstatus"
                                lstObject={props.componentData.masterList}
                                filterName='Bordereaux Frequency'
                                value={treatyDto.bordereauxFreqId}
                                name='bordereauxFreqId'
                                onChange={(e) => prop.onddChange(e,'','bordereauxFreqId')}
                                formControlProps={{ fullWidth: true }} />

                        </GridItem>
                        </GridContainer>

           


                    <GridContainer justify="center">
                        <GridItem>
                            <center>
                                <Button round color="rose" onClick={prop.AddParticipant}>Add Participant</Button>
                            </center>
                        </GridItem>
                            </GridContainer>
                   
                
                 </CardBody>
            </Card>

        </div>
        )
}
export default AddParticipant;