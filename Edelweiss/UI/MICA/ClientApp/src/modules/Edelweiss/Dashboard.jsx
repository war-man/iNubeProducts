import React from "react";
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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom'
import { Paper, Divider } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MuiButton from '@material-ui/core/Button';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Car from "assets/img/Car.jpg";
import Bike from "assets/img/Bike.png";
import Scheduler from './Scheduler.jsx';
import Modal from '@material-ui/core/Modal';

import EdelweissConfig from "./EdelweissConfig.js";
const Styledivider = withStyles({
    root: {
        color: "#000",
        width: '67rem',
        height: '0.1rem',
    }
})(Divider);

const StyleButton = withStyles({
    root: {
        fontSize: '12px',
        //color:'#ddd'
    },
    //label: {
    //    textTransform: 'capitalize',
    //    color: 'white'
    //},
})(MuiButton);

const Styleinput = withStyles({
    root: {
        //background: '#e7ab37ad !important',
        background: '#fff !important',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: 'white'
    },
})(TextField);

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: {
                vehicleRegistrationNo: "",
                policyNo: "",
                vehicleType: "",
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false,
                switchStatus: false,
                switchEnabled: false,
            },
            scheduleobject: {
                "vehicleRegistrationNo": "",
                "policyNo": "",
                "switchState": true
            },
            hidepage: true,
            createschedule: {
                vehicleRegistrationNo: "",
                policyNo: "",
                vehicleType: "",
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false,
            },
            openschedule: false,
            getSchedule: {
                "vehicleRegistrationNo": "KA01W6666",
                "policyNo": "750000109",
                "vehicleType": null,
                "mon": false,
                "tue": false,
                "wed": false,
                "thu": true,
                "fri": true,
                "sat": true,
                "sun": true,
                "switchStatus": true,
                "switchEnabled": false
            },
        };
    }

    //handleSubmit = () => {
    //    swal({
    //        text: "Do Service",
    //        icon: "error"
    //    })
    //}

    handleCheckbox = (e) => {
        let scheduler = this.state.schedule;
        let name = e.target.name;
        let checked = e.target.checked;

        scheduler[name] = checked;

        this.setState({ scheduler });
        console.log("scheduler: ", scheduler);

        if (name == "switchStatus") {
            if (scheduler.switchStatus == true) {
                swal({
                    text: "Are you sure on switching on the schedule?",
                    icon: "info",
                    buttons: ["No", "Yes"]
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            //executes only if user click on yes
                            let object = this.state.scheduleobject;
                            object.switchState = scheduler.switchStatus;
                            this.setState({ object });

                            fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/SwitchOnOff`, {
                                method: 'post',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': localStorage.getItem('edelweisstoken')
                                },
                                body: JSON.stringify(object)
                            }).then(response => response.json())
                                .then(data => {

                                    console.log('response: ', data);
                                    swal({
                                        text: data.responseMessage,
                                        icon: "success"
                                    })
                                });

                        } else {
                            scheduler.switchStatus = false;
                            this.setState({ scheduler });
                        }
                    });
            }
            if (scheduler.switchStatus == false) {
                debugger;
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + (today.getHours()) + ':' + (today.getMinutes()) + ':' + (today.getSeconds());
                var time = (today.getHours()) + ':' + (today.getMinutes()) + ':' + (today.getSeconds());
                if (time >= '09:00:00') {
                    swal({
                        text: "You can not change the schedule right now",
                        icon: "error"
                    })
                }
                scheduler.switchStatus = true;
                this.setState({ scheduler });
            }
        }
    }


    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/BillingFrequency',

            }} />
        }
        else if (this.state.redirectback === true) {
            return <Redirect to={{
                pathname: '/pages/ProceedPayment',

            }} />
        }
    }

    handleSubmit = () => {
        console.log("schedular: ", this.state.schedule);
        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/CreateUpdateSchedule`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
            body: JSON.stringify(this.state.schedule)
        }).then(response => response.json())
            .then((data) => {
                console.log("response ", data);

                if (data.status == 1) {
                    swal({
                        text: "Schedule updated  successfully!",
                        icon: "success"
                    })
                    this.props.handleviewClose();
                }
                else {
                    swal({
                        text: data.responseMessage,
                        icon: "error"
                    })
                }
            });

    }

    componentDidMount() {

        console.log("number: ", this.props.vehicleno, this.props.policynumber);
        let object = this.state.scheduleobject;
        object.policyNo = this.props.policynumber;
        object.vehicleRegistrationNo = this.props.vehicleno;
        this.setState({ object });

        let createschedule = this.state.createschedule;
        createschedule.vehicleRegistrationNo = this.props.vehicleno;
        createschedule.policyNo = this.props.policynumber;
        createschedule.vehicleType = this.props.vehiclestype;
        this.setState({ createschedule })

        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/GetSchedule?VehicleRegistrationNo=` + this.props.vehicleno + `&PolicyNo=` + this.props.policynumber + ``, {
            //fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/GetSchedule?VehicleRegistrationNo=KA01EQ9767&PolicyNo=750000109` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
        }).then(response => response.json())
            .then(data => {
                console.log('response: ', data);
                if (data.status == 4) {
                    this.setState({ hidepage: true });
                }
                else {
                    this.setState({ hidepage: false });
                }
                this.setState({ schedule: data.getSchedule });
            });

    }

    handleOpen = () => {
        this.setState({ openschedule: true });
    }

    handlecreateSchedule = () => {
        console.log("scheduleDTO: ", this.state.createschedule);
        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/CreateUpdateSchedule`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
            body: JSON.stringify(this.state.createschedule)
        }).then(response => response.json())
            .then(data => {
                swal({
                    text: "Schedule Created Successfully!",
                    icon: "success",
                })
                console.log("dddd", data);
            });

    }

    handleClose = () => {
        this.setState({ openschedule: false });
    }

    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                {this.state.hidepage ?
                    <GridContainer xs={6} justify="center">
                        <h4>There is no Schedule create for this Vehicle.</h4>
                        <Button round color="primary" onClick={() => this.handlecreateSchedule()}> Create new Schedule </Button>
                    </GridContainer>
                    :
                    <GridContainer xs={6} justify="center">

                        <GridContainer justify="center">
                            {this.props.vehiclestype == "PC" ?
                                <img src={Car} style={{ width: "14rem" }} />
                                :
                                <img src={Bike} style={{ width: "14rem" }} />
                            }
                        </GridContainer>
                        <GridContainer justify="center">
                            <h4>{this.state.schedule.vehicleRegistrationNo}</h4>
                        </GridContainer>
                        <GridContainer justify="center">
                            <Divider style={{ width: '38rem', height: '0.2rem', }} />
                        </GridContainer>
                        <GridContainer justify="center">
                            <h4>1 claim on this vehicle</h4>
                        </GridContainer>
                        <GridContainer justify="center">
                            <h4>SI balance: {this.props.suminsured}</h4>
                        </GridContainer>
                        <GridContainer justify="center">
                            <Divider style={{ width: '38rem', height: '0.2rem', }} />
                        </GridContainer>
                        <GridContainer justify="center">
                            <h4> Insurance Cover </h4>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <CustomCheckbox
                                name="switchStatus"
                                labelText=""
                                value={this.state.schedule.switchStatus}
                                onChange={(e) => this.handleCheckbox(e)}
                                //disabled={this.state.schedule.switchEnabled == false ? true : false}
                                checked={this.state.schedule.switchStatus}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridContainer>
                        <GridContainer justify="center">
                            <CustomCheckbox
                                name="mon"
                                labelText="M"
                                value={this.state.schedule.mon}
                                onChange={(e) => this.handleCheckbox(e)}
                                disabled={true}
                                checked={this.state.schedule.mon}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            <CustomCheckbox
                                name="tue"
                                labelText="T"
                                value={this.state.schedule.tue}
                                onChange={(e) => this.handleCheckbox(e)}
                                checked={this.state.schedule.tue}
                                disabled={true}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            <CustomCheckbox
                                name="wed"
                                labelText="W"
                                value={this.state.schedule.wed}
                                onChange={(e) => this.handleCheckbox(e)}
                                checked={this.state.schedule.wed}
                                disabled={true}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            <CustomCheckbox
                                name="thu"
                                labelText="T"
                                value={this.state.schedule.thu}
                                onChange={(e) => this.handleCheckbox(e)}
                                checked={this.state.schedule.thu}
                                disabled={true}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            <CustomCheckbox
                                name="fri"
                                labelText="F"
                                value={this.state.schedule.fri}
                                checked={this.state.schedule.fri}
                                onChange={(e) => this.handleCheckbox(e)}
                                disabled={true}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            <CustomCheckbox
                                name="sat"
                                labelText="S"
                                value={this.state.schedule.sat}
                                checked={this.state.schedule.sat}
                                onChange={(e) => this.handleCheckbox(e)}
                                disabled={true}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            <CustomCheckbox
                                name="sun"
                                labelText="S"
                                value={this.state.schedule.sun}
                                checked={this.state.schedule.sun}
                                onChange={(e) => this.handleCheckbox(e)}
                                disabled={true}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridContainer>
                        <GridContainer justify="center">
                            <Button round color="primary" onClick={this.handleOpen}>Show Vehicle Schedular</Button>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.openschedule}
                                onClose={this.handleClose}>
                                <GridContainer justify="center">
                                    <GridItem xs={6}>
                                        <Card>
                                            <div >
                                                <h4 style={{ textAlign: 'center' }}>Select Cover Days</h4>
                                                <Button
                                                    color="primary"
                                                    round
                                                    style={{ left: '37rem', top: '-2.95rem' }}
                                                    onClick={this.handleClose}>
                                                    &times;
                                                        </Button>

                                            </div>
                                            <div id='dispschedule'>
                                                <Scheduler schedule={this.state.schedule} handleSubmit={this.handleSubmit} handleCheckbox={this.handleCheckbox} handleClose={this.state.handleClose} />
                                            </div>
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            </Modal>
                        </GridContainer>
                    </GridContainer>
                }
            </div >
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Dashboard);