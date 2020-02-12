import React from "react";

// @material-ui/core components

import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

import Calendars from "views/Calendar/Calendar.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import product from "assets/img/product.png";

import DashBoardProductSearch from "../../../Products/Micro/views/DashboardProductSearch.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import { Animated } from "react-animated-css";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";

const style = {
    ...dashboardStyle,
};


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Type: true,
            MasterDTO: {
                LOB: [],
                COB: [],
                Cover: [],
                CoverEvent: [],
                CoverEventFactor: [],
                CoverEventFactorValue: [],
                InsuranceType: [],
                Risk: [],
                Claim: [],
                channel: [],
                BenefitCriteria: []
            },
            masterLists: [],
            masterList: [],
            dasboardDTO: {
                lobid: "",
                cobid: ""
            },
            loader:false,
        };
    }

    SetValue = (type, event) => {
        let dasboardDTO = this.state.dasboardDTO;
        let name = event.target.name;
        let value = event.target.value;
        dasboardDTO[name] = value;

        this.setState({ dasboardDTO })
    };

    GetMasterData = (type, addType, event) => {
        console.log('GetMasterData: ', type, addType, event)
        this.SetValue(type, event);
        let reg = this.state[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;

        this.setState({ reg });
        console.log("lobid", this.state.dasboardDTO.lobid);
        this.GetMasterService(type, event.target.value);
    };

    componentDidMount() {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=das`, {
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

                console.log('Master Data', this.state.masterList);
            });
        this.GetMasterService('LOB', 0);
        setTimeout(
            function () {
                this.setState({ loader: true });
            }
                .bind(this),
            2000
        );
    }

    GetMasterService = (type, pID) => {
        // fetch(`${productConfig.productConfigUrl}/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID)
        fetch(`${productConfig.productConfigUrl}/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("mIsRequired", data);

            });
    };

    render() {
        const { classes } = this.props;
        return (
            <GridContainer xl={12}>
                {this.state.loader ?

                <DashBoardProductSearch Type={this.state.Type} />
                    : <PageContentLoader />}
                </GridContainer>
        );
    }
}
export default withStyles(style)(Calendar);