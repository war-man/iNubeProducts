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

class TPPolicy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "15",
            username1:"20",
            value1: 600000,
            value2: 700000,
            value3: 30,
            showdriver1: true,
            showdriver2: false,
            showdriver3: false,
            redirect: false
        };
    }

    handleinput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange = (event) => {
        console.log(event);
    }
    handleToggle(value) {
        const { checked } = this.state;
        //const currentIndex = checked.indexOf(value);
        //const newChecked = [...checked];

        //if (currentIndex === -1) {
        //    newChecked.push(value);
        //} else {
        //    newChecked.splice(currentIndex, 1);
        //}

        //this.setState({
        //    checked: newChecked
        //});
    }
    handleSubmit = () => {
        swal({
            text: "Do Service",
            icon: "error"
        })
    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/ProceedPayment',

            }} />
        }
    }
    quickbuyRedirect = () => {

        this.setState({ redirect: true })
        this.renderRedirect();
    }
    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <Card>                    <CardBody>
                <GridContainer justify="center">
                    <h3>You donot seem to be covered by TP policy. Would you like to purchase the tp</h3>
                </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={5} sm={3} md={3} lg={2}>                                <Button color="primary" round>click here to purchase the policy</Button>                            </GridItem>
                  
                </GridContainer>
                <GridContainer justify="center">
                    <h3>OR</h3>
                </GridContainer>
                <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
    
                          <CustomCheckbox
                                    //name={item.mValue}
                                    labelText="This vehicle is covered under a TP policy"
                                    //value={item.mIsRequired}
                                    //onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Risk', e)}
                                    //disabled={(item.disable == true) ? true : null}
                                    //checked={item.mIsRequired}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                    </GridItem>
                </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={5} sm={3} md={3} lg={2}>                                <Button color="primary" round onClick={this.quickbuyRedirect}>pay now</Button>                            </GridItem>
                           
                        </GridContainer>                    </CardBody>                </Card>                {this.renderRedirect()}            </div >

        );
    }
}

TPPolicy.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(TPPolicy);