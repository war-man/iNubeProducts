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

import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import $ from 'jquery';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import ClaimConfig from 'modules/Claims/ClaimConfig.js';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import claim from "assets/img/claim.png";
import ReactTable from "react-table";
import swal from 'sweetalert';
import ClaimComponent from "modules/Claims/views/ClaimIntimate/ClaimComponent.jsx";
import Document from "modules/Claims/views/ClaimIntimate/Document.jsx";
import BankDetails from "modules/Claims/views/ClaimIntimate/BankDetails.jsx";
import ClaimAmount from "./ClaimAmount";

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

class ClaimIntimation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            documentshow: false,
            buttonshow: false,
            claimsdecisionshow: false,
            coverEventshow: false,
            Claimdetailsdata: [],
            ClaimAmountdetailsdata: [],
            LossIntimatedByData: [],
            ClaimsDecisionData: [],
            DocumentData: [],
            InsurableItemData: [],
            BenefitAmount: "",
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
            PartnerData: [],
            ProductData: [],
            datalist: [],
            PolicyData: [],
            file: null,
            dropFlag: true,
            docpage: false,
            claimId: 0,
            claimnumber: "",
            show: false,
            details: false,
            Columns: [
                {
                    insurableItem: "",
                    insuredName: "",
                    identificationNo: "",
                    typeOfLoss: "",
                    benefitAmount: "",
                    claimAmount: "",

                }],

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
                insurableItem: "",
            },
            tabledata: {},
            PolicysearchDTO: {
                policynumber: "",
                insuredRefNumber: "",
                insuredName: "",
                insuredMobileNumber: "",
                insuredEmail: "",
                eventDate: "",
                coverEvent: "",
                coverName: "",

            },

            ClaimIntimationDetails: [{
                insurableItem: "",
                insuredName: "",
                identificationNo: "",
                policyNumber: "",
                coverEvent: "",
                typeOfLoss: "",
                benefitAmount: "",
                claimAmount: "",
            }]
        };
        this.handleTags = this.handleTags.bind(this);
    }

    SetValue = event => {
        let PolicysearchDTO = this.state.PolicysearchDTO;
        PolicysearchDTO[event.target.name] = event.target.value;
        this.setState({ PolicysearchDTO });
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

    onInputClaimsChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.PolicysearchDTO;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        if (evt.target.name == "PartnerId") {


            fetch(`${ClaimConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + evt.target.value, {
                method: 'get',
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

                    //let ProductData = this.state.ProductData;
                    //ProductData = data;

                    this.setState({ ProductData: data });
                    console.log("ProductDatalist", this.state.ProductData);
                });

        }
    };

    onFormSubmit = (evt) => {
        const Ldate = this.state.DetailsDTO.lossDateTime;
        const Cdate = this.state.PolicysearchDTO.eventDate;

        if (this.state.DetailsDTO.lossDateTime != "") {
            this.state.DetailsDTO.lossDateTime = this.datechange(this.state.DetailsDTO.lossDateTime);
        }

        if (this.state.PolicysearchDTO.eventDate != "") {
            this.state.PolicysearchDTO.eventDate = this.datechange(this.state.PolicysearchDTO.eventDate);
        }
        //this.setState({ claimsdecisionshow: true });
        console.log("submit", this.state.DetailsDTO);
        //${ ClaimsConfig.claimsConfigUrl }
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/ClaimIntimate`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.DetailsDTO)
        }).then(response => response.json())
            .then(data => {
                console.log("responseData", data);
                ////if (data.status == 200) {
                this.state.claimId = data.claimId;
                this.setState({ docpage: true, claimnumber: data.claimNumber });
                swal({
                    text: "Claim intimated successfully! \n your Claim number: " + this.state.claimnumber,
                    icon: "success"
                });

            });

        this.state.DetailsDTO.lossDateTime = Ldate;
        this.state.PolicysearchDTO.eventDate = Cdate;
    };


    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const DetailsDataDTO = this.state.DetailsDTO;
        DetailsDataDTO[name] = date;
        this.setState({ DetailsDataDTO });
        const PolicyDataDTO = this.state.PolicysearchDTO;
        PolicyDataDTO[name] = date;
        this.setState({ PolicyDataDTO });

    };


    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    handleChange = (event) => {
        let claim = this.state.DetailsDTO;
        let name = event.target.name;
        let value = event.target.value;

        claim[name] = value;
        this.setState({ claim });
        if (name === "insurableItem") {
            this.claimAmountTable();
        }
    }

    claimAmount = (event,index) => {
        let claim = this.state.ClaimIntimationDetails;
        let name = event.target.name;
        let value = event.target.value;
        claim[index][name] = value;
        this.setState({ claim });
        this.claimAmountTable();
        console.log("ClaimIntimationDetails ", this.state.ClaimIntimationDetails);
    }

    Proceedfun = () => {

        this.setState({ detailsshow: true });
        this.setState({ buttonshow: true });
    }

    componentDidMount() {
        

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Claim%20Intimated%20By`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
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



        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Insurable%20Item`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ InsurableItemData: data });

                console.log("InsurableItemData", data);
            });


    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("name", evt.target.name);
    };

    showClaimTable = () => {
        document.getElementById('searchTableSec').style.display = 'block';
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
            that.setState({ radioarr: data });
            that.claimTable(data);
            console.log("tabledata: ", that.state.tabledata)
            // that.setState({ Claimdetails: data });

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
                    IN: prop.insuredName,
                    CE: prop.coverEvent,
                    CN: prop.coverName,
                    //claimAmount: <CustomInput labelText="" id="claimAmount"  name="claimAmount"  formControlProps={{ fullWidth: true }
                    //} />,
                    eventDate: new Date(prop.createdDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),

                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.policyNo)} />
                };
            })
        });
    }

    claimAmountTable = () => {
        this.setState({
            ClaimAmountdetailsdata: this.state.ClaimIntimationDetails.map((prop, key) => {
               
                return {
                    id: key+1,
                    insurableItem: prop.insurableItem,
                    insuredName: prop.insuredName,
                    policyNumber: prop.policyNumber,
                    coverEvent: prop.coverEvent,
                    benefitAmount: prop.benefitAmount,
                    claimAmount: <CustomInput labelText="" id="claimAmount" value={this.state.ClaimIntimationDetails[key].claimAmount} name="claimAmount" onChange={(e) => this.claimAmount(e,key)} formControlProps={{ fullWidth: true }
                    } />,
            
                };
            })
        });
    }

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }


    editFunction(id, pid) {
        var pArr = this.state.radioarr;
        var PolicyArr = [];

        $.each(pArr, function (k, v) {
            if (v.policyNo === pid) {
                PolicyArr.push(pArr[id]);
            }
        })
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
        this.state.PolicyStartDate = PolicyArr[0].policyStartDate;
        this.state.PolicyEndDate = PolicyArr[0].policyEndDate;
        this.state.BenefitAmount = PolicyArr[0].sumInsured;
        this.state.DetailsDTO.policyId = PolicyArr[0].policyId;
        console.log("BenefitAmount", this.state.BenefitAmount, this.state.PolicyNumber);
        let claim = this.state.DetailsDTO;
        claim.policyNumber = PolicyArr[0].policyNo;
        claim.emailId = PolicyArr[0].email;
        claim.benefitAmount = PolicyArr[0].sumInsured;
        this.setState({ claim });
        console.log("Productdataid: ", Productdataid);
        this.setState({ sendproductid: Productdataid });
        this.setState({ details: true });
        if (PolicyArr[0].coverEvent === "Death") {
            this.setState({ coverEventshow: true });
        } else {
            this.setState({ coverEventshow: false });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer lg={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={claim} /></Icon>
                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small> Claim Intimate</small>
                            </h4>
                        </CardHeader>

                        <CardBody>
                            <GridContainer lg={12}>
                                <GridItem xs={4} sm={4} md={4}>
                                    <CustomInput
                                        labelText="Policy Number"
                                        name="policynumber"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.policynumber}
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={4} sm={4} md={4}>
                                    <CustomInput
                                        labelText="Insured Ref Number"
                                        name="insuredRefNumber"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.insuredRefNumber}
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={4} sm={4} md={4}>
                                    <CustomInput
                                        labelText="Insured Mobile Number"
                                        name="insuredMobileNumber"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.insuredMobileNumber}
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={4} sm={4} md={4}>
                                    <CustomInput
                                        labelText="Insured Email "
                                        name="insuredEmail"
                                        // required={true}
                                        value={this.state.PolicysearchDTO.insuredEmail}
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={4} sm={4} md={4}>
                                    <CustomDatetime onFocus={this.onClick} labelText="Cover Event Date" id='dtActiveFrom' name='eventDate' onChange={(evt) => this.onDateChange('datetime', 'eventDate', evt)} value={this.state.PolicysearchDTO.eventDate} formControlProps={{ fullWidth: true }} />

                                </GridItem>
                                <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={2}>
                                        <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.showClaimTable}> Search </Button>
                                       
                                    </GridItem>
                                </GridContainer>
                            </GridContainer>
                            <GridContainer justify="center" id="searchTableSec" style={{ display: 'none' }}>
                                <GridItem xs={12}>
                                    <CardBody >
                                        <ReactTable
                                            data={this.state.Claimdetailsdata}
                                            filterable
                                            columns={[
                                                {
                                                    Header: "",
                                                    accessor: "radio",
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
                                            showPaginationBottom
                                            className="-striped -highlight"
                                        />
                                        
                                           <h4>Policy Number: {this.state.PolicyNumber}
                                            <br/>
                                            Policy Start Date: {this.state.PolicyStartDate}
                                            <br/>
                                            Policy End Date: {this.state.PolicyEndDate}
                                        </h4>

                                          {this.state.details && <div>
                                            <ClaimComponent coverEventshow={this.state.coverEventshow} LossIntimatedByData={this.state.LossIntimatedByData} handleChange={this.handleChange} onInputParamChange={this.onInputParamChange} onDateChange={this.onDateChange} DetailsDTO={this.state.DetailsDTO} fields={this.state.fields} details={this.state.details} />
                                            <ClaimAmount InsurableItemData={this.state.InsurableItemData} handleChange={this.handleChange} DetailsDTO={this.state.DetailsDTO} ClaimAmountdetailsdata={this.state.ClaimAmountdetailsdata} classes={classes} fields={this.state.fields} details={this.state.details} />
                                            <BankDetails BankData={this.state.BankData} DetailsDTO={this.state.DetailsDTO} handleChange={this.handleChange} fields={this.state.fields} details={this.state.details} onInputParamChange={this.onInputParamChange} />
                                            <GridContainer lg={12} justify="center">
                                                <GridItem xs={5} sm={3} md={3} lg={2}>
                                                    <Button  color="info" round className={classes.marginRight} onClick={(e) => this.onFormSubmit(e)}> Intimate Claim </Button>
                                                </GridItem>
                                                <br />
                                            </GridContainer>
                                            
                                            {this.state.docpage ?
                                                <Document DocumentData={this.state.DocumentData} claimId={this.state.claimId} handleChange={this.handleChange} DetailsDTO={this.state.DetailsDTO} getUploadParams={this.state.getUploadParams} onChangeStatus={this.state.handleChangeStatus} onSubmit={this.state.handleSubmit} fields={this.state.fields} onInputParamChange={this.onInputParamChange} />
                                                : null}
                                         </div>
                                        }
                                        
                                       
                                    </CardBody>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridContainer>
            </div>
        );
    }


     

}
export default withStyles(styles)(ClaimIntimation);