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
            parameterList: [],
            CheckCondition: {
                //paramList:[],
            },
            paramList: [],
            otFlag: false,
            result: [],
            flagParam: false,
            fields: [],
            TableDataList: [],
            tableFlag: false,
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
        const fields = this.state.CheckCondition;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("fields", fields);
        //let paramindex = this.state.paramList.findIndex(s => s.parameterName == evt.target.name);
        ///*Create obj*/
        //if (paramindex == -1) {
        //    let pArray = this.state.paramList; 
        //  //  this.setState({ paramList: pArray });
        //    pArray.push({
        //        "parameterName": evt.target.name,
        //        "parameterValue": evt.target.value,
        //    });
        //} else {
        //    this.state.paramList[paramindex].parameterName = evt.target.name;
        //    this.state.paramList[paramindex].parameterValue = evt.target.value;
        //}
        console.log(this.state.paramList, "Array List");
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
        console.log(ReportConfigDto[event.target.name], event.target.value, "reportdto");

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
                this.setState({ parameterList: [] });   //item is my state variable
                //this.setState({ parameterList: parameterList }) 
                this.setState({ parameterList: data });
                console.log(this.state.parameterList, data, 'CheckConditions');
                this.setState({ otFlag: true });
            });
    }

    queryExecution = event => {
        let val = this.state.CheckCondition;
        this.setState({ paramList: [] });
        let pArray = this.state.paramList;
        this.setState({
            paramList: Object.keys(this.state.CheckCondition).map((prop, key) => {
                pArray.push({
                    "parameterName": prop,
                    "parameterValue": val[prop],
                });
                this.setState({ paramList: pArray });
                console.log("Table", prop, val[prop]);
            })
        });

        var data = {
            'ReportConfigId': this.state.ReportConfigDto.ReportName,
            'paramList': this.state.paramList,
        };

        fetch(`${ReportConfig.ReportConfigUrl}/api/Report/QueryExecution`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                this.setState({ result: data });
                console.log(this.state.result, 'Result');
                if (this.state.result.length > 0) {
                    this.setState({ tableFlag: false });
                    this.tabledata();
                    this.reset();
                    this.setState({ otFlag: false });
                }
                else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, searchTableSec: false, nodata: true });
                        }.bind(this), 2000
                    );
                }
            });
    }

    reset = () => {
        this.state.CheckCondition = {};
        let resetField = this.state.ReportConfigDto;
        resetField['ReportName'] = "";
        this.setState({ resetField });
    }

    tabledata = () => {
        this.setState({ tableFlag: true });
        console.log("prop data", this.state.result);
        this.setState({
            TableDataList: Object.keys(this.state.result[0]).map((prop, key) => {
                return {
                    Header: prop.charAt(0).toUpperCase() + prop.slice(1),
                    accessor: prop,
                };
                this.setState({});
            })
        });
        console.log("table data", this.state.TableDataList);
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
                                    <small> <TranslationContainer translationKey="Reports" /> </small>
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
                                                                <small>Criteria</small>
                                                                </h3>
                                                            }
                                                        </CardHeader>
                                                        <CardBody>
                                                            {this.state.otFlag &&
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
                                                                </GridContainer>
                                                            }
                                                            <GridContainer>

                                                                <GridItem>
                                                                    <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={(e) => this.queryExecution(e)}> <TranslationContainer translationKey="Generate" />  </Button>
                                                                </GridItem>

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

                {this.state.tableFlag &&
                    <GridContainer xl={12}>
                        <GridItem lg={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <ReactTable
                                    data={this.state.result}
                                    filterable

                                    columns={this.state.TableDataList}


                                    defaultPageSize={5}
                                    showPaginationTop={false}

                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />
                            </Animated>
                        </GridItem>
                    </GridContainer>
                }
            </div>

        );
    }
}
export default ReportExecution;