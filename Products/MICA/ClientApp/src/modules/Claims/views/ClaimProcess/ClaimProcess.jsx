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
import ClaimsDecision from "./ClaimsDecision.jsx";
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
            prodId: "",
            vehicleclaim: false,
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
            
            ClaimDataDTO: [],
            ClaimAmountdetailsdata: [],
            ClaimStatusData: [],
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
                DataModelDTO: {},
            },

            docs: {
                documentID: "",
                fileName: "",
                documentType: "",
            },

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
            BankDetails: {},
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
                "driverName": "",
                "selfSurvey": "",
                "totalClaimedAmount": "",
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
            //mIsRequired: false,
            ProductClaimData: [],
            claimTableData: [],
            paymentDetailsData: [],
            DataAmount: [],
            docDetailsData: [],
            DocumentData: [],
            PayeeTypedata: [],
            StatusType: [],
            DecisionType: [],
            AccountTypedata: [],
            ActivityData: []
        };
        this.dataTable = this.dataTable.bind(this);
        this.SetValue = this.SetValue.bind(this);
        this.onInputParamChange = this.onInputParamChange.bind(this);
        this.SetDecision = this.SetDecision.bind(this);
    }

    handleClose = () => {
        this.setState({ openpop: false });
        
    };

    handleActivityClose = () => {
        this.setState({ popopen: false });
    };
    SetValue = (type, event) => {

        let name = event.target.name;
        let value = event.target.value;
        let ClaimDTO = this.state.ClaimDTO;
        ClaimDTO[name] = value;
        this.setState({ ClaimDTO });
        this.change(event, name, type);
    };

    onFormSubmit = (evt) => {

        this.state.ValidationUI = true;
        // evt.preventDefault();
        this.IsValidProductDetails();
        if (this.state.ValidationUI === true) {

            this.setState({ claimsdecisionshow: true });

            let field = this.state.fields;
            field.emailId = this.state.email;
            this.setState({ field });

            let detailsdto = this.state.fields;


            for (var i = 0; i < this.state.claimTableData.length; i++) {
               // if (this.state.claimTableData[i].approvedClaimAmounts != null) {
                    this.state.DataAmount.push(this.state.claimTableData[i]);
               // }
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
                    //if (data.status == 200) {
                    this.state.claimId = data.claimId;
                    this.setState({ claimnumber: data.claimNumber });
                    swal({
                        text: "Claim Processed successfully! \n Your Claim Number: " + this.state.claimnumber,
                        icon: "success"
                    });

                    this.renderRedirect();
                });
        } else {
            this.setState({ errormessage: true });
            swal("", "Some fields are missing", "error");
        }

    };

    IsValidProductDetails = () => {
        if (this.state.fields.claimStatusId !== "" && this.state.fields.claimManagerRemarks !== "") {
        } else {
            this.state.ValidationUI = false; this.state.errormessage = true;
            this.setState({});
        }
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

        if (currentNode.mIsRequired === true) {
            this.setState({ displaybank: true });

        } else {
            this.setState({ displaybank: false });
        }


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
            that.setState({ BankDetails: data });
            console.log('BankDetails data', that.state.BankDetails);
        });
    }

    editFunction(id, oid) {

        var CArr = this.state.Claimlist;
        var ClaimArr = [];
        $.each(CArr, function (k, v) {
            if (v.claimId == oid) {
                ClaimArr.push(CArr[id]);
            }
        })
        this.setState({ Claimsendlist: ClaimArr });
        this.state.claimid = ClaimArr[0].claimId;

        this.state.prodId = ClaimArr[0].productIdPk;

        const Claimdata = ClaimArr[0].claimId;
        this.setState({ claimid: oid });
        this.setState({ claimId: Claimdata });
        const fields = this.state.fields;
        fields.claimNumber = ClaimArr[0].claimNumber;
        fields.claimId = ClaimArr[0].claimId;

        // fields.claimStatusId = ClaimArr[0].claimStatusId;


        this.setState({ fields });
        this.setState({ policyId: ClaimArr[0].policyId });

        this.policyDetailsfun(ClaimArr[0].policyNo);

        this.claimDetailsfun(ClaimArr[0].claimId);
        this.claimAmountTable();
        this.documentView(oid, false , true);

        // this.paymentDetailsfun(ClaimArr[0].claimId);
        this.state.PolicyNumber = ClaimArr[0].policyNo;
        //this.state.vehicleActivity.policyNumber = ClaimArr[0].policyNo;
        this.state.ClaimNumber = ClaimArr[0].claimNumber;
        this.setState({ open: true });

        if (ClaimArr[0].claimStatus == "Approved" || ClaimArr[0].claimStatus == "Rejected") {
            this.setState({ approved: false });
        }
        //else if (this.state.decision == false) {
        //    this.setState({ approved: false });
        //}
        else {
            this.setState({ approved: true });

        }
       
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

        this.onGet();
        this.handleBankdetails(oid);
    }

    componentDidMount() {

        let claimdecision = "Claims Decision";
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

                const statusdata = this.state.ClaimsDecisionData[0].mdata;
                const status1 = statusdata.filter(i => i.mID === 16);
                const status2 = statusdata.filter(i => i.mID === 17);
                this.state.StatusType.push(status1[0], status2[0]);


                // state.concat(this.state.ClaimsDecisionData[0].mdata[3]);

                this.setState({});

                const decisiondata = this.state.ClaimsDecisionData[0].mdata;
                const decision1 = decisiondata.filter(x => x.mID === 9);
                const decision2 = decisiondata.filter(x => x.mID === 11);
                const decision3 = decisiondata.filter(x => x.mID === 17);
                this.state.DecisionType.push(decision1[0], decision2[0], decision3[0]);
                this.setState({});
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

            });

        let Claimstatus = "Claim Decision";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + Claimstatus + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ ClaimStatusData: data });

            });


        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );

        this.setState({ Bankfieldsmodel: BankdetailsFields });

    }

    onModelChange = (evt) => {
        let DataModelDTO = this.state.fields.DataModelDTO;
        DataModelDTO[evt.target.name] = evt.target.value;
        this.setState({ DataModelDTO });
    };

    renderPage = (Bankfieldsmodel) => {


        if (Bankfieldsmodel.UIControl == "TextField") {

            return (<CustomInput
                labelText={Bankfieldsmodel.Name}
                //  required={true}
                name={Bankfieldsmodel.Name}
                onChange={(e) => this.onModelChange(e)}
                formControlProps={{ fullWidth: true }}
            />

            );


        }
        else if (Bankfieldsmodel.UIControl == "Datetime") {

            return (
                <CustomDatetime
                    labelText={Bankfieldsmodel.Name}
                    // id='dob'
                    name={Bankfieldsmodel.Name}
                    // Futuredatevalidate={true}
                    //required={true}
                    onChange={(event) => this.onDateChange('datetime', "Bankfieldsmodel", Bankfieldsmodel.Name, event)}
                    value={Bankfieldsmodel.Name}
                    formControlProps={{ fullWidth: true }} />

            );


        }

        else if (Bankfieldsmodel.UIControl == "Dropdown") {

            return (
                <MasterDropdown
                    // required={true}
                    labelText={Bankfieldsmodel.Name}
                    // id="Type"
                    lstObject={this.state.AccountTypedata}
                    filterName='Account Type'
                    // value={this.state.selectedType}
                    name={Bankfieldsmodel.Name}
                    onChange={(e) => this.onModelChange(e)}
                    formControlProps={{ fullWidth: true }}
                />

            );


        }

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

        const DataModelDTO = this.state.fields.DataModelDTO;
        DataModelDTO[name] = date;
        this.setState({ DataModelDTO });

        this.change(event, name, formate, date, type);

    };

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

            // that.claimAmountTable(data);


        });


        this.state.ClaimDTO.eventDate = Cdate;

    };

    setstatus = (type, event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    dataTable = (officelist) => {
        this.setState({ loader: true, showtable: true });
        this.setState({
            data: officelist.map((prop, key) => {
                const { classes } = this.props;
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
                    documentName: <a onClick={() => this.documentLinkView(prop.dmsdocId)}> {prop.documentName} </a>,
                    
                };

            })
        });

    }

    claimAmountTable = () => {

        this.setState({
            TableData: this.state.claimTableData.map((prop, key) => {

                return {
                    id: key + 1,
                    insurableItem: prop.insurableItem,
                    name: prop.name,
                    identificationNo: prop.identificationNo,
                    typeOfLoss: prop.coverName,
                    //coverValue: prop.coverValue,
                    coverValue: prop.coverDynamic.map((c) => {
                        return (<h6> <b>{c.Header}</b> : {c.Details} </ h6>)
                    }),
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
                            {/* {this.state.errormessage && (this.state.claimTableData[key].approvedClaimAmounts) ? <p className="error" >*Enter Claim Amount </p> : null}
                            {(this.state.claimTableData[key].approvedClaimAmounts > this.state.claimTableData[key].claimAmounts) ? <p className="error">*Approved Amount should not be greater than Claim Amount</p> : null}*/}
                        </GridItem>
                };
            })
        });

    }

    //handleClose = () => {
    //    this.setState({ open: false });

    //};

    Editopen = () => {
        this.setState({ disabled: false });
        this.setState({ open: true });

    }

    claimDetailsfun = (id) => {


        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchClaimDetails?ClaimId=` + this.state.claimid, {

            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                // this.setState({ claimDetailsData: data[0] });
                this.state.claimDetailsData.lossDate = new Date(data[0][0][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                this.state.claimDetailsData.locationOfEvent = data[0][1][1];
                this.state.claimDetailsData.lossDescription = data[0][2][1];
                this.state.claimDetailsData.totalClaimedAmount = data[0][3][1];

                if (data[0][4][1].length != 0 && data[0][5][1].length != 0 && data[0][6][1].length != 0) {

                    this.state.claimDetailsData.vehicleLocation = data[0][4][1];
                    this.state.claimDetailsData.driverName = data[0][5][1];
                    this.state.claimDetailsData.selfSurvey = data[0][6][1];

                    this.setState({ vehicleclaim: true });
                }
               

                this.setState({ claimTableData: data[1] });

                //console.log("claimTableData", this.state.claimTableData, "fsdfdsg", this.state.claimTableData[0].coverDynamic[2].Details);

                //this.state.vehicleActivity.vehicleNumbers = this.state.claimTableData[0].coverDynamic[2].Details;
                //this.setState({})

                //console.log("acticityvehicle", this.state.vehicleActivity.vehicleNumbers);

                this.claimAmountTable(this.state.claimTableData);

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
                // this.setState({ policyDetailsData: data });
               
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

                
                    const doc = this.state.Datapic[0];

                    doc.document = data[0].document;

                    this.setState({ doc });
               
                for (let i = 0; i < this.state.docDetailsData.length; i++) {
                    if (this.state.docDetailsData[i].dmsdocId != null) {
                        this.state.DocumentData.push(this.state.docDetailsData[i]);
                        this.docTable(this.state.DocumentData);
                    }
                }
            });
    }

    documentLinkView = (dmsdocId) => {
        let that = this;
       
        fetch("https://inubeservicesnotification.azurewebsites.net/api/DMS/DownloadView?id=" + dmsdocId, {

            method: 'get',

            headers: {

                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },

        }).then(response => response.json())

            .then(data => {
               
                that.setState({ bytearr: data.data });
            
                if (data.contentType == "pdf") {
                    that.setState({ isimage: true });
                }
                else {
                    that.setState({ isimage: false });
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
        this.setState({});
        console.log("ClaimIntimationDetails claimAmount ", this.state.fields.approvedClaimAmount);
        this.claimAmountTable();

        if (this.state.claimTableData[index].approvedClaimAmounts > this.state.claimTableData[index].claimAmounts) {

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

    }
    renderRedirect = () => {
        const Claimdata = this.state.ClaimResetData;
        this.state.fields = Claimdata;
        this.setState({ Claimdata });

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

                this.setState({ ProductClaimData: data });


            });
    }

    handleCheckbox = (event, name) => {

        let ProductClaimData = this.state.ProductClaimData;
        //let name = event.target.name;
        let check = event.target.checked;

        if (event.target.checked == "undefined") {
        } else {
            const index = this.state.ProductClaimData.findIndex(item => item.inputType === name);
            if (index != -1) {


                let data = [...this.state.ProductClaimData];
                data[index].mIsRequired = event.target.checked;

                let searchname = "";
                if (name == "Workshop") {
                    searchname = "Customer";
                    this.state.displaybank = true;
                    this.setState({});

                } else {
                    searchname = "Workshop";
                    this.state.displaybank = true;
                    this.setState({});
                }

                //if (event.target.checked == true) {
                //    this.state.fields.payeeTypeId = data[index].mID;
                //    this.setState({});


                //}


                const key = this.state.ProductClaimData.findIndex(item => item.inputType === searchname);
                if (key != -1) {
                    data[key].disable = true;

                    if (event.target.checked == false) {
                        data[key].disable = false;
                        //this.state.displaybank = false;
                        //this.setState({});
                    }
                }
                this.setState({ data });

            }

            //if (event.target.checked === true) {
            //    this.state.displaybank = true;
            //    this.setState({});
            //}
            //else {
            //   this.state.displaybank = false;
            //    this.setState({});
            //}

            //debugger;
            //var eventname = document.getElementsByName(event.target.name); 
            //for (var i = 0; i < eventname.length; i++) {
            //    if (!eventname[i].mIsRequired==true) {
            //        eventname[i].disable = true;
            //    } else {
            //        eventname[i].disable = false;
            //    }
            //} 

        }
        //ProductClaimData[name] = check;
        //this.setState({ ProductClaimData });

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
                                <GridItem xs={12} sm={4} md={3}> <CustomInput
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
                                </GridItem>

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
                                <GridItem xs={12} sm={4} md={3}> <CustomInput
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
                                </GridItem>
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
                                        //   className="custom-date-time"
                                        onFocus={this.onClick}
                                        success={this.state.lossDateTimeState === "success"}
                                        error={this.state.lossDateTimeState === "error"}
                                        labelText="LossDate"
                                        id='dtActiveFrom'
                                        Futuredatevalidate={true}
                                        name='lossDateTime'
                                        onChange={(evt) => this.onDateChange('datetime', 'ClaimDTO', 'lossDateTime', evt)}
                                        value={this.state.ClaimDTO.lossDateTime}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>


                                <GridItem xs={12} sm={4} md={3}>

                                    <Dropdown
                                        // succes={this.state.claimStatusIdState === "success"}
                                        error={this.state.claimStatusIdState}
                                        labelText="ClaimStatus"
                                        id="ddlstatus"
                                        lstObject={this.state.StatusType}

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
                {this.state.open && this.state.approved ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card >
                            <CardBody>
                                <GridContainer justify="center" lg={12}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <div className="banner">
                                            <label><TranslationContainer translationKey="PolicyNumber" /></label>&nbsp;<h5>{this.state.PolicyNumber}</h5>
                                            <label><TranslationContainer translationKey="ClaimNumber" /></label>&nbsp;<h5>{this.state.ClaimNumber}</h5>

                                        </div>
                                    </Animated>

                                </GridContainer>
                                <ClaimSearch TableData={this.state.TableData} handleClaimAmount={this.handleClaimAmount} ClaimDTO={this.state.ClaimDTO}
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
                                    approved={this.state.approved} handleCheckbox={this.handleCheckbox} fields={this.state.fields}
                                    errormessage={this.state.errormessage} ValidationUI={this.state.ValidationUI} classes={this.classes} renderPage={this.renderPage}
                                    errorstatus={this.state.errorstatus} DecisionType={this.state.DecisionType} PayeeType={this.state.PayeeType} displaybank={this.state.displaybank} handleddlChange={this.handleddlChange}
                                    typeList={this.state.typeList} Bankfieldsmodel={this.state.Bankfieldsmodel} Payee={this.state.Payee} onModelChange={this.onModelChange} onDateChange={this.onDateChange}
                                    SetRiskClaimsDetailsValue={this.SetRiskClaimsDetailsValue} ProductClaimData={this.state.ProductClaimData} vehicleclaim={this.state.vehicleclaim} ClaimStatusData={this.state.ClaimStatusData}
                                    />

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
            </div>
        );
    }
}

export default withStyles(styles)(ClaimProcess);
