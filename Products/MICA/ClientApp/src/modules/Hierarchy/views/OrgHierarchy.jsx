import React from 'react';
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
const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default function MultiSelectTreeView() {
    const classes = useStyles();

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            multiSelect
        >
            <TreeItem nodeId="1" label="Root">
                <GridContainer lg={12}>
                    <GridItem xs={12}>
                        <Card className="listcard">
                            <CardHeader color="rose" icon>
                                <ListItem className="peopletitle">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" />
                                    </ListItemAvatar>
                                    <GridContainer xs={12}>
                                        <GridItem xs={8}>
                                            <h4><small className="title">Person Name</small></h4>
                                            <p>Designation Title</p>
                                        </GridItem>
                                        <GridItem className="margintop" xs={4}>

                                            <Typography className="right" variant="h5" component="h5">
                                                <CountUp
                                                    className="account-balance"
                                                    start={0}
                                                    end={70}
                                                    duration={3.75}
                                                    useEasing={true}
                                                    useGrouping={true}
                                                    separator=" "
                                                /></Typography>
                                        </GridItem>
                                    </GridContainer>
                                </ListItem>


                            </CardHeader>
                            <CardActions >

                                <Tooltip title="Demotion">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <Demotion fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Termination">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <Termination fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove Designation">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <RemoveDesignation fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Chnage Supervisor">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <ChnageSupervisor fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Transfer">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <Transfer fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>

                        </Card>
                    </GridItem>
                </GridContainer>
                <TreeItem nodeId="2" label="root1" className="child2">

                    <GridContainer lg={12}>
                        <GridItem xs={12}>
                            <Card className="listcard">
                                <CardHeader color="rose" icon>
                                    <ListItem className="peopletitle">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" />
                                        </ListItemAvatar>
                                        <GridContainer xs={12}>
                                            <GridItem xs={8}>
                                                <h4><small className="title">Person Name</small></h4>
                                                <p>Designation Title</p>
                                            </GridItem>
                                            <GridItem className="margintop" xs={4}>

                                                <Typography className="right" variant="h5" component="h5">
                                                    <CountUp
                                                        className="account-balance"
                                                        start={0}
                                                        end={70}
                                                        duration={3.75}
                                                        useEasing={true}
                                                        useGrouping={true}
                                                        separator=" "
                                                    /></Typography>
                                            </GridItem>
                                        </GridContainer>
                                    </ListItem>


                                </CardHeader>
                                <CardActions >

                                    <Tooltip title="Demotion">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <Demotion fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Termination">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <Termination fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove Designation">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <RemoveDesignation fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Chnage Supervisor">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <ChnageSupervisor fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Transfer">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <Transfer fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>

                            </Card>
                        </GridItem>
                    </GridContainer>
                </TreeItem>
            </TreeItem>


            <TreeItem nodeId="5" label="Simple Root2">

                <GridContainer lg={12}>
                    <GridItem xs={12}>
                        <Card className="listcard">
                            <CardHeader color="rose" icon>
                                <ListItem className="peopletitle">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" />
                                    </ListItemAvatar>
                                    <GridContainer xs={12}>
                                        <GridItem xs={8}>
                                            <h4><small className="title">Person Name</small></h4>
                                            <p>Designation Title</p>
                                        </GridItem>
                                        <GridItem className="margintop" xs={4}>

                                            <Typography className="right" variant="h5" component="h5">
                                                <CountUp
                                                    className="account-balance"
                                                    start={0}
                                                    end={70}
                                                    duration={3.75}
                                                    useEasing={true}
                                                    useGrouping={true}
                                                    separator=" "
                                                /></Typography>
                                        </GridItem>
                                    </GridContainer>
                                </ListItem>


                            </CardHeader>
                            <CardActions >

                                <Tooltip title="Demotion">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <Demotion fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Termination">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <Termination fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove Designation">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <RemoveDesignation fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Chnage Supervisor">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <ChnageSupervisor fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Transfer">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                    >
                                        <Transfer fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>

                        </Card>
                    </GridItem>
                </GridContainer>
                <TreeItem className="child2" nodeId="7" label="Root2.1">

                    <GridContainer lg={12}>
                        <GridItem xs={12}>
                            <Card className="listcard">
                                <CardHeader color="rose" icon>
                                    <ListItem className="peopletitle">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" />
                                        </ListItemAvatar>
                                        <GridContainer xs={12}>
                                            <GridItem xs={8}>
                                                <h4><small className="title">Person Name</small></h4>
                                                <p>Designation Title</p>
                                            </GridItem>
                                            <GridItem className="margintop" xs={4}>

                                                <Typography className="right" variant="h5" component="h5">
                                                    <CountUp
                                                        className="account-balance"
                                                        start={0}
                                                        end={70}
                                                        duration={3.75}
                                                        useEasing={true}
                                                        useGrouping={true}
                                                        separator=" "
                                                    /></Typography>
                                            </GridItem>
                                        </GridContainer>
                                    </ListItem>


                                </CardHeader>
                                <CardActions >

                                    <Tooltip title="Demotion">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <Demotion fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Termination">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <Termination fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove Designation">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <RemoveDesignation fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Chnage Supervisor">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <ChnageSupervisor fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Transfer">
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.margin}
                                            size="small"
                                        >
                                            <Transfer fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>

                            </Card>
                        </GridItem>
                    </GridContainer>

                </TreeItem>
            </TreeItem>
        </TreeView>
    );
}