import React, { useState } from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ReactTable from "react-table";
import { Animated } from "react-animated-css";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ContractTab from "./_ContractTab";
import validationPage from "modules/Billing/ValidationPage.jsx";



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

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}



class CreateContract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ContDisable: false,
          //  errormessage: this.props.errormessage,
            DateRange: false,
            datediff: "",

            //contractNameState: "",
            //createdDateState: "",
            //maxCreditAmountAllowedState: "",
            //maxCreditPeriodState: "",
            //gracePeriodState: "",
            //ponoState: "",

            errorSdate: false,
            errorEdate: false,
            cStartDatetime: 0,
            cEndDatetime: 0,
            crddate:0,
        }
    }

    componentDidMount() {
        if (this.props.SearchFlag == true) {
            this.setState({ ContDisable: true });
            this.props.props.ContractData[this.props.index].createdDate = new Date(this.props.props.ContractData[this.props.index].createdDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.props.props.ContractData[this.props.index].contractEffectiveDate = new Date(this.props.props.ContractData[this.props.index].contractEffectiveDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.props.props.ContractData[this.props.index].contractEndDate = new Date(this.props.props.ContractData[this.props.index].contractEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.props.props.ContractData[this.props.index].podate = new Date(this.props.props.ContractData[this.props.index].podate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
        }
        this.setState({});
        //this.setState({ errormessage: this.props.errormessage });
        //console.log("componentdidmount:", this.props.errormessage);
    }

    //shouldComponentUpdate(nextProps) {
    //    const differentTitle = this.props.errormessage !== nextProps.errormessage;
    //    //  const differentDone = this.props.done !== nextProps.done
    //    console.log("different:", differentTitle);
    //    return differentTitle;
    //}

    //UNSAFE_componentWillMount() {
    //    this.setState({ errormessage: this.props.errormessage });
    //        console.log("fetchdata:", this.state.errormessage);
    //}

    //componentDidUpdate(prevProps) {
    //    // Typical usage (don't forget to compare props):
    //    if (this.props.errormessage !== prevProps.errormessage) {
    //        // this.fetchData(this.props.errormessage);
    //        const val = this.props.errormessage;
    //        this.setState({ errormessage: val })
    //    }
    //    console.log("fetchdata:", this.props.errormessage);
    //}

//    componentWillReceiveProps(nextProps){
//    //    if (nextProps.errormessage !== this.props.errormessage){
//    //        //Perform some operation
//    //        const val = nextprops.errormessage;
//        this.setState({ errormessage: nextProps.errormessage });
//            console.log("fetchdata:", this.state.errormessage);
// // }
//}

    onInputChange = (type, index, event) => {
        debugger
        const ContractData = this.props.props.ContractData;
        ContractData[index][event.target.name] = event.target.value;
        this.setState({ ContractData });
        this.change(event, event.target.name, type);
    };
   
    onDateChangeContract = (formate, name, index, event) => {
       

        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;

        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        var date1 = dd + '/' + mm + '/' + today.getFullYear();

        if (name === "PurchaseOrderDate") {
            let state = this.props.props.ContractData;
            state[index][name] = date1;
            this.setState({ state });
        } else {
            const ContractDTO = this.props.props.ContractData;
            ContractDTO[index][name] = date1;
            this.setState({ ContractDTO });
        
            if (name == "createdDate") {
                this.state.crddate = today.getTime();
            }
            if (name == "contractEffectiveDate") {
                this.state.cStartDatetime = today.getTime();
            
                // if (this.props.props.ContractData[index].contractEffectiveDate < this.props.props.ContractData[index].createdDate) {
                if (today.getTime() < this.state.crddate) {
                    this.setState({ errorSdate: true });
                } else {
                    this.setState({ errorSdate: false });
                }
        }
            if (name == "contractEndDate") {
                this.state.cEndDatetime = today.getTime();
                
            //if (this.props.props.ContractData[index].contractEndDate < this.props.props.ContractData[index].contractEffectiveDate) {
                if (today.getTime() < this.state.cStartDatetime) {
                    this.setState({ errorEdate: true });
                } else {
                    this.setState({ errorEdate: false });
                }
            }
        }
        this.change(event, name, formate);
    };

    change(event, stateName, type, date, maxValue) {
        switch (type) {

            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "datetime":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "number":
                if (validationPage.verifyNumeric(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "numspchras":
                if (validationPage.verifynumspchars(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    //validateUIContract = () => {
    //    if (this.state.contractNameState == "success" && this.state.maxCreditAmountAllowedState == "success" && this.state.maxCreditPeriodState == "success" && this.state.gracePeriodState == "success" && this.state.ponoState == "success" ) {
    //        return true;
    //    }
    //    else {
    //        return false;
    //    }
    //}

    render() {
        const { classes } = this.props;
        console.log("props history", this.props);
        const prop = this.props.props;
        const props = this.props;
        console.log("props.props", prop);
       // console.log("invoice", prop.ContractData[props.index].contractName);
        //const contractid = this.prop.ContractData[props.index].contractId;
        return (

            <CardBody>

                    <GridContainer>

                        <GridItem xs={12} sm={12} md={4}>
                        <CustomDatetime
                            success={prop.createdDateState === "success"}
                            error={prop.createdDateState === "error"}
                                required={true}
                                labelText="ContractDate"
                                disabled={this.state.ContDisable}
                                id='dtActiveFrom'
                                name='createdDate'
                                onChange={(evt) => this.onDateChangeContract('datetime', 'createdDate', props.index, evt)}
                                value={prop.ContractData[props.index].createdDate}
                                formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (prop.ContractData[props.index].createdDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                            success={prop.contractNameState === "success"}
                            error={prop.contractNameState === "error"}
                                required={true}
                                labelText="ContractName"
                                name="contractName"
                                // required={true}
                                disabled={this.state.ContDisable}
                                value={prop.ContractData[props.index].contractName}
                                onChange={(e) => this.onInputChange("string", props.index, e)}

                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                        <CustomDatetime
                            success={prop.contractEffectiveDateState === "success"}
                            error={prop.contractEffectiveDateState === "error"}
                                required={true}
                                labelText="EffectiveFromDate"
                                disabled={this.state.ContDisable}
                                id='dtActiveFrom'
                            name='contractEffectiveDate'
                                onChange={(evt) => this.onDateChangeContract('datetime', 'contractEffectiveDate', props.index, evt)}
                                value={prop.ContractData[props.index].contractEffectiveDate}
                                formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (prop.ContractData[props.index].contractEffectiveDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                        {this.state.errorSdate && (prop.ContractData[props.index].contractEffectiveDate < prop.ContractData[props.index].createdDate) ? <p className="error">*Contract Start Date can't be less than Contract Date</p> : null}
                    </GridItem>


                        <GridItem xs={12} sm={12} md={4}>
                        <CustomDatetime
                            success={prop.contractEndDateState === "success"}
                            error={prop.contractEndDateState === "error"}
                            required={true}
                            disabled={props.disableView}
                                labelText="EffectiveToDate"
                                id='dtActiveFrom'
                            name='contractEndDate'
                                onChange={(evt) => this.onDateChangeContract('datetime', 'contractEndDate', props.index, evt)}
                                value={prop.ContractData[props.index].contractEndDate}
                                formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (prop.ContractData[props.index].contractEndDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                        {this.state.errorEdate && (prop.ContractData[props.index].contractEndDate < prop.ContractData[props.index].contractEffectiveDate) ? <p className="error">*Contract End Date can't be less than Contract Start Date</p> : null}
                    </GridItem>


                        {/* <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="Contract Currency"
                                id="Currency"
                                required={true}
                               // value={this.state.ContractData.currencyId}
                               // lstObject={this.state.masterList}
                                required={true}
                                filterName='Currency'
                                name='currencyId'
                               // onChange={this.onInputParamChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem> */}
                        <GridItem xs={12} sm={4}>
                            <CustomInput
                            success={prop.maxCreditAmountAllowedState === "success"}
                            error={prop.maxCreditAmountAllowedState === "error"}
                            disabled={props.disableView}
                                labelText="MaxCreditAmount"
                                name="maxCreditAmountAllowed"
                            required={true}
                            type="numeric"
                            inputType="number"
                                value={prop.ContractData[props.index].maxCreditAmountAllowed}
                                onChange={(e) => this.onInputChange("number", props.index, e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                            success={prop.maxCreditPeriodState === "success"}
                            error={prop.maxCreditPeriodState === "error"}
                            disabled={props.disableView}
                                labelText="MaxCreditPeriod"
                                name="maxCreditPeriod"
                            required={true}
                            inputType="number"
                                value={prop.ContractData[props.index].maxCreditPeriod}
                                onChange={(e) => this.onInputChange("number", props.index, e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <CustomInput
                            success={prop.gracePeriodState === "success"}
                            error={prop.gracePeriodState === "error"}
                            disabled={props.disableView}
                                labelText="GracePeriod"
                                name="gracePeriod"
                            required={true}
                            inputType="number"
                                value={prop.ContractData[props.index].gracePeriod}
                                onChange={(e) => this.onInputChange("number", props.index, e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            success={prop.ponoState === "success"}
                            error={prop.ponoState === "error"}
                            disabled={props.disableView}
                            labelText="PurchaseOrderNo"
                            name="pono"
                            required={true}
                            value={prop.ContractData[props.index].pono}
                            onChange={(e) => this.onInputChange("numspchras", props.index, e)}
                            formControlProps={{ fullWidth: true }}
                        />
                        {props.errormessage && (prop.ContractData[props.index].pono == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                    </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime
                            required={true}
                            disabled={props.disableView}
                                labelText="PurchaseOrderDate"
                                id='dtActiveFrom'
                                name='podate'
                                onChange={(evt) => this.onDateChangeContract('datetime', 'podate', props.index, evt)}
                                value={prop.ContractData[props.index].podate}
                                formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (prop.ContractData[props.index].podate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                        </GridItem>

                        {/* <GridItem xs={5} sm={3} md={3} lg={1}>
                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                            <Button id="round" color="info" onClick={prop.handleModifyContract}> Modify  </Button>
                        </Animated>
                    </GridItem>
                    */}

                    </GridContainer>

                <GridContainer>
                    <ContractTab props={this.props.props} SearchFlag={this.props.SearchFlag} errormessage={props.errormessage} InvoiceData={this.props.InvoiceData} cStartDate={this.state.cStartDatetime} cEndDate={this.state.cEndDatetime} disableView={props.disableView} handleBillingitem={this.props.handleBillingitem} />
                    </GridContainer>



                
            </CardBody>

        );
    }
}

export default withStyles(style)(CreateContract);

