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

class InboxClaimProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaybank: false,
            isimage: false,
            openpop: false,
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
            ClaimDTO: this.props.ClaimDTO,
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
                "driverName": "",
                "selfSurvey": "",
                "totalClaimedAmount": "",
                "accountHolderName": "",
                "accountNumber": "",
                "accountType": "",
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

            claimTableData: [],
            paymentDetailsData: [],
            DataAmount: [],
            docDetailsData: [],
            DocumentData: [],
            PayeeTypedata: [],
            StatusType: [],
            DecisionType: [],
            AccountTypedata: []
        };
    }

    handleClose = () => {
        this.setState({ openpop: false });
    };

    onFormSubmit = (evt) => {

        this.state.ValidationUI = true;
        // evt.preventDefault();
        this.IsValidProductDetails();
        if (this.state.ValidationUI === true) {

            this.setState({ claimsdecisionshow: true });

            console.log("submit", this.state.fields);
            let field = this.state.fields;
            field.emailId = this.state.email;
            this.setState({ field });
            console.log("fields: ", field);
            console.log("submit JSON", JSON.stringify(this.state.fields));

            let detailsdto = this.state.fields;

            console.log("ClaimData", this.state.claimTableData);

            for (var i = 0; i < this.state.claimTableData.length; i++) {
                if (this.state.claimTableData[i].approvedClaimAmounts != null) {
                    this.state.DataAmount.push(this.state.claimTableData[i]);
                }
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
                    this.state.claimId = data.claimId;
                    this.setState({ claimnumber: data.claimNumber });
                    swal({
                        text: "Claim Processed successfully! \n Your Claim Number: " + this.state.claimnumber,
                        icon: "success",
                        buttons: [false, "OK"],
                    }).then((willDelete) => {
                        if (willDelete) {
                            this.handlepagereload();
                        }
                    });
                    //this.renderRedirect();
                });
        } else {
            this.setState({ errormessage: true });
            swal("", "Some fields are missing", "error");
        }

    };

    handlepagereload = () => {
        window.location.reload();
    }

    IsValidProductDetails = () => {
        if (this.state.fields.claimStatusId !== "" && this.state.fields.claimManagerRemarks !== "") {
        } else {
            this.state.ValidationUI = false; this.state.errormessage = true;
            this.setState({});
        }
    }

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

    handleddlChange = (currentNode, selectedNodes) => {
        console.log("currentNode", currentNode, selectedNodes);
        if (currentNode.checked === true) {
            this.setState({ displaybank: true });

        } else {
            this.setState({ displaybank: false });
        }
    }

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
        // fields.claimStatusId = ClaimArr[0].claimStatusId;

        this.state.prodId = ClaimArr[0].productIdPk;
        console.log("prodId", this.state.prodId);

        this.setState({ fields });
        this.setState({ policyId: ClaimArr[0].policyId });
        console.log("Claimsendlist: ", this.state.Claimsendlist);

        this.policyDetailsfun(ClaimArr[0].policyNo);
        this.claimAmountTable();
        this.claimDetailsfun(ClaimArr[0].claimId);
        this.documentView(oid, false);

        // this.paymentDetailsfun(ClaimArr[0].claimId);
        this.state.PolicyNumber = ClaimArr[0].policyNo;
        this.state.ClaimNumber = ClaimArr[0].claimNumber;
        this.setState({ open: true });

        console.log("approved", this.state.approved, this.state.decision);
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

        this.onGet();
        //this.claimAmountTable();
    }

    componentDidMount() {
        this.tableshow();
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Claims%20Decision`, {
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

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Account%20Type`, {
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

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Claim%20Status`, {
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
        console.log("DataModelDTO", this.state.fields.DataModelDTO);
        console.log("name", evt.target.name);
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
        //console.log("ClaimDTO", this.state.ClaimDTO);
        //console.log("1234567", this.state.fields.claimId);
        //const Cdate = this.state.ClaimDTO.eventDate;

        //if (this.state.ClaimDTO.eventDate != "") {
        //    this.state.ClaimDTO.eventDate = this.datechange(this.state.ClaimDTO.eventDate);
        //}

        let that = this;
        that.setState({ loader: false });
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchClaimByUserid`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.ClaimDTO)
        })
            .then(response => response.json())
            .then(function (data) {
                console.log('Response data', data);
                console.log(that.state.Claimlist, 'Claim List');
                that.setState({ showtable: false, loader: false });
                if (data.length > 0) {
                    that.dataTable(data);
                } else {
                    setTimeout(
                        function () {
                            that.setState({ loader: true, showtable: false, nodata: true });
                        }.bind(this), 2000
                    );
                }
                that.setState({ email: data[0].insuredEmail });
                that.setState({ Claimlist: data });
                that.setState({ officelist: data });

                that.claimAmountTable(data);
            });
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

        console.log("@@@@", this.state.docDetailsData)
        this.setState({
            docdata: this.state.docDetailsData.map((prop, key) => {
                console.log("coming", this.state.docdata);
                const { classes } = this.props;

                return {
                    id: key + 1,
                    documentName: <a onClick={() => this.documentLinkView(prop.dmsdocId)}> {prop.documentName} </a>,
                    // documentName: <a href={`http://localhost:53000/api/DMS/DownloadFile?id=`+ prop.dmsdocId}> {prop.documentName} </a>,
                    // documentType: prop.documentType

                };

            })
        });
        console.log("docdata", this.state.docdata);

    }

    claimAmountTable = () => {

        console.log("TableData#007", this.state.claimTableData);
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
                        return (<h6> <b>{c.Header}</b> : {c.Details} </ h6>)
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
                            {this.state.errormessage && (this.state.claimTableData[key].approvedClaimAmounts) ? <p className="error" >*Enter Claim Amount </p> : null}
                            {(this.state.claimTableData[key].approvedClaimAmounts > this.state.claimTableData[key].claimAmounts) ? <p className="error">*Approved Amount should not be greater than Claim Amount</p> : null}
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
        console.log("officesendlist: ", this.state.officesendlist);

    }

    claimDetailsfun = (id) => {

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
                // this.setState({ claimDetailsData: data[0] });
                console.log("details of claims", data);
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
                //this.state.claimDetailsData.totalClaimedAmount = data[0][6][1];
                //this.state.claimDetailsData.accountHolderName = data[0][7][1];
                //this.state.claimDetailsData.accountNumber = data[0][8][1];
                //this.state.claimDetailsData.bankName = data[0][9][1];
                //this.state.claimDetailsData.ifscCode = data[0][10][1];
                //this.state.claimDetailsData.bankAddress = data[0][11][1];
                console.log("###", this.state.claimDetailsData);

                this.setState({ claimTableData: data[1] });

                console.log("this.state.claimTableData", this.state.claimTableData);

                this.claimAmountTable(this.state.claimTableData);

                console.log("DATA", this.state.claimDetailsData, this.state.claimTableData);

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


                console.log("abcdddddd", this.state.policyDetailsData);


            });
        this.setState({ disabled: true });
    }

    documentView = (oid, isDoc) => {

        console.log("1234567", oid);
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/DocumentView?ClaimId=` + oid + `&isDoc=` + isDoc, {
            method: 'get',

            headers: {

                'Accept': 'application/json',

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },

        }).then(response => response.json())

            .then(data => {
                console.log("Data:123234", data);
                this.setState({ docDetailsData: data });

                console.log("document data", data)
                //console.log("docDetailsData", this.state.docDetailsData);

                const doc = this.state.Datapic[0];

                doc.document = data[0].document;

                this.setState({ doc });

                console.log("document", this.state.Datapic[0].document);
                //let file = this.state.Datapic[0].document;
                //window.open(file);
                // window.open("https://localhost:44344/api/ClaimManagement/Download?ClaimId=" + this.state.Datapic[0].document);

                // window.open("data:application/jpg;base64, " + this.state.Datapic[0].document);

                this.docTable(this.state.docDetailsData);
            });
    }

    documentLinkView = (dmsdocId) => {
        //this.setState({ openpop: true });
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

        fetch(`${ClaimConfig.productConfigUrl}/api/Product/GetProductClaimsDetails?ProductId=` + this.state.prodId + `&FieldType=Claim%20Process`, {
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


            });
    }

    handleCheckbox = (event, name) => {

        let ProductClaimData = this.state.ProductClaimData;
        //let name = event.target.name;
        let check = event.target.checked;
        console.log("values: ", this.state.ProductClaimData, 'chk data ', event, event.target.checked, name);

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


                //    console.log("this.state.fields.payeeType", this.state.fields.payeeTypeId, "-------", data[index].mID);
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
            //console.log("event.target.name", eventname);
            //for (var i = 0; i < eventname.length; i++) {
            //    if (!eventname[i].mIsRequired==true) {
            //        eventname[i].disable = true;
            //    } else {
            //        eventname[i].disable = false;
            //    }
            //} 

            console.log("values: ", this.state.ProductClaimData);
        }
        //ProductClaimData[name] = check;
        //this.setState({ ProductClaimData });

        //console.log("name", event.target.name);
    }


    renderRedirect = () => {
        const Claimdata = this.state.ClaimResetData;
        this.state.fields = Claimdata;
        this.setState({ Claimdata });

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
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
                                    SetRiskClaimsDetailsValue={this.SetRiskClaimsDetailsValue} ProductClaimData={this.state.ProductClaimData} vehicleclaim={this.state.vehicleclaim} ClaimStatusData={this.state.ClaimStatusData} />
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
                                : <img style={{ width: "80rem" }}
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

export default withStyles(styles)(InboxClaimProcess);
