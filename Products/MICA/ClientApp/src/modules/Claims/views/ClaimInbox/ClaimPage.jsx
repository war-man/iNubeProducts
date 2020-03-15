import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import ClaimConfig from "modules/Claims/ClaimConfig.js";
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Button from "components/CustomButtons/Button.jsx";
import $ from 'jquery';
import ClaimSearch from "modules/Claims/views/ClaimProcess/_ClaimSearch.jsx";
import Modal from '@material-ui/core/Modal';
import PDFViewer from 'pdf-viewer-reactjs';


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

const paddingCard = {
    padding: "10px",
};

class ClaimPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtable: false,
            loader: false,
            nodata: false,
            email: "",
            Claimlist: [],
            officelist: [],
            TableData: [],
            data: [],
            ClaimDTO: this.props.ClaimDTO,

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
            //showtable: false,
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
                payeeType: "",
                DataModelDTO: {},
            },

            docs: {
                dmsdocId: "",
                documentName: ""
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
            }],

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

            PayeeType: [{ label: "Workshop", checked: false, typeName: "Workshop" },
            { label: "Customer", checked: false, typeName: "Customer" },
            { label: "Financier", checked: false, typeName: "Financier" },
            { label: "Nominee", checked: false, typeName: "Nominee" },
            { label: "Surveyor", checked: false, typeName: "Surveyor" },],

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

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.tableshow();
    }

    tableshow = () => {
        console.log("ClaimDTO", this.state.ClaimDTO);

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
        }).then(response => response.json())
            .then(function (data) {
                console.log('Response data', data);
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
                //that.setState({ email: data[0].insuredEmail });
                that.setState({ Claimlist: data });
                that.setState({ officelist: data });
            });
    };

    dataTable = (officelist) => {
        console.log("officelist in react", officelist);
        this.setState({ loader: true, showtable: true });
        this.setState({
            data: officelist.map((prop, key) => {
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
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

    editFunction(id, oid) {
        console.log("pid", oid);
        //console.log("officelist data", this.state.Claimlist);
        var CArr = this.state.Claimlist;
        var ClaimArr = [];
        $.each(CArr, function (k, v) {
            if (v.claimId == oid) {
                ClaimArr.push(CArr[id]);
            }
        })
        //console.log("ClaimArr", ClaimArr);
        //this.setState({ Claimsendlist: ClaimArr });
        //this.state.claimid = ClaimArr[0].claimId;
        //const Claimdata = ClaimArr[0].claimId;
        //this.setState({ claimid: oid });
        //console.log("Claimid: ", this.state.claimid);
        //this.setState({ claimId: Claimdata });
        //const fields = this.state.fields;
        //fields.claimNumber = ClaimArr[0].claimNumber;
        //fields.claimId = ClaimArr[0].claimId;

        //this.setState({ fields });
        //this.setState({ policyId: ClaimArr[0].policyId });
        //console.log("Claimsendlist: ", this.state.Claimsendlist);

        //this.policyDetailsfun(ClaimArr[0].policyId);
        //this.claimDetailsfun(ClaimArr[0].claimId);
        //this.documentView(oid, false);

        //// this.paymentDetailsfun(ClaimArr[0].claimId);
        //this.state.PolicyNumber = ClaimArr[0].policyNo;
        //this.state.ClaimNumber = ClaimArr[0].claimNumber;
        //this.setState({ open: true });

        //console.log("approved", this.state.approved, this.state.decision);
        //if (ClaimArr[0].claimStatus == "Approved" || ClaimArr[0].claimStatus == "Rejected") {
        //    this.setState({ approved: false });
        //}
        ////else if (this.state.decision == false) {
        ////    this.setState({ approved: false });
        ////}
        //else {
        //    this.setState({ approved: true });

        //}
        //// this.docTable();
        //if (ClaimArr[0].claimStatus == "Approved") {
        //    this.setState({ approved: false });
        //    swal("", "Claim is already approved!", "success");
        //}
        //else if (ClaimArr[0].claimStatus == "Rejected") {
        //    this.setState({ approved: false });
        //    swal("", "Claim is already rejected!", "success");
        //}
        //else if (ClaimArr[0].claimStatus == "Settled") {
        //    this.setState({ approved: false });
        //    swal("", "Claim is already settled!", "success");
        //}
        //else {
        //    this.setState({ approved: true });
        //}


        //this.claimAmountTable();
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
                                            //{
                                            //    Header: "Select",
                                            //    accessor: "radio",
                                            //    sortable: false,
                                            //    filterable: false,
                                            //    minWidth: 30,
                                            //    resizable: false,
                                            //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            //},
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
                                        //pageSize={([this.state.data.length + 1] < 4) ? [this.state.data.length + 1] : 4}
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
            </div >
        );
    }
}

export default withStyles(style)(ClaimPage);