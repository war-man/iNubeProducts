import React from "react";
//import Datetime from "react-datetime";
//import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

//import { simpleBarChart, pieChart } from "variables/charts.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import product from "assets/img/product.png";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";


import {Animated} from "react-animated-css";

const style = {
    ...dashboardStyle,
    ...customSelectStyle
};


class PerformanceInitiator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
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
            }
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
        
        fetch(`https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/GetMasterData?sMasterlist=das`, {
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
    }
    GetMasterService = (type, pID) => {
        // fetch(`https://localhost:44347/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID)
        fetch(`https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID, {
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

    //GetMasterService = (type, mID) => {
//    //    fetch(`https://inubeservicesusermgmt.azurewebsites.net/api/UserProfile/GetMasterData?sMasterlist=abc`,{method: 'GET',
//    headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json',
//        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
//},})
    //        .then(response => response.json())
    //        .then(data => {
    //            const lData = data;
    //            let locDTO = this.state.MasterDTO;
    //            locDTO[type] = lData;
    //            this.setState({ locDTO });

    //        });
    //    console.log("masterDTO", this.state.MasterDTO);
    //};
    render() {
        const { classes } = this.props;
        return (
            <GridContainer className="dash" xs={12} sm={6} md={6} lg={12}>
            <Card>
                <CardHeader color="danger" icon>
                    <CardIcon color="danger">
                       
                    </CardIcon> 
                    <h4 className={classes.cardIconTitle}>
                        Product Dashboard
                </h4>
                </CardHeader>
               
                <CardBody>

                    <GridContainer className="product-dashboard" id="fullWidth" xs={12} sm={12} md={12} lg={12}>

                        <GridItem xs={4} sm={6} md={6} lg={3}>
                            <Dropdown labelText="Line Of Business" id="ProductDTO.lobid" lstObject={this.state.MasterDTO.LOB} name='lobid' value={this.state.dasboardDTO.lobid} onChange={(e) => this.GetMasterData('COB', 'dasboardDTO', e)} formControlProps={{ fullWidth: true }} />

                        </GridItem>
                        <GridItem xs={4} sm={6} md={6} lg={3}>
                            <Dropdown labelText="Class Of Business" id="ProductDTO.cobid" lstObject={this.state.MasterDTO.COB} name='cobid' value={this.state.dasboardDTO.cobid} onChange={(e) => this.GetMasterData('', 'dasboardDTO', e)} formControlProps={{ fullWidth: true }} />

                        </GridItem>


                        <GridItem xs={4} sm={6} md={6} lg={3}>
                            <CustomInput

                                labelText="Product ID"
                                // required={true}
                                name="productId"
                                //  value={this.state}
                                onChange={this.setValue}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={6} sm={6} md={6} lg={3}>
                            <CustomInput

                                labelText="Product Name"
                                // required={true}
                                name="productname"
                                //  value={this.state}
                                onChange={this.setValue}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridContainer justify="center">
                            <GridItem xs={3} sm={3} md={3}>
                                <Button id="product-bnt" color="info" >Submit</Button>
                            </GridItem>
                            </GridContainer>
                    </GridContainer>


                </CardBody>
               
            </Card>
            </GridContainer>
        );
    }
}
export default withStyles(style)(PerformanceInitiator);