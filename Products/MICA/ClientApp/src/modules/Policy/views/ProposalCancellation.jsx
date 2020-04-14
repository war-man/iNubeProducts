import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
//import ReactTable from "react-table";
import user from "assets/img/user.png";
import swal from 'sweetalert';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import policyConfig from 'modules/Policy/PolicyConfig.js';
import { Redirect } from 'react-router-dom';
import ReactTable from "components/MuiTable/MuiTable.jsx";
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import searchproduct from "assets/img/search-product.png";
import claim from "assets/img/claim.png";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Icons from '../../../views/Components/Icons';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

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
const paddingCard =
{
    padding: "10px",
};
// ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}

class ApplicationCancel extends React.Component {
    constructor(props) {
        super(props);
        var date = new Date();
        var CurrentDateTime = date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        var CurrentDateTime1 = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        this.state = {
            redirect: false,
            DatePickerValue:null,
            RemarkState:false,
            ShowRefundDetails: false,
            disabled: false,
            details: false,
            nodata: false,
            loader: true,
            pageloader: false,
            showtable: false,
            effectiveDate: CurrentDateTime,
            cancelRequestDate: CurrentDateTime,
            PolicysearchDTO: {
                proposalnumber: "",
                flag:true,
                mobileNumber: "",

            },
            tabledata: [],
            Proposaldetailsdata: [],
            Claimdetailsdata: [],
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
            ProposalCancelDTO: {

                "proposalNumber": "",
                "effectiveDate": CurrentDateTime1,
                "cancelRequestDate": CurrentDateTime1

            },
            proposalCancelRequest: { "ProposalNumber": "", "Remarks": ""},
            PolicyCancelResponse: {

                "noofDayRemaining": 0,
                "noofUnusedDays": 0,
                "ftPremium": 0,
                "adPremium": 0,
                "totalPremium": 0
            }


        };
        this.SetValue = this.SetValue.bind(this);
    }


    componentDidMount() {
      
         
            setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );

    }

    showPolicyTable = () => {
        console.log("PolicysearchDTO", this.state.PolicysearchDTO);
       


        this.setState({ loader: false, ShowRefundDetails: false, Claimdetailsdata:[] });
        fetch(`${policyConfig.PolicyconfigUrl}/api/Policy/PolicySearch`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.PolicysearchDTO)
        }).then(response => response.json())
            .then(data => {
                this.setState({ tabledata: data, showtable: false, loader: false, nodata:false, details:false });

                if (this.state.tabledata.length > 0) {
                    this.PolicyTable();
                } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, showtable: false, nodata: true, details: false });
                        }.bind(this), 2000
                    );
                }

                console.log("tabledata:", this.state.tabledata)

            });
    }


    PolicyTable = () => {
        this.setState({ loader: true, showtable: true })
        this.setState({
            Proposaldetailsdata: this.state.tabledata.map((prop, key) => {
                const { classes } = this.props;
                return {
                    id: key,
                    ProposalNo: prop.proposalNo,
                    IRN: prop.customerId,
                    IN: prop.coverNoteNo,
                    mobileNo: prop.mobileNumber,
                    ProposalDate: new Date(prop.proposalDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                   // policyStartDate: new Date(prop.policyStartDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    //policyEndDate: new Date(prop.policyEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),

                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.proposalNo)} />
                };
            })
        });
    }
    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    

    SetValue = (type, event) => {
        let PolicysearchDTO = this.state.PolicysearchDTO;
        let name = event.target.name;
        let value = event.target.value;
        PolicysearchDTO[name] = value;
        this.setState({ PolicysearchDTO });
      



        console.log("PolicysearchDTO", this.state.PolicysearchDTO);
    };

    editFunction(id, pid) {
    

        this.proposalDetailsfun(pid);
        this.SearchClaimFun(pid);
        let CancelDTO = this.state.ProposalCancelDTO;
        CancelDTO.proposalNumber = pid;
        let cancelrequest = this.state.proposalCancelRequest;
        cancelrequest.ProposalNumber = pid;
        this.setState({ CancelDTO, cancelrequest });



    }
    SearchClaimFun = (policynumber) => {
        let Requestobj = { "policyNo": policynumber };

           fetch(`${policyConfig.PolicyconfigUrl}/api/ClaimManagement/SearchClaim`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(Requestobj)
        }).then(response => response.json())
            .then(data => {
                if (data.status == 1) {
               
                    this.ClaimTable(data.claimSearch);
                }
                //else {

                //    swal({ text: data.responseMessage, icon: "error" });

                //}
            });
    }

    ClaimTable = (Data) => {
       
        this.setState({
            Claimdetailsdata: Data.map((prop, key) => {
                const { classes } = this.props;
                return {
                    id: key+1,
                  
                    claimStatus: prop.claimStatus,
                    lossDateTime: new Date(prop.lossDateTime).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    locationOfEvent: prop.locationOfEvent,
                    claimAmount: (prop.claimAmount!=null)?prop.claimAmount.toFixed(2):null,
                    };
            })
        });
        console.log("Claimdetailsdata", this.state.Claimdetailsdata);
    }

    proposalDetailsfun = (propsoalNo) => {
        fetch(`${policyConfig.PolicyconfigUrl}/api/Policy/SearchProposalDetailsByNumber?ProposalNumber=` + propsoalNo, {
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
                this.setState({ disabled: true, details: true });


            });

    }
    datechange = (date) => {
        const _date = date.split('/');
        console.log("_date", _date);
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    showRefundFun = () => {
      //  this.state.ProposalCancelDTO.effectiveDate = Date.now.ToString('yyyy-MM-dd');
      

        //this.state.ProposalCancelDTO.cancelRequestDate = Date.now.ToString('yyyy-MM-dd');
        this.setState({ RemarkState: false});
        fetch(`${policyConfig.ExtensionUrl}/api/Mica_EGI/GetRefundDetails`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.ProposalCancelDTO)
        }).then(response => response.json())
            .then(data => {
                this.setState({ PolicyCancelResponse: data, ShowRefundDetails: true });
            });

     }


    CancelProposalFun = () => {
       
            let that = this;
        if (this.state.proposalCancelRequest.ProposalNumber !== "") {
                swal("Are you sure you want to cancel the Proposal?", {
                    buttons: {
                        cancel: {
                            text: "No",
                            value: true,
                            visible: true,
                            className: "",

                            closeModal: true,
                        },
                        confirm: {
                            text: "Yes",
                            value: "confirm",
                            visible: true,
                            className: "",
                            closeModal: true
                        }
                    }

                }).then((value) => {
                    console.log("policyDTO", this.state.proposalCancelRequest)
                    switch (value) {

                        case "confirm":
                            if (this.state.proposalCancelRequest.Remarks != "") {
                                fetch(`${policyConfig.PolicyconfigUrl}/api/Policy/ProposalCancellation`, {
                                    method: 'PUT',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                                    },
                                    body: JSON.stringify(this.state.proposalCancelRequest)
                                }).then(response => response.json())
                                    .then(data => {
                                        if (data.status == 3) {
                                            swal({ text: data.responseMessage, icon: "success" });
                                            this.setState({ redirect: true });
                                            this.renderRedirect();
                                        } else {

                                            swal({ text: data.responseMessage, icon: "error" });

                                        }
                                    });
                            } else {
                                this.setState({ RemarkState:true});
                                swal({ text: "Please fill Remarks for cancel the proposal", icon: "error" });
                            }
                                break;

                    }
                }
                );
        }
       
        }

       
    RemarksFun = (e) => {
        let proposalCancelRequest=this.state.proposalCancelRequest;
        proposalCancelRequest[e.target.name] = e.target.value;
        this.setState({ proposalCancelRequest, RemarkState:false});
    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }



    render() {
        const { classes } = this.props;

        return (

            <div>
                {this.renderRedirect()}
                {this.state.pageloader ?
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={searchproduct} /></Icon>
                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small><TranslationContainer translationKey="SearchProposal" /></small>
                            </h4>
                        </CardHeader>

                        <CardBody>
                            <GridContainer >
                                <GridItem xs={4} sm={4} md={3}>
                                    <CustomInput

                                        error={this.state.proposalnumberState}
                                        labelText="ProposalNumber"
                                        name="proposalnumber"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.proposalnumber}
                                        onChange={(e) => this.SetValue("proposalnumber", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={4} sm={4} md={3}>
                                    <CustomInput

                                        error={this.state.mobileNumberState}
                                        labelText="InsuredMobileNo"
                                        name="mobileNumber"
                                       
                                        // required={true}
                                        value={this.state.PolicysearchDTO.mobileNumber}
                                        onChange={(e) => this.SetValue("mobileNumber", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridContainer justify="center">
                                    <GridItem xs={8} sm={3} md={3} lg={2}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.showPolicyTable}>
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
                                        title={<h4 className={this.props.cardIconTitle}><small><TranslationContainer translationKey="Proposal Details" /></small></h4>}
                                        data={this.state.Proposaldetailsdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Select",
                                                accessor: "radio",
                                                minWidth: 50,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                sortable: false,
                                                filterable: false,
                                                resizable: false,
                                            },
                                            {
                                                Header: "ProposalNumber",
                                                accessor: "ProposalNo",
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
                                                Header: "ProposalDate",
                                                accessor: "ProposalDate",
                                                minWidth: 80,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            //{
                                            //    Header: "PolicyStartDate",
                                            //    accessor: "policyStartDate",
                                            //    minWidth: 80,
                                            //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            //    headerClassName: 'react-table-center',
                                            //    resizable: false,
                                            //},
                                            //{
                                            //    Header: "PolicyEndDate",
                                            //    accessor: "policyEndDate",
                                            //    minWidth: 80,
                                            //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            //    headerClassName: 'react-table-center',
                                            //    resizable: false,
                                            //},


                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        pageSize={([this.state.Proposaldetailsdata.length + 1] < 5) ? [this.state.Proposaldetailsdata.length + 1] : 5}
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


                {(this.state.details && this.state.showtable) ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card>

                            
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={claim} /></Icon>
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small><TranslationContainer translationKey="ProposalDetails" /></small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer justify="center" lg={12}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                       
                                        <div className="banner">
                                            <label><TranslationContainer translationKey="ProposalNumber" /></label>&nbsp;<h5>{this.state.ProposalCancelDTO.proposalNumber}</h5>
                   

                                        </div>
                                    </Animated>

                                </GridContainer>
                                <GridContainer>

                                    {/*
                                    <GridItem xs={12} sm={4} md={3}>


                                        <CustomInput

                                            labelText="InsuredReferenceNo"

                                            value={this.state.policyDetailsData.customerId}
                                            name='customerId'

                                            disabled={this.state.disabled}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    */}

                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            labelText="Insured Name"
                                            value={this.state.policyDetailsData.coverNoteNo}
                                            name='coverNoteNo'
                                            disabled={this.state.disabled}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4} md={3}>


                                        <CustomInput
                                            disabled={this.state.disabled}
                                            labelText="InsuredMobileNo"
                                           
                                            value={this.state.policyDetailsData.mobileNumber}
                                            name='mobileNumber'

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4} md={3}>


                                        <CustomInput
                                            disabled={this.state.disabled}

                                            labelText="InsuredEmailID"

                                            value={this.state.policyDetailsData.email}
                                            name='email'

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>




                                    <GridItem xs={12} sm={4} md={3}>


                                        <CustomInput
                                            disabled={this.state.disabled}

                                            labelText="PolicyStartDate"

                                            value={this.state.policyDetailsData.sDate}
                                            name='sDate'

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>


                                    <GridItem xs={12} sm={4} md={3}>


                                        <CustomInput
                                            disabled={this.state.disabled}

                                            labelText="PolicyEndDate"

                                            value={this.state.policyDetailsData.eDate}
                                            name='eDate'

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            labelText="Total Sum Insured"
                                            value={this.state.policyDetailsData.totalSumInsured.toFixed(2)}
                                            name='totalSumInsured'
                                            inputType="number" type="numeric"
                                            disabled={this.state.disabled}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            labelText="Balance Sum Insured"
                                            value={this.state.policyDetailsData.balanceSumInsured.toFixed(2)}
                                            name='balanceSumInsured'
                                            inputType="number" type="numeric"
                                            disabled={this.state.disabled}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>


                                </GridContainer>

                            </CardBody>
                        </Card>

                        {this.state.Claimdetailsdata.length > 0 ? <GridContainer xl={12}>
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={<h4 className={this.props.cardIconTitle}><small><TranslationContainer translationKey="ClaimDetails" /></small></h4>}
                                        data={this.state.Claimdetailsdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "SNo",
                                                accessor: "id",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Loss DateTime",
                                                accessor: "lossDateTime",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Loss Location",
                                                accessor: "locationOfEvent",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Claim Status",
                                                accessor: "claimStatus",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },

                                            {
                                                Header: "Claim Amount",
                                                accessor: "claimAmount",
                                                minWidth: 80,
                                                setCellProps: (value) => ({ style: { textAlign: "right" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Claim Paid On",
                                                accessor: "policyEndDate",
                                                minWidth: 80,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            //{
                                            //    Header: "UTR/NEFT Ref No.",
                                            //    accessor: "policyEndDate",
                                            //    minWidth: 80,
                                            //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            //    headerClassName: 'react-table-center',
                                            //    resizable: false,
                                            //}

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
                        </GridContainer>:null}
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                            <Card>
                                <CardBody>


                                    <CardHeader color="rose" icon>

                                        <h4 className={this.props.cardIconTitle}>
                                            <small><TranslationContainer translationKey="RefundDetails" /></small>
                                        </h4>
                                    </CardHeader>
                                    <GridContainer>


                                        <GridItem xs={12} sm={4} md={3}>

                                            <CustomDatetime disabled={true} required={true} labelText="Cancellation Request Date" id='dtActiveFrom' name='cancelRequestDate' value={this.state.cancelRequestDate} formControlProps={{ fullWidth: true }} />
                                            {/*
                                            <CustomInput

                                                labelText="Cancel Request Date"

                                                value={this.state.ProposalCancelDTO.cancelRequestDate}
                                                name='customerId'

                                                disabled={this.state.disabled}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                            */}
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={3}>

                                            <CustomDatetime disabled={true} required={true} labelText="Cancellation Effective Date" id='dtActiveFrom' name='effectiveDate' value={this.state.effectiveDate} formControlProps={{ fullWidth: true }} />

                                            {/*  <CustomInput

                                                labelText="Cancellation Effective Date"

                                                value={this.state.ProposalCancelDTO.effectiveDate}
                                                name='customerId'

                                                disabled={this.state.disabled}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                            */}
                                        </GridItem>

                                        <GridContainer justify="center">
                                            <GridItem xs={8} sm={3} md={3} lg={2}>
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.showRefundFun}>
                                                        <TranslationContainer translationKey="Show Refund" />
                                                    </Button>
                                                </Animated>
                                            </GridItem>
                                        </GridContainer>
                                    </GridContainer>
                                    {this.state.ShowRefundDetails ? <GridContainer>


                                        <GridItem xs={12} sm={4} md={3}>


                                            <CustomInput

                                                labelText="Number of Days till Policy End Date"
                                                inputType="number" type="numeric"
                                                value={this.state.PolicyCancelResponse.noofDayRemaining}
                                                name='customerId'

                                                disabled={this.state.disabled}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={4} md={3}>


                                            <CustomInput

                                                labelText="Fire & Theft Including GST"

                                                value={this.state.PolicyCancelResponse.ftPremium.toFixed(2)}
                                                name='customerId'
                                                inputType="number" type="numeric"
                                                disabled={this.state.disabled}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={3}>


                                            <CustomInput

                                                labelText="Number of Unused Days"
                                                inputType="number" type="numeric"
                                                value={this.state.PolicyCancelResponse.noofUnusedDays}
                                                name='customerId'

                                                disabled={this.state.disabled}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        

                                        <GridItem xs={12} sm={4} md={3}>


                                            <CustomInput

                                                labelText="Accidental Damages Including GST"
                                                inputType="number" type="numeric"
                                                value={this.state.PolicyCancelResponse.adPremium.toFixed(2)}
                                                name='customerId'

                                                disabled={this.state.disabled}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={4} md={3}>


                                            <CustomInput

                                                labelText="Total Refund Including GST"
                                                inputType="number" type="numeric"
                                                value={this.state.PolicyCancelResponse.totalPremium.toFixed(2)}
                                                name='customerId'

                                                disabled={this.state.disabled}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={3}>


                                            <CustomInput

                                                labelText="Remarks"
                                                error={this.state.RemarkState}
                                                required={true}
                                                value={this.state.proposalCancelRequest.Remarks}
                                                name='Remarks'
                                                onChange={this.RemarksFun}
                                             
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridContainer justify="center">
                                            <GridItem xs={8} sm={3} md={3} lg={2}>
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <Button id="center-modify-user" color="info" round disabled={this.state.Claimdetailsdata.length > 0?true:false} className={classes.marginRight} onClick={this.CancelProposalFun}>
                                                        <TranslationContainer translationKey="Cancel Proposal" />
                                                    </Button>
                                                </Animated>
                                            </GridItem>
                                        </GridContainer>
                                    </GridContainer> : null}
                                </CardBody>
                            </Card>
                        </Animated>
                    </Animated> : null}

            </div>


        );
    }
}
export default withStyles(styles)(ApplicationCancel);
