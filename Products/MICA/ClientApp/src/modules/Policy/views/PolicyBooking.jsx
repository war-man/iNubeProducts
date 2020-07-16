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
import policyConfig from 'modules/Policy/PolicyConfig.js';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import swal from 'sweetalert';
import SearchPolicy from "./SearchPolicy.jsx";
import RateConfig from "modules/Rating/RateConfig.js";
const dateStyle = {
    width: "max-content",
    marginLeft: "170px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}


class PolicyBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setflag:false,
            finalPremiumFlag: false,
            productCode:"",
            RatingId:0,
            searchTableSec: true, loader: true,
            RatingDetails: {},
            result: [],
            productCode: "",
            RatingJson: { "dictionary_rule": {}, "dictionary_rate": { "Tenure": "", "SumInsured": "" } },
            FloterJson: { "dictionary_rule": { "RiskType": "", "HospitalDailyCash": "", "SumInsured": "" }, "dictionary_rate": { "CSPFloaterRate1_Tenure": "", "CSPFloaterRate1_SumInsured": "" } },
            IndividualJson: { "dictionary_rule": { "RiskType": "", "HospitalDailyCash": "", "SumInsured": "" }, "dictionary_rate": { "IndividualRateTable_Tenure1": "", "IndividualRateTable_SumInsured1": "" } },
            Generateflag: false,
            PremiumShow:false,
            show: false,
            productId: "",
            PartnerData: [],
            ProductData: [],
            datalist: [],
            PolicyData: {},
            PolicyData1: [],
            PolicyData1Array: [],
            Policydata: {
                PartnerId: "",
                ProductId: "",

            },
            fields: {

                InsurableItem: []

            },
            datename: [],
            datetime: [],
            datetemp: [],

        };
   
        this.handleTags = this.handleTags.bind(this);
        this.onGet = this.onGet.bind(this);
        this.onInputParamChangeInsurableFields = this.onInputParamChangeInsurableFields.bind(this);
    }
    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }
    onInputParamChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("fieldsdata", fields);
        if (evt.target.name == "Cover Type") {
            if (evt.target.value == "Individual") { this.setState({ RatingId: 85 }); }
            else if (evt.target.value == "Floater") { this.setState({ RatingId: 82 }); }
            else { this.setState({ RatingId: 80 }); }
        }
    };

    onInputParamChangeInsurableItem = (evt) => {
        console.log('Event', evt);
        let field = this.state.fields.InsurableItem;
        field[evt.target.name] = evt.target.value;
        this.setState({ field });
        console.log("fieldsdata", field);
    };

    onInputParamChangeInsurableFields = (evt,index,insIndex) => {
        console.log('Event', evt);
      //  debugger;
        let field = this.state.fields.InsurableItem[index].InsurableFields[insIndex];
        field[evt.target.name] = evt.target.value;
        this.setState({ field });
        console.log("fieldsdata", field);
        console.log("fieldsdata1", this.state.fields)
        this.InusurableName(index);
    };

    InusurableName = (index) => {
        const name = this.state.PolicyData1[0].productRcbInsurableDetails[index].inputType;
        
        console.log("InsurableItemnameData", this.state.PolicyData1[0].productRcbInsurableDetails[index]);
        let InsurableItems = this.state.fields.InsurableItem[index];
        InsurableItems["InsurableName"] =name;
        this.setState({ InsurableItems });
        console.log("fieldsdata111", this.state.fields);
    }


    CoverName = (index, Cindex) => {
        //debugger;
        const name = this.state.PolicyData1[0].productRcbInsurableDetails[index].coverRcbdetails[Cindex].inputType;

        console.log("Covername", name);
        let CoverItem = this.state.fields.InsurableItem[index].Covers[Cindex];
        CoverItem["CoverName"] = name;
        this.setState({ CoverItem });
        console.log("fieldsdata111", this.state.fields);
    }


    onInputParamChangeCover = (evt, index, coverIndex, CFindex) => {
        //debugger;
         
        console.log('Event Cover', index, coverIndex);
        console.log("fulldata", this.state.fields.InsurableItem[index])
        let field = this.state.fields.InsurableItem[index].Covers[coverIndex].CoverFields[CFindex];
        console.log('Event Cover field', field);
        field[evt.target.name] = evt.target.value;
        this.setState({ field });
        console.log("fieldsdata", field);
        this.CoverName(index, coverIndex);
       // coverIndex = coverIndex + 1;

    };

    onInputPolicyChange = (evt) => {
        const f= this.state.Policydata;
        f[evt.target.name] = evt.target.value;
        this.setState({ f});
        if (evt.target.name == "PartnerId") {


            fetch(`${policyConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + evt.target.value, {
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
        if (evt.target.name == "ProductId") {
            this.GetProductbyID(this.state.Policydata.ProductId)
        }
    };
    onFormSubmit = (evt) => {
        

        for (var i = 0; i <= this.state.datename.length - 1; i++) {

            this.state.fields[this.state.datename[i]] = this.state.datetime[i];
        }
        console.log("submittested", this.state.fields);
     //   console.log("submitJSON", this.state.fields.JSON());
          //fetch(`https://localhost:44351/api/Policy/CreateMultiCoverPolicy  `, {
        fetch(`${policyConfig.PolicyconfigUrl}/api/Policy/CreateMultiCoverPolicy`, {
            method: 'POST',
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

                swal({


                    //let res = partnerId.toString();
                    text: data.responseMessage,
                    icon: "success"
                });
            } else if (data.status == 8) {
                swal({



                    text: data.responseMessage,
                    icon: "error"
                });
            }
            else {

                swal({

                    text: data.errors[0].errorMessage,
                    icon: "error"
                });
            }
        });

        for (var i = 0; i <= this.state.datename.length - 1; i++) {

            this.state.fields[this.state.datename[i]] = this.state.datetemp[i];
            console.log("submit1", this.state.fields);
            this.state.datetemp[i] = "";
            console.log("submit2", this.state.datetemp[i]);
        }
    };
    onDateChange = (type, name, event) => {
        console.log("event", event);
        console.log("name", name);
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        console.log("today", today);
        console.log("date", date);
        if (type == 'Datetime') {
            let fields = this.state.fields;
            fields[name] = date;
            this.setState({ fields });
        }

        if (this.state.datename.length == 0) {
            this.state.datename.push(name);
            this.state.datetemp.push(date);
            this.state.datetime.push(this.datechange(date));
        } else {
            for (var i = 0; i <= this.state.datetime.length - 1; i++) {
                if (this.state.datename[i] !== name) {
                    this.state.datename.push(name);
                    this.state.datetemp.push(date);
                    this.state.datetime.push(this.datechange(date));
                }
            }
        }

        console.log("datetime", this.state.fields);


    };
    onGet() {
      

        if (this.state.fields.ProductId !== "" && this.state.fields.PartnerId !== "") {
          
            // fetch(`https://localhost:5001/api/Product/GetInsurableRiskDetails?ProductId` + this.state.fields.ProductId,{
            fetch(`${policyConfig.productConfigUrl}/api/Product/GetInsurableRiskDetails?ProductId=` + this.state.Policydata.ProductId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
              
                    console.log("PolicyData", this.state.PolicyData);
                    debugger;
                   
                    this.setState({ PolicyData: data, show: true });
                    console.log("PolicyData", this.state.PolicyData, this.state.fields);
                    const len = data.productRcbInsurableDetails.length;
                    for (var i = 0; i < len; i++) {
                        // Object for Cover
                        this.state.fields.InsurableItem = this.state.fields.InsurableItem.concat({
                            InsurableName: "",
                            InsurableFields: [{}],
                            Covers: [{}],
                        });
                    }
                    this.setState({});
                    console.log("arraydata",  this.state.fields.InsurableItem);
                    console.log("FieldTest", this.state.fields);

                });
        } else {
            swal("", "Some field are missing!", "error");
        }
       
    }
    componentDidMount() {
        fetch(`${policyConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ PartnerData: data });
            });
        fetch(`${policyConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=Product`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductData: data });



            });

      
    }
    onGet1() {

        //fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/MastertypeData/GetMasterData`)
        // fetch(`${policyConfig.productConfigUrl}/api/Product/GetInsurableRiskDetails?ProductId=` + this.state.productId, {
        fetch(`${policyConfig.productConfigUrl}/api/Product/GetInsurableRiskDetails?ProductId=` + this.state.Policydata.ProductId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("MasterDto:", data);
                //this.leadTable(data);

                console.log("Policydata1", this.state.PolicyData1)
                var arr = [];
                arr.push(data)
                this.setState({ PolicyData1: arr, show: true });
                const len = this.state.PolicyData1[0].productRcbInsurableDetails.length
                console.log("data1", this.state.PolicyData1[0].productRcbInsurableDetails)
                for (var i = 0; i < len; i++) {
                    // Object for Cover
                    this.state.fields.InsurableItem= this.state.fields.InsurableItem.concat({
                        InsurableName: this.state.PolicyData1[0].productRcbInsurableDetails[i].inputType,
                        InsurableFields: [{}],
                        Covers: [],
                    });
                    
                   
                }
                this.setState({});
                for (var i = 0; i < len; i++) {
                    const Coverlen = this.state.PolicyData1[0].productRcbInsurableDetails[i].coverRcbdetails.length;
                    for (var j=0; j < Coverlen; j++) {
                    
                        this.state.fields.InsurableItem[i].Covers = this.state.fields.InsurableItem[i].Covers.concat({
                            CoverName: "",
                            CoverFields: [{}],
                        });
                    }
                    console.log("arraydataloop", arr, this.state.fields.InsurableItem);

                }
                let field = this.state.fields;

                field["Partner ID"] = this.state.Policydata.PartnerId;

                field["Product Code"] = this.state.productCode;

                this.setState({ field, setflag: true});
              
                console.log("arraydata", arr, this.state.fields);
               
            });

       
     
    }
    GetProductbyID = (id) =>  {

    fetch(`${policyConfig.productConfigUrl}/api/Product/GetProductById?productId=` + this.state.Policydata.ProductId, {
        //   fetch(`https://localhost:44347/api/Product/GetProductById?productId=` + this.props.sendproductid,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        },
    })
        .then(response => response.json())
        .then(data => {

            if (data.productCode != undefined) {

                this.state.productCode = data.productCode;
                
            }
            if (data.ratingId > 0) {
                this.setState({ PremiumShow: true, Generateflag: false, RatingId: data.ratingId });
            } else {
                this.setState({ PremiumShow: false, Generateflag: true, RatingId: 0 });
            }


            console.log("data search by id", data, this.state.productCode, this.state.fields)
        });
}
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    getPremiumCalculation = () => {
        
        if (this.state.fields["Policy Tenure"] != undefined) {
            this.state.RatingJson.dictionary_rate.Tenure = this.state.fields["Policy Tenure"];
            this.state.FloterJson.dictionary_rate.CSPFloaterRate1_Tenure = this.state.fields["Policy Tenure"];
            this.state.IndividualJson.dictionary_rate.IndividualRateTable_Tenure1 = this.state.fields["Policy Tenure"];
        }
        if (this.state.fields["Sum Insured"] != undefined) {
            this.state.RatingJson.dictionary_rate.SumInsured = this.state.fields["Sum Insured"];
            this.state.FloterJson.dictionary_rate.CSPFloaterRate1_SumInsured = this.state.fields["Sum Insured"];
            this.state.IndividualJson.dictionary_rate.IndividualRateTable_SumInsured1 = this.state.fields["Sum Insured"];
            this.state.IndividualJson.dictionary_rule.SumInsured = this.state.fields["Sum Insured"];
            this.state.FloterJson.dictionary_rule.SumInsured = this.state.fields["Sum Insured"];
        }
        if (this.state.fields["Risky Type"] != undefined) {
            this.state.IndividualJson.dictionary_rule.RiskType = this.state.fields["Risky Type"];
            this.state.FloterJson.dictionary_rule.RiskType = this.state.fields["Risky Type"];
        }
        if (this.state.fields["Hospital Daily Cash"] != undefined) {
            this.state.IndividualJson.dictionary_rule.HospitalDailyCash = this.state.fields["Hospital Daily Cash"];
            this.state.FloterJson.dictionary_rule.HospitalDailyCash = this.state.fields["Hospital Daily Cash"];
        }
        let data = {};
        if (this.state.RatingId == 82) {
            data = this.state.FloterJson;
        } else if (this.state.RatingId == 85) {
            data = this.state.IndividualJson;
        } else {
            data = this.state.RatingJson;
        }
      
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/` + this.state.RatingId, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                if (data.length > 0) {

                    this.setState({ result: data });
                    this.setState({ loader: false });
                   // this.tabledata();
                    let finalpremium = data.filter(s => s.entity == "FinalPremium");
                    if (finalpremium.length > 0) {
                        let fields = this.state.fields;
                        fields["permiumamount"] = finalpremium[0].eValue;
                        this.setState({ fields });
                        
                        this.setState({ RatingDetails: finalpremium[0], finalPremiumFlag: true, Generateflag: true });

                    }

                    //swal({
                    //    text: "Rate:" + data.responseMessage,
                    //    icon: "success"
                    //});

                    //  this.reset();
                }
                else {
                    this.setState({ loader: false, searchTableSec: false, nodata: false });
                    swal({
                        text: "Conditions are wrong",
                        icon: "error"
                    });
                }

                console.log(this.state.result, 'Results');
            });
       
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer xs={12}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Policy Booking </small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <MasterDropdown
                                            labelText="Partner Name "
                                            id="ddlstatus"
                                            lstObject={this.state.PartnerData}
                                            filterName='Partner'
                                            value={this.state.Policydata.PartnerId}
                                            name='PartnerId'
                                            onChange={this.onInputPolicyChange}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <MasterDropdown
                                            labelText="Product Name"
                                            id="ddlstatus"
                                            lstObject={this.state.ProductData}
                                            filterName='Product'
                                            value={this.state.Policydata.ProductId}
                                            name='ProductId'
                                            onChange={this.onInputPolicyChange}
                                            formControlProps={{ fullWidth: true }} />

                                    </GridItem>

                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button id="round"
                                            style={{ marginTop: '25px' }}
                                            onClick={() => this.onGet1()}
                                            color="info" >   Get Risk Details  </Button>
                                    </GridItem>

                                </GridContainer>
                              
                                {this.state.show && this.state.setflag && <GridContainer>
                                     <GridContainer>
                                        <GridItem>
                                            <h4><small> Product Level </small></h4>
                                        </GridItem>
                                      </GridContainer>
                                    
                                    {this.state.PolicyData1[0].productRcbDetails.map((item, index) =>
                                      
                                        <GridItem xs={12} sm={12} md={4} key={index}>
                                            {(item.userInputType != "datetime") ?
                                                <CustomInput labelText={item.inputType}
                                                    // value={item.paramName}
                                                    name={item.inputType}
                                                    onChange={(e) => this.onInputParamChange(e)}
                                                    inputProps={{
                                                        //type: "number"
                                                    }}
                                                    formControlProps={{ fullWidth: true }} /> :
                                                <CustomDatetime labelText={item.inputType} name={item.inputType} value={this.state.fields[item.inputType]} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} value={this.state.fields[item.inputType]} formControlProps={{ fullWidth: true }} />
                                            }
                                        </GridItem>
                                    )}

                                    
                                        <GridContainer>
                                            <GridItem>
                                                <h4><small> Insurable Item Details </small></h4>
                                            </GridItem>
                                        </GridContainer>

                                        {this.state.PolicyData1[0].productRcbInsurableDetails.map((item, index) =>
                                        <GridContainer>
                                           
                                            <GridItem xs={12} sm={12} md={12}>

                                                            <h5><b>{item.inputType}</b></h5>

                                                        </GridItem>
                                          
                                                
                                                    {item.insurableChildRcbdetail.map((prop, key) =>

                                                        <GridItem xs={12} sm={12} md={4} key={key}>
                                                    {(prop.userInputType != "datetime") ?
                                                                <CustomInput labelText={prop.inputType}
                                                                    // value={item.paramName}
                                                                    name={prop.inputType}
                                                                    onChange={(e) => this.onInputParamChangeInsurableFields(e, index, 0)}
                                                                    inputProps={{
                                                                        //type: "number"
                                                                    }}
                                                                    formControlProps={{ fullWidth: true }} /> :
                                                                <CustomDatetime labelText={prop.inputType} name={prop.inputType} value={this.state.fields[prop.inputType]} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} value={this.state.fields[prop.inputType]} formControlProps={{ fullWidth: true }} />
                                                            }

                                                        </GridItem>
                                            )}

                                        


                                           
                                            <GridItem xs={12} sm={12} md={12}>
                                                    <h4><small> Cover level details </small></h4>
                                                </GridItem>
                                          
                                            {item.coverRcbdetails.map((prop1, key1) =>
                                                
                                          

                                                <GridItem xs={12} sm={12} md={12}>
                                                    <GridItem xs={12} sm={12} md={12}>
                                                                        <h5><b>{prop1.inputType}</b></h5>
                                                    </GridItem>
                                                    <GridContainer>      
                                                        
                                                        
                                                                {prop1.coverChildRcbdetail.map((prop2, key2) =>

                                                                <GridItem xs={12} sm={12} md={4} key={key2}>
                                                                {(prop1.userInputType != "datetime") ?
                                                                        <CustomInput labelText={prop2.inputType}
                                                                            // value={item.paramName}
                                                                            name={prop2.inputType}
                                                                            onChange={(e) => this.onInputParamChangeCover(e, index, key1,0)}
                                                                            inputProps={{
                                                                                //type: "number"
                                                                            }}
                                                                            formControlProps={{ fullWidth: true }} /> :
                                                                        <CustomDatetime labelText={prop2.inputType} name={prop2.inputType} value={this.state.fields[prop2.inputType]} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} value={this.state.fields[prop2.inputType]} formControlProps={{ fullWidth: true }} />
                                                                    }

                                                                </GridItem>
                                                        )}
                                                        </GridContainer>
                                                </GridItem>
                                               
                                                )}
                                            </GridContainer>
                                        
                                        )}

                                    

                                    {this.state.PremiumShow ? <GridContainer> <GridItem xs={3} sm={3} md={3}>
                                        <Button id="round" style={{ marginTop: '25px', 'left': '169%' }} onClick={() => this.getPremiumCalculation()} color="info" > Calculate Premium </Button>
                                    </GridItem> </GridContainer>:null}
                                    {this.state.finalPremiumFlag && <GridContainer><GridItem xs={3} sm={3} md={6}><h5><b>Final Premium: {this.state.RatingDetails.eValue}/-</b></h5></GridItem></GridContainer>}
                                    {this.state.Generateflag && <GridContainer><GridItem xs={3} sm={3} md={3}>
                                        <Button id="round" style={{ marginTop: '25px', 'left': '173%' }} onClick={() => this.onFormSubmit()} color="info" > Generate Policy  </Button>
                                    </GridItem></GridContainer>}
                                </GridContainer>
                                }
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}
//export default PolicyBooking;
export default withStyles(loginPageStyle)(PolicyBooking);
//export default connect(null, null)(withStyles(extendedFormsStyle)(PolicyBooking));





