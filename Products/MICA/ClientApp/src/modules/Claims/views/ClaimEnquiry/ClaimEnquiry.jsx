import Icon from "@material-ui/core/Icon";
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import FilterNone from "@material-ui/icons/FilterNone";
import claimenquiry from "assets/img/Claime-nquiry.png";
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
import ClaimSearch from "./_ClaimSearch.jsx";
import validationPage from "modules/Claims/views/ValidationPage.jsx";
import React from "react";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import swal from 'sweetalert';
import { Animated } from "react-animated-css";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Modal from '@material-ui/core/Modal';
import PDFViewer from 'pdf-viewer-reactjs';
import BankDetails from "../ClaimIntimate/BankDetails";

import CustomDateTimePicker from "components/CustomDateTimePicker/DateTimePicker.jsx";

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

class ClaimEnquiry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleclaim: false,
            vehicleclaimstate: false,
            vehicleclaimdriver: false,
            vehicleclaimsurvey: false,
            performerflag: false,
            showCust: false,
            showbankdetails: false,
            isimage: false,
            openpop: false,
            bytearr: [],
            docbyte: [],
            base64: [],
            disappear: true,
            pageloader: false,
            nodata: false,
            loader: true,
            approved: false,
            decisions: false,
            encodedData: "",
            selectedimage: [],
            policyId: 0,
            disabled: true,
            count: 0,
            react: false,
            SetDecision: "",
            orgid: "",
            open: false,
            decision: false,
            officeId: "",
            docdata: [],
            Claimlist: [],
            officelist: [],
            Claimsendlist: [],
            officesendlist: [],
            PolicyDetails: [],
            ClaimDetails: [],
            ClaimsDecisionData: [],
            claimsdecisionshow: false,
            Claimdetailsdata: [],

            ClaimDataDTO: [],
            claimId: 0,
            documentName: "",
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
            claimStatusIdState: false,
            claimStatusId: "",
            approvedClaimAmountState: "",
            approvedClaimAmount: "",
            claimManagerRemarksState: "",
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
            //disabled: false,
            file: null,
            dropFlag: false,
            status: "",
            AccountTypedata: [],
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
                lossDateTime: null,
                claimId: "",
                claimStatusId: "",
                insuredMobileNo: "",
                insuredEmail: "",

            },

            Datapic: [
                {
                    document: "",
                    documentType: ""
                }
            ],

            email: "",
            BankArray: [],
            CustArray: [],
            fields: {
                claimStatusId: "",
                approvedClaimAmount: "",
                claimManagerRemarks: "",
                claimNumber: "",
                benefitAmount: "",
                claimId: 0,
                emailId: "",
                policyNo: "",
                insuredName: "",

            },
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
            ClaimSearchReset: {
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
            BankDetails: [],
            BankCustDetails: [],
            claimDetailsData: {
                "lossDate": "",
                "locationOfEvent": "",
                "lossDescription": "",
                "vehicleLocation": "",
                "vehicleLocationState": "",
                "driverName": "",
                "selfSurvey": "",
                "performer": "",
                "claimManagerRemarks": "",
                "totalClaimedAmount": "",
                "claimStatus": "",
                "totalApprovedAmount": "",
                "accountHolderName": "",
                "accountNumber": "",
                "bankName": "",
                "ifscCode": "",
                "bankAddress": ""
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
            vehicleActivity: {
                "policyNumber": "",
                "vehicleNumbers": [],
            },
            popopen: false,
            vehicleActivitydata: [],
            TableDataList: [],
            claimTableData: [],
            paymentDetailsData: [],
            docDetailsData: [],
            DocumentData: [],
        };
        this.dataTable = this.dataTable.bind(this);
        this.SetValue = this.SetValue.bind(this);
        this.onInputParamChange = this.onInputParamChange.bind(this);
        this.SetDecision = this.SetDecision.bind(this);
    }

    handleClose = () => {
        this.setState({ openpop: false });
    };

    SetValue = (type, event) => {

        let name = event.target.name;
        let value = event.target.value;
        let ClaimDTO = this.state.ClaimDTO;
        ClaimDTO[name] = value;
        this.setState({ ClaimDTO });
        this.change(event, name, type);

        console.log("claimNumber ", this.state.ClaimDTO);

    };

    onFormSubmit = (evt) => {


        this.setState({ claimsdecisionshow: true });

        console.log("submit", this.state.fields);
        let field = this.state.fields;
        field.emailId = this.state.email;
        this.setState({ field });
        console.log("fields: ", field);
        console.log("submit JSON", JSON.stringify(this.state.fields));
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/ClaimProcess`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(field)
        }).then(function (response) {
            if (response.status == 200) {
                swal({
                    text: "Claim Processed Successfully!",
                    icon: "success"
                });
            } else {
                swal({
                    text: "Some error occured please try again later",
                    icon: "error"
                });
            }
            return response.json();
        })
            .then(data => {
                console.log("response: ", data)
                //if (data.status == 2) {
                //       swal("Perfect!", "SucessFully Save!", "success");
                //    swal({
                //        //let res = partnerId.toString();
                //        text: data.responseMessage,
                //        icon: "success"
                //    });
                //} else if (data.status == 8) {
                //     swal("Failed!", "error!", "error");
                //    swal({
                //        //let res = partnerId.toString();
                //        text: data.errors[0].errorMessage,
                //        icon: "error"
                //    });
                //}
            });


    };

    onInputParamChange = (type, evt) => {
        console.log('Event', evt);
        let fields = this.state.fields;
        let name = evt.target.name;
        let value = evt.target.value;
        fields[name] = value;
        console.log("fields", fields);
        this.setState({ fields });
        this.change(evt, name, type);
    };

    editFunction(id, oid) {
        console.log("pid", oid);
        console.log("officelist data", this.state.Claimlist);
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
        this.setState({ fields });
        this.setState({ policyId: ClaimArr[0].policyId });
        console.log("Claimsendlist: ", this.state.Claimsendlist);
        this.handleBankdetails(oid);
        this.policyDetailsfun(ClaimArr[0].policyNo);
        this.claimDetailsfun(ClaimArr[0].claimId);
        this.documentView(oid, false, true);
        this.state.PolicyNumber = ClaimArr[0].policyNo;
        this.state.ClaimNumber = ClaimArr[0].claimNumber;
        this.setState({ open: true });
        this.claimAmountTable();

        if (ClaimArr[0].claimStatus == "Claim Intimation") {
            this.setState({ showCust: true });
        } else {
            this.setState({ showCust: false });
        }

        if (ClaimArr[0].claimStatus == "Claim Settled") {
            this.setState({ showbankdetails: true });
        } else if (ClaimArr[0].claimStatus == "Claim Under Process") {
            this.setState({ showbankdetails: true });
        } else if (ClaimArr[0].claimStatus == "Vehicle Inspection") {
            this.setState({ showbankdetails: true });
        } else if (ClaimArr[0].claimStatus == "Under Repair") {
            this.setState({ showbankdetails: true });
        } else if (ClaimArr[0].claimStatus == "Documents Awaited") {
            this.setState({ showbankdetails: true });
        } else {
            this.setState({ showbankdetails: false });
        }

    }

    componentDidMount() {

        let claimdecision = "Claim Decision";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + claimdecision + ``, {
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

        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
    }

    onDateChange = (formate, type, name, event) => {
        const { validdate } = this.state;
        this.setState({ validdate: false });
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        //var dd = today.getDate();
        //var mm = today.getMonth() + 1;
        //if (mm < 10) {
        //    mm = '0' + mm;

        //}
        //if (dd < 10) {
        //    dd = '0' + dd;
        //}

        //var date = dd + '/' + mm + '/' + today.getFullYear();
        const ClaimDataDTO = this.state.ClaimDTO;
        ClaimDataDTO[name] = date;
        this.setState({ ClaimDataDTO });

        this.change(event, name, formate, date, type);

    };
    handleDateChange = (e, name) => {
        const { validdate } = this.state;
        this.setState({ validdate: false });
        var today = e.toDate();

        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
        const ClaimDataDTO = this.state.ClaimDTO;
        ClaimDataDTO[name] = date;
        this.setState({ ClaimDataDTO });


        console.log("Datetimepicker", this.state.ClaimDTO)
    }
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    tableshow = () => {

        console.log("ClaimDTO", this.state.ClaimDTO);
        console.log("ClaimSearchDTO", this.state.ClaimSearchDTO);
        console.log("1234567", this.state.fields.claimId);
        const Cdate = this.state.ClaimDTO.eventDate;

        if (this.state.ClaimDTO.eventDate != "") {
            this.state.ClaimDTO.eventDate = this.datechange(this.state.ClaimDTO.eventDate);
        }
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

            that.claimAmountTable(data);
        });

        this.state.ClaimDTO.eventDate = Cdate;
    };

    setstatus = (type, event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    dataTable = (officelist) => {
        console.log("officelist in react", officelist);
        this.setState({ loader: true, showtable: true });
        this.setState({
            data: officelist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {

                    insuredName: prop.insuredName,
                    policyNo: prop.policyNo,
                    claimNumber: prop.claimNumber,
                    typeOfLoss: prop.typeOfLoss,
                    lossDateTime: new Date(prop.lossDateTime).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    createdDate: new Date(prop.createdDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    claimStatus: prop.claimStatus,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.claimId)} />

                };

            })
        });


    }

    claimAmountTable = () => {

        let arr = this.state.claimTableData.map((prop, key) => {
            return prop.coverDynamic.filter(c => c.Header == "Vehicle Number")[0].Details;

        });
        this.state.vehicleActivity.vehicleNumbers = Array.from(new Set(arr));
        this.state.vehicleActivity.policyNumber = this.state.PolicyNumber;
        console.log("TableData#007", this.state.claimTableData, this.state.vehicleActivity.vehicleNumbers);
        console.log("this.state.claimTableData", this.state.claimTableData);
        this.setState({
            TableData: this.state.claimTableData.map((prop, key) => {

                return {
                    insurableitemId: key + 1,
                    insurableItem: prop.insurableItem,
                    //name: prop.name,
                    identificationNo: prop.identificationNo,
                    typeOfLoss: prop.coverName,
                    coverValue: prop.coverDynamic.map((c) => {
                        return (<p className="gridparagraph"> {c.Header} : {c.Details} </p>)
                    }),
                    claimAmounts: prop.claimAmounts,
                    approvedClaimAmounts: prop.approvedClaimAmounts

                };
            })
        });

    }

    docTable = (DocumentData) => {

        console.log("@@@@", this.state.DocumentData)
        this.setState({
            docdata: this.state.DocumentData.map((prop, key) => {
                console.log("coming", this.state.docdata);
                const { classes } = this.props;

                return {
                    id: key + 1,
                    documentName: prop.documentView,
                    documentType: prop.documentType,
                    documentView: <a onClick={() => this.documentLinkView(prop.dmsdocId)}> {prop.documentName} </a>
                };
            })
        });
        console.log("docdata", this.state.docdata);
    }

    renderBankDetails = (item) => {
        return (
            <GridContainer>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Account Holder Name"
                        //  required={true}
                        disabled={true}
                        //name={item.accountHolderName}
                        value={item.accountHolderName}
                        //value={Bankfieldsmodel.Value}
                        //onChange={(e) => this.onModelChange(e, name)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Account No."
                        //  required={true}
                        disabled={true}
                        //name={item.accountHolderName}
                        value={item.accountNumber}
                        //value={Bankfieldsmodel.Value}
                        //onChange={(e) => this.onModelChange(e, name)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <MasterDropdown
                        // required={true}
                        labelText="Account Type"
                        // id="Type"
                        disabled={true}
                        lstObject={this.state.AccountTypedata}
                        filterName='Account Type'
                        value={item.accountType}
                        //name={Bankfieldsmodel.Name}
                        //onChange={(e) => this.onModelChange(e, name)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Bank Name"
                        //  required={true}
                        disabled={true}
                        //name={item.accountHolderName}
                        value={item.bankName}
                        //value={Bankfieldsmodel.Value}
                        //onChange={(e) => this.onModelChange(e, name)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="IFSC Code"
                        //  required={true}
                        disabled={true}
                        //name={item.accountHolderName}
                        value={item.ifsccode}
                        //value={Bankfieldsmodel.Value}
                        //onChange={(e) => this.onModelChange(e, name)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Bank Branch Address"
                        //  required={true}
                        disabled={true}
                        //name={item.accountHolderName}
                        value={item.bankBranchAddress}
                        //value={Bankfieldsmodel.Value}
                        //onChange={(e) => this.onModelChange(e, name)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Amount Paid"
                        //  required={true}
                        disabled={true}
                        //name={item.accountHolderName}
                        value={item.amountPaid}
                        //value={Bankfieldsmodel.Value}
                        //onChange={(e) => this.onModelChange(e, name)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Date Of Payment"
                        //  required={true}
                        disabled={true}
                        //name={item.accountHolderName}
                        value={new Date(item.dataOfPayment).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        //value={Bankfieldsmodel.Value}
                        //onChange={(e) => this.onModelChange(e, name)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
            </GridContainer>
        );
    }

    renderCustomerDetails = (item) => {
        return (
            <GridContainer>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Account Holder Name"
                        disabled={true}
                        value={item.accountHolderName}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Account No."
                        disabled={true}
                        value={item.accountNumber}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <MasterDropdown
                        labelText="Account Type"
                        disabled={true}
                        lstObject={this.state.AccountTypedata}
                        filterName='Account Type'
                        value={item.accountType}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Bank Name"
                        disabled={true}
                        value={item.bankName}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="IFSC Code"
                        disabled={true}
                        value={item.ifsccode}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        labelText="Bank Branch Address"
                        disabled={true}
                        value={item.bankBranchAddress}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
               
            </GridContainer>
        );
    }

    Editopen = () => {
        //this.setState({ disabled: false });
        this.setState({ open: true });
        console.log("officesendlist: ", this.state.officesendlist);

    }

    handleBankdetails = (id) => {
        let that = this;
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchClaimBankDetails?claimid=` + id + ``, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Response data', data);

            that.setState({ BankCustDetails: data });
            console.log('Response bank data', that.state.BankCustDetails);
            let custarray = that.state.CustArray;
            console.log("Cust Array: ", that.state.BankCustDetails)
            var BankCustelement = {};
            console.log("Customer Array: ", that.state.BankCustDetails);
            BankCustelement.name = that.state.BankCustDetails.payeeType;
            that.state.BankCustDetails.dataOfPayment = null;
            that.setState({});
            let customerarray = [];
            customerarray.push(that.state.BankCustDetails)
            BankCustelement.BankCustDetails = customerarray;
            custarray.push(BankCustelement);
            that.setState({ custarray });
            console.log("custarray", custarray);

        });


    }

    claimDetailsfun = (id) => {

        console.log("this.state.claimId", this.state.claimId);
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchClaimEnquiry?ClaimId=` + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("claimDetailsfndata", data);

                this.setState({ claimTableData: data[1], BankDetails: data[2] });
                console.log("Bank Array: ", this.state.BankDetails)
                this.claimAmountTable(this.state.claimTableData);

                this.state.claimDetailsData.lossDate = new Date(data[0][0][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                this.state.claimDetailsData.locationOfEvent = data[0][1][1];
                this.state.claimDetailsData.lossDescription = data[0][2][1];
                this.state.claimDetailsData.totalClaimedAmount = data[0][3][1];
                this.state.claimDetailsData.totalApprovedAmount = data[0][4][1];
                this.state.claimDetailsData.claimStatus = data[0][5][1];
                this.state.claimDetailsData.claimManagerRemarks = data[0][6][1];

                let bankarray = this.state.BankArray;
                if (this.state.BankDetails.length > 0) {
                    console.log("Bank Array: ", this.state.BankDetails)
                    for (var i = 0; i < this.state.BankDetails.length; i++) {
                        var Bankelement = {};
                        console.log("Bank Array: ", this.state.BankDetails[i]);
                        Bankelement.name = this.state.BankDetails[i].payeeType;
                        let array = [];
                        array.push(this.state.BankDetails[i])
                        Bankelement.BankDetails = array;
                        bankarray.push(Bankelement);
                    }
                }
                this.setState({ bankarray });
                console.log("Bank Array: ", bankarray)


                if (data[0][7][1] != null && data[0][7][1].length > 0) {
                    this.state.claimDetailsData.vehicleLocation = data[0][7][1];
                    this.setState({ vehicleclaim: true });
                }
                else {
                    this.setState({ vehicleclaim: false });
                }
                if (data[0][8][1] != null && data[0][8][1].length > 0) {
                    this.state.claimDetailsData.vehicleLocationState = data[0][8][1];
                    this.setState({ vehicleclaimstate: true });
                }
                else {
                    this.setState({ vehicleclaimstate: false });
                }

                if (data[0][9][1] != null && data[0][9][1].length > 0) {
                    this.state.claimDetailsData.driverName = data[0][9][1];
                    this.setState({ vehicleclaimdriver: true });
                }
                else {
                    this.setState({ vehicleclaimdriver: false });
                }
                if (data[0][10][1] != null && data[0][10][1].length > 0) {
                    this.state.claimDetailsData.selfSurvey = data[0][10][1];
                    this.setState({ vehicleclaimsurvey: true });
                }
                else {
                    this.setState({ vehicleclaimsurvey: false });
                }
                if (data[0][11][1] != null && data[0][11][1].length > 0) {
                    this.state.claimDetailsData.performer = data[0][11][1];
                    this.setState({ performerflag: true });
                }
                else {
                    this.setState({ performerflag: false });
                }
                console.log("insurablegrid vaalue", this.state.claimTableData);
            });
    }

    policyDetailsfun = (policyNo) => {
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

                this.state.policyDetailsData.customerId = data[0][1];
                this.state.policyDetailsData.coverNoteNo = data[1][1];
                this.state.policyDetailsData.mobileNumber = data[2][1];
                this.state.policyDetailsData.email = data[3][1];
                this.state.policyDetailsData.sDate = new Date(data[6][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                this.state.policyDetailsData.eDate = new Date(data[7][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                this.state.policyDetailsData.totalSumInsured = data[8][1];
                this.state.policyDetailsData.balanceSumInsured = data[9][1];


            });
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
                if (data.length > 0) {
                    this.setState({ docDetailsData: data });


                    const doc = this.state.Datapic[0];

                    doc.document = data[0].document;

                    this.setState({ doc });

                    for (let i = 0; i < this.state.docDetailsData.length; i++) {
                        if (this.state.docDetailsData[i].dmsdocId != null) {
                            this.state.DocumentData.push(this.state.docDetailsData[i]);
                            this.docTable(this.state.DocumentData);
                        }
                    }
                }
            });
    }

    documentLinkView = (dmsdocId) => {
        console.log("1234567", dmsdocId);
        //fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/DocumentView?ClaimId=` + oid + `&isDoc=` + isDoc, {

        fetch("https://inubeservicesnotification.azurewebsites.net/api/DMS/DownloadView?id=" + dmsdocId, {

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


                this.setState({ openpop: true });
            });

    }

    uint8ToImageData = (uint8, width, height) => {

        let iData = this.context.createImageData(width, height);

        for (let i = 0; i < uint8.length; i++) {

            iData.data[i] = uint8[i];

        }

        return iData;

    }

    SetDecision(setValue) {

        this.setState({ decision: setValue });
        console.log("data", setValue);
    }

    handleDisappear = () => {
        this.setState({ disappear: false });
        console.log("disapper:", this.state.disappear);
        this.setState({});
        this.refreshData();
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    refreshData = () => {
        const Claimsearchdata = this.state.ClaimSearchReset;
        console.log("claimdata123124", Claimsearchdata);
        this.state.ClaimDTO = Claimsearchdata;
        this.setState({ Claimsearchdata });
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

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?

                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">

                                <Icon><img src={claimenquiry} /></Icon>

                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small><TranslationContainer translationKey="ClaimEnquiry" /></small>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={4} md={3}> <CustomInput
                                    //success={this.state.policyNoState === "success"}
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
                                {/*<GridItem xs={12} sm={4} md={3}> <CustomInput
                                //success={this.state.insuredreferencestate === "success"}
                                error={this.state.insuredreferencestate}
                                labeltext="insuredreferenceno"
                                name="insuredreference"
                                value={this.state.claimdto.insuredreference}
                                onchange={(e) => this.setvalue("insuredreference", e)}
                                formcontrolprops={{
                                    fullwidth: true
                                }}
                            />
                            </griditem>*/}

                                <GridItem xs={12} sm={4} md={3}> <CustomInput
                                    // success={this.state.insuredMobileNoState === "success"}
                                    error={this.state.insuredMobileNoState}
                                    labelText="InsuredMobileNo"
                                    name="insuredMobileNo"
                                    inputType="number" type="numeric"
                                    value={this.state.ClaimDTO.insuredMobileNo}
                                    onChange={(e) => this.SetValue("insuredMobileNo", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                                {/*<GridItem xs={12} sm={4} md={3}> <CustomInput
                               // success={this.state.insuredEmailState === "success"}
                                error={this.state.insuredEmailState}
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
                                    // success={this.state.claimNumberState === "success"}
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
                                    {/*  <CustomDatetime
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
                                        */}

                                    <CustomDateTimePicker timeformate={false} disabled={false} width='13rem' required={true} labelText="Loss Date" name='lossDateTime' value={this.state.ClaimDTO.lossDateTime} onChange={(e) => this.handleDateChange(e, "lossDateTime")} />

                                </GridItem>


                                <GridItem xs={12} sm={4} md={3}>

                                    <MasterDropdown
                                        // succes={this.state.claimStatusIdState === "success"}
                                        error={this.state.claimStatusIdState}
                                        labelText="ClaimStatus"
                                        id="ddlstatus"
                                        lstObject={this.state.ClaimsDecisionData}
                                        filterName='Claim Status'
                                        value={this.state.ClaimDTO.claimStatusId}
                                        name='claimStatusId'
                                        onChange={(e) => this.SetValue("claimStatusId", e)}
                                        formControlProps={{ fullWidth: true }}
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
                {this.state.disappear ?
                    <div>
                        {this.state.loader ?
                            <GridContainer xl={12}>
                                {this.state.showtable ?
                                    <GridItem xs={12}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <ReactTable
                                                title={<h5><TranslationContainer translationKey="Claimenquiry" /></h5>}
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
                                                        Header: "ClaimStatus",
                                                        accessor: "claimStatus",
                                                        headerClassName: 'react-table-center',
                                                        setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                        // width: '50'
                                                        minWidth: 40,
                                                        resizable: false,
                                                    },
                                                    //{
                                                    //    Header: "CoverEvent",
                                                    //    accessor: "coverEvent",
                                                    //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    //    headerClassName: 'react-table-center',
                                                    //    minWidth: 40,
                                                    //    resizable: false,
                                                    //},
                                                    {
                                                        Header: "IntimationDate",
                                                        accessor: "createdDate",
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
                                                ]}
                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                                pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
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

                        {this.state.open ?
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <Card>
                                    <CardBody>
                                        <GridContainer justify="center" lg={12}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <div className="banner">
                                                    <label><TranslationContainer translationKey="PolicyNumber" /></label>&nbsp;<h5>{this.state.PolicyNumber}</h5>
                                                    <label><TranslationContainer translationKey="ClaimNumber" /></label>&nbsp;<h5>{this.state.ClaimNumber}</h5>

                                                </div>

                                            </Animated>
                                        </GridContainer>

                                        <ClaimSearch TableData={this.state.TableData} CustArray={this.state.CustArray} showCust={this.state.showCust} showbankdetails={this.state.showbankdetails} BankArray={this.state.BankArray} renderBankDetails={this.renderBankDetails} renderCustomerDetails={this.renderCustomerDetails} handleDisappear={this.handleDisappear} refreshData={this.refreshData} ClaimAmountSum={this.ClaimAmountSum} ClaimDTO={this.state.ClaimDTO} fields={this.state.fields} claimamt={this.state.claimamt} ClaimAppAmount={this.ClaimAppAmount} disabled={this.state.disabled} claimId={this.state.claimId} SetDecision={this.SetDecision} ClaimAmountdetailsdata={this.state.ClaimAmountdetailsdata} policyDetailsData={this.state.policyDetailsData} decision={this.state.decision} claimDetailsData={this.state.claimDetailsData}
                                            docDetailsData={this.state.docDetailsData} docdata={this.state.docdata} Datapic={this.state.Datapic} handleChange={this.handleChange} onInputParamChange={this.onInputParamChange} claimStatusIdState={this.state.claimStatusIdState} approvedClaimAmountState={this.state.approvedClaimAmountState} claimManagerRemarksState={this.state.claimManagerRemarksState} classes={this.classes} ClaimIntimationDetails={this.state.ClaimIntimationDetails} vehicleclaim={this.state.vehicleclaim} vehicleclaimstate={this.state.vehicleclaimstate} vehicleclaimdriver={this.state.vehicleclaimdriver} vehicleclaimsurvey={this.state.vehicleclaimsurvey} performerflag={this.state.performerflag} handleActivitylog={this.handleActivitylog} />

                                    </CardBody>
                                </Card>
                            </Animated>
                            : null}



                    </div>
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

export default withStyles(styles)(ClaimEnquiry);