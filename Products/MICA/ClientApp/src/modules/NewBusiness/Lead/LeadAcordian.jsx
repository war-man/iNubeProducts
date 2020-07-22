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
import generatequotation from "assets/img/generate-quotation.png";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import ProspectInfo from "modules/NewBusiness/Quotation/_Prospectinfo.jsx";

import Icon from "@material-ui/core/Icon";
import PreviousInsurance from "modules/NewBusiness/Quotation/_PreviousInsurance.jsx";


import ProductDetails from "modules/NewBusiness/Quotation/_ProductDetails.jsx";
import Button from "../../../components/CustomButtons/Button";
import CommonModify from '../Lead/CommonModify.jsx';
import LeadPool from "./LeadPool.jsx";
import NeedAnalysis from "modules/NewBusiness/Prospect/NeedAnalysis.jsx";

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

class LeadAccordian extends React.Component {
    constructor(props) {
        super(props);
        console.log("qtnproposs", props);
        //this.state = {
        
        //    //isShowGrid: true,
        //    //isDontShowGrid: true,
        //    isShowCreateLead: false,
        //    isShow: false,
        //    editModal: false,
        //    btnvisibility: false,
        //    disabled: false,
        //    open: false,
        //    simpleSelect: "",
        //    selectedValue: null,
        //    masterList: [],
        //    type: "Lead",
        //    rowData: {},
        //    display: false,
        //    suspectinfo: [],

        //    show: false,
        //    submitshow: false,
        //    modifypage: false,

        this.state = {

            isShowCreateLead: true,

            isShow: true,
            isShowCreateLeadBtn: true,
            dataRows: [],
          
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            type: "Prospect",
            ContactData: {},
        }

    };
    componentDidMount() {

        //if (this.props.location.state !== undefined) {
        console.log("quotationdata", this.props.QuotationData);
            //this.setState({ Showflag: true, ShowLoad: false, Loadflag: false, QuotationData: this.props.location.state.RadioFilterData[0] });

        //}
    }

    SetContactValue = (value) => {
        this.setState({ ContactData:value });
    }

    render() {
        const { classes } = this.props;
        console.log("Check",this.props)
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                        <Icon><img id="icon" src={generatequotation} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small>Modify Lead </small>
                        </h4>
                    }
                </CardHeader>
                        </Card> 
                        
                            <CardBody>
                                <Accordion
                                   // active={0}
                                    collapses={[
                                        {
                                            title: "Lead Information",
                                            content: <CommonModify //isShowGrid={true} isDontShowCreateLead={true}
                                                type={this.state.type}
                                                isShow={this.state.isShow}
                                                isShowCreateLead={this.state.isShowCreateLead}
                                                isShowCreateLeadBtn={this.state.isShowCreateLeadBtn}
                                           // console.log("Check", this.props)
                                                //isShowCreateLead={this.state.isShowCreateLead}
                                               // isShowLead1={false}
                                               // isShowLead1={this.state.isShowLead1}
                                                //isDontShowLead1={false}
                                               // isDontShowLead1={this.state.isDontShowLead1}
                                   /> 
                                          
                    },
                                        {
                                            title: "Need Analysis",
                                            content: <NeedAnalysis />
                                        }
                                       
                                    ]}
                                />
                                                               
                            </CardBody>
                       
                    </GridItem>

                </GridContainer>
                
            </div>
        );
    }
}

export default withStyles(styles)(LeadAccordian);
