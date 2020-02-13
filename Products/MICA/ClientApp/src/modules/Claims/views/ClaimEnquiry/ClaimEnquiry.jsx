﻿import Icon from "@material-ui/core/Icon";
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
            disabled: false,
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
            DocumentData: [],
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
            disabled: false,
            file: null,
            dropFlag: false,
            status: "",
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

            },

            Datapic: [
                {
                    document: "",
                    documentType: ""
                }
            ],

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
            claimDetailsData: {
                "lossDate": "",
                "locationOfEvent": "",
                "lossDescription": "",
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
                "mobileNumber": "",
                "email": "",
                "eventdate": "",
                "coverEvent": "",
                "sDate": "",
                "eDate": "",
            },

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
        this.policyDetailsfun(ClaimArr[0].policyId);
        this.claimDetailsfun(ClaimArr[0].claimId);

       // this.downloadDocument(oid, false);

        this.documentView(oid, false);
        
        //this.paymentDetailsfun(ClaimArr[0].claimId);
        this.state.PolicyNumber = ClaimArr[0].policyNo;
        this.state.ClaimNumber = ClaimArr[0].claimNumber;
        this.setState({ open: true });


        this.claimAmountTable();
    }



    componentDidMount() {


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
            });

        ///////////////////////////////////////////////////////////////////////////////////////////
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

        //this.setState({ ClaimsAmountData: AmtData });


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
                    insuredReference: prop.insuredReference,
                    policyNo: prop.policyNo,
                    claimNumber: prop.claimNumber,
                    claimStatus: prop.claimStatus,
                    coverEvent: prop.coverEvent,
                    coverName: prop.coverName,
                    eventDate: new Date(prop.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),

                    lossDateTime: new Date(prop.lossDateTime).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),


                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.claimId)} />

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
                    typeOfLoss: prop.typeOfLoss,
                    benefitAmount: prop.benefitAmount,
                    claimAmounts: prop.claimAmounts,
                    approvedClaimAmounts: prop.approvedClaimAmounts

                };
            })
        });

    }

    docTable = (docDetailsData) => {

        console.log("@@@@", this.state.docDetailsData)
        this.setState({
            docdata: this.state.docDetailsData.map((prop, key) => {
                console.log("coming", this.state.docdata);
                const { classes } = this.props;
                
                return {
                    id: key + 1,
                    documentName: <a onClick={() => this.documentLinkView(prop.dmsdocId)}> {prop.documentName} </a>,
                };
            })
        });
        console.log("docdata", this.state.docdata);
    }


   

    Editopen = () => {
        this.setState({ disabled: false });
        this.setState({ open: true });
        console.log("officesendlist: ", this.state.officesendlist);

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
                //this.setState({ claimDetailsData: data[0] });

                this.state.claimDetailsData.lossDate = new Date(data[0][0][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });;
                this.state.claimDetailsData.locationOfEvent = data[0][1][1];
                this.state.claimDetailsData.lossDescription = data[0][2][1];
                this.state.claimDetailsData.totalClaimedAmount = data[0][3][1];
                this.state.claimDetailsData.totalApprovedAmount = data[0][4][1];
                this.state.claimDetailsData.accountHolderName = data[0][5][1];
                this.state.claimDetailsData.accountNumber = data[0][6][1];
                this.state.claimDetailsData.bankName = data[0][7][1];
                this.state.claimDetailsData.ifscCode = data[0][8][1];
                this.state.claimDetailsData.bankAddress = data[0][9][1];
                this.state.claimDetailsData.claimStatus = data[0][10][1];
                this.state.claimDetailsData.claimManagerRemarks = data[0][11][1];

                console.log("asdfgh", this.state.claimDetailsData);

                this.setState({ claimTableData: data[1] });
                //let griddata = this.state.claimTableData.filter(x => x.approvedClaimAmounts != null);
                //this.setState({ claimTableData: griddata });

                this.claimAmountTable(this.state.claimTableData);

                console.log("DATA", this.state.claimTableData);
            });




    }

    policyDetailsfun = (id) => {
        console.log("this.state.policyId", this.state.policyId);
        fetch(`${ClaimConfig.policyconfigUrl}/api/Policy/SearchPolicyDetails?PolicyId=` + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                //this.setState({ policyDetailsData: data });

                this.state.policyDetailsData.customerId = data[0][1];
                this.state.policyDetailsData.mobileNumber = data[1][1];
                this.state.policyDetailsData.email = data[2][1];
                this.state.policyDetailsData.eventdate = new Date(data[3][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                this.state.policyDetailsData.coverEvent = data[4][1];
                this.state.policyDetailsData.sDate = new Date(data[5][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                this.state.policyDetailsData.eDate = new Date(data[6][1]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

                console.log("policyDetailsData", this.state.policyDetailsData);
            });

    }


    //paymentDetailsfun = (id) => {
    //    console.log("this.state.claimId", this.state.claimId);

    //    fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchPaymentDetails?ClaimId=` + id, {
    //        method: 'get',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //        },
    //    }).then(response => response.json())
    //        .then(data => {
    //            this.setState({ paymentDetailsData: data });

    //            //if (typeof data.length != "undefined" && data.length != null && data.length > 0) {
    //            //    this.state.paymentDetailsData[1][1] = new Date(data[1][1]).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });

    //            //    this.state.paymentDetailsData[3][1] = new Date(data[3][1]).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });

    //            //}
    //        });
    //}

    documentView = (oid,isDoc) => {
     
        console.log("1234567", oid);
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/DocumentView?ClaimId=` + oid +`&isDoc=`+ isDoc , {

            method: 'get',

            headers: {

                'Accept': 'application/json',

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },

        }).then(response => response.json())

            .then(data => {
                console.log("Data:fgdgh", data);
                this.setState({ docDetailsData: data });

                console.log("document data", data)
                //console.log("docDetailsData", this.state.docDetailsData);

                const doc = this.state.Datapic[0];

                doc.document = data[0].document;

                this.setState({ doc });

                console.log("document", this.state.Datapic[0].document);
                //let file = this.state.Datapic[0].document;
                //window.open(file);
                //window.open('http://localhost:61048/Bills/"+documentStr+"', '_blank');

               // window.open("data:application/jpg;base64, " + this.state.Datapic[0].document);

                this.docTable(this.state.docDetailsData);

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
                            </GridItem>
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
                                <CustomDatetime
                                    onFocus={this.onClick}
                                    //success={this.state.lossDateTimeState === "success"}
                                    error={this.state.lossDateTimeState}
                                        labelText="LossDate"
                                        Futuredatevalidate={true}
                                    id='dtActiveFrom'
                                    name='lossDateTime'
                                        onChange={(evt) => this.onDateChange('datetime','ClaimDTO' ,'lossDateTime', evt)}
                                    value={this.state.ClaimDTO.lossDateTime}
                                    formControlProps={{ fullWidth: true }} />
                            </GridItem>


                            <GridItem xs={12} sm={4} md={3}>

                                <MasterDropdown
                                   // succes={this.state.claimStatusIdState === "success"}
                                    error={this.state.claimStatusIdState}
                                    labelText="ClaimStatus"
                                    id="ddlstatus"
                                    lstObject={this.state.ClaimsDecisionData}
                                    filterName='Claims Decision'
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
                                                    {
                                                        Header: "CoverEvent",
                                                        accessor: "coverEvent",
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
                           
                                        <ClaimSearch TableData={this.state.TableData} handleDisappear={this.handleDisappear} refreshData={this.refreshData} ClaimAmountSum={this.ClaimAmountSum} ClaimDTO={this.state.ClaimDTO} fields={this.state.fields} claimamt={this.state.claimamt} ClaimAppAmount={this.ClaimAppAmount} disabled={this.state.disabled} claimId={this.state.claimId} SetDecision={this.SetDecision} ClaimAmountdetailsdata={this.state.ClaimAmountdetailsdata} policyDetailsData={this.state.policyDetailsData} decision={this.state.decision} claimDetailsData={this.state.claimDetailsData}
                                docDetailsData={this.state.docDetailsData} docdata={this.state.docdata} Datapic={this.state.Datapic} handleChange={this.handleChange} onInputParamChange={this.onInputParamChange} claimStatusIdState={this.state.claimStatusIdState} approvedClaimAmountState={this.state.approvedClaimAmountState} claimManagerRemarksState={this.state.claimManagerRemarksState} classes={this.classes} ClaimIntimationDetails={this.state.ClaimIntimationDetails} />

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


                                : <img style={{ width: "65rem" }}
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

export default withStyles(styles)(ClaimEnquiry);