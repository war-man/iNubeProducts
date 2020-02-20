﻿import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import { Redirect } from 'react-router-dom';
import { Paper } from "@material-ui/core";
import CalCulatePremuim from "./CalCulatePremium.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import EdelweissConfig from "./EdelweissConfig.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

const Styleinput = withStyles({
    root: {
        //background: '#e7ab37ad !important',
        background: 'rgba(231, 171, 55, 0.82)!important',
        //background: '#fff !important',
        //borderTopLeftRadius: '5px',
        //borderTopRightRadius: '5px'
        borderRadius: '0px !important'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: 'white !important'
    },
})(TextField);

const Styledropdown = withStyles({
    root: {
        background: '#e7ab37ad !important',
        // background: '#fff !important',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        width: '12rem !important'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: '#white'
    },
})(FormControl);

const StyleAutocomplete = withStyles({
    root: {
        //width: "13rem",
        //background: '#e7ab37ad !important',
        //borderTopLeftRadius: '5px',
        //borderTopRightRadius: '5px',
    },
    label: {
        color: 'white !important'
    },
})(Autocomplete);


class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            newmasterList: [],
            citylist: [],
            redirect: false,
            masterList: [],
            citymasList: [],
            result: [],
            citymaster: [],
            ftmpval: 0,
            adpmpdval: 0,
            res: 0,
            num1: 0,
            num2: 0,
            stateCode:"",
            quote: {
                age: "",
                carmake: "",
                pincode: "",
                year: ""

            },
            tags: [],
            //quotationDTO: {
            //    "quoteId": "",
            //    "quotationNumber": "",
            //    "primaryDriverName": "",
            //    "mobileno": "",
            //    "age": "",
            //    "experience": "",
            //    "vehicleAge": "",
            //    "city": "",
            //    "vehicleMakeModelId": "",
            //    "policyNumber": "",
            //    "sumInsured": "",
            //    "createdDateTime": "",
            //    "numberOfDrivers": "",
            //    "numberOfVehicle": "",
            //    "premium": ""
            //},

            //fields: {

            //        "SI": "500000",
            //        "NOOFTW": "1",
            //        "NOOFPC": "3"

            //},
            //rate: {

            //        "DEXPRT_Exp": "6",
            //        "PDAGERT_PAge": "35",
            //        "ADDRVRT_DRV": "1",
            //        "AVFACTORPC_PC_NOOFPC": "3",
            //        "AVFACTORTW_TW_NOOFPC": "3",
            //        "AVFACTORTW_TW_NOOFTW": "1",
            //        "FSTTAX_TAXTYPE": "IGST",
            //        "TSTTAX_TAXTYPE": "NA"

            //},
            quotationDTO: {
                "quoteId": 0,
                "quotationNumber": "",
                "primaryDriverName": "",
                "mobileno": "",
                "age": "",
                "experience": "",
                "vehicleAge": "",
                "city": "",
                "vehicleMakeModelId": "",
                "policyNumber": "",
                "sumInsured": "",
                "createdDateTime": "",
                "numberOfDrivers": "",
                "numberOfVehicle": "",
                "premium": "",
                "frequency": "",
                "startDate": ""
            },
            calpremDTO: {
                quotationDTO: {},
                stateCode:"",
            }
        };
    }

    componentDidMount() {
        const props = this.props;
        console.log("porpsdat", props)


        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/GetVehicleMaster?isFilter=true `, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
        console.log("data", this.state.masterList);

        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/GetCityMaster?lMasterlist=rtyu&isFilter=true`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("citymasList: ", data);
                this.setState({ citymasList: data });
            });
        console.log("data", this.state.citymasList);


    }

    handleautocomplete = (event, values,name) => {
        console.log("vvv",event, event.key, values, name, event.target.value, event.target.value + event.key,values); 

        if (name=="city") {
            let searchKey = event.target.value + event.key;
            fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/SmartCityMaster?searchString=` + searchKey, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("masterList1", data);
                    this.setState({ citymaster: data });
                    console.log("masterList2", this.state.citymaster);
                });

        }


       
    }

    handleCity = (event, values, name) => {
        console.log("eve", values);
        if (name == "vehicleMakeModelId") {
            fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/GetSIFromMakeModel?VehicleId=` + values.mID, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("calcprem", data);
                    this.state.quotationDTO.sumInsured = data;
                    console.log("qdto", this.state.quotationDTO);
                    this.setState({});
                    //this.setState({ quotationDTO: data });
                });
        }

        let quotation = this.state.quotationDTO;
        if (name == "vehicleMakeModelId") {
            quotation[name] = values.mID;
        } else if (name == "city" && values != null) {
            quotation[name] = values.cityId;
        }
        this.setState({ quotation });

        console.log("tags: ", quotation)
        if (values != null) {
            debugger;
            fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/GetStateCode?CityName=` + values.cityName, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("calcprem1112222", data);
                    //this.state.stateCode = data;
                    //console.log("qdto", this.state.quotationDTO);
                    //this.setState({ stateCode: data.stateCode });
                    let statecode = data.stateCode;
                    this.setState({ stateCode: statecode });
                    console.log("stcode", this.state.stateCode);
                    //this.setState({ quotationDTO: data });
                });
            console.log("stcode111", this.state.stateCode);
        }
      
    }

    renderRedirect = () => {
        console.log("stcode123", this.state.stateCode);
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/DriverPage',
                state: { quotationDTO: this.state.quotationDTO, stateCode: this.state.stateCode,}
            }} />
        }
    }

    quickbuyRedirect = () => {
        console.log("quotationDTO", this.state.quotationDTO);
        this.renderRedirect();
        this.setState({ redirect: true })
       
    }

    onInputChange = (event) => {
        const fields = this.state.quotationDTO;
        let name = event.target.name;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        console.log(this.state.quotationDTO.vehicleMakeModelId, '200')
    }

    handleinput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    //renderRedirect = () => {
    //    if (this.state.redirect === true) {
    //        return <Redirect to={{
    //            pathname: '/pages/DriverPage',
    //            state: { quotationDTO: this.state.quotationDTO, }

    //        }} />
    //    }
    //}

    onInputChange = (event) => {

        const fields = this.state.quotationDTO;
        let name = event.target.name;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        console.log(this.state.quotationDTO.vehicleMakeModelId, '200')
    }

    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer lg={12}>
                    <h2 className="hero-text">I am a <Styleinput className="label-input" id="text-field-hero" label="Age" variant="filled" value={this.state.quotationDTO.age} onChange={this.onInputChange} name='age' formControlProps={{ fullWidth: true }} /> year old, driving a
                        </h2>  <StyleAutocomplete
                        //className="autocomplete"
                        name="vehicleMakeModelId"
                        options={this.state.masterList}
                        getOptionLabel={option => option.mValue}
                        onChange={(e, value) => this.handleCity(e, value, 'vehicleMakeModelId')}
                        renderInput={params => (
                            <Styleinput {...params} variant="filled" style={{ width: "12rem", top: "8px" }} id="text-field-hero" label="Car make model" formControlProps={{ fullWidth: true }} />
                        )}
                    />
                    <br />
                    <h2 className="hero-text">
                        in </h2>
                    <StyleAutocomplete
                        //className="autocomplete"
                        name="city"
                        options={this.state.citymaster}
                        getOptionLabel={option => option.cityName}
                        onChange={(e, value) =>this.handleCity(e, value, 'city')}
                        onKeyPress={(e, value) => this.handleautocomplete(e, value,'city')}
                        //value={this.state.quotationDTO.city}
                        renderInput={params => (
                            <Styleinput {...params} variant="filled" id="text-field-hero" style={{ width: "12rem", top: "8px" }} label="City" formControlProps={{ fullWidth: true }} />
                        )}
                    />
                    <h2 className="hero-text">city. My vehicle is approximately </h2><h2 className="hero-text">  <Styleinput label="Year" id="text-field-hero" variant="filled" value={this.state.quotationDTO.vehicleAge} onChange={this.onInputChange} name='vehicleAge' formControlProps={{ fullWidth: true }} />  years old & I  have  a driving</h2>
                    <h2 className="hero-text"> experience of <Styleinput label="Year" variant="filled" id="text-field-hero" value={this.state.quotationDTO.experience} name='experience' formControlProps={{ fullWidth: true }} onChange={this.onInputChange}/> Years.</h2><br />
                </GridContainer>
                <GridContainer justify="center">
                    {this.renderRedirect()}
                    <Button round color="primary" onClick={this.quickbuyRedirect}> Get a quick quote</Button>
                </GridContainer>
            </div >
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(HomePage);