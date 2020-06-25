import React from "react";
import Radio from "@material-ui/core/Radio";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import retention from "assets/img/retention.png";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import validationPage from "modules/Accounts/views/ValidationPage.jsx";
import swal from 'sweetalert';
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

class DefineRetentions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editflag: false,
            retcodeflag: false,
            branchCodemassage:"",
            masterList: [],
            yearmasterlist: [],
            flag: true,
            flagUpdate: false,
            editModal: false,
            retentionGroupNameState: false,
            percentageState: false,
            limitState: false,
            showPercentage: false,
            showlimit: false,
            showperwithlimit: false,
            Retention: {
                retentionGroupId: 0,
                retentionGroupName: "",
                year: "",
                businessTypeId: "",
                businessType: "",
                retentionLogicId: "",
                retentionType: "",
                percentage: "",
                limit: "",
                effectiveFrom: "",
                effectiveTo: "",
                createdDate: null,
                createdBy: null,
                modifiedDate: null,
                modifiedBy: null,
                isActive: null,
               
                tblRimappingDetail: [],
            },
            DuplicateRetention: {
                retentionGroupId: 0,
            },
        };
       
    }
    onBlur = () => {

        debugger
        //fetch(`${UserConfig.UserConfigUrl}/api/Role/GetDynamicGraphPermissions?Userid=` + userid + `&Roleid=` + roleid + `&itemType=` + "Graph",
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/RIValidations?codeName=` + this.state.Retention.retentionGroupName + '&type=' + "RetentionGroupName", {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 9) {
                    this.setState({ retcodeflag: true, branchCodemassage: data.responseMessage });
                } else {
                    this.setState({ retcodeflag: false, branchCodemassage: "" });
                }
              
            });
        console.log("data", this.state.masterList);
    }
    onInputChange = (type, evt) => {
        let name = evt.target.name;
        const Data = this.state.Retention;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.Retention)
        this.change(evt, name, type);
    }
    onInputChange1 = (evt) => {
       
        const Data = this.state.Retention;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.Retention)
        debugger
        if (evt.target.value == "20") {
            this.state.showPercentage = true;
            this.state.showlimit= false;
            this.state.showperwithlimit = false;
            //this.setState({showPercentage})
            //const { showConditionFrom } = this.state.showConditionFrom;
            //this.setState({ showConditionFrom: !showConditionFrom });
            //const { showCondition } = this.state.showCondition;
            //this.setState({ showCondition: !showCondition, [event.target.name]: event.target.value });

        }
        else if (evt.target.value == "21") {
            this.state.showPercentage = false;
            this.state.showlimit = true;
            this.state.showperwithlimit = false;
            //this.setState({ showlimit })
           
            //const { showTable } = this.state.showTable;
            //this.setState({ showTable: !showTable });
            //const { showColumn } = this.state.showColumn;
            //this.setState({ showColumn: !showColumn, [event.target.name]: event.target.value });

        }
        else if (evt.target.value == "22") {
            this.state.showPercentage = true;
            this.state.showlimit = true;
            this.state.showperwithlimit = false;
            //this.setState({ showPercentage })
            //this.setState({ showlimit })

            //const { showTable } = this.state.showTable;
            //this.setState({ showTable: !showTable });
            //const { showColumn } = this.state.showColumn;
            //this.setState({ showColumn: !showColumn, [event.target.name]: event.target.value });

        }
    }
    reset = () => {
        //Setting States After Saving
        let ParticipantDto = this.state.Retention;
        ParticipantDto['year'] = "";
        ParticipantDto['businessTypeId'] = "";
        ParticipantDto['retentionLogicId'] = "";
        ParticipantDto['retentionGroupName'] = "";
        ParticipantDto['percentage'] = "";
        ParticipantDto['limit'] = "";
        ParticipantDto['effectiveFrom'] = "";
        ParticipantDto['effectiveTo'] = "";
       

        this.setState({ ParticipantDto });

        //let status = this.state;
        //status['accountNameState'] = "";
        //status['accountDescState'] = "";
        //this.setState({ status });
    }

    change(evt, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "range":
                if (validationPage.verifyAcCode(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "string":
                if (validationPage.verifyName(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "numeric":
                if (validationPage.verifyAccountCode(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "alphaNumeric":
                if (validationPage.verifyAlphaNumeric(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }
    onDateChange = (formate, name, event) => {
       
        //const { validdate } = this.state.fields;
        //this.setState({ validdate: false });
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1);
        }
        else {
            var mm = (today.getMonth() + 1);
        }
       
 
        //var date = today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' + today.getDate();
        var date = dt + '/' + mm + '/' + today.getFullYear();
        const fields = this.state.Retention;
        fields[name] = date;
        this.setState({ fields });

    };
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    onFormSubmit = (evt) => {
        let effForm = this.state.Retention.effectiveFrom;
        this.state.Retention.effectiveFrom=this.datechange(this.state.Retention.effectiveFrom);
        let effTo = this.state.Retention.effectiveTo;
        this.state.Retention.effectiveTo= this.datechange(this.state.Retention.effectiveTo);
       

        console.log("submit", this.state.Retention);
        if (this.state.Retention.year != "" && this.state.Retention.businessTypeId != "" && this.state.Retention.retentionGroupName != "" && this.state.Retention.retentionLogicId != "" &&  this.state.Retention.effectiveFrom != "" && this.state.Retention.effectiveTo != "") {
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SaveRetentionData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.Retention)
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                        debugger;
                        this.reset();
                        swal({

                            //   title: "Perfect",

                            text: data.responseMessage,
                            //text: "Retention Successfully Created",
                            icon: "success"
                        });
                        this.setState({ errormessage: false });
                        //this.HandleApi();
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
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }

        this.state.Retention.effectiveTo = effTo;
       this.state.Retention.effectiveFrom = effForm;
    }
    componentDidMount() {
        const props = this.props;
        console.log("porpsdat", props)
        console.log(props.retentionGroupId, 'DataID');
        if (props.retentionGroupId != undefined) {
            console.log(this.props.flagEdit, 'FlagEditProps');
            this.setState({  flag: false, flagUpdate: this.props.flagUpdate });
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyfRetention?retentionGID=` + this.props.retentionGroupId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json(this.state.Retention))
                .then(data => {

                   
                    console.log(data, 'Mydata222')
                    //data.effectiveFrom = new Date(this.state.Retention.effectiveFrom).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    //data.effectiveTo = new Date(this.state.Retention.effectiveTo).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.setState({ Retention: data });
                    console.log(data,'Mydata111')
                    console.log("Accountss data: ", data);

                });
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetRetentionGroupById?retentionGroupId=` + this.props.retentionGroupId , {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.SearchParticipant)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ Retention: data });
                    this.state.Retention.effectiveFrom = new Date(data.effectiveFrom).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.state.Retention.effectiveTo = new Date(data.effectiveTo).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.setState({});
                    console.log(data, 'MyData111222');
                    console.log(this.state.Retention, 'Data1');
                });

        }

       
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MastertypeData`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
        console.log("data", this.state.masterList);
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MasterYearData`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("yearmasterlist: ", data);
                this.setState({ yearmasterlist: data });
            });
        console.log("data", this.state.masterList);
        if (this.props.RetentionSelectedId != undefined) {
            let DuplicateRetention= Object.assign({},);
            //let Retentions = this.state.Retention;
            DuplicateRetention['RetentionGroupId'] = this.props.RetentionSelectedId;
            this.setState({ DuplicateRetention });
            fetch(`http://localhost:49697/api/ReInsurance/SearchRetention`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(DuplicateRetention)
            }).then(response => response.json())
                .then(data => {
                    console.log("data Retentions", data);
                    if (data.length > 0) {
                        let Retentions = this.state.Retention;
                        Retentions = data[0];
                        //this.state.Retention = data[0];
                        //this.setState({ Retention: data[0] });
                        if (data[0].effectiveFrom != null) {
                            Retentions.EffectiveFrom = new Date(Retentions.effectiveFrom).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', })
                        }
                        if (data[0].effectiveTo != null) {
                            Retentions.EffectiveTo = new Date(Retentions.effectiveTo).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', })
                        }
                        this.setState({ Retentions });
                    }
                });
        }
        this.setState({ editflag:true});
        console.log("Retentions ss", this.state.Retention)
    }
    onFormModify = (id) => {
        let efffrom = this.state.Retention.effectiveFrom;
        let effto = this.state.Retention.effectiveTo;
        if (this.state.Retention.effectiveFrom != "") {
            this.state.Retention.effectiveFrom = this.datechange(this.state.Retention.effectiveFrom);
        }
        if (this.state.Retention.effectiveTo != "") {
            this.state.Retention.effectiveTo = this.datechange(this.state.Retention.effectiveTo);
        }
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyfRetention?retentionGID=` + this.props.retentionGroupId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.Retention)
        }) .then(response => response.json())
            .then(data => {
                swal({
                    text: data.responseMessage,
                    //text: "data saved successfully",
                    icon: "success"
                });
                this.setState({ Retention: data });
                console.log(data, 'Mydata')
                console.log("Accountss data: ", data);

            });
        //let flageUpdate = this.state.flagUpdate
        //this.setState({ flageUpdate:true})

        this.state.Retention.effectiveFrom = efffrom;
        this.state.Retention.effectiveTo = effto;
    }
    render() {
        //let updateflag = this.props.flagUpdate
        //this.setState({ updateflag})
        //console.log("updateflag", props.flagUpdate)
        const { classes } = this.props;
        return (
            <div>
                <Card >
                   
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                            <Icon><img id="icon" src={retention} /></Icon>
                            </CardIcon>
                            {
                            <h4 >
                                <small> <TranslationContainer translationKey="DefineRetention" /> </small>
                                </h4>
                            }
                        </CardHeader>
                   
                    <CardBody>
                     
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Year"
                                    id="ddlstatus"
                                    required={true}
                                    lstObject={this.state.yearmasterlist}
                                    filterName='Year'
                                    value={this.state.Retention.year}
                                    name='year'
                                     onChange={this.onInputChange1}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="BusinessType"
                                    id="ddlstatus"
                                    required={true}
                                    lstObject={this.state.masterList}
                                    filterName='BusinessType'
                                    value={this.state.Retention.businessTypeId}
                                    name='businessTypeId'
                                    onChange={this.onInputChange1}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="RetentionGroup"
                                    id="BrokerName"
                                    required={true}
                                    error={this.state.retentionGroupNameState}
                                    value={this.state.Retention.retentionGroupName}
                                    onBlur={() => this.onBlur()}
                                    name='retentionGroupName'
                                    onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                {this.state.retcodeflag && (<p className="error">{this.state.branchCodemassage} </p>)}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="RetentionLogic"
                                    id="ddlstatus"
                                    required={true}
                                    lstObject={this.state.masterList}
                                    filterName='AllocationLogic'
                                    value={this.state.Retention.retentionLogicId}
                                    name='retentionLogicId'
                                    onChange={this.onInputChange1}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                           
                            {this.state.showPercentage &&
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Percentage"
                                        id="ContactNo"
                                        required={true}
                                        error={this.state.percentageState}
                                        value={this.state.Retention.percentage}
                                        name='percentage'
                                        onChange={(evt) => this.onInputChange("numeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            }
                            {this.state.showlimit &&
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Limit"
                                        id="ContactNo"
                                        required={true}
                                        error={this.state.limitState}
                                        value={this.state.Retention.limit}
                                        name='limit'
                                        onChange={(evt) => this.onInputChange("numeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            }
                           
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                  //  required={true}
                                    //onFocus={this.state.onClick}
                                   
                                    labelText="EffectiveFromDate"
                                    id='EndDate'
                                    name='effectiveFrom'
                                    onChange={(event) => this.onDateChange('datetime', 'effectiveFrom', event)}
                                    value={this.state.Retention.effectiveFrom}
                                required={true}
                                    formControlProps={{ fullWidth: true }}
                                    />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                   // required={true}
                                    //onFocus={this.state.onClick}
                                    labelText="EffectiveToDate"
                                    id='EndDate'
                                    name='effectiveTo'
                                    onChange={(event) => this.onDateChange('datetime', 'effectiveTo', event)}
                                    value={this.state.Retention.effectiveTo}
                                    required={true}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            {this.state.flag &&
                                <GridContainer justify="center">
                                    <GridItem xs={3} sm={3} md={3}>
                                    <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormSubmit()} > <TranslationContainer translationKey="Save" />  </Button>

                                    </GridItem>

                                </GridContainer>}
                            {this.state.flagUpdate &&
                                <GridContainer justify="center">
                                    <GridItem xs={3} sm={3} md={3}>
                                    <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormModify()} > <TranslationContainer translationKey="Update" />  </Button>

                                    </GridItem>

                                </GridContainer>}


                        </GridContainer>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(DefineRetentions);