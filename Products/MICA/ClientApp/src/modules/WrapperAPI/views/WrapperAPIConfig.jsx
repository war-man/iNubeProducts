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

class WrapperAPIConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            pageloader: true,
            nodata: false,
            WrapperDto: {
                WrapperAPIName:"",
                InputParameter:"",
                OutputParameter:"",
            },
            displayReportObejectGrid: false,
            ObjParam: [],
            errormessage: false,
            newParamData: [],
        };
    }

    onInputChange = (type, event) => {
        const fields = this.state.WrapperDto;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        //this.change(event, event.target.name, type);
    };

    addConfigParameter() {
        debugger;
        console.log(this.state.nodata, 'ReportName');
        if (this.state.WrapperDto.WrapperAPIName != "" && this.state.WrapperDto.InputParameter != "" && this.state.WrapperDto.OutputParameter != "") {

            //Showing Grid
            this.setState({ displayReportObejectGrid: true });

            //Array Part
            let wrapObjParam = this.state.ObjParam;
            this.setState({ ObjParam: wrapObjParam });

            wrapObjParam.push({
                'wrapperAPIName': this.state.WrapperDto.WrapperAPIName,
                'inputParameter': this.state.WrapperDto.InputParameter,
                'outputParameter': this.state.WrapperDto.OutputParameter,
            });

            // State Set After Selecting
            console.log(this.state.ObjParam, 'RateParamArray');

            if (this.state.ObjParam.length > 0) {
                this.setState({
                    newParamData: this.state.ObjParam.map((prop, key) => {

                        return {
                            WrapperAPIName: prop.wrapperAPIName,
                            InputParameter: prop.inputParameter,
                            OutputParameter: prop.outputParameter,
                        };
                    })
                });
                this.reset();
            }
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }

    reset = () => {
        let resetFields = this.state.WrapperDto;
        resetFields['InputParameter'] = "";
        resetFields['OutputParameter'] = "";

  
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
                                    <small> <TranslationContainer translationKey="WrapperAPIConfiguration" /> </small>
                                </h4>
                            }
                        </CardHeader>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <CardBody>
                                <div>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Wrapper API Name"
                                                required={true}
                                                value={this.state.WrapperDto.WrapperAPIName}
                                                name='WrapperAPIName'
                                                onChange={(e) => this.onInputChange("string", e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Input Parameter"
                                                required={true}
                                                value={this.state.WrapperDto.InputParameter}
                                                name='InputParameter'
                                                onChange={(e) => this.onInputChange("string", e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Output Parameter"
                                                required={true}
                                                value={this.state.WrapperDto.OutputParameter}
                                                name='OutputParameter'
                                                onChange={(e) => this.onInputChange("string", e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem>
                                            <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.addConfigParameter()}> <TranslationContainer translationKey="AddParameter" />  </Button>
                                        </GridItem>

                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Animated>
                    </Card>
                    : <PageContentLoader />}

                {this.state.displayReportObejectGrid &&
                    <GridContainer xl={12}>
                        <GridItem xs={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                <ReactTable
                                    data={this.state.newParamData}
                                    filterable
                                    columns={[
                                        {
                                            Header: "Input Parameter",
                                            accessor: "InputParameter",
                                            minWidth: 30,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            resizable: false,

                                        },
                                        {
                                            Header: "Output Parameter",
                                            accessor: "OutputParameter",
                                            minWidth: 30,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            resizable: false,

                                        }
                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    pageSize={([this.state.newParamData.length + 1] < 5) ? [this.state.newParamData.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight"
                                />

                            </Animated>
                        </GridItem>
                    </GridContainer>
                }

            </div>

        );
    }
}
export default WrapperAPIConfig;