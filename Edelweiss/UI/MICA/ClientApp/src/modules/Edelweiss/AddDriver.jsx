import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Redirect } from 'react-router-dom'
import EdelweissConfig from "./EdelweissConfig.js";



class AddDriver extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            proposalno:"",
            redirect:"",
            ddlDTO: [
                { mID: 1, mValue: "Mr", label: "Mr" },
                { mID: 2, mValue: "Miss", label: "Miss" },
                { mID: 3, mValue: "Mrs", label: "Mrs" },
            ],
            NoOfDriver: '',
            VehicleAge: '',
            VehicleNumber: '',
            VehicleModelNumber: '',
            quotationDetailsDto: {
            },
        }
    }
 

    componentDidMount() {
        console.log("prno", this.props.location.state.proposalNo);
        if (this.props.location.state != undefined) {
            this.setState({ quotationDetailsDto: this.props.location.state.quotationDto, proposalno: this.props.location.state.proposalNo});
            console.log("thisquotationDetailsDto", this.state.quotationDetailsDto);
        }
     
    }


  getModelNumber = (e) => {
   
    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/AddVehicle',
                state: { quotationDetailsDto: this.state.quotationDetailsDto, proposalno: this.state.proposalno }
            }} />
        }
    }
    submitDriverDetails = (e) => {
        this.renderRedirect();
        this.setState({ redirect: true })
    }
 
    render() {
        const { touched } = this.state;
        const className = touched ? 'btn touched' : 'btn';
        const { classes, loggingIn } = this.props;
    let nameTitles = [{value: 'Mr'}, {value: 'Miss'}, {value: 'Mrs'}];
    console.log(this.state);

        return (
       
        <div className={classes.container}>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        {/*  <FilterNone /> */}
                        <Icon></Icon>
                    </CardIcon>
                    {
                        <h4>
                            <small>  Driver Details </small>
                        </h4>
                    }
                </CardHeader>
                <CardBody>
                  
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={2}>
                            <Dropdown
                                labelText="Title"
                                id="TitleId"
                                lstObject={this.state.ddlDTO}
                                //value={this.state.proposalIssueDTO.InsurableName}
                                //name='InsurableName'
                                //onChange={(e) => this.GetMasterData(e)}
                                formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                labelText="Name"
                                name="primaryDriverName"
                                value={this.state.quotationDetailsDto.primaryDriverName}
                                //onChange={(e) => this.onInputChangepropsal(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                    </GridContainer>

                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Age"
                                    name="age"
                                value={this.state.quotationDetailsDto.age}
                                //onChange={(e) => this.onInputChangepropsal(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                    </GridContainer>
                    <GridContainer justify="center">
                            {this.renderRedirect()}
                            <Button color="primary" round onClick={this.submitDriverDetails}> Submit </Button>

                    </GridContainer>
                </CardBody>
           </Card>
           
      </div>
    );
  }
}
AddDriver.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(AddDriver);
