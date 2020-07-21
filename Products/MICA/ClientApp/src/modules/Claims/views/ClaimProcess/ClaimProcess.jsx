import Icon from "@material-ui/core/Icon";
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import FilterNone from "@material-ui/icons/FilterNone";
import searchproduct from "assets/img/search-product.png";
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import profileStyles from "assets/jss/material-dashboard-pro-react/views/profileStyles.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import ClaimConfig from "modules/Claims/ClaimConfig.js";
import ClaimSearch from "modules/Claims/views/ClaimProcess/_ClaimSearch.jsx";
import validationPage from "modules/Claims/views/ValidationPage.jsx";
import React from "react";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import swal from 'sweetalert';
import ClaimsDecision from "modules/Claims/views/ClaimProcess/ClaimsDecision.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Animated } from "react-animated-css";
import claimprocess from "assets/img/claim-process.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Modal from '@material-ui/core/Modal';
import PDFViewer from 'pdf-viewer-reactjs';
import BankdetailsFields from "modules/Claims/views/ClaimProcess/BankdetailsFields.json";
import CustomerBankDetails from "modules/Claims/views/ClaimProcess/CustomerBankDetails.json";
import PolicyDetails from "modules/Claims/views/ClaimProcess/_PolicyDetails.jsx";
import ClaimDetails from "../ClaimProcess/_ClaimDetails.jsx";
import DocDetails from "../ClaimProcess/_DocDetails.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import CustomDateTimePicker from "components/CustomDateTimePicker/DateTimePicker.jsx";
//import Data from "./Data.json";

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

const paddingCard =
{
    padding: "10px",
};

class ClaimProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseflag: false,
            ValidIFSCCode: false,
            renderpage: false,
            PerformerFlag: true,
            ClaimIntemationDate: null,
            claimsremarksflag: false,
            claimstatusflag: false,
            prodId: "",
            vehicleclaim: false,
            vehicleclaimstate: false,
            vehicleclaimdriver: false,
            vehicleclaimsurvey: false,
            displaybank: false,
            isimage: false,
            openpop: false,
            popopen: false,
            bytearr: [],
            docbyte: [],
            base64: [],
            pageloader: false,
            nodata: false,
            loader: true,
            errormessage: false,
            ValidationUI: true,
            validateUI: false,
            approveamtvalidation: false,
            amtflag: false,
            approvedAmtflag: false,
            ActivityData: [],
            errorstatus: false,
            approved: false,
            decisions: false,
            encodedData: "",
            selectedimage: [],
            docdata: [],
            policyId: 0,
            disabled: false,
            count: 0,
            react: false,
            SetDecision: "",
            orgid: "",
            open: false,
            decision: false,
            officeId: "",
            Claimlist: [],
            officelist: [],
            Claimsendlist: [],
            officesendlist: [],
            PolicyDetails: [],
            ClaimDetails: [],
            ClaimsDecisionData: [],
            claimsdecisionshow: false,
            documentName: "",
            masterList: [],
            DocumentData: [],
            ClaimDataDTO: [],
            ClaimAmountdetailsdata: [],
            typeList: [],
            claimId: 0,
            imagebyte: "",
            insuredName: "",
            insuredRefNo: "",
            policyNo: "",
            claimNumber: "",
            claimNumberState: false,
            policyNoState: false,
            insuredReferenceState: false,
            insuredMobileNoState: false,
            insuredEmailState: false,
            eventDateState: false,
            lossDateTimeState: false,
            claimStatusIdState: "",
            claimStatusId: "",
            approvedClaimAmountState: false,
            // approvedClaimAmount: "",
            claimManagerRemarksState: false,
            approvedClaimAmountsState: false,
            claimManagerRemarks: "",
            claimStatus: "",
            coverEvent: "",
            coverEventDate: "",
            coverName: "",
            createBy: "",
            eventDate: "",
            lossDateTime: "",
            insuredEmail: "",
            claimid: "",
            PolicyNumber: "",
            ClaimNumber: "",
            showtable: false,
            data: [],
            radioValue1: false,
            radioValue2: false,
            disabled: false,
            file: null,
            dropFlag: false,
            status: "",
            claimAmounts: "",
            document: "",
            documentType: "",
            approvedClaimAmounts: "",
            claimTableData: [{
                "insurableItem": "",
                "name": "",
                "identificationNo": "",
                "typeOfLoss": "",
                "benefitAmount": "",
                "claimAmounts": "",
                "approvedClaimAmounts": "",
            }],
           // ClaimDTO: this.props.ClaimDTO,
            ClaimDTO: {
                insuredName: "",
                insuredReference: "",
                policyNo: "",
                claimNumber: "",
                claimStatus: "",
                coverEvent: "",
                coverName: "",
                createBy: "",
                eventDate: "",
                lossDateTime: "",
                claimId: "",
                claimStatusId: "",
                insuredMobileNo: "",
                insuredEmail: "",
                // approvedClaimAmount: "",
                ClaimInsurable: [],

            },

            email: "",
            fields: {
                claimStatusId: "",
                approvedClaimAmount: "",
                claimManagerRemarks: "",
                claimNumber: "",
                benefitAmount: "",
                claimId: 0,
                emailId: "",
                policyNo: "",
                alldoc: [],
                ClaimInsurable: [],
                payeeTypeId: "",
                DataModelDTO: [],
                AdditionalDetails: { "Performer": "" }
            },
            emptyobject: {},
            Workshop: {},
            Customer: {},
            Financier: {},
            Nominee: {},
            Surveyor: {},
            docs: {
                documentID: "",
                fileName: "",
                documentType: "",
            },
            BankDetails: {},
            OtherClaimBankDetails: [],
            index: 0,
            claimamt: [{
                approvedClaimAmounts: 0
            },
            {
                approvedClaimAmounts: 0
            },
            {
                approvedClaimAmounts: 0
            },
            {
                approvedClaimAmounts: 0
            }

            ],

            ClaimInsurable: {

                insurableItem: "",
                name: "",
                identificationNo: "",
                typeOfLoss: "",
                benefitAmount: "",
                claimAmounts: "",
                approvedClaimAmounts: "",
                claimamt: [],
                vehicleNo: "",
                makeModel: ""
            },
            Bankfieldsmodel: [],
            Datapic: [

                { data: "" }

            ],
            ProductClaimData: [],
            ClaimSearchDTO: {
                insuredName: "",
                insuredRefNo: "",
                policyNo: "",
                claimNumber: "",
                claimStatus: "",
                coverEvent: "",
                coverName: "",
                createBy: "",
                eventDate: "",
                lossDateTime: "",
            },

            claimDetailsData: {
                "lossDate": "",
                "locationOfEvent": "",
                "lossDescription": "",
                "vehicleLocation": "",
                "vehicleLocationState": "",
                "driverName": "",
                "selfSurvey": "",
                "totalClaimedAmount": "",
                "accountHolderName": "",
                "accountNumber": "",
                "accountType": "",
                "bankName": "",
                "ifscCode": "",
                "bankAddress": "",

            },
            policyDetailsData: {
                "customerId": "",
                "coverNoteNo": "",
                "mobileNumber": "",
                "email": "",
                "eventdate": "",
                "coverEvent": "",
                "sDate": "",
                "eDate": "",
                "totalSumInsured": "",
                "balanceSumInsured": ""
            },
            Bankarray: [],
            ClaimResetData: {
                "claimStatusId": "",
                "claimManagerRemarks": "",
                "approvedClaimAmount": ""
            },

            Payee: [
                { mID: 1, mValue: "Workshop", mType: "Payee", mIsRequired: false, disable: false },
                { mID: 2, mValue: "Customer", mType: "Payee", mIsRequired: false, disable: false },
                { mID: 3, mValue: "Financier", mType: "Payee", mIsRequired: false, disable: false },
                { mID: 4, mValue: "Nominee", mType: "Payee", mIsRequired: false, disable: false },
                { mID: 5, mValue: "Surveyor", mType: "Payee", mIsRequired: false, disable: false }
            ],

            claimTableData: [],
            paymentDetailsData: [],
            DataAmount: [],
            docDetailsData: [],
            DocumentData: [],
            PayeeTypedata: [],
            StatusType: [],
            DecisionType: [],
            AccountTypedata: [],
            ClaimProcessStatus: [],
            Bankdata: {
                "Customer": {
                    "type": "",
                    "Bank Name": "",
                    "Account Holder Name": "",
                    "Account No.": "",
                    "Account Type": "",
                    "IFSC Code": "",
                    "Bank Branch Address": "",
                    "Amount Paid": "",
                    "Date Of Payment": "",
                }
            },
            Bankdata1: {
                "type": "",
                "Bank Name": "",
                "Account Holder Name": "",
                "Account No.": "",
                "Account Type": "",
                "IFSC Code": "",
                "Bank Branch Address": "",
                "Amount Paid": "",
                "Date Of Payment": "",
            },
            BankDataModelDTO: [],
            displaywork: false,
            displaycust: false,
            displayfinancier: false,
            displaynominee: false,
            displaysurveyor: false,
            vehicleActivity: {
                "policyNumber": "",
                "claimNumber": "",
                "vehicleNumbers": [],
            },
            popopen: false,
            vehicleActivitydata: [],
            TableDataList: [],
            BankDataModelData: {}
        };
       
    }

    handleClose = () => {
        this.setState({ openpop: false });
    };
    BankPayeeValidation = () => {
        this.setState({ ValidIFSCCode: false });
        console.log("Bankarray in model", this.state.OtherClaimBankDetails);

        for (var I = 0; I < this.state.OtherClaimBankDetails.length; I++) {
            let validList = this.state.OtherClaimBankDetails[I].BankDetails.filter(S => S.Validation == true && S.Name == "IFSC Code");
            if (validList != null) {
                this.setState({ ValidIFSCCode: true });
            }
            console.log("validateLists", validList);
        }

        let otherClaimBankDetails = this.state.OtherClaimBankDetails;
        //let index = bank.findIndex(e => e.name == name);
        //let bankvalue = bank[index].BankDetails.filter(a => a.Name == evt.target.name)
        //bankvalue[0].Value = evt.target.value;
        //bankvalue[0].Validation = this.Validation(evt, bankvalue[0].ValidationType);
        //this.setState({ bank });
    }
    internalCallFormSubmit = (data) => {
        let field = this.state.fields;
        field.claimManagerRemarks = data.claimManagerRemarks;
        field.claimStatusId = data.claimStatusId;
        this.setState({ field });
        this.onFormSubmit();
    }
    SetValue = (type, event) => {

        let name = event.target.name;
        let value = event.target.value;
        let ClaimDTO = this.state.ClaimDTO;
        ClaimDTO[name] = value;
        this.setState({ ClaimDTO });
        this.change(event, name, type);
    };

    onFormSubmit = () => {
        this.state.ValidationUI = true;
        this.state.validateUI = false;
        this.state.responseflag = true;
        this.state.approveamtvalidation = false;
        this.IsValidProductDetails();
        this.handleAmountValidation();
        this.BankPayeeValidation();
        if (this.state.approveamtvalidation === true) {
            if (this.state.ValidIFSCCode == false) {
                if (this.state.ValidationUI === true) {

                    this.setState({ claimsdecisionshow: true });

                    console.log("submit", this.state.fields);
                    let field = this.state.fields;
                    field.DataModelDTO = [];    
                    field.emailId = this.state.email;

                    if (!$.isEmptyObject(this.state.BankDataModelDTO["Workshop"])) {
                        field.DataModelDTO.push(this.state.BankDataModelDTO["Workshop"]);
                    }
                    if (!$.isEmptyObject(this.state.BankDataModelDTO["Customer"])) {
                        field.DataModelDTO.push(this.state.BankDataModelDTO["Customer"]);
                    }
                    if (!$.isEmptyObject(this.state.BankDataModelDTO["Financier"])) {
                        field.DataModelDTO.push(this.state.BankDataModelDTO["Financier"]);
                    }
                    if (!$.isEmptyObject(this.state.BankDataModelDTO["Nominee"])) {
                        field.DataModelDTO.push(this.state.BankDataModelDTO["Nominee"]);
                    }
                    if (!$.isEmptyObject(this.state.BankDataModelDTO["Surveyor"])) {
                        field.DataModelDTO.push(this.state.BankDataModelDTO["Surveyor"]);
                    }
                    this.setState({ field });
                    console.log("fields: ", field);
                    console.log("submit JSON", JSON.stringify(this.state.fields));

                    let detailsdto = this.state.fields;

                    console.log("ClaimData", this.state.claimTableData);

                    for (var i = 0; i < this.state.claimTableData.length; i++) {
                        //if (this.state.claimTableData[i].approvedClaimAmounts != null) {
                        this.state.DataAmount.push(this.state.claimTableData[i]);
                        //}
                    }
                    detailsdto['ClaimInsurable'] = this.state.DataAmount;

                    this.setState({ detailsdto });

                    fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/ClaimProcess`, {
                        method: 'Post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                        },
                        body: JSON.stringify(field)
                    }).then(response => response.json())
                        .then(data => {
                            console.log("response: ", data)
                            //      if (data.status == 200) {
                            //  this.state.claimId = data.claimId;
                            //  this.setState({ claimnumber: data.claimNumber });
                          
                            if (data.status == 3) {
                                swal({
                                    text: data.responseMessage,
                                    icon: "success",
                                    buttons: [false, "OK"],
                                }).then((willDelete) => {
                                    if (willDelete) {
                                        this.setState({ responseflag: false });
                                        this.handlepagereload();
                                    }
                                });
                            } else if (data.status == 7) {
                                this.setState({ responseflag: false });
                                if (data.errors.length > 0) {
                                    swal({

                                        text: data.errors[0].errorMessage,
                                        icon: "error"
                                    });
                                } else {
                                    swal({

                                        text: data.responseMessage,
                                        icon: "error"
                                    });
                                }


                            } else if (data.status == 9) {
                                this.setState({ responseflag: false });
                                if (data.errors.length > 0) {
                                    swal({
                                        text: data.errors[0].errorMessage,
                                        icon: "error"
                                    });
                                } else {
                                    swal({
                                        text: data.responseMessage,
                                        icon: "error"
                                    });
                                }
                            }
                            //this.renderRedirect();
                        });

                } else {
                    this.setState({ responseflag: false });
                    //this.setState({ errormessage: true });
                    if (this.state.fields.claimStatusId == "") {
                        this.setState({ errormessage: true });
                        this.setState({ claimstatusflag: true });
                        swal("", "Please select Claim status", "error");
                    }
                    else if (this.state.fields.claimManagerRemarks == "" || this.state.fields.claimManagerRemarks == null) {
                        this.setState({ errormessage: true });
                        this.setState({ claimsremarksflag: true });
                        swal("", "Please enter Claim manager remarks", "error");
                    }
                    else {

                    }
                }

            }
            else {
                this.setState({ responseflag: false });
                swal("", "IFSC Code should be in correct format (eg: CNBK1234567)", "error");
            }
        } else {
            this.setState({ responseflag: false });
            swal("", "Approved amount cannot be greater than balance sum insured", "error");
        }

    };

    handlepagereload = () => {
        window.location.reload();
    }

    IsValidProductDetails = () => {
        if (this.state.fields.claimStatusId !== "" && this.state.fields.claimManagerRemarks !== "" && this.state.fields.claimManagerRemarks !== null) {
        } else {
            this.state.ValidationUI = false; this.state.errormessage = true;
            this.setState({});
        }
    }
    handleAmountValidation = () => {

        let amt = 0;

        const workshopvalue = Number(this.state.BankDataModelDTO["Workshop"]["Amount Paid"]) || 0;
        const custvalue = Number(this.state.BankDataModelDTO["Customer"]["Amount Paid"]) || 0;
        const financevalue = Number(this.state.BankDataModelDTO["Financier"]["Amount Paid"]) || 0;
        const nomineevalue = Number(this.state.BankDataModelDTO["Nominee"]["Amount Paid"]) || 0;
        const surveyorvalue = Number(this.state.BankDataModelDTO["Surveyor"]["Amount Paid"]) || 0;

        console.log("amount values:", workshopvalue, custvalue, financevalue, nomineevalue, surveyorvalue);
        if (!isNaN(workshopvalue) || !isNaN(custvalue) || !isNaN(financevalue) || !isNaN(nomineevalue) || !isNaN(surveyorvalue)) {
            amt = amt + workshopvalue + custvalue + financevalue + nomineevalue + surveyorvalue;
        }
        console.log("Amountdetails", amt, this.state.claimTableData.approvedClaimAmounts);

        if (Number(this.state.fields.approvedClaimAmount) > Number(this.state.policyDetailsData.balanceSumInsured)) {
            this.state.approveamtvalidation = false;
            // this.state.approvedAmtflag = true;
            this.setState({});
        } else {
            this.state.approveamtvalidation = true;
            //this.state.approvedAmtflag = false;
            this.setState({});
        }

        //if (amt > this.state.fields.approvedClaimAmount) {
        //    this.state.validateUI = false;
        //    //this.state.amtflag = true;
        //    this.setState({});
        //} else {
        //    this.state.validateUI = true;
        //    // this.state.amtflag = false;
        //    this.setState({});
        //}
    }

    onInputParamChange = (type, evt) => {
        let fields = this.state.fields;
        let name = evt.target.name;
        let value = evt.target.value;
        fields[name] = value;
        this.setState({ fields });

        this.change(evt, name, type);
    };

    handleddlChange = (currentNode, selectedNodes) => {
        console.log("currentNode", currentNode, selectedNodes);
        if (currentNode.mIsRequired === true) {
            this.setState({ displaybank: true });

        } else {
            this.setState({ displaybank: false });
        }
    }

    editFunction(id, oid) {
        
        var CArr = this.state.Claimlist;
        var ClaimArr = [];
        $.each(CArr, function (k, v) {
            if (v.claimId == oid) {
                ClaimArr.push(CArr[id]);
            }
        })
        console.log("ClaimArr", ClaimArr);
        this.setState({ Claimsendlist: ClaimArr });
        this.state.claimid = ClaimArr[0].claimId;
        const Claimdata = ClaimArr[0].claimId;
        this.setState({ claimid: oid });
        console.log("Claimid: ", this.state.claimid);
        this.setState({ claimId: Claimdata });
        const fields = this.state.fields;
        fields.claimNumber = ClaimArr[0].claimNumber;
        fields.claimId = ClaimArr[0].claimId;
        fields.claimStatusId = ClaimArr[0].claimStatusId;
        fields.claimManagerRemarks = ClaimArr[0].claimManagerRemarks;
        fields.approvedClaimAmount = ClaimArr[0].approvedClaimAmount;
        //this.state.claimamt.approvedClaimAmounts = ClaimArr[0].insurableApprovedAmount;

        this.state.prodId = ClaimArr[0].productIdPk;
        console.log("prodId", this.state.prodId);

        this.setState({ fields });
        this.onGet();
        this.setState({ policyId: ClaimArr[0].policyId });
        console.log("Claimsendlist: ", this.state.Claimsendlist);

        this.policyDetailsfun(ClaimArr[0].policyNo);
        this.claimAmountTable();
       
        this.documentView(oid, false, true);

        // this.paymentDetailsfun(ClaimArr[0].claimId);
        this.state.PolicyNumber = ClaimArr[0].policyNo;
        this.state.ClaimNumber = ClaimArr[0].claimNumber;
        this.state.ClaimIntemationDate = ClaimArr[0].createdDate;
        this.setState({ open: true });

        console.log("approved", this.state.approved, this.state.decision, this.state.ClaimIntemationDate);
        if (ClaimArr[0].claimStatus == "Approved" || ClaimArr[0].claimStatus == "Rejected") {
            this.setState({ approved: false });
        }
        //else if (this.state.decision == false) {
        //    this.setState({ approved: false });
        //}
        else {
            this.setState({ approved: true });

        }
        // this.docTable();
        if (ClaimArr[0].claimStatus == "Approved") {
            this.setState({ approved: false });
            swal("", "Claim is already approved!", "success");
        }
        else if (ClaimArr[0].claimStatus == "Rejected") {
            this.setState({ approved: false });
            swal("", "Claim is already rejected!", "success");
        }
        else if (ClaimArr[0].claimStatus == "Settled") {
            this.setState({ approved: false });
            swal("", "Claim is already settled!", "success");
        }
        else {
            this.setState({ approved: true });
        }

       
        //this.handleBankdetails(oid);
        this.setState({ showtable: false });
        //this.claimAmountTable();
    }

    componentDidMount() {
    
        let ClaimDecision = "Claims Decision";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + ClaimDecision + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ClaimsDecisionData: data });

                console.log("ClaimsDecisionData", data);

                const statusdata = this.state.ClaimsDecisionData[0].mdata;
                const status1 = statusdata.filter(i => i.mID === 16);
                const status2 = statusdata.filter(i => i.mID === 17);
                this.state.StatusType.push(status1[0], status2[0]);


                // state.concat(this.state.ClaimsDecisionData[0].mdata[3]);

                this.setState({});
                console.log("StatusType: ", status2, this.state.StatusType);


                const decisiondata = this.state.ClaimsDecisionData[0].mdata;
                const decision1 = decisiondata.filter(x => x.mID === 9);
                const decision2 = decisiondata.filter(x => x.mID === 11);
                const decision3 = decisiondata.filter(x => x.mID === 17);
                this.state.DecisionType.push(decision1[0], decision2[0], decision3[0]);
                this.setState({});
                console.log("DecisionType", this.state.DecisionType, decisiondata);
            });

        let AccountType = "Account Type";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + AccountType + ``, {
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

        let ClaimStatus = "Claim Status";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + ClaimStatus + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ ClaimStatusData: data });

                console.log("ClaimStatusData", data);


                const Claimstatusdata = this.state.ClaimStatusData.filter(item => item.mType === "Claim Status");
                console.log("Claimstatusdata", Claimstatusdata);

                const Claimstatusdata1 = Claimstatusdata[0].mdata.filter(i => i.mID === 33);
                const Claimstatusdata2 = Claimstatusdata[0].mdata.filter(i => i.mID === 34);
                const Claimstatusdata3 = Claimstatusdata[0].mdata.filter(i => i.mID === 35);
                const Claimstatusdata4 = Claimstatusdata[0].mdata.filter(i => i.mID === 36);
                const Claimstatusdata5 = Claimstatusdata[0].mdata.filter(i => i.mID === 37);
                this.state.ClaimProcessStatus.push(Claimstatusdata1[0], Claimstatusdata2[0], Claimstatusdata3[0], Claimstatusdata4[0], Claimstatusdata5[0]);
                this.setState({});

                console.log("ClaimProcessStatus", this.state.ClaimProcessStatus);
            });

        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );

        this.setState({ Bankfieldsmodel: BankdetailsFields });
        let datamodel = this.state.BankDataModelDTO;
        datamodel["Workshop"] = {};
        datamodel["Customer"] = {};
        datamodel["Financier"] = {};
        datamodel["Nominee"] = {};
        datamodel["Surveyor"] = {};

        this.setState({ datamodel, responseflag: false  });
        console.log("datamodel ", datamodel);
    }
   


    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };
        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    handledatechange = (date) => {
        const _date = date.split('-');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.day + '/' + dateObj.month + '/' + dateObj.year;
    }

    tableshow = () => {

        //const Cdate = this.state.ClaimDTO.eventDate;

        //if (this.state.ClaimDTO.eventDate != "") {
        //    this.state.ClaimDTO.eventDate = this.datechange(this.state.ClaimDTO.eventDate);
        //}


        let that = this;
        that.setState({ loader: false });
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchClaim`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.ClaimDTO)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            that.setState({ showtable: false, loader: false });
            if (data.claimSearch.length > 0) {
                that.dataTable(data.claimSearch);
                that.setState({ email: data.claimSearch[0].insuredEmail });
            } else {
                setTimeout(
                    function () {
                        that.setState({ loader: true, showtable: false, nodata: true });
                    }.bind(this), 2000
                );
            }

            that.setState({ Claimlist: data.claimSearch });
            that.setState({ officelist: data.claimSearch });
        });
       // this.state.ClaimDTO.eventDate = Cdate;
    };

   

    setstatus = (type, event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    dataTable = (officelist) => {
        console.log("officelist in react", officelist);
        this.setState({ loader: true, showtable: true });
        this.setState({
            data: officelist.map((prop, key) => {
                //console.log("coming");
                const { classes } = this.props;
                //console.log("prop data", prop);
                //console.log("send data", key);
                return {
                    // id: key + 1,
                    insuredName: prop.insuredName,
                    policyNo: prop.policyNo,
                    claimNumber: prop.claimNumber,
                    typeOfLoss: prop.typeOfLoss,
                    lossDateTime: new Date(prop.lossDateTime).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    claimStatus: prop.claimStatus,
                    //coverEvent: prop.coverEvent,
                    //coverName: prop.coverName,
                    
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.claimId)} />

                };

            })
        });
    }

    docTable = () => {
        this.setState({
            docdata: this.state.DocumentData.map((prop, key) => {
                const { classes } = this.props;
                return {
                    id: key + 1,
                    documentName: prop.documentView,
                    documentType: prop.documentType,
                    documentView: <a onClick={() => this.documentLinkView(prop.dmsdocId)}> {prop.documentName} </a>
                };

            })
        });

    }

    claimAmountTable = () => {

        let arr = this.state.claimTableData.map((prop, key) => {
            return (prop.coverDynamic.filter(c => c.Header == "Vehicle Number").length > 0) ? prop.coverDynamic.filter(c => c.Header == "Vehicle Number")[0].Details : "";

        });
        this.state.vehicleActivity.vehicleNumbers = Array.from(new Set(arr));
        this.state.vehicleActivity.policyNumber = this.state.PolicyNumber;
        this.state.vehicleActivity.claimNumber = this.state.ClaimNumber;

        console.log("TableData#007", this.state.claimTableData, this.state.vehicleActivity.vehicleNumbers);
        this.setState({
            TableData: this.state.claimTableData.map((prop, key) => {
                return {
                    id: key + 1,
                    insurableItem: prop.insurableItem,
                    name: prop.name,
                    identificationNo: prop.identificationNo,
                    //vehicleNo: prop.vehicleNo,
                    //makeModel: prop.makeModel,
                    typeOfLoss: prop.coverName,
                    coverValue: prop.coverDynamic.map((c) => {
                        return (<p className="gridparagraph"> {c.Header} : {c.Details} </p>)
                    }),
                    //benefitAmount: prop.benefitAmount,
                    claimAmounts: prop.claimAmounts,
                    approvedClaimAmounts:
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                success={this.state.approvedClaimAmountsState === "success"}
                                error={this.state.approvedClaimAmountsState === "error"}
                                labelText=""
                                id="padding-input"
                                value={this.state.claimamt.approvedClaimAmounts}
                                name="approvedClaimAmounts"
                                type="numeric"
                                inputType="number"
                                //onBlur={this.ClaimAmountSum}
                                onChange={(e) => this.handleClaimAmount("approvedClaimAmounts", e, key)}
                                formControlProps={{ fullWidth: true }
                                } />
                            {/*     {this.state.errormessage && (this.state.claimTableData[key].approvedClaimAmounts) ? <p className="error" >*Enter Claim Amount </p> : null}
                            {(this.state.claimTableData[key].approvedClaimAmounts > this.state.claimTableData[key].claimAmounts) ? <p className="error">*Approved Amount should not be greater than Claim Amount</p> : null}
                        */}
                        </GridItem>
                };
            })
        });

    }

    Editopen = () => {
        this.setState({ disabled: false });
        this.setState({ open: true });
        console.log("officesendlist: ", this.state.officesendlist);

    }

    claimDetailsfun = (id) => {
        debugger;
        console.log("this.state.claimIds", this.state.claimid);

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchClaimDetails?ClaimId=` + id, {

            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Claimprocessdata", data);
                this.setState({ claimTableData: data[1] });
                this.state.claimamt.approvedClaimAmounts = data[1][0].approvedClaimAmounts;
                this.claimAmountTable(this.state.claimTableData);

                this.state.claimDetailsData.lossDate = new Date(data[0][0][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                this.state.claimDetailsData.locationOfEvent = data[0][1][1];
                this.state.claimDetailsData.lossDescription = data[0][2][1];
                this.state.claimDetailsData.totalClaimedAmount = data[0][3][1];
               // this.state.fields.AdditionalDetails.Performer = data[0][8][1];

                //if (data[0][4][1].length != 0 && data[0][5][1].length != 0 && data[0][6][1].length != 0) {

                //    this.state.claimDetailsData.vehicleLocation = data[0][4][1];
                //    this.state.claimDetailsData.driverName = data[0][5][1];
                //    this.state.claimDetailsData.selfSurvey = data[0][6][1];

                //    this.setState({ vehicleclaim: true });
                //}
                if (data[0].length > 4) {
                    if (data[0][4][1] != null && data[0][4][1].length > 0) {
                        this.state.claimDetailsData.vehicleLocation = data[0][4][1];
                        this.setState({ vehicleclaim: true });
                    }
                    else {
                        this.setState({ vehicleclaim: false });
                    }
                    if (data[0][5][1] != null && data[0][5][1].length > 0) {
                        this.state.claimDetailsData.vehicleLocationState = data[0][5][1];
                        this.setState({ vehicleclaimstate: true });
                    }
                    else {
                        this.setState({ vehicleclaimstate: false });
                    }
                    if (data[0][6][1] != null && data[0][6][1].length > 0) {
                        this.state.claimDetailsData.driverName = data[0][6][1];
                        this.setState({ vehicleclaimdriver: true });
                    }
                    else {
                        this.setState({ vehicleclaimdriver: false });
                    }
                    if (data[0][7][1] != null && data[0][7][1].length > 0) {
                        this.state.claimDetailsData.selfSurvey = data[0][7][1];
                        this.setState({ vehicleclaimsurvey: true });
                    }
                    else {
                        this.setState({ vehicleclaimsurvey: false });
                    }
                }

                if (data.length > 2 && data[2].length > 0) {
                    let arr = [];
                    for (var i = 0; i < data[2].length; i++) {
                        let obj = {};
                        obj.name = data[2][i].payeeType;
                        obj.BankDetails = JSON.parse(JSON.stringify(BankdetailsFields));
                        arr.push(obj);
                        if (this.state.ProductClaimData.length > 0) {
                            let checkboxindex = this.state.ProductClaimData.findIndex(s => s.mValue == data[2][i].payeeType);
                            if (checkboxindex != -1) {
                                this.state.ProductClaimData[checkboxindex].mIsRequired = true;
                            }
                        }
                        console.log("checkboxindex", this.state.ProductClaimData, data[2][i].payeeType);
                        let bank = arr;
                        let index = bank.findIndex(e => e.name == data[2][i].payeeType);
                        let bankvalue = bank[index].BankDetails.filter(a => a.Name == "Account Holder Name")
                        bankvalue[0].Value = data[2][i].accountHolderName;
                        bankvalue = bank[index].BankDetails.filter(a => a.Name == "Account No.")
                        bankvalue[0].Value = data[2][i].accountNumber;
                        bankvalue = bank[index].BankDetails.filter(a => a.Name == "Account Type")
                        bankvalue[0].Value = data[2][i].accountType;
                        bankvalue = bank[index].BankDetails.filter(a => a.Name == "Bank Name")
                        bankvalue[0].Value = data[2][i].bankName;
                        bankvalue = bank[index].BankDetails.filter(a => a.Name == "IFSC Code")
                        bankvalue[0].Value = data[2][i].ifsccode;
                        bankvalue = bank[index].BankDetails.filter(a => a.Name == "Bank Branch Address")
                        bankvalue[0].Value = data[2][i].bankBranchAddress;
                        bankvalue = bank[index].BankDetails.filter(a => a.Name == "Amount Paid")
                        bankvalue[0].Value = data[2][i].amountPaid;
                        bankvalue = bank[index].BankDetails.filter(a => a.Name == "Date Of Payment")
                        bankvalue[0].Value = data[2][i].dataOfPayment;
                        let tempObj = Object.assign({}, this.state.Bankdata1);
                        tempObj["type"] = data[2][i].payeeType;
                        tempObj["Bank Name"] = data[2][i].bankName;
                        tempObj["Account Holder Name"] = data[2][i].accountHolderName;
                        tempObj["Account No."] = data[2][i].accountNumber;
                        tempObj["Account Type"] = data[2][i].accountType;
                        tempObj["IFSC Code"] = data[2][i].ifsccode;
                        tempObj["Bank Branch Address"] = data[2][i].bankBranchAddress;
                        tempObj["Amount Paid"] = data[2][i].amountPaid;
                        tempObj["Date Of Payment"] = data[2][i].dataOfPayment;
                        this.state.BankDataModelDTO[data[2][i].payeeType] = Object.assign(this.state.BankDataModelDTO[data[2][i].payeeType], tempObj);
                        //this.setState({ bank });	
                    }
                    this.setState({ OtherClaimBankDetails: arr });
                }
                this.setState({ renderpage: true });
                console.log("this.state.OtherClaimBankDetails", this.state.OtherClaimBankDetails);

            });

        // this.setState({ disabled: true });


    }

    policyDetailsfun = (policyNo) => {

        console.log("this.state.policyId", policyNo);
        fetch(`${ClaimConfig.policyconfigUrl}/api/Policy/SearchPolicyDetailsByNumber?PolicyNumber=` + policyNo, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                // this.setState({ policyDetailsData: data });
                console.log("insured", data);
                this.state.policyDetailsData.customerId = data[0][1];
                this.state.policyDetailsData.coverNoteNo = data[1][1];
                this.state.policyDetailsData.mobileNumber = data[2][1];
                this.state.policyDetailsData.email = data[3][1];
                //this.state.policyDetailsData.eventdate = new Date(data[3][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                //this.state.policyDetailsData.coverEvent = data[4][1];
                this.state.policyDetailsData.sDate = new Date(data[6][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                this.state.policyDetailsData.eDate = new Date(data[7][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                this.state.policyDetailsData.totalSumInsured = data[8][1];
                this.state.policyDetailsData.balanceSumInsured = data[9][1];

                console.log("abcdddddd", this.state.policyDetailsData);


            });
        this.setState({ disabled: true });
    }

    documentView = (oid, isDoc, isPolicy) => {

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/DocumentView?ClaimId=` + oid + `&isDoc=` + isDoc + `&isPolicy=` + isPolicy, {
            method: 'get',

            headers: {

                'Accept': 'application/json',

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },

        }).then(response => response.json())

            .then(data => {
                this.setState({ docDetailsData: data });

                if (data.length > 0) {
                    const doc = this.state.Datapic[0];
                    doc.document = data[0].document;
                    this.setState({ doc });
                }
                for (let i = 0; i < this.state.docDetailsData.length; i++) {
                    if (this.state.docDetailsData[i].dmsdocId != null) {
                        this.state.DocumentData.push(this.state.docDetailsData[i]);
                        this.docTable(this.state.DocumentData);
                    }
                }
            });
    }

    documentLinkView = (dmsdocId) => {
        console.log("1234567", dmsdocId);
       
        fetch(`${ClaimConfig.NotificationUrl}/api/DMS/DownloadView?id=` + dmsdocId, {

            method: 'get',

            headers: {

                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },

        }).then(response => response.json())

            .then(data => {
                console.log("Data:fgdgh", data);
                this.setState({ bytearr: data.data });

                console.log("doc123data", this.state.bytearr);
                console.log("docDetailsData", this.state.docDetailsData);

                if (data.contentType == "pdf") {
                    this.setState({ isimage: true });
                }
                else {
                    this.setState({ isimage: false });
                }

                //const doc = this.state.Datapic[0];

                // doc.document = data[0].document;

                // this.setState({ doc });

                // console.log("document", this.state.Datapic[0].documentType);
                //let file = this.state.Datapic[0].document;
                //window.open(file);
                //window.open('http://localhost:61048/Bills/"+documentStr+"', '_blank');

                // window.open("data:application/pdf;base64, " + this.state.bytearr);
                // let pdfWindow = window.open("")
                // pdfWindow.bytearr.write("<iframe width='100%' height='100%' src='data:application/jpg;base64, " + this.state.bytearr + "'></iframe>") 
                // this.docTable(this.state.bytearr);
                this.setState({ openpop: true });
            });
        // this.setState({ openpop: true });
    }

    uint8ToImageData = (uint8, width, height) => {

        let iData = this.context.createImageData(width, height);

        for (let i = 0; i < uint8.length; i++) {

            iData.data[i] = uint8[i];

        }

        return iData;

    }

    SetDecision = (setValue) => {

        this.setState({ decision: setValue });
        console.log("data", setValue);
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    handleClaimAmount = (type, event, index) => {

        let claim = this.state.claimTableData[index];
        let name = event.target.name;
        let value = event.target.value;
        claim[name] = value;

        this.setState({ claim });
        let amt = 0;
        for (let i = 0; i <= index; i++) {
            amt = amt + Number(this.state.claimTableData[i].approvedClaimAmounts);
            console.log("ClaimIntimationDetails ", this.state.claimTableData[i].approvedClaimAmounts);
        }
        this.state.fields.approvedClaimAmount = amt;
        this.state.claimamt.approvedClaimAmounts = amt;
        this.setState({});
        console.log("ClaimIntimationDetails claimAmount ", this.state.fields.approvedClaimAmount);
        this.claimAmountTable();

        if (Number(this.state.claimTableData[index].approvedClaimAmounts) > Number(this.state.claimTableData[index].claimAmounts)) {	


            this.state.ValidationUI = false;
            this.state.errorstatus = true;
            this.setState({});


        } else {
            this.state.ValidationUI = false;
            this.state.errorstatus = false;
            this.setState({});

        }

        this.change(event, name, type);
    }

    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "insuredEmail":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "approvedClaimAmounts":
                if (validationPage.verifylength(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "insuredMobileNo":
                if (validationPage.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "insuredReference":
                if (validationPage.verifylength(event.target.value, 5)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "eventDate":
                if (validationPage.verifydatetime(event.toDate())) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "lossDateTime":
                if (validationPage.verifydatetime(event.toDate())) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "policyNo":
                if (validationPage.verifyPolicynumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "claimNumber":
                if (validationPage.verifyClaimNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            case "claimManagerRemarks":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            default:
                break;
        }
    }

    docidfunc = (data) => {
        let dmsids = data.dMSDTOs;
        for (let i = 0; i < dmsids.length; i++) {
            let docclone = Object.assign({}, this.state.docs);
            docclone.documentID = data.dMSDTOs[i].docId;
            docclone.fileName = data.dMSDTOs[i].fileName;
            docclone.documentType = data.dMSDTOs[i].contentType;
            this.state.fields.alldoc.push(docclone);
            this.setState({});

        }
        console.log("alldoc", this.state.fields);
        // console.log("docid", this.state.alldoc.dmsdocId, this.state.alldoc.documentName);

    }

    onGet = () => {
        let claimprocess = "Claim Process";
        fetch(`${ClaimConfig.productConfigUrl}/api/Product/GetProductClaimsDetails?ProductId=` + this.state.prodId + `&FieldType=` + claimprocess + ``, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("data", data);

                this.setState({ ProductClaimData: data });

                // this.state.ProductClaimData.mIsRequired = false;
                // this.setState({});

                console.log("ProductClaimData", this.state.ProductClaimData);

                this.claimDetailsfun(this.state.claimId);
            });
    }

    

    renderRedirect = () => {
        const Claimdata = this.state.ClaimResetData;
        this.state.fields = Claimdata;
        this.setState({ Claimdata });

    }

    handleActivitylog = () => {
        let that = this;
        fetch(`${ClaimConfig.claimConfigUrl}/api/Mica_EGI/GetVehicleActivity`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(that.state.vehicleActivity)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("ActivityVehciledata", data);
            if (data.status == 1) {
                if (data.vehicleData.length > 0) {
                    that.setState({ popopen: true });
                    that.setState({ vehicleActivitydata: data.vehicleData });
                    that.ActivityTableHeader(data.vehicleData[0].activityDTOs);
                }
                else {
                    swal({
                        text: data.responseMessage,
                        icon: "error"
                    });
                }
            }
            else if (data.status == 8) {
                swal({
                    text: data.responseMessage,
                    icon: "error"
                });
            }
            console.log("vehicleActivitydata", that.state.vehicleActivitydata);
            //that.setState({ popopen: true });	
        });
    }

    handleActivityClose = () => {
        this.setState({ popopen: false });
    };

    ActivityTableHeader = (activityDTOs) => {
        this.setState({
            TableDataList: Object.keys(activityDTOs[0]).map((prop, key) => {
                return {
                    Header: prop.charAt(0).toUpperCase() + prop.slice(1),
                    accessor: prop,
                };
                this.setState({});
            })
        });
        console.log("table data", this.state.TableDataList);
    }

    handlePerformerFun = (e) => {
        let AdditionalDetails = this.state.fields.AdditionalDetails;
        AdditionalDetails[e.target.name] = e.target.value;
        this.setState({ AdditionalDetails });

    }

    handleCheckboxUpdate = (event, name, i) => {
        if (event.target.checked == true) {
            this.state.ProductClaimData[i].mIsRequired = true;
        } else if (event.target.checked == false) {
            this.state.ProductClaimData[i].mIsRequired = false;
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={claimprocess} /></Icon>

                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                            <small><TranslationContainer translationKey="ClaimProcess" /></small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={4} md={3}> <CustomInput
                                //  success={this.state.policyNoState === "success"}
                                error={this.state.policyNoState}
                                labelText="PolicyNo"
                                name="policyNo"
                                value={this.state.ClaimDTO.policyNo}
                                onChange={(e) => this.SetValue("policyNo", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            {/*  <GridItem xs={12} sm={4} md={3}> <CustomInput
                                    //success={this.state.insuredReferenceState === "success"}
                                    error={this.state.insuredReferenceState}
                                    labelText="InsuredReferenceNo"
                                    name="insuredReference"
                                    value={this.state.ClaimDTO.insuredReference}
                                    onChange={(e) => this.SetValue("insuredReference", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>*/}

                            <GridItem xs={12} sm={4} md={3}> <CustomInput
                                // success={this.state.insuredMobileNoState === "success"}
                                error={this.state.insuredMobileNoState}
                                labelText="InsuredMobileNo"
                                name="insuredMobileNo"
                                value={this.state.ClaimDTO.insuredMobileNo}
                                onChange={(e) => this.SetValue("insuredMobileNo", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            {/* <GridItem xs={12} sm={4} md={3}> <CustomInput
                                    success={this.state.insuredEmailState === "success"}
                                    error={this.state.insuredEmailState === "error"}
                                    labelText="InsuredEmailID"
                                    name="insuredEmail"
                                    value={this.state.ClaimDTO.insuredEmail}
                                    onChange={(e) => this.SetValue("insuredEmail", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>*/}
                            <GridItem xs={12} sm={4} md={3}> <CustomInput
                                //success={this.state.claimNumberState === "success"}
                                error={this.state.claimNumberState}
                                labelText="ClaimNo"
                                name="claimNumber"
                                value={this.state.ClaimDTO.claimNumber}
                                onChange={(e) => this.SetValue("claimNumber", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>

                            <GridItem xs={12} sm={4} md={3}>
                                <CustomDatetime
                                    onFocus={this.onClick}
                                    //success={this.state.lossDateTimeState === "success"}
                                    error={this.state.lossDateTimeState}
                                    labelText="LossDate"
                                    Futuredatevalidate={true}
                                    id='dtActiveFrom'
                                    name='lossDateTime'
                                    onChange={(evt) => this.onDateChange('datetime', 'ClaimDTO', 'lossDateTime', evt)}
                                    value={this.state.ClaimDTO.lossDateTime}
                                    formControlProps={{ fullWidth: true }} />


                                {/* <CustomDateTimePicker timeformate={false} disabled={false} width='13rem' labelText="Loss Date Time" name='lossDateTime' value={this.state.ClaimDTO.lossDateTime} onChange={(e) => this.handleDateChange(e, "lossDateTime")} />*/}

                            </GridItem>

                            <GridItem xs={12} sm={4} md={3}>

                                <Dropdown
                                    // succes={this.state.claimStatusIdState === "success"}
                                    error={this.state.claimStatusIdState}
                                    labelText="ClaimStatus"
                                    id="ddlstatus"
                                    lstObject={this.state.ClaimProcessStatus}
                                    value={this.state.ClaimDTO.claimStatusId}
                                    name='claimStatusId'
                                    onChange={(e) => this.SetValue("claimStatusId", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />


                            </GridItem>

                            <GridContainer justify="center">
                                <GridItem xs={3} sm={3} md={3}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <Button color="warning" onClick={this.tableshow} id="claims" round>
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
                        {this.state.showtable ?
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={<h5><TranslationContainer translationKey="Claimprocess" /></h5>}
                                        data={this.state.data}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Select",
                                                accessor: "radio",
                                                sortable: false,
                                                filterable: false,
                                                minWidth: 30,
                                                resizable: false,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            },
                                            {
                                                Header: "InsuredName",
                                                accessor: "insuredName",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,
                                            },
                                            {
                                                Header: "PolicyNo",
                                                accessor: "policyNo",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,
                                            },
                                            {
                                                Header: "ClaimNo",
                                                accessor: "claimNumber",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Type Of Loss",
                                                accessor: "typeOfLoss",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 40,
                                                resizable: false,
                                            },
                                            {
                                                Header: "LossDate",
                                                accessor: "lossDateTime",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                minWidth: 40,
                                                resizable: false,
                                            },
                                            {
                                                Header: "ClaimStatus",
                                                accessor: "claimStatus",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,
                                            },
                                        ]}
                                        defaultPageSize={4}
                                        showPaginationTop={false}
                                        pageSize={([this.state.data.length + 1] < 4) ? [this.state.data.length + 1] : 4}
                                        //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                        showPaginationBottom={true}
                                        className="-striped -highlight"
                                    />
                                </Animated>
                            </GridItem>
                            : <GridItem lg={12}>{
                                this.state.nodata ?
                                    <Card>
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
                    </Card>
                }
                {this.state.open && this.state.approved && this.state.renderpage  ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card >
                            <CardBody>
                                <GridContainer justify="center" lg={12}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <div className="banner">
                                            <label><TranslationContainer translationKey="PolicyNumber" /></label><h5>{this.state.PolicyNumber}</h5>
                                            <label><TranslationContainer translationKey="ClaimNumber" /></label><h5>{this.state.ClaimNumber}</h5>
                                        </div>
                                    </Animated>
                                </GridContainer>
                                {/*   <ClaimSearch TableData={this.state.TableData} handleClaimAmount={this.handleClaimAmount} ClaimDTO={this.state.ClaimDTO}
                                    fields={this.state.fields} claimamt={this.state.claimamt} ClaimAppAmount={this.ClaimAppAmount}
                                    ApprovedAmountData={this.state.ApprovedAmountData} disabled={this.state.disabled} claimId={this.state.fields.claimId}
                                    SetDecision={this.SetDecision} ClaimAmountdetailsdata={this.state.ClaimAmountdetailsdata} approved={this.state.approved}
                                    policyDetailsData={this.state.policyDetailsData} decision={this.state.decision} claimDetailsData={this.state.claimDetailsData}
                                    docDetailsData={this.state.docDetailsData} ValidationUI={this.state.ValidationUI} docdata={this.state.docdata}
                                    handleChange={this.handleChange} onInputParamChange={this.onInputParamChange} Datapic={this.state.Datapic}
                                    claimStatusIdState={this.state.claimStatusIdState} approvedClaimAmountState={this.state.approvedClaimAmountState}
                                    claimManagerRemarksState={this.state.claimManagerRemarksState} classes={this.classes} dmsdocId={this.state.fields.dmsdocId} docidfunc={this.docidfunc} documentName={this.state.fields.documentName}
                                    ClaimIntimationDetails={this.state.ClaimIntimationDetails} handledatechange={this.handledatechange} bytearr={this.state.bytearr}
                                    ClaimsDecisionData={this.state.ClaimsDecisionData} handleChange={this.handleChange} onFormSubmit={this.onFormSubmit}
                                    approved={this.state.approved} handleCheckbox={this.handleCheckbox} fields={this.state.fields} selectedcheckbox={this.state.selectedcheckbox}
                                    errormessage={this.state.errormessage} ValidationUI={this.state.ValidationUI} classes={this.classes} renderPage={this.renderPage} renderPage1={this.renderPage1}
                                    errorstatus={this.state.errorstatus} DecisionType={this.state.DecisionType} PayeeType={this.state.PayeeType} displaybank={this.state.displaybank} handleddlChange={this.handleddlChange}
                                    typeList={this.state.typeList} Bankfieldsmodel={this.state.Bankfieldsmodel} Payee={this.state.Payee} onModelChange={this.onModelChange} onDateChange={this.onDateChange}
                                    SetRiskClaimsDetailsValue={this.SetRiskClaimsDetailsValue} ProductClaimData={this.state.ProductClaimData} vehicleclaim={this.state.vehicleclaim} ClaimStatusData={this.state.ClaimStatusData}
                                    displaywork={this.state.displaywork} displaycust={this.state.displaycust} displayfinancier={this.state.displayfinancier} displaynominee={this.state.displaynominee} displaysurveyor={this.state.displaysurveyor}
                                    handleActivitylog={this.handleActivitylog} claimstatusflag={this.state.claimstatusflag} claimsremarksflag={this.state.claimsremarksflag}
                                    Bankarray={this.state.Bankarray} vehicleclaimstate={this.state.vehicleclaimstate} vehicleclaimdriver={this.state.vehicleclaimdriver} vehicleclaimsurvey={this.state.vehicleclaimsurvey}
                                    PerformerFlag={this.state.PerformerFlag} handlePerformerFun={this.handlePerformerFun}
                                />*/}
                                <div>
                                    <Card className="claimSearch">
                                        <CardBody>
                                            <Wizard id="proWiz"
                                                validate
                                                steps={[
                                                    { stepName: <TranslationContainer translationKey="PolicyDetails" />, stepComponent: PolicyDetails, stepId: "PolicyDetails", stepData: this },
                                                    { stepName: <TranslationContainer translationKey="DocumentDetails" />, stepComponent: DocDetails, stepId: "DocDetails", stepData: this },
                                                    { stepName: <TranslationContainer translationKey="ClaimDetails" />, stepComponent: ClaimDetails, stepId: "ClaimDetails", stepData: this },
                                                    // { stepName: "Payment Details", stepComponent: PaymentDetails, stepId: "PaymentDetails", stepData: props },	
                                                ]}
                                            //title=""	
                                            //subtitle=""	
                                            />
                                        </CardBody>
                                    </Card>
                                </div>
                            </CardBody>
                        </Card>
                    </Animated>
                    : null}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openpop}
                    onClose={this.handleClose}>
                    <div className={classes.paper} id="modal">
                        <h4><small className="center-text">View Document</small></h4>
                        <Button color="info"
                            round
                            className={classes.marginRight}
                            id="close-bnt"
                            onClick={this.handleClose}>
                            &times;
                        </Button>
                        <div id="disp">
                            {this.state.isimage ?
                                <PDFViewer
                                    document={{
                                        base64: this.state.bytearr,
                                    }}
                                />
                                : <img style={{ width: "40rem" }}
                                    src={
                                        this.state.docbyte = "data:image;base64," + this.state.bytearr
                                    }
                                />
                            }
                        </div>

                    </div>
                </Modal>


                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.popopen}
                    onClose={this.handleActivityClose}>

                    <div className={classes.paper} id="modal">
                        <h4><small className="center-text">Activity Log</small></h4>

                        <Button color="info"
                            round
                            className={classes.marginRight}
                            id="close-bnt"
                            onClick={this.handleActivityClose}>
                            &times;
                        </Button>

                        <div id="disp">
                            {(this.state.vehicleActivitydata.length > 0) ? this.state.vehicleActivitydata.map((item, i) => (
                                <GridContainer justify="center" >
                                    <GridItem xs={12}>

                                        <ReactTable
                                            title={<h5><TranslationContainer translationKey={"Vehicle Number:" + item.vehicleNumber} /></h5>}

                                            data={item.activityDTOs}
                                            filterable
                                            columns={this.state.TableDataList}
                                            defaultPageSize={4}
                                            pageSize={([item.activityDTOs.length + 1] < 4) ? [item.activityDTOs.length + 1] : 4}
                                            showPaginationTop={false}
                                            //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                            showPaginationBottom={true}
                                            className="-striped -highlight discription-tab"

                                        />

                                    </GridItem>

                                </GridContainer>
                            )) : null}
                        </div>

                    </div>
                </Modal>

            </div>
        );
    }
}

export default withStyles(styles)(ClaimProcess);
