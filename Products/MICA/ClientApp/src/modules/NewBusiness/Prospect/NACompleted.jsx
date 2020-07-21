import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import user from "assets/img/user.png";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import CommonModify from '../Lead/CommonModify.jsx';
import { Animated } from "react-animated-css";


const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
const searchBtn = {
    left: "140%",

}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});




class NeedAnalysCompleted extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataRows: [],
            isShowLeadPoolHeadr: false,
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            type: "Prospect",
        }

    };

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;

        return (
            <GridContainer xl={12}>
                <GridItem lg={12}>
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={user} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Need Analysis Completed </small>
                        </h4>
                    }
                </CardHeader>

                        </Card>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                        <CommonModify isShowGrid={true} type={this.state.type}
                            isShowLeadPoolHeadr={false}
                            isShowCreateLead={this.state.isShowCreateLead} />


                    </Animated>
                  
           
                </GridItem >
              
                </GridContainer >
        );
    }


}


export default withStyles(styles)(NeedAnalysCompleted);