import React from "react";
//import FormControl from "@material-ui/core/FormControl";
//import Datetime from "react-datetime";
import Button from "components/CustomButtons/Button.jsx";
//import MenuItem from "@material-ui/core/MenuItem";
//import Recaptcha from 'react-recaptcha'
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import Select from "@material-ui/core/Select";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
//import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
//import GoogleLogin from 'react-google-login';
//import { GoogleLogout } from 'react-google-login';
import CustomCheckbox from "components/Checkbox/CustomCheckbox.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
//import CustomRadiobutton from "components/CustomRadiobutton/CustomRadiobutton.jsx";
import config from '../../config';
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Radio from "@material-ui/core/Radio";
//import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
//import Checkbox from "@material-ui/core/Checkbox";
//import Check from "@material-ui/icons/Check";
//import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
//import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/jss";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import bindModel from 'components/ModelBinding/bindModel.js';
import $ from 'jquery'
class ModelTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            stateid: "",
            dstateid: "",
            cityid: "",
            dob:"",
            emp: { user: {}, lstState: [], lstCity: [], lstUser: [] },
            ctList: [],
            submit: "",
            masterId: "",
            istest: false,
            userType:'',
            masterList: [
                {
                    "masterType": "LOB",
                    "mdata": [
                        {
                            "commonTypeId": 1,
                            "masterType": "LOB",
                            "typeCode": "LOB",
                            "value": "Health"
                        }
                    ]
                }
            ],
            masterItemList: [],
        };


        this.handleState = this.handleState.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSimple = this.handleSimple.bind(this);
       // this.handleChange = this.handleChange.bind(this);
    }

    handleSimple = event => {
        console.log("log Data " + event.target.name);
        this.setState({ [event.target.name]: event.target.value });
       // this.state.emp.user.lastName = event.target.value;
        //const { name, value } = e.target
       // this.setState(state => ({ [name]: ...state[name], value }))
    }
    //handleChange({ target }) {
    //    console.log("log Data" + target.name + ' ' + target.value);
    //    this.setState({
    //       [target.name]: target.value
    //    });
    //  //  this.state.emp.user.firstName = target.value;
    //    console.log(this.state.emp.user.firstName);
    //}
    handleSubmit(e) {
        console.log("Good");
        e.preventDefault();
        this.state.emp.user.stateId = this.state.stateid;
        this.state.emp.user.cityId = this.state.cityid;
        console.log(this.state.emp.user);
        console.log(JSON.stringify(this.state.emp.user));

        console.log('Rbtn' +this.state.userType);
        $.ajax({
            url: `${config.localUrl}/SampleData/SaveUser`,
            type: "POST",
            data: JSON.stringify(this.state.emp.user),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log('data save result' + data);
            }
        });

    }

    handleState = event => {
        console.log('Name ' + event.target.name + 'value ' + event.target.value);
        fetch(`${config.localUrl}/SampleData/GetCity/?id=` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')

            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ctList: data });
                this.setState({ [event.target.name]: event.target.value });

            });

        //[event.target.name]: event.target.value });
        // this.setState({ctList: this.state.emp.lstCity.filter(item => item.stateId == event.target.value ) });
        console.log(event.target.value);
    }

    
    componentDidMount() {
        fetch(`${config.localUrl}/SampleData/GetData`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')

            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ emp: data });
                console.log("Emp Data");
                console.log(this.state.emp);
            });
        fetch(`https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/GetMasterData?sMasterlist=das`, {
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
                console.log("log Data");
                console.log(data);
                console.log(this.state.masterList);
            });
       

    }
    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    }

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }
   
    handleDate(date) {
        console.log('ID: ' + date._d + ' cfg ' + date.toDate()  );
        this.setState({ dob: date._d })
    };

    render() {

        const { classes } = this.props;
        const { model } = bindModel(this);
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>


            <form onSubmit={this.handleSubmit}>
                            <Card login className={classes[this.state.cardAnimaton]}>
                    <CardBody>
                        <h1><center>Test Page</center></h1>
                                    
                                        <CustomInput labelText="FirstName" id="fname" modelbind={model('emp.user.firstName')} value={this.state.emp.user.firstName} name='emp.user.firstName'  formControlProps={{ fullWidth: true }} />
                                   
                                    <CustomInput labelText="LastName" id="lname" modelbind={model('emp.user.lastName')} formControlProps={{ fullWidth: true }}  />
                                    <CustomDatetime labelText="Date of Birth" id='dob12' modelbind={model('dob')} name='emp.user.dobTest'  formControlProps={{ fullWidth: true }}/>

                                     <Dropdown labelText="State" id="stateid" lstObject={this.state.emp.lstState} value={this.state.stateid} name='stateid' onChange={this.handleState} formControlProps={{ fullWidth: true }} />
                                    {
                                        //<FormControl fullWidth> <Datetime id="dob1" dateFormat="DD/MM/YYYY" closeOnSelect={true} timeFormat={false} {...model('emp.user.dobTest')} inputProps={{ placeholder: "DOB" }} /> </FormControl>

                                        <Dropdown labelText="City" id="cityId" lstObject={this.state.ctList} value={this.state.cityid} name='cityid' onChange={this.handleSimple} formControlProps={{ fullWidth: true }} />
                                    }
                                    <CustomCheckbox id='chkEmployee' labelText="Employee" modelbind={model('emp.user.isEmployee')}/>
                                    <CustomCheckbox id='chkTest' labelText="Test" modelbind={model('istest')} />
                                    {
                                        //<CustomRadiobutton id='rbtn1' labelText='External' aria='A' name='rbtnExternal' modelbind={model('userType')} />
                                        //<CustomRadiobutton id='rbtn2' labelText='Internal' aria='A' name='rbtnInternal' modelbind={model('userType')} />
                                        //<CustomRadiobutton id='rbtn3' labelText='Admin' aria='A' name='rbtnAdmin' modelbind={model('userType')} />
                                        }
                                        <Button type="submit"  >Submit</Button>


                    </CardBody>

                </Card>
            </form>

                    </GridItem>
                </GridContainer>
            </div>

        );

    }
}
//export default withStyles(loginPageStyle)(PasswordPage);
export default withStyles(loginPageStyle)(ModelTest);