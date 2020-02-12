import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Radio from "@material-ui/core/Radio";
// @material-ui/core components

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import $ from 'jquery';
//import { alert } from "../../../Login/_reducers/alert.reducer";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RateConfig from "modules/Rating/RateConfig.js";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Reset from '@material-ui/icons/Autorenew';
import Chip from '@material-ui/core/Chip';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Modal from '@material-ui/core/Modal';
import EditCalculationConfig from "./EditCalculationConfig.jsx";


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


class SearchCalculationConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                RateConfigName: "",
                RateConfigDDID: "",
            },
            typeList: [],
            editModal: false,
            close: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            visibility: false,
            activeFrom: "",
            disabled: true,
            disable: true,

            RateVal: "",
            RateID: "",

        };
    }

    componentDidMount() {
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetRateConfigName?isFilter=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ typeList: data });
                console.log("Rate names", this.state.typeList, data);
            });
       
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );

    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        //console.log("fields", fields);
        this.setState({ fields });
    }

    editFunction = () => {
        let id = this.state.fields.RateConfigDDID;
        
        let filterval = this.state.typeList.filter(x => x.mID == id);
        let val = filterval[0].mValue;
        this.state.RateVal = val;
        this.state.RateID = filterval[0].mID;
        this.setState({});
        console.log("RateVal", id, this.state.RateVal, val, this.state.RateID);
    }
   
    handleEdit = ( ) => {
        if (this.state.partid == "") {
            swal("", "Please select the patner to edit details", "error")
        } else {
            this.handleOpen();

            this.editFunction();
            let edit = this.state;
            edit.close = false;
            edit.editModal = true;
            edit.visibility = false;
            edit.open = true;
            edit.disabled = true;
            edit.disable = true;
            edit.close = false
            this.setState({ edit});
            console.log("edit", this.state.editModal);
        }
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <PermIdentity />
                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                            <small> Search Calculation Config </small>
                        </h4>
                    </CardHeader>

                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={3}>
                                <Dropdown
                                    labelText="Rate Config Name"
                                    id="RateConfigDDID"
                                    value={this.state.fields.RateConfigDDID}
                                    lstObject={this.state.typeList}
                                    //required={true}
                                    //model="InvoiceSearchHistory"
                                    //filterName='InvoiceStatus'
                                    name='RateConfigDDID'
                                    onChange={this.onInputParamChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem >
                                <Animated animationIn={this.state.animatedType} animationOut="fadeOut" isVisible={true}>
                                    <Button color="info" round
                                        onClick={this.handleEdit.bind()} 
                                    >
                                        <TranslationContainer translationKey={"Edit"} />
                                    </Button>
                                </Animated>
                            </GridItem>

                        </GridContainer>

                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}>

                            <div className={classes.paper} id="modal" >
                                <h4>  <small className="center-text">   </small> </h4>
                                <Button color="info"
                                    round
                                    className={classes.marginRight}
                                    id="close-bnt"
                                    style={searchClose}
                                    onClick={this.handleClose}>
                                    &times;
                                        </Button>
                                <div id="disp" >
                                    <EditCalculationConfig RateID={this.state.RateID} RateVal={this.state.RateVal} RateSelectedId={this.state.RateSelectedId} editModal={this.state.editModal} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} searchPartnerId={this.state.partid} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} />
                                    {/*  <RegenerateInvoice InvoiceSelectedNo={this.state.InvoiceSelectedNo} editModal={this.state.editModal} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} searchPartnerId={this.state.partid} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} />
                                */}</div>
                            </div>
                        </Modal>

                    </CardBody>
                </Card>
            </div>

        );

    }
}
export default withStyles(style)(SearchCalculationConfig);