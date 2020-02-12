import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import DynamicFormTesting from "./DynamicFormTesting.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { fade } from "@material-ui/core/styles";
import swal from 'sweetalert';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import { config } from "../../config";
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";


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

//const maritalstatus = {
//        [ mID= "Package", mValue= "Male", mType= 1 ],
//        [ mID= "Product", mValue= "Female", mType= 2 ],
//};


class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: "",
            radioVal: "",
            checkbox: "",
            firstname: "",
            dob: "",
            countryName: "",
            maritalStatusId: "",
            disabled: false,
            masterList: [],
            loader: false,
            dynamicgrid: [],
            save: "",
            tablelist: [],
            dynamicdata: {
                firstname: "",
                dob: "",
                countryName: "",
                maritalStatusId: "",
                checkbox: "",
                radio: "",
            },
            radiodata: [
                { selectedValue: 1, mID: 1, mValue: "radio1" },
                { selectedValue: 1, mID: 2, mValue: "radio2" }
            ],
            //tabledata: [
            //    { parameterName: [{ header: "FirstName", header: "Age", header: "DOB", header: "MobileNumber" }], value: [{ value: "abc", value: "3", value: "01/02/2020", value: "9876543210" }] },
            //    { parameterName: [{ header: "FirstName", header: "Age", header: "DOB", header: "MobileNumber" }], value: [{ value: "bcgd", value: "1", value: "01/02/2020", value: "9876543210" }] },
            //    { parameterName: [{ header: "FirstName", header: "Age", header: "DOB", header: "MobileNumber" }], value: [{ value: "asjsj", value: "3", value: "01/02/2020", value: "9876543210" }] },
            //    { parameterName: [{ header: "FirstName", header: "Age", header: "DOB", header: "MobileNumber" }], value: [{ value: "sidk", value: "4", value: "01/02/2020", value: "9876543210" }] },
            //],
            //tabledata: [
            //    { parameterName: "FirstName", value: [{ FirstName: "abc", Age: "3", DOB: "01/02/2020", MobileNumber: "9876543210" }] },
            //    { parameterName: "Age", value: [{ FirstName: "bcgd", Age: "1", DOB: "01/02/2020", MobileNumber: "9876543210" }] },
            //    { parameterName: "DOB", value: [{ FirstName: "asjsj", Age: "3", DOB: "01/02/2020", MobileNumber: "9876543210" }] },
            //    { parameterName: "Mobile Number", value: [{ FirstName: "sidk", Age: "4", DOB: "01/02/2020", MobileNumber: "9876543210" }] },
            //],
            count: "",
            tabledata: [
                { FirstName: "abc", Age: "20", DOB: "01/02/2000", MobileNumber: "9876543210" },
                { FirstName: "asjs", Age: "30", DOB: "01/02/1990", MobileNumber: "1234567890" },
                { FirstName: "aahshc", Age: "40", DOB: "01/02/1980", MobileNumber: "6789054321" },
                { FirstName: "csjk", Age: "50", DOB: "01/02/1970", MobileNumber: "6543217890" }
            ],
            tablelist: [
                { Header: "FirstName", accessor: "FirstName" },
                { Header: "Age", accessor: "Age" },
                { Header: "DOB", accessor: "DOB" },
                { Header: "MobileNumber", accessor: "MobileNumber" }
            ],
            Country: [
                { mID: "1", mValue: "India", mType: 1 },
                { mID: "2", mValue: "Asia", mType: 2 },
            ],
            dynamic: [],
            data: [
                {
                    id: 1,
                    name: "a",
                    age: 29,
                    qualification: "B.Com",
                    rating: 3,
                    gender: "male",
                    city: "Kerala",
                    skills: ["reactjs", "angular", "vuejs"]
                },
                {
                    id: 2,
                    name: "b",
                    age: 35,
                    qualification: "B.Sc",
                    rating: 5,
                    gender: "female",
                    city: "Mumbai",
                    skills: ["reactjs", "angular"]
                },
                {
                    id: 3,
                    name: "c",
                    age: 42,
                    qualification: "B.E",
                    rating: 3,
                    gender: "female",
                    city: "Bangalore",
                    skills: ["reactjs"]
                }
            ],
            current: {}
        };
    }
    onDateChange = (name, event) => {

        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        //this.setState({ [event.target.name]: date });

        let data = this.state.dynamicdata;
        data[name] = date;
        this.setState({ data });

        //console.log("Date: ", event.target.value);
        //console.log("Date: ", this.state.dob)
        //name = date;
    }

    SetValue = (event) => {
        let data = this.state.dynamicdata;
        let name = event.target.name;
        let value = event.target.value;

        data[name] = value;
        this.setState({ data });
        //this.setState({ [event.target.name]: event.target.value })
        console.log("data: ", event.target.value);
        console.log("data: ", this.state.firstname);
    }

    handleSubmit = (event) => {
        console.log("final data: ", this.state.dynamicdata);
        swal({
            //text: this.state.dynamicdata,
            text: "Check data in console",
            icon: "success"
        });
    }

    GetMasterData = (event) => {
        this.SetValue(event);
        //this.setState({ [event.target.name]: event.target.value })
        //console.log("data: ", event.target.value);
        //console.log("data: ", this.state.maritalStatusId);
    }

    handleRadioChange = (e, listname) => {
        //this.state.dynamicdata.radio = e.target.value;


        let checkedRadio = this.state[listname].filter(item => item.mValue === e.target.name);
        checkedRadio[0].selectedValue = checkedRadio[0].mID;
        checkedRadio[0].mIsRequired = true;


        let uncheckedRadio = this.state[listname].filter(item => item.mValue !== e.target.name);
        uncheckedRadio.map((item) => item.selectedValue = 2);
        uncheckedRadio.map((item) => item.mIsRequired = false);

        this.setState({});

        //this.state.radioVal = e.target.value;
        // console.log("radio ", e.target.value);
        console.log("radio ", this.state[listname]);
        //this.setState({ selectedValue: e.target.value })
    }

    GetLocation = (event) => {
        this.SetValue(event);
        //this.setState({ [event.target.name]: event.target.value })
        //console.log("data: ", event.target.value);
        //console.log("data: ", this.state.countryName);
    }

    SetCheckValue = (e) => {
        let check = this.state.dynamicdata;
        let name = 'checkbox';
        let value = e.target.checked;

        check[name] = value;
        this.setState({ check });
        //let check=this.state.dynamicdata;
        //check.checkbox = e.target.value;
        //this.setState({ check});
        //this.setState({ [e.target.name]: e.target.checked });
        //console.log("checked: ", e.target.checked);
        //console.log("checked: ", this.state.checkbox);
    }

    componentDidMount() {
        const { classes } = this.props;
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("masterlist: ", this.state.masterList)
            });


        setTimeout(
            function () {
                this.setState({ loader: true });
                this.dynamictable();
                this.dynamicdisplay();
                this.state.count = this.state.dynamic.length;
                this.setState({});
                console.log("Count: ", this.state.count);
            }.bind(this), 2000
        );

    }

    dynamicdisplay = () => {
        let dynamic = this.state.dynamic;
        dynamic.push(<CustomInput labelText="First Name" id="fName" name='firstname' value={this.state.dynamicdata.firstname} required={true} onChange={(e) => this.SetValue(e)} formControlProps={{ fullWidth: true }} />);
        dynamic.push(<CustomDatetime labelText="Date Of Birth" id='dob' name='dob' value={this.state.dynamicdata.dob} Futuredatevalidate={true} required={true} onChange={(evt) => this.onDateChange('dob', evt)} formControlProps={{ fullWidth: true }} />);
        dynamic.push(<MasterDropdown labelText="Marital Status" required={true} value={this.state.dynamicdata.maritalStatusId} id="MaritalStatus" lstObject={this.state.masterList} filterName='MaritalStatus' name='maritalStatusId' onChange={(e) => this.GetMasterData(e)} formControlProps={{ fullWidth: true }} />);
        dynamic.push(<Dropdown labelText="Country" id="User.countryId" disabled={false} value={this.state.dynamicdata.countryName} required={true} lstObject={this.state.Country} name="countryName" onChange={(e) => this.GetLocation(e)} formControlProps={{ fullWidth: true }} />);
        dynamic.push(<CustomCheckbox name="checkbox"  style={{margintop: "12px"}} labelText="checkbox" value={this.state.dynamicdata.checkbox} onChange={(e) => this.SetCheckValue(e)} formControlProps={{ fullWidth: true }} /*checked={item.mIsRequired} disabled={(props.componentData.viewdisable == true) ? true : false} */ />)
        dynamic.push(<CustomRadioButton radiolist={this.state.radiodata} onChange={(e) => this.handleRadioChange(e, "radiodata")} disabled={false} />)
        dynamic.push(<Button round disabled={false} align="center" onClick={this.handleSubmit} color="success">Save</Button>);
        this.setState({ dynamic });
    }

    dynamictable = () => {
        //this.setState({
        //    tablelist: this.state.tabledata.map((prop, key) => {
        //        return {
        //            //    Header: prop.parameterName, //[key].header,
        //            //    accessor: prop.value[0].parameterName//[key].value
        //            //};
        //            Header: prop.parameterName,
        //            accessor: "parameterName",//prop.value,
        //        };
        //    })
        //});
        console.log("datalist: ", this.state.tablelist)
        console.log("datalist: ", this.state.tabledata)
        this.state.dynamicgrid.push(
            <ReactTable
                data={this.state.tabledata}
                filterable
                columns={this.state.tablelist}

                defaultPageSize={5}
                showPaginationTop={false}
                showPaginationBottom
                className="-striped -highlight discription-tab"
            />);
    }

    onSubmit = model => {
        let data = [];
        if (model.id) {
            data = this.state.data.filter(d => {
                return d.id != model.id;
            });
        } else {
            model.id = +new Date();
            data = this.state.data.slice();
        }

        this.setState({
            data: [model, ...data],
            current: {} // todo
        });
    };

    onEdit = id => {
        let record = this.state.data.find(d => {
            return d.id == id;
        });
        //alert(JSON.stringify(record));
        this.setState({
            current: record
        });
    };

    onNewClick = e => {
        this.setState({
            current: {}
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.loader ?
                    <GridContainer>
                        <GridItem lg={12}>
                            <Card>
                                <CardBody>
                                    <GridContainer>
                                        {this.state.dynamic.map(function (item, key) {
                                            if (this.state.count - 1 != key) {
                                                return (
                                                    <GridItem xs={12} sm={4} key={key}>
                                                        {item}
                                                    </GridItem>
                                                );
                                            } else {
                                                return (
                                                    <GridContainer justify="center">
                                                        {/*<GridItem xs={12} sm={4} key={key}>*/}
                                                        {item}
                                                        {/* </GridItem>*/}
                                                    </GridContainer>
                                                );
                                            }
                                        }.bind(this))
                                        }
                                    </GridContainer>
                                    {/*<GridContainer>
                    <GridItem xs={12} sm={4}>
                        {this.state.firstname}
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        {this.state.dob}
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        {this.state.save}
                    </GridItem>
                </GridContainer>*/}
                                </CardBody>

                            </Card>
                        </GridItem>
                        <GridItem lg={12}>
                            {this.state.dynamicgrid}
                        </GridItem>
                    </GridContainer>
                    : <PageContentLoader />}
            </div>
        );
    }
}

export default DynamicForm;