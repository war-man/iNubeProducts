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
import Icon from "@material-ui/core/Icon";
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
import TableCell from '@material-ui/core/TableCell';
import FilterNone from "@material-ui/icons/FilterNone";
import claimreports from "assets/img/Claim-reports.png";


import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";
import $ from 'jquery';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import claim from "assets/img/claim.png";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import swal from 'sweetalert';
import ClaimConfig from "modules/Claims/ClaimConfig.js";
import ExportToExcel from "components/ExcelExport/ExcelPlugin/ExportToExcel.jsx";
import validationPage from "modules/Claims/views/ValidationPage.jsx";
import { Animated } from "react-animated-css";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";




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

const paddingCard =
{
    padding: "10px",
};



class ClaimReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: false,
            nodata: false,
            loader: true,
            redirect: false,
            errormessage: false,
            encodedData: "",
            coverEventId: "",
            selectedimage: [],
            policyId: 0,
            disabled: false,
            count: 0,
            react: false,
            orgid: "",
            open: false,
            officeId: "",
            Claimlist: [],
            officelist: [],
            Claimsendlist: [],
            officesendlist: [],
            ClaimsDecisionData: [],
            CoverEventData: [],
            claimsdecisionshow: false,
            Claimdetailsdata: [],
            DocumentData: [],
            ClaimDataDTO: [],
            claimId: 0,
            imagebyte: "",
            insuredName: "",
            insuredRefNo: "",
            policyNo: "",
            claimNumber: "",
            claimFromDate: "",
            claimFromDateState: false,
            claimToDate: "",
            claimToDateState: false,
            claimStatusIdState: false,
            productIdState: false,
            partnerIdState: false,
            claimStatus: "",
            coverEvent: "",
            coverName: "",
            createBy: "",
            eventDate: "",
            lossDateTime: "",
            insuredEmail: "",
            claimid: "",
            showtable: false,
            data: [],
            radioValue1: false,
            radioValue2: false,
            disabled: false,
            file: null,
            dropFlag: false,
            bfname: null,
            dfname: null,
            status: "",
            ProductData: [],
            PartnerData: [],

            ClaimDTO: {
                claimFromDate: "",
                claimToDate: "",
                claimStatusId: "",
                coverEvent: "",
                lossDateTime: "",
                productId: "",
                partnerId: "",


                // claimId:""
            },

            fields: {
                claimStatusId: "",
                approvedClaimAmount: "",
                claimManagerRemarks: "",
                claimNumber: "",
                benefitAmount: "",
                claimId: 0,
                coverEvent: "",

            },
            ClaimSearchDTO: {
                insuredName: "",
                insuredRefNo: "",
                policyNo: "",
                claimNumber: "",
                claimStatus: "",
                claimprevStatus: "",
                claimcurrStatus: "",
                eventDate: "",
                accountHolderName: "",
                lossDateTime: "",
                createdDate: "",

            },
            DocumentData: [],

            lstSheet: [
                {
                    data: [],
                    sheetName: "Claims Report",
                    columnArray: [
                        {
                            Header: "Policy No.",
                            accessor: "policyNo",
                        },

                        {
                            Header: "Claim No.",
                            accessor: "claimNumber",
                        },

                        {
                            Header: "Beneficiary Name",
                            accessor: "accountHolderName",
                        },

                        {
                            Header: "Claim Status",
                            accessor: "claimprevStatus",
                        },

                        {
                            Header: "Intimated Date",
                            accessor: "createdDate",
                        },

                        {
                            Header: "Loss Date",
                            accessor: "lossDateTime",
                        },

                        {
                            Header: "Current Status",
                            accessor: "claimcurrStatus",
                        },


                    ]
                }
            ],
        };
        this.dataTable = this.dataTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    SetValue = (type, event) => {


        //  event.preventDefault();
        console.log('teset ', event)
        let name = event.target.name;
        console.log('name= ', name)
        let value = event.target.value;
        console.log('value= ', value)
        let ClaimDTO = this.state.ClaimDTO;
        ClaimDTO[name] = value;
        console.log('claim= ', ClaimDTO.claimNumber)
        this.setState({ ClaimDTO });
        console.log("claimNumber ", this.state.ClaimDTO);

        

    };


    handleChange = (type, event) => {
        let claim = this.state.ClaimDTO;
        let name = event.target.name;
        let value = event.target.value;

        if (name === "coverEvent") {
            const filterData = this.state.CoverEventData[0].mdata.filter(item => item.mID == value);
            claim[name] = filterData[0].mValue;
            this.state.coverEventId = value;
        } else {

            claim[name] = value;
        }
        this.setState({ claim });

        if (name == "partnerId") {
            fetch(`${ClaimConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + value, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {

                    console.log("off", data);
                    this.setState({ datalist: data[0].mdata });
                    console.log("datalist", this.state.datalist);
                    console.log("datalistmvalue", this.state.datalist.mValue);

                    let ProductData = this.state.ProductData;
                    ProductData = data;

                    this.setState({ ProductData });
                    console.log("ProductDatalist", this.state.ProductData);
                });

        }

        this.change(event, name, type);
    }


    onInputParamChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });
        //fetch('https://localhost:44344/api/ClaimManagement/ClaimProcess')
        //  //  .then(response => response.json())
        //    .then(data => {
        //        //if (data.length > 0) {
        //        //    let fields = this.state.fields;
        //        //    fields['claimManagerRemarks'] = data[0].remark;
        //        //    fields['approvedClaimAmount'] = data[0].approvedAmount;
        //            console.log("statusData", data);
        //            this.setState({ fields});

        //    });

    };


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

        fetch(`${ClaimConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=CoverEvent`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ CoverEventData: data });

                console.log("CoverEventData", data);
            });

        fetch(`${ClaimConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("partnerdata coming", data);
                this.setState({ PartnerData: data });

            });
        console.log("partnerdata coming", this.state.PartnerData);
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );

    }

    onChangeRadio = () => {

        let radioValue1 = this.state.radioValue1;
        let radioValue2 = this.state.radioValue2;

    }

    onDateChange = (formate, type, name, event) => {
        const { validdate } = this.state;
        this.setState({ validdate: false });
        this.setState({ DateRange: true });
        var today = event.toDate();
        //var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;

        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        var date = dd + '/' + mm + '/' + today.getFullYear();

        const ClaimDataDTO = this.state.ClaimDTO;
        ClaimDataDTO[name] = date;
        this.setState({ ClaimDataDTO });

        var timeDiff = date2.getTime() - date1.getTime();
        var datediff = this.state.date;
        datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        // var datediff = datediff;
        this.setState({ datediff });



        // this.change(event, name, type);
    };


    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }


    tableshow = () => {
        console.log("DTOdata", this.state.ClaimDTO);
        console.log("ClaimStatusId", this.state.ClaimDTO.claimStatusId);

        this.state.ValidationUI = true;

        this.IsValidProductDetails();

        if (this.state.ValidationUI === true) {

            const Fdate = this.state.ClaimDTO.claimFromDate;
            const Tdate = this.state.ClaimDTO.claimToDate;
            const Ldate = this.state.ClaimDTO.lossDateTime;

            if (this.state.ClaimDTO.claimFromDate != "") {
                this.state.ClaimDTO.claimFromDate = this.datechange(this.state.ClaimDTO.claimFromDate);
            }

            if (this.state.ClaimDTO.claimToDate != "") {
                this.state.ClaimDTO.claimToDate = this.datechange(this.state.ClaimDTO.claimToDate);
            }

            if (this.state.ClaimDTO.lossDateTime != "") {
                this.state.ClaimDTO.lossDateTime = this.datechange(this.state.ClaimDTO.lossDateTime);
            }
            // document.getElementById('searchTableSec').style.display = 'block';
            console.log("ClaimDTO", this.state.ClaimDTO);
            let that = this;
            this.setState({ loader: false });
            fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/ClaimsReport`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.ClaimDTO)
            }).then(response => response.json())
                .then(data => {
                    console.log('Response data', data);
                    if (data.length > 0) {
                        that.dataTable(data);
                        this.setState({ showtable: true });
                    } else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, showtable: false, nodata: true });
                            }.bind(this), 2000
                        );
                    }
                    that.setState({ Claimlist: data });
                    that.setState({ officelist: data });

                    console.log(that.state.Claimlist, 'Claim List');
                });
            this.state.ClaimDTO.claimFromDate = Fdate;
            this.state.ClaimDTO.claimToDate = Tdate;
            this.state.ClaimDTO.lossDateTime = Ldate;

        } else {
            this.setState({ errormessage: true });
            swal("", "Some fields are missing", "error");
        }
    };


    IsValidProductDetails = () => {

        if (this.state.ClaimDTO.claimFromDate !== "" && this.state.ClaimDTO.claimToDate !== "" && this.state.ClaimDTO.claimStatusId !== "" && this.state.ClaimDTO.partnerId !== "" && this.state.ClaimDTO.productId !== "") {
        } else {
            this.state.ValidationUI = false; this.state.errormessage = true;
        }


    }


    setstatus = (type, event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    dataTable = (officelist) => {
        console.log("officelist in react", officelist);
        this.setState({ loader: true, showtable: true, });
        this.setState({
            data: officelist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key + 1,
                    policyNo: prop.policyNo,
                    claimNumber: prop.claimNumber,
                    claimprevStatus: prop.claimprevStatus,
                    claimcurrStatus: prop.claimcurrStatus,
                    accountHolderName: prop.accountHolderName,

                    createdDate: new Date(prop.createdDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),

                    eventDate: new Date(prop.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),

                    lossDateTime: new Date(prop.lossDateTime).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),

                    //  radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.claimId)} />

                };

            })
        });
        //for (let i = 0; i < this.state.data.length; i++) {
        this.state.lstSheet[0].data = this.state.data;
        //}
        this.setState({});
    }

    handleClick = () => {
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/ModifyActive`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }, body: JSON.stringify(this.state.claims)
        })
            .then(response => response.json())
            .then(data => {
                console.log("data ", data)
            });
        console.log("hitting");
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    change(event, stateName, type, date, stateNameEqualTo, maxValue) {
        switch (type) {

            case "claimFromDate":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: false});
                } else {
                    this.setState({ [stateName + "State"]: true});
                }
                break;

            case "claimToDate":
                if (validationPage.verifydatetime(date)) {
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


                                <Icon><img id="icon" src={claimreports} /></Icon>

                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small><TranslationContainer translationKey="ClaimReports" /></small>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>

                                <GridItem xs={12} sm={12} md={4}>

                                    <MasterDropdown
                                        success={this.state.claimStatusIdState === "success"}
                                        error={this.state.claimStatusIdState === "error"}
                                        labelText="ClaimStatus"
                                        id="ddlstatus"
                                        lstObject={this.state.ClaimsDecisionData}
                                        filterName='Claims Decision'
                                        value={this.state.ClaimDTO.claimStatusId}
                                        name='claimStatusId'
                                        required={true}
                                        onChange={(e) => this.handleChange("claimStatusId", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.ClaimDTO.claimStatusId == "") ? <p className="error">*Required field cannot be left blank</p> : null}


                                </GridItem>

                                <GridItem xs={4} sm={4} md={4}>
                                    <CustomDatetime
                                        success={this.state.claimFromDateState === "success"}
                                        error={this.state.claimFromDateState === "error"}
                                        labelText="FromDate"
                                        id='dtEventDate'
                                        required={true}
                                        Futuredatevalidate={true}
                                        name='claimFromDate'
                                        DateRange={this.state.DateRange}
                                        datediff={this.state.datediff}
                                        onChange={(evt) => this.onDateChange('datetime', 'ClaimDTO', "claimFromDate", evt)}
                                        value={this.state.ClaimDTO.claimFromDate}
                                        formControlProps={{ fullWidth: true }} />
                                    {this.state.errormessage && (this.state.ClaimDTO.claimFromDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>

                                <GridItem xs={4} sm={4} md={4}>
                                    <CustomDatetime
                                        success={this.state.claimToDateState === "success"}
                                        error={this.state.claimToDateState === "error"}
                                        labelText="ToDate"
                                        id='dtEventDate'
                                        required={true}
                                        //Futuredatevalidate={true}
                                        name='claimToDate'
                                        DateRange={this.state.DateRange}
                                        datediff={this.state.datediff}
                                        onChange={(evt) => this.onDateChange('datetime', 'ClaimDTO', "claimToDate", evt)}
                                        value={this.state.ClaimDTO.claimToDate}
                                        formControlProps={{ fullWidth: true }} />
                                    {this.state.errormessage && (this.state.ClaimDTO.claimToDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>
                               

                               
                                <GridItem xs={12} sm={12} md={4}>

                                    <MasterDropdown
                                        error={this.state.partnerIdState}
                                        labelText="PartnerName"
                                        id="ddlstatus"
                                        lstObject={this.state.PartnerData}
                                        filterName='Partner'
                                        value={this.state.ClaimDTO.partnerId}
                                        name='partnerId'
                                        required={true}
                                        onChange={(e) => this.handleChange("partnerId", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.ClaimDTO.partnerId == "") ? <p className="error">*Required field cannot be left blank</p> : null}


                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>

                                    <MasterDropdown
                                        error={this.state.productIdState}
                                        labelText="ProductName"
                                        id="ddlstatus"
                                        lstObject={this.state.ProductData}
                                        filterName='Product'
                                        value={this.state.ClaimDTO.productId}
                                        name='productId'
                                        required={true}
                                        onChange={(e) => this.handleChange("productId", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.ClaimDTO.productId == "") ? <p className="error">*Required field cannot be left blank</p> : null}


                                </GridItem>


                                {/*       <GridItem xs={12} sm={12} md={4}>

                                    <MasterDropdown
                                        labelText="Cover Event"
                                        id="ddlstatus"
                                        lstObject={this.state.CoverEventData}
                                        filterName='CoverEvent'
                                        value={this.state.coverEventId}
                                        name='coverEvent'
                                        onChange={(e) => this.handleChange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />


                                </GridItem>
                                */}

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime
                                        onFocus={this.onClick}
                                        labelText="LossDate"
                                        id='dtActiveFrom'
                                        Futuredatevalidate={true}
                                        name='lossDateTime'
                                        onChange={(evt) => this.onDateChange('datetime', 'ClaimDTO' ,'lossDateTime', evt)}
                                        value={this.state.ClaimDTO.lossDateTime}
                                        formControlProps={{ fullWidth: true }} />
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
                    : <PageContentLoader />}
                {this.state.loader ?
                    <GridContainer xl={12}>
                    {this.state.showtable ?
                       
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={<h5><TranslationContainer translationKey="Claimreports" /></h5>}
                                        data={this.state.data}
                                        filterable
                                        columns={[

                                            {
                                                Header: "SerialNo",
                                                accessor: "id",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                minWidth: 30,
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
                                                Header: "BeneficiaryName",
                                                accessor: "accountHolderName",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,

                                            },

                                            {
                                                Header: "Claim Status",
                                                accessor: "claimprevStatus",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,
                                            },

                                            {
                                                Header: "IntimatedDate",
                                                accessor: "createdDate",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                // width: '50'
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
                                                Header: "CurrentStatus",
                                                accessor: "claimcurrStatus",
                                                headerClassName: 'react-table-center',
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                // width: '50'
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
                                    <GridContainer justify="center">
                                        <GridItem>
                                            <ExportToExcel lstSheet={this.state.lstSheet} />
                                        </GridItem>
                                    </GridContainer>
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
                        </GridItem>}
                    </GridContainer>
                    : <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>}
            </div>
        );
    }

}
export default withStyles(styles)(ClaimReports);