import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import AccountCreate from "assets/img/Account-Create.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import AccountConfig from "modules/Accounts/AccountConfig.js";
import withStyles from "@material-ui/core/styles/withStyles";
////////////////////
////////////////////
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import validationPage from "./ValidationPage.jsx";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import ExportToExcel from "components/ExcelExport/ExcelPlugin/ExportToExcel.jsx";
//
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

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

function date() {

    var today = new Date();
    var date;
    var hrs = today.getHours();
    hrs = hrs < 10 ? '0' + hrs : hrs;
    var min = today.getMinutes();
    min = min < 10 ? '0' + min : min;
    var sec = today.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;

    return date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + hrs + ':' + min + ':' + sec;

}
const paddingCard =
{
    padding: "10px",
}

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                //accountType: "",
                accountTypeId: "",
                accountName: "",
                accountDesc: "",
                accountCode: "",
                isActive: "",
                createdDate: "",
            },
            errormessage: false,
            accountTypeData: [],
            accountCodeData: [],
            accountCodeModifiedArray: [],
            CheckData: [],
            CheckAcData: [],
            AcMin: "",
            AcMAx: "",
            flag: true,
            flagEdit: true,
            flagUpdate: false,
            flagEditTypee: false,
            accountCodeState: false,
            accountNameState: false,
            accountDescState: false,
            //Loader
            isButtonVisibility: false,
            loader: true,
            pageloader: false,
            nodata: false,
            //For Export Button
            //flagExcelButton: false,
            //lstSheet: [
            //    {
            //        data: [],
            //        sheetName: "ChartsOfAccounts",
            //        columnArray: [
            //            {
            //                Header: "Account Type",
            //                accessor: "accountType",
            //            },
            //            {
            //                Header: "Account Name",
            //                accessor: "accountName",
            //            },
            //            {
            //                Header: "Account Description",
            //                accessor: "accountDesc",
            //            },
            //            {
            //                Header: "Account Code",
            //                accessor: "accountCode",
            //            },
            //            {
            //                Header: "CeatedDate",
            //                accessor: "createdDate",
            //            },
            //        ]
            //    }
            //],

        };
    }
    onInputChange = (type, event) => {
        const fields = this.state.fields;
        let name = event.target.name;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, name, type);
    };

    HandleApi = () => {
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAllAccountWithType`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.state.CheckAcData = data;
            });
    }
    onHandleChange = (evt) => {
        //Fetching Value
        debugger;
        this.HandleApi();
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });

        //Account Type Data in accountTypeData
        //New Code
        console.log(this.state.CheckAcData, 'ChecKDataBefore')
        this.state.CheckAcData = this.state.CheckAcData.filter(item => item.accountTypeId == evt.target.value);
        console.log(this.state.CheckAcData, 'ChecKDataAfter')
        //Get the Account Code Data (NewCode for ALl others )
        if (this.state.CheckAcData.length == 0) {
            const acTypeData = this.state.accountTypeData.filter(item => item.accountTypeId == evt.target.value);
            console.log(acTypeData, 'AcTypeData');
            var min = parseInt(acTypeData[0].fromRange);
            console.log(min, 'MIN');
            this.state.fields.accountCode = min;
        }
        else {
            this.state.CheckAcData = this.state.CheckAcData[this.state.CheckAcData.length - 1];
            this.state.accountCodeData = this.state.accountTypeData.filter(item => item.accountTypeId == evt.target.value);
            if (this.state.accountCodeData.length == 0) {
                var min = parseInt(this.state.accountCodeData[0].fromRange);
                this.state.fields.accountCode = min + 1;
            }
            else {
                var acCode = parseInt(this.state.CheckAcData.accountCode);
                this.state.fields.accountCode = acCode + 1;
            }
            console.log(this.state.fields.accountCode, 'New_AccountCode')
        }
    }

    onFormSubmit = (evt) => {
        this.state.fields.isActive = "Y";
        this.state.fields.CreatedDate = date();
        var data = {
            'accountTypeId': this.state.fields.accountTypeId, 'accountName': this.state.fields.accountName, 'accountCode': this.state.fields.accountCode, 'accountDesc': this.state.fields.accountDesc, 'createdDate': date(), 'isActive': this.state.fields.isActive
        };
        if (this.state.fields.accountTypeId != "" && this.state.fields.accountName != "" && this.state.fields.accountDesc != "" && this.state.fields.accountCode != "") {
            fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/CreateAccounts`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                        debugger;
                        this.reset();
                        swal({

                            //   title: "Perfect",

                            text: data.responseMessage,
                            //  text: "Account Successfully Created",
                            icon: "success"
                        });
                        this.setState({ errormessage: false });
                        this.HandleApi();
                        //this.setState({ redirect: true });
                        //this.renderRedirect();
                    } else if (data.status == 8) {

                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 4) {

                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                });
        } else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }
    //Reset 
    reset = () => {
        //Setting States After Saving
        let accountDto = this.state.fields;
        accountDto['accountTypeId'] = "";
        accountDto['accountName'] = "";
        accountDto['accountDesc'] = "";
        accountDto['accountCode'] = "";
        this.setState({ accountDto });

        let status = this.state;
        status['accountNameState'] = "";
        status['accountDescState'] = "";
        this.setState({ status });
    }
    // While Updating for Modify Accounts
    onFormUpdate = (evt) => {
        this.state.fields.isActive = "Y";
        this.state.fields.CreatedDate = date();
        if (this.state.fields.accountName != "" && this.state.fields.accountDesc != "") {
            var data = {
                'accountTypeId': this.state.fields.accountTypeId, 'accountName': this.state.fields.accountName, 'accountCode': this.state.fields.accountCode, 'accountDesc': this.state.fields.accountDesc, 'createdDate': date(), 'isActive': this.state.fields.isActive
            };
            fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/ModifyCoaAccount?AccountId=` + this.props.searchAccountId, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(data => {
                swal({

                    text: "Successfully Updated",
                    icon: "success"
                });
                console.log("data save result:", data);
                this.setState({ SavedData: data });
            });
        }
        else {
            swal("", "Some fields are missing", "error");
        }
    }

    componentDidMount() {
        // For Checking the Repatative value is present or not in AccountCodefer


        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAllAccountWithType`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setTimeout(
                        function () {
                            this.setState({ pageloader: true });
                        }
                            .bind(this),
                        2000
                    );
                    this.setState({ isButtonVisibility: true });
                }
                this.setState({ CheckData: data });
                this.setState({ CheckAcData: data });
                console.log(this.state.CheckData, 'CheckData');
                //For Export to Excel
                //this.state.lstSheet[0].data = this.state.CheckData;
                //console.log(data);
                //console.log(this.state.lstSheet,'LIST_SHEET')
            });
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAccountType`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ accountTypeData: data });
                console.log(data);
            });
        // For Modify Accounts
        if (this.props.searchAccountId != undefined) {
            console.log(this.props.flagEdit, 'FlagEditProps');
            this.setState({ flagEdit: this.props.flagEdit, flagEditTypee: this.props.flagEditTypee, flag: false, flagUpdate: this.props.flagUpdate, flagExcelButton: this.props.flagExcelButton });
            fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAccountById?accountId=` + this.props.searchAccountId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ fields: data });
                    console.log("Accountss data: ", data);

                });
        }
        //Trial For FlagEdit
        //console.log(this.state.flagEdit, 'FlagEditValue');
        //this.setState({ isButtonVisibility: false, pageloader: true });

    }
    // For Validation 
    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "range":
                if (validationPage.verifyAcCode(event.target.value, this.state.AcMin, this.state.AcMAx)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "alphaNumeric":
                if (validationPage.verifyAlphaNumeric(event.target.value)) {
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
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12} >
                            {this.state.isButtonVisibility ?
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <Card >
                                        {this.state.flag &&
                                            <CardHeader color="rose" icon>
                                                <CardIcon color="rose">
                                                    <Icon><img id="icon" src={AccountCreate} /></Icon>
                                                </CardIcon>
                                                {
                                                    <h4 >
                                                    <small><TranslationContainer translationKey="CreateAccount" />  </small>
                                                    </h4>
                                                }
                                            </CardHeader>
                                        }
                                        <CardBody>
                                            <GridContainer>

                                                <GridItem xs={12} sm={12} md={3}>
                                                    <FormControl
                                                        fullWidth
                                                        className={classes.selectFormControl}
                                                    >
                                                        <InputLabel
                                                            htmlFor="simple-select"
                                                            className={classes.selectLabel}
                                                        >
                                                            <TranslationContainer translationKey="AccountType" />
                          </InputLabel>
                                                        <Select
                                                            value={this.state.fields.accountTypeId}
                                                            onChange={this.onHandleChange}
                                                            disabled={this.state.flagEditTypee}
                                                            MenuProps={{
                                                                className: classes.selectMenu
                                                            }}
                                                            classes={{
                                                                select: classes.select
                                                            }}
                                                            inputProps={{
                                                                name: "accountTypeId",
                                                                id: "simple-select"
                                                            }}
                                                        >
                                                            {
                                                                this.state.accountTypeData.map(item =>
                                                                    <MenuItem
                                                                        value={item.accountTypeId}
                                                                        classes={{
                                                                            root: classes.selectMenuItem,
                                                                            selected: classes.selectMenuItemSelected
                                                                        }}
                                                                    >
                                                                        {item.accountType}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                    {this.state.errormessage && (this.state.fields.accountTypeId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <CustomInput
                                                        labelText="AccountName"
                                                        id="accountName"
                                                        disabled={!this.state.flagEdit}
                                                        required={true}
                                                        error={this.state.accountNameState}
                                                        value={this.state.fields.accountName}
                                                        name='accountName'
                                                        onChange={(event) => this.onInputChange("alphaNumeric", event)}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                    {this.state.errormessage && (this.state.fields.accountName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <CustomInput
                                                        labelText="AccountDescription"
                                                        id="accountDesc"
                                                        disabled={!this.state.flagEdit}
                                                        required={true}
                                                        error={this.state.accountDescState}
                                                        value={this.state.fields.accountDesc}
                                                        name='accountDesc'
                                                        onChange={(event) => this.onInputChange("alphaNumeric", event)}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                    {this.state.errormessage && (this.state.fields.accountDesc == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <CustomInput
                                                        labelText="AccountCode"
                                                        id="accountCode"
                                                        disabled={true}
                                                        error={this.state.accountCodeState}
                                                        value={this.state.fields.accountCode}
                                                        name='accountCode'
                                                        onChange={(event) => this.onInputChange("range", event)}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            {this.state.flag &&
                                                <GridContainer lg={12} justify="center">
                                                    <GridItem xs={5} sm={3} md={3} lg={1}>
                                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                            <Button id="button-search-partner" color="info" round onClick={() => this.onFormSubmit()}>
                                                            <TranslationContainer translationKey="Save" />
                          </Button>
                                                        </Animated>
                                                    </GridItem>
                                                </GridContainer>}
                                            {this.state.flagUpdate &&
                                                <GridContainer lg={12} justify="center">
                                                    <GridItem xs={5} sm={3} md={3} lg={1}>
                                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                            <Button id="button-search-partner" color="info" round onClick={() => this.onFormUpdate()}>
                                                            <TranslationContainer translationKey="Update" />
                          </Button>
                                                        </Animated>
                                                    </GridItem>
                                                </GridContainer>}
                                            {
                                                //this.state.flagExcelButton &&
                                                //<GridContainer justify="center">
                                                //    <GridItem >
                                                //        <ExportToExcel lstSheet={this.state.lstSheet} />
                                                //    </GridItem>
                                                //</GridContainer>
                                            }
                                        </CardBody>
                                    </Card>

                                </Animated>
                                : null}
                        </GridItem>
                    </GridContainer>
                    : <PageContentLoader />}
            </div>
        );
    }
}

export default withStyles(style)(CreateAccount);