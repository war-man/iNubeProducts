import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import $ from 'jquery';
//import usertype from "assets/img/user-type.png";
import lead from "assets/img/man-user.png";
import leadPool from "assets/img/server.png";
import Icon from "@material-ui/core/Icon";
import CountUp from 'react-countup';
//import { Animated } from "react-animated-css";
//import leadImg from "assets/img/lead.jpg";
//import data from "assets/img/data.jpg";
import { Animated } from "react-animated-css";
import ArrowForward from '@material-ui/icons/ArrowForward';
import CreateLead from './CreateLead.jsx';
import CommonModify from './CommonModify.jsx';
import LeadPool from './LeadPool.jsx';
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js'; 

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


const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}

class Lead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
            Leadflag: true,
            ShowFlag: false,
            PoolFlag: true,
            ShowPool: false,
            dataRows:[]

        };
       
    }

   
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    LeadFun = () => {
        this.setState({ Leadflag: false, ShowFlag: true })
    }

    PoolFun = () => {
        this.setState({ PoolFlag: false, ShowPool: true })
    }

    componentDidMount() {
       
        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/ContactPool?type=Lead`, {
  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {

                this.setState({ dataRows: data });

                console.log("data", this.state.dataRows);


            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.Leadflag && <div>
                    {this.state.PoolFlag &&
                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                            <GridContainer lg={12}>
                                <GridItem xs={4}>
                                    <Card>
                                        <CardHeader color="rose" icon>
                                            <CardIcon color="rose">
                                                <Icon><img id="icon" src={lead} /></Icon>
                                            </CardIcon>
                                               </CardHeader>
                                              <CardContent>
                                        <Typography variant="h6" color="textSecondary" component="h4">
                                                Create Lead
                                            </Typography>

                                        </CardContent>
                                        <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                            <CardActions >
                                                <IconButton onClick={this.LeadFun} >
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
                                                <Icon><img id="icon" src={leadPool} /></Icon>
                                            </CardIcon>

                                            <Typography className="right" variant="h3" component="h5">
                                                <CountUp
                                                    className="account-balance"
                                                start={0}
                                                end={10}
                                               end={this.state.dataRows.length}
                                                    duration={3.75}
                                                    useEasing={true}
                                                    useGrouping={true}
                                                    separator=" "
                                                /></Typography>
                                        </CardHeader>
                                        <CardActionArea>
                                    </CardActionArea>

                                        <CardContent>

                                            <Typography variant="h6" color="textSecondary" component="h4">
                                                Lead Pool
                                            </Typography>

                                        </CardContent>
                                        <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                            <CardActions >
                                                <IconButton onClick={this.PoolFun} >
                                                    <ArrowForward />
                                                </IconButton>
                                            </CardActions>
                                        </GridContainer>


                                    </Card>
                                </GridItem>


                            </GridContainer>
                        </Animated>
                    }
                </div>
                }
                {
                    this.state.ShowFlag &&
                    <CreateLead />
                }
                {
                    this.state.ShowPool &&
                    <LeadPool />
                }




            </div>
        );
    }
}

export default withStyles(style)(Lead);