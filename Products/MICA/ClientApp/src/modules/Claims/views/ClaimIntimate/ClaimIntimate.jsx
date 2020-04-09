import React from "react";
// @material-ui/core components
// @material-ui/icons
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from '@material-ui/core/TableCell';
//import config from '../../../../config.js';
import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";
import $ from 'jquery';
import ClaimConfig from 'modules/Claims/ClaimConfig.js';
import claim from "assets/img/claim.png";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import swal from 'sweetalert';
import ClaimComponent from "./ClaimComponent.jsx";
import Document from "./Document.jsx";
import BankDetails from "./BankDetails.jsx";
import validationPage from "modules/Claims/views/ValidationPage.jsx";
import ClaimAmount from "../MultiCover/ClaimAmount.jsx";

//import Model from "modules/Claims/views/ClaimIntimate/Model.json";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { Animated } from "react-animated-css";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import { Redirect } from 'react-router-dom';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});
const newStyle = {
    maxWidth: "80%",
    marginLeft: "12%",
    overflow: "auto"
}
const okBtn = {

    marginLeft: "527px",
    //marginTop: "20px",
    height: "25px",
    textAlign: "center",

    width: "65px",
    padding: "1px"
}
const modalStyles = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    paddingBottom: '5px',
    paddingRight: '2px'
    //  boxShadow: theme.shadows[5],

};

const searchClose = {
    float: "right",
    position: 'relative',
    bottom: "56px",
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',


}
const searchBtn = {
    width: "120px",
    height: "35px",
    textAlign: "center",
    margin: "0 auto"
}

const dateStyle = {
    width: "max-content",
    marginLeft: "170px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}
const paddingCard =
{
    padding: "10px",
};


class ClaimIntimate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            policyflag: false,
            productflag: false,
            claimamtdisable: true,
            prodId: "",
            startDateFlag: "",
            endDateFlag: "",
            pageloader: false,
            nodata: false,
            loader: true,
            TableData: [],
            ValidationUI: true,
            validateUI: false,
            errormessage: false,
            errorifsccode: false,
            locationflag: false,
            descriptionflag: false,
            lossdateflag: false,
            lossintimatedflag: false,
            causeflag: false,
            insurableitemflag: false,
            erroraccno: false,
            errorstatus: false,
            errordate: false,
            erroramt: true,
            documentshow: false,
            buttonshow: false,
            claimsdecisionshow: false,
            coverEventshow: false,
            startDateTime: "",
            endDateTime: "",
            claimStartDateTime: "",
            Claimdetailsdata: [],
            LossIntimatedByData: [],
            AccountTypedata: [],
            SelfSurveydata: [],
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
            DataAmount: [],
            DocumentData: [],
            ClaimAmountdetailsdata: [],
            InsurableItemData: [],
            CauseoflossData: [],
            stateMasterList: [],
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

            policynumberState: false,
            insuredreferenceState: false,
            mobileNumberState: false,
            emailState: false,
            eventDateState: "",
            lossDateTimeState: false,
            locationOfLossState: false,
            lossDescriptionState: false,
            policyNumberState: "",
            benefitAmountState: "",
            claimAmountState: "",
            claimAmountsState: "",
            beneficiaryNameState: "",
            accountHolderNameState: false,
            accountNumber: "",
            accountNumberState: false,
            bankNameState: false,
            bankBranchAddressState: false,
            bankBranchAdd: "",
            ifscCode: "",
            ifscCodeState: false,
            datalist: [],
            PolicyData: [],
            ProductClaimData: [],
            ProductClaimData1: [],
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
                InsurableName: "",
                lossDescription: "",
                policyNumber: "",
                benefitAmount: "",
                claimAmount: "",
                documentName: "",
                PolicyStartDate: "",
                PolicyEndDate: "",
                active: true,
                policyId: "",
                alldoc: [],
                bankAccounts: [],
                AdditionalDetails: {},
            },
            selected: [],
            bankDetails: {
                accountHolderName: "",
                accountNumber: "",
                bankName: "",
                bankBranchAddress: "",
                ifscCode: "",
                accountType: "",
                payeeType: "Customer"
            },
            //DataModel: [],
            doc: {
                documentID: "",
                fileName: "",
                documentType: "",
            },

            ClaimAmountReset: [],

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

            },
            claimdata: [],
            PolicyResetdata: {
                policynumber: "",
                insuredreference: "",
                insuredName: "",
                mobileNumber: "",
                email: "",
                eventDate: null,

            },

            selfsurvey: [{ mID: "Yes", mValue: "Yes", mType: 1 },
            { mID: "No", mValue: "No", mType: 2 }],

            showInsGrid: false,
        };
        this.handleTags = this.handleTags.bind(this);
        this.SetValue = this.SetValue.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangebank = this.handleChangebank.bind(this);
        this.handleClaimAmount = this.handleClaimAmount.bind(this);
    }



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

        // this.daterefresh();
        this.state.validateUI = false;
        this.state.ValidationUI = true;
        evt.preventDefault();
        this.UIValidation();
        this.IsValidProductDetails();
       
        if (this.state.validateUI === true) {

            if (this.state.ValidationUI === true) {


                console.log("submit", this.state.DetailsDTO);

                let detailsdto = this.state.DetailsDTO;

                for (var i = 0; i < this.state.ClaimsAmountData.length; i++) {
                    console.log("amt:", this.state.ClaimsAmountData[i].claimAmounts);
                    this.state.DataAmount.push(this.state.ClaimsAmountData[i].claimAmounts);
                }

                console.log("123:", this.state.DataAmount);
                console.log("123456:", this.state.ClaimsAmountData);

                detailsdto['ClaimInsurable'] = this.state.selected;

                this.setState({ detailsdto });

                console.log("trail", detailsdto);

                console.log("bankdetails", this.state.bankDetails);
                this.state.DetailsDTO.bankAccounts.push(this.state.bankDetails);
                this.setState({});

                console.log("bankAccounts", this.state.DetailsDTO.bankAccounts);

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

                        if (data.status == 2) {
                            this.state.claimId = data.claimId;
                            this.setState({ docpage: true, claimnumber: data.claimNumber });
                            swal({
                                text: "Claim intimated successfully! \n your claim number: " + this.state.claimnumber,
                                icon: "success"
                            }).then(() => {
                                this.setState({ redirect: true });
                                this.renderRedirect();
                            });
                            // this.setState({ redirect: true });
                        } else {
                            swal({
                                text: "Claim is not intimated! Try again",
                                icon: "error"
                            })
                        }
                    });


            }
            else {

                if (this.state.DetailsDTO.lossDateTime == "") {
                    this.setState({ errormessage: true });
                    this.setState({ lossdateflag: true });
                    swal("", "Please enter Loss date time", "error");
                }
                else if (this.state.DetailsDTO.locationOfLoss == "") {
                    this.setState({ errormessage: true });
                    this.setState({ locationflag: true });
                    swal("", "Please enter Location of loss", "error");
                }
                else if (this.state.DetailsDTO.lossDescription == "") {
                    this.setState({ errormessage: true });
                    this.setState({ descriptionflag: true });
                    swal("", "Please enter Loss description ", "error");
                }
                else if (this.state.DetailsDTO.lossIntimatedBy == "") {
                    this.setState({ errormessage: true });
                    this.setState({ lossintimatedflag: true });
                    swal("", "Please select dropdown Loss intimated by", "error");
                }
                else if (this.state.DetailsDTO.causeOfLoss == "") {
                    this.setState({ errormessage: true });
                    this.setState({ causeflag: true });
                    swal("", "Please select dropdown Cause of loss", "error");
                }
                else if (this.state.DetailsDTO.insurableItems == "") {
                    this.setState({ errormessage: true });
                    this.setState({ insurableitemflag: true });
                    swal("", "Please select dropdown Insurable item", "error");
                }
                

                else {

                }

            }
        } else {

            //this.setState({ errorifsccode: true });
            //this.setState({ erroraccno: true });

        }

    };

    IsValidProductDetails = () => {
      
       // console.log("lossdatedetails", this.state.DetailsDTO.locationOfLoss)
        if (this.state.DetailsDTO.lossDateTime !== "" && this.state.DetailsDTO.locationOfLoss !== "" && this.state.DetailsDTO.lossIntimatedBy !== "" && this.state.DetailsDTO.lossDescription !== "" 
            && this.state.DetailsDTO.causeOfLoss !== "" && this.state.DetailsDTO.insurableItems !== "") {
            this.state.validateUI = true;
        }
        else {

            this.state.ValidationUI = false;
            this.state.errormessage = true;
            this.setState({});
        }




    }

    UIValidation = () => {

        console.log("lossDateTimeState", this.state.lossDateTimeState, "locationOfLossState", this.state.locationOfLossState, "lossDescriptionState", this.state.lossDescriptionState);

        if (this.state.locationOfLossState == false && this.state.lossDescriptionState == false) {

            this.state.validateUI = true;

        }
        else {
            this.state.validateUI = false;
            this.setState({});
        }
    }

    onDateChange = (formate, type, name, event) => {

        console.log("event", event);
        console.log("name", name);
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();


        //var dd = today.getDate();
        //var mm = today.getMonth() + 1;
        //if (mm < 10) {
        //    mm = '0' + mm;

        //}
        //if (dd < 10) {
        //    dd = '0' + dd;
        //}

        //var date1 = dd + '/' + mm + '/' + today.getFullYear();
        console.log("date", date);
        // if (formate == 'datetime') {
        let DetailsDataDTO = this.state.DetailsDTO;
        DetailsDataDTO[name] = date;
        this.setState({ DetailsDataDTO });
        let PolicyDataDTO = this.state.PolicysearchDTO;
        PolicyDataDTO[name] = date;
        this.setState({ PolicyDataDTO });
        //  }

        console.log("datetime", this.state.DetailsDTO);

        console.log("PolicyStartDate", this.state.PolicyStartDate);

        console.log("datediffrance", today, today.getTime());
        console.log("this.state.startDateFlag.getTime()", this.state.startDateFlag.getTime());
        console.log("this.state.endDateFlag.getTime()", this.state.endDateFlag.getTime());
        if (name == "lossDateTime") {

            if (today.getTime() < this.state.startDateFlag.getTime() || today.getTime() > this.state.endDateFlag.getTime()) {
                this.state.ValidationUI = false;

                this.state.errordate = true;
                this.setState({});
            }
            else {
                this.state.ValidationUI = true;
                this.state.errordate = false;
                this.setState({});
            }

            console.log("errordate", this.state.errordate);
            console.log("lossdate", this.state.DetailsDTO.lossDateTime);
            console.log("startdate", this.state.PolicyStartDate);
            console.log("enddate", this.state.PolicyEndDate);


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

        // if (this.state.policyflag === true) {
        if (name === "insurableItems") {
            console.log('grid setup', this.state.DetailsDTO.insurableItems)
            if (value != "") {
                this.setState({ showInsGrid: true });
            }
            this.claimAmountTable();

        }
        //}
        //else {
        //    swal("", "Policy Insurable data is missing", "error");
        //}
        console.log("this.state.DetailsDTO", this.state.DetailsDTO)
        this.change(event, name, type);
    }

    handleChangebank = (type, event) => {
        let bank = this.state.bankDetails;
        let name = event.target.name;
        let value = event.target.value;

        bank[name] = value;
        this.setState({ bank });

        this.change(event, name, type);
    }

    handleClaimAmount = (type, event, index) => {
      
        let claim = this.state.ClaimsAmountData[index];
        let name = event.target.name;
        let value = event.target.value;
        claim[name] = value;

        this.setState({ claim });
        let amt = 0;
        for (let i = 0; i < this.state.ClaimsAmountData.length; i++) {
            console.log(Number(this.state.ClaimsAmountData[i].claimAmounts), i);
            var valuen = Number(this.state.ClaimsAmountData[i].claimAmounts);
            if (!isNaN(valuen)) {
                amt = amt + valuen;
            }
            console.log("ClaimIntimationDetails ", this.state.ClaimsAmountData[i]);
        }
       // this.state.DetailsDTO.claimAmount = amt;
        this.setState({});

        console.log(" ClaimIntimationDetails claimAmount ", this.state.DetailsDTO.claimAmount);
        this.claimAmountTable();
        this.CommontotalAmountUpdate();
        this.change(event, name, type);

    }

    Proceedfun = () => {
        this.setState({ detailsshow: true });
        this.setState({ buttonshow: true });
    }

    componentDidMount() {

        //this.state.DataModel = Model;
        //this.setState({});
        let masterlist = "Claim Intimated By";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + masterlist + ``, {
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
        let accounttype = "Account Type";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + accounttype + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ AccountTypedata: data });

                console.log("AccountTypedata", data);
            });

        let causeofloss = "Cause Of Loss";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + causeofloss + ``, {
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

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterForVehicleLocation?sMasterlist=State`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ stateMasterList: data });

                console.log("stateMasterList", this.state.stateMasterList);
            });



        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );



        //console.log("Model", Model);
        //console.log("this.state.DataModel", this.state.DataModel);

    }

    onModelChange = (evt) => {
        let AdditionalDetails = this.state.DetailsDTO.AdditionalDetails;
        AdditionalDetails[evt.target.name] = evt.target.value;
        this.setState({ AdditionalDetails });
        console.log("AdditionalDetails", this.state.DetailsDTO.AdditionalDetails);
        console.log("name", evt.target.name);
    };


    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("name", evt.target.name);
    };

    showClaimTable = () => {
        console.log("PolicysearchDTO", this.state.PolicysearchDTO);

        let that = this;

        that.setState({ loader: false, details:false });
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

            that.setState({ tabledata: data });

            that.setState({ radioarr: data });

            that.setState({ showtable: false, loader: false });

            if (that.state.tabledata.length > 0) {
                that.claimTable();
            } else {
                setTimeout(
                    function () {
                        that.setState({ loader: true, showtable: false, nodata: true });
                    }.bind(this), 2000
                );
            }
            //  that.claimAmountTable(data);
            console.log("tabledata:", that.state.tabledata)

        });
    }


    GetLocation = (type, event) => {

        let regAddress = this.state.regAddress;
        let name = event.target.name;
        let value = event.target.value;
        regAddress[0][name] = value;

        this.setState({ regAddress });
        if (type != "") {
            this.GetLocationService(type, event.target.value);
        }
    };

    GetLocationService = (type, pID) => {

        fetch(`${ClaimConfig.BillingConfigUrl}/api/Billing/GetLocation?locationType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.LocationDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("locationDto", this.state.LocationDTO);
            });
    };



    claimTable = () => {
        this.setState({ loader: true, showtable: true })
        this.setState({
            Claimdetailsdata: this.state.tabledata.map((prop, key) => {
                const { classes } = this.props;
                return {
                    id: key,
                    PolicyNo: prop.policyNo,
                    IRN: prop.customerId,
                    IN: prop.coverNoteNo,
                    mobileNo: prop.mobileNumber,
                    policyStartDate: new Date(prop.policyStartDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    policyEndDate: new Date(prop.policyEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),

                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.policyNo)} />
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
                    insurableitemId: key + 1,
                    insurableItem: prop.insurableItem,
                    name: prop.name,
                    identificationNo: prop.identificationNo,
                    typeOfLoss: prop.coverName,
                    coverValue: prop.coverDynamic.map((c) => {
                        return (<p className="gridparagraph"> {c.Header} : {c.Details} </p>)
                    }),
                    // coverValue: prop.coverValue,
                    // benefitAmount: prop.benefitAmount,
                    claimAmounts:
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                // success={this.state.claimAmountsState === "success"}
                                error={this.state.claimAmountsState}
                                // disabled={this.state.claimamtdisable}
                                labelText=""
                                id="padding-input"
                                value={this.state.ClaimsAmountData.claimAmounts}
                                type="numeric"
                                inputType="number"
                                //onBlur={this.handleClaimAmount}
                                name="claimAmounts"
                                onChange={(e) => this.handleClaimAmount("claimAmounts", e, key)}
                                formControlProps={{ fullWidth: true }} />
                            {/*     {this.state.erroramt && (this.state.ClaimsAmountData[key].claimAmounts == "") ? <p className="error">*Enter the claim amount</p> : null}*/}
                            {/* {(this.state.ClaimsAmountData[key].claimAmounts > this.state.ClaimsAmountData[key].benefitAmount) ? <p className="error">*Claim Amount should not be greater than Benefit Amount</p> : null
                            }*/}


                        </GridItem>,
                    select: <CustomCheckbox key={key}
                        name="select"
                        value={this.state.selected}
                        onChange={(e) => this.SetclauseValue(key, e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                };
            })
        });

        console.log("TableData", this.state.TableData);
    }

    SetclauseValue = (index, event) => {
       
        let state = this.state;
        if (event.target.checked == true) {
            state.selected.push(this.state.ClaimsAmountData[index]);
            // this.setState({ claimamtdisable: false });
        } else if (event.target.checked == false) {
            console.log("selected array: ", index, this.state.ClaimsAmountData, this.state.ClaimsAmountData[index].insurableitemId);
            state.selected = state.selected.filter(item => item.insurableId !== this.state.ClaimsAmountData[index].insurableId);
        }
        this.CommontotalAmountUpdate();
        this.setState({ state });
        console.log("selected: ", this.state.selected);
    }
    CommontotalAmountUpdate = () => {

        let claimdetails = this.state.selected.map((item, i) => { if (eval(item.claimAmounts>0)) { return eval(item.claimAmounts) } else { return 0; } });

        console.log("claimdetails", claimdetails, this.state.selected, this.state.ClaimsAmountData)
        if (claimdetails.length > 0) {
            this.state.DetailsDTO.claimAmount = claimdetails.reduce((result, number) => result + number);
        } else {
            this.state.DetailsDTO.claimAmount = 0;
        }
    }

    editFunction(id, pid) {
        var pArr = this.state.radioarr;
        var PolicyArr = [];

        $.each(pArr, function (k, v) {
            if (v.policyNo === pid) {
                PolicyArr.push(pArr[id]);
            }
        })
        console.log("radioarr", this.state.radioarr);
        let that = this;
        fetch(`${ClaimConfig.policyconfigUrl}/api/Policy/PolicyInsurableDetails?PolicyNumber=` + pid, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(cdata => {
                console.log("cdata", cdata);

                if (cdata.status === 0) {
                    this.setState({ policyflag: true });
                    that.setState({ ClaimsAmountData: cdata.policyInsurableDetails, InsurableItemData: cdata.insurableItems });
                    console.log("PolicyInsurableDetails: ", that.state.ClaimsAmountData);


                } else {
                    this.setState({ policyflag: false });
                    swal("", "Policy Insurable data is missing", "error");
                }

            });
        console.log("PolicytArr", PolicyArr);
        this.state.prodId = PolicyArr[0].productIdPk;
        console.log("prodId", this.state.prodId);
        const Productdataid = PolicyArr[0].productIdPk;
        const policydata = PolicyArr[0].policyNo;
        console.log("policy no: ", policydata)
        this.state.rowData = PolicyArr[0];

        console.log("rowdata: ", this.state.rowData);
        let policyid = this.state.DetailsDTO.policyId;
        policyid = this.state.rowData.policyId;
        this.setState({ policyid });
        this.state.PolicyNumber = PolicyArr[0].policyNo;

        this.state.startDateFlag = new Date(PolicyArr[0].policyStartDate);
        this.state.endDateFlag = new Date(PolicyArr[0].policyEndDate);
        //this.state.PolicyStartDate = PolicyArr[0].policyStartDate;
        //this.state.PolicyEndDate = PolicyArr[0].policyEndDate;
        let startdate = new Date(PolicyArr[0].policyStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
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

        this.state.PolicyStartDate = dd + '/' + mm + '/' + dateObj1.year;


        // this.state.PolicyEndDate = PolicyArr[0].policyEndDate;
        let enddate = new Date(PolicyArr[0].policyEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const _date2 = enddate.split('/');
        const dateObj2 = { month: _date2[1], year: _date2[2], day: _date2[0] };
        var dd1 = dateObj2.day;
        var mm1 = dateObj2.month;
        if (mm1 < 10) {
            mm1 = '0' + mm1;

        }
        if (dd1 < 10) {
            dd1 = '0' + dd1;
        }

        this.state.PolicyEndDate = dd1 + '/' + mm1 + '/' + dateObj2.year;


        this.state.BenefitAmount = PolicyArr[0].sumInsured;
        this.state.DetailsDTO.policyId = PolicyArr[0].policyId;
        this.state.DetailsDTO.policyNo = this.state.PolicyNumber;


        //this.setState({BenefitAmount : userArr[0].sumInsured });
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

        this.onGet();
    }


    change(event, stateName, type, date, stateNameEqualTo, maxValue) {
        switch (type) {
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "mobileNumber":
                if (validationPage.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "insuredreference":
                if (validationPage.verifylength(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "eventDate":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "lossDateTime":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            //case "policynumber":
            //    if (validationPage.verifyPolicynumber(event.target.value)) {
            //        this.setState({ [stateName + "State"]: false });
            //    } else {
            //        this.setState({ [stateName + "State"]: true });
            //    }
            //    break;

            case "locationOfLoss":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "lossDescription":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            case "claimAmounts":
                if (validationPage.verifylength(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "accountHolderName":
                if (validationPage.verifyname(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "bankBranchAddress":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "bankName":
                if (validationPage.verifyBankName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;


            case "accountNumber":
                if (validationPage.verifyAccNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "ifscCode":
                if (validationPage.verifyBankifsc(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }


    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }



    docidfunc = (data) => {
        let dmsids = data.dMSDTOs;
        for (let i = 0; i < dmsids.length; i++) {
            let docclone = Object.assign({}, this.state.doc);
            docclone.documentID = data.dMSDTOs[i].docId;
            docclone.fileName = data.dMSDTOs[i].fileName;
            docclone.documentType = data.dMSDTOs[i].contentType;
            this.state.DetailsDTO.alldoc.push(docclone);
            this.setState({});

        }
        console.log("alldoc", this.state.DetailsDTO);
        console.log("docid", this.state.DetailsDTO.dmsdocId, this.state.DetailsDTO.documentName);

    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }

    renderPage = (ProductClaimData) => {


        if (ProductClaimData.userInputType == "string") {

            return (<CustomInput
                labelText={ProductClaimData.inputType}
                name={ProductClaimData.inputType}
                onChange={(e) => this.onModelChange(e)}
                formControlProps={{ fullWidth: true }}
            />
            );
        }
        else if (ProductClaimData.userInputType == "DropDown") {
            return (
                <Dropdown
                    labelText={ProductClaimData.inputType}
                    name={ProductClaimData.inputType}
                    lstObject={this.state.selfsurvey}
                    onChange={(e) => this.onModelChange(e)}
                    formControlProps={{ fullWidth: true }}
                />

            );
        }
        else if (ProductClaimData.userInputType == "Dropdown") {
            return (
                <Dropdown
                    labelText={ProductClaimData.inputType}
                    name={ProductClaimData.inputType}
                    lstObject={this.state.stateMasterList}
                    onChange={(e) => this.onModelChange(e)}
                    formControlProps={{ fullWidth: true }}
                />

            );
        }
    }

    onGet = () => {
        let value = "Claim Intimation";
        fetch(`${ClaimConfig.productConfigUrl}/api/Product/GetProductClaimsDetails?ProductId=` + this.state.prodId + `&FieldType=` + value + ``, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("getproductclaimsdetailsdata:", data);

                this.setState({ ProductClaimData: data });

                console.log("ProductClaimData", this.state.ProductClaimData);


            });
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={claim} /></Icon>
                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small><TranslationContainer translationKey="ClaimIntimation" /></small>
                            </h4>
                        </CardHeader>

                        <CardBody>
                            <GridContainer >
                                <GridItem xs={4} sm={4} md={3}>
                                    <CustomInput
                                        // success={this.state.policynumberState === "success"}
                                        error={this.state.policynumberState}
                                        labelText="PolicyNo"
                                        name="policynumber"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.policynumber}
                                        onChange={(e) => this.SetValue("policynumber", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                {/*<GridItem xs={4} sm={4} md={3}>
                                    <CustomInput
                                        // success={this.state.insuredreferenceState === "success"}
                                        error={this.state.insuredreferenceState}
                                        labelText="InsuredReferenceNo"
                                        name="insuredreference"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.insuredreference}
                                        onChange={(e) => this.SetValue("insuredreference", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>*/}
                                <GridItem xs={4} sm={4} md={3}>
                                    <CustomInput
                                        // success={this.state.mobileNumberState === "success"}
                                        error={this.state.mobileNumberState}
                                        labelText="InsuredMobileNo"
                                        name="mobileNumber"
                                        inputType="number"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.mobileNumber}
                                        onChange={(e) => this.SetValue("mobileNumber", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                {/* <GridItem xs={4} sm={4} md={3}>
                                    <CustomInput
                                        //success={this.state.emailState === "success"}
                                        error={this.state.emailState}
                                        labelText="InsuredEmailID"
                                        name="email"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.email}
                                        onChange={(e) => this.SetValue("email", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>*/}
                                {/* <GridItem xs={4} sm={4} md={4}>
                                    <CustomDatetime
                                        success={this.state.eventDateState === "success"}
                                        error={this.state.eventDateState === "error"}
                                        //onFocus={this.onClick}
                                        labelText="CoverEventDate"
                                        Futuredatevalidate={true}
                                        id='dtActiveFrom'
                                        name='eventDate'
                                        onChange={(evt) => this.onDateChange('datetime', 'PolicysearchDTO', 'eventDate', evt)}
                                        value={this.state.PolicysearchDTO.eventDate}
                                        formControlProps={{ fullWidth: true }}
                                    />

                                </GridItem>*/}
                                <GridContainer justify="center">
                                    <GridItem xs={8} sm={3} md={3} lg={2}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.showClaimTable}>
                                                <TranslationContainer translationKey="Search" />
                                            </Button>
                                        </Animated>
                                    </GridItem>
                                </GridContainer>
                            </GridContainer>
                        </CardBody>
                    </Card>
                    : <PageContentLoader />
                }
                {this.state.loader ?
                    <GridContainer xl={12}>
                        {(this.state.showtable && !this.state.details) ?
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={<h5><TranslationContainer translationKey="Policy Details" /></h5>}
                                        data={this.state.Claimdetailsdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Select",
                                                accessor: "radio",
                                                minWidth: 30,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                sortable: false,
                                                filterable: false,
                                                resizable: false,
                                            },
                                            {
                                                Header: "PolicyNo",
                                                accessor: "PolicyNo",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },


                                            {
                                                Header: "InsuredName",
                                                accessor: "IN",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Mobile No",
                                                accessor: "mobileNo",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },

                                            {
                                                Header: "PolicyStartDate",
                                                accessor: "policyStartDate",
                                                minWidth: 80,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "PolicyEndDate",
                                                accessor: "policyEndDate",
                                                minWidth: 80,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
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
                            : <GridItem lg={12}>{
                                this.state.nodata ? <Card>
                                    <GridContainer lg={12} justify="center">
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <img src={data_Not_found} className="tab-data-not-found" />
                                        </Animated>
                                    </GridContainer>
                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1} >
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                </Card>
                                    : null}
                            </GridItem>
                        }

                    </GridContainer>
                    : <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>}
                {this.state.details ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card>
                            <CardBody>


                                <GridContainer justify="center" lg={12}>
                                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                        <div className="banner">
                                            <label><TranslationContainer translationKey="PolicyNumber" /></label>&nbsp;<h5>{this.state.PolicyNumber}</h5>
                                            <label><TranslationContainer translationKey="Policystartdate" /></label>&nbsp; <h5>{this.state.PolicyStartDate}</h5>
                                            <label><TranslationContainer translationKey="Policyenddate" /></label>&nbsp; <h5>{this.state.PolicyEndDate}</h5>


                                        </div>
                                    </Animated>

                                </GridContainer>
                                <ClaimComponent coverEventshow={this.state.coverEventshow} LossIntimatedByData={this.state.LossIntimatedByData} CauseoflossData={this.state.CauseoflossData}
                                    ClaimAmountdetailsdata={this.state.ClaimAmountdetailsdata} handleChange={this.handleChange} onInputParamChange={this.onInputParamChange}
                                    onDateChange={this.onDateChange} DetailsDTO={this.state.DetailsDTO} fields={this.state.fields} details={this.state.details}
                                    lossDateTimeState={this.state.lossDateTimeState} locationOfLossState={this.state.locationOfLossState} lossDescriptionState={this.state.lossDescriptionState}
                                    policyNumberState={this.state.policyNumberState} benefitAmountState={this.state.benefitAmountState} PolicyStartDate={this.state.PolicyStartDate} PolicyEndDate={this.state.PolicyEndDate}
                                    beneficiaryNameState={this.state.beneficiaryNameState} ValidationUI={this.state.ValidationUI} errormessage={this.state.errormessage} classes={this.classes}
                                    errorstatus={this.state.errorstatus} errordate={this.state.errordate} erroramt={this.state.erroramt} validateUI={this.state.validateUI} SelfSurveydata={this.state.SelfSurveydata}
                                    LocationDTO={this.state.LocationDTO} GetLocation={this.GetLocation} regAddress={this.state.regAddress} disableView={this.state.disableView} renderPage={this.renderPage} selfsurvey={this.state.selfsurvey}
                                    masterList={this.state.masterList} master={this.state.master} addressDTO={this.state.addressDTO} ProductClaimData={this.state.ProductClaimData} stateMasterList={this.state.stateMasterList}
                                    onModelChange={this.onModelChange} AdditionalDetails={this.state.AdditionalDetails} onDateChange={this.onDateChange} locationflag={this.state.locationflag} descriptionflag={this.state.descriptionflag}
                                    lossdateflag={this.state.lossdateflag} lossintimatedflag={this.state.lossintimatedflag} causeflag={this.state.causeflag} 
                                     insurableitemflag={this.state.insurableitemflag}
                                />

                                <ClaimAmount TableData={this.state.TableData} ClaimAmountSum={this.ClaimAmountSum} ClaimsAmountData={this.state.ClaimsAmountData} claimAmountState={this.state.claimAmountState} validateUI={this.state.validateUI} InsurableItemData={this.state.InsurableItemData} policyflag={this.state.policyflag}
                                    claims={this.state.claims} handleChange={this.handleChange} DetailsDTO={this.state.DetailsDTO} ClaimAmountdetailsdata={this.state.ClaimAmountdetailsdata} classes={classes}
                                    fields={this.state.fields} showInsGrid={this.state.showInsGrid} details={this.state.details} handleClaimAmount={this.handleClaimAmount} errormessage={this.state.errormessage} erroramt={this.state.erroramt} />

                                <BankDetails BankData={this.state.BankData} AccountTypedata={this.state.AccountTypedata} DetailsDTO={this.state.DetailsDTO} handleChange={this.handleChange} fields={this.state.fields} details={this.state.details} onInputParamChange={this.onInputParamChange}
                                    accountHolderNameState={this.state.accountHolderNameState} accountNumberState={this.state.accountNumberState} bankNameState={this.state.bankNameState} bankBranchAddState={this.state.bankBranchAddState} ifscCodeState={this.state.ifscCodeState}
                                    validateUI={this.state.validateUI} ValidationUI={this.state.ValidationUI} errormessage={this.state.errormessage} errorifsccode={this.state.errorifsccode} erroraccno={this.state.erroraccno} classes={this.classes} bankDetails={this.state.bankDetails} handleChangebank={this.handleChangebank} />


                                <Document DocumentData={this.state.DocumentData} docidfunc={this.docidfunc} doc={this.state.doc} dmsdocId={this.state.dmsdocId} documentName={this.state.documentName} claimId={this.state.claimId} handleChange={this.handleChange} DetailsDTO={this.state.DetailsDTO} getUploadParams={this.state.getUploadParams} onChangeStatus={this.state.handleChangeStatus} onSubmit={this.state.handleSubmit} fields={this.state.fields} onInputParamChange={this.onInputParamChange} />

                                <br />
                                <br />
                                <GridContainer justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={2}>
                                        <Button color="info" round className={classes.marginRight} onClick={(e) => this.onFormSubmit(e)}><TranslationContainer translationKey="IntimateClaim" /></Button>
                                    </GridItem>
                                    {this.renderRedirect()}
                                    <br />
                                </GridContainer>
                                {/*  {this.state.docpage ?
                                                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                           <Document DocumentData={this.state.DocumentData} dmsdocId={this.state.dmsdocId} claimId={this.state.claimId} handleChange={this.handleChange} DetailsDTO={this.state.DetailsDTO} getUploadParams={this.state.getUploadParams} onChangeStatus={this.state.handleChangeStatus} onSubmit={this.state.handleSubmit} fields={this.state.fields} onInputParamChange={this.onInputParamChange} />
                                                </Animated>
                                                : null}
                                              */}
                            </CardBody>
                        </Card>
                    </Animated>
                    : null}






            </div >
        );
    }
}
export default withStyles(styles)(ClaimIntimate);