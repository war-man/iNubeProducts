import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

// @material-ui/core components

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import LoginConfig from 'modules/Login/LoginConfig.js';

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";
import $ from 'jquery';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import policyConfig from 'modules/Policy/PolicyConfig.js';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import swal from 'sweetalert';
import SearchPolicy from "modules/Policy/views/SearchPolicy.jsx";
const dateStyle = {
    width: "max-content",
    marginLeft: "170px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}


class PolicyBookingDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsCheck:false,
            paymentShow: "",
            PaytmDeatils: {},
            Leadinfo: {},
            ShowCard:false,
            loginDTO: {
                "username": "vital@inubesolutions.com",
                "password": "mica123",
                "productType": "Mica",
                "envId": 1
            },
            flag: true,
            redirect:false,
            logintoken: "",
            show: false,
            productCode: "",
            Customerhide:false,
            productId: "",
            PartnerData: [],
            ProductData: [],
            datalist: [],
            PolicyData: {},
            PolicyData1: [],
            PolicyData1Array: [],
            Policydata: {
                PartnerId:"",
                ProductId: "",
            },
            fields: {
                InsurableItem: []
            },
            datename: [],
            datetime: [],
            datetemp: [],

        };

        this.handleTags = this.handleTags.bind(this);
        this.onGet = this.onGet.bind(this);
        this.onInputParamChangeInsurableFields = this.onInputParamChangeInsurableFields.bind(this);
    }
    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("fields", fields);
    };

    onInputParamChangeInsurableItem = (evt) => {
        console.log('Event', evt);
        let field = this.state.fields.InsurableItem;
        field[evt.target.name] = evt.target.value;
        this.setState({ field });
        console.log("fieldsdata", field);
    };

    onInputParamChangeInsurableFields = (evt, index, insIndex) => {
        console.log('Event', evt);
        //  debugger;
        let field = this.state.fields.InsurableItem[index].InsurableFields[insIndex];
        field[evt.target.name] = evt.target.value;
        this.setState({ field });
        console.log("fieldsdata", field);
        console.log("fieldsdata1", this.state.fields)
        this.InusurableName(index);
    };

    InusurableName = (index) => {
        const name = this.state.PolicyData1[0].productRcbInsurableDetails[index].inputType;

        console.log("InsurableItemnameData", this.state.PolicyData1[0].productRcbInsurableDetails[index]);
        let InsurableItems = this.state.fields.InsurableItem[index];
        InsurableItems["InsurableName"] = name;
        this.setState({ InsurableItems });
        console.log("fieldsdata111", this.state.fields);
    }

    CoverName = (index, Cindex) => {
        //debugger;
        const name = this.state.PolicyData1[0].productRcbInsurableDetails[index].coverRcbdetails[Cindex].inputType;

        console.log("Covername", name);
        let CoverItem = this.state.fields.InsurableItem[index].Covers[Cindex];
        CoverItem["CoverName"] = name;
        this.setState({ CoverItem });
        console.log("fieldsdata111", this.state.fields);
    }

    onInputParamChangeCover = (evt, index, coverIndex, CFindex) => {
        //debugger;

        console.log('Event Cover', index, coverIndex);
        console.log("fulldata", this.state.fields.InsurableItem[index])
        let field = this.state.fields.InsurableItem[index].Covers[coverIndex].CoverFields[CFindex];
        console.log('Event Cover field', field);
        field[evt.target.name] = evt.target.value;
        this.setState({ field });
        console.log("fieldsdata", field);
        this.CoverName(index, coverIndex);
        // coverIndex = coverIndex + 1;

    };

    onInputPolicyChange = (evt) => {
        this.state.fields = {
            InsurableItem: []
        };
        if (this.state.PolicyData1.length > 0) {
            this.state.PolicyData1[0].productRcbDetails = [];
            this.state.PolicyData1[0].productRcbInsurableDetails = [];
        }
        const f = this.state.Policydata;
        f[evt.target.name] = evt.target.value;

        this.setState({ f });
        if (evt.target.name == "PartnerId") {
            //this.state.fields =  {
            //    InsurableItem: []
            //};
            this.GetRiskDetails(this.state.Policydata.PartnerId);
           // this.state.Policydata.ProductId = "";
            //fetch(`${policyConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + localStorage.getItem('partnerid'), {
            fetch(`${policyConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + this.state.Policydata.PartnerId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
                },
            })
                .then(response => response.json())
                .then(data => {

                    console.log("off", data);
                    this.setState({ datalist: data[0].mdata });
                    console.log("datalist", this.state.datalist);
                    console.log("datalistmvalue", this.state.datalist.mValue);

                    this.state.Policydata.ProductId = this.state.datalist[0].mID;
                   // this.GetProductbyID(this.state.Policydata.ProductId);
                    let ProductData = this.state.ProductData;
                    ProductData = data;

                    this.setState({ ProductData });
                    console.log("ProductDatalist", this.state.ProductData);
                });
        }
        if (evt.target.name == "ProductId") {
             this.GetProductbyID(this.state.Policydata.ProductId)
        }
    };

    onFormSubmit = (evt) => {
        if (this.state.IsCheck==true) {
        //const pstartdate =this.state.fields['Policy Start Date'];
        //const penddate = this.state.fields['Policy End Date'];

        //for (var i = 0; i <= this.state.datename.length - 1; i++) {

        //    this.state.fields[this.state.datename[i]] = this.state.datetime[i];
        //}
        console.log("submittested", this.state.fields);
        //   console.log("submitJSON", this.state.fields.JSON());
        //if (this.state.fields['Policy Start Date'] != "" && this.state.fields['Policy End Date']!="") {
        //    this.state.fields['Policy Start Date'] = this.datechange(this.state.fields['Policy Start Date']);
        //    this.state.fields['Policy End Date'] = this.datechange(this.state.fields['Policy End Date']);
        //}

        //fetch(`http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Policy/CreateMultiCoverPolicy  `, {
            fetch(`${policyConfig.PolicyconfigUrl}/api/Policy/CreateMultiCoverPolicy`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
            },

            body: JSON.stringify(this.state.fields)
        }).then(function (response) {
            return response.json();
            }).then(data => {
                console.log("DATA Status",data);
            if (data.status == 2) {

                swal({


                    //let res = partnerId.toString();
                    text: data.responseMessage,
                    icon: "success"
                });
            } else if (data.status == 8) {
                swal({



                    text: data.responseMessage,
                    icon: "error"
                });
            } else if (data.status == 7 || data.status ==4) {
                swal({



                    text: data.errors[0].errorMessage,
                    icon: "error"
                });
            }

            else {

                swal({

                    text: data.responseMessage,
                    icon: "error"
                });
            }
        });

        //for (var i = 0; i <= this.state.datename.length - 1; i++) {

        //    this.state.fields[this.state.datename[i]] = this.state.datetemp[i];
        //    console.log("submit1", this.state.fields);
        //    this.state.datetemp[i] = "";
        //    console.log("submit2", this.state.datetemp[i]);
        //}
        //this.state.fields['Policy Start Date'] = pstartdate;
        //this.state.fields['Policy End Date'] = penddate;
    } else {
    swal({ text: "Please Opt for Insurance", icon: "info" });
}
    };
    onPaymentSubmit = (evt) => {
        if (this.state.IsCheck == true) {
          //  const pstartdate = this.state.fields['Policy Start Date'];
           // const penddate = this.state.fields['Policy End Date'];

            //for (var i = 0; i <= this.state.datename.length - 1; i++) {

            //    this.state.fields[this.state.datename[i]] = this.state.datetime[i];
            //}
            console.log("submittested", this.state.fields);
            //   console.log("submitJSON", this.state.fields.JSON());
            //if (this.state.fields['Policy Start Date'] != "" && this.state.fields['Policy End Date'] != "") {
            //    this.state.fields['Policy Start Date'] = this.datechange(this.state.fields['Policy Start Date']);
            //    this.state.fields['Policy End Date'] = this.datechange(this.state.fields['Policy End Date']);
            //}

            //fetch(`https://localhost:44351/api/Policy/CreatePolicyWithPayment  `, {
            fetch(`${policyConfig.PolicyconfigUrl}/api/Policy/CreatePolicyWithPayment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
                },

                body: JSON.stringify(this.state.fields)
            }).then(function (response) {
                return response.json();
            }).then(data => {
                if (data.status == 2) {
                    this.setState({ PaytmDeatils: data.policy });
                    console.log("data status", data);
                    this.state.redirect = true;
                    this.renderRedirect();

                    swal({


                        //let res = partnerId.toString();
                        text: data.responseMessage,
                        icon: "success"
                    });
                } else if (data.status == 8) {
                    swal({



                        text: data.responseMessage,
                        icon: "error"
                    });
                } else if (data.status == 7) {
                    swal({



                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                }

                else {

                    swal({

                        text: data.responseMessage,
                        icon: "error"
                    });
                }
            });

            //for (var i = 0; i <= this.state.datename.length - 1; i++) {

            //    this.state.fields[this.state.datename[i]] = this.state.datetemp[i];
            //    console.log("submit1", this.state.fields);
            //    this.state.datetemp[i] = "";
            //    console.log("submit2", this.state.datetemp[i]);
            //}
          //  this.state.fields['Policy Start Date'] = pstartdate;
            //this.state.fields['Policy End Date'] = penddate;
        } else {
            swal({ text: "Please Opt for Insurance",icon: "info" });
        }
    };
    renderRedirect = () => {
    
        if (this.state.redirect == true) {
            let outputHtml = "";

            outputHtml += "<html>";

            outputHtml += "<head>";

            outputHtml += "<title>Merchant Checkout Page</title>";

            outputHtml += "</head>";

            outputHtml += "<body>";

            outputHtml += "<center><h1>Please do not refresh this page...</h1></center>";

            outputHtml += "<form method='post' action='https://securegw-stage.paytm.in/order/process' name='paytm_form' target='_self' >";
            let data = this.state.PaytmDeatils;

            for (var key in data) {
                outputHtml += "<input type='hidden' name='" + key + "' value='" + data[key] + "'>";
            }
            // data.forEach((k, v) => outputHtml += "<input type='hidden' name='" + ${ k } + "' value='" + ${ v } + "'>";);

            //foreach (let  key in paytmParams.Keys)

            //{

            //    outputHtml += "<input type='hidden' name='" + key + "' value='" + paytmParams[key] + "'>";

            //}

            //outputHtml += "<input type='hidden' name='CHECKSUMHASH' value='" + this.state.PaytmDeatils.CHECKSUMHASH + "'>";

            outputHtml += "</form>";

            outputHtml += "<script type='text/javascript'>";

            outputHtml += "document.paytm_form.submit();";

            outputHtml += "</script>";

            outputHtml += "</body>";

            outputHtml += "</html>";
            let formName = "paytm_form";

            let url = "https://securegw-stage.paytm.in/order/process";
          //  window.open('', 'TheWindow');

            var newWindow = window.open(url, '_self');
            newWindow.document.write(outputHtml);

            return newWindow;
            // return window.open('https://securegw-stage.paytm.in/order/process?' + "&MID=" + this.state.PaytmDeatils.MID + "&WEBSITE=" + this.state.PaytmDeatils.WEBSITE + "&INDUSTRY_TYPE_ID=" + this.state.PaytmDeatils.INDUSTRY_TYPE_ID + "&CHANNEL_ID=" + this.state.PaytmDeatils.CHANNEL_ID + "&ORDER_ID=" + this.state.PaytmDeatils.ORDER_ID + "&CUST_ID=" + this.state.PaytmDeatils.CUST_ID + "&MOBILE_NO=" + this.state.PaytmDeatils.MOBILE_NO + "&EMAIL=" + this.state.PaytmDeatils.EMAIL + "&TXN_AMMOUNT=" + this.state.PaytmDeatils.TXN_AMMOUNT + "&CALLBACK_URL=" + this.state.PaytmDeatils.CALLBACK_URL + "&CHECKSUMHASH=" + this.state.PaytmDeatils.CHECKSUMHASH , '_blank');
            // return newWindow.document.write(outputHtml);
            // return window.open(outputHtml)
        }
        // window.location.replace(this.state.url + this.state.resultdata);
        //window.open(this.state.url);
    }


    onDateChange = (type, name, event) => {
        console.log("event", event);
        console.log("name", name);
        var today = event.toDate();
       // var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        console.log("today", today);
        console.log("date", date);
        if (type == 'Datetime') {
            let fields = this.state.fields;
            fields[name] = date;
            this.setState({ fields });
        }

        //if (this.state.datename.length == 0) {
        //    this.state.datename.push(name);
        //    this.state.datetemp.push(date);
        //    this.state.datetime.push(this.datechange(date));
        //} else {
        //    for (var i = 0; i <= this.state.datetime.length - 1; i++) {
        //        if (this.state.datename[i] !== name) {
        //            this.state.datename.push(name);
        //            this.state.datetemp.push(date);
        //            this.state.datetime.push(this.datechange(date));
        //        }
        //    }
        //}

        console.log("datetime", this.state.fields);


    };

    onGet() {


        if (this.state.fields.ProductId !== "" && this.state.fields.PartnerId !== "") {

            // fetch(`https://localhost:5001/api/Product/GetInsurableRiskDetails?ProductId` + this.state.fields.ProductId,{
            fetch(`${policyConfig.productConfigUrl}/api/Product/GetInsurableRiskDetails?ProductId=` + this.state.Policydata.ProductId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
                },
            })
                .then(response => response.json())
                .then(data => {

                    console.log("PolicyData", this.state.PolicyData);
                   

                    this.setState({ PolicyData: data, show: true });
                    console.log("PolicyData", this.state.PolicyData, this.state.fields);
                    const len = data.productRcbInsurableDetails.length;
                    for (var i = 0; i < len; i++) {
                        // Object for Cover
                        this.state.fields.InsurableItem = this.state.fields.InsurableItem.concat({
                            InsurableName: "",
                            InsurableFields: [{}],
                            Covers: [{}],
                        });
                    }
                    this.setState({});
                    console.log("arraydata", this.state.fields.InsurableItem);
                    console.log("FieldTest", this.state.fields);

                });
        } else {
            swal("", "Some field are missing!", "error");
        }
    }
    GetLocationPath = (res) => {

       if (res !== "") {
          
        
            fetch(`${policyConfig.PolicyconfigUrl}/api/Policy/CustomerPolicy?CustomerId=` + res, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Leaddto", data);
                    if (data.id > 0) {
                        let fill = this.state.fields;
                        this.state.Policydata.ProductId = data.productId;
                        this.state.productCode = data.productCode;
                        this.state.Policydata.PartnerId = data.partnerId;
                        fill['Name'] = data.firstName;
                        fill['Mobile Number'] = data.mobileNumber;
                        fill['Email ID'] = data.emailId;
                        fill['Product Code'] = data.productCode;
                       
                        //          return (data.productCode);
                        console.log('Payment', data.isPayment);
                        if (data.isPayment == true) {
                            this.setState({ Customerhide: true, show:true});
                        } else {
                            this.setState({ Customerhide: false,flag:false });
                        }
                        if (data.productCode != undefined) {

                            this.onGet1();

                        }
                        this.setState({ fill,Leadinfo: data });

                        console.log("leaddtobind", this.state.fields);
                   //this.GetProductbyID(data.productId);
                    } else {
                        this.setState({ Customerhide: true });
                    }
                
                });

        }
    }

    componentDidMount() {
        
        localStorage.setItem('userToken1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6Im1vaGFuQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJpTnViZSBBZG1pbiIsIk5hbWUiOiJJbnViZSIsIlVzZXJOYW1lIjoiZWludWJlYWRtaW4iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMjk3IiwiZXhwIjoxNjkwNzI0NDcxLCJpc3MiOiJJbnViZSIsImF1ZCI6IkludWJlTUlDQSJ9.LuEF1rBwpwUXiGJDJ0wYKZoCHd6a-3lghqi7tHHourM');
        this.timeOutFunction = setTimeout(
            function () {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );
        (function () {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;

            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            //baseURI = t.baseURI + "0001/2222";
            t.parentNode.insertBefore(e, t)
        })();
        var baseURI = window.location.pathname;
        console.log("Locations", window.location.pathname, baseURI);
        var res = baseURI.substring(14);
                if (res == "") {
                    this.GetRiskDetails(0);
                }
                else {
                    this.GetLocationPath(res);
                }
                console.log("partnerid: ", this.state.Policydata.PartnerId)
       
        const today = new Date();
        var nextDay = new Date();
        nextDay.setDate(new Date().getDate() + 1);
        //const nextDay = today.add(1).day();
        
        const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        const date1 = (nextDay.getDate()) + '/' + (nextDay.getMonth() + 1) + '/' + nextDay.getFullYear();
        this.state.fields['Policy Start Date'] = date;
        this.state.fields['Policy End Date'] = date1;
        this.state.fields['No. Of Risks'] = "1";
        this.state.fields['Identification Number'] = "123";
        console.log(" this.state.fields", this.state.fields);
    }



    GetRiskDetails = (pId) => {

        fetch(`${policyConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ PartnerData: data, ShowCard: true });
                console.log("partnerdata", data);
            });
       
        if (pId > 0) {


            fetch(`${policyConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + pId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
                },
            })
                .then(response => response.json())
                .then(data => {

                    console.log("off", data);
                    this.setState({ datalist: data[0].mdata });

                    let ProductData = this.state.ProductData;
                    ProductData = data;

                    this.state.Policydata.ProductId = this.state.datalist[0].mID;
                    this.setState({});
                    console.log("productid: ", ProductData);
                    this.setState({ ProductData });
                    console.log("ProductDatalist", this.state.ProductData);
                    this.GetProductbyID(this.state.datalist[0].mID);
                    //      this.onGet1();


                });

        }
    }

    GetProductbyID = (id) => {
       
        this.state.productCode = "";
        fetch(`${policyConfig.productConfigUrl}/api/Product/GetProductById?productId=` + id, {
            //   fetch(`https://localhost:44347/api/Product/GetProductById?productId=` + this.props.sendproductid,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.state.productCode = data.productCode;
                //          return (data.productCode);
                if (data.productCode != undefined) {

                    this.onGet1();
                  
                }

             //   this.setState({ });
                console.log("data search by id", data, this.state.productCode)
            });

    //    return this.state.productCode;
        //this.onGet1();
    }

    onGet1() {
      
                //fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/MastertypeData/GetMasterData`)
        // fetch(`${policyConfig.productConfigUrl}/api/Product/GetInsurableRiskDetails?ProductId=` + this.state.productId, {
        fetch(`${policyConfig.productConfigUrl}/api/Product/GetInsurableRiskDetails?ProductId=` + this.state.Policydata.ProductId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken1')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("MasterDto:", data);
                //this.leadTable(data);
              
                console.log("Policydata1", this.state.PolicyData1)
                var arr = [];
                arr.push(data)
                this.setState({ PolicyData1: arr, show: true, ShowCard:true  });
                const len = data.productRcbInsurableDetails.length
                console.log("data1", this.state.PolicyData1[0].productRcbInsurableDetails)
                for (var i = 0; i < len; i++) {
                    // Object for Cover
                    this.state.fields.InsurableItem = this.state.fields.InsurableItem.concat({
                        InsurableName: "",
                        InsurableFields: [{}],
                        Covers: [],
                    });
                }
                this.setState({});
                for (var i = 0; i < len; i++) {
                    const Coverlen = this.state.PolicyData1[0].productRcbInsurableDetails[i].coverRcbdetails.length;
                    for (var j = 0; j < Coverlen; j++) {

                        this.state.fields.InsurableItem[i].Covers = this.state.fields.InsurableItem[i].Covers.concat({
                            CoverName: "",
                            CoverFields: [{ "Cover Name": this.state.PolicyData1[0].productRcbInsurableDetails[i].coverRcbdetails[j].inputType }],

                        });
                    }
                    console.log("arraydataloop", arr, this.state.fields.InsurableItem);

                }
                this.setState({});
                console.log("arraydata", arr, this.state.fields.InsurableItem);
                console.log("fieldsdata", this.state.fields);
                let field = this.state.fields;
              
                field["Partner ID"] = this.state.Policydata.PartnerId;
           
                field["Product Code"] = this.state.productCode;
           
                this.setState({ field });
            });
        console.log("fieldsdata for total", this.state.fields);
       // this.state.fields.partnerId = this.state.Policydata.PartnerId;
    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    SetCheckBox = (e) => {
        console.log("checkbox select", e.target.value)
        if (e.target.value != undefined) {
            
            this.setState({IsCheck: e.target.checked });
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                {this.state.ShowCard && <GridContainer xs={12}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Policy Booking </small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                {this.state.flag && !this.state.Customerhide && <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <MasterDropdown
                                            labelText="Partner Name "
                                            id="ddlstatus"
                                            lstObject={this.state.PartnerData}
                                            filterName='Partner'

                                            value={this.state.Policydata.PartnerId}
                                            name='PartnerId'
                                            onChange={this.onInputPolicyChange}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <MasterDropdown
                                            labelText="Product Name"
                                            id="ddlstatus"
                                            lstObject={this.state.ProductData}
                                            filterName='Product'

                                            value={this.state.Policydata.ProductId}
                                            name='ProductId'
                                            onChange={this.onInputPolicyChange}
                                            formControlProps={{ fullWidth: true }} />

                                    </GridItem>
                                    {/*
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button id="round"
                                            style={{ marginTop: '25px' }}
                                            onClick={() => this.onGet1()}
                                            color="info" >   Get Risk Details  </Button>
                                    </GridItem>
                                    */}
                                </GridContainer>}

                                {this.state.show && <GridContainer>
                                    {(this.state.PolicyData1[0].productRcbInsurableDetails.length > 0) ? <GridContainer>
                                        <GridItem>
                                            <h4><small> Product Level </small></h4>
                                        </GridItem>
                                    </GridContainer> : ""}

                                    {this.state.PolicyData1[0].productRcbDetails.map((item, index) =>

                                        <GridItem xs={12} sm={12} md={4} key={index}>
                                            {(item.userInputType != "datetime") ?
                                                <CustomInput labelText={item.inputType}
                                                    value={(item.inputType == 'Partner ID' || item.inputType == 'Product Code' || item.inputType == 'Name' || item.inputType == 'Mobile Number' || item.inputType == 'Email ID' || item.inputType == 'Identification Number' || item.inputType == 'No. Of Risks') ? this.state.fields[item.inputType] : null}
                                                    name={item.inputType}
                                                    disabled={(item.inputType == 'Partner ID' || item.inputType == 'Product Code') ? true : false}
                                                    onChange={(e) => this.onInputParamChange(e)}
                                                    inputProps={{
                                                        //type: "number"
                                                    }}
                                                    formControlProps={{ fullWidth: true }} /> :
                                                <CustomDatetime labelText={item.inputType} name={item.inputType} time={true} value={this.state.fields[item.inputType]} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} value={this.state.fields[item.inputType]} formControlProps={{ fullWidth: true }} />
                                            }
                                        </GridItem>
                                    )}

                                    {(this.state.PolicyData1[0].productRcbInsurableDetails.length > 0) ?
                                        <GridContainer>
                                            <GridItem>
                                                <h4><small> Insurable Item Details </small></h4>
                                            </GridItem>
                                        </GridContainer> : ""}

                                    {this.state.PolicyData1[0].productRcbInsurableDetails.map((item, index) =>
                                        <GridContainer>

                                            <GridItem xs={12} sm={12} md={12}>

                                                <h5><b>{item.inputType}</b></h5>

                                            </GridItem>


                                            {item.insurableChildRcbdetail.map((prop, key) =>

                                                <GridItem xs={12} sm={12} md={4} key={key}>
                                                    {(item.userInputType != "datetime") ?
                                                        <CustomInput labelText={prop.inputType}
                                                            // value={item.paramName}
                                                            name={prop.inputType}
                                                            onChange={(e) => this.onInputParamChangeInsurableFields(e, index, 0)}
                                                            inputProps={{
                                                                //type: "number"
                                                            }}
                                                            formControlProps={{ fullWidth: true }} /> :
                                                        <CustomDatetime labelText={prop.inputType} name={prop.inputType} time={true} value={this.state.fields[prop.inputType]} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} value={this.state.fields[prop.inputType]} formControlProps={{ fullWidth: true }} />
                                                    }

                                                </GridItem>
                                            )}





                                            <GridItem xs={12} sm={12} md={12}>
                                                <h4><small> Cover level details </small></h4>
                                            </GridItem>

                                            {item.coverRcbdetails.map((prop1, key1) =>



                                                <GridItem xs={12} sm={12} md={12}>
                                                    <GridItem xs={12} sm={12} md={12}>
                                                        <h5><b>{prop1.inputType}</b></h5>
                                                    </GridItem>
                                                    <GridContainer>


                                                        {prop1.coverChildRcbdetail.map((prop2, key2) =>

                                                            <GridItem xs={12} sm={12} md={4} key={key2}>
                                                                {(item.userInputType != "datetime") ?
                                                                    <CustomInput labelText={prop2.inputType}
                                                                        // value={item.paramName}
                                                                        name={prop2.inputType}
                                                                        value={(prop2.inputType == "Cover Name") ? prop1.inputType:null}
                                                                        disabled={(prop2.inputType == "Cover Name") ? true : false}
                                                                        onChange={(e) => this.onInputParamChangeCover(e, index, key1, 0)}
                                                                        inputProps={{
                                                                            //type: "number"
                                                                        }}
                                                                        formControlProps={{ fullWidth: true }} /> :
                                                                    <CustomDatetime labelText={prop2.inputType} time={true} name={prop2.inputType} value={this.state.fields[prop2.inputType]} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} value={this.state.fields[prop2.inputType]} formControlProps={{ fullWidth: true }} />
                                                                }

                                                            </GridItem>
                                                        )}
                                                    </GridContainer>
                                                </GridItem>

                                            )}
                                        </GridContainer>

                                    )}
                                    <GridItem xs={12} sm={12} md={12}>

                                        <CustomCheckbox
                                            name="IsCheck"
                                            labelText="Opt for Insurance"
                                            value={this.state.IsCheck}
                                            onChange={(e) => this.SetCheckBox(e)}
                                            //disabled={(coversProductDetails.ProductDTO.ProductDTO.isCoverEvent === false) ? coversData.viewdisable : coversProductDetails.ProductDTO.ProductDTO.isCoverEvent}
                                            checked={this.state.IsCheck}

                                            formControlProps={{
                                                fullWidth: true
                                            }}

                                        />
                                    </GridItem>
                                    <GridContainer lg={12} justify='center'>
                                        <GridItem xs={6} sm={3} md={3} >
                                            {!this.state.Customerhide && <Button id="round" style={{ marginTop: '25px' }} onClick={() => this.onFormSubmit()} color="info" > Generate Policy  </Button>}
                                            {this.state.Customerhide && <Button id="round" style={{ marginTop: '25px' }} onClick={() => this.onPaymentSubmit()} color="info" > Payment </Button>}
                                        </GridItem>
                                        {this.renderRedirect()}
                                    </GridContainer>

                                </GridContainer>
                                }
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                }
            </div>
        );
    }
}
//export default PolicyBooking;
export default withStyles(loginPageStyle)(PolicyBookingDemo);
//export default connect(null, null)(withStyles(extendedFormsStyle)(PolicyBooking));