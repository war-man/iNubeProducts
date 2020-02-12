import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
//import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
//import Radio from "@material-ui/core/Radio";
//import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
import Partner from "modules/Partners/Organization/views/CreatePartner.jsx";
//import ProductSearch from "modules/Products/Micro/views/ProductSearch.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
//import bindModel from 'components/ModelBinding/bindModel.js';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import partnereDetails from "assets/img/workers.png";
import $ from 'jquery';
import swal from 'sweetalert';
//import "react-table/react-table.css";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
//import searchproduct from "assets/img/search-product.png";
import { Animated } from "react-animated-css";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
import Delete from "@material-ui/icons/Delete";
import Switch from '@material-ui/core/Switch';
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CommonMessage from "Messages/CommonMessage.jsx";


const paddingCard =
{
    padding: "10px",
};

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
const AntSwitch = withStyles(theme => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);
const searchClose = {
    float: "right",
    position: 'relative',
    bottom: "56px",
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}

class SearchPartner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newdata: [],
            editModal: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            visibility: false,
            masterList: [],
            partlist: [],
            partid: "",
            disabled: false,
            disable: false,
            partnerDetails: {},
            close: false,
            rowData: {},
            showTable: false,
            partnerIdState: "",
            partnerNameState: "",
            PartnerSearchDTO: {
                partnerCode: "",
                partnerName: "",
                partnerId: "",
                partnerTypeId: "",
                partnerClassId: "",
                mobile: "",
                email: "",
                pan: "",
                status:"",
            },
            viewModifyFlag: false,
            viewEditFlag:false,
            loader: true,
            pageloader: false,
            nodata: false,
            isActiveData:"",
        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.showPartnerTable = this.showPartnerTable.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleView = (partnerId) => {
        //if (this.state.partid == "") {
        //    swal("", "Please select the patner to view details", "error")
        //} else {
        this.setState({ partid: partnerId });
            this.handleOpen();
            let view = this.state;
            view.disabled = true;
            view.disable = true;
            view.editModal = true;
            view.open = true;
            view.close = false;
            view.visibility = false;
            view.close = false;
            view.viewEditFlag = true;

            this.setState({ view , viewModifyFlag:true});

        //}
    };

    handleEdit = (id) => {
        //if (this.state.partid == "") {
        //    swal("", "Please select the patner to edit details", "error")
        //} else {
        this.setState({partid:id});
            this.handleOpen();
            console.log(id)
            let edit = this.state;
            edit.close = false;
            edit.editModal = true;
            edit.visibility = false;
            edit.open = true;
            edit.disabled = false;
            edit.disable = false;
            edit.close = false;
            edit.viewEditFlag = false;
            this.setState({ edit });
            console.log("edit", this.state.editModal);
            this.setState({viewModifyFlag:false});
        //}
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    //Disable Partner
    onDelete = (status,id) => {
        debugger;
        //if (this.state.partid == "") {
        //    swal("", "Please select the Partner to Delete", "error")
        //}
        // else {
        this.setState({ partid : id});
        fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/DeletePartner?PartnerId=` + id, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            }).then(data => {
                this.showPartnerTable();
                if (status== true) {
                    var msg = CommonMessage("Deactive", [])
                    swal({
                        text: msg,
                        icon: "success"
                    });
                }
                else {
                    var msg = CommonMessage("Active", [])
                    swal({
                        text: msg,
                        icon: "success"
                    });
                }
            });
       
       // }
    }


    showPartnerTable = () => {
        let partner = this.state.PartnerSearchDTO;
        if (partner.partnerId != "" || partner.partnerName != ""
            || partner.partnerClassId != "" || partner.partnerTypeId != "" || partner.status!="") {
            this.setState({ loader: false });
            fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/SearchPartner`, {
                method: 'POST',
                body: JSON.stringify(partner),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ partlist: data })
                    console.log("data coming from database", data);
                    if (this.state.partlist.length > 0) {
                        this.setState({ showTable: false, loader: false });
                        this.datatable();
                    } else {
                            setTimeout(
                                function () {
                                    this.setState({ loader: true, showTable: false, nodata: true });
                                }.bind(this), 2000
                            );
                        }
                });
        }
        else {
            var msg = CommonMessage("SearchParameter", [])
            swal({
                text: msg,
                icon: "error"
            });
        }
    }

    datatable = () => {
        this.setState({ showTable: true, loader: true })
        this.setState({
            newdata: this.state.partlist.map((prop, key) => {
                const { classes } = this.props;
                return {
                    Partnerid: prop.partnerId,
                    PartnerCode: prop.partnerCode,
                    PartnerName: prop.partnerName,
                    PartnerTypeid: prop.partnerType,
                    Partnerclassid: prop.partnerClass,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.partnerId)} />,
                    btn: <div>
                        < Tooltip title="View" placement="bottom" arrow >
                            <Button color="info" justIcon round simple className="view" onClick={() => this.handleView(prop.partnerId)}><Visibility /></Button>
                        </ Tooltip>
                        < Tooltip title="Edit" placement="bottom" arrow >
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.handleEdit(prop.partnerId)} editModal={this.state.editModal}><Edit /></Button>
                        </ Tooltip>
                        {/*  <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete()}><Delete /></Button>*/}
                        </div>,
                    status: <div>
                        {
                          (prop.isActive == true)?
                         (
                            < Tooltip title = "Deactivate" placement = "bottom" arrow >
                             <Switch checked={prop.isActive} color="primary" onClick={() => this.onDelete(prop.isActive,prop.partnerId)} />
                            </Tooltip >
                          )
                          :
                          (
                            < Tooltip title="Activate" placement="bottom" arrow >
                            <Switch checked={prop.isActive} color="primary" onClick={() => this.onDelete(prop.isActive,prop.partnerId)} />
                            </Tooltip >
                           )
                        }
                        </div>
                };
            })
        });
    }

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    onInputChange = (type, event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        const PartnerSearchDTO = this.state.PartnerSearchDTO;
        PartnerSearchDTO[name] = value;
        this.setState({ PartnerSearchDTO });
        this.change(event, name, type);
    }
    editFunction(id, pId) {
        document.getElementById("disp");
        var orgArr = this.state.partlist
        var partArr = [];
        $.each(orgArr, function (k, v) {
            if (v.partnerId == pId) {
                partArr.push(orgArr[id]);
            }
        })
        ////const partdata = partArr[0].partnerId;
        //this.setState({ pertid: partArr[0].partnerId, rowData: partArr });
        ////let state = this.state;
        ////state.partid = partArr[0].partnerId;
        ////state.rowData = partArr;
        ////this.setState({ state });
        const partdata = partArr[0].partnerId;
        this.state.partid = partArr[0].partnerId;
        this.state.rowData = partArr;
        console.log("display data: ", this.state.partid, this.state.rowData)
    }

    componentDidMount() {
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetMasterData?sMasterlist=OrgCategory`, {
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
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
    };

    SetValue = (type, event) => {
        event.preventDefault();
        let PartnerSearchDTO = this.state.PartnerSearchDTO;
        let name = event.target.name;
        let value = event.target.value;
        PartnerSearchDTO[name] = value;
        this.setState({ PartnerSearchDTO })

    };
    change = (event, stateName, type) => {
        switch (type) {
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "ID":
                if (validationPage.verifyID(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "phnumber":
                if (validationPage.verifyPhNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "pan":
                if (validationPage.verifyPanIndNum(event.target.value, 6)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={partnereDetails} /></Icon>

                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                                <small><TranslationContainer translationKey="SearchPartner" /> </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        success={this.state.partnerNameState == "success"}
                                        error={this.state.partnerNameState == "error"}
                                        labelText="PartnerName"
                                        name="partnerName"
                                        value={this.state.PartnerSearchDTO.partnerName}
                                        onChange={(e) => this.onInputChange("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                {/*<GridItem xs={12} sm={12} md={4}>
                         <CustomInput
                             labelText="Partner Code"
                             id="partnerCode"
                             name="partnerCode"
                             value={this.state.PartnerSearchDTO.partnerCode}
                             onChange={this.onInputChange}
                             formControlProps={{
                                fullWidth: true
                             }}
                          />
                    </GridItem>*/}
                                <GridItem xs={12} sm={12} md={3}>
                                    <MasterDropdown
                                        labelText="PartnerType"
                                        id="PartnerSearchDTO.partnerTypeId"
                                        value={this.state.PartnerSearchDTO.partnerTypeId}
                                        lstObject={this.state.masterList}
                                        filterName='PartnerType'
                                        model="PartnerDTO"
                                        name='partnerTypeId'
                                        onChange={(e)=>this.SetValue('',e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <MasterDropdown
                                        labelText="PartnerClass"
                                        id="PartnerSearchDTO.partClassId"
                                        value={this.state.PartnerSearchDTO.partnerClassId}
                                        lstObject={this.state.masterList}
                                        filterName='PartnerClass'
                                        model="PartnerDTO"
                                        name='partnerClassId'
                                        onChange={(e) => this.SetValue('', e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <MasterDropdown
                                        labelText="PartnerStatus"
                                        id="PartnerSearchDTO.status"
                                        value={this.state.PartnerSearchDTO.status}
                                        lstObject={this.state.masterList}
                                        filterName='PartnerStatus'
                                        //model="PartnerDTO"
                                        name='status'
                                        onChange={(e) => this.SetValue('', e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={1}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <Button id="button-search-partner" color="info" round onClick={this.showPartnerTable}>
                                                    <TranslationContainer translationKey="Search" />
                          </Button>
                                        </Animated>
                                    </GridItem>
                                </GridContainer>

                            </GridContainer>
                        </div>
                    </CardBody>
                </Card>
                    : <PageContentLoader />}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>

                    <div className={classes.paper} id="modal">
                        {this.state.viewModifyFlag ? <h4><small className="center-text"> <TranslationContainer translationKey="ViewPartner" /></small></h4> : <h4><small className="center-text"> <TranslationContainer translationKey="ModifyPartner" /></small></h4>}
                        <Button color="info"
                            round
                            className={classes.marginRight}
                            id="close-bnt"
                            onClick={this.handleClose}>
                            &times;
                                                        </Button>
                        <div id="disp" >
                            <Partner viewEditFlag={this.state.viewEditFlag} editModal={this.state.editModal} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} searchPartnerId={this.state.partid} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} />
                        </div>
                    </div>
                </Modal> 
                {/*  <GridContainer justify="center">
                            <Button color="info" id="push-right" round className={classes.marginRight} onClick={this.handleView}>View</Button>
                            <Button color="info" round className={classes.marginRight} onClick={this.handleEdit} editModal={this.state.editModal}>Edit</Button>
                        </GridContainer> */}
                {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.showTable ?
                            <GridItem lg={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <ReactTable //id="coustTable" 
                                    title={"Partner Details"}
                                    data={this.state.newdata}
                                    filterable
                                    columns={[
                                        //{
                                        //    Header: "Select",
                                        //    accessor: "radio",
                                        //    minWidth: 10,
                                        //    style: { textAlign: "left" },
                                        //    headerClassName: 'react-table-center',
                                        //    sortable: false,
                                        //    filterable: false,
                                        //    resizable: false,
                                        //},
                                        {
                                            Header: "PartnerCode",
                                            accessor: "PartnerCode",
                                            //minWidth: 30,
                                            style: { textAlign: "left" },
                                            headerClassName: 'react-table-center',
                                            resizable: false,
                                        },
                                        {
                                            Header: "PartnerName",
                                            accessor: "PartnerName",
                                            //minWidth: 30,
                                            style: { textAlign: "left" },
                                            headerClassName: 'react-table-center',
                                            resizable: false,
                                        },
                                        {
                                            Header: "PartnerType",
                                            accessor: "PartnerTypeid",
                                            //minWidth: 30,
                                            style: { textAlign: "left" },
                                            headerClassName: 'react-table-center',
                                            resizable: false,
                                        },
                                        {
                                            Header: "PartnerClass",
                                            accessor: "Partnerclassid",
                                            //minWidth: 30,
                                            style: { textAlign: "left" },
                                            headerClassName: 'react-table-center',
                                            resizable: false,
                                        },
                                        {
                                            Header: "Action",
                                            accessor: "btn",
                                            minwidth: 30,
                                           style: { textalign: "left" },
                                            headerclassname: 'react-table-center',
                                            resizable: false,
                                        },
                                        {
                                            Header: "Status",
                                            accessor: "status",
                                            //minwidth: 30,
                                            style: { textalign: "left" },
                                            headerclassname: 'react-table-center',
                                            resizable: false,
                                        },

                                    ]}
                                    defaultPageSize={5}
                                    pageSize={([this.state.newdata.length + 1] < 5) ? [this.state.newdata.length + 1] : 5}
                                    //showPaginationBottom={([this.state.newdata.length + 1] <= 5) ? false : true}
                                    showPaginationBottom={true}
                                    showPaginationTop={false}
                                    className="-striped -highlight"
                                />
                            </Animated>
                        </GridItem>
                       
                     : <GridItem lg={12}>
                            {this.state.nodata ?
                                <Card>
                                    <GridContainer lg={12} justify="center">
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <img src={data_Not_found} className="tab-data-not-found" />
                                        </Animated>
                                    </GridContainer>
                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1} >
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                </Card>
                                : null}
                        </GridItem>}
                    </GridContainer>
                    : <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>}

            </div>
        );
    }
}

export default withStyles(styles)(SearchPartner);