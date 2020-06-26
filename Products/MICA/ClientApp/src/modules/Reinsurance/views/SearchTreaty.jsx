import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import TreatySearch from "assets/img/Treaty-doc.png";
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
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Edit from "@material-ui/icons/Edit";
import Modal from '@material-ui/core/Modal';
import { Redirect } from 'react-router-dom';
import CreateTreaty from "modules/Reinsurance/views/CreateTreaty.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Delete from "@material-ui/icons/Delete";
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

class SearchTreaty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startdate: "",
            enddate:"",
            show: false,
            showG: false,
            treatyId:"",
            IsParameterGrid: false,
            masterList: [],
            yearmasterlist: [],
            newdata: [],
            open: false,
            treatySelectedId: "",
            treatyGroupId:"",
            showTreatyGrp:false,
            showTreatyflag: false,
            editModal: false,
            redirect: false,
            trtid: "",
            SearchTreaty: {
                treatyCode: null,
                treatyDescription: null,
                startDate: null,
                endDate: null,
                treatyYear: null
                
            }
        };
    }
    onInputChange = (evt) => {
        const Data = this.state.SearchTreaty;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.SearchTreaty)
    }
    editFunction(id, pId) {

        document.getElementById("disp");

        this.setState({ treatySelectedId: pId });
        console.log("treatyid", this.state.treatySelectedId);

    }
    onDelete = (id) => {
        debugger;
        this.state.trtid = id
        //this.setState({ actnId: id })
        //if (this.state.actnId == "") {
        //    swal("", "Please select the Account to delete", "error")
        //}
        //else {
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/DeleteTeaty?tratyId=` + this.state.trtid, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(data => {
            this.onFormSubmit();
            swal({
                text: " Treaty Deleted Successfully",
                icon: "success"
            });
        });

        //}
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
        edit.flagUpdate = true;
        this.setState({ edit, treatyGroupId: id });

        //let flageUpdate = this.state.flagUpdate;
        //this.setState({ flageUpdate: true })
        //let flag = this.state.flag;

        //this.setState({ flag: false })

        console.log("edit", this.state.editModal);

    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.onFormSubmit();
    };
    editFunction(id, pId) {

        document.getElementById("disp");

        this.setState({ treatySelectedId: pId });

    }
    handleRadioOnChange = (event) => {

        this.state.singleValueIsParameter = event.target.value;
        if (event.target.value == 0) {
            this.setState({ IsParameterGrid: true });
            
            this.setState({});
        }
        else {
            this.setState({ IsParameterGrid: false });
        }

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

    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/Reinsurance/CreateTreaty',

            }} />
        }
    }
    handleAddTreaty = () => {
        debugger;
        this.setState({ redirect: true });
        this.renderRedirect();
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
        const fields = this.state.SearchTreaty;
        fields[name] = date;
        this.setState({ fields });

    };
    onFormSubmit = () => {
        debugger;
        console.log("submit", this.state.SearchTreaty);
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SearchTreaty`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.SearchTreaty)
        }).then(response => response.json())
            .then(sdata => {
                //this.state.searchData = sdata;
                console.log(sdata, 'SearchData Fields ')
                if (sdata.length > 0) {
                    this.dataTable(sdata);
                    console.log(this.state.newdata, 'New Data123');
                }
                this.setState({ showTreatyflag: true });
            });

        console.log(this.state.newdata, 'New Data');
    }
    dataTable = (ParticipantList) => {
        debugger;
        console.log("ParticipantList", ParticipantList);
        this.setState({
            newdata: ParticipantList.map((prop, key) => {
               if (prop.startDate != null) {
                    let fdate = new Date(prop.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    let edate = new Date(prop.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.setState({ startdate: fdate, enddate: edate });
                }
                return {
                    id: key,
                    treatycode: prop.treatyCode,
                    treatydescription: prop.treatyDescription,
                    startDate: this.state.startdate,                  
                    enddate: this.state.enddate,
                    treatyYear: prop.treatyYear,
                    //stausType: prop.stausType,
                    //enddate: prop.effectiveTo,
                    btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.treatyId)} editModal={this.state.editModal}><Edit /></Button>
                        <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete(prop.treatyId)} ><Delete /></Button>
                    </div>
                };
            })
        });
         
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={TreatySearch} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="SearchTreaty"/> </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                    
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                           
                                <FormControlLabel
                                    control={
                                        <Radio

                                            //checked={this.props.singleValueIsParameter === "0"}
                                            checked={true}
                                            onChange={this.handleRadioOnChange}
                                            disabled={this.props.viewdisable}
                                            value={0}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={<TranslationContainer translationKey="Proportional"/>}
                        />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.props.singleValueIsParameter === "1"}
                                            onChange={this.handleRadioOnChange}
                                            disabled={this.props.viewdisable}
                                            value={1}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={<TranslationContainer translationKey="NonProportional"/>}
                                    />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                    <FormControlLabel
                                        control={
                                            <Radio

                                                checked={this.props.singleValueIsParameter === "0"}
                                                onChange={this.handleRadioOnChange}
                                                disabled={this.props.viewdisable}
                                                value={0}
                                                name="radio button demo"
                                                aria-label="B"
                                                icon={
                                                    <FiberManualRecord
                                                        className={classes.radioUnchecked}
                                                    />
                                                }
                                                checkedIcon={
                                                    <FiberManualRecord
                                                        className={classes.radioChecked}
                                                    />
                                                }
                                                classes={{
                                                    checked: classes.radio,
                                                    root: classes.radioRoot
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label
                                        }}
                                    label={<TranslationContainer translationKey="Both"/>}
                                    />                          
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="TreatyCode"
                                    id="Treatycode"
                                    value={this.state.SearchTreaty.TreatyCode}
                                        name='TreatyCode'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="TreatyDescription"
                                    id="Treatydisc"
                                    value={this.state.SearchTreaty.TreatyDescription}
                                        name='TreatyDescription'
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
                                        name='startDate'
                                        value={this.state.SearchTreaty.startDate}
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
                                        name='endDate'
                                        value={this.state.SearchTreaty.endDate}
                                        onChange={(evt) => this.onDateChange('datetime', 'EndDate', evt)}
                                        formControlProps={{ fullWidth: true }} />

                            </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <MasterDropdown
                                        labelText="Year"
                                        id="ddlstatus"
                                        lstObject={this.state.yearmasterlist}
                                        filterName='Year'
                                        value={this.state.SearchTreaty.treatyYear}
                                        name='treatyYear'
                                        onChange={this.onInputChange}
                                        formControlProps={{ fullWidth: true }} />

                                </GridItem>                                                           
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={5} sm={12} md={3}>
                                    <Button id="round"  color="info" round onClick={() => this.onFormSubmit()}>
                                        <TranslationContainer translationKey="Search" />
                                    </Button>
                                </GridItem>
                                </GridContainer>
                        </GridContainer>

                       <GridContainer>
                            <GridItem xs={5} sm={3} md={3}>
                                <Button 
                                    id="round" 
                                    color="info"
                                    size="sm"
                                    onClick={this.handleAddTreaty}
                                >
                                    <TranslationContainer translationKey="AddNewTreaty" />
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
                                    <CreateTreaty RetentionSelectedId={this.state.treatySelectedId} editModal={this.state.editModal} flagUpdate={this.state.flagUpdate} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} treatyGroupId={this.state.treatyGroupId} showTreatyGrp={this.state.showTreatyGrp}/>
                                </div>
                            </div>
                        </Modal>

                    </CardBody>
                </Card>
                {this.state.showTreatyflag ? <GridContainer>
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                            <ReactTable
                                title={"Treaty List"}
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

                                    {
                                        Header: " Treaty Code",
                                        accessor: "treatycode",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },

                                    {
                                        Header: "Treaty Descripton",
                                        accessor: "treatydescription",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },

                                    {
                                        Header: "Start Date",
                                        accessor: "startDate",

                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "End Date",
                                        accessor: "enddate",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "Treaty Year",
                                        accessor: "treatyYear",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },

                                    {
                                        Header: "Status",
                                        accessor: "stausType",

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
                                    },




                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                // pageSize={([this.state.Billingdata.length + 1] < 5) ? [this.state.Billingdata.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </Animated>
                      

                    </GridItem>
                </GridContainer> : null}

                {this.renderRedirect()}
            </div>
        );
    }
}

export default withStyles(style)(SearchTreaty);