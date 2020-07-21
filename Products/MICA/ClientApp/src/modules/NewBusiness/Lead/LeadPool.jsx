import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import Modify from "./Modify.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import { Animated } from "react-animated-css";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import leadPool from "assets/img/server.png";
import LeadGrid from "./LeadGrid.jsx";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import swal from 'sweetalert';

import CommonModify from './CommonModify.jsx';
import GridItem from '../../../components/Grid/GridItem.jsx';


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




class LeadPool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         
            isShowLeadPoolHeadr: true,
            isDontShowLead1: true,
            isShowCreateLead: false,
            isShow: false,
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            type: "Lead",
            rowData: {},
            display: false,
            suspectinfo: [],

            show: false,
            submitshow: false,
            modifypage: false,

            isDontShowLead1: true,
        }
      // this.state.isDontShowLead1 =this.props.isShowLead1;
       // this.state.isShowLead1 = props.isDontShowLead1;

    };
    

    componentDidMount() {


    }

    render() {
        const { classes } = this.props;

        return (
           
            <GridContainer xl={12}>
                {
                    this.state.isDontShowLead1 &&

                    <GridItem lg={12}>
                        
                        <CardBody>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                            <CommonModify isShowGrid={true} type={this.state.type}
                                isShowLeadPoolHeadr={this.state.isShowLeadPoolHeadr}
                                isShowCreateLead={this.state.isShowCreateLead} />


                        </Animated>
                            </CardBody>
                          
                       

                    </GridItem>
                }
              
                </GridContainer >
            
        );

    }


}


export default withStyles(styles)(LeadPool);