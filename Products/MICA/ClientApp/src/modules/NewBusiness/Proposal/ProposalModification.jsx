import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import PartialProposalForm from "./_PartialProposalForm.jsx";
import PartialMemberDetails from "./_PartialMemberDetails.jsx";
import Questionnaries from "./Questionnaires.jsx";
import BenificiaryDetails from "./BenificiaryDetails.jsx";

import PremiumAndBenifitDetail from "./ProposalPremiumAndBenifit.jsx";
import DeclarationAndDocument from "./DeclarationAndDocumentProposal.jsx";
import PremiumAndBenifitWizard from "./PremiumAndBenifitProposalWizard.jsx";
import LifeToBeAssured from "./LifeToBeAssured.jsx";


const styles = {
    cardTitle,
    pageSubcategoriesTitle: {
        color: "#3C4858",
        textDecoration: "none",
        textAlign: "center"
    },
    cardCategory: {
        margin: "0",
        color: "#999999"
    }



};
const homeBtn = {
    marginLeft: "250px",
    height: "35px",
    textAlign: "center",
    backgroundColor: "#1068ac",
    color: "white"
}

class ProposalModification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProposalFormData: {
            },

            LifeToBeAssuredData: {},
            QuestionnariesData: {},
            PremiumAndBenifitCoverageDetailsData: {},
            BenificaryDetailsData: {},
            DeclarationAndDocument: {}

        }
        console.log("AAAAAAAAAAA", this.props.filterData);
        // console.log("BBBBBBB", this.props.FilterPolicyOwnerDetailsdata);
        console.log("BBBBBBB", this.props.LifeStyleQA, this.props.QuestionalDetailsSetValue);



        // console.log("SSSSSSSSSSS", this.props.leadTable);

    }
    ModifySetValue = (type, evt) => {
        const modifyData = this.state[type];//we have taken one const variable data and passing data object in data
        modifyData[evt.target.name] = evt.target.value;//for data we have to do mapping with name and value pair and for dynamically change we write changehandler with target value
        console.log("Sahir", modifyData);
        this.setState({ modifyData });

    };
    handleSubmit = (evt) => {
        console.log('ButtonCall');

    }
    //componentDidMount() {
    //    if (this.props.location.state != null) {
    //        this.setState({
    //            propflag: this.props.location.state.propflag,
    //            pendingReq: this.props.location.state.pendingReq
    //        });
    //    }
    //}

    onFormSubmit = (evt) => {

        //  this.state.fields.IsActive = 1;
        //  this.state.fields.CreatedDate = date();
        fetch(`https://localhost:44313/api/ProposalConfig/SubmitModifyProposalData`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.ProposalFormData)
        }).then(function (data) {
            console.log("sahir", data);
            alert("Parameter Saved");

        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer lg={12}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader>
                                <h4 className={classes.cardTitle}>Modify Proposal</h4>
                            </CardHeader>
                            <CardBody>
                                <Accordion
                                    active={0}
                                    collapses={[
                                        {
                                            title: "Proposal Form",
                                            content: <PartialProposalForm ModifySetValue={this.ModifySetValue} ProposalFormData={this.state.ProposalFormData} filterData={this.props.filterData} />

                                        },
                                        {
                                            title: "Policy Owner Details",
                                            content: <PartialMemberDetails singleValue1={this.props.singleValue1} singleValue={this.props.singleValue} singleValueSelectedProposer={this.props.singleValueSelectedProposer} singleValueSelected={this.props.singleValueSelected} handleRadioChange={this.props.handleRadioChange} handleRadioOnChange={this.props.handleRadioOnChange} SetValue={this.SetValue} FilterPolicyOwnerDetailsdata={this.props.FilterPolicyOwnerDetailsdata} MasterDataDto={this.props.MasterDataDto} PolicyOwnerDetailsdataOnNoCondition={this.props.PolicyOwnerDetailsdataOnNoCondition} PolicyOwnerDetailsdataOnYesConditioinDto={this.props.PolicyOwnerDetailsdataOnYesConditioinDto} PolicyOwnerDetailsSetValue={this.props.PolicyOwnerDetailsSetValue} GetmasterData={this.props.GetmasterData} />

                                        },
                                        {
                                            title: "Life to be Assured",
                                            content: <LifeToBeAssured SetValue={this.SetValue} />

                                        },
                                        {
                                            title: "Questionnaires",
                                            content: <Questionnaries LifeStyleQA={this.props.LifeStyleQA} QuestionalDetailsSetValue={this.props.QuestionalDetailsSetValue} MasterDataDto={this.props.MasterDataDto} />

                                        },
                                        {
                                            title: "Premium and Benefit Coverage Details",
                                            content: <PremiumAndBenifitWizard SetValue={this.SetValue} />

                                        },
                                        {
                                            title: "Beneficiary Details",
                                            content: <BenificiaryDetails SetValue={this.SetValue} />

                                        },
                                        {
                                            title: "Declaration And Document",
                                            content: <DeclarationAndDocument SetValue={this.SetValue} />

                                        },

                                    ]}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>
                <GridContainer lg={10}>
                    <GridItem xs={3} >
                        <Button round className={classes.marginRight} style={homeBtn} >
                            Save Proposal
                        </Button>
                    </GridItem>
                    <GridItem xs={3} >
                        <Button round className={classes.marginRight} style={homeBtn} >
                            Proceed To Payment
                        </Button>
                    </GridItem>
                    <GridItem xs={3} >
                        <Button round className={classes.marginRight} style={homeBtn} >
                            Download Quotation PDF
                        </Button>
                    </GridItem >
                </GridContainer>

            </div>
        );
    }
}

export default withStyles(styles)(ProposalModification);
