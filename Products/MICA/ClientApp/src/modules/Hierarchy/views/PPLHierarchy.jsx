
import React, { useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import "./index.css";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import CountUp from 'react-countup';
import { Animated } from "react-animated-css";
//import demotion from "assets/img/demotion.svg";

import Demotion from '@material-ui/icons/DeviceHub';
import Termination from '@material-ui/icons/NotInterested';
import RemoveDesignation from '@material-ui/icons/SmsFailed';
import ChnageSupervisor from '@material-ui/icons/SupervisorAccount';
import Transfer from '@material-ui/icons/TransferWithinAStation';
import ArrowForward from '@material-ui/icons/ArrowForward';

//import RecruitmentSuspect from "./RecruitmentSuspectTasks.jsx";
//import RecProspect from "./RecruitmentProspectTasks.jsx";

//import InterviewDetTask from "./RecruitmentInterviewDetailTasks.jsx";
//import NICverTask from "./RecruitmentNICverificationTask.jsx";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Del from "@material-ui/icons/Delete";
//import RecApprovCase from "./RecruitmentApprovedCases.jsx";
//import RecMovementTasks from "./RecruitmentMovementTasks.jsx";
import Icon from "@material-ui/core/Icon";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import OrganizationChart from "components/OrgChart/ChartContainer";
import HierarchyConfig from 'modules/Hierarchy/HierarchyConfig.js';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import user from "assets/img/user-search.png";
const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

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

};
class PeopleChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Hierarcydata: [],
            Organizations: [],
            orgid: "",
            showhierarchy: false,
            showddlOrg: true,
        }

    };

    componentDidMount() {
        if (localStorage.getItem('firstName').length <= 0) {
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetOrgDropdown`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ showddlOrg: true, Organizations: data });
                    console.log("organizations: ", data);
                });
        }
        else {

            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetHierarchy?OrgId=` + localStorage.getItem('organizationId') + `&Type=People&KeyValue=` + localStorage.getItem('firstName'), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            }).then(response => response.json())
                .then(data => {
                    console.log(data, 'data1')
                    if (data.length > 0) {
                        this.setState({ showhierarchy: true, showddlOrg: false, Hierarcydata: data[0] });
                        console.log('data12', this.state.Hierarcydata);
                    }
                });
        }



    }

    handlehierarchy = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.state.Hierarcydata = [];
        this.state.showhierarchy = false;
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetHierarchy?OrgId=` + e.target.value + `&Type=People`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data, 'data1')
                if (data.length > 0) {
                    this.setState({ showhierarchy: true, Hierarcydata: data[0] });
                    console.log('data12', this.state.Hierarcydata);
                }
            });
    }


    render() {
        const { classes } = this.props;
        return (

            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={user} /></Icon>
                                </CardIcon>
                                {
                                    <h4 >
                                        <small>People Hierarchy</small>
                                    </h4>
                                }
                            </CardHeader>
                            <CardBody>
                                <div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={4} md={3}>
                                            {this.state.showddlOrg ?
                                                <Dropdown
                                                    required={true}
                                                    labelText="Organization"
                                                    lstObject={this.state.Organizations}
                                                    value={this.state.orgid}
                                                    name='orgid'
                                                    onChange={(e) => this.handlehierarchy(e)}
                                                    formControlProps={{ fullWidth: true }}
                                                /> : null
                                            }
                                        </GridItem>
                                    </GridContainer>
                                </div>

                            </CardBody>
                        </Animated>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} >
                    {/**/} {this.state.showhierarchy ?
                        <Card>
                            <OrganizationChart datasource={this.state.Hierarcydata} />
                        </Card>
                        : null
                    }
                </GridItem>

            </GridContainer>

        );
    }
}
export default PeopleChart;
//export default withStyles(style)(ExportChart);

