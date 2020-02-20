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
const dateStyle = {
    width: "max-content",
    marginLeft: "170px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}


class SearchPolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            PartnerData: [],
            ProductData: [],
            datalist: [],
            PolicyData: [],
            Policydata: {
                PartnerId: "",
                ProductId: "",
                datetime: ""
            },
            fields: {

            },
        };
        this.handleTags = this.handleTags.bind(this);
    }


    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }
    onInputParamChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onInputPolicyChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.Policydata;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onFormSubmit = (evt) => {
        console.log("submit", this.state.fields);
        fetch(`${policyConfig.policyConfigUrl}/api/Policy/CreatePolicy`, {
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
                //     swal("Perfect!", "SucessFully Save!", "success");
                swal({


                    //let res = partnerId.toString();
                    text: data.responseMessage,
                    icon: "success"
                });
            } else if (data.status == 8) {
                //  swal("Failed!", "error!", "error");
                swal({


                    //let res = partnerId.toString();
                    text: data.errors[0].errorMessage,
                    icon: "error"
                });
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
    onGet() {
        //  fetch(`https://localhost:44347/api/Product/GetProductRiskDetails?ProductId=` + this.state.fields.ProductId)
        fetch(`${policyConfig.productConfigUrl}/api/Product/GetProductRiskDetails?ProductId=` + this.state.fields.ProductId, {
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
                console.log(this.state.PolicyData);
            });


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
    onInputPolicyChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.Policydata;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
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

    };

    render() {
        const { classes } = this.props;
        return (
            <div >
                <GridContainer>
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
                                        <MasterDropdown labelText="Partner " id="ddlstatus" lstObject={this.state.PartnerData} filterName='Partner' value={this.state.Policydata.PartnerId} name='PartnerId' onChange={this.onInputPolicyChange} formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <MasterDropdown labelText="Product " id="ddlstatus" lstObject={this.state.ProductData} filterName='Product' value={this.state.Policydata.ProductId} name='ProductId' onChange={this.onInputPolicyChange} formControlProps={{ fullWidth: true }} />

                                    </GridItem>

                                    <Button onClick={() => this.onGet()}
                                        color="info"
                                        size="sm"
                                    >
                                        Get Risk Details
                                </Button>


                                </GridContainer>


                                <GridContainer>
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
                                                <CustomDatetime labelText={item.inputType} name={item.inputType} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} value={this.state.fields} formControlProps={{ fullWidth: true }} />
                                            }
                                        </GridItem>



                                    )}

                                    <Button onClick={() => this.onFormSubmit()}
                                        color="info"
                                        size="sm"
                                    >
                                        Generate Policy
                                </Button>
                                </GridContainer>
                            </CardBody>
                        </Card>

                    </GridItem>
                </GridContainer>
                
            </div>
        );
    }
}

export default withStyles(loginPageStyle)(SearchPolicy);






