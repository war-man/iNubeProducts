import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Add from "@material-ui/icons/AddCircleOutline";







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

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}

class CreateIncentive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kpitableData:[],
            tableData: [],
            retainFlag: false,
          masterList: [],
            //masterList: [
            //    { miD: 1, mValue: "SINGLE", mType: "Mode" },
            //    { miD: 2, mValue: "ANNUAL", mType: "Mod1" },
            //    { miD: 3, mValue: "SEMI - ANNUAL", mType: "Mod2" },
            //    { miD: 4, mValue: " MONTHLY", mType: "Mod3" },
              
            //],
            "incentiveData":{
                factorId:null,
            },
            "commissionData": [{
                value1: "",
                value2:"",
            }],
            "kpiData": [{
         kpi1value1: "",
                kpi1value2: "",
                kpi2value1: "",
                kpi2value2: "",
                incentivepercent:"",
            }],
        }
    };

    componentDidMount() {
        this.AddRow();
        this.AddKPIRows();
    }
 
    SetValue = (type, event) => {
        let name = event.target.name;
        let value = event.target.value;
        let incentiveData = this.state.incentiveData;
        incentiveData[name] = value;
        this.setState({ incentiveData }); 
    }
    SetcommissionValue = (type, event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;

        let commissionData = this.state.commissionData;

        commissionData[index][name] = value;

        this.setState({ commissionData });
        this.AddRow();
    }
    AddRecord = (event, index) => {

        this.state.commissionData.push({
            value1: "", value2: "",
        });
        this.setState({});

        console.log("iindex", index);
        this.AddRow();

    }
    AddRow = () => {
        this.setState({
            tableData: this.state.commissionData.map((prop, key) => {

                return {
                    id: key + 1,

                    value1: <CustomInput labelText="" id="policyterm1" required={true} value={this.state.commissionData[key].value1} name="value1" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                        value2: <CustomInput labelText="" id="policyterm2" required={true} value={this.state.commissionData[key].value2} name="value2" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                        } />,
                            Action: <div><Button justIcon round simple color="info" className="add" onClick={(e) => this.AddRecord(e, key)} ><Add /> </Button >
                            </div>
                };
            })
        });
    }
    SetKPIValue = (type, event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;

        let kpiData = this.state.kpiData;

        kpiData[index][name] = value;

        this.setState({ kpiData });
        this.AddKPIRows();
    }
AddKPIRecord = (event, index) => {

    this.state.kpiData.push({
        kpi1value1: "", kpi1value2: "", kpi2value1: "", kpi2value2: "", incentivepercent: "",
        });
        this.setState({});

        console.log("iindex", index);
    this.AddKPIRows();

    }
    AddKPIRows=()=>{
        this.setState({
         kpitableData: this.state.commissionData.map((prop, key) => {

                return {
                    id: key + 1,
                    kpi1value1: <CustomInput labelText="" id="kpi1value2" required={true} value={this.state.kpiData[key].kpi1value1} name="kpi1value1" onChange={(e) => this.SetKPIValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    kpi1value2: <CustomInput labelText="" id="kpi1value2" required={true} value={this.state.kpiData[key].kpi1value2} name="kpi1value2" onChange={(e) => this.SetKPIValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    kpi2value1: <CustomInput labelText="" id="kpi2value1" required={true} value={this.state.kpiData[key].kpi2value1} name="kpi2value1" onChange={(e) => this.SetKPIValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    kpi2value2: <CustomInput labelText="" id="kpi2value2" required={true} value={this.state.kpiData[key].kpi2value2} name="kpi2value2" onChange={(e) => this.SetKPIValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    incentivepercent: <CustomInput labelText="" id="policyterm2" required={true} value={this.state.kpiData[key].incentivepercent} name="incentivepercent" onChange={(e) => this.SetKPIValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    Action: <div><Button justIcon round simple color="info" className="add" onClick={(e) => this.AddKPIRecord(e, key)} ><Add /> </Button >
                  </div>
                };
            })
        });
    }
    render() {

        const { classes } = this.props;

        return (
            <div>
                <Card>

                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">

                            <Icon><img id="icon" /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small>Create Incentive</small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={4} md={4}>
                                <CustomInput
                                    labelText="Allowance Name"
                                    id="allowanceId"
                                    //value={}
                                    //name=''
                                    required={true}
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <Dropdown
                                    id="PositionNameid"
                                    labelText="Influencing Factors"
                                    lstObject={this.state.masterList}
                                    //value={this.props.peopledetails1.deginName}
                                    //name='deginName'
                                    formControlProps={{ fullWidth: true }}
                                  //onChange={(e) => this.props.SetddlValue(e, "")}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <CustomInput
                                    labelText="Incentive Amount"
                                    id="allowanceId"
                                    //value={}
                                    //name=''
                                    required={true}
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>


                <Card>
                    <CardBody>
                        <h4><small></small></h4>
                        <GridContainer>
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <ReactTable
                            title="Define Ranges For KPI"
                          //data={this.state.tableData}
                            filterable
                            columns={[


                                {
                                    Header: "KPI",
                                    accessor: "Type",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 65,
                                    resizable: false,

                                },
                                {
                                    Header: "Min",
                                    accessor: "LeadNo",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,

                                },
                                {

                                    Header: "Max",
                                    accessor: "LeadDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                },
                                {

                                    Header: "Actions",
                                    accessor: "LeadDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                },

                            ]

                            }
                            defaultPageSize={5}
                            showPaginationTop={false}
                            // pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                            showPaginationBottom
                            className="-striped -highlight"
                        />
                                </Animated>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                            <MasterDropdown
                                labelText="KPI"
                                required={true}
                                id="designationId"
                                lstObject={this.state.masterList}
                                filterName=''
                                //value={this.state.OrganizationId}
                                //onChange={(e) => this.GetMasterData(e)}
                                formControlProps={{ fullWidth: true }}
                            />

                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                labelText="Min Limit"
                                id="allowanceId"
                                //value={}
                                //name=''
                                required={true}
                                onChange={(e) => this.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                                labelText="Max Limit"
                                id="allowanceId"
                                //value={}
                                //name=''
                                required={true}
                                onChange={(e) => this.SetValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <ReactTable
                                data={this.state.tableData}
                                //data={this.newdata}
                                filterable
                                columns={[


                                    {
                                        Header: "Value1",
                                        accessor: "value1",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 65,
                                        resizable: false,

                                    },
                                    {
                                        Header: "value2",
                                        accessor: "value2",
                                        style: { textAlign: "right" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,

                                    },
                                    {
                                        Header: "Actions",
                                        accessor: "Action",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                    },
                                   
                                ]

                                }
                                defaultPageSize={5}
                                showPaginationTop={false}
                                // pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight"
                                    />
                                </Animated>
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                            <Button round /*disabled={this.state.btnload}*/ align="center" color="success" >Save</Button>
                            <Button round /*disabled={this.state.btnload}*/ align="center" color="success" >Cancel</Button>
                        </GridContainer>
                    </CardBody>
                </Card>


                <GridContainer>
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <ReactTable
                                title="Update incentive % for all combinations"
                                data={this.state.kpitableData}
                            filterable
                            columns={[


                                {
                                    Header: "KPI1 Value1",
                                    accessor: "kpi1value1",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 65,
                                    resizable: false,

                                },
                                {
                                    Header: "KPI1 Value2",
                                    accessor: "kpi1value2",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,

                                },
                                {

                                    Header: "KPI2 Value1",
                                    accessor: "kpi2value1",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                },
                                {
                                    Header: "KPI2 Value2",
                                    accessor: "kpi2value2",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },
                                {
                                    Header: "Incentive %",
                                    accessor: "incentivepercent",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },
                                {
                                    Header: "Actions",
                                    accessor: "Action",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },
                             
                            ]

                            }
                            defaultPageSize={5}
                            showPaginationTop={false}
                            // pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                            showPaginationBottom
                            className="-striped -highlight"
                        />
                        </Animated>
                    </GridItem>
                    </GridContainer>
                <Card>


                    <CardBody>
                        <h4><small>OR and OR on OR</small></h4>
                        <GridContainer>
                            <GridItem xs={12} sm={4} md={4}>
                                <h5>For Team Business</h5>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <CustomInput
                                    labelText="OR %"
                                    id="Or"
                                    //value={}
                                    //name=''
                                    required={true}
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <CustomInput
                                    labelText="OR on OR%"
                                    id="OronOr"
                                    //value={}
                                    //name=''
                                    required={true}
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>


                            <GridItem xs={12} sm={4} md={4}>
                                <h5>For Self Business</h5>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <CustomInput
                                    labelText="OR %"
                                    id="Or"
                                    //value={}
                                    //name=''
                                    required={true}
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <CustomInput
                                    labelText="OR on OR%"
                                    id="OronOr"
                                    //value={}
                                    //name=''
                                    required={true}
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                        </GridContainer>
                    </CardBody>
                </Card>
            </div>


        );
    }
}
export default withStyles(style)(CreateIncentive);