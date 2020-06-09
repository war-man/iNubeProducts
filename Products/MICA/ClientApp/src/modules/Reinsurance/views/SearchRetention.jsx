import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import retentionSearch from "assets/img/retention-search.png";
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
import Edit from "@material-ui/icons/Edit";
import Modal from '@material-ui/core/Modal';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import DefineRetentions from "modules/Reinsurance/views/DefineRetention.jsx";
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import Delete from "@material-ui/icons/Delete";
import swal from 'sweetalert';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
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
//const searchClose = {
//    float: "right",
//    position: 'relative',
//    width: "26px",
//    height: "28px",
//    borderRadius: "4px",
//    fontSize: "larger",
//    padding: "0px",
//    right: '10px',

//}
class SearchRetentions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            newdata: [],
            rtnId: "",
            yearmasterlist: [],
            flageUpdate: false,
            flag:true,
            editModal: false,
            close: false,
            open: false,
            RetentionDetails: [],
            showRetentionflag: false,
            retentionGroupId:"",
            SearchRetention: {
                year: "",
                yearId: 0,
                businessTypeId: "",
                retentionGroupName: null,
                StartDate: "",
                EndDate:""
            }

        };
          this.handleEdit = this.handleEdit.bind(this);
    }
    onInputChange = (evt) => {
        const Data = this.state.SearchRetention;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.SearchRetention)
    }
    onDateChange = (formate, name, event) => {
        //const { validdate } = this.state.fields;
        //this.setState({ validdate: false });
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1);
        }
        else {
            var mm = (today.getMonth() + 1);
        }
        //var date = today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' + today.getDate();
        var date = dt + '/' + mm + '/' + today.getFullYear();
        const fields = this.state.SearchRetention;
        fields[name] = date;
        this.setState({ fields });

    };
    onDelete = (id) => {
        debugger;
        this.state.rtnId=id
        //this.setState({ actnId: id })
        //if (this.state.actnId == "") {
        //    swal("", "Please select the Account to delete", "error")
        //}
        //else {

        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/DeleteRetention?retentionGroupId=` + this.state.rtnId, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(data => {
            this.onFormSubmit();
            swal({

                text: " Retention Deleted Successfully",
                icon: "success"
            });
        });
        //}
    }
    componentDidMount() {

        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MastertypeData`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
        console.log("data", this.state.masterList);

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
    }
    onFormSubmit = () => {
        
        console.log("submit", this.state.SearchRetention);
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SearchRetention`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.SearchRetention)
        }).then(response => response.json())
            .then(sdata => {
                //this.state.searchData = sdata;
                console.log(sdata, 'SearchData Fields ')
                if (sdata.length > 0) {
                    this.dataTable(sdata);
                    console.log(this.state.newdata, 'New Data123');
                }

                this.setState({ showRetentionflag: true });
            });
        console.log(this.state.newdata, 'New Data');
    }
    dataTable = (ParticipantList) => {
        console.log("ParticipantList", ParticipantList);
        this.setState({
            newdata: ParticipantList.map((prop, key) => {
                if (prop.effectiveFrom!=null) {
                    let fdate = new Date(prop.effectiveFrom).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    let edate = new Date(prop.effectiveTo).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.setState({ startdate: fdate, enddate: edate });
                }
                return {
                    id: key,
                    year: prop.year,
                    businesstype: prop.businessType,
                    retentiongroup: prop.retentionGroupName,
                    startdate: this.state.startdate,
                    enddate: this.state.enddate,
                    btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.retentionGroupId)} editModal={this.state.editModal}><Edit /></Button> 
                        <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete(prop.retentionGroupId)} ><Delete /></Button>
                        </div>
                };
            })
        });

    }
    editFunction(id, pId) {

        document.getElementById("disp");
       
        this.setState({ RetentionSelectedId: pId });

    }
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
        this.setState({ edit, retentionGroupId: id });

        //let flageUpdate = this.state.flagUpdate;
        //this.setState({ flageUpdate: true })
        //let flag = this.state.flag;
        
        //this.setState({ flag: false })

        console.log("edit", this.state.editModal);

    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.onFormSubmit();
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={retentionSearch} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="SearchRetention" /> </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Year"
                                    id="ddlstatus"
                                    required={true}
                                    lstObject={this.state.yearmasterlist}
                                    filterName='Year'
                                    value={this.state.SearchRetention.year}
                                    name='year'
                                     onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="BusinessType"
                                    id="ddlstatus"
                                    required={true}
                                    lstObject={this.state.masterList}
                                    filterName='BusinessType'
                                    value={this.state.SearchRetention.businessTypeId}
                                    name='businessTypeId'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="RetentionGroup"
                                    id="TreatyCode"
                                    value={this.state.SearchRetention.retentionGroupName}
                                    name='retentionGroupName'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3}>


                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                   
                                   
                                    labelText="EffectiveFromDate"
                                    id='EndDate'
                                    name='StartDate'
                                    value={this.state.SearchRetention.StartDate}
                                    onChange={(evt) => this.onDateChange('datetime', 'StartDate', evt)}
                                     //value={this.state.SearchRetention.StartDate}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>


                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                 
                                    
                                    labelText="EffectiveToDate"
                                    id='EndDate'
                                    name='EndDate'
                                    value={this.state.SearchRetention.EndDate}
                                    onChange={(evt) => this.onDateChange('datetime', 'EndDate', evt)}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                        </GridContainer>
                        <GridContainer justify='center'>
                            <GridItem>
                                <Button id="round" color="info" round onClick={() => this.onFormSubmit()}>
                                    <TranslationContainer translationKey="Search" />
                                    </Button>
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
                                    //style={searchClose}
                                    onClick={this.handleClose}>
                                    &times;
                                        </Button>
                                <div id="disp" >
                                    <DefineRetentions RetentionSelectedId={this.state.RetentionSelectedId} editModal={this.state.editModal} flagUpdate={this.state.flagUpdate} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} retentionGroupId={this.state.retentionGroupId} />
                                </div>
                            </div>
                        </Modal>
                    </CardBody>
                </Card>
                {this.state.showRetentionflag ? <GridContainer >
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                            <ReactTable
                                title= {"List Of Retention"}
                                data={this.state.newdata}
                                //data={this.state.Billingdata}
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
                                        Header: "Year",
                                        accessor: "year",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },

                                    {
                                        Header: "BusinessType",
                                        accessor: "businesstype",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },

                                    {
                                        Header: "RetentionGroup",
                                        accessor: "retentiongroup",

                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "EffectiveFromDate",
                                        accessor: "startdate",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "EffectiveToDate",
                                        accessor: "enddate",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
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
                </GridContainer>:null}
            </div>
        );
    }
}

export default withStyles(style)(SearchRetentions);