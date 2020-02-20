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

class Payment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          
        };
    }
    //onFormSubmit = (evt) => {
       
    //        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SaveRetentionData`, {
    //            method: 'POST',
    //            headers: {
    //                'Accept': 'application/json',
    //                'Content-Type': 'application/json',
    //                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //            },
    //            body: JSON.stringify(data)
    //        }).then(response => response.json())
                
    //    }
      
  
    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <Card>                    <CardBody>
                        <h3>Payment</h3>                        <Button round color="primary" onClick={this.OnSubmit}>generate policy</Button>                    </CardBody>                </Card>            </div >

        );
    }
}

Payment.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Payment);