import React from "react";

// @material-ui/core components


import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import withStyles from "@material-ui/core/styles/withStyles";

import Wizard from "components/Wizard/Wizard.jsx";
import People from './PeopleMovements.jsx';
import PersonalDetails from './PersonalDetails.jsx';
import Decision from './Decision.jsx';
import ReporteeMovement from './ReporteeMovement.jsx';
import SalesTransfor from './SalesTransfor.jsx';
import Recruitment from './Recruitment.jsx';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";







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

class MovementDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtable: false,
            hideaddress: true,
        }
    };


    tableshow = () => {
        this.setState({ showtable: true });
    };

    render() {

        const { classes } = this.props;

        return (
            <CardBody>

                {/*  <PersonalDetails personalDet={this.props.personalDet} masterList={this.props.masterList}/>
                */}
                <People empData={this.props.empData} hideaddress={this.state.hideaddress} />


                <Decision decisionDTO={this.props.decisionDTO} SetDecision={this.props.SetDecision} masterList={this.props.masterList} branchList={this.props.branchList} designationList={this.props.designationList}
                    movementId={this.props.movementId} Setdecisiondd={this.props.Setdecisiondd} disabled={this.props.disabled} decflag={this.props.decflag} />

                {/* <GridContainer>
                        <ReporteeMovement />
                    </GridContainer>
                    <GridContainer>
                        <SalesTransfor />
                </GridContainer> */}
                <Card>
                    <CardBody>
                        <Wizard
                            validate
                            steps={[
                                { stepName: <TranslationContainer translationKey="ReporteeMovement" />, stepComponent: ReporteeMovement, stepId: "rAddress", stepData: this.props },
                                { stepName: <TranslationContainer translationKey="SalesTransfer" />, stepComponent: SalesTransfor, stepId: "License", stepData: this.props },
                                // { stepName: <TranslationContainer translationKey="Recruitment" />, stepComponent: Recruitment, stepId: "License", stepData: this.props },

                            ]}
                            title=""
                            subtitle=""
                        />
                    </CardBody>


                </Card>
            </CardBody>
        );
    }
}
export default withStyles(style)(MovementDetails);