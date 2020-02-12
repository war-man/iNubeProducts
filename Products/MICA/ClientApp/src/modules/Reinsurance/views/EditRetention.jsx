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
import role from "assets/img/users.png";

import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";


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
            masterList: [],
            Retention: {
                year: "",
                businessTypeId: "",
                retentionGroupName: "",
                retentionGroupId:this.props.RetentionSelectedId,
                retentionLogicId: "",
                percentage: "",
                limit: "",
                startDate: "",
                endDate: ""
            }
        };
    }
    onInputChange = (evt) => {
        const Data = this.state.Retention;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.Retention)
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
    onFormSubmit = (evt) => {
        console.log("submit", this.state.Retention);
        fetch(`http://localhost:49697/api/ReInsurance/SaveRetentionData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.Retention)
        }).then(response => response.json())
    }
    componentDidMount() {

        fetch(`http://localhost:49697/api/ReInsurance/MastertypeData`, {
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
    

        
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Define Retentions </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Year"
                                    id="ddlstatus"
                                    lstObject={[]}
                                    filterName='State'
                                    value=""
                                    name='State'
                                    // onChange={this.onInputPolicyChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Business Type"
                                    id="ddlstatus"
                                    lstObject={this.state.masterList}
                                    filterName='BusinessType'
                                    value={this.state.Retention.BusinessTypeId}
                                    name='BusinessTypeId'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Retention Group"
                                    id="BrokerName"
                                    value={this.state.Retention.RetentionGroupName}
                                    name='RetentionGroupName'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Retention Logic"
                                    id="ddlstatus"
                                    lstObject={this.state.masterList}
                                    filterName='AllocationLogic'
                                    value={this.state.Retention.RetentionLogicId}
                                    name='RetentionLogicId'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>

                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Percentage"
                                    id="ContactNo"
                                    value={this.state.Retention.Percentage}
                                    name='Percentage'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Limit"
                                    id="ContactNo"
                                    value={this.state.Retention.Limit}
                                    name='Limit'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                    //  required={true}
                                    //onFocus={this.state.onClick}

                                    labelText="Effective From Date"
                                    id='EndDate'
                                    name='StartDate'
                                    onChange={(evt) => this.onDateChange('datetime', 'StartDate', evt)}
                                    value={this.state.Retention.StartDate}
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
                                    labelText="Effective To Date"
                                    id='EndDate'
                                    name='EndDate'
                                    onChange={(evt) => this.onDateChange('datetime', 'EndDate', evt)}
                                    value={this.state.Retention.EndDate}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridContainer justify="center">
                                <GridItem xs={3} sm={3} md={3}>
                                    <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormSubmit()} > Save  </Button>
                                </GridItem>

                            </GridContainer>


                        </GridContainer>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(DefineRetentions);