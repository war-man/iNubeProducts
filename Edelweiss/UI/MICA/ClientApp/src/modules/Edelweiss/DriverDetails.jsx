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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Redirect } from 'react-router-dom'
import { Paper } from "@material-ui/core";
import MUIButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            activeStep: 0,
            steps: ['Details', 'Start Date', 'Billing Frequency', 'Payment'],
        };
    }

    handleinput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return 'Fill the details';
            case 1:
                return 'Select the start date';
            case 2:
                return 'Set the Frequency';
            default:
                return 'Final step';
        }
    }

    getSteps = () => {
        return ['Details', 'Start Date', 'Billing Frequency', 'Payment'];
    }

    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    };

    handleSubmit = () => {
        swal({
            text: "Do Service",
            icon: "error"
        })
    }

    handleReset = () => {
        this.setState({ activeStep: 0 });

    };

    handlestep = (key, e) => {
        this.setState({ activeStep: key });
    }

    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <Card>                    <Stepper activeStep={this.state.activeStep} alternativeLabel>
                        {this.state.steps.map((label,key) => (
                            <Step key={label} onClick={(e) => this.handlestep(key, e)}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>                    <div>                        {this.state.activeStep === this.state.steps.length ? (
                            <div>
                                <Typography >All steps completed</Typography>
                                <Button onClick={this.handleReset}>Reset</Button>
                            </div>
                        ) : (
                                <div>
                                    <Typography>{this.getStepContent(this.state.activeStep)}</Typography>
                                    <div>
                                        <MUIButton
                                            disabled={this.state.activeStep === 0}
                                            onClick={this.handleBack}
                                        //className={classes.backButton}
                                        >
                                            Back
              </MUIButton>
                                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}                    </div>                </Card>            </div>

        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(HomePage);