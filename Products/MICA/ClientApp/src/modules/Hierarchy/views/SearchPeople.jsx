import React from "react";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import ProfileDet from "./_ProfileDet";
//import Address from "./_Address.jsx"
import swal from 'sweetalert';
import UserConfig from 'modules/Users/UserConfig.js';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import FilterNone from "@material-ui/icons/FilterNone";
import PropTypes from "prop-types";
import $ from 'jquery';
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
//import profileStyles from "assets/jss/material-dashboard-pro-react/views/profileStyles.jsx";
//import profileStyles from "./profileStyles.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import profileDetails from "assets/img/profile-details.png";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.jsx";
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import searchproduct from "assets/img/search-product.png";
//import Profile from "./Office.jsx";
//import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import HierarchyConfig from "modules/Hierarchy/HierarchyConfig.js";
import People from "modules/Hierarchy/views/People.jsx";
import Edit from "@material-ui/icons/Edit";
//import ReactTables from "./ReactTables.jsx"
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from "@material-ui/icons/Visibility";
import IconButton from '@material-ui/core/IconButton';
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
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
const newStyle = {
    maxWidth: "80%",
    marginLeft: "12%",
    overflow: "auto"
}
const okBtn = {

    marginLeft: "527px",
    //marginTop: "20px",
    height: "25px",
    textAlign: "center",

    width: "65px",
    padding: "1px"
}
const modalStyles = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    paddingBottom: '5px',
    paddingRight: '2px'
    //  boxShadow: theme.shadows[5],

};

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
const searchBtn = {
    width: "120px",
    height: "35px",
    textAlign: "center",
    margin: "0 auto"
}
class SearchPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            newdata: [],
            react: false,
            orgid: "",
            open: false,
            OfficeCode: "",
            officelist: [],
            officesendlist: [],
            newofficesendlist: [],
            offdata: "",
            showtable: false,
            data: [],
            radioValue1: false,
            radioValue2: false,
            disabled: false,
            flageUpdate: false,
            flag: true,
            flagsave:true,
            editModal: false,
            close: false,
            empcode: "",
            SearchPeople: {
                EmpCode: "",

            }

        };

    }
    onInputChange = (evt) => {
        const Data = this.state.SearchPeople;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.SearchPeople)
    }
    onFormSubmit = () => {
        debugger;
        this.setState({ showtable: true });
        console.log("submit", this.state.SearchPeople);
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/SearchPeople`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.SearchPeople)
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
    SetValue = (type, event) => {
        //  event.preventDefault();
        console.log('teset ' + event)

        let name = event.target.name;

        let value = event.target.value;

        let { OfficeCode } = this.state;
        // officeId = value;
        this.setState({ OfficeCode: value });
        console.log("OfficeCode ", this.state.OfficeCode);

    };
    editFunction(id, oid) {
        console.log("pid", oid);
        console.log("officelist data", this.state.officelist);
        var offArr = this.state.officelist;
        var OfficeArr = [];
        $.each(offArr, function (k, v) {
            if (v.orgOfficeId == oid) {
                OfficeArr.push(offArr[id]);
            }
        })
        console.log("OfficeArr", OfficeArr);
        this.setState({ officesendlist: OfficeArr });
        this.setState({ newofficesendlist: OfficeArr });
        console.log("before edit", this.state.newofficesendlist);
        const Officedata = OfficeArr[0].orgOfficeId;
        // let offdata=this.state.offdata;
        this.setState({ offdata: Officedata });
        console.log("officesendlist: ", this.state.officesendlist, this.state.offdata);

    }
    onChangeRadio = () => {

        let radioValue1 = this.state.radioValue1;
        let radioValue2 = this.state.radioValue2;

    }

    //tableshow = () => {
    //    this.setState({ showtable: true });
    //    fetch(`${partnerconfig.partnerconfigUrl}/api/Office/SearchOffice?OfficeCode=` + this.state.OfficeCode, {
    //        //  fetch(`https://inubeservicespartners.azurewebsites.net/api/Office/SearchOffice?OfficeCode=` + this.state.OfficeCode, {
    //        //  fetch(`https://localhost:44315/api/Office/SearchOffice?OfficeCode=` + this.state.OfficeCode,{
    //        method: 'GET',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //        },
    //    })
    //        .then(response => response.json())
    //        .then(data => {
    //            console.log("officelist", data);
    //            this.setState({ officelist: data });
    //            this.dataTable(data);
    //        });
    //    console.log("officelist1", this.state.officelist);

    //    //if (this.state.count > 0) {
    //    //    this.setState({ react: true });
    //    //}
    //    //else {

    //    //    this.setState({count:2})
    //    //}
    //};


    dataTable = (ParticipantList) => {
        console.log("ParticipantList", ParticipantList);
        this.setState({
            newdata: ParticipantList.map((prop, key) => {
                return {
                    id: key,
                    staffCode: prop.staffCode,
                    staffName: prop.staffName,
                    designation: prop.designation,
                    officeName: prop.officeName,
                    supervisorname: prop.supervisorname,
                    appointmentDate: new Date(prop.appointmentDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    action: <div>
                        <Tooltip title="View" placement="bottom" arrow>
                            <IconButton color="info" justIcon round simple className="view" onClick={(e) => this.handleView(prop.staffCode, e)} ><Visibility /></IconButton>
                        </Tooltip>
                    </div>,

                    //btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.retentionGroupId)} editModal={this.state.editModal}><Edit /></Button>
                    //    <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete(prop.retentionGroupId)} ><Delete /></Button>
                    //</div>
                };
            })
        });

    }

    handleView = (id) => {
        this.setState({ empcode: id });
        this.edittable();
    }



    handleClose = () => {
        this.setState({ open: false });

    };
    edittable = () => {
        document.getElementById("disp");
        this.setState({ open: true });
        let edit = this.state;
        edit.close = false;
        edit.editModal = true;
        edit.visibility = false;
        edit.open = true;
        edit.disabled = true;
        edit.disable = true;
        edit.close = false;
        edit.flagUpdate = true;

    }
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
                            { /*  <FilterNone /> */}

                            <Icon><img id="icon" src={searchproduct} /></Icon>

                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                            <small> People Search </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Employee Code"
                                name="EmpCode"
                                value={this.state.SearchPeople.EmpCode}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onFormSubmit()}>Search</Button>

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
                                    <People editModal={this.state.editModal} flagUpdate={this.state.flagUpdate} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} EmpCode={this.state.empcode} />
                                </div>
                            </div>








                        </Modal>

                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}
                    </CardBody>

                </Card>


                {this.state.showtable &&
                    <GridContainer xl={12}>
                        <GridItem lg={12}>



                            <ReactTable
                                data={this.state.newdata}
                                filterable
                                columns={[
                                    {
                                        Header: "Employee Code",
                                        accessor: "staffCode",
                                        Width: "20px"

                                    },
                                    {
                                        Header: "Name",
                                        accessor: "staffName",

                                    },
                                    {
                                        Header: "Designation",
                                        accessor: "designation",
                                        //Width: "10px"
                                    },
                                    {
                                        Header: "Branch",
                                        accessor: "officeName",
                                        //Width: "20px"
                                    },
                                    {
                                        Header: "Supervisor",
                                        accessor: "supervisorname",
                                        // Width: "20px"
                                    },
                                    {
                                        Header: "Appointment Date",
                                        accessor: "appointmentDate",
                                        // Width: "20px"
                                    },
                                    {
                                        Header: "Last Decision",
                                        accessor: "officeAddressLine1",
                                        // maxWidth: "20px"
                                    },
                                    {
                                        Header: "Decision Updated On",
                                        accessor: "officeAddressLine1",
                                        // maxWidth: "20px"
                                    },
                                    {
                                        Header: "Action",
                                        accessor: "action",
                                        // maxWidth: "20px"
                                    }

                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                showPaginationBottom
                                pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                className="-striped -highlight"
                            />


                        </GridItem>


                        <Paper className={classes.root} style={{ marginLeft: '75px', marginRight: '75px' }} >
                            {/*   <Table className={classes.table} style={{ borderRadius: '6px  ', width: '100%', margin: '0 auto' }} id="searchTable">
                                            <TableHead>
                                                <TableRow className="table-row" style={{ height: '20px' }}>
                                                    <CustomTableCell className="table-row">orgOffice ID</CustomTableCell>
                                                    <CustomTableCell className="table-row">OFFICE CODE </CustomTableCell>
                                                    <CustomTableCell className="table-row">OFFICEPHONENo</CustomTableCell>
                                                    <CustomTableCell className="table-row">OFFICE ID</CustomTableCell>
                                                    <CustomTableCell className="table-row">SPOC-NAME</CustomTableCell>
                                                    <CustomTableCell className="table-row">SPOC-EMAILID</CustomTableCell>
                                                    <CustomTableCell className="table-row">OFFICEADDRESS</CustomTableCell>
                                                    <CustomTableCell className="table-row">Select</CustomTableCell>




                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.officelist.map((item, index) =>
                                                    <TableRow className="table-row" key={index}>
                                                        <CustomTableCell className="table-row"><h6><b>{item.orgOfficeId}</b></h6></CustomTableCell>
                                                        <CustomTableCell className="table-row"><h6><b>{item.officeCode}</b></h6></CustomTableCell>
                                                        <CustomTableCell className="table-row"><h6><b>{item.officePhoneNo}</b></h6></CustomTableCell>
                                                        <CustomTableCell className="table-row"><h6><b>{item.tblOfficeSpocDetails[0].officeId}</b></h6></CustomTableCell>
                                                        <CustomTableCell className="table-row"><h6><b>{item.tblOfficeSpocDetails[0].spocname}</b></h6></CustomTableCell>
                                                        <CustomTableCell className="table-row"><h6><b>{item.tblOfficeSpocDetails[0].spocemailId}</b></h6></CustomTableCell>
                                                        <CustomTableCell className="table-row"><h6><b>{item.officeAddressLine1}</b></h6></CustomTableCell>
                                                        <CustomTableCell><h6><b> <input type="radio" name="product" onClick={this.editFunction.bind(this, index, item.orgOfficeId)} /></b></h6></CustomTableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table> */}

                        </Paper>

                        {/*    <GridItem xs={6} sm={6} md={3}>
                                        <CustomRadioButton labelText="radio" value={this.state.radioValue1} onChange={this.onChangeRadio} name="pks" />
                                        <div id="right" className={classes.btnSec}>

                                    <Button className={classes.rechargeBtn} style={{ borderRadius: '40px' }} color="warning" onClick={this.Viewopen} >
                                        VIEW
                                        </Button>


                                    <Button className={classes.rechargeBtn} style={{ borderRadius: '40px' }} color="warning" onClick={this.Editopen} >
                                        EDIT
                                        </Button>
                               </div>

                                        <CustomRadioButton labelText="radio" value={this.state.radioValue2} onChange={this.onChangeRadio} name="ska" />
                                </GridItem>*/}

                        {/*  <GridItem id="right" xs={12} sm={12} md={4}>
                            <Button color="warning" onClick={() => this.edittable()} id="round"  >VIEW</Button>



                        </GridItem>
                        */}



                    </GridContainer>

                }



            </div>
        );
    }
}

export default withStyles(styles)(SearchPeople);