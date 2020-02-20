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
import {Animated} from "react-animated-css";
import ClaimComponent from "./ClaimComponent.jsx";
import MyUpload from "./MyUpload.jsx";
const dateStyle = {
    width: "max-content",
    marginLeft: "170px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}


class ClaimIntimate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documentshow: false,
            coverEventshow: false,
            Claimdetailsdata: [],
            LossIntimatedByData: [],
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
            claimsdata: {
                // PartnerId: "",
                // ProductId: "",
                //policynumber: "",
                //insuredRefNumber: "",
                //insuredMobileNumber: "",
                //insuredEmail: "",
                //eventDate: "",
                //coverEvent: "",
                //coverName: "",
                //insuredName: ""

            },
            show: false,
            fields: {
                lol: "",
                lod: "",
                mobilenumber: "",
                LossofDate: "",
                BeneficiaryName: "",
                LossIntimatedId: ""
            },
            PolicysearchDTO: {
                policynumber: "",
                insuredRefNumber: "",
                insuredName: "",
                insuredMobileNumber: "",
                insuredEmail: "",
                eventDate: "",
                coverEvent: "",
                coverName: "",

            }
        };
        this.handleTags = this.handleTags.bind(this);
    }
    SetValue = event => {
        //this.setState({ [event.target.name]: event.target.value });
        //if (event.target.name === "policynumber") {
        //    this.setPolicyValue(event);
        //}
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

                    //let ProductData = this.state.ProductData;
                    //ProductData = data;

                    this.setState({ ProductData: data });
                    console.log("ProductDatalist", this.state.ProductData);
                });

        }
    };
    onFormSubmit = (evt) => {
        this.setState({documentshow:true});
        console.log("submit", this.state.fields);
        console.log("submit JSON", JSON.stringify(this.state.fields));
        //
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/CreateClaim`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.fields)
        }).then(function (response) {
            return response.json();
        }).then(data => {

            if (data.status == 2) {
                //     swal("Perfect!", "SucessFully Save!", "success");
                swal({

                    //   title: "Perfect",
                    //let res = partnerId.toString();
                    text: data.responseMessage,
                    icon: "success"
                });
            } else if (data.status == 8) {
                //  swal("Failed!", "error!", "error");
                swal({

                    title: "Failed",
                    //let res = partnerId.toString();
                    text: data.errors[0].errorMessage,
                    icon: "error"
                });
            } else if (data.status == 7) {
                //  swal("Failed!", "error!", "error");
                swal({

                    title: "Failed",
                    //let res = partnerId.toString();
                    text: data.errors[0].errorMessage,
                    icon: "error"
                })
            }
        });


    };
    onDateChange = (type, name, event) => {
        console.log("event", event);
        console.log("name", name);
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log("today", today);
        console.log("date", date);
        if (type == 'Datetime') {
            let fields = this.state.fields;
            fields[name] = date;
            this.setState({ fields });
        }


        console.log("datetime", this.state.fields);


    };
    onGet = () => {
        if (this.state.sendproductid != "") {
            console.log("this.state.sendproductid", this.state.sendproductid);
            //  debugger;
            console.log("this.state.sendproductid", this.state.sendproductid);

            // fetch(`https://localhost:44347/api/Product/GetProductClaimsDetails?ProductId=` + this.state.sendproductid)
            fetch(`${ClaimConfig.productConfigUrl}/api/Product/GetProductClaimsDetails?ProductId=` + this.state.sendproductid, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ PolicyData: data });
                    console.log("claims data", this.state.PolicyData);
                });
            this.setState({ show: true });
        }
    }
    componentDidMount() {



        fetch(`${ClaimConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`)
            .then(response => response.json())
            .then(data => {
                this.setState({ PartnerData: data });
            });
        fetch(`${ClaimConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=Product`)
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductData: data });
            });

        /////////////////////////////////////////////////////////////////////////////////////////////

        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=Claim%20Intimated%20By`, {
            method: 'GET',
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


    }
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("name", evt.target.name);
    };

    showClaimTable = () => {
        document.getElementById('searchTableSec').style.display = 'block';
        console.log("PolicysearchDTO",this.state.PolicysearchDTO);
        let that = this;
        fetch(`${ClaimConfig.policyConfigUrl}/api/Policy/PolicySearch`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.PolicysearchDTO)
        }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log('Response data', data);
        that.setState({ radioarr: data });
        that.claimTable(data);
        // that.setState({ Claimdetails: data });
    });


    //fetch(`https://localhost:44351/api/Policy/PolicySearch` + this.state.PolicysearchDTO)
    //    .then(response => response.json())
    //    .then(data => {
    //        this.setState({ Claimdetails: data });
    //        console.log("policy data", data, this.state.Claimdetails);



    //    });
}

claimTable = (data) => {
    this.setState({
        Claimdetailsdata: data.map((prop, key) => {
            const { classes } = this.props;
            return {
                id: key,
                PolicyNo: prop.policyNo,
                IRN: prop.customerId,
                IN: prop.insuredName,
                CE: prop.coverEvent,
                CN: prop.coverName,
                eventDate:new Date(prop.createdDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.policyNo)} />
            };
        })
    });
}
handleRadioChange(event){
    this.setState({ selectedValue: event.target.value });
}
onDateChange = (formate,name, event) => {
    const { validdate } = this.state;
    this.setState({ validdate: false });

    var today = event.toDate();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var date2 = new Date();
    var date1 = new Date(today);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var datediff = this.state.date;
    datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var datediff = -Math.abs(datediff - 1);
    this.setState({ datediff });
    const fields = this.state.fields;
    fields[name] = date;
    this.setState({ fields });
    console.log("after change", this.state.PolicysearchDTO.eventDate)

   

};

editFunction(id, pid) {
    console.log("pid", pid);

    var pArr = this.state.radioarr;
    var PolicyArr = [];

    $.each(pArr, function (k, v) {
        if (v.policyNo === pid) {
            PolicyArr.push(pArr[id]);
        }
    })
    console.log("PolicytArr", PolicyArr);
    const Productdataid = PolicyArr[0].productIdPk;
    console.log("Productdataid: ", Productdataid);
    this.setState({ sendproductid: Productdataid });
    if (PolicyArr[0].coverEvent === "Death") {
        this.setState({ coverEventshow: true });
    } else {
        this.setState({ coverEventshow: false });
    }
    // this.setState({ sendproductlist: ProductArr });

}
render() {
    const { classes } = this.props;
    return (
        <div>
           

           <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={claim} /></Icon>
                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                            <small> Claim Intimate</small>
                        </h4>
                    </CardHeader>
                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                    <CardBody>




                        <GridContainer lg={12}>
                        <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Policy Number"
                                    name="policynumber"
                                    // required={true}
                                    value={this.state.PolicysearchDTO.policynumber}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Insured Ref Number"
                                    name="insuredRefNumber"
                                    // required={true}
                                    value={this.state.PolicysearchDTO.insuredRefNumber}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Mobile Number"
                                    name="insuredMobileNumber"
                                    // required={true}
                                    value={this.state.PolicysearchDTO.insuredMobileNumber}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Insured Email "
                                    name="insuredEmail"
                                    // required={true}
                                    value={this.state.PolicysearchDTO.insuredEmail}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime labelText="Event Date" id='dtEventDate' name='eventDate' onChange={(evt) => this.onDateChange('datetime', 'eventDate', evt)} value="" formControlProps={{ fullWidth: true }} />
                            </GridItem>
                            
                        </GridContainer>
                        <GridContainer lg={12} justify="center">
                        <GridItem xs={5} sm={2} md={3} lg={1} >
                                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                    <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.showClaimTable}> Search </Button>
                                </Animated>
                                </GridItem>
                            </GridContainer>

                        <GridContainer justify="center" id="searchTableSec" style={{ display: 'none' }}>


                            <GridItem xs={12}>

<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
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
                                                /* minWidth: 150,
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {

                                                Header: "Insured Ref Number",
                                                accessor: "IRN",
                                                minWidth: 80,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },

                                            {
                                                Header: "Insured Name",
                                                accessor: "IN",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
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
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                            },

                                            {

                                                Header: "Cover Name",
                                                accessor: "CN",
                                                minWidth: 70,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },

                                            {
                                                Header: "Event Date",
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





                                    <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={2} md={3} lg={1} >
                                            <Button className="intimation-bnt" color="info" round  onClick={this.onGet}> Intimate Claim </Button>
                                        </GridItem>
                                    </GridContainer>


                                    {this.state.show && 
                                   <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                   <GridContainer lg={12}>
                                            
                                        {this.state.PolicyData.map((item, index) =>
                                            <GridItem xs={12} sm={12} md={4} key={index}>
                                                {(item.userInputType != "datetime") ?
                                                    <CustomInput labelText={item.inputType}
                                                        // value={item.paramName}
                                                        name={item.inputType}
                                                        onChange={this.onInputParamChange}
                                                        inputProps={{
                                                            //type: "number"
                                                        }}
                                                        formControlProps={{ fullWidth: true }} /> :
                                                    <CustomDatetime labelText={item.inputType} name={item.inputType} value={this.state.fields[item.inputType]} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} formControlProps={{ fullWidth: true }} />

                                                }

                                            </GridItem>

                                        )}
                                        <GridItem xs={12} lg={12} md={12} sm={12}>
                                        
                                        <ClaimComponent coverEventshow={this.state.coverEventshow} LossIntimatedByData={this.state.LossIntimatedByData} onInputParamChange={this.onInputParamChange} onDateChange={this.onDateChange} fields={this.state.fields} />

 </GridItem>
                                        <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={2} md={3} lg={1} >
                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Button round onClick={() => this.onFormSubmit()} color="info"  > Proceed </Button>
                                            </Animated>
                                        </GridItem>
                                        </GridContainer>

                                        {this.state.documentshow && 
                                         
                                        <GridContainer  className="fileupload" lg={12} justify="center"> <br/> <br/> 
                                        
                                        <GridItem xs={6}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <MyUpload  /> 
                                        </Animated>
                                        </GridItem>
                                        
                                        </GridContainer>
                                          }

                                    
                                    </GridContainer>
                                    
</Animated>
                                    }

                                </CardBody>
</Animated>
                            </GridItem>

                        </GridContainer>
                    </CardBody>
</Animated>
                </Card>
</Animated>
            
        </div>
    );
}
}

export default withStyles(loginPageStyle)(ClaimIntimate);






