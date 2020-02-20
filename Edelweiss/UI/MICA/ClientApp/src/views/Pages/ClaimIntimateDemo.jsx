import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

// @material-ui/core components

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

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
import Icon from "@material-ui/core/Icon";
import claim from "assets/img/claim.png"; 

import ClaimConfig from 'modules/Claims/ClaimConfig.js';
import ClaimComponent from "modules/Claims/views/ClaimIntimate/ClaimComponent.jsx";
import Document from "modules/Claims/views/ClaimIntimate/Document.jsx";
import BankDetails from "modules/Claims/views/ClaimIntimate/BankDetails.jsx";
import validationPage from "modules/Claims/views/ValidationPage.jsx";
import ClaimAmount from "modules/Claims/views/MultiCover/ClaimAmount.jsx";
import AmountData from "modules/Claims/views/ClaimIntimate/AmountData.json";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { Animated } from "react-animated-css";
import ReactTable from "components/MuiTable/MuiTable.jsx";

const dateStyle = {
    width: "max-content",
    marginLeft: "170px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}


class ClaimIntimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDTO: {
                "username": "vital@inubesolutions.com",
                "password": "mica123",
                "productType": "Mica",
                "envId": 1
            },
            logintoken: "",
            flag:false,
            TableData: [],
            ValidationUI: true,
            errormessage: false,
            errorstatus: false,
            errordate: false,
            erroramt: true,
            documentshow: false,
            buttonshow: false,
            claimsdecisionshow: false,
            coverEventshow: false,
            Claimdetailsdata: [],
            LossIntimatedByData: [],
            ClaimsDecisionData: [],
            ClaimsAmountData: [{
                "insurableItem": "",
                "name": "",
                "identificationNo": "",
                "typeOfLoss": "",
                "benefitAmount": "",
                "claimAmounts": "",
                "coverName": "",


            }],
            //ClaimsAmountData: [],
            DataAmount: [],
            DocumentData: [],
            ClaimAmountdetailsdata: [],
            InsurableItemData: [],
            CauseoflossData: [],
            benefitAmount: "",
            claimAmounts: "",
            PolicyNumber: "",
            PolicyStartDate: "",
            PolicyEndDate: "",
            radioarr: [],
            sendproductid: "",
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            Claimdetails: [],
            rowData: {},
            policynumber: "",
            insuredRefNumber: "",
            insuredMobileNumber: "",
            insuredEmail: "",
            eventDate: "",
            coverEvent: "",
            coverName: "",
            insuredName: "",
            policynumberState: "",
            insuredreferenceState: "",
            mobileNumberState: "",
            emailState: "",
            eventDateState: "",
            lossDateTimeState: "",
            locationOfLossState: "",
            lossDescriptionState: "",
            policyNumberState: "",
            benefitAmountState: "",
            claimAmountState: "",
            claimAmountsState: "",
            beneficiaryNameState: "",
            mobileNumberState: "",
            accHolderNameState: "",
            accNumber: "",
            accNumberState: "",
            bankNameState: "",
            bankBranchAddState: "",
            bankBranchAdd: "",
            ifscCode: "",
            ifscCodeState: "",
            datalist: [],
            PolicyData: [],
            file: null,
            dropFlag: true,
            docpage: false,
            claimId: 0,
            claimnumber: "",
            show: false,
            details: false,
            redirect: false,
            claimsdecisionshow: false,
            claims: [{
                claimAmounts: 0
            }, {
                claimAmounts: 0
            }, {
                claimAmounts: 0
            }, {
                claimAmounts: 0
            }
            ],

            fields: {
                locationOfLoss: "",
                lossDescription: "",
                mobileNumber: "",
                LossofDate: "",
                beneficiaryName: "",
                DocumentId: "",
                LossIntimatedId: "",
                ClaimsDecisionId: "",
                approvedClaimAmount: "",
                claimManagerRemarks: "",

            },
            DetailsDTO: {
                emailId: "",
                insuredName: "",
                lossDateTime: "",
                locationOfLoss: "",
                lossIntimatedBy: "",
                causeOfLoss: "",
                insurableItems: "",
                lossDescription: "",
                policyNumber: "",
                benefitAmount: "",
                claimAmount: "",
                accHolderName: "",
                accNumber: "",
                bankName: "",
                bankBranchAdd: "",
                ifscCode: "",
                documentName: "",
                active: true,
                policyId: "",
                PolicyStartDate: "",
                PolicyEndDate: "",
                // coverEvent: "",
                // coverName: "",
                ClaimInsurable: [],

            },

            ClaimResetData: {
                lossDateTime: "",
                locationOfLoss: "",
                lossIntimatedBy: "",
                causeOfLoss: "",
                insurableItems: "",
                lossDescription: "",
                claimAmount: "",
                accHolderName: "",
                accNumber: "",
                bankName: "",
                bankBranchAdd: "",
                ifscCode: "",
            },

            ClaimAmountReset: [],

            ClaimInsurable: {

                insurableItem: "",
                coverName: "",
                identificationNo: "",
                typeOfLoss: "",
                benefitAmount: "",
                claimAmounts: "",
                name: "",
                coverValue: "",
                insurableId: "",
                policyId: "",
            },
            showtable: false,
            ClaimIntimationDetails: {},
            tabledata: {},
            PolicysearchDTO: {
                policynumber: "",
                insuredreference: "",
                insuredName: "",
                mobileNumber: "",
                email: "",
                eventDate: "",
                coverEvent: "",
                coverName: "",

            },

            PolicyResetdata: {
                policynumber: "",
                insuredreference: "",
                insuredName: "",
                mobileNumber: "",
                email: "",
                eventDate: "",
                coverEvent: "",
                coverName: "",
            },

            showInsGrid: false,
        };
        this.handleTags = this.handleTags.bind(this);
        this.SetValue = this.SetValue.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClaimAmount = this.handleClaimAmount.bind(this);
        
    }



  
    ////Claim Intimation Function


    SetValue = (type, event) => {
        let PolicysearchDTO = this.state.PolicysearchDTO;
        let name = event.target.name;
        let value = event.target.value;
        PolicysearchDTO[name] = value;
        this.setState({ PolicysearchDTO });
        this.change(event, name, type);



        console.log("PolicysearchDTO", this.state.PolicysearchDTO);
    };

    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });

    };

    onFormSubmit = (evt) => {

        this.state.ValidationUI = true;
        evt.preventDefault();

        this.IsValidProductDetails();

        if (this.state.ValidationUI === true) {


            const Ldate = this.state.DetailsDTO.lossDateTime;
            const Cdate = this.state.PolicysearchDTO.eventDate;

            if (this.state.DetailsDTO.lossDateTime != "") {
                this.state.DetailsDTO.lossDateTime = this.datechange(this.state.DetailsDTO.lossDateTime);
            }

            if (this.state.PolicysearchDTO.eventDate != "") {
                this.state.PolicysearchDTO.eventDate = this.datechange(this.state.PolicysearchDTO.eventDate);
            }

            console.log("submit", this.state.DetailsDTO);

            let detailsdto = this.state.DetailsDTO;

            for (var i = 0; i < this.state.ClaimsAmountData.length; i++) {
                console.log("amt:", this.state.ClaimsAmountData[i].claimAmounts);
                if (this.state.ClaimsAmountData[i].claimAmounts != null) {
                    this.state.DataAmount.push(this.state.ClaimsAmountData[i]);
                }
                else {

                }
            }


            console.log("123:", this.state.DataAmount);
            console.log("123456:", this.state.ClaimsAmountData);
            detailsdto['ClaimInsurable'] = this.state.DataAmount;

            this.setState({ detailsdto });

            console.log("trail", detailsdto);

            fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/ClaimIntimate`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(detailsdto)
            }).then(response => response.json())
                .then(data => {
                    console.log("responseData", data);
                    ////if (data.status == 200) {
                    this.state.claimId = data.claimId;
                    this.setState({ docpage: true, claimnumber: data.claimNumber });
                    swal({
                        text: "Claim intimated successfully! \n your claim number: " + this.state.claimnumber,
                        icon: "success"
                    });
                    // this.setState({ redirect: true });
                    this.refreshData();
                });

            this.state.DetailsDTO.lossDateTime = Ldate;
            this.state.PolicysearchDTO.eventDate = Cdate;


        } else {
            this.setState({ errormessage: true });
            this.setState({ erroramt: true });
            swal("", "Some fields are missing", "error");
        }
    };

    IsValidProductDetails = () => {

        //  console.log("lossdatedetails", this.state.ClaimsAmountData[0].claimAmounts)
        if (this.state.DetailsDTO.lossDateTime !== "" && this.state.DetailsDTO.locationOfLoss !== "" && this.state.DetailsDTO.lossIntimatedBy !== "" && this.state.DetailsDTO.lossDescription !== "" && this.state.DetailsDTO.accHolderName !== ""
            && this.state.DetailsDTO.accNumber !== "" && this.state.DetailsDTO.bankName !== "" && this.state.DetailsDTO.bankBranchAdd !== "" && this.state.DetailsDTO.ifscCode !== "" && this.state.DetailsDTO.claimAmount !== "") {
        } else {
            this.state.ValidationUI = false; this.state.errormessage = true;
            this.setState({});
        }


    }

    onDateChange = (formate, type, name, event) => {
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();



        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;

        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        var date1 = dd + '/' + mm + '/' + today.getFullYear();

        const DetailsDataDTO = this.state.DetailsDTO;
        DetailsDataDTO[name] = date1;
        this.setState({ DetailsDataDTO });
        const PolicyDataDTO = this.state.PolicysearchDTO;
        PolicyDataDTO[name] = date;
        this.setState({ PolicyDataDTO });

        if (this.state.DetailsDTO.lossDateTime < this.state.PolicyStartDate || this.state.DetailsDTO.lossDateTime > this.state.PolicyEndDate) {
            this.state.ValidationUI = false;

            this.state.errordate = true;

        } else {

        }
        this.change(event, name, formate, date, type);
    };

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    handleChange = (type, event) => {
        console.log("target", event.target.value);
        let claim = this.state.DetailsDTO;
        let name = event.target.name;
        let value = event.target.value;

        claim[name] = value;
        this.setState({ claim });

        //if (this.state.DetailsDTO.claimAmount > this.state.DetailsDTO.benefitAmount) {

        //    this.state.ValidationUI = false; this.state.errorstatus = true;
        //} else {

        //}

        //this.setState({ showInsGrid: true });
        if (name === "insurableItems") {
            console.log('grid setup', this.state.DetailsDTO.insurableItems)
            if (value != "") {
                this.setState({ showInsGrid: true });
            }
            this.claimAmountTable();

        }
        console.log("this.state.DetailsDTO", this.state.DetailsDTO)
        this.change(event, name, type);
    }

    handleClaimAmount = (type, event, index) => {
        let claim = this.state.ClaimsAmountData[index];
        let name = event.target.name;
        let value = event.target.value;
        claim[name] = value;

        this.setState({ claim });
        let amt = 0;
        for (let i = 0; i <= index; i++) {
            amt = amt + Number(this.state.ClaimsAmountData[i].claimAmounts);
            console.log("ClaimIntimationDetails ", this.state.ClaimsAmountData[i]);
        }
        this.state.DetailsDTO.claimAmount = amt;
        this.setState({});

        console.log(" ClaimIntimationDetails claimAmount ", this.state.DetailsDTO.claimAmount);
        this.claimAmountTable();


        let amount = 'claimAmounts' == this.state.ClaimsAmountData[index].claimAmounts ? console.log("amount not found") : console.log("amount found")
        console.log("amount", this.state.ClaimsAmountData[index].claimAmounts);

        if (this.state.ClaimsAmountData[index].claimAmounts > this.state.ClaimsAmountData[index].benefitAmount) {

            this.state.ValidationUI = false;
            this.state.errorstatus = true;
            this.setState({});


        } else {
            this.state.ValidationUI = false;
            this.state.errorstatus = false;
            this.setState({});

        }


        //for (let i = 0; i < this.state.ClaimsAmountData.length; i++) {
        //    if (this.state.ClaimsAmountData[i].claimAmounts == "" || this.state.ClaimsAmountData[i].claimAmounts == undefined) {
        //       // this.state.erroramt = true;
        //        this.state.ValidationUI = false;
        //        this.state.errormessage = true;
        //        this.setState({});
        //    }
        //    else {
        //       // this.state.erroramt = false;
        //        this.state.ValidationUI = true;
        //        this.state.errormessage = false;
        //        this.setState({});
        //    }
        //}

        this.change(event, name, type);


    }

    Proceedfun = () => {
        this.setState({ detailsshow: true });
        this.setState({ buttonshow: true });
    }

    GetLocationPath = () => {
        //this.showClaimTable();

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
        var res = baseURI.substring(13);
        console.log("res", res);
        if (res != "") {
            this.setState({ flag: false, details: true });

            this.state.PolicyNumber = res;
            this.seachPolicy(res, this);






            // debugger
            const policyDeatils = this.state.radioarr.filter(s => s.policyNo == res);
            if (policyDeatils.length > 0) {



                this.state.PolicyStartDate = this.dateCovertion(policyDeatils[0].policyStartDate);
                this.state.PolicyEndDate = this.dateCovertion(policyDeatils[0].policyEndDate);
                this.state.DetailsDTO.emailId = policyDeatils[0].email;
                this.state.DetailsDTO.policyNumber = policyDeatils[0].policyNo;
            }
        } else {
            this.setState({
                flag: true
            });
        }
    }




    componentDidMount() {


        localStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA');
         //policy search
        fetch(`${ClaimConfig.policyconfigUrl}/api/Policy/PolicySearch`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.PolicysearchDTO)
        }).then(function (response) {
            return response.json();
            }).then(data => {
                this.state.radioarr = data;
            this.GetLocationPath();


        });

      
      
        fetch(`https://inubeservicesusermanagement.azurewebsites.net/api/Login/Authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.loginDTO),
        }).then(response => {
            console.log("response: ", response);
            return response.json()
        })
            .then((data) => {
                console.log("response data", data);
                this.setState({ logintoken: data.token });
              //  localStorage.setItem('userToken', data.token);
            });

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Claim%20Intimated%20By`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ LossIntimatedByData: data });

                console.log("LossIntimatedByData", data);
            });


        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Document%20Name`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ DocumentData: data });

                console.log("DocumentData", data);
            });

        //fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Insurable%20Item`, {
        //    method: 'get',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ InsurableItemData: data });

        //        console.log("InsurableItemData", data);
        //    });

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Cause%20Of%20Loss`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ CauseoflossData: data });

                console.log("CauseoflossData", data);
            });

        // this.setState({ ClaimsAmountData: AmountData });
    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("name", evt.target.name);
    };

    showClaimTable = () => {
        console.log("PolicysearchDTO", this.state.PolicysearchDTO);
        let that = this;
      
        fetch(`${ClaimConfig.policyconfigUrl}/api/Policy/PolicySearch`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.PolicysearchDTO)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            // console.log('Response data', data);
            //that.setState({ BenefitAmount:data ,tabledata:data});
            that.setState({ tabledata: data });

            //that.setState({ ClaimIntimationDetails: data });
         

            that.setState({ radioarr: data });
            //if (that.state.data.length > 0) {
            that.claimTable(data);
            that.setState({ showtable: true })
            //}
            that.claimAmountTable(data);
            console.log("tabledata: ", that.state.tabledata)
            // that.setState({ Claimdetails: data });
            //that.claimAmountTable(data);
        });
    }

    claimTable = () => {
        this.setState({
            Claimdetailsdata: this.state.tabledata.map((prop, key) => {
                const { classes } = this.props;
                return {
                    id: key,
                    PolicyNo: prop.policyNo,
                    IRN: prop.customerId,
                    IN: prop.coverNoteNo,
                    CE: prop.coverEvent,
                    CN: prop.coverName,
                    eventDate: new Date(prop.createdDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),

                    Select: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.policyNo)} />
                };
            })
        });
    }

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    claimAmountTable = () => {

        console.log("PolicccyNumberinclaim", this.state.PolicyNumber);

        console.log("ClaimsAmountData", this.state.ClaimsAmountData);

        this.setState({
            TableData: this.state.ClaimsAmountData.map((prop, key) => {

                return {
                    id: key + 1,
                    insurableItem: prop.insurableItem,
                    name: prop.name,
                    identificationNo: prop.identificationNo,
                    typeOfLoss: prop.coverName,
                    benefitAmount: prop.benefitAmount,
                    claimAmounts:
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                success={this.state.claimAmountsState === "success"}
                                error={this.state.claimAmountsState === "error"}
                                // required={true}
                                labelText=""
                                id="padding-input"
                                value={this.state.ClaimsAmountData.claimAmounts}

                                //onBlur={this.handleClaimAmount}
                                name="claimAmounts"
                                onChange={(e) => this.handleClaimAmount("claimAmounts", e, key)}
                                formControlProps={{ fullWidth: true }} />
                            {this.state.erroramt && (this.state.ClaimsAmountData[key].claimAmounts == "") ? <p className="error">*Enter the claim amount</p> : null}
                            {(this.state.ClaimsAmountData[key].claimAmounts > this.state.ClaimsAmountData[key].benefitAmount) ? <p className="error">*Claim Amount should not be greater than Benefit Amount</p> : null
                            }


                        </GridItem>
                };
            })
        });

        console.log("TableData", this.state.TableData);
    }
    seachPolicy = (pid, that) => {


        fetch(`${ClaimConfig.policyconfigUrl}/api/Policy/PolicyInsurableDetails?PolicyNumber=` + pid, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                that.setState({ ClaimsAmountData: data.policyInsurableDetails, InsurableItemData: data.insurableItems });
            console.log("PolicyInsurableDetails: ", that.state.ClaimsAmountData);

        });


    }
    dateCovertion = (date) => {
        let startdate = new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
        const _date1 = startdate.split('/');
        const dateObj1 = { month: _date1[1], year: _date1[2], day: _date1[0] };
        var dd = dateObj1.day;
        var mm = dateObj1.month;
        if (mm < 10) {
            mm = '0' + mm;

        }
        if (dd < 10) {
            dd = '0' + dd;
        }

       return(dd + '/' + mm + '/' + dateObj1.year);


    }

    editFunction(id, pid) {
        var pArr = this.state.radioarr;
        var PolicyArr = [];

        $.each(pArr, function (k, v) {
            if (v.policyNo === pid) {
                PolicyArr.push(pArr[id]);
            }
        })

        let that = this;
        this.seachPolicy(pid,this);
        console.log("PolicytArr", PolicyArr);
        const Productdataid = PolicyArr[0].productIdPk;
        const policydata = PolicyArr[0].policyNo;
        console.log("policy no: ", policydata)
        this.state.rowData = PolicyArr[0];

        console.log("rowdata: ", this.state.rowData);
        let policyid = this.state.DetailsDTO.policyId;
        policyid = this.state.rowData.policyId;
        this.setState({ policyid });
        this.state.PolicyNumber = PolicyArr[0].policyNo;
        //this.state.PolicyStartDate = PolicyArr[0].policyStartDate;
        //this.state.PolicyEndDate = PolicyArr[0].policyEndDate;
        this.state.PolicyStartDate = this.dateCovertion(PolicyArr[0].policyStartDate);
        this.state.PolicyEndDate = this.dateCovertion(PolicyArr[0].policyEndDate);
        // this.state.PolicyEndDate = PolicyArr[0].policyEndDate;
       

        this.state.BenefitAmount = PolicyArr[0].sumInsured;
        this.state.DetailsDTO.policyId = PolicyArr[0].policyId;


        //this.setState({ BenefitAmount : userArr[0].sumInsured });
        console.log("BenefitAmount", this.state.BenefitAmount, this.state.PolicyNumber);
        let claim = this.state.DetailsDTO;
        claim.policyNumber = PolicyArr[0].policyNo;
        claim.emailId = PolicyArr[0].email;
        claim.benefitAmount = PolicyArr[0].sumInsured;
        this.setState({ claim });

        console.log("Productdataid: ", Productdataid);
        this.setState({ sendproductid: Productdataid });
        this.setState({ details: true });

        this.state.rowData.PolicyStartDate = new Date(this.state.rowData.PolicyStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
        if (PolicyArr[0].coverEvent === "Death") {
            this.setState({ coverEventshow: true });
        } else {
            this.setState({ coverEventshow: false });
        }


        console.log("PolicccyNumber", this.state.PolicyNumber);

        if (this.state.PolicyNumber != undefined) {
            let specificData = this.state.tabledata.filter(x => x.policyNo == this.state.PolicyNumber);

            console.log("SpecificData", specificData);

            this.setState({ ClaimIntimationDetails: specificData });
        }


        this.setState({});
        this.claimAmountTable();
    }

    change(event, stateName, type, date, stateNameEqualTo, maxValue) {
        switch (type) {
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "mobileNumber":
                if (validationPage.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "insuredreference":
                if (validationPage.verifylength(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "eventDate":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "lossDateTime":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "policynumber":
                if (validationPage.verifyPolicynumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "locationOfLoss":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "lossDescription":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "claimAmounts":
                if (validationPage.verifylength(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "accHolderName":
                if (validationPage.verifyname(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "bankBranchAdd":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "bankName":
                if (validationPage.verifyBankName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;


            case "accNumber":
                if (validationPage.verifyAccNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "ifscCode":
                if (validationPage.verifyBankifsc(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    refreshData = () => {

        const Claimdata = this.state.ClaimResetData;
        console.log("claimdata123124", Claimdata);
        this.state.DetailsDTO = Claimdata;
        this.setState({ Claimdata });

        const PolicyResetdata = this.state.PolicyResetdata;
        this.state.PolicysearchDTO = PolicyResetdata;
        this.setState({ PolicyResetdata });


        this.state.ClaimsAmountData = [];
        this.setState({ showInsGrid: false });


    }








    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
<GridContainer>
                        <GridItem xs={12}>

                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                    {this.state.flag &&     <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={claim} /></Icon>
                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small> Claim Intimation</small>
                            </h4>
                        </CardHeader>
                       
                            <CardBody>
                                <GridContainer >
                                        <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            success={this.state.policynumberState === "success"}
                                            error={this.state.policynumberState === "error"}
                                            labelText="Policy Number"
                                            name="policynumber"
                                            // required={true}
                                            value={this.state.PolicysearchDTO.policynumber}
                                            onChange={(e) => this.SetValue("policynumber", e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                        success={this.state.insuredreferenceState === "success"}
                                        error={this.state.insuredreferenceState === "error"}
                                            labelText="Insured Ref Number"
                                            name="insuredreference"
                                            // required={true}
                                        value={this.state.PolicysearchDTO.insuredreference}
                                        onChange={(e) => this.SetValue("insuredreference", e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                        success={this.state.mobileNumberState === "success"}
                                        error={this.state.mobileNumberState === "error"}
                                            labelText="Insured Mobile Number"
                                        name="mobileNumber"
                                            // required={true}
                                        value={this.state.PolicysearchDTO.mobileNumber}
                                        onChange={(e) => this.SetValue("mobileNumber", e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                        success={this.state.emailState === "success"}
                                        error={this.state.emailState === "error"}
                                            labelText="Insured Email "
                                        name="email"
                                            // required={true}
                                        value={this.state.PolicysearchDTO.email}
                                        onChange={(e) => this.SetValue("email", e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime
                                            success={this.state.eventDateState === "success"}
                                            error={this.state.eventDateState === "error"}
                                            //onFocus={this.onClick}
                                            labelText="Cover Event Date"
                                            id='dtActiveFrom'
                                            name='eventDate'
                                            onChange={(evt) => this.onDateChange('datetime', 'PolicysearchDTO', 'eventDate', evt)}
                                            value={this.state.PolicysearchDTO.eventDate}
                                            formControlProps={{ fullWidth: true }}
                                        />

                                    </GridItem>
                                        <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={2}>
                                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                                <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.showClaimTable}> Search </Button>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                </GridContainer>
                            </CardBody>
                    </Card>}


                    {this.state.showtable && this.state.flag ?
                        <GridContainer>
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={"Intimated Claims"}
                                        data={this.state.Claimdetailsdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "",
                                                accessor: "Select",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                sortable: false,
                                                filterable: false,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Policy Number",
                                                accessor: "PolicyNo",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },


                                            {
                                                Header: "Insured Name",
                                                accessor: "IN",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Cover Event",
                                                accessor: "CE",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },

                                            {
                                                Header: "Cover Event Date",
                                                accessor: "eventDate",
                                                minWidth: 80,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },


                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        pageSize={([this.state.Claimdetailsdata.length + 1] < 5) ? [this.state.Claimdetailsdata.length + 1] : 5}
                                        //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                        showPaginationBottom={true}
                                        className="-striped -highlight"
                                    />
                                </Animated>
                                <br />
                            </GridItem>
                        </GridContainer>
                        : null}
                    {this.state.details ?
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <Card>
                                {!this.state.flag && <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={claim} /></Icon>
                                    </CardIcon>
                                    <h4 className={this.props.cardIconTitle}>
                                        <small> Claim Intimation</small>
                                    </h4>
                                </CardHeader>
                                }
                                <CardBody>


                                    <GridContainer justify="center" lg={12}>
                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <div className="banner">
                                                <label> Policy Number: </label><h5>{this.state.PolicyNumber}</h5>
                                                <label>Policy Start Date:</label> <h5>{this.state.PolicyStartDate}</h5>
                                                <label>Policy End Date:</label> <h5>{this.state.PolicyEndDate}</h5>


                                            </div>
                                        </Animated>

                                    </GridContainer>
                                    <ClaimComponent coverEventshow={this.state.coverEventshow} LossIntimatedByData={this.state.LossIntimatedByData} CauseoflossData={this.state.CauseoflossData}
                                        ClaimAmountdetailsdata={this.state.ClaimAmountdetailsdata} handleChange={this.handleChange} onInputParamChange={this.onInputParamChange}
                                        onDateChange={this.onDateChange} DetailsDTO={this.state.DetailsDTO} fields={this.state.fields} details={this.state.details}
                                        lossDateTimeState={this.state.lossDateTimeState} locationOfLossState={this.state.locationOfLossState} lossDescriptionState={this.state.lossDescriptionState}
                                        policyNumberState={this.state.policyNumberState} benefitAmountState={this.state.benefitAmountState} PolicyStartDate={this.state.PolicyStartDate} PolicyEndDate={this.state.PolicyEndDate}
                                        beneficiaryNameState={this.state.beneficiaryNameState} ValidationUI={this.state.ValidationUI} errormessage={this.state.errormessage} classes={this.classes}
                                        errorstatus={this.state.errorstatus} errordate={this.state.errordate} erroramt={this.state.erroramt} />

                                    <ClaimAmount TableData={this.state.TableData} ClaimAmountSum={this.ClaimAmountSum} ClaimsAmountData={this.state.ClaimsAmountData} InsurableItemData={this.state.InsurableItemData}
                                        claims={this.state.claims} handleChange={this.handleChange} DetailsDTO={this.state.DetailsDTO} ClaimAmountdetailsdata={this.state.ClaimAmountdetailsdata} classes={classes}
                                        fields={this.state.fields} showInsGrid={this.state.showInsGrid} details={this.state.details} handleClaimAmount={this.handleClaimAmount} errormessage={this.state.errormessage} erroramt={this.state.erroramt} />

                                    <BankDetails BankData={this.state.BankData} DetailsDTO={this.state.DetailsDTO} handleChange={this.handleChange} fields={this.state.fields} details={this.state.details} onInputParamChange={this.onInputParamChange} accHolderNameState={this.state.accHolderNameState} accNumberState={this.state.accNumberState} bankNameState={this.state.bankNameState} bankBranchAddState={this.state.bankBranchAddState} ifscCodeState={this.state.ifscCodeState} ValidationUI={this.state.ValidationUI} errormessage={this.state.errormessage} classes={this.classes} />


                                    {/*   <Document DocumentData={this.state.DocumentData} claimId={this.state.claimId} handleChange={this.handleChange} DetailsDTO={this.state.DetailsDTO} getUploadParams={this.state.getUploadParams} onChangeStatus={this.state.handleChangeStatus} onSubmit={this.state.handleSubmit} fields={this.state.fields} onInputParamChange={this.onInputParamChange} />
                            */}
                                    <br />
                                    <br />
                                    <GridContainer justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={2}>
                                            <Button color="info" round className={classes.marginRight} onClick={(e) => this.onFormSubmit(e)}> Intimate Claim </Button>
                                        </GridItem>
                                        <br />
                                    </GridContainer>
                                    {this.state.docpage ?
                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Document DocumentData={this.state.DocumentData} claimId={this.state.claimId} handleChange={this.handleChange} DetailsDTO={this.state.DetailsDTO} getUploadParams={this.state.getUploadParams} onChangeStatus={this.state.handleChangeStatus} onSubmit={this.state.handleSubmit} fields={this.state.fields} onInputParamChange={this.onInputParamChange} />
                                        </Animated>
                                        : null}

                                </CardBody>
                            </Card>
                        </Animated>
                        : null}
                </Animated>
</GridItem>
</GridContainer>
                        

            </div >
        );
    }
}
//export default PolicyBooking;
export default withStyles(loginPageStyle)(ClaimIntimation);
//export default connect(null, null)(withStyles(extendedFormsStyle)(PolicyBooking));