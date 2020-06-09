import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import user from "assets/img/user.png";
import PromotionIcon from "assets/img/Promotion.png";
import DemotionIcon from "assets/img/demotion.png";
import TerminationIcon from "assets/img/termination.png";
import TransferIcon from "assets/img/transfer.png";


import lead from "assets/img/man-user.png";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Promotion from './Promotion.jsx';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import HierarchyConfig from "modules/Hierarchy/HierarchyConfig.js";





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

class Movement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowFlag: false,
            Momentflag: true,
            DetailHeading: "",
            promotionicon: false,
            demotionicon: false,
            terminationicon: false,
            transforicon: false,
            masterList: [],
        }
    };

    componentDidMount() {
       
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetMasterDataAsync?sMasterlist=OrgCategory`, {
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
            });
    }

    PromotionFun = () => {
        this.setState({ ShowFlag: true, Momentflag: false, DetailHeading: "Promotion", promotionicon: true })
    }
    DemotionFun = () => {
        this.setState({ ShowFlag: true, Momentflag: false, DetailHeading: "Demotion", demotionicon: true })
    }
    TerminationFun = () => {
        this.setState({ ShowFlag: true, Momentflag: false, DetailHeading: "Termination", terminationicon: true })
    }
    TransferFun = () => {
        this.setState({ ShowFlag: true, Momentflag: false, DetailHeading: "Transfer", transforicon: true })
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                {/*   {this.state.Momentflag && <div>
                    <GridContainer>
                        <GridItem xs={4}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={PromotionIcon} /></Icon>
                                    </CardIcon>

                                </CardHeader>

                                <CardContent>

                                    <Typography variant="h6" color="textSecondary" component="h4">
                                        Promotion
                                            </Typography>




                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                        <IconButton onClick={this.PromotionFun} >
                                            <ArrowForward />
                                        </IconButton>
                                    </CardActions>
                                </GridContainer>


                            </Card>
                        </GridItem>
                        <GridItem xs={4}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={DemotionIcon} /></Icon>
                                    </CardIcon>

                                </CardHeader>

                                <CardContent>

                                    <Typography variant="h6" color="textSecondary" component="h4">
                                        Demotion
                                            </Typography>




                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                        <IconButton onClick={this.DemotionFun} >
                                            <ArrowForward />
                                        </IconButton>
                                    </CardActions>
                                </GridContainer>


                            </Card>
                        </GridItem>
                        <GridItem xs={4}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={TerminationIcon} /></Icon>
                                    </CardIcon>

                                </CardHeader>

                                <CardContent>

                                    <Typography variant="h6" color="textSecondary" component="h4">
                                        Termination
                                            </Typography>




                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                        <IconButton onClick={this.TerminationFun} >
                                            <ArrowForward />
                                        </IconButton>
                                    </CardActions>
                                </GridContainer>


                            </Card>
                        </GridItem>
                        <GridItem xs={4}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={TransferIcon} /></Icon>
                                    </CardIcon>

                                </CardHeader>

                                <CardContent>

                                    <Typography variant="h6" color="textSecondary" component="h4">
                                        Transfer
                                            </Typography>




                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                        <IconButton onClick={this.TransferFun} >
                                            <ArrowForward />
                                        </IconButton>
                                    </CardActions>
                                </GridContainer>


                            </Card>
                        </GridItem>
                        {/*<GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                        labelText="Employee Code"
                       // name="mobileNumber"
                       // value={this.state.ClaimDTO.mobileNumber}
                      //  onChange={(e) => this.SetValue("office", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                    </GridItem>

                    <GridItem xs={3} sm={3} md={3}>
                        <Button color="warning" round>Search</Button>

                        </GridItem> 
                    </GridContainer>
                </div>}
               
                {
                    this.state.ShowFlag &&

 */}
                    <Promotion DetailHeading={this.state.DetailHeading} promotionicon={this.state.promotionicon} demotionicon={this.state.demotionicon} terminationicon={this.state.terminationicon} transforicon={this.state.transforicon} masterList={this.state.masterList} />
                


                </div>


        );
    }
}
export default withStyles(style)(Movement);