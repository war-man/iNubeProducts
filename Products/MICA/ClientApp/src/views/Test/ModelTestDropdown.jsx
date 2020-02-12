import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import Button from "components/CustomButtons/Button.jsx";
import MenuItem from "@material-ui/core/MenuItem";
//import Recaptcha from 'react-recaptcha'
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Select from "@material-ui/core/Select";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
//import GoogleLogin from 'react-google-login';
//import { GoogleLogout } from 'react-google-login';

import config from '../../config';

//import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
//import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/jss";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import withStyles from "@material-ui/core/styles/withStyles";


class ModelTestddl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            stateid: "",
            cityid: "",
            emp: { user: {}, lstState: [], lstCity: [], lstUser: [] },
            lobList:[],
            ctList: [],
            masterList:[],
            submit: ""
        };


        this.handleState = this.handleState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });

    }
    handleChange({ target }) {
        //this.setState({
        //    emp.user[target.name]: target.value
        //});
    }
    handleSubmit(e) {
        console.log("Good");
        e.preventDefault();
        console.log(this.state.emp);
       // alert('A name was submitted: ' + this.state.value);
        //event.preventDefault();
    }

    handleState = event => {

        //alert(event.target.value);

        //fetch(`${config.localUrl}/SampleData/GetCity/?id=` + event.target.value,{
    //    method: 'GET',
    //        headers: {
    //        'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //    },
    //})
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ ctList: data });
        //        this.setState({ [event.target.name]: event.target.value });

        //    });

        //[event.target.name]: event.target.value });
        // this.setState({ctList: this.state.emp.lstCity.filter(item => item.stateId == event.target.value ) });
        console.log(event.target.value);


        //const responseGoogle = (response) => {
        //    console.log(response);
        //}

    }

    
    componentDidMount() {
       // fetch(`${config.localUrl}/SampleData/GetData`)
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
                console.log(Object.keys(this.state.masterList));
            });

    }

    onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }


    render() {

        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>


            <form onSubmit={this.handleSubmit}>
                            <Card login className={classes[this.state.cardAnimaton]}>
                    <CardBody>
                        <h1><center>Test Page</center></h1>

                                    <CustomInput labelText="FirstName" id="fname"  onChange={this.handleChange} formControlProps={{ fullWidth: true }} />
                            

                                    <CustomInput labelText="LastName" id="lname" formControlProps={{ fullWidth: true }} />
 <InputLabel>Date of Birth</InputLabel>

                                <FormControl fullWidth> <Datetime timeFormat={false} inputProps={{ placeholder: "DOB" }} /> </FormControl>
                            <FormControl
                                    fullWidth
                                    className={classes.selectFormControl}
                                >
                                    <InputLabel htmlFor="stateId"
                                        className={classes.selectLabel}> State</InputLabel>
                                    <Select
                                        MenuProps={{

                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={this.state.stateid}
                                        onChange={this.handleState}
                                        inputProps={{
                                            name: "stateid",
                                            id: "ddlstate"
                                        }}
                                    >

                                        {
                                            this.state.emp.lstState.map(item =>
                                                <MenuItem value={item.stateId} classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}> {item.stateName}


                                                </MenuItem>
                                            )


                                        }


                                    </Select>
                                </FormControl>
                          


                        <FormControl
                                    fullWidth
                                    className={classes.selectFormControl}
                                >
                                    <InputLabel htmlFor="cityId"
                                        className={classes.selectLabel}> City</InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={this.state.cityid}
                                        onChange={this.handleSimple}
                                        inputProps={{
                                            name: "cityid",
                                            id: "ddlcity"
                                        }}
                                    >

                                        {

                                            this.state.ctList.map(item1 =>


                                                <MenuItem
                                                    value={item1.cityId} classes={{

                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}> {item1.cityName}

                                                </MenuItem>
                                            )}





                                    </Select>
                                </FormControl>
                           



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
export default withStyles(loginPageStyle)(ModelTestddl);