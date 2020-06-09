import React from "react";
// @material-ui/core components

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
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import billing from "assets/img/billing.png";

import { Animated } from "react-animated-css";
import InstallmentDetails from "./_InstallmentDetails";
import swal from 'sweetalert';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import EventBased from "./_EventBased";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import _Events from "./_Events";
import AddEvent from "./_AddEvent";
import BillingConfig from 'modules/Billing/BillingConfig.js';
import HistoryCollapse from "./_HistoryCollapse";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
import Add from "@material-ui/icons/AddCircleOutline";
import Delete from "@material-ui/icons/Delete";
import ModifyEventCollapse from "./_ModefyEventCollapse";


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


class CreateBilling extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datediff: 1,
            validdate:true,
            contractIdState: "",
            contractNameState: "",
            ContractEffectiveDateState: "",
            contractEndDateState: "",
            billingStartDateState: "",
            billingEndDateState: "",
            rateState: "",
            count: 0,
            BIcount: 0,
            disableRate: false,
            showlist: [],
            showlistValue: { catddl: true, catCount: false, CountRate: false, valuefactor: false, rate: false, addibtn: false, eventtable: false, ratedisplay: false, percentdisplay: false, disableRate: false, recurring: false, recurringRate: false, frequency: false},
            ValueFactor: [{ valueFactorlist: [] }],
            show: [],

            index: 0,
            masterList: [],
            objectList: [],
            eventlist: [],
            valueFactorlist: [],
            productRateCategory: [],
            dataRows: [],
            historydata: [],
            Cumulative: [],
            viewdisable: false,
            searchContractTable: false,
            bitem: [],
            inst: [],
            cwe: [],
            eventCount: 0,
            search: false,
            contractN: "",
            contracteffDt: "",
            contractendDt: "",
            eventVal: 0,
            objectVal: 0,
            billingObjectId: "",
            billingEventId: "",
            objecteventVal: "",
            object: 0,
            event: 0,
            objevemapdata: {},
            frequencyIndex: 0,
            recurringRate: false,
            balanceamount: 0,
            rembalance: 0,


            ContractDTO:
            {
                "contractId": 0,
                "contractName": "",
                "vendorId": 0,
                "customerId": 0,
                "contractEffectiveDate": "",
                "contractEndDate": "",
                "maxCreditPeriod": 0,
                "maxCreditAmountAllowed": 0,
                "gracePeriod": 0,
                "currencyId": 0,
                "pono": "",
                "podate": "",
                "createdBy": 0,
                "createdDate": "",
                "isActive": ""
            },
            billingConfigs: {
                "billingConfigId": 0,
                "contractId": 0,
                "billingStartDate": "",
                "billingEndDate": "",
                "currencyId": "",
                "remarks": "",
                "billingAmount": "",
                "createdBy": 0,
                "createdDate": "",
                "tblBillingItem": [
                ]
            },
            billingItem: [
                {
                    "billingItemId": 0,
                    "billingConfigId": 0,
                    "billingTypeDesc": "",
                    "billingFrequencyId": 0,
                    "noofFrequency": 0,
                    "categoryTypeId": 0,
                    "valueFactorId": 0,
                    "rateCategoryId": 0,
                    "rateTypeId": 0,
                    "threshold": 0,
                    "rate": 0,
                    "createdBy": 0,
                    "createdDate": "",
                    "eventMappingId": 0,
                    "BillingItemDetail": [
                        {
                            "billingItemDetailId": 0,
                            "billingItemId": 0,
                            "seqNo": 0,
                            "amount": 0,
                            "dueDate": "",
                            "from": 0,
                            "to": 0,
                            "ratePercent": 0,
                            "cumulative": 0
                        }
                    ],
                    "tblBillingItemDetail": [
                        {
                            "billingItemDetailId": 0,
                            "billingItemId": 0,
                            "seqNo": 0,
                            "amount": 0,
                            "dueDate": "",
                            "from": 0,
                            "to": 0,
                            "ratePercent": 0,
                            "cumulative": 0
                        }
                    ]

                }
            ],


            onetime: false,
            recurring: false,
            eventbased: false,
            detail: false,
            frequency: false,
            remainingBalance: false,
            contractdata: [],
            searchTableSec: false,
            BillingsearchData: [],
            addBill: [],
            mapval: [],
            ddEventmodify: false,
            mindex: 0,
            mobjval: [],
            flagModify: false,
            errorSdate: false,
            errorEdate: false,
        };
        this.BillingDetail = {
            "billingConfigs": this.state.billingConfigs,
            "billingItem": this.state.billingItem,
            "BillingItemDetail": this.state.BillingItemDetail,
        };
        this.addlist = this.addlist.bind(this);
    };

    componentDidMount() {

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetMaster?lMasterlist=Currency`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
        console.log("data", this.state.masterList);


        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetObjects`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("objectlist: ", data);
                this.setState({ objectList: data });
            });
        console.log("oblectlist", this.state.objectList);


        if (this.props.componentData.SearchFlag == true) {
        if (this.props.componentData.props.ContractData[0].tblBillingConfig.length > 0) {
            const billing = this.props.componentData.props.ContractData[0].tblBillingConfig[0];
            console.log("Billing:",billing);
            let bdata = this.state;
            bdata['billingConfigs'] = billing;
            bdata['billingItem'] = billing.tblBillingItem;
           
            this.setState({ bdata });
            this.BillingDetail['billingConfigs'] = billing;
            this.BillingDetail['billingItem'] = billing.tblBillingItem;
            this.setState({ billingItem: this.BillingDetail['billingItem'] });
            

            this.state.billingItem = this.state.billingItem.concat(
                {
                    "billingItemId": 0,
                    "billingConfigId": 0,
                    "billingTypeDesc": "",
                    "billingFrequencyId": 0,
                    "noofFrequency": 0,
                    "categoryTypeId": 0,
                    "valueFactorId": 0,
                    "rateCategoryId": 0,
                    "rateTypeId": 0,
                    "threshold": 0,
                    "rate": 0,
                    "createdBy": 0,
                    "createdDate": "",
                    "eventMappingId": 0,
                    "BillingItemDetail": [
                        {
                            "billingItemDetailId": 0,
                            "billingItemId": 0,
                            "seqNo": 0,
                            "amount": 0,
                            "dueDate": "",
                            "from": 0,
                            "to": 0,
                            "ratePercent": 0,
                            "cumulative": 0
                        }
                    ],
                    "tblBillingItemDetail": [
                        {
                            "billingItemDetailId": 0,
                            "billingItemId": 0,
                            "seqNo": 0,
                            "amount": 0,
                            "dueDate": "",
                            "from": 0,
                            "to": 0,
                            "ratePercent": 0,
                            "cumulative": 0
                        }
                    ]

                }

            )

            this.state.billingConfigs.billingStartDate = new Date(this.state.billingConfigs.billingStartDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.state.billingConfigs.billingEndDate = new Date(this.state.billingConfigs.billingEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });

            console.log("billingconfig", this.state.billingConfigs);
            console.log("billingItem", this.state.billingItem);
            const len = this.state.billingItem.length;
            debugger
            fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetAllEventMapping`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ mapval: data })
                    console.log("mapdata:", data);

                    this.setState({});
                    console.log("mapval:", this.state.mapval);
                    for (let i = 0; i < len; i++) {

                       // console.log("mappingid", this.state.billingItem[i].eventMappingId, this.state.mapval);
                        const mappingid = this.state.billingItem[i].eventMappingId;
                        console.log("mappingid", mappingid);
                        const filtermap = this.state.mapval.filter(i => i.mID === mappingid);
                        
                        console.log("filtermap", filtermap);
                        const objval = filtermap[0].mValue;
                        console.log("filter.mval", filtermap[0].mValue, objval);
                        const showList = this.state.showlistValue;
                        const value1 = this.state.ValueFactor;
                        debugger
                        if (objval == "Product Creation") {
                            //this.setState({ recurring: false });
                            showList['recurring'] = false;
                            showList['recurringRate'] = false;
                           // this.setState({ recurringRate: false });


                            showList['disableRate'] = true;
                            if (this.state.billingItem[i].categoryTypeId != 0) {

                                showList['catddl'] = true;
                            } else { showList['catddl'] = false; }
                            if (this.state.billingItem[i].rateCategoryId != 0) {
                                showList['catCount'] = true;
                            } else { showList['catCount'] = false; }
                            if (this.state.billingItem[i].rateTypeId != 0) {
                                showList['CountRate'] = true;
                            } else { showList['CountRate'] = false; }
                            if (this.state.billingItem[i].rate != 0) {
                                showList['rate'] = true;
                            } else { showList['rate'] = false; }
                            

                            //showList['ratedisplay'] = true;
                            //showList['percentdisplay'] = false;
                            debugger
                            if (this.state.billingItem[i].tblBillingItemDetail.length > 0) {
                                console.log("billingitemdetails:", this.state.billingItem[i].tblBillingItemDetail);
                                this.state.billingItem[i].BillingItemDetail = this.state.billingItem[i].tblBillingItemDetail;
                                console.log("Billingitemdetails:", this.state.billingItem[i].BillingItemDetail);
                               
                                for (let j = 0; j < this.state.billingItem[i].tblBillingItemDetail.length; j++)
                                    if (this.state.billingItem[i].tblBillingItemDetail[j].amount > 0) {
                                        showList['ratedisplay'] = true;
                                        showList['percentdisplay'] = false;
                                    } else {
                                        showList['ratedisplay'] = false;
                                        showList['percentdisplay'] = true;
                                    }
                                showList['eventtable'] = true;
                              
                            } else { showList['eventtable'] = false; }
                            

                            showList['addibtn'] = false;
                            this.setState({});


                        }
                        else if (objval == "Policy Creation" || objval == "Claim Intimation") {

                           // this.setState({ recurring: false });
                            showList['recurring'] = false;
                            showList['recurringRate'] = false;
                            //this.setState({ recurringRate: false });
                            if (this.state.billingItem[i].categoryTypeId != 0) {
                                showList['catddl'] = true;
                            } else { showList['catddl'] = false; }
                            
                            if (this.state.billingItem[i].rateCategoryId != 0) {
                                showList['catCount'] = true;
                            } else { showList['catCount'] = false; }
                            if (this.state.billingItem[i].rateTypeId != 0) {
                                showList['CountRate'] = true;
                            } else { showList['CountRate'] = false; }
                            if (this.state.billingItem[i].rate != 0) {
                                showList['rate'] = true;
                            } else { showList['rate'] = false; }
                            if (this.state.billingItem[i].valueFactorId != 0) {
                                showList['valuefactor'] = true;
                            } else { showList['valuefactor'] = false; }
                            debugger
                            if (this.state.billingItem[i].tblBillingItemDetail.length > 0) {
                                console.log("billingitemdetails:", this.state.billingItem[i].tblBillingItemDetail);
                                this.state.billingItem[i].BillingItemDetail = this.state.billingItem[i].tblBillingItemDetail;
                                console.log("Billingitemdetails:", this.state.billingItem[i].BillingItemDetail);
                                for (let j = 0; j < this.state.billingItem[i].tblBillingItemDetail.length; j++)
                                    if (this.state.billingItem[i].tblBillingItemDetail[j].amount > 0) {
                                        showList['ratedisplay'] = true;
                                        showList['percentdisplay'] = false;
                                    } else {
                                        showList['ratedisplay'] = false;
                                        showList['percentdisplay'] = true;
                                    }
                                showList['eventtable'] = true;
                              
                               
                            } else { showList['eventtable'] = false; }
                        }
                        else if (objval == "MICA OneTime License Cost") {
                            showList['catddl'] = false;
                            showList['catCount'] = false;
                            showList['CountRate'] = false;
                            showList['valuefactor'] = false;
                            showList['eventtable'] = false;
                            showList['rate'] = true;

                        }
                        else if (objval == "MICA Recurring Installment") {
                            showList['recurring'] = true;
                            showList['catddl'] = false;
                            showList['rate'] = false;
                            showList['valuefactor'] = false;
                            if (this.state.billingItem[i].billingFrequencyId == 4) {
                                showList['frequency'] = true;
                                showList['recurringRate'] = true;
                                // this.setState({ frequency: true, recurringRate: true });

                            }
                            else {
                                showList['frequency'] = false;
                                showList['recurringRate'] = true;
                                // this.setState({ frequency: false });
                            }
                        }
                        else if (objval == "MICA Recurring Flat Amount") {
                            showList['recurring'] = false;
                            showList['catddl'] = false;
                            showList['rate'] = true;
                            showList['valuefactor'] = false;
                        }
                        else {
                            // this.state.billingItem[this.state.billingItem.length - 2].categoryTypeId = "";
                            // this.state.billingItem[this.state.billingItem.length - 2].rateTypeId = "";
                            this.setState({ showList });
                        }
                        this.setState({ showList });
                        this.state.showlist.push(showList);
                        this.state.ValueFactor.push(value1);
                        //this.setState({ showlist[i]: showList });
                        console.log("showlist", this.state.showlist);
                        this.setState({ flagModify: true });
                        this.state.addBill = this.state.addBill.concat({
                            title: objval,
                            content: <EventBased props={this.state} SetCategory={this.SetCategory} setBenifitValue={this.setBenifitValue} disableView={this.props.componentData.disableView} index={i} />
                        });
                        this.setState({});
                        console.log("addBill", this.state.addBill);
                    }
                });
        }
        }

    }

    //addFun = (evemapid) => {
    //    debugger
    //    fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetEventMapping?mappingid=` + evemapid, {
    //        method: 'GET',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //        },
    //    })
    //        .then(response => response.json())
    //        .then(data => {
    //            //this.setState({ mobjval: data });
    //            this.state.mobjval.push(data);
    //            console.log("mobjval:", this.state.mobjval);
    //        });
    //    debugger
    //    //this.state.showlist = this.state.showlist.concat({ catddl: false, catCount: false, CountRate: false, valuefactor: false, rate: false, addibtn: false, eventtable: false });
    //    const shwlst = this.state.showlistValue;
    //    this.state.showlist = this.state.showlist.concat({ shwlst });
    //    this.state.ValueFactor = this.state.ValueFactor.concat({ valueFactorlist: [] })
    //    this.CollapseDropDown(this.state.mobjval[0]);
    //    this.callfun();
    //    this.setState({ Eventmodify: true });
    //    console.log("eventmodify:", this.state.Eventmodify);
    //}

    callfun = () => {

    }
    SetValue = ((type, event) => {

        console.log("billing type", this.state.billingItem);
        event.preventDefault();
        let billingItem = this.state.billingItem;
        let name = event.target.name;
        let value = event.target.value;
        billingItem[0][name] = value;
        this.setState({ billingItem });

        this.setState({ [event.target.name]: event.target.value });
        console.log("value", event.target.value);
        console.log("name", event.target.name);

        const showList = this.state.showlistValue;
        if (event.target.value == 1) {
            showList['recurring'] = false;
            showList['frequency'] = false;
            this.setState({ onetime: true, detail: true, eventbased: false});
        }
        else if (event.target.value == 2) {
            showList['recurring'] = true;
            showList['frequency'] = false;
            this.setState({ onetime: false, detail: true, eventbased: false, frequency: false });
        }
        else if (event.target.value == 3) {
            showList['recurring'] = false;
            showList['frequency'] = false;
            this.setState({ onetime: true, detail: false, eventbased: true, frequency: false });
        }
        this.state.showlist.push(showList);
    });

    SetConfig = ((type, event) => {

        console.log("billing type", this.state.billingConfigs);
        event.preventDefault();
        let billingConfigs = this.state.billingConfigs;
        let name = event.target.name;
        let value = event.target.value;
        billingConfigs[name] = value;
        this.setState({ billingConfigs });

    });
   
   
    SetEvent = ((type, event) => {

        this.setState({ [event.target.name]: event.target.value });
        console.log("value: ", event.target.value);
        if (event.target.value == 6) {
            //  document.getElementById("event").style.display = 'block';
        }
        else {
            // document.getElementById("event").style.display = 'none';
        }
    })

    SetObject = ((type, event) => {
        debugger
        //this.state.eventlist = [];
        this.state.billingEventId = "";
        this.setState({ [event.target.name]: event.target.value });
        console.log("object:", event.target.value);
        this.state.objectVal = event.target.value;

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetEvents?obj=` + this.state.objectVal, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("eventlist: ", data);
                this.setState({ eventlist: data });
            });
        console.log("eventlist", this.state.eventlist);

        console.log("masterlist: ", this.state.masterList);
        const RateData = this.state.masterList.filter(i => i.mType === "RateCategory");


        if (event.target.value == 1) {
            let filter = RateData[0].mdata.filter(item => item.mID !== 13);
            console.log("filter", filter);
            this.setState({ productRateCategory: filter });
        }
        else {
            let filter = RateData[0].mdata;
            console.log("filter", filter);
            this.setState({ productRateCategory: filter });
        }
        console.log("productRateCategory: ", this.state.productRateCategory);
    });

    SetEventAdd = ((type, event) => {
        debugger
        this.setState({ [event.target.name]: event.target.value });
        console.log("event value:", event.target.value, 'showlist', this.state.billingItem.length - 1);
        this.state.eventVal = event.target.value;

        const showList = this.state.showlistValue;
        //creation
        if (event.target.value == 5 || event.target.value == 1 || event.target.value == 4) {
            this.EventAddCollapse();
        }

        if (event.target.value == 6 || event.target.value == 7) {
           // showList['recurring'] = true;
            this.EventAddCollapse();
           // this.setState({ recurring: true });
            //this.setState({ frequencyIndex: this.state.billingItem.length - 1 });
            //console.log("frequencyIndex", this.state.frequencyIndex);
        }
        this.state.showlist.push(showList);

    })

    EventAddCollapse = () => {
        debugger
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetObjectEvent?obj=` + this.state.billingObjectId + `&eve=` + this.state.eventVal, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {

                this.setState({ objecteventVal: data });
                console.log("objecteventVal:", this.state.objecteventVal);

            });

       // document.getElementById("ddEvents").style.display = 'block';
    }

    CollapseDropDown = (objval) => {
        debugger
        console.log("objval:", objval);
        this.state.billingItem[this.state.billingItem.length - 2].eventMappingId = this.state.objecteventVal[0];
        // const showList = this.state.showlist[this.state.billingItem.length - 2];
        const showList = this.state.showlistValue;
      //  const showList = this.state.showlist[this.state.billingItem.length - 1];
        debugger
        if (objval == "Product Creation") {
            //this.setState({ recurring: false });
          
            //this.setState({ recurringRate: false });

            this.state.billingItem[this.state.billingItem.length - 2].categoryTypeId = "10";
            //this.SetCategory("string", this.state.billingItem.length - 2);
            const showList = this.state.showlistValue;
            this.state.billingItem[this.state.billingItem.length - 2].rateTypeId = "15";
            showList['disableRate'] = true;

            showList['catddl'] = true;
            showList['catCount'] = true;
            showList['CountRate'] = true;

            showList['ratedisplay'] = true;
            showList['percentdisplay'] = false;
            showList['eventtable'] = true;
            showList['addibtn'] = true;
            showList['rate'] = false;

            showList['recurring'] = false;
            showList['recurringRate'] = false;
            showList['frequency'] = false;
            showList['valuefactor'] = false;

        }
        else if (objval == "Policy Creation" || objval == "Claim Intimation") {
            //this.state.billingItem[this.state.billingItem.length - 2].categoryTypeId = "";
           // this.state.billingItem[this.state.billingItem.length - 2].rateTypeId = "";
           // this.setState({ recurring: false });
            showList['recurring'] = false;
            showList['recurringRate'] = false;
            showList['frequency'] = false;
           // this.setState({ recurringRate: false });
            showList['disableRate'] = false;
            showList['catddl'] = true;
            showList['eventtable'] = false;
            showList['addibtn'] = false;


            showList['catCount'] = false;
            showList['CountRate'] = false;
            showList['rate'] = false;
            showList['valuefactor'] = false;

        }
        else if (objval == "MICA OneTime License Cost") {

            showList['rate'] = true;

            showList['catddl'] = false;
            showList['catCount'] = false;
            showList['CountRate'] = false;

            showList['ratedisplay'] = false;
            showList['percentdisplay'] = false;
            showList['eventtable'] = false;
            showList['addibtn'] = false;

            showList['recurring'] = false;
            showList['frequency'] = false;
            showList['recurringRate'] = false;
            showList['valuefactor'] = false;

        }
        else if (objval == "MICA Recurring Installment") {
            showList['recurring'] = true;
            showList['catddl'] = false;
            showList['rate'] = false; 
            showList['valuefactor'] = false;
        }
        else if (objval == "MICA Recurring Flat Amount") {
            showList['recurring'] = false;
            showList['catddl'] = false;
            showList['rate'] = true;
            showList['valuefactor'] = false;
        }
        else {
            this.state.billingItem[this.state.billingItem.length - 2].categoryTypeId = "";
            this.state.billingItem[this.state.billingItem.length - 2].rateTypeId = "";

        }
        this.setState({ showList });
        this.state.showlist.push(showList);
        this.setState({});
    }
    GetValueFactor = (objid, index) => {
        debugger
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetValueFactor?objevemappingid=` + objid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                const value = this.state.ValueFactor[index];

                value['valueFactorlist'] = data;
                this.setState({ value });
                console.log("valuefactordata", data);
                console.log("valueFactorlist[index]: ", this.state.ValueFactor[index]);

            });

    }
    
   
    datechange = (date) => {
        debugger
        console.log("date change", date);
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    handleSaveBilling = (event) => {
        if (this.state.billingItem.length > 0) {
            for (var i = 0; i < this.state.billingItem.length; i++) {
                delete this.state.billingItem[i].BillingItemDetail;
                if (this.state.billingItem[i].tblBillingItemDetail.length > 0) {
                    for (var j = 0; j < this.state.billingItem[i].tblBillingItemDetail.length; j++) {
                        if (this.state.billingItem[i].tblBillingItemDetail[j].from == "") {
                            this.state.billingItem[i].tblBillingItemDetail = [];
                        }
                    }
                }
            }
        }

        this.state.billingItem.pop();
        console.log("delete", this.state.billingItem)

        this.state.billingConfigs.billingStartDate = this.datechange(this.state.billingConfigs.billingStartDate);
        this.state.billingConfigs.billingEndDate = this.datechange(this.state.billingConfigs.billingEndDate);

        let billingConfig = this.state.billingConfigs;

        billingConfig['tblBillingItem'] = this.state.billingItem;

        this.setState({ billingConfigs: billingConfig });
        console.log("billingConfigs", this.state.billingConfigs);


        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SaveBillingDetails`, {
            method: 'POST',
            body: JSON.stringify(this.state.billingConfigs),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {

                swal({

                    text: "Data Saved Successfully",
                    icon: "success"
                });

                console.log("data save result:", data);

            });

    }
    histryTable = (rows) => {

        this.setState({
            data: rows.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    ModifiedDate: new Date(prop.modifiedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    ObjectEvent: prop.eventMap,
                    // Details: prop.details,
                    Frequency: prop.billingFrequency,
                    Currency: prop.currencyType,
                    EfficitiveDate: new Date(prop.efficitiveDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    EndDate: new Date(prop.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    //DueDate: prop[7],
                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="download" > ViewMore </Button>
                        </div>
                    )
                };
            })
        });
    }

    onDateChange = (formate, name, event) => {
        debugger

        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        console.log("gettime", today.getTime()); 
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
    
        if (mm < 10) {
            mm = '0' + mm;

        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        var date3 = dd + '/' + mm + '/' + today.getFullYear();
        
        const state = this.state.billingConfigs;
        state[name] = date3;
        this.setState({ state });
        // this.change(event, name, type);
       
        if (name == "billingStartDate") {
            if (today.getTime() < this.props.componentData.cStartDate || today.getTime() > this.props.componentData.cEndDate) {

                this.setState({ errorSdate: true });
            } else {
                this.setState({ errorSdate: false });
            }
        }
        if (name == "billingEndDate") {
            //var date2 = new Date();
            //var date1 = new Date(today);
            //var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            //var datediff = this.state.date;
            //datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            //var datediff = -Math.abs(datediff - 1);
            //this.setState({ datediff, validdate: false  });

            if (today.getTime() < this.props.componentData.cStartDate || today.getTime() > this.props.componentData.cEndDate) {
                this.setState({ errorEdate: true });
            }
            else {
                this.setState({ errorEdate: false });
            }
           
        }
  
    };

    onDateChangeContract = (formate, name, event) => {

        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const state = this.state.ContractDTO;
        state[name] = date;
        this.setState({ state });
        // this.change(event, name, type);
    };
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

  
    saverowsBtn = (event) => {

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SaveBillingItemDetails`, {
            method: 'POST',
            body: JSON.stringify(this.state.BillingItemDetailDTO),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {


                swal({

                    text: "Data Saved Successfully",
                    icon: "success"
                });

                console.log("data save result:", data);

            });

    }

   
    addlist = () => {

        debugger
        console.log("bilingitem", this.state.billingItem);
        this.state.billingItem = this.state.billingItem.concat(
            {
                "billingItemId": 0,
                "billingConfigId": 0,
                "billingTypeDesc": "",
                "billingFrequencyId": 0,
                "noofFrequency": 0,
                "categoryTypeId": 0,
                "valueFactorId": 0,
                "rateCategoryId": 0,
                "rateTypeId": 0,
                "threshold": 0,
                "rate": 0,
                "createdBy": 0,
                "createdDate": "",
                "eventMappingId": 0,
                "BillingItemDetail": [
                    {
                        "billingItemDetailId": 0,
                        "billingItemId": 0,
                        "seqNo": 0,
                        "amount": 0,
                        "dueDate": "",
                        "from": 0,
                        "to": 0,
                        "ratePercent": 0,
                        "cumulative": 0
                    }
                ],
                "tblBillingItemDetail": [
                    {
                        "billingItemDetailId": 0,
                        "billingItemId": 0,
                        "seqNo": 0,
                        "amount": 0,
                        "dueDate": "",
                        "from": 0,
                        "to": 0,
                        "ratePercent": 0,
                        "cumulative": 0
                    }
                ]
                
            }

        )

        //this.state.showlist = this.state.showlist.concat({ catddl: false, catCount: false, CountRate: false, valuefactor: false, rate: false, addibtn: false, eventtable: false })
        this.state.ValueFactor = this.state.ValueFactor.concat({ valueFactorlist: [] })
        console.log("bilingitem", this.state.billingItem);
        let val = this.state.objecteventVal[1];
        this.CollapseDropDown(val);

       // this.props.componentData.handleBillingitem(this.state.billingItem);
        console.log("billingConfigs", this.props.componentData.props.ContractData, this.state.billingItem);
        debugger
        if (this.props.componentData.SearchFlag == true) {
            this.state.billingConfigs['tblBillingItem'] = this.state.billingItem;
            this.props.componentData.props.ContractData[0].tblBillingConfig[0] = this.state.billingConfigs;
        }

        this.setState({});

    }
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
            case "productBenefit":
                if (validationPage.verifydecimal(event.target.value)) {
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
            default:
                break;
        }


    }




    handleSearchContract = (event) => {
        debugger
        console.log("contractdto", this.state.ContractDTO);
        let effdate = "";
        let enddate = "";
        debugger
        if (this.state.ContractDTO.contractEffectiveDate != "") {
            effdate = this.state.ContractDTO.contractEffectiveDate;
            this.state.ContractDTO.contractEffeciveDate = this.datechange(this.state.ContractDTO.contractEffectiveDate);
        }
        if (this.state.ContractDTO.contractEndDate != "") {
            enddate = this.state.ContractDTO.contractEndDate;
            this.state.ContractDTO.contractEndDate = this.datechange(this.state.ContractDTO.contractEndDate);
        }

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SearchContract`, {
            method: 'POST',
            body: JSON.stringify(this.state.ContractDTO),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("data save result:", data);
                this.setState({ SearchData: data });

                if (this.state.SearchData.length > 0) {
                    this.setState({ searchContractTable: true });
                    this.contractTable(data);
                }

            });
        this.state.ContractDTO.contractEffeciveDate = effdate;
        this.state.ContractDTO.contractEndDate = enddate;
    };

    contractTable = (rows) => {
        console.log("contracttable", this.state.ContractDTO);
        this.setState({
            contractdata: rows.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    ContractId: prop.contractId,
                    ContractName: prop.contractName,
                    EfficitiveDate: prop.contractEffeciveDate,
                    EndDate: new Date(prop.contractEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.contractId, prop.contractName, prop.contractEffeciveDate, prop.contractEndDate)} />

                };
            })
        });
    }

    editFunction(id, cId, cName, effDate, endDate) {
        debugger

        this.state.billingConfigs.contractId = cId;
        this.setState({ contractN: cName });
        this.setState({ contracteffDt: effDate });
        this.setState({ contractendDt: new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }) });
    }

    SetContract = ((type, event) => {
        console.log("contractdto", this.state.ContractDTO);
        let ContractDTO = this.state.ContractDTO;
        let name = event.target.name;
        let value = event.target.value;
        ContractDTO[name] = value;
        this.setState({ ContractDTO })
        this.change(event, name, type);
    });

    handleClose = () => {
        console.log("contractdto", this.state.ContractDTO);
        this.setState({ searchContractTable: false });
        if (this.state.contractN != null) {
            this.setState({ search: true });
            fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetHistory?contractid=` + this.state.billingConfigs.contractId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {

                    this.setState({ historydata: data })
                    if (this.state.historydata.length > 0) {
                        this.setState({ searchTableSec: true });
                        this.histryTable(data);
                    }
                    this.setState({ dataRows: data });

                    console.log("dataRows", this.state.dataRows);


                });
        }
    }

    
    //handleAdd = () => {
    //    this.addlist();
    //    console.log("item:", this.state.billingItem);
    //    this.state.addBill = this.state.addBill.concat({
    //        title: this.state.objecteventVal[1],
    //        content: <EventBased props={this.state} index={this.state.billingItem.length - 1} />
    //    });
    //    //let billingConfig = this.state.billingConfigs;

    //    //billingConfig['tblBillingItem'] = this.state.billingItem;

    //    //this.setState({ billingConfigs: billingConfig });
    //    this.props.componentData.props.handleBillingitem(this.state.billingItem);
    //    console.log("billingConfigs", this.state.billingConfigs, this.state.billingItem);
    
    //}

    render() {

        const { classes } = this.props;
        if (this.props.componentData.SearchFlag == false) {
            this.state.billingConfigs['tblBillingItem'] = this.state.billingItem;
            this.props.componentData.props.ContractData[0].TblBillingConfig[0] = this.state.billingConfigs;
            console.log("componentdata.props:", this.props.componentData);
        } 
        return (

            <CardBody>


                <GridItem>
                    <GridContainer className="search-Product">

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime
                                success={this.state.billingStartDateState === "success"}
                                error={this.state.billingStartDateState === "error"}
                                required={true}
                                
                                disabled={this.props.componentData.disableView}
                                onFocus={this.state.onClick}
                                labelText="EffectiveFromDate"
                                id='dtActiveFrom'
                                name='billingStartDate'
                                onChange={(evt) => this.onDateChange('datetime', 'billingStartDate', evt)}
                                value={this.state.billingConfigs.billingStartDate}
                                formControlProps={{ fullWidth: true }} />
                            {this.props.componentData.errormessage && (this.state.billingConfigs.billingStartDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                            {this.state.errorSdate ? <p className="error">*Billing Start Date should be within Contract Period </p> : null}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime
                                //validdate={this.state.validdate}
                                //datediff={this.state.datediff}
                                success={this.state.billingEndDateState === "success"}
                                error={this.state.billingEndDateState === "error"}
                                required={true}
                                disabled={this.props.componentData.disableView}
                                onFocus={this.state.onClick}
                                labelText="EffectiveToDate"
                                id='dtActiveFrom'
                                name='billingEndDate'
                                onChange={(evt) => this.onDateChange('datetime', 'billingEndDate', evt)}
                                value={this.state.billingConfigs.billingEndDate}
                                formControlProps={{ fullWidth: true }} />
                            {this.props.componentData.errormessage && (this.state.billingConfigs.billingEndDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                            {this.state.errorEdate ? <p className="error">*Billing End Date should be within Contract Period </p> : null}
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <MasterDropdown
                                    labelText="Currency"
                                    id="Currency"
                                    value={this.state.billingConfigs.currencyId}
                                    lstObject={this.state.masterList}
                                    required={true}
                                    disabled={this.props.componentData.disableView}
                                    filterName='Currency'
                                    model="billingConfigs"
                                    name='currencyId'
                                    onChange={(e) => this.SetConfig("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                {this.props.componentData.errormessage && (this.state.billingConfigs.currencyId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                            </Animated>
                        </GridItem>


                        {/*  <GridItem xs={12} sm={12} md={4} id="ddDetails" style={{ display: 'block' }}> */}
                        {this.state.detail == true ?
                            <GridItem xs={12} sm={12} md={4}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <CustomInput
                                        disabled={this.props.componentData.disableView}
                                        labelText="Details"
                                        //value={this.state.BillingItemDTO}
                                        //name="Details"
                                        onChange={(e) => this.SetValue("string", e)}
                                        id="Details"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </Animated>
                            </GridItem>
                            : null}

                        {/* <GridItem xs={12} sm={12} md={12} id="ddEventdetails" style={{ display: 'none' }} > */}


                        {/* {this.state.eventbased == true ? */}

                        <GridItem xs={12} sm={12} md={4}>
                            <Dropdown
                                //required={true}
                                labelText="Object"
                                id="Object"
                                lstObject={this.state.objectList}
                                value={this.state.billingObjectId}
                                name='billingObjectId'
                                onChange={(e) => this.SetObject("string", e)}
                                disabled={this.props.componentData.disableView}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        {/*  : null} 
                                            {this.state.eventbased == true ? */}
                        <GridItem xs={12} sm={12} md={4}>
                            <Dropdown
                                //required={true}
                                labelText="Event"
                                id="Eventid"
                                lstObject={this.state.eventlist}
                                value={this.state.billingEventId}
                                name='billingEventId'
                                onChange={(e) => this.SetEventAdd("string", e)}
                                disabled={this.props.componentData.disableView}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        {/* : null} */}





                        {/*  <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput

                                                    labelText="Amount"
                                                    name="billingAmount"
                                                    id="Amount"
                                                    value={this.state.billingConfigs.billingAmount}
                                                    onChange={(e) => this.SetConfig("string", e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            */}

                        {this.state.detail == true ?
                            <GridItem xs={12} sm={12} md={4}>
                                {/*<div id="ddOnetime" style={{ display: 'none' }} >*/}

                                <CustomInput
                                    labelText="DueDate"
                                    //value={props.ProductDTO.ProductName}
                                    name="Duedate"
                                    //onChange={(e) => props.SetValue("string", e)}
                                    id="Duedate"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                {/*</div>*/}
                            </GridItem>
                            : null}

                    </GridContainer>
                    {/* </div>*/}
                    {/* <GridContainer>
                        <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleAdd} >
                            Add
                                               </Button>
                    </GridContainer> */}

                    <GridContainer>

                    </GridContainer>

                    <GridContainer xs={12} id="ddEvents" style={{ display: 'block' }} > 
                        
                        {this.props.componentData.SearchFlag == true ?
                            <_Events showlist={this.state.showlist} ValueFactor={this.state.ValueFactor} disableRate={this.state.disableRate} addlist={this.addlist} billingItem={this.state.billingItem} masterList={this.state.masterList} SetValue={this.SetValue} SetCategory={this.SetCategory} SetRate={this.SetRate} addrowBtn={this.addrowBtn} eventTable={this.eventTable} saverowsBtn={this.saverowsBtn} bitem={this.state.bitem} objecteventVal={this.state.objecteventVal} valueFactorlist={this.state.valueFactorlist}
                                rateState={this.state.rateState} addBill={this.state.addBill} flagModify={this.state.flagModify} />
                            :
                            <AddEvent showlist={this.state.showlist} ValueFactor={this.state.ValueFactor} disableRate={this.state.disableRate} addlist={this.addlist} billingItem={this.state.billingItem} masterList={this.state.masterList} SetValue={this.SetValue} saverowsBtn={this.saverowsBtn} bitem={this.state.bitem} objecteventVal={this.state.objecteventVal} valueFactorlist={this.state.valueFactorlist}
                                rateState={this.state.rateState} objectVal={this.state.objectVal} showlistValue={this.state.showlistValue} GetValueFactor={this.GetValueFactor} />

                             }
                    </GridContainer>
                   
                    <GridContainer>
                        <ModifyEventCollapse flag={true} callfun={this.callfun} sendbillingid={this.state.sendbillingid} showlist={this.state.showlist} mobjval={this.state.mobjval} billingitem={this.state.billingitem} mindex={this.state.mindex} />

                    </GridContainer>

                    {/*    <GridContainer justify="center">
                        <GridItem >

                            <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                                <div>

                                    <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleSaveBilling} >
                                        Submit
                                               </Button>
                                   

                                </div>
                            </Animated>
                        </GridItem>

                    </GridContainer>
                    */}
                    {this.state.searchTableSec == true ?
                        <GridContainer>
                            <HistoryCollapse data={this.state.data} />
                        </GridContainer>
                        : null}
                </GridItem>
            </CardBody>

        );
    }

}
export default withStyles(style)(CreateBilling);

