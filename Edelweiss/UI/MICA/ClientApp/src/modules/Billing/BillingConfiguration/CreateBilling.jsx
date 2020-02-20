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
import SearchContract from "./_SearchContract";
import _Events from "./_Events";
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
            contractIdState: "",
            contractNameState: "",
            contractEffectiveDateState: "",
            contractEndDateState: "",
            billingStartDateState: "",
            billingEndDateState: "",
            rateState: "",
            count: 0,
            BIcount: 0,
            disableRate:false,
            showlist: [{ catddl: false, catCount: false, CountRate: false, valuefactor: false, rate: false, addibtn: false, eventtable: false, ratedisplay: false, percentdisplay: false, disableRate: false }],
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
            Cumulative:[],
            viewdisable: false,
            searchContractTable: false,
            bitem: [],
            inst: [],
            cwe: [],
            eventCount: 0,
            search: false,
            contractI: "",
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
            datediff: "",
            DateRange: false,
            dateVal: "",
            errormessage:false,

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
            "billingItem": [
                {
                    "billingItemId": 0,
                    "billingConfigId": 0,
                    "billingTypeDesc": "",
                    "billingFrequencyId": 0,
                    "noofFrequency": 0,
                    "categoryTypeId": "",
                    "valueFactorId": 0,
                    "rateCategoryId": 0,
                    "rateTypeId": 0,
                    "threshold": 0,
                    "rate": 0,
                    "createdBy": 0,
                    "createdDate": "",
                    "eventMappingId": 0,
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
                            "cumulative": 0,
                        }
                    ],
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
                            "cumulative": 0,
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

            ddEventmodify: false,
            mindex: 0,
            mobjval: [],
        };
        this.BillingDetail = {
            "billingConfigs": this.state.billingConfigs,
            "billingItem": this.state.billingItem,
            
        };

        this.handleSaveBilling = this.handleSaveBilling.bind(this);
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


        
        console.log("this.props", this.props);
        
        if (this.props.sendbillingid != null) {
            if (this.props.sendbillingid != "") {
                this.setState({ viewdisable: true });
               
                fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetBillingById?billingconfigid=` + this.props.sendbillingid, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        this.setState({ BillingsearchData: data });
                        console.log("BillingsearchData", this.state.BillingsearchData);
                        let bdata = this.state;
                        bdata['billingConfigs'] = data;
                        this.setState({ bdata });
                        this.BillingDetail['billingConfigs'] = data;
                        this.BillingDetail['billingItem'] = data.tblBillingItem;

                        console.log("search item length", this.BillingDetail['billingItem'].length);
                        //adding collapse
                        this.setState({ billingItem: this.BillingDetail['billingItem'] });
                        console.log("billingitem:", this.state.billingItem);
                        for (let i = 0; i < this.BillingDetail['billingItem'].length; i++) {
                            //document.getElementById("ddEventBased").style.display = 'block';
                            this.setState({ mindex: i });
                            console.log("mindex:", this.state.mindex);

                            let evemapid = this.state.billingItem[i].eventMappingId;

                            this.addFun(evemapid);

                            
                        }

                        console.log("search data coming ", data);
                        console.log("billing config", this.BillingDetail['billingConfigs']);
                        console.log("billing item", this.BillingDetail['billingItem']);  
                    });
            }
        }
       
    }

    addFun = (evemapid) => {
      
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetEventMapping?mappingid=` + evemapid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                //this.setState({ mobjval: data });
                this.state.mobjval.push(data);
                console.log("mobjval:", this.state.mobjval);
            });
        
        this.state.showlist = this.state.showlist.concat({ catddl: false, catCount: false, CountRate: false, valuefactor: false, rate: false, addibtn: false, eventtable: false })
        this.state.ValueFactor = this.state.ValueFactor.concat({ valueFactorlist: [] })
        this.CollapseDropDown(this.state.mobjval[0]);
        this.callfun();
        this.setState({ Eventmodify: true });
        console.log("eventmodify:", this.state.Eventmodify);
    }

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

        if (event.target.value == 1) {
            this.setState({ onetime: true, detail: true, recurring: false, eventbased: false, frequency: false });
        }
        else if (event.target.value == 2) {
            this.setState({ onetime: false, detail: true, recurring: true, eventbased: false, frequency: false });
        }
        else if (event.target.value == 3) {
            this.setState({ onetime: true, detail: false, recurring: false, eventbased: true, frequency: false });  
        }
        
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
    SetFrequency = ((type, event, index) => {
        
        event.preventDefault();
       
        let billingItem = this.state.billingItem;
        let name = event.target.name;
        let value = event.target.value;
        billingItem[index][name] = value;
        this.setState({ billingItem });

        console.log("value: ", event.target.value);
     
        if (event.target.value == 4) {
           
            this.setState({ frequency: true, recurringRate: true });
        
        }
        else {
           
            this.setState({ frequency: false });
        }
    });

    SetnoofFrequency = ((type, event, index) => {
      

        console.log("billing type", this.state.billingItem);
        event.preventDefault();
        let billingItem = this.state.billingItem;
        let name = event.target.name;
        let value = event.target.value;
        billingItem[index][name] = value;
        this.setState({ billingItem });
        this.change(event, name, type);
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
     
        this.setState({ [event.target.name]: event.target.value });
        console.log("event value:", event.target.value, 'showlist', this.state.billingItem.length - 1);
        this.state.eventVal = event.target.value;
        
        const showList = this.state.showlist[this.state.billingItem.length - 1];
        //creation
        if (event.target.value == 5 || event.target.value == 1 || event.target.value == 4) {    
            this.EventAddCollapse();        
        }

        if (event.target.value == 6 || event.target.value == 7) {
 
            this.setState({ recurring: true });  
            this.setState({ frequencyIndex: this.state.billingItem.length - 1 });
            console.log("frequencyIndex", this.state.frequencyIndex);
        }

    })

    EventAddCollapse = () => {
        
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
     
        document.getElementById("ddEvents").style.display = 'block';
    }

    CollapseDropDown = (objval) => {
        this.state.billingItem[this.state.billingItem.length - 1].eventMappingId = this.state.objecteventVal[0];
        const showList = this.state.showlist[this.state.billingItem.length - 2];
      
        if (objval == "Product Creation") {
            this.setState({ recurring: false });
            this.setState({ recurringRate: false });

            this.state.billingItem[this.state.billingItem.length - 2].categoryTypeId = "10";
            //this.SetCategory("string", this.state.billingItem.length - 2);
            const showList = this.state.showlist[this.state.billingItem.length - 2];
            this.state.billingItem[this.state.billingItem.length - 2].rateTypeId = "15";
            showList['disableRate'] = true;

            showList['catddl'] = true;
            showList['catCount'] = true;
            showList['CountRate'] = true;
            
            showList['ratedisplay'] = true;
            showList['percentdisplay'] = false;
            showList['eventtable'] = true;
            showList['addibtn'] = true;


        }
        else if (objval == "Policy Creation" || objval == "Claim Intimation") {
            //this.state.billingItem[this.state.billingItem.length - 2].categoryTypeId = "";
            //this.state.billingItem[this.state.billingItem.length - 2].rateTypeId = "";
            this.setState({ recurring: false });
            this.setState({ recurringRate: false });
            showList['catddl'] = true;
           
        }
        else if (objval == "OneTime License Cost") {
          
            showList['rate'] = true;

        }
        else {
            this.state.billingItem[this.state.billingItem.length - 2].categoryTypeId = "";
            this.state.billingItem[this.state.billingItem.length - 2].rateTypeId = "";
           
        }
        console.log("Rate Category:", this.state.billingItem[this.state.billingItem.length - 2].rateCategoryId);
        console.log("billing Item:", this.state.billingItem);
        this.setState({});
    }
    GetValueFactor = (objid,index) => {
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
                console.log("valuedata:", data);
                console.log("valueFactorlist[index]: ", this.state.ValueFactor[index]);

            });
       
    }
    //SetCategory = ((type, event, index) => {
    //    alert("index", index);
    //    console.log("catelog index: ", index);
    //    console.log("value: ", event.target.value);
    //    let billingItem = this.state.billingItem;

    //    let name = event.target.name;
    //    let value = event.target.value;
    //    billingItem[index][name] = value;
    //    console.log("categoryid:", this.state.billingItem[index].categoryTypeId);
    //    this.setState({ billingItem });
    //    //this.change(event, name, type);
    //    const showList = this.state.showlist[index];
    //    if (event.target.value == 10) {
    //        this.state.billingItem[index].rateTypeId = "";
    //        showList['disableRate'] = false;
            
    //        //showList['catddl'] = true;
    //        showList['catCount'] = true;
    //        showList['CountRate'] = true;
    //        showList['valuefactor'] = false;
    //        showList['rate'] = false;
    //        showList['eventtable'] = false;
    //        showList['addibtn'] = false;

    //    }

    //    if (event.target.value == 11) {
    //        this.state.billingItem[index].rateTypeId = "";
    //        if (this.state.objecteventVal[0] != 2) {
    //            let mappingid = this.state.objectVal;
    //            this.GetValueFactor(mappingid,index);
    //        }
    //        //showList['catddl'] = true;
    //        showList['catCount'] = true;
    //        showList['CountRate'] = true;
    //        showList['valuefactor'] = true;
    //        showList['rate'] = false;
    //        showList['eventtable'] = false;
    //        showList['addibtn'] = false;
           
    //    }
    //    if (event.target.value == 12) {
    //        //this.state.billingItem[index].rateTypeId = "";
    //        //showList['disableRate'] = false;

    //        showList['catCount'] = true;
    //        showList['CountRate'] = true;
    //       // showList['valuefactor'] = false;
    //        showList['rate'] = false;
    //        //showList['eventtable'] = false;
    //       // showList['addibtn'] = false;
    //    }
    //    if (event.target.value == 13) {
    //        this.state.billingItem[index].rateTypeId = "15";
            
    //       // showList['disableRate'] = true;

    //       // showList['valuefactor'] = false;
    //        showList['rate'] = true;
    //        showList['eventtable'] = false;
    //        showList['addibtn'] = false;
    //    }
    //    if (event.target.value == 14) {
    //       // this.state.billingItem[index].rateTypeId = "";
    //        showList['disableRate'] = false;

    //        showList['catCount'] = true;
    //        showList['CountRate'] = true;
    //       // showList['valuefactor'] = true;
    //        showList['rate'] = false;
    //        //showList['eventtable'] = false;
    //        //showList['addibtn'] = false;
    //    }
    //    if (event.target.value == 15) {
          
    //        showList['ratedisplay'] = true;
    //        showList['percentdisplay'] = false;
    //        showList['eventtable'] = true;
    //        showList['addibtn'] = true;
          
    //    }
    //    if (event.target.value == 16) {
    //        if (this.state.billingItem[index].rateCategoryId == "12" || this.state.billingItem[index].rateCategoryId == "14") {
                
    //            showList['ratedisplay'] = false;
    //            showList['percentdisplay'] = true;
    //            showList['eventtable'] = true;
    //            showList['addibtn'] = true;
    //        }
    //    }
    //    this.setState({ showList });
    //    this.setState({});
    //    console.log("categoryid:", this.state.billingItem[index].categoryTypeId);
    //    console.log("showlist", this.state.showlist, this.state.billingItem);
    //})

    //SetRate = ((type, event, index) => {       
    //    this.setState({ disableRate: false });
    //    console.log("catelog index: ", index);
    //    console.log("value: ", event.target.value);
    //    let billingItem = this.state.billingItem;
    //    let name = event.target.name;
    //    let value = event.target.value;
    //    billingItem[index][name] = value;
    //    this.setState({ billingItem });
    //    this.change(event, name, type);
    //})

    handleRadioOnChange = (event) => {
        let index = this.state.frequencyIndex;

       
        this.state.singleValueSelectedProposer = event.target.value;
       
        if (event.target.value == 1) {

            let no = this.state.billingItem[index].noofFrequency;
            for (var x = 0; x < no; x++) {
               // let amt = this.state.billingItem[index - 1].tblBillingItemDetail.amount;
               // let total = this.state.billingItem[index].rate;
               // let remaining = total - amt;
                this.state.billingItem[index].tblBillingItemDetail.push({ amount: "" });
                this.state.billingItem[index].BillingItemDetail.push({ amount: "" });
                this.setState({});
              //  this.setState({ rembalance: remaining });
            }
            this.setState({ remainingBalance: true });
            
            this.installmentTable(index);

        }
        if (event.target.value == 0) {
           
            this.setState({ remainingBalance: false });
            let no = this.state.billingItem[index].noofFrequency;
            let amt = this.state.billingItem[index].rate;
            let avgamt = amt / no;
            console.log("tblBillingData", this.state.billingItem[index].noofFrequency);
            for (var x = 0; x < no; x++) {
                this.state.billingItem[index].tblBillingItemDetail.push({ amount: avgamt });
                this.state.billingItem[index].BillingItemDetail.push({ amount: avgamt });
                this.setState({});
            }
            console.log("tblBillingTable", this.state.billingItem[index]);
            this.installmentTable(index);
        }

    }
    installmentTable = (index) => {
      

        this.state.billingItem[index].BillingItemDetail = this.state.billingItem[index].BillingItemDetail.map((prop, key) => {
            return {
                id: key,
                SNo: key + 1,
                Installments: key + 1,
                Installmentamount: < CustomInput value={prop.amount} disabled={this.state.viewdisable} name="amount" onChange={(e) => this.setInstallmentValue('amount', e, key, index)} formControlProps={{ fullWidth: true }} />,
                //  DueDate: <CustomDatetime onFocus={this.state.onClick} name='dueDate' onChange={(evt) => this.state.setInstallmentdateValue('datetime', 'dueDate', evt, key)} value={prop.dueDate} formControlProps={{ fullWidth: true }} />,

            };
        })
        console.log("tblBillingTableindex", this.state.billingItem[index]);
        this.setState({});
        this.setState({});
    }

    setInstallmentValue = (columnName, event, index, i) => {

        console.log("columnName", columnName, event);
        let responses = [...this.state.billingItem[i].tblBillingItemDetail];

        if (columnName === 'amount') {
            responses[index].amount = event.target.value;
        }
    
        this.setState({ responses });
        console.log("tblBillingItemDetail", this.state.billingItem[i].tblBillingItemDetail)
        this.installmentTable();
    }

    datechange = (date) => {
     
        console.log("date change", date);
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    handleSaveBilling = (event) => {
        debugger;
        const sdate = this.state.billingConfigs.billingStartDate;
        const edate = this.state.billingConfigs.billingEndDate;

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
        if (this.state.billingConfigs.billingStartDate != "" && this.state.billingConfigs.billingEndDate != "" && this.state.billingConfigs.currencyId != "" && this.state.billingObjectId != "" && this.state.billingEventId) {

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
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
        this.state.billingConfigs.billingStartDate = sdate;
        this.state.billingConfigs.billingEndDate = edate;
       
      
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
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const state = this.state.billingConfigs;
        state[name] = date;
        this.setState({ state });
       // this.change(event, name, type);
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

    //addrowBtn = (event, index) => {
 
    //    console.log("addbtn index: ", index);
    //    if (this.state.count > 0) {
    //        let len = this.state.billingItem[index].tblBillingItemDetail.length - 1;
    //        let x = eval(this.state.billingItem[index].tblBillingItemDetail[len].to) + 1;

    //        if (this.state.billingItem[index].rateTypeId == "15") {
    //            //let len = this.state.billingItem[index].tblBillingItemDetail.length - 1;
    //            //let x = eval(this.state.billingItem[index].tblBillingItemDetail[len].to) + 1;
    //            this.state.billingItem[index].tblBillingItemDetail = this.state.billingItem[index].tblBillingItemDetail.concat({ from: x, to: "", amount: "" });
    //            this.state.billingItem[index].BillingItemDetail = this.state.billingItem[index].BillingItemDetail.concat({ from: x, to: "", amount: "" });
    //        }
    //        else if (this.state.billingItem[index].rateTypeId == "16" && this.state.billingItem[index].rateCategoryId == "14") {
    //            //let length = this.state.billingItem[index].BillingItemDetail.length-1;
    //            let previouspercent = Number(this.state.billingItem[index].tblBillingItemDetail[len].ratePercent);
    //            let previouscumulative = Number(this.state.billingItem[index].tblBillingItemDetail[len].cumulative);
    //            console.log("previouscumulative", this.state.billingItem[index].tblBillingItemDetail[len].cumulative);
    //            console.log("previouspercent", this.state.billingItem[index].tblBillingItemDetail[len].ratePercent);
    //            let addper = previouscumulative + previouspercent;

    //            this.state.billingItem[index].tblBillingItemDetail = this.state.billingItem[index].tblBillingItemDetail.concat({ from: x, to: "", ratePercent: "", cumulative: addper });
    //            this.state.billingItem[index].BillingItemDetail = this.state.billingItem[index].BillingItemDetail.concat({ from: x, to: "", ratePercent: "", cumulative: addper });

    //        }
    //        else {
      
    //            this.state.billingItem[index].tblBillingItemDetail = this.state.billingItem[index].tblBillingItemDetail.concat({ from: x, to: "", ratePercent: "" });
    //            this.state.billingItem[index].BillingItemDetail = this.state.billingItem[index].BillingItemDetail.concat({ from: x, to: "", ratePercent: "" });
    //        }
    //}
    //    this.state.count = this.state.count + 1;
    //    this.eventTable(index);

    //}
    //eventTable = (index) => {

    //    console.log("table index: ", index, this.state.billingItem[index]);
    //    console.log("billingitemdetails:", this.state.billingItem[index].BillingItemDetail);
    //    if (this.state.billingItem[index].rateTypeId == "15") {

    //        this.state.billingItem[index].BillingItemDetail = this.state.billingItem[index].BillingItemDetail.map((prop, key) => {
    //            return {
    //                SNo: key + 1,
    //                From: < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].from} disabled={this.state.viewdisable} name="from" onChange={(e) => this.setBenifitValue('from', e, key, index)} formControlProps={{ fullWidth: true }} />,
    //                To: < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].to} disabled={this.state.viewdisable} name="to" onChange={(e) => this.setBenifitValue('to', e, key, index)} formControlProps={{ fullWidth: true }} />,
    //                Amount: < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].amount} disabled={this.state.viewdisable} name="amount" onChange={(e) => this.setBenifitValue('amount', e, key, index)} formControlProps={{ fullWidth: true }} />,
    //                btn: <div> <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, index)}><Add /></Button>
    //                    <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteChannel(e, key, index)} ><Delete /> </Button ></div>
    //            };
    //        })
    //    }
    //    else if (this.state.billingItem[index].rateTypeId == "16" && this.state.billingItem[index].rateCategoryId == "14") {

    //        this.state.billingItem[index].BillingItemDetail = this.state.billingItem[index].BillingItemDetail.map((prop, key) => {
    //            return {
    //                SNo: key + 1,
    //                //: < CustomInput value={prop.seqNo} disabled={this.state.viewdisable} name="seqNo" onChange={(e) => this.setBenifitValue('seqNo', e, key)} formControlProps={{ fullWidth: true }} />,
    //                From: < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].from} disabled={this.state.viewdisable} name="from" onChange={(e) => this.setBenifitValue('from', e, key, index)} formControlProps={{ fullWidth: true }} />,
    //                To: < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].to} disabled={this.state.viewdisable} name="to" onChange={(e) => this.setBenifitValue('to', e, key, index)} formControlProps={{ fullWidth: true }} />,
    //                RatePercent: <GridContainer>
    //                    <GridItem xs={12} sm={12} md={4} lg={4}>
    //                        < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].cumulative} disabled={true} name="cumulative" onChange={(e) => this.setBenifitValue('cumulative', e, key, index)} formControlProps={{ fullWidth: true }} />
    //                    </GridItem>
    //                    <span id="slab-concat"> + </span>
    //                    <GridItem xs={12} sm={12} md={4} lg={6}>
    //                        < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].ratePercent} disabled={this.state.viewdisable} name="ratePercent" onChange={(e) => this.setBenifitValue('ratePercent', e, key, index)} formControlProps={{ fullWidth: true }} />
    //                    </GridItem>
    //                </GridContainer>,
    //                btn: <div> <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, index)}><Add /></Button>
    //                    <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteChannel(e, key, index)} ><Delete /> </Button ></div>
    //            };
    //        })
    //    }
    //    else {
    //        this.state.billingItem[index].BillingItemDetail = this.state.billingItem[index].BillingItemDetail.map((prop, key) => {
    //            return {
    //                SNo: key + 1,
    //                //: < CustomInput value={prop.seqNo} disabled={this.state.viewdisable} name="seqNo" onChange={(e) => this.setBenifitValue('seqNo', e, key)} formControlProps={{ fullWidth: true }} />,
    //                From: < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].from} disabled={this.state.viewdisable} name="from" onChange={(e) => this.setBenifitValue('from', e, key, index)} formControlProps={{ fullWidth: true }} />,
    //                To: < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].to} disabled={this.state.viewdisable} name="to" onChange={(e) => this.setBenifitValue('to', e, key, index)} formControlProps={{ fullWidth: true }} />,
    //                RatePercent: < CustomInput value={this.state.billingItem[index].BillingItemDetail[key].ratePercent} disabled={this.state.viewdisable} name="ratePercent" onChange={(e) => this.setBenifitValue('ratePercent', e, key, index)} formControlProps={{ fullWidth: true }} />,
    //                btn: <div> <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, index)}><Add /></Button>
    //                    <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteChannel(e, key, index)} ><Delete /> </Button ></div>
    //            };
    //        })
    //    }

    //    this.setState({});

    //    console.log("details:", this.state.billingItem[index].BillingItemDetail);
    //}

    //setBenifitValue = (columnName, event, index, i) => {

    //    console.log("columnName", columnName, event);
    //    let responses = [...this.state.billingItem[i].tblBillingItemDetail];

        
    //    if (columnName === 'from') {
    //        responses[index].from = event.target.value;
    //    }
    //    if (columnName === 'to') {
    //        responses[index].to = event.target.value;
    //    }
    //    if (columnName === 'amount') {
    //        responses[index].amount = event.target.value;
    //    }
        
    //    if (columnName === 'ratePercent') {
    //        responses[index].ratePercent = event.target.value;
    //    }

    //    if (columnName === 'cumulative') {
    //        responses[index].cumulative = event.target.value;
    //    }
    //    this.setState({ responses });
    //    console.log("tblBillingItemDetail", this.state.billingItem[i].tblBillingItemDetail)
    //    this.eventTable(i);


    //}

    //deleteChannel = (event, index, i) => {
    

    //    this.state.billingItem[i].tblBillingItemDetail.splice(index, 1);
    //    this.state.billingItem[i].BillingItemDetail.splice(index, 1);
    //    this.setState({});
    //    this.eventTable(i);

    //}
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
                ],
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
                ]
            }

        )
   
        this.state.showlist = this.state.showlist.concat({ catddl: false, catCount: false, CountRate: false, valuefactor: false, rate: false, addibtn: false, eventtable: false })
        this.state.ValueFactor = this.state.ValueFactor.concat({  valueFactorlist: [] })
        console.log("bilingitem", this.state.billingItem);
        let val = this.state.objecteventVal[1];
        this.CollapseDropDown(val);
        

        //this.setState({});
      
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
        debugger;
        console.log("contractdto", this.state.ContractDTO);
       let effdate = "";
        let enddate = "";
   
        if (this.state.ContractDTO.contractEffectiveDate != "" ) {
            effdate = this.state.ContractDTO.contractEffectiveDate;
            this.state.ContractDTO.contractEffectiveDate = this.datechange(this.state.ContractDTO.contractEffectiveDate);
        }
        if (this.state.ContractDTO.contractEndDate !="") {
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
        this.state.ContractDTO.contractEffectiveDate = effdate;
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
                    EfficitiveDate: new Date(prop.contractEffectiveDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    EndDate: new Date(prop.contractEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.contractId, prop.contractName, prop.contractEffectiveDate, prop.contractEndDate)} />

                };
            })
        });
    }

    editFunction(id, cId, cName, effDate, endDate) {
        this.state.billingConfigs.contractId = cId;
        this.setState({ contractN: cName });
        this.setState({ contractI: cId });
        this.setState({ contracteffDt: new Date(effDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }) });
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
    //onDateChange = (formate, type, name, event) => {

    //    this.setState({ DateRange: true });
    //    var today = event.toDate();
    //    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    //    var date2 = new Date();
    //    var date1 = new Date(today);
    //    if (type === 'ContractDTO') {
    //        let ContractDTO = this.state.ContractDTO;
    //        ContractDTO[name] = date;
    //        this.setState({ ContractDTO });

    //        var timeDiff = date2.getTime() - date1.getTime();
    //        var datediff = this.state.date;
    //        datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //        // var datediff = datediff;
    //        this.setState({ datediff });
    //    }
    //}

    render() {

        const { classes } = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} lg={12}>

                        <SearchContract search={this.state.search}
                            contractIdState={this.state.contractIdState} contractNameState={this.state.contractNameState}
                            ContractEffectiveDateState={this.state.ContractEffectiveDateState} contractEndDateState={this.state.contractEndDateState}
                            ContractDTO={this.state.ContractDTO} handleSearchContract={this.handleSearchContract}
                            contractTable={this.state.contractTable} SetContract={this.SetContract} contractdata={this.state.contractdata}
                            handleClose={this.handleClose} onDateChangeContract={this.onDateChangeContract}
                            searchContractTable={this.state.searchContractTable} />
                        <br />
                        <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                            <Card>

                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={billing} /></Icon>
                                    </CardIcon>
                                    {
                                        <GridItem>
                                            <h4><small>Billing Details</small></h4>

                                        </GridItem>
                                    }
                                </CardHeader>

                                <CardBody>


                                    <GridContainer>
                                        <GridItem xs={8} sm={6} md={3} lg={3} >
                                            <br />
                                            <label>
                                                {this.state.search == true ?
                                                    <div className="assign-role-info">
                                                        
                                                        <label>  Contract Name:</label><h5>{`${this.state.contractN}`} </h5>&nbsp;&nbsp;&nbsp;&nbsp; <label> Effective From Date: </label><h5>{`${this.state.contracteffDt}`} </h5>&nbsp;&nbsp;&nbsp;&nbsp; <label> Effective To Date: </label><h5>{`${this.state.contractendDt}`} </h5>&nbsp;&nbsp;
                                            <hr></hr>
                                                    </div>
                                                    : null}

                                            </label>
                                        </GridItem>
                                    </GridContainer>


                                    <GridItem>
                                        <GridContainer className="search-Product">

                                            <GridItem xs={12} sm={12} md={4}>


                                                <CustomDatetime
                                                    success={this.state.billingStartDateState === "success"}
                                                    error={this.state.billingStartDateState === "error"}
                                                    required={true}
                                                    onFocus={this.state.onClick}
                                                    labelText="Effective From Date"
                                                    id='dtActiveFrom'
                                                    name='billingStartDate'
                                                    onChange={(evt) => this.onDateChange('datetime', 'billingStartDate', evt)}
                                                    value={this.state.billingConfigs.billingStartDate}
                                                    formControlProps={{ fullWidth: true }} />
                                                {this.state.errormessage && (this.state.billingConfigs.billingStartDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>

                                                <CustomDatetime
                                                    success={this.state.billingEndDateState === "success"}
                                                    error={this.state.billingEndDateState === "error"}
                                                    required={true}
                                                    onFocus={this.state.onClick}
                                                    labelText="Effective To Date"
                                                    id='dtActiveFrom'
                                                    name='billingEndDate'
                                                    onChange={(evt) => this.onDateChange('datetime', 'billingEndDate', evt)}
                                                    value={this.state.billingConfigs.billingEndDate}
                                                    formControlProps={{ fullWidth: true }} />
                                                {this.state.errormessage && (this.state.billingConfigs.billingEndDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                                {/*  {this.state.errormessage && (this.state.ContractDTO.activeTo == "") ? <p className="error">This Field is Required</p> : null} */}

                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <MasterDropdown
                                                        labelText="Currency"
                                                        id="Currency"
                                                        value={this.state.billingConfigs.currencyId}
                                                        lstObject={this.state.masterList}
                                                        required={true}
                                                        filterName='Currency'
                                                        model="billingConfigs"
                                                        name='currencyId'
                                                        onChange={(e) => this.SetConfig("string", e)}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                    {this.state.errormessage && (this.state.billingConfigs.currencyId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                                </Animated>
                                            </GridItem>


                                            {/*  <GridItem xs={12} sm={12} md={4} id="ddDetails" style={{ display: 'block' }}> */}
                                            {this.state.detail == true ?
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <CustomInput

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
                                                <Dropdown required={true}
                                                    labelText="Object"
                                                    id="Object"
                                                    lstObject={this.state.objectList}
                                                    value={this.state.billingObjectId}
                                                    name='billingObjectId'
                                                    onChange={(e) => this.SetObject("string", e)}
                                                    disabled={this.state.viewdisable}
                                                    formControlProps={{ fullWidth: true }}
                                                />
                                                {this.state.errormessage && (this.state.billingObjectId == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                            </GridItem>

                                            {/*  : null} 
                                            {this.state.eventbased == true ? */}
                                            <GridItem xs={12} sm={12} md={4}>
                                                <Dropdown required={true}
                                                    labelText="Event"
                                                    id="Eventid"
                                                    lstObject={this.state.eventlist}
                                                    value={this.state.billingEventId}
                                                    name='billingEventId'
                                                    onChange={(e) => this.SetEventAdd("string", e)}
                                                    disabled={this.state.viewdisable}
                                                    formControlProps={{ fullWidth: true }}
                                                />
                                                {this.state.errormessage && (this.state.billingEventId == "") ? <p className="error">*Required field cannot be left blank</p> : null}

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
                                                        labelText="Due Date"
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

                                            {this.state.recurring == true ?
                                                <GridItem xs={12} sm={12} md={4}>

                                                    {/*  <div id="ddRecurring" style={{ display: 'none' }} > */}

                                                    <MasterDropdown
                                                        labelText="Frequency"
                                                        id="Frequency"
                                                        value={this.state.billingItem[this.state.frequencyIndex].billingFrequencyId}
                                                        lstObject={this.state.masterList}
                                                        required={true}
                                                        filterName='BillingFrequency'
                                                        model="BillingItemDTO"
                                                        name='billingFrequencyId'
                                                        onChange={(e) => this.SetFrequency("string", e, this.state.frequencyIndex)}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />

                                                    {/*</div>*/}
                                                </GridItem>
                                                : null}

                                            {this.state.recurringRate == true ?
                                                <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                        success={this.state.rateState === "success"}
                                                        error={this.state.rateState === "error"}
                                                labelText="Rate(Amount)"
                                                        name="rate"
                                                        value={this.state.billingItem[this.state.frequencyIndex].rate}
                                                        onChange={(e) => this.SetCategory("string", e, this.state.frequencyIndex)}
                                                id="Rate"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                    />
                                                </GridItem>
                                            :null}
                                        </GridContainer>


                                        {/* <div id="ddCustom" style={{ display: 'none' }} >*/}
                                        {this.state.frequency == true ?
                                            <GridContainer>

                                                <InstallmentDetails handleRadioOnChange={this.handleRadioOnChange} singleValueSelectedProposer={this.state.singleValueSelectedProposer} inst={this.state.inst} frequencyIndex={this.state.frequencyIndex} billingItem={this.state.billingItem} remainingBalance={this.state.remainingBalance} SetnoofFrequency={this.SetnoofFrequency} installmentTable={this.installmentTable} setInstallmentValue={this.setInstallmentValue} setInstallmentdateValue={this.setInstallmentdateValue} rembalance={this.state.rembalance} />

                                            </GridContainer>
                                            : null}
                                        {/* </div>*/}
                                        <GridContainer lg={12} id="ddEvents" style={{ display: 'none' }} >

                                            <_Events showlist={this.state.showlist} ValueFactor={this.state.ValueFactor} disableRate={this.state.disableRate} addlist={this.addlist} billingItem={this.state.billingItem} masterList={this.state.masterList} SetValue={this.SetValue} SetCategory={this.SetCategory} SetRate={this.SetRate} addrowBtn={this.addrowBtn} eventTable={this.eventTable} saverowsBtn={this.saverowsBtn} bitem={this.state.bitem} objecteventVal={this.state.objecteventVal} valueFactorlist={this.state.valueFactorlist}
                                                rateState={this.state.rateState} billingConfigs={this.state.billingConfigs} SetConfig={this.SetConfig}/>

                                        </GridContainer>

                                       
                                            <GridContainer>
                                                <ModifyEventCollapse flag={true} callfun={this.callfun} sendbillingid={this.state.sendbillingid} showlist={this.state.showlist} mobjval={this.state.mobjval} billingitem={this.state.billingitem} mindex={this.state.mindex} />
                                                
                                        </GridContainer> 
                                           
                                        <GridContainer justify="center">
                                            <GridItem >

                                                <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                                                    <div>

                                                        <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleSaveBilling} >
                                                            Submit
                                               </Button>
                                                        {/* <Button id="cancelBtn" color="info" round className={classes.marginRight} onClick={this.handleCreateSuspectdata} >
                                            Cancel
                            </Button> **/}

                                                    </div>
                                                </Animated>
                                            </GridItem>

                                        </GridContainer>

                                        {this.state.searchTableSec == true ?
                                            <GridContainer>
                                                <HistoryCollapse data={this.state.data} />
                                            </GridContainer>
                                            : null}
                                    </GridItem>
                                </CardBody>
                            </Card>
                        </Animated>


                    </GridItem>
                </GridContainer>
            </div>
        );
    }

}
export default withStyles(style)(CreateBilling);

