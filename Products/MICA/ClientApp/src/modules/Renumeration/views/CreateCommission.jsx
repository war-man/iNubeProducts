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
import Add from "@material-ui/icons/AddCircleOutline";
import Dropdown from "components/Dropdown/Dropdown.jsx";
//import _Single from "../Products/Micro/views/Covers/_Single";

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

class CreateCommission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retainFlag: false,
            commissiondata: {
                subchannelId: "",
                productCategoryId:"",
            },
            tableData: [],
            "commissionData": [{
                "policyterm1": "", 
                "policyterm2": "",
                "modeId": "",
                "policyyear1": "",
                "policyyear2": "",
                "commissionpercent":"",
            }],
            masterList: [
                { mid: 1, mValue: "SINGLE", mType: "Mode" },
                { mid: 2, mValue: "ANNUAL", mType: "Mode" },
                { mid: 3, mValue: "SEMI - ANNUAL", mType: "Mode" },
                { mid: 4, mValue: " MONTHLY", mType: "Mode" },
            ]
        }
    };
    componentDidMount() {
        this.AddRow();
    }

    SetValue = (type, event) => {
        //let UserData = this.state.UserData;
        //let name = event.target.name;
        //let value = event.target.value;

        //UserData[name] = value;

        //this.setState({ UserData })
        //this.setState({ fields: UserData })
        //this.change(event, name, type);
        //console.log("pks");
        //if (name == 'email') {
        //    this.emailcheck(event.target.name, event.target.value);
        //}
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
            policyterm1: "", policyterm2: "", modeId: "",policyyear1: "", policyyear2: "", commissionpercent: "", });
        this.setState({});
      
        console.log("iindex", index);
        this.AddRow();
  
    }
    GetMasterData = (event) => {
        //debugger;
        let commissiondetails = this.state.commissiondata;
        let name = event.target.name;
        let value = event.target.value;

        commissiondetails[name] = value;

        this.setState({ commissiondetails })
    }
    SetddlsValue1 = (event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        let treatydata = this.state.commissionData;
        treatydata[index][name] = value;
        this.setState({ treatydata });
        this.AddRow();
    }
    AddRow = () => {
        this.setState({
            tableData: this.state.commissionData.map((prop, key) => {
              
                return {
                    id: key + 1,

                    policyterm1: <CustomInput labelText="" id="policyterm1" required={true} value={this.state.commissionData[key].policyterm1} name="policyterm1" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    policyterm2: <CustomInput labelText="" id="policyterm2" required={true} value={this.state.commissionData[key].year} name="year" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    modeId: <Dropdown id="modeId" labelText={(this.state.commissionData[key].modeId == "") ? "Select" : ""} lstObject={this.state.masterList} value={this.state.commissionData[key].modeId} name='modeId' formControlProps={{ fullWidth: true }} onChange={(e) => this.SetddlsValue1(e, key)}
                    />,
                    policyyear1: <CustomInput labelText="" id="policyyear1" required={true} value={this.state.commissionData[key].policyyear1} name="policyyear1" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    policyyear2: <CustomInput labelText="" id="policyyear2" required={true} value={this.state.commissionData[key].policyyear2} name="policyyear2" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    commissionpercent: <CustomInput labelText="" id="commissionpercent" required={true} value={this.state.commissionData[key].commissionpercent} name="commissionpercent" onChange={(e) => this.SetcommissionValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
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

                            <Icon><img id="icon"/></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small>Create Commission</small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                    <GridContainer>
                        
                         <GridItem xs={12} sm={4} md={4}>
                                <FormControl id="form-btm"

                                    fullWidth
                                    className={classes.selectFormControl}
                                >
                                    <InputLabel
                                        htmlFor="simple-select"
                                        className={classes.selectLabel}
                                    >
                                        Sub Channel
                                             </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={this.simpleSelect}
                                        onChange={this.handleSimple}
                                        inputProps={{
                                            name: "simpleSelect",
                                            id: "simple-select"
                                        }}
                                    >
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="1"
                                        >
                                            AGENCY
                            </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="2"
                                        >
                                            BANK1
                            </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="3"
                                        >
                                            HSBC
                            </MenuItem>



                                    </Select>
                                </FormControl>
                          </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                                <FormControl id="form-btm"

                                    fullWidth
                                    className={classes.selectFormControl}
                                >
                                    <InputLabel
                                        htmlFor="simple-select"
                                        className={classes.selectLabel}
                                    >
                                        Product Category
                                             </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={this.simpleSelect}
                                        onChange={this.handleSimple}
                                        inputProps={{
                                            name: "simpleSelect",
                                            id: "simple-select"
                                        }}
                                    >
                                       
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="1"
                                        >
                                            TERM INSURANCE
                            </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="2"
                                        >
                                            ENDOWMENT
                            </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="3"
                                        >
                                            UNIVERSAL LIFE
                            </MenuItem>



                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <FormControl id="form-btm"

                                    fullWidth
                                    className={classes.selectFormControl}
                                >
                                    <InputLabel
                                        htmlFor="simple-select"
                                        className={classes.selectLabel}
                                    >
                                        Influencining Factors
                                             </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={this.simpleSelect}
                                        onChange={this.handleSimple}
                                        inputProps={{
                                            name: "simpleSelect",
                                            id: "simple-select"
                                        }}
                                    >
                                     
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="2"
                                        >
                                           MODE
                            </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="3"
                                        >
                                            POLICY TERM
                            </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="4"
                                        >
                                            POLICY YEAR
                            </MenuItem>



                                    </Select>
                                </FormControl>
                            </GridItem>
                      </GridContainer>
                    </CardBody>
                </Card>


                <GridContainer>
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <ReactTable
                                title="Update commission % for all combinations"
                                data={this.state.tableData}
                            filterable
                            columns={[

                              
                                    {
                                        Header: "Policy Term1",
                                    accessor: "policyterm1",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 65,
                                        resizable: false,

                                    },
                                    {
                                        Header: "Policy Term2",
                                        accessor: "policyterm2",
                                        style: { textAlign: "right" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,

                                    },
                                    {

                                        Header: "Mode",
                                        accessor: "modeId",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 90,
                                        resizable: false,
                                    },
                                    {
                                        Header: "Policy Year1",
                                        accessor: "policyyear1",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 90,
                                        resizable: false,
                                    },

                                    {
                                        Header: "Policy Year2",
                                        accessor: "policyyear2",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,

                                    },
                                    {
                                        Header: "Commission %",
                                        accessor: "commissionpercent",
                                        style: { textAlign: "right" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,

                                    },
                                    {
                                        Header: "Actions",
                                        accessor: "Action",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 40,
                                        resizable: false,

                                    }
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

                <GridContainer justify="center">
                    <Button round /*disabled={this.state.btnload}*/ align="center" color="success" >Save</Button>
                    <Button round /*disabled={this.state.btnload}*/ align="center" color="success" >Cancel</Button>
                </GridContainer>
            </div>


        );
    }
}
export default withStyles(style)(CreateCommission);