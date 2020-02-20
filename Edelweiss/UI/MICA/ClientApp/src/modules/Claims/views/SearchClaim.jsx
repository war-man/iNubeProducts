import React from "react";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
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

import ReactTable from "react-table";

import ClaimIntimate from "./ClaimIntimate.jsx";
import ClaimConfig from 'modules/Claims/ClaimConfig.js'; 
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
class SearchClaim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            react: false,
            orgid: "",
            open: false,
            officeId: "",
            Claimlist: [],
            Claimsendlist: [],
            claimdata: "",
            showtable: false,
            data: [],
            radioValue1: false,
            radioValue2: false,
            disabled: false,
            ClaimDTO: {
                partnerId: "",
                productId: "",
                eventId: "",
                mobileNumber: "",
                email: "",
                claimNo:""
            }

        };
        this.dataTable = this.dataTable.bind(this);
    }

    SetValue = (type, event) => {
        //  event.preventDefault();
        console.log('teset ', event)
        let name = event.target.name;
        console.log('name= ' , name)
        let value = event.target.value;
        console.log('value= ' , value)
        let ClaimDTO = this.state.ClaimDTO;
        ClaimDTO[name] = value;
        console.log('claim= ', ClaimDTO.partnerId)
        this.setState({ ClaimDTO});
      
        console.log("partner id ", this.state.ClaimDTO);

    };
    editFunction(id, oid) {
        console.log("pid", oid);
        console.log("officelist data", this.state.Claimlist);
        var CArr = this.state.Claimlist;
        var ClaimArr = [];
        $.each(CArr, function (k, v) {
            if (v.claimId == oid) {
                ClaimArr.push(CArr[id]);
            }
        })
        console.log("ClaimArr", ClaimArr);
        this.setState({ Claimsendlist: ClaimArr });

        const Claimdata = ClaimArr[0].claimId;
       
        this.setState({ claimdata: Claimdata });
        console.log("Claimsendlist: ", this.state.Claimsendlist, this.state.claimdata);

    }
    onChangeRadio = () => {

        let radioValue1 = this.state.radioValue1;
        let radioValue2 = this.state.radioValue2;

    }

    tableshow = () => {
        let that=this;
        
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SeachClaims`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.ClaimDTO)
        }).then(function (response) {
            return response.json();
            }).then(function (data) {
                if (data.length > 0) {
                    console.log('Response data', data);
                    that.dataTable(data);
                    that.setState({ Claimlist: data });
                    that.setState({ showtable: true });
                }
        });
   
    };

       dataTable = (claimlist) => {
           console.log("officelist in react", claimlist);
        this.setState({
            data: claimlist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key+1,
                    claimId: prop.claimId,
                    createdBy: prop.createdBy,
                    claimNo: prop.fnol,
                    mobileNumber: prop.mobileNumber,
                   
                    createdDateTime: (prop.createdDateTime != null) ? new Date(prop.createdDateTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }) : null,
                    email: prop.email,
                 
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.claimId)} />


                
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
                            <small> Claim Details </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer lg={12}>

                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Partner ID"
                                name="partnerId"
                                value={this.state.ClaimDTO.partnerId}
                                onChange={(e) => this.SetValue("claim",e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Product ID"
                                name="productId"
                                value={this.state.ClaimDTO.productId}
                                onChange={(e) => this.SetValue("claim",e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                          
                            {/*    <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Policy No "
                                name="officeId"
                                value={this.state.OfficeDTO.}
                                onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem> */}
                    
                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Mobile Number"
                                name="mobileNumber"
                                value={this.state.ClaimDTO.mobileNumber}
                                onChange={(e) => this.SetValue("claim",e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Email ID"
                                name="email"
                                value={this.state.ClaimDTO.email}
                                    onChange={(e) => this.SetValue("office",e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Claim No"
                                name="claimNo"
                                value={this.state.ClaimDTO.claimNo}
                                onChange={(e) => this.SetValue("claim",e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                            {/*            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Customer ID"
                                    name="officeId"
                                    value={this.state.officeId}
                                    onChange={(e) => this.SetValue("office", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>*/}
                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Event ID"
                                name="eventId"
                                value={this.state.ClaimDTO.eventId}
                                onChange={(e) => this.SetValue("claim", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                            {/*           <GridItem xs={12} sm={12} md={4}> <CustomInput
                                        labelText="Event DateTime"
                                        name="officeId"
                                        value={this.state.officeId}
                                        onChange={(e) => this.SetValue("office", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                            */}
                       
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
                            <GridContainer lg={12} justify="center">
                                <GridItem xs={7} sm={3} md={3} lg={3}>
                                <Button color="warning" onClick={this.tableshow} id="claims" round>Search</Button>

                            </GridItem>
                            </GridContainer>


                            {this.state.showtable &&
                                <GridContainer>
                                    <GridItem xs={12}>
                                      

                                            <CardBody>
                                                <ReactTable
                                                    data={this.state.data}
                                                    filterable
                                                 columns={[
                                                    //{
                                                    //    Header: "",
                                                    //    accessor: "radio",
                                                    //    sortable: false,
                                                    //    filterable: false,
                                                    //    minWidth: 30,
                                                    //    resizable: false,
                                                    //},
                                                    {
                                                        Header: "S-NO",
                                                        accessor: "id",
                                                        headerClassName: 'react-table-center',
                                                        style: { textAlign: "center" },
                                                        // width: '50'
                                                        minWidth: 30,
                                                        resizable: false,

                                                    },
                                                        {
                                                            Header: "Claim Id",
                                                            accessor: "claimId",
                                                            headerClassName: 'react-table-center',
                                                        style: { textAlign: "center" },
                                                        // width: '50'
                                                        minWidth: 40,
                                                        resizable: false,

                                                        },
                                                    
                                                     //   {
                                                     //       Header: "CREATE BY",
                                                     //       accessor: "createdBy",
                                                     //       headerClassName: 'react-table-center',
                                                     //       style: { textAlign: "center" },
                                                     //       // width: '50'
                                                     //       minWidth: 40,
                                                     //       resizable: false,
                                                        
                                                     //},
                                                     {
                                                         Header: "Claim No",
                                                         accessor: "claimNo",
                                                         headerClassName: 'react-table-center',
                                                         style: { textAlign: "center" },
                                                         // width: '50'
                                                         minWidth: 40,
                                                         resizable: false,

                                                     },
                                                        {
                                                            Header: "Mobile No",
                                                            accessor: "mobileNumber",
                                                            headerClassName: 'react-table-center',
                                                            style: { textAlign: "right" },
                                                            // width: '50'
                                                            minWidth: 40,
                                                            resizable: false,
                                                        },
                                                        {
                                                            Header: " Create Date",
                                                            accessor: "createdDateTime",
                                                            headerClassName: 'react-table-center',
                                                            style: { textAlign: "center" },
                                                            // width: '50'
                                                            minWidth: 40,
                                                            resizable: false,
                                                        },
                                                       
                                                        {
                                                            Header: "Email Id",
                                                            accessor: "email",
                                                            headerClassName: 'react-table-center',
                                                            style: { textAlign: "center" },
                                                            // width: '50'
                                                            minWidth: 40,
                                                            resizable: false,
                                                        },
                                                        
                                                      
                                                    ]}
                                                    defaultPageSize={5}
                                                    showPaginationTop={false}
                                                    showPaginationBottom
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
                                </GridItem>

                                    <GridItem id="right" xs={12} sm={12} md={4}>
                                        <Button color="warning" onClick={this.Viewopen} id="round"  >VIEW</Button>
                                        <Button color="warning" onClick={this.Editopen} id="round" >EDIT</Button>


                                    </GridItem>
                                    */}



                                </GridContainer>

                            }

                        </GridContainer>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                            style={newStyle}
                        >





                            <ClaimIntimate claimdata={this.state.claimdata} />

                        </Modal>
                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}
                    </CardBody>
                </Card>

            </div>
        );
    }
}

export default withStyles(styles)(SearchClaim);