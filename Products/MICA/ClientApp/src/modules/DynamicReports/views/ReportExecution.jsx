import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import money from "assets/img/money.png"; 
import swal from 'sweetalert';
import Visibility from "@material-ui/icons/Visibility";
import GetApp from "@material-ui/icons/GetApp";
import Edit from "@material-ui/icons/Edit";
import { Link } from 'react-router-dom';
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import { Animated } from "react-animated-css";
import bindModel from 'components/ModelBinding/bindModel.js';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import ReportConfig from "modules/DynamicReports/ReportConfig.js";

class ReportExecution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            pageloader: false,
            nodata: false,
            masterList: [],
            ReportConfigDto: {
                ReportName: "",
            },
            //CheckCondition: {
                parameterList: [],
                dateList:[],
            //},
            flagParam: false,
            fields: {
            },
        };
    }

    componentDidMount() {

        fetch(`${ReportConfig.ReportConfigUrl}/api/Report/GetReportConfigName`, {
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

        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );
    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.ReportConfigDto;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields, evt.target.name, evt.target.value);
        this.setState({ fields });

    };

    onInputParamListChange = (evt) => {
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1)
        }
        else {
            var mm = (today.getMonth() + 1);
        }
        var date = dt + '/' + mm + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.fields;
        state[name] = date;
        this.setState({ state });

    };

    handleParameterCheck = event => {
        debugger;
        const ReportConfigDto = this.state.ReportConfigDto;
        ReportConfigDto[event.target.name] = event.target.value;
        this.setState({ ReportConfigDto });
        this.setState({ [event.target.name]: event.target.value });
        console.log(ReportConfigDto[event.target.name], event.target.value ,"reportdto");

        this.setState({ flagParam: true });
        fetch(`${ReportConfig.ReportConfigUrl}/api/Report/GetParameters?ReportConfigId=` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ parameterList: data });
                console.log(this.state.parameterList, data, 'CheckConditions');
            });
    }

    render() {
        return (
            <div>
                {this.state.pageloader ?
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={money} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> <TranslationContainer translationKey="ReportExecution" /> </small>
                                </h4>
                            }
                        </CardHeader>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <CardBody>

                                <div>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <Dropdown
                                                labelText="ReportName"
                                                id="ReportConfigDto.ReportName"
                                                value={this.state.ReportConfigDto.ReportName}
                                                lstObject={this.state.masterList}
                                                required={true}
                                                //filterName='InvoiceStatus'
                                                name='ReportName'
                                                onChange={this.handleParameterCheck}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        {this.state.flagParam &&
                                            <GridContainer>

                                                <GridItem xs={12} sm={12} md={12}>
                                                    <Card>
                                                        <CardHeader color="info" icon >

                                                            {
                                                                <h3 >
                                                                    <small>Parameters</small>
                                                                </h3>
                                                            }
                                                        </CardHeader>
                                                        <CardBody>

                                                        <GridContainer>
                                                            {this.state.parameterList.map((item, index) =>
                                                                    <GridItem xs={12} sm={12} md={3} key={index}>
                                                                        <CustomInput labelText={item}
                                                                            // value={item.paramName}
                                                                            name={item}
                                                                            onChange={this.onInputParamListChange}
                                                                            inputProps={{
                                                                                //type: "number"
                                                                            }}
                                                                            formControlProps={{ fullWidth: true }} />
                                                                    </GridItem>
                                                            )}
                                                            {this.state.dateList.map((item, index) =>
                                                                <GridItem xs={12} sm={12} md={3} key={index}>
                                                                    <CustomDatetime
                                                                        labelText={item}
                                                                        name={item}
                                                                        onChange={(evt) => this.onDateChange('datetime', 'date', evt)}
                                                                        //value={this.state.InvoiceData.invoiceEffectiveDate}
                                                                        formControlProps={{ fullWidth: true }} />

                                                                </GridItem>
                                                            )}

                                                            </GridContainer>

                                                        </CardBody>
                                                    </Card>

                                                </GridItem>
                                            </GridContainer>

                                        }

                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Animated>
                    </Card>
                    : <PageContentLoader />}
            </div>

            );
    }
}
export default ReportExecution;