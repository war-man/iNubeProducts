import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchInvoice from "../Invoice/SearchInvoice";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Modal from '@material-ui/core/Modal';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import BillingConfig from 'modules/Billing/BillingConfig.js';
import swal from 'sweetalert';
import Edit from "@material-ui/icons/Edit";
import $ from 'jquery';
import Delete from "@material-ui/icons/Delete";
import SearchCustomer from "./_SearchCustomer";
import { Animated } from "react-animated-css";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import DocumentUpload from "./DocumnetUpload.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox.jsx";
import UserConfig from "modules/Users/UserConfig.js";
import { object } from "prop-types";











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
const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}

class Provision extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Insurancecertificate: "Policy",
            apikit: "ApiKit",
            invoice: "Invoice",
            csettings: [],
            // radiolist1: [{ cob: null, disable: false, label: null, lob: null, mID: 0, mIsRequired: false, mType: "Type", mValue: "Yes", planCode: null, selectedValue: 0, value: null }, { cob: null, disable: false, label: null, lob: null, mID: 1, mIsRequired: false, mType: "Type", mValue: "No", planCode: null, selectedValue: 0, value: null }],
            showdatabase: false,
            showNotificationTemplate: false,
            showMailConfig: false,
            CustomersDTO: {
                "customerId": 0,
                "customerName": "",
                "contractName": "",
                "contractNo": "",
            },
            searchData:[],
            Provision: {

            },
            EnvProvision: {

            },
            searchContractTable: false,
            sendCustomerid: 0,
            sendCustomerName: "",
            searchCustomerTable: false,
            CustomerConfigDto: {
                "custConfigId": "",
                "customerId": "",
                "taxSetupId": "",
                "currencyId": "",
                "image": "",
                "pdfTemplateName": "",
                "themeId": "",
                "environmentSetupid": "",
                "createdBy": "",
                "modifiedDate": "",
                "isActive": ""
            },
            CustomerProvisioningDTO: {

                customerId: "",
                "customerSettings": [],
                "customerEnvironmentDTOs": [],

            },
            customerSettings:
            {
                customerId: "",
                type: "",
                key: "",
                keyValue: "",
                isActive: true,
                createdDate: "",
                modifiedDate: ""
            },
            customerEnvironmentDTOs: {
                customerId: "",
                envName: "",
                name: "",
                dbconnection: "",
                isActive: true,
                createdDate: "",
                modifiedDate: "",
                product: ""
            },
            Configdata: {},
            masterList: [],
            configId: 0,
            customerID: "",
        };

    }



    componentDidMount() {
        fetch(`${UserConfig.UserConfigUrl}/api/CustomerProvisioning/GetMaster?lMasterlist=qwer&isFilter=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("ddd", data);
                this.setState({ masterList: data });
                console.log("masdata", this.state.masterList);
            });


    }

    handleSearchCustomer = (event) => {
        debugger;
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CustomerSearch`, {
            method: 'POST',
            body: JSON.stringify(this.state.CustomersDTO),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {

                console.log("data save result:", data);
                this.setState({ searchData: data });
                if (this.state.searchData.length > 0) {
                    // document.getElementById('searchContractTable').style.display = 'block';
                    this.setState({ searchCustomerTable: true });
                    this.customerTable(data);
                }
            });

    }

    customerTable = (rows) => {

        console.log("contracttable", this.state.CustomersDTO);
        this.setState({
            customerdata: rows.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    CustomerId: prop.customerId,
                    CustomerName: prop.customerName,
                    ContractName: prop.contractName,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.customerId, prop.customerName)} />
                };
            })
        });
    }


    editFunction(id, cId) {
        var orgArr = this.state.searchData;
        console.log("cust:", this.state.searchData);
        var contArr = [];
        $.each(orgArr, function (k, v) {
            if (v.customerId == cId) {
                contArr.push(orgArr[id]);
            }
        })
        console.log("ContArr", contArr);
        this.state.selectedRow = contArr;
        const custid = contArr[0].customerId;
        const custname = contArr[0].customerName
        console.log("billingdataid: ", custid);
        this.setState({ sendCustomerid: custid });
        this.setState({ customerID: custid });
        this.setState({ sendCustomerName: custname });
        //this.state.customerSettings.customerId = custid;
        this.state.CustomerProvisioningDTO.customerId = custid;
        this.setState({});
        console.log("Custid1", this.state.CustomerProvisioningDTO.customerId);
    };
    SetCustomer = ((type, event) => {
        console.log("customerdto", this.state.CustomersDTO);
        event.preventDefault();
        let CustomersDTO = this.state.CustomersDTO;
        let name = event.target.name;
        let value = event.target.value;
        CustomersDTO[name] = value;
        this.setState({ CustomersDTO });
    });
    handleOK = () => {
        this.setState({ searchCustomerTable: false });
        console.log("customerprops", this.state.selectedRow);
        if (this.state.sendCustomerid !== "") {
            this.setState({ search: true });

        }
    }
    handleSaveCustConfig = () => {
        debugger;
        console.log("sbmitted data: ", this.state.CustomerProvisioningDTO);
        if (this.state.CustomerProvisioningDTO.customerId != "") {

            for (let i = 0; i < this.state.CustomerProvisioningDTO.customerSettings.length; i++) {
                this.state.CustomerProvisioningDTO.customerSettings[i].customerId = this.state.CustomerProvisioningDTO.customerId;
                this.setState({});
            }

            fetch(`${UserConfig.UserConfigUrl}/api/CustomerProvisioning/CreateCustomerProvision`, {
                method: 'POST',
                body: JSON.stringify(this.state.CustomerProvisioningDTO),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                        swal({
                                text: data.responseMessage,
                                icon: "success"
                            });
                    } else if (data.status == 7) {
                        swal({
                                text: data.responseMessage,
                                icon: "error"
                            });
                    } else {
                        swal({
                                text: data.responseMessage,
                                icon: "error"
                            });
                    }
                    console.log("data save result:", data);
                });
        } else {
            swal(
                {
                    text: "Please select Customer",
                    icon: "error"

                }
            );
        }
    }
    SetConfig = ((type, event) => {
        event.preventDefault();

        let customerSettings = Object.assign({}, this.state.customerSettings);
        let name = event.target.name;
        let value = event.target.value;
        customerSettings[name] = value;
        customerSettings['type'] = type;
        customerSettings['key'] = name;
        customerSettings['keyValue'] = value;
        //event.currentTarget.innerText;



        if (this.state.CustomerProvisioningDTO.customerSettings.length == 0) {
            this.state.CustomerProvisioningDTO.customerSettings.push(customerSettings);
        }
        else
            if (this.state.CustomerProvisioningDTO.customerSettings.filter(s => s.key == name).length > 0 && this.state.CustomerProvisioningDTO.customerSettings.filter(s => s.keyValue == value).length > 0) {

            } else {

                this.state.CustomerProvisioningDTO.customerSettings.push(customerSettings);
            }

        this.setState({ customerSettings });
        console.log("dto666", this.state.customerSettings, this.state.CustomerProvisioningDTO.customerSettings);
    });

    SetProvisionValue = (event) => {

        let Provision = this.state.Provision;
        let name = event.target.name;

        let checked = event.target.checked;
        Provision[name] = checked;

        this.setState({ Provision });
        console.log("Provision: ", this.state.Provision);
        //if (checked == true) {
        //    this.state.customerSettings.isActive = true;
        //}
        //else {
        //    this.state.customerSettings.isActive = false;
        //}
    }

    SetEnvProvisionValue = (event) => {
        let EnvProvision = Object.assign({}, this.state.customerEnvironmentDTOs);
        let name = event.target.name;
        let value = event.target.checked;
        EnvProvision['envName'] = name;


        if (this.state.CustomerProvisioningDTO.customerEnvironmentDTOs.filter(s => s.envName == name).length > 0) {
            //if value is already selected 
            const sp = this.state.CustomerProvisioningDTO.customerEnvironmentDTOs.findIndex(p => p.envName == name);
            this.state.CustomerProvisioningDTO.customerEnvironmentDTOs[sp].envName = name;
        } else {

            this.state.CustomerProvisioningDTO.customerEnvironmentDTOs.push(EnvProvision);
        }

        if (value == false) {

            const sp = this.state.CustomerProvisioningDTO.customerEnvironmentDTOs.findIndex(p => p.envName == name);
            this.state.CustomerProvisioningDTO.customerEnvironmentDTOs.splice(sp, 1);
        }
        this.setState({ EnvProvision });
        console.log("EnvProvision: ", this.state.CustomerProvisioningDTO.customerEnvironmentDTOs);
    }


    onInputChange = (type, event) => {
        let customerSettings = Object.assign({}, this.state.customerSettings);
        // let customerSettings = this.state.customerSettings;
        let name = event.target.name;
        let value = event.target.value;
        //customerSettings[name] = value;
        customerSettings['type'] = type;
        customerSettings['key'] = name;
        customerSettings['keyValue'] = value;

        if (this.state.CustomerProvisioningDTO.customerSettings.filter(s => s.key == name).length > 0) {
            //if value is already selected 
            const sp = this.state.CustomerProvisioningDTO.customerSettings.findIndex(p => p.key == name);
            this.state.CustomerProvisioningDTO.customerSettings[sp].keyValue = value;
        } else {

            this.state.CustomerProvisioningDTO.customerSettings.push(customerSettings);
        }

        //this.setState({ customerSettings });
        console.log("dto00000", this.state.customerSettings, this.state.CustomerProvisioningDTO.customerSettings);
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} lg={12}>

                        <SearchCustomer CustomersDTO={this.state.CustomersDTO} handleSearchCustomer={this.handleSearchCustomer} customerdata={this.state.customerdata} SetCustomer={this.SetCustomer} handleOK={this.handleOK} searchCustomerTable={this.state.searchCustomerTable} />
                        <br />
                        <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                            <Card>

                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" /></Icon>
                                    </CardIcon>
                                    {
                                        <GridItem>
                                            <h4><small>Customer Provisioning</small></h4>

                                        </GridItem>
                                    }
                                </CardHeader>

                                <CardBody>

                                    <GridContainer>
                                        <GridContainer lg={12} justify="center" >
                                                <br />
                                                <label>
                                                    {this.state.search == true ?
                                                        <div className="assign-role-info">
                                                            <label>  Contract Name:</label><h5>{`${this.state.sendCustomerName}`} </h5>&nbsp;&nbsp;
                                            <hr></hr>
                                                        </div>
                                                        : null}

                                                </label>
                                        </GridContainer>

                                        <GridItem xs={12} sm={12} md={4}  >

                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                                <MasterDropdown
                                                    labelText="Tax Setup"
                                                    id="Taxsetup"
                                                    value={this.state.CustomerProvisioningDTO.customerSettings.taxSetupId}
                                                    lstObject={this.state.masterList}
                                                    required={true}
                                                    filterName='Tax Setup'
                                                    name='taxSetupId'
                                                    onChange={(e) => this.SetConfig("Tax Setup", e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </Animated>
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={4}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <MasterDropdown
                                                    labelText="Currency"
                                                    id="currency"
                                                    value={this.state.CustomerProvisioningDTO.customerSettings.currencyId}
                                                    lstObject={this.state.masterList}
                                                    required={true}
                                                    filterName='Currency'
                                                    //  model="billingConfigs"
                                                    name='currencyId'
                                                    onChange={(e) => this.SetConfig("Currency", e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </Animated>
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={4}  >

                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                                <MasterDropdown
                                                    labelText="Theme Selection"
                                                    id="themeselection"
                                                    value={this.state.CustomerProvisioningDTO.customerSettings.themeId}
                                                    lstObject={this.state.masterList}
                                                    required={true}
                                                    filterName='ThemeSeletion'
                                                    name='themeId'
                                                    onChange={(e) => this.SetConfig("Theme Selection", e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </Animated>
                                        </GridItem>
                                        <GridContainer>
                                            <GridItem>
                                                <h4><small>Provision</small></h4>

                                            </GridItem>

                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="Database"
                                                    name="database"
                                                    value={this.state.Provision.database}
                                                    onChange={(e) => this.SetProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                {this.state.Provision.database ?
                                                    <CustomInput
                                                        labelText="Database Name"
                                                        id="dbName"
                                                        name="dbName"
                                                        value={this.state.CustomerProvisioningDTO.customerSettings.dbName}
                                                        onChange={(event) => this.onInputChange("Database", event)}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    /> : null}
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="Environment"
                                                    name="environment"
                                                    value={this.state.Provision.environment}
                                                    onChange={(e) => this.SetProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        {this.state.Provision.environment ?

                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="Trail"
                                                    name="trail"
                                                    value={this.state.Provision.trail}
                                                    onChange={(e) => this.SetEnvProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem> : null}
                                        {this.state.Provision.environment ?
                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="Production"
                                                    name="production"
                                                    value={this.state.Provision.production}
                                                    onChange={(e) => this.SetEnvProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem> : null}
                                        {this.state.Provision.environment ?

                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="Test"
                                                    name="test"
                                                    value={this.state.Provision.test}
                                                    onChange={(e) => this.SetEnvProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem> : null}

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="Services"
                                                    name="services "
                                                    value={this.state.Provision.services}
                                                    onChange={(e) => this.SetProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}

                                                />

                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="UI"
                                                    name="ui"
                                                    value={this.state.Provision.ui}
                                                    onChange={(e) => this.SetProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}

                                                />
                                            </GridItem>


                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="Notification Template"
                                                    name="notificationTemplate"
                                                    value={this.state.Provision.notificationTemplate}
                                                    onChange={(e) => this.SetProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}

                                                />
                                            </GridItem>
                                            {this.state.Provision.notificationTemplate ?
                                                <GridContainer xs={12} sm={12} md={8} className="uplevel">
                                                    <GridItem xs={12} sm={12} md={3}>

                                                        <CustomInput
                                                            labelText="Policy Scheduler"
                                                            id="Certificate"
                                                            name="Insurancecertificate"
                                                            value={this.state.Insurancecertificate}
                                                            //{this.state.CustomerProvisioningDTO.customerSettings.Insurancecertificate}
                                                            onChange={(event) => this.onInputChange("certificate", event)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={3}>

                                                        <CustomInput
                                                            labelText="Apikit"
                                                            id="apikit"
                                                            name="apikit"
                                                            value={this.state.apikit}
                                                            //{this.state.CustomerProvisioningDTO.customerSettings.apikit}
                                                            onChange={(event) => this.onInputChange("certificate", event)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={3}>

                                                        <CustomInput
                                                            labelText="Invoice"
                                                            id="Invoice"
                                                            name="invoice"
                                                            value={this.state.invoice}
                                                            //{this.state.CustomerProvisioningDTO.customerSettings.invoice}
                                                            onChange={(event) => this.onInputChange("certificate", event)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>
                                                </GridContainer> : null}

                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3} className="uplevel">
                                                <CustomCheckbox
                                                    labelText="Mail Configuration"
                                                    name="mailconfiguration"
                                                    value={this.state.CustomerProvisioningDTO.customerSettings.mailconfiguration}
                                                    onChange={(e) => this.SetProvisionValue(e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}

                                                />
                                            </GridItem>
                                            {this.state.Provision.mailconfiguration ?
                                                <GridContainer xs={12} sm={12} md={8} className="uplevel">

                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <CustomInput
                                                            labelText="email"
                                                            id="email"
                                                            name="email"
                                                            value={this.state.Provision.email}
                                                            onChange={(event) => this.onInputChange("Email", event)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>

                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <CustomInput
                                                            labelText="Password"
                                                            id="Password"
                                                            name="Password"
                                                            value={this.state.Provision.Password}
                                                            onChange={(event) => this.onInputChange("Password", event)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>

                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <CustomInput
                                                            labelText="Host"
                                                            id="Host"
                                                            name="Host"
                                                            value={this.state.Provision.Host}
                                                            onChange={(event) => this.onInputChange("Host", event)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>

                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <CustomInput
                                                            labelText="Port"
                                                            id="Port"
                                                            name="Port"
                                                            value={this.state.Provision.Port}
                                                            onChange={(event) => this.onInputChange("Port", event)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>

                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <CustomInput
                                                            labelText="EmailDomain"
                                                            id="EmailDomain"
                                                            name="EmailDomain"
                                                            value={this.state.Provision.EmailDomain}
                                                            onChange={(event) => this.onInputChange("EmailDomain", event)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>
                                                </GridContainer> : null}
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <GridItem xs={12} sm={12} md={4}  >
                                                <DocumentUpload configId={this.state.configId} />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <GridItem >

                                                <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                                                    <div>

                                                        <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleSaveCustConfig} >
                                                            Submit
                                               </Button>


                                                    </div>
                                                </Animated>
                                            </GridItem>

                                        </GridContainer>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </Animated>


                    </GridItem>
                </GridContainer>
            </div>

        );
    }
}

export default withStyles(style)(Provision);