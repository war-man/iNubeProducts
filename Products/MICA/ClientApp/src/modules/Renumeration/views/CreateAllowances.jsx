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
import CustomDropDownTree from "components/CustomDropdownTree/CustomDropDownTree.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
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

class CreateAllowances extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retainFlag: false,
          //customddl: [],
            customddl: [
                {
                    label: 'Designation1',
                    value: 'DESIGNATION1',
                    
                },
                {
                    label: 'Designation2',
                    value: 'DESIGNATION2',
                   
                },
                {
                    label: 'Designation3',
                    value: 'DESIGNATION3'
                },
            ],
            tableData: [],
            "commissionData": [{
                "designation":"",
                "avgach75": "",
                "avgach100": "",
                "avgach150": "",
                "avgach220": "",
            }],
        }
    };


   
    componentDidMount() {
        this.AddRow();
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
            policyterm1: "", policyterm2: "", modeId: "", policyyear1: "", policyyear2: "", commissionpercent: "",
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

                    designation: <CustomInput labelText="" id="policyterm1" required={true} value={this.state.commissionData[key].designation} name="designation" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    avgach75: <CustomInput labelText="" id="policyterm2" required={true} value={this.state.commissionData[key].avgach75} name="avgach75" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    avgach100: <CustomInput labelText="" id="policyyear1" required={true} value={this.state.commissionData[key].avgach100} name="avgach100" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    avgach150: <CustomInput labelText="" id="policyyear2" required={true} value={this.state.commissionData[key].avgach150} name="avgach150" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    avgach200: <CustomInput labelText="" id="commissionpercent" required={true} value={this.state.commissionData[key].avgach200} name="avgach200" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    Action: <div><Button justIcon round simple color="info" className="add" onClick={(e) => this.AddRecord(e, key)} ><Add /> </Button >
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
                                    <small>Create Allowance</small>
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
                                <GridItem xs={4} sm={4} >
                                <h6>Designation</h6>
                                    <CustomDropDownTree className="dropdowntree"
                                        data={this.state.customddl}
                                        label="Designation"
                                    //onChange={}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>

                <GridContainer>
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <ReactTable
                            title="KPI Targets Per Designation"
                                //data={this.newdata}
                                filterable
                                columns={[


                                    {
                                        Header: "Designation",
                                        accessor: "Type",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 65,
                                        resizable: false,

                                    },
                                    {
                                        Header: "KPI",
                                        accessor: "LeadNo",
                                        style: { textAlign: "right" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,

                                    },
                                    {

                                        Header: "Target Value",
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
                </GridContainer>  <br/><br/>
                
                <GridContainer>
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                  
                            <ReactTable
                            title="Allowance Amounts based on Average of Achievements"
                                data={this.state.tableData}
                                filterable
                                columns={[


                                    {
                                        Header: "Designation",
                                        accessor: "designation",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 65,
                                        resizable: false,

                                    },
                                    {
                                        Header: "Avg Ach<=75%",
                                        accessor: "avgach75",
                                        style: { textAlign: "right" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,

                                    },
                                    {

                                        Header: "75<Avg Ach<=100%",
                                        accessor: "avgach100",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                    },
                                    {
                                        Header: "100<Avg Ach<=150%",
                                        accessor: "avgach150",
                                        style: { textAlign: "right" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,

                                    },
                                    {

                                        Header: "150<Avg Ach<=200%",
                                        accessor: "avgach200",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
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
           </div>


        );
    }
}
export default withStyles(style)(CreateAllowances);