import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import DefineMapping from "modules/Reinsurance/views/DefineMapping.jsx";
import Modal from '@material-ui/core/Modal';
import swal from 'sweetalert';
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

class SearchMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearmasterlist: [],
            newdata: [],
            rimapId:"",
            showMapping:false,
            showRetentionflag: false,
            SelectedId: "",
            rimappingId:"",
            Mapping: {
                year: "", 
                level: "",
                lobProductCover:""
            }
        };
        this.handleEdit = this.handleEdit.bind(this);
    }
    onInputChange = (evt) => {

        const Data = this.state.Mapping;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.Mapping)

    } 

    componentDidMount() {
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MasterYearData`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("yearmasterlist: ", data);
                this.setState({ yearmasterlist: data });
            });
        console.log("data", this.state.masterList);
    }
    onFormSubmit = () => {
        debugger;
        console.log("submit", this.state.Mapping);
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SearchRImapping`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.Mapping)
        }).then(response => response.json())
            .then(sdata => {
                //this.state.searchData = sdata;
                console.log(sdata, 'SearchData Fields ')
                if (sdata.length > 0) {
                    this.dataTable(sdata);
                    console.log(this.state.newdata, 'New Data123');
                }

                this.setState({ showMapping: true });
            });
        console.log(this.state.newdata, 'New Data');
    }
    editFunction(id, pId) {

        document.getElementById("disp");

        this.setState({ SelectedId: pId });

    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.onFormSubmit();
    };
    handleEdit = (index, id) => {
        debugger;
        this.editFunction(index, id);
        console.log("id", id);
        let edit = this.state;
        edit.close = false;
        edit.editModal = true;
        edit.visibility = false;
        edit.open = true;
        edit.disabled = true;
        edit.disable = true;
        edit.close = false;
        edit.flagUpdate = true;
        this.setState({ edit, rimappingId: id });

        //let flageUpdate = this.state.flagUpdate;
        //this.setState({ flageUpdate: true })
        //let flag = this.state.flag;

        //this.setState({ flag: false })

        console.log("edit", this.state.editModal);

    };
    dataTable = (ParticipantList) => {

        console.log("ParticipantList", ParticipantList);
        this.setState({
            newdata: ParticipantList.map((prop, key) => {

                return {
                    id: key,
                    year: prop.year,
                    level: prop.level,
                    lobProductCover: prop.lobProductCover,
                    //businesstype: prop.businessType,
                    //retentiongroup: prop.retentionGroupName,
                    //startdate: prop.effectiveFrom,
                    //enddate: prop.effectiveTo,
                    btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.rimappingId)} editModal={this.state.editModal}><Edit /></Button>
                        <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete(prop.rimappingId)} ><Delete /></Button>
                    </div>
                };
            })
        });

    }
    onDelete = (id) => {
        debugger
        this.state.rimapId = id
        console.log("rimappid",id);
        //this.setState({ actnId: id })
        //if (this.state.actnId == "") {
        //    swal("", "Please select the Account to delete", "error")
        //}
        //else {

        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/DeleteRiMapping?RimappingId=` + this.state.rimapId, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(data => {
            this.onFormSubmit();
            swal({

                text: " Mapping Deleted Successfully",
                icon: "success"
            });
            });
       
        //}
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="Search" /> </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Year"
                                    id="ddlstatus"
                                    lstObject={this.state.yearmasterlist}
                                    filterName='Year'
                                    value={this.state.Mapping.year}
                                    name='year'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Level"
                                    id="ContactNo"
                                    value={this.state.Mapping.level}
                                    name='level'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem> <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="LOBProductCover"
                                    id="ContactNo"
                                    value={this.state.Mapping.lobProductCover}
                                    name='lobProductCover'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem>
                                <Button id="button-search-partner" color="info" round onClick={() => this.onFormSubmit()}>
                                    <TranslationContainer translationKey="Search" />
                                    </Button>
                            </GridItem>
                        </GridContainer>
                       <GridContainer >
                            
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
                                    //style={searchClose}
                                    onClick={this.handleClose}>
                                    &times;
                                        </Button>
                                <div id="disp" >
                                    <DefineMapping SelectedId={this.state.SelectedId} editModal={this.state.editModal} flagUpdate={this.state.flagUpdate} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} rimappingId={this.state.rimappingId}/>
                                </div>
                            </div>
                        </Modal>
                    </CardBody>
                </Card> 
                {this.state.showMapping &&
                    <GridContainer >
                        <GridItem xs={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                <ReactTable
                                    title={"List Of RI Mapping & Sequence "}
                                    data={this.state.newdata}
                                    filterable
                                    columns={[
                                        //{
                                        //    Header: "",
                                        //    accessor: "radio",
                                        //    minWidth: 20,
                                        //    style: { textAlign: "center" },
                                        //    headerClassName: 'react-table-center',
                                        //    sortable: false,
                                        //    filterable: false,
                                        //    resizable: false,
                                        //},
                                        //{
                                        //    Header: " S No",
                                        //    accessor: "SNo",
                                        //    style: { textAlign: "center" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 50,
                                        //    resizable: false,

                                        //},
                                        {
                                            Header: " Year",
                                            accessor: "year",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,

                                        },

                                        {
                                            Header: "Level",
                                            accessor: "level",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,

                                        },

                                        {
                                            Header: "LOB/Product/Cover",
                                            accessor: "lobProductCover",

                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },
                                        //{
                                        //    Header: "Created Date",
                                        //    accessor: "treatytype",

                                        //    ///style: { textAlign: "center" },
                                        //    ///headerClassName: 'react-table-center'
                                        //    style: { textAlign: "center" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 50,
                                        //    resizable: false,
                                        //},
                                        {
                                            Header: "Action",
                                            accessor: "btn",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        }

                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    // pageSize={([this.state.Billingdata.length + 1] < 5) ? [this.state.Billingdata.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                            </Animated>


                        </GridItem>
                    </GridContainer>}
            </div>
        );
    }
}

export default withStyles(style)(SearchMapping);