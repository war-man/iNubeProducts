import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';

import ReactTable from "components/MuiTable/MuiTable.jsx";
import MovementDetails from './MovementDetails.jsx';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import Edit from "@material-ui/icons/Edit";

import HierarchyConfig from "modules/Hierarchy/HierarchyConfig.js";
import swal from 'sweetalert';
import Dropdown from "components/Dropdown/Dropdown.jsx";









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
const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}

class Promotion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtable: false,
            showDetails: false,
            gridData: [],
            personalDet: [],
            tabledata: [],
            branchList: [],
            designationList: [],
            reporteeList: [],
            salesList: [],
            reporteetabledata: [],
            empData: [],
            reporteeFlag: false,
            quoteFlag: false,
            salesFlag: false,
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
            movementdetailsarray: [],
            Reporteearray: [],
            prospectarray: [],
            quotationarray: [],
            proposalarray: [],
            policyarray: [],
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
            retainFlag: false,
            //avoOrgEmpAddress: [{
            //    perm: {}
            //}],
            empSearchDto: {
                // "orgEmpId": 0,
                "staffCode": "",
                //"staffName": "",
                //"positionId": "",
                //"position": "",
                //"email": "",
                //"phoneNumber": "",
                //"staffTypeId": "",
                //"function": "",
                //"appointmentDate": "",
                //"smcode": "",
                //"imdcode": "",
                //"staffStatus": "",
                //"createdBy": "",
                //"createdDate": "",
                //"modifiedBy": "",
                //"modifiedDate": "",
                //"organizationId": "",
                //"movementId": "",
                //"movementStatusId": ""
            },
            saveDisable: false,
            OrgEmpId: "",
            StaffCode: "",
            OrgId: "",
            PosId: "",
            decflag: false,
        }
    };

    Editopen = () => {
        this.setState({ showDetails: true, showtable: false });

    }

    tableshow = () => {
        // this.setState({ showtable: true });
        debugger
        this.setState({ showtable: true });
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetEmployeeDetails`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.empSearchDto)
        }).then(response => response.json())
            .then(data => {

                this.setState({ gridData: data });

                // document.getElementById('searchContractTable').style.display = 'block';

                this.tableData(data);
                console.log("tabledata:", this.state.tabledata);

                console.log("griddata:", data);

            });
    };

    tableData = (rows) => {
        debugger
        this.setState({
            tabledata: rows.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    EmployeeCode: prop.staffCode,
                    EmployeeName: prop.staffName,
                    CurrentDesignation: prop.position,
                    NewBranch: prop.branchName,
                    // radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.orgEmpId)} />,
                    btn: <div>
                        <Tooltip title={< TranslationContainer translationKey="Edit" />} placement="bottom" arrow>
                            <IconButton color="info" justIcon round simple className="edit" onClick={this.editFunction.bind(this, key, prop.orgEmpId)}><Edit /></IconButton>
                        </Tooltip >
                    </div>,
                };
            })
        });


    }

    editFunction(id, cId) {

        var orgArr = this.state.gridData;
        var contArr = [];
        $.each(orgArr, function (k, v) {
            if (v.orgEmpId == cId) {
                contArr.push(orgArr[id]);
            }
        })

        //this.setState({ personalDet: contArr[0] });
        this.state.personalDet = contArr[0];
        this.setState({});
        console.log("personalDet", this.state.personalDet);
        console.log("ContArr", contArr);
        this.peopleInfo(contArr[0].orgEmpId);
        this.branchDD(contArr[0].positionId);
        

        this.state.OrgId = contArr[0].organizationId;
        this.state.PosId = contArr[0].positionId;
        this.state.OrgEmpId = contArr[0].orgEmpId;
        this.state.StaffCode = contArr[0].staffCode
        this.reporteeFun(contArr[0].orgEmpId);
        //this.salestransforFun(contArr[0].staffCode);
       
        //this.Editopen();

    };
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
                //this.state.avoOrgEmpAddress.perm = this.state.empData.avoOrgEmpAddress[0];
            });
    }


    branchDD = (id) => {

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

        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetDesignationMovement?orgid=` + this.state.OrgId + `&pos=` + this.state.PosId +`&movementType=` + id, {
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
                this.Editopen();
            });

    }
    reporteeData = () => {
        console.log("reportylist:", this.state.reporteeList );
        debugger
        this.setState({
            reporteetabledata: this.state.reporteeList.reporteedata.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    ReporteeName: prop.staffName,
                    NewSupervisor: <Dropdown
                       // labelText="New SuperVisor"
                        value={this.state.Reporteearray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        name='movedTo'
                        onChange={(e) => this.SetSupervisor("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                    //CurrentDesignation: prop.position,
                    //radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.orgEmpId)} />
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
            //this.state.MovementDetails = this.state.MovementDetails.concat({
            //    "movementFormId": 1009,
            //    "movementSubFormId": "",
            //    "movingId": data.reporteedata[i].staffCode,
            //    "movedTo": "",
            //    "status": ""
            //});
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

        console.log("array: ", this.state.prospectarray);
        console.log("movementdetails:", this.state.MovementDetails);
    }
    prospectData = () => {
        var mas = this.state.reporteeList.masterData;
        console.log("saleslist:", this.state.salesList.prospect.length, mas);
       

        debugger
        this.setState({
            salestabledata: this.state.salesList.prospect.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    ProspectName: prop.firstName,
                    ContactNumber: prop.mobileNo,
                    MoveTo: <Dropdown
                       // labelText="New SuperVisor"
                        value={this.state.prospectarray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
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
                      //  labelText="New SuperVisor"
                        value={this.state.quotationarray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        name='movedTo'
                        onChange={(e) => this.Setquotation("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                    //CurrentDesignation: prop.position,
                    //radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.orgEmpId)} />
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
                       // labelText="New SuperVisor"
                        value={this.state.proposalarray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        name='movedTo'
                        onChange={(e) => this.Setproposal("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                    //CurrentDesignation: prop.position,
                    //radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.orgEmpId)} />
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
                       // labelText="New SuperVisor"
                        value={this.state.policyarray[key].movedTo}
                        lstObject={this.state.reporteeList.masterData}
                        name='movedTo'
                        onChange={(e) => this.Setpolicy("string", e, key)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                    //CurrentDesignation: prop.position,
                    //radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.orgEmpId)} />
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
   
    
    SaveData = () => {
        this.state.decisionDTO.orgEmpId = this.state.empData.orgEmpId;
        console.log("decisionDto:", this.state.decisionDTO);

        if (this.state.reporteeFlag == true) {
            for (var i = 0; i < this.state.Reporteearray.length; i++) {
                this.state.movementdetailsarray.push(this.state.Reporteearray[i]);
            }

        }
        if (this.state.quoteFlag == true) {
            let aaaa=[];
            if (this.state.prospectarray != []) {
                for (var i = 0; i < this.state.prospectarray.length; i++) {
                    this.state.movementdetailsarray.push(this.state.prospectarray[i]);
                }
            }
            if (this.state.quotationarray != []) {
                for (var i = 0; i < this.state.quotationarray.length; i++) {
                    this.state.movementdetailsarray.push(this.state.quotationarray[i]);
                }
            }
            if (this.state.proposalarray != []) {
                for (var i = 0; i < this.state.proposalarray.length; i++) {
                    this.state.movementdetailsarray.push(this.state.proposalarray[i]);
                }
            }
            if (this.state.policyarray != []) {
                for (var i = 0; i < this.state.policyarray.length; i++) {
                    this.state.movementdetailsarray.push(this.state.policyarray[i]);
                }
            }
        }
        console.log("movements", this.state.movementdetailsarray);
        
        let decisionDto = this.state.decisionDTO;

        decisionDto['avoMovementDetails'] = this.state.movementdetailsarray;

        this.setState({ decisionDTO: decisionDto });
        


        console.log("decisionDTO", this.state.decisionDTO);

        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/SaveDecision`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.decisionDTO)
        }).then(response => response.json())
            .then((data) => {

                if (data != null) {
                    swal({

                        text: "Data Saved Successfully",
                        icon: "success"
                    });
                    this.setState({ saveDisable: true });
                    console.log("data save result:", data);
                }
                else {
                    swal({

                        text: "Failed To Save",
                        icon: "failed"
                    });
                }
            });
    }
    SetDecision = (type, event) => {
        debugger
        let decisionDTO = this.state.decisionDTO;
        let name = event.target.name;
        let value = event.target.value;

        decisionDTO[name] = value;

        this.setState({ decisionDTO })
        if (value == 31) {
            this.setState({ decflag: true });
        }
        else {
            this.setState({ decflag: false });
        }
        

    }
    Setdecisiondd = (type, event) => {
        debugger
        let decisionDTO = this.state.decisionDTO;
        let name = event.target.name;
        let value = event.target.value;

        decisionDTO[name] = value;

        this.setState({ decisionDTO })
        if (value == 31) {
            this.setState({ decflag: true });
        }
        else {
            this.setState({ decflag: false });
        }
        this.designationDD(value);

    }
    SetEmpId = (type, event) => {
        debugger
        let empSearchDto = this.state.empSearchDto;
        let name = event.target.name;
        let value = event.target.value;

        empSearchDto[name] = value;

        this.setState({ empSearchDto })

    }

    retainFun = () => {
        this.setState({ retainFlag: false });

        this.state.reporteeFlag = false;
    };
    distributeFun = () => {
        this.setState({ retainFlag: true });
        this.state.reporteeFlag = true;
        //this.reporteeFun(this.state.OrgEmpId);
        

    };
    salesretainFun = () => {
        this.setState({ salesFlag: false });

        this.state.quoteFlag = false;
    };
    salesdistributeFun = () => {
        this.setState({ salesFlag: true });
        this.state.quoteFlag = true;
      //  this.salestransforFun(this.state.StaffCode);
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
                            {/*     {this.props.promotionicon ? <Icon><img id="icon" src={PromotionIcon} /></Icon> : null}
                            {this.props.demotionicon ? <Icon><img id="icon" src={DemotionIcon} /></Icon> : null}
                            {this.props.terminationicon ? <Icon><img id="icon" src={TerminationIcon} /></Icon> : null}
                            {this.props.transforicon ? <Icon><img id="icon" src={TransferIcon} /></Icon> : null}
*/}
                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                            {/* <small> {this.props.DetailHeading} </small> */}
                            <small> Movements </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Employee Code"
                                    name="staffCode"
                                    value={this.state.empSearchDto.staffCode}
                                    onChange={(e) => this.SetEmpId("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                <Button color="warning" onClick={this.tableshow} round>Search</Button>
                            </GridItem>
                        </GridContainer>

                    </CardBody>
                </Card>

                {this.state.showtable &&
                    <GridContainer xl={12}>
                        <GridItem xs={12}>
                            <ReactTable
                                data={this.state.tabledata}
                                filterable
                                columns={[
                                    //{
                                    //    Header: "Select",
                                    //    accessor: "radio",
                                    //    sortable: false,
                                    //    filterable: false,
                                    //    minWidth: 30,
                                    //    resizable: false,
                                    //},
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
                                        accessor: "createdDateTime",
                                        headerClassName: 'react-table-center',
                                        style: { textAlign: "center" },
                                        // width: '50'
                                        minWidth: 40,
                                        resizable: false,
                                    },
                                    {
                                        Header: "Action",
                                        accessor: "btn",
                                        headerClassName: 'react-table-center',
                                        style: { textAlign: "right" },
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

                        </GridItem>
                        {/* <GridItem xs={12} sm={12} md={4}>
                           
                            <Button color="warning" onClick={this.Editopen} round> EDIT</Button>


                        </GridItem> */}

                    </GridContainer>}
                {/* <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}

                    >
                        <div className={classes.paper} id="modal">

                            <Button color="info"
                                round
                                className={classes.marginRight}
                                style={searchClose}
                                onClick={this.handleClose}>
                                &times;
                                                        </Button>

                        <MovementDetails />
                        </div>
                    </Modal> 
                   */}
                {this.state.showDetails &&
                    <GridContainer>
                    <MovementDetails retainFun={this.retainFun} retainFlag={this.state.retainFlag} salesFlag={this.state.salesFlag} salesretainFun={this.salesretainFun} salesdistributeFun={this.salesdistributeFun} distributeFun={this.distributeFun} decisionDTO={this.state.decisionDTO} SetDecision={this.SetDecision} Setdecisiondd={this.Setdecisiondd} personalDet={this.state.personalDet} masterList={this.props.masterList} branchList={this.state.branchList} designationList={this.state.designationList} empData={this.state.empData} reporteetabledata={this.state.reporteetabledata} salestabledata={this.state.salestabledata} quotationTbldata={this.state.quotationTbldata} proposalTbldata={this.state.proposalTbldata} policyTbldata={this.state.policyTbldata} avoOrgEmpAddress={this.state.avoOrgEmpAddress} decflag={this.state.decflag} />
                    </GridContainer>}
                {this.state.showDetails &&
                    <GridContainer justify="center">
                        <GridItem xs={3} sm={3} md={3}>
                        <Button color="warning" disabled={this.state.saveDisable} onClick={this.SaveData} round> Save </Button>

                        </GridItem>
                    </GridContainer>}

            </div>

        );
    }
}
export default withStyles(style)(Promotion);