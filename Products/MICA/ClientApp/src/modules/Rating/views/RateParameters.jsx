
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
import "react-table/react-table.css";
import $ from 'jquery';
import { Animated } from "react-animated-css";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import RateConfig from "modules/Rating/RateConfig.js";
import swal from 'sweetalert';

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

class RateParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                ParamName: "",
                ParamType: "",
                ParamMasterLink: "",
                IsActive: "",
                CreatedDate: "",
            },
            displayRateParameterGrid: false,
            RateParameterArray: [],
            RateParameters: [],
            RateParametersData: [],
            RateParametersDTO: {
                "parameterName": "",
                "parameterType": "",
                "parameterMasterLink": "",
            },
            searchTableSec: false,
        };
        this.handleTags = this.handleTags.bind(this);
    }
    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }
    

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    //Adding of RateParameter
    addRateParameterRow() {
        if (this.state.fields.ParamName != "" && this.state.fields.ParamType != "") {
            //Showing Grid
            this.setState({ displayRateParameterGrid: true });
            var isActive = 1;
            let pRateParameterArray = this.state.RateParameterArray;
            this.setState({ RateParameterArray: pRateParameterArray });

            pRateParameterArray.push({
                'parameterName': this.state.fields.ParamName,
                'parameterType': this.state.fields.ParamType,
                'parameterMasterLink': this.state.fields.ParamMasterLink,
                'createdDate': date(),
                'isActive': isActive
            });
            // State Set After Selecting
            this.setState({ ParamName: '', ParamType: '', ParamMasterLink:'' });
            this.state.fields.ParamName = "";
            this.state.fields.ParamType = "";
            this.state.fields.ParamMasterLink = "";
            console.log(this.state.RateParameterArray, 'RateParamArray');

            if (this.state.RateParameterArray.length > 0) {
                this.setState({
                    newParamData: this.state.RateParameterArray.map((prop, key) => {

                        return {
                            ParameterName: prop.parameterName,
                            ParameterType: prop.parameterType,
                            ParameterMaster: prop.parameterMasterLink,
                        };
                    })
                });
            }
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }

    }

    //Saving Parameter
    onFormSubmit = (evt) => {
        debugger;
        //if (this.state.RateParameterArray.length > 0) {
            //var data = {
            //    'parameterName': this.state.RateParameterArray[0].parameterName, 'parameterType': this.state.RateParameterArray[0].parameterType, 'parameterMasterLink': this.state.RateParameterArray[0].parameterMasterLink, 'createdDate': this.state.RateParameterArray[0].createdDate, 'isActive': this.state.RateParameterArray[0].isActive,
            //};
        if (this.state.fields.ParamName != "" && this.state.fields.ParamType !="" ) {
            var isActive = 1;
            var data = {
                'parameterName': this.state.fields.ParamName, 'parameterType': this.state.fields.ParamType, 'parameterMasterLink': this.state.fields.ParamMasterLink, 'createdDate': date(), 'isActive': isActive,
            };
            fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CreateParameter`, {
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
                            swal({
                                //   title: "Perfect",
                                text: data.responseMessage,
                                //  text: "Account Successfully Created",
                                icon: "success"
                            });
                            this.reset();
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
                swal("", "Parameter SHould be Added into Grid", "error");
                this.setState({ errormessage: true });
            }
    }

    reset = () => {
        //Array Reset
        this.setState({
            RateParameterArray: [],
            newParamData: [],
            displayRateParameterGrid: false
        })

    }

    GridView = () => {
        debugger;
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/SearchRateParameters`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.RateParametersDTO)
        }).then(response => response.json())
            .then(data => {
                if (data.length > 0) 
                {
                    this.setState({ searchTableSec: true});
                    this.setState({
                        RateParametersData: data.map((prop, key) => {
                            return {
                                SNo: key + 1,
                                ParameterName: prop.parameterName,
                                ParameterType: prop.parameterType,
                                ParameterMaster: prop.parameterMasterLink,
                            };
                        })
                    });
                }
                console.log("RateRule", data);

            });
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small>Rate Parameters </small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Parameter Name"
                                            id="ParamName"
                                            value={this.state.fields.ParamName}
                                            name='ParamName'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Data Type
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.fields.ParamType}
                                                onChange={this.onInputChange}
                                                inputProps={{
                                                    name: "ParamType",
                                                    id: "simple-select"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Data Type
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="String"
                                                >
                                                    String
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Int"
                                                >
                                                    Int
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Float"
                                                >
                                                    Float
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Date"
                                                >
                                                    Date
                            </MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Master Name"
                                            id="ParamMasterLink"
                                            value={this.state.fields.ParamMasterLink}
                                            name="ParamMasterLink"
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                </GridContainer>
                                {
                            //        <Button onClick={() => this.addRateParameterRow()}
                            //            color="info"
                            //            size="sm"
                            //        >
                            //            Add Rate Parameter
                            //</Button>
                                }
                                {this.state.displayRateParameterGrid &&
                                    <GridContainer>
                                        <GridItem xs={8}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <CardBody className="product-search-tab">
                                                    <ReactTable
                                                        data={this.state.newParamData}
                                                        filterable
                                                        columns={[
                                                            {
                                                                Header: "Parameter Name",
                                                                accessor: "ParameterName",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Parameter Type ",
                                                                accessor: "ParameterType",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Parameter Master ",
                                                                accessor: "ParameterMaster",
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
                                                </CardBody>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                }
                                <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={4}>
                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Button id="button-search-partner" color="info" round onClick={() => this.onFormSubmit()}>
                                                Save
                                    </Button>
                                            <Button id="button-search-partner" color="info" round onClick={() => this.GridView()}>
                                                Grid
                                    </Button>
                                           </Animated>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>

                       
                        <GridContainer xl={12}>
                            {this.state.searchTableSec ?
                                    <GridItem lg={12}>
                                        <ReactTable
                                            title="Rate Parameters"
                                            data={this.state.RateParametersData}
                                             filterable
                                                    columns={[
                                                    {

                                                        Header: "SNo",
                                                        accessor: "SNo",
                                                        headerClassName: 'react-table-center',
                                                        //minWidth: 40,
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "Parameter Name",
                                                        accessor: "ParameterName",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,

                                                    },
                                                    {
                                                        Header: "Parameter Type ",
                                                        accessor: "ParameterType",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,

                                                    },
                                                    {
                                                        Header: "Parameter Master ",
                                                        accessor: "ParameterMaster",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,

                                                    }
                                                ]}
                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                                //pageSize={([this.state.newParamData.length + 1] < 5) ? [this.state.newParamData.length + 1] : 5}
                                                showPaginationBottom
                                                className="-striped -highlight"
                                            />
                                </GridItem>
                                : null}
                            </GridContainer>
                            


                    </GridItem>
                </GridContainer>
            </div>

        );
    }
}

function mapStateToProps(state) {
    //const { loggingIn } = state.authentication;
    //return {
    //    loggingIn
    //};
}
export default connect(null, null)(withStyles(extendedFormsStyle)(RateParameters));






