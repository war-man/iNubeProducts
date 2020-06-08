import Icon from "@material-ui/core/Icon";
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import FilterNone from "@material-ui/icons/FilterNone";
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import profileStyles from "assets/jss/material-dashboard-pro-react/views/profileStyles.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import React from "react";
import { Redirect } from 'react-router-dom';
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import swal from 'sweetalert';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Animated } from "react-animated-css";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Modal from '@material-ui/core/Modal';
import HierarchyConfig from "modules/Hierarchy/HierarchyConfig.js";
import MovementDetails from "modules/Hierarchy/views/MovementDetails.jsx";
//import Data from "./Data.json";

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

const paddingCard =
{
    padding: "10px",
};

class InboxClaimProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: false,
            nodata: false,
            loader: true,
            showtable: false,
            data: [],
            Claimlist: [],
            officelist: [],
            MovementDTO: this.props.MovementDTO,
            result: [],
            orgEmpId: "",
            movementId: "",
            Claimsendlist: [],
            showtable: false,
            open: false,
            DecDTO: {
                Decision: "",
                Remarks: "",
            },
            masterList: [],
            personalDet: [],
            tabledata: [],
            branchList: [],
            designationList: [],
            empData: [],
            decisionDTO:
            {
                "movementTypeId": "",
                "orgEmpId": "",
                "movementStatusId": "",
                "recommendedByid": "",
                "currentPositionId": "",
                "newPositionId": "",
                "newBranchId": "",
                "reason": "",
                "avoMovementDetails": []
            },
            redirect: false,
            MovementDetails: [
                {
                    "movementFormId": "",
                    "movementSubFormId": "",
                    "movingId": "",
                    "movedTo": "",
                    "status": ""
                }
            ],
            movArray: [],
            retainFlag: false,
            reporteeFlag: false,
            reporteeList: [],
            reporteetabledata: [],
            movementdetailsarray: [],
            MovementDetails: [
                {
                    "movementFormId": "",
                    "movementSubFormId": "",
                    "movingId": "",
                    "movedTo": "",
                    "status": ""
                }
            ],
            movement: {
                "movementFormId": "",
                "movementSubFormId": "",
                "movingId": "",
                "movedTo": "",
                "status": ""
            },
            disabled: true,
            response: false,
            salesFlag: false,
            quoteFlag: false,
            OrgEmpId: "",
            StaffCode: "",
            OrgId: "",
            PosId: "",
            salesList: [],
            Reporteearray: [],
            prospectarray: [],
            quotationarray: [],
            proposalarray: [],
            policyarray: [],
            salestabledata: [],
            quotationTbldata: [],
            proposalTbldata: [],
            policyTbldata: [],

        };
    }

    componentDidMount() {
        debugger
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetMasterDataAsync?sMasterlist=OrgCategory`, {
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
        this.tableshow();
    }

    supervisorData = () => {
        //Reportee Grid
        if (this.state.movementId != undefined && this.state.MovementDTO.movementStatusId != undefined) {
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetNewSupervisorByMovementId?OrgEmpId=` + this.state.orgEmpId + `&MovementId=` + this.state.movementId + `&MovementStatusId=` + this.state.MovementDTO.movementStatusId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ Reporteearray: data });
                    console.log("Reportee data: ", data, this.state.Reporteearray);
                });
        }
    }

    salesMovedToData = () => {
        debugger
        let that = this;
        //Reportee Grid
        if (this.state.movementId != undefined && this.state.MovementDTO.movementStatusId != undefined) {
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetNewSupervisorByMovementId?OrgEmpId=` + this.state.orgEmpId + `&MovementId=` + this.state.movementId + `&MovementStatusId=` + this.state.MovementDTO.movementStatusId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                   
                    let prospecttemp = data.filter(s => s.movementSubFormId == 37);
                    let quotationtemp = data.filter(s => s.movementSubFormId == 38);
                    let  proposaltemp = data.filter(s => s.movementSubFormId == 39);
                    let  policytemp = data.filter(s => s.movementSubFormId == 40);
                    that.setState({ policyarray: policytemp, prospectarray: prospecttemp, quotationarray: quotationtemp, proposalarray: proposaltemp });
                 

                    console.log("prospect data: ", data, that.state.prospectarray);
                });
        }
    }

    tableshow = () => {
        console.log("grid check", this.state.MovementDTO);
        let that = this;
        that.setState({ loader: false });
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/SearchEmployeeDetailsByMovStatus`, {

            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.MovementDTO)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response data', data);
                that.setState({ showtable: false, loader: false });
                if (data.length > 0) {
                    that.dataTable(data);
                    that.setState({ email: data[0].insuredEmail });
                } else {
                    setTimeout(
                        function () {
                            that.setState({ loader: true, showtable: false, nodata: true });
                        }.bind(this), 2000
                    );
                }
                console.log("grid data", this.state.MovementDTO, this.state.data);
                //that.setState({ email: data[0].insuredEmail });
                that.setState({ Claimlist: data });
                that.setState({ officelist: data });
            });
    };

    //grid view
    dataTable = (officelist) => {
        console.log("officelist in react", officelist);
        this.setState({ loader: true, showtable: true });
        this.setState({
            data: officelist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key + 1,
                    EmployeeCode: prop.staffCode,
                    EmployeeName: prop.staffName,
                    CurrentDesignation: prop.position,
                    NewBranch: prop.branchName,
                    Parent:prop.parent,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.orgEmpId, prop.movementId)} />
                };

            })
        });
    }

    editFunction(id, cId, mId) {
        this.state.orgEmpId = cId;
        this.state.movementId = mId;
        console.log("Off", this.state.officelist);
        debugger
        var orgArr = this.state.Claimlist;
        var contArr = [];
        $.each(orgArr, function (k, v) {
            if (v.orgEmpId == cId) {
                contArr.push(orgArr[id]);
            }
        })
        console.log("ContArr", contArr);

        this.setState({ personalDet: contArr[0] });

        this.peopleInfo(contArr[0].orgEmpId);
        this.branchDD(contArr[0].positionId);
        this.designationDD(contArr[0].organizationId);
        this.reporteeFun(contArr[0].orgEmpId);
        //  this.reporteeFun();
        this.supervisorData();

        this.state.OrgId = contArr[0].organizationId;
        this.state.PosId = contArr[0].positionId;
        this.state.OrgEmpId = contArr[0].orgEmpId;
        this.state.StaffCode = contArr[0].staffCode;

       
    };

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.DecDTO;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });
    };


    onInputQueryChange = (type, event) => {
        const fields = this.state.DecDTO;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    };

    UpdateStatus = () => {
        debugger
        var data = {
            //  'orgEmpId': this.state.orgEmpId,
            'movementStatusId': this.state.DecDTO.Decision,
            'remarks': this.state.DecDTO.Remarks,
            'movementId': this.state.movementId,
        };
        this.setState({ response: true });

        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/UpdateEmployeePosition`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                this.setState({ response: false });
                if (data.status == 200) {
                    swal({

                        text: "Status Modified!",
                        icon: "success"
                    });
                    this.setState({ redirect: true });

                } else if (data.status == 8) {
                    swal({
                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                } else if (data.status == 4) {
                    swal({
                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                }

                console.log("Search history data:", data);

            });
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }

    movementDetails = () => {
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetMovementDetails?MovementId=` + this.state.movementId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ movArray: data });
                console.log("MovementDetailsRecomm", this.state.movArray);
                /// this.reporteeData(data);
            });
    }

    //Movement Details
    peopleInfo = (Empid) => {
        debugger

        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetEmployeeDetailsById?empid=` + Empid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {

                this.setState({ empData: data });
                this.state.empData.dateOfJoining = new Date(this.state.empData.dateOfJoining).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                this.state.empData.dob = new Date(this.state.empData.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                console.log("empData", this.state.empData);
                console.log("empadd", this.state.empData.avoOrgEmpAddress[0]);
            });
    }


    branchDD = (id) => {
        debugger
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetNewBranchDropdown?posid=` + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {

                this.setState({ branchList: data });

            });
    }

    designationDD = (id) => {
        debugger
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetDesignation?orgid=` + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {

                this.setState({ designationList: data });
                console.log("designation:", this.state.designationList);
            });
    }

    SetDecision = (type, event) => {
        debugger
        let decisionDTO = this.state.decisionDTO;
        let name = event.target.name;
        let value = event.target.value;
        decisionDTO[name] = value;
        this.setState({ decisionDTO })
    }

    //Reportee function

    retainFun = () => {
        this.setState({ retainFlag: false });
        this.state.reporteeFlag = false;
    };

    distributeFun = () => {
        this.setState({ retainFlag: true });
        this.state.reporteeFlag = true;
    };

    //sales
    salesretainFun = () => {
        this.setState({ salesFlag: false });

        this.state.quoteFlag = false;
    };
    salesdistributeFun = () => {
        this.setState({ salesFlag: true });
        this.state.quoteFlag = true;
    };

    Editopen = () => {
        this.setState({ open: true, showtable: false });
    }

    //Reportee Movement
    reporteeFun = (id) => {

        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetReporteeGrid?Empcode=` + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {

                this.setState({ reporteeList: data });

                this.listrep();

                console.log("reportee:", data);
                this.reporteeData();
                this.salestransforFun(this.state.StaffCode);
                this.salesMovedToData();
                this.Editopen();
            });

    }
    reporteeData = () => {
        console.log("reportylist:", this.state.reporteeList);
        debugger
        this.setState({
            reporteetabledata: this.state.reporteeList.reporteedata.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    ReporteeName: prop.staffName,
                    NewSupervisor: <Dropdown
                        //labelText="New SuperVisor"
                        disabled={true}
                        value={this.state.Reporteearray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        name='movedTo'
                        onChange={(e) => this.SetSupervisor("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                };
            })
        });
    }
    SetSupervisor = (type, event, i) => {
        debugger
        let Reporteearray = this.state.Reporteearray;
        let name = event.target.name;
        let value = event.target.value;

        Reporteearray[i][name] = value;

        this.setState({ Reporteearray });
        this.setState({});
        this.reporteeData();
    }
    listrep = () => {

        for (let i = 0; i < this.state.reporteeList.reporteedata.length; i++) {
            this.state.movement.movementFormId = 1009;
            this.state.movement.movementSubFormId = "";
            this.state.movement.movingId = this.state.reporteeList.reporteedata[i].orgEmpId;
            this.state.movement.movedTo = "";
            this.state.movement.status = "";
            let object = Object.assign({}, this.state.movement);
            this.state.Reporteearray.push(object);
        }
        console.log("array: ", this.state.Reporteearray);
        console.log("movementdetails:", this.state.MovementDetails);
    }

   

    //Sales transfer
    salestransforFun = (id) => {
        debugger
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/ViewDetailsByEmpCode?empcode=` + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {

                this.setState({ salesList: data });

                this.listprospect();
                this.listquotation();
                this.listproposal();
                this.listpolicy();

                console.log("sales:", data);
                if (this.state.salesList.prospect != []) {

                    this.prospectData();
                }
                if (this.state.salesList.quotationDtos[0] != null) {
                    this.quotationData();
                }
                if (this.state.salesList.proposalDtos != []) {
                    this.proposalData();
                }
                if (this.state.salesList.policyDtos != []) {
                    this.policyData();
                }
                this.Editopen();
            });

    }
    listprospect = () => {
        debugger
        for (let i = 0; i < this.state.salesList.prospect.length; i++) {
            this.state.movement.movementFormId = 1010;
            this.state.movement.movementSubFormId = 37;
            this.state.movement.movingId = this.state.salesList.prospect[i].contactID;
            //this.state.movement.movingId = "";
            this.state.movement.movedTo = "";
            this.state.movement.status = "";
            let object = Object.assign({}, this.state.movement);
            this.state.prospectarray.push(object);
        }

        console.log("array prop: ", this.state.prospectarray);
        console.log("movementdetails prop:", this.state.MovementDetails);
    }
    prospectData = () => {
        var mas = this.state.reporteeList.masterData;
        console.log("saleslist prop:", this.state.salesList.prospect.length, mas);


        debugger
        this.setState({
            salestabledata: this.state.salesList.prospect.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    ProspectName: prop.firstName,
                    ContactNumber: prop.mobileNo,
                    MoveTo: <Dropdown
                        //labelText="New SuperVisor"
                        value={this.state.prospectarray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        disabled={true}
                        name='movedTo'
                        onChange={(e) => this.Setprospect("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,

                };
            })
        });
    }

    Setprospect = (type, event, i) => {
        debugger
        let prospectarray = this.state.prospectarray;
        let name = event.target.name;
        let value = event.target.value;

        prospectarray[i][name] = value;

        this.setState({ prospectarray });
        this.setState({});
        this.prospectData();
    }

    listquotation = () => {

        for (let i = 0; i < this.state.salesList.quotationDtos.length; i++) {

            this.state.movement.movementFormId = 1010;
            this.state.movement.movementSubFormId = 38;
            this.state.movement.movingId = this.state.salesList.quotationDtos[i].quotationId;
            this.state.movement.movedTo = "";
            this.state.movement.status = "";
            let object = Object.assign({}, this.state.movement);
            this.state.quotationarray.push(object);
        }
        console.log("array: ", this.state.quotationarray);
        console.log("movementdetails:", this.state.MovementDetails);
    }
    quotationData = () => {

        console.log("saleslist:", this.state.salesList);
        debugger
        this.setState({
            quotationTbldata: this.state.salesList.quotationDtos.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    QuotationNo: prop.quotNumber,
                    Name: prop.name,
                    ContactNumber: prop.contactNumner,
                    City: prop.cityName,
                    NewSupervisor: <Dropdown
                        //labelText="New SuperVisor"
                        value={this.state.quotationarray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        disabled={true}
                        name='movedTo'
                        onChange={(e) => this.Setquotation("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                };
            })
        });
    }
    Setquotation = (type, event, i) => {
        debugger
        let quotationarray = this.state.quotationarray;
        let name = event.target.name;
        let value = event.target.value;

        quotationarray[i][name] = value;

        this.setState({ quotationarray });
        this.setState({});
        this.quotationData();
    }

    listproposal = () => {

        for (let i = 0; i < this.state.salesList.proposalDtos.length; i++) {

            this.state.movement.movementFormId = 1010;
            this.state.movement.movementSubFormId = 39;
            this.state.movement.movingId = this.state.salesList.proposalDtos[i].proposalId;
            this.state.movement.movedTo = "";
            this.state.movement.status = "";
            let object = Object.assign({}, this.state.movement);
            this.state.proposalarray.push(object);
        }
        console.log("array: ", this.state.proposalarray);
        console.log("movementdetails:", this.state.MovementDetails);
    }
    proposalData = () => {
        console.log("saleslist:", this.state.salesList);
        debugger
        this.setState({
            proposalTbldata: this.state.salesList.proposalDtos.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    ProposalNo: prop.proposalNumber,
                    Name: prop.name,
                    ContactNumber: prop.contactNumner,
                    City: prop.cityName,
                    NewSupervisor: <Dropdown
                      //  labelText="New SuperVisor"
                        value={this.state.proposalarray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        disabled={true}
                        name='movedTo'
                        onChange={(e) => this.Setproposal("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                };
            })
        });
    }
    Setproposal = (type, event, i) => {
        debugger
        let proposalarray = this.state.proposalarray;
        let name = event.target.name;
        let value = event.target.value;

        proposalarray[i][name] = value;

        this.setState({ proposalarray });
        this.setState({});
        this.proposalData();
    }

    listpolicy = () => {

        for (let i = 0; i < this.state.salesList.policyDtos.length; i++) {

            this.state.movement.movementFormId = 1010;
            this.state.movement.movementSubFormId = 40;
            this.state.movement.movingId = this.state.salesList.policyDtos[i].policyId;
            this.state.movement.movedTo = "";
            this.state.movement.status = "";
            let object = Object.assign({}, this.state.movement);
            this.state.policyarray.push(object);
        }
        console.log("array: ", this.state.proposalarray);
        console.log("movementdetails:", this.state.MovementDetails);
    }
    policyData = () => {
        console.log("saleslist:", this.state.salesList);
        debugger
        this.setState({
            policyTbldata: this.state.salesList.policyDtos.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    PolicyNumber: prop.policyNumber,
                    PolicyStatus: prop.policyStatus,
                    CityName: prop.cityName,
                    ContactNumber: prop.contactNumner,
                    PremiumAmount: prop.premiumAmount,
                    Mode: prop.mode,
                    NewSupervisor: <Dropdown
                      //  labelText="New SuperVisor"
                        value={this.state.policyarray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        name='movedTo'
                        disabled={true}
                        onChange={(e) => this.Setpolicy("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                };
            })
        });
    }
    Setpolicy = (type, event, i) => {
        debugger
        let policyarray = this.state.policyarray;
        let name = event.target.name;
        let value = event.target.value;

        policyarray[i][name] = value;

        this.setState({ policyarray });
        this.setState({});
        this.policyData();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.showtable ?
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={<h5> Cases </h5>}
                                        data={this.state.data}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Select",
                                                accessor: "radio",
                                                sortable: false,
                                                filterable: false,
                                                minWidth: 30,
                                                resizable: false,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            },
                                            {
                                                Header: "Employee Code",
                                                accessor: "EmployeeCode",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Name",
                                                accessor: "EmployeeName",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,

                                            },

                                            {
                                                Header: "Current Designation",
                                                accessor: "CurrentDesignation",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Current Branch",
                                                accessor: "NewBranch",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "right" },
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,
                                            },
                                            {
                                                Header: " Current Supervisor",
                                                accessor: "Parent",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 40,
                                                resizable: false,
                                            },

                                        ]}
                                        defaultPageSize={4}
                                        showPaginationTop={false}
                                        pageSize={([this.state.data.length + 1] < 4) ? [this.state.data.length + 1] : 4}
                                        //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                        showPaginationBottom={true}
                                        className="-striped -highlight"
                                    />

                                    {/*   <ReactTable
                                            data={this.state.result}
                                            filterable
                                            columns={this.state.data}
                                            defaultPageSize={5}
                                            showPaginationTop={false}
                                            showPaginationBottom
                                            className="-striped -highlight discription-tab"
                                        />*/}
                                </Animated>
                            </GridItem>
                            : <GridItem lg={12}>{
                                this.state.nodata ?
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
                            </GridItem>
                        }

                    </GridContainer>
                    : <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>
                }

                {this.state.open &&
                    <GridContainer>
                    <MovementDetails decisionDTO={this.state.decisionDTO} SetDecision={this.SetDecision} personalDet={this.state.personalDet} masterList={this.state.masterList} branchList={this.state.branchList} designationList={this.state.designationList} empData={this.state.empData} salestabledata={this.state.salestabledata} quotationTbldata={this.state.quotationTbldata} proposalTbldata={this.state.proposalTbldata} reporteetabledata={this.state.reporteetabledata} policyTbldata={this.state.policyTbldata} avoOrgEmpAddress={this.state.avoOrgEmpAddress}
                        movementId={this.state.movementId} disabled={this.state.disabled} retainFun={this.retainFun} retainFlag={this.state.retainFlag} salesFlag={this.state.salesFlag} salesretainFun={this.salesretainFun} salesdistributeFun={this.salesdistributeFun} distributeFun={this.distributeFun}/>

                    </GridContainer>}

                {/*{this.state.open &&
                    <GridContainer justify="center">
                        {this.renderRedirect()}
                            <Button color="warning" onClick={this.AddPosition} round> Add New Position </Button>
                    </GridContainer>}*/}

                {this.state.open &&
                    <Card>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={3} md={3}>
                                    <MasterDropdown
                                        labelText="Decision"
                                        id="DecDTO.Decision"
                                        value={this.state.DecDTO.Decision}
                                        lstObject={this.state.masterList}
                                        required={true}
                                        filterName='MovementStatus'
                                        name='Decision'
                                        onChange={this.onInputParamChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={8} md={8}>
                                    <CustomInput
                                        labelText="Remarks"
                                        required={true}
                                        //disabled="true"
                                        value={this.state.DecDTO.Remarks}
                                        name='Remarks'
                                        onChange={(e) => this.onInputQueryChange("string", e)}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>}

                {this.state.open &&
                    <GridContainer justify="center">
                        {this.renderRedirect()}
                        <Button color="warning" disabled={this.state.response} onClick={this.UpdateStatus} round> Submit </Button>
                    </GridContainer>}

            </div>
        );
    }
}

export default withStyles(styles)(InboxClaimProcess);
