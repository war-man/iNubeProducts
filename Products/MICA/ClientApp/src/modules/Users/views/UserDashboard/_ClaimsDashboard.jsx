import React from "react";
import Datetime from "react-datetime";
import ChartistGraph from "react-chartist";

// @material-ui/core components

import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from '@material-ui/core/Divider';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";


import { simpleBarChart, pieChart } from "variables/charts.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import claim from "assets/img/claim.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import ClaimConfig from "modules/Claims/ClaimConfig.js";

import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Chart from "react-google-charts";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import DashboardContentLoader from "components/Loaders/DashboardContentLoader.jsx";

const style = {
    ...dashboardStyle,
    ...customSelectStyle
};

const claimcounts = {
    title: "",
    pieHole: 0.2,
    slices: [
        {
            color: "#2BB673"
        },
        {
            color: "#d91e48"
        },
        {
            color: "#007fad"
        },
        {
            color: "#e9a227"
        }
    ],
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
            color: "233238",
            fontSize: 12
        }
    },
    pieSliceText: "none",
    labels: false,
    tooltip: {
        showColorCode: true
    },
    chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
    },
    fontName: "Roboto"
};

const claimamounts = {
    title: "",
    pieHole: 0.2,
    slices: [
        {
            color: "#2BB673"
        },
        {
            color: "#d91e48"
        },
        {
            color: "#007fad"
        },
        {
            color: "#e9a227"
        }
    ],
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
            color: "233238",
            fontSize: 12
        }
    },
    pieSliceText: "none",
    //is3D:true,
    tooltip: {
        showColorCode: true
    },
    chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
    },
    fontName: "Roboto"
};

class ClaimsDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lobvalue: "",
            productvalue: "",
            partnervalue: "",
            defaultflag: true,
            displaypie: false,
            MasterDTO: {
                LOB: [],
                COB: [],
                Cover: [],
                CoverEvent: [],
                CoverEventFactor: [],
                CoverEventFactorValue: [],
                InsuranceType: [],
                InsurableCategory: [],
                Risk: [],
                Claim: [],
                channel: [],
                BenefitCriteria: []
            },
            claimcountresult: true,
            claimamountresult: false,
            productData: [],
            partnerData: [],
            DropdownVal: {
                "partnerId": "",
                "productId": "",
            },
            loader: false,
        };
        this.handlesubmit = this.handlesubmit.bind(this);
    }

    GetMasterService = (type, pID) => {
        fetch(`${ClaimConfig.productConfigUrl}/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("master response data: ", data)
                const lData = data;
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("MasterDTO: ", this.state.MasterDTO)
            });
    };

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log("lob ", event.target.value)
        fetch(`${ClaimConfig.productConfigUrl}/api/Product/GetProductByLob?id=` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {
                console.log("product: ", data);
                this.setState({ productData: data, productvalue: "", partnervalue: "" });
                console.log("product: ", this.state.productData);
            });
        console.log("productvalue: ", this.state.productvalue);
    };

    handleproduct = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log("productvalue: ", event.target.value);
        console.log("productvalue: ", this.state.productvalue);
        fetch(`${ClaimConfig.partnerconfigUrl}/api/Partner/GetPartnerbyProductid?id=` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {
                console.log("partner data: ", data);
                this.setState({ partnerData: data, partnervalue: "" });
                console.log("partner data: ", this.state.partnerData);
            });
    }

    handlepartner = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handlesubmit() {
        console.log("hitting: ");
        let val = this.state.DropdownVal;
        val.partnerId = this.state.partnervalue;
        val.productId = this.state.productvalue;
        this.setState({ val });

        console.log("Dropdown values: ", val);
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetClaimsByProductPartner`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(val)
        }).then(response => response.json())
            .then(data => {
                console.log("StackData", data);
                console.log("StackData", data[0]);
                if (data[0] != 0) {
                    this.setState({ claimamount: data[1], claimcount: data[0] });
                    //this.setState({ lobvalue:"",partnervalue:"",productvalue:"" });
                }
                else {
                    this.setState({ defaultflag: false })
                }

            });
    }

    componentDidMount() {
        this.GetMasterService('LOB', 0);

        let val = this.state.DropdownVal;
        val.partnerId = this.state.partnervalue;
        val.productId = this.state.productvalue;
        this.setState({ val });
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetClaimsByProductPartner`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(val)
        }).then(response => response.json())
            .then(data => {
                console.log("StackData", data);
                this.setState({ claimamount: data[1], claimcount: data[0] });
            });
        setTimeout(
            function () {
                this.setState({ loader: true });
            }
                .bind(this),
            2000
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer xl={12}>
                {this.state.loader ?
                    <GridContainer xl={12}>
                        <GridItem lg={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <Card>
                                    <CardHeader color="success" icon>
                                        <CardIcon color="success">
                                            <Icon> <img id="icon" src={claim} className={classes.cardIcons} /></Icon>
                                        </CardIcon>
                                        <h4 className={classes.cardIconTitle}><TranslationContainer translationKey="ClaimsDashboard" /></h4>
                                    </CardHeader>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <CardBody>
                                            <GridContainer justify="center">
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <Dropdown
                                                        labelText="LOB"
                                                        lstObject={this.state.MasterDTO.LOB}
                                                        value={this.state.lobvalue}
                                                        name='lobvalue'
                                                        onChange={(e) => this.handleSimple(e)}
                                                        formControlProps={{ fullWidth: true }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <Dropdown
                                                        labelText="Product"
                                                        lstObject={this.state.productData}
                                                        value={this.state.productvalue}
                                                        name='productvalue'
                                                        onChange={(e) => this.handleproduct(e)}
                                                        formControlProps={{ fullWidth: true }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <Dropdown
                                                        labelText="Partner"
                                                        lstObject={this.state.partnerData}
                                                        value={this.state.partnervalue}
                                                        name='partnervalue'
                                                        onChange={(e) => this.handlepartner(e)}
                                                        formControlProps={{ fullWidth: true }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer lg={12} justify="center" >
                                                <GridItem xs={5} sm={3} md={3} lg={2}>
                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <Button round color="success" onClick={this.handlesubmit} ><TranslationContainer translationKey="Submit" /></Button>
                                                    </Animated>
                                                </GridItem>
                                            </GridContainer>
                                            {this.state.defaultflag ?
                                                <GridContainer justify="center" lg={12}>
                                                    <GridItem xs={12} sm={6} md={6} lg={5}>
                                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                            <h5><TranslationContainer translationKey="ClaimCount" /></h5>
                                                            <Chart
                                                                chartType="PieChart"
                                                                data={this.state.claimcount}
                                                                options={claimcounts}
                                                                graph_id="PieChart1"
                                                                width={"100%"}
                                                                height={"300px"}

                                                                legend_toggle
                                                            //chartType="PieChart"
                                                            //data={this.state.claimcount}
                                                            ////data={[["Claim Count", "Month"],
                                                            ////["Registered", 15],
                                                            ////["Approved", 7],
                                                            ////["Settled", 5],
                                                            ////["Rejected", 3]]}
                                                            //options={{
                                                            //    //title: 'Claim-Count',
                                                            //    //pieSliceText: 'value',
                                                            //    legend: { position: 'bottom', alignment: 'start' },
                                                            //    width: 500,
                                                            //    height: 350,
                                                            //    animation: {
                                                            //        startup: true,
                                                            //        easing: 'linear',
                                                            //        duration: 1500,
                                                            //    },
                                                            //}}
                                                            //width={"100%"}
                                                            //height={"350px"}
                                                            //legend_toggle
                                                            />
                                                        </Animated>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6} lg={1}>
                                                        <div id="line" color="success" className="SalesSummary_line"></div>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6} lg={5}>
                                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                            <h5><TranslationContainer translationKey="ClaimAmount" /></h5>
                                                            <Chart
                                                                chartType="PieChart"
                                                                data={this.state.claimamount}
                                                                options={claimamounts}
                                                                graph_id="PieChart"
                                                                width={"100%"}
                                                                height={"300px"}
                                                                legend_toggle
                                                            />
                                                        </Animated>
                                                    </GridItem>
                                                </GridContainer>
                                                : <GridContainer justify="center">
                                                    <h3> <TranslationContainer translationKey="Norecords" /></h3>
                                                </GridContainer>
                                            }
                                        </CardBody>
                                    </Animated>
                                </Card>
                            </Animated>
                        </GridItem>
                    </GridContainer>
                    : <DashboardContentLoader />
                }
            </GridContainer>
        );
    }
}

export default withStyles(style)(ClaimsDashboard);