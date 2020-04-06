import React from "react";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProfileDet from "./_ProfileDet";
import Address from "./_Address.jsx"
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
import profileStyles from "./profileStyles.jsx";
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
import Profile from "./Office.jsx";
//import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactTable from 'components/MuiTable/MuiTable.jsx';


//import ReactTables from "./ReactTables.jsx"

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
class SearchOffice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
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

        };

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

    tableshow = () => {
        this.setState({ showtable: true });
        fetch(`https://inubeservicespartners.azurewebsites.net/api/Office/SearchOffice?OfficeCode=` + this.state.OfficeCode, {
            //  fetch(`https://localhost:44315/api/Office/SearchOffice?OfficeCode=` + this.state.OfficeCode,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("officelist", data);
                this.setState({ officelist: data });
                this.dataTable(data);
            });
        console.log("officelist", this.state.officelist);

        //if (this.state.count > 0) {
        //    this.setState({ react: true });
        //}
        //else {

        //    this.setState({count:2})
        //}
    };


    dataTable = (officelist) => {
        console.log("officelist in react", officelist);
        this.setState({
            data: officelist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key,
                    orgOfficeId: prop.orgOfficeId,
                    officeCode: prop.officeCode,
                    officePhoneNo: prop.officePhoneNo,
                    officeId: prop.tblOfficeSpocDetails[0].officeId,
                    spocname: prop.tblOfficeSpocDetails[0].spocname,
                    spocemailId: prop.tblOfficeSpocDetails[0].spocemailId,
                    officeAddressLine1: prop.officeAddressLine1,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.orgOfficeId)} />


                    //        checkrow: (<Checkbox
                    //           className={classes.positionAbsolute}
                    //            tabIndex={-1}

                    //            onClick={() => this.handleToggle(key, prop)}
                    //            onChange={() => this.deleterow(key)}
                    //            checkedIcon={<Check className={classes.checkedIcon}/>}
                    //            icon={<Check className={classes.uncheckedIcon}  />}
                    //           classes={{
                    //                checked: classes.checked,
                    //               root: classes.checkRoot
                    //            }}
                    //        />),

                    //        id: key,

                    //        name: prop[0],
                    //         stagedata: prop[1],
                    //        stagedetails:prop[2],


                    //        actions: (
                    //            // we've added some custom button actions
                    //            <div className="actions-right">
                    //                {/* use this button to add a like kind of action */}


                    //                {/* use this button to add a edit kind of action */}

                    //                {/* use this button to remove the data row */}
                    //                <Button
                    //                    justIcon
                    //                    round
                    //                    simple
                    //                    onClick={() => {
                    //                        var data = this.state.data;
                    //                        data.find((o, i) => {
                    //                            if (o.id === key) {
                    //                                // here you should add some custom code so you can delete the data
                    //                                // from this component and from your server as well
                    //                                data.splice(i, 1);
                    //                                return true;
                    //                            }
                    //                            return false;
                    //                        });
                    //                        this.setState({ data: data });
                    //                    }}
                    //                    color="danger"
                    //                    className="remove"
                    //                >

                    //                    <Close />
                    //                </Button>{" "}


                    //            </div>


                    //        )
                };

            })
        });





    }
    handleClose = () => {
        this.setState({ open: false });

    };
    Editopen = () => {
        this.setState({ open: true });
        console.log("officesendlist: ", this.state.officesendlist);
        this.setState({ disabled: false });
    }
    Viewopen = () => {
        console.log("componentData");
        this.setState({ open: true });
        console.log("officesendlist: ", this.state.officesendlist);
        this.setState({ disabled: true });
        this.setState({ officesendlist: this.state.newofficesendlist });
        console.log("new oficce", this.state.newofficesendlist);
        console.log("after edit officesendlist", this.state.officesendlist);
    }
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
                            <small> Office Details </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Office Code"
                                name="OfficeCode"
                                value={this.state.OfficeCode}
                                onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            {/*   <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Organization Catagory"
                                name="officeId"
                                value={this.state.officeId}
                                onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Org Type"
                                name="officeId"
                                value={this.state.officeId}
                                onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Org Name"
                                name="officeId"
                                value={this.state.officeId}
                                onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Office Name"
                                name="officeId"
                                value={this.state.officeId}
                                onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Office Code"
                                name="officeId"
                                value={this.state.officeId}
                                onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            /> 
                            </GridItem>*/}
                            <GridItem xs={12} sm={12} md={4}>
                                <Button color="warning" onClick={this.tableshow} style={{ 'top': '14px' }} round>Search</Button>

                            </GridItem>


                            {this.state.showtable &&
                                <GridContainer>
                                    <GridItem xs={12}>


                                        <CardBody>
                                            <ReactTable
                                                data={this.state.data}
                                                filterable
                                                columns={[
                                                    {
                                                        Header: "Org-Office Id",
                                                        accessor: "orgOfficeId",
                                                        Width: "20px"

                                                    },
                                                    {
                                                        Header: "Office Code",
                                                        accessor: "officeCode",

                                                    },
                                                    {
                                                        Header: "Office Phone No",
                                                        accessor: "officePhoneNo",
                                                        //Width: "10px"
                                                    },
                                                    {
                                                        Header: "Office Id",
                                                        accessor: "officeId",
                                                        //Width: "20px"
                                                    },
                                                    {
                                                        Header: "Spoc-Name",
                                                        accessor: "spocname",
                                                        // Width: "20px"
                                                    },
                                                    {
                                                        Header: "Spoc-EmailId",
                                                        accessor: "spocemailId",
                                                        // Width: "20px"
                                                    },
                                                    {
                                                        Header: "Office Address",
                                                        accessor: "officeAddressLine1",
                                                        // maxWidth: "20px"
                                                    },
                                                    {
                                                        Header: "",
                                                        accessor: "radio",
                                                        sortable: false,
                                                        filterable: false
                                                    },
                                                ]}
                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                                showPaginationBottom
                                                pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                                showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                                className="-striped -highlight"
                                            />
                                        </CardBody>

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

                                    <GridItem id="right" xs={12} sm={12} md={4}>
                                        <Button color="warning" onClick={this.Viewopen} id="round"  >VIEW</Button>
                                        <Button color="warning" onClick={this.Editopen} id="round" >EDIT</Button>


                                    </GridItem>




                                </GridContainer>

                            }

                        </GridContainer>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                            style={newStyle}>





                            <Profile offdata={this.state.offdata} officesendlist={this.state.officesendlist} disabled={this.state.disabled} />



                        </Modal>
                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}
                    </CardBody>
                </Card>

            </div>
        );
    }
}

export default withStyles(styles)(SearchOffice);