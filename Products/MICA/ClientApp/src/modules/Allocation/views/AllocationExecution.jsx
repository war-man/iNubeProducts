import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Radio from "@material-ui/core/Radio";
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
//import { alert } from "../../../Login/_reducers/alert.reducer";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RateConfig from "modules/Rating/RateConfig.js";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import AllocationConfig from "modules/Allocation/AllocationConfig.js";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";


class AllocationExecution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TableDataList: [],

           // result: "",
            result: [],
            fields: {},
            Allocfields: {
                RateName: "",
            },
            RulesList: [],
            AllocData: [],
            RulesConditions: {
                parameterList: []
            },
            flagButton: false,
            flagResButton: false,
            flagExecButton: true,

        };

    }
    componentDidMount() {
      
        fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/GetAllocationRules`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ AllocData: data });
                console.log(this.state.AllocData, ' CheckDataR');
            });




    }
  
    handleState = event => {

        const Allocfields = this.state.Allocfields;
        Allocfields[event.target.name] = event.target.value;
        this.setState({ Allocfields });

        this.state.RulesList = this.state.AllocData.filter(item => item.mID == event.target.value);
        this.setState({});

        this.setState({ mID: event.target.value });
        console.log(this.state.RateRule, ' CheckRateRule');
        this.setState({ flagButton: true });
    };


   
    //handleState = event => {
    //    const Allocfields = this.state.Allocfields;
    //    Allocfields[event.target.name] = event.target.value;
    //    this.setState({ Allocfields });
    //    this.setState({ flagButton: true });
    //};

   
    onInputParamChange = (evt) => {
       
        //console.log('Event', evt);
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onFormSubmit = (evt) => {
       
        var rst;
        fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/CheckRuleSets/CheckRuleSets/` + this.state.Allocfields.RateName, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.fields)
        })
            .then(response => response.json())
            .then(data => {
               // alert(data);
                this.setState({ result: data });
                console.log(this.state.result, 'AResults');
                this.ratetabledata();
            });
        this.setState({ flagResButton: true });
       // this.setState({ flagExecButton: false });

    }

       // debugger;
      // fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/CheckRuleSets/` + this.state.Allocfields.RateName, {
      ////  fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/CheckRuleSets`, {
      //     method: 'post',
      //     headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json',
      //         'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      //     },
      //     body: JSON.stringify(this.state.fields)
      // }).then(response => response.json())
      //     .then(data => {
      //          if (data.responseMessage != null) {
      //              swal({
      //                  text: "Allocation:" + data.responseMessage,
      //                  icon: "success"
      //              });
      //              this.reset();
      //          }
      //          else {
      //              swal({
      //                  text: "Conditions are wrong",
      //                  icon: "error"
      //              });
      //          }
      //          this.setState({ result: data });
      //          console.log(this.state.result, 'Results');
      //      });

  //  }
    reset = () => {
        //Setting States After Saving
        let ratingDto = this.state.fields;
        ratingDto['RateName'] = "";
        this.setState({ ratingDto });

        this.setState({ flagButton: false });
        //let status = this.state;
        //this.setState({ status });
    }
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    ratetabledata = () => {
      //  this.setState({ tableFlag: true });
        console.log("propAldata", this.state.result);
        //var res = this.state.result[0];
        //var abc = res[0];
        //console.log("abc:", abc);
        this.setState({
            TableDataList:Object.keys(this.state.result[0]).map((prop, key) => {
               // TableDataList: Object.keys(this.state.result[0][0]).map((prop, key) => {
                return {
                    Header: prop,
                    accessor: prop,
                };
                this.setState({});
            })
        });
        console.log("tabledata", this.state.TableDataList);
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
                                    <small> Allocation Execution </small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Dropdown
                                            required={true}
                                            labelText="Allocation Name"
                                            id="RateName"
                                            lstObject={this.state.AllocData}
                                            //value={this.state.fields.RateName}
                                            value={this.state.Allocfields.RateName}
                                            name='RateName'
                                            onChange={this.handleState}
                                         //   disabled={this.state.componentData.disableView}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>

                                    {this.state.flagButton &&
                                        <GridContainer>
                                        {this.state.RulesList.map((item, index) =>
                                                <GridItem xs={12} sm={12} md={4} key={index}>
                                                <CustomInput labelText={item.mType}
                                                    required={true}
                                                    //value={item.mType}
                                                    name={item.mType}
                                                        onChange={this.onInputParamChange}
                                                        inputProps={{
                                                            //type: "number"
                                                        }}
                                                        formControlProps={{ fullWidth: true }} />

                                                </GridItem>


                                            )}
                                        </GridContainer>
                                    }
                                       
                                    {/*   {this.state.flagResButton &&
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="  "
                                            id="result"
                                            value={this.state.result}
                                            name='result'
                                            //onChange={(event) => this.onInputChange("number", event)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                    }*/}

                                     {this.state.flagResButton &&
                                        <GridContainer xl={12}>
                                            <GridItem lg={12}>
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <ReactTable
                                                   // data={[this.state.result[0]]}
                                                   // data={this.state.result[0]}
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
                                </GridContainer>

                            </CardBody>
                        </Card>
                   

                        {this.state.flagButton &&

                            <GridContainer>

                                <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                        <CardBody>

                                            <GridContainer>
                                                {this.state.RulesConditions.parameterList.map((item, index) =>
                                                    <GridItem xs={12} sm={12} md={3} key={index}>
                                                        <CustomInput labelText={item}
                                                            // value={item.paramName}
                                                            name={item}
                                                            onChange={this.onInputParamChange}
                                                            inputProps={{
                                                                //type: "number"
                                                            }}
                                                            formControlProps={{ fullWidth: true }} />

                                                    </GridItem>


                                                )}
                                            </GridContainer>
                                        
                                            <GridContainer lg={12} justify="center">
                                                <GridItem xs={5} sm={3} md={3} lg={1}>
                                                    <Button onClick={() => this.onFormSubmit()}
                                                        color="info"
                                                        round
                                                    >
                                                        EXECUTE
                </Button>
                                                </GridItem>
                                            </GridContainer>
                                       
                                        </CardBody>
                                    </Card>

                                </GridItem>
                            </GridContainer>


                        }
                    </GridItem>
                </GridContainer>
            </div >
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(AllocationExecution));





