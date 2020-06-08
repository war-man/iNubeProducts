import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import searchparticipant from "assets/img/search-participant.png";
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
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import ParticipantMaster from "modules/Reinsurance/views/ParticipantMaster.jsx";
import validationPage from "modules/Accounts/views/ValidationPage.jsx";
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

class SearchParticipantMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            newdata: [],
            actnId: "",
            flageUpdate: false,
            flag: true,
            editModal: false,
            close: false,
            open: false,
            participantMasterId:"",
            showparticipantgrid: false,
            ParticipantCodeState: false,
            ParticipantNameState: false,
            SearchParticipant: {
                participantCode: "",
                participantName: "",
                participantTypeId: ""
                
            }
        };
        this.handleEdit = this.handleEdit.bind(this);
    }
    onInputChange = (type,evt) => {
        let name = evt.target.name;
        const Data = this.state.SearchParticipant;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.SearchParticipant)
        this.change(evt, name, type);
    }
    onInputChange1 = (evt) => {

        const Data = this.state.SearchParticipant;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.SearchParticipant)

    }
    change(evt, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "range":
                if (validationPage.verifyAcCode(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "string":
                if (validationPage.verifyName(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "numeric":
                if (validationPage.verifyAccountCode(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "alphaNumeric":
                if (validationPage.verifyAlphaNumeric(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
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
    }
    onDelete = (id) => {
        this.state.actnId=id
        //this.setState({ actnId: id })
        //if (this.state.actnId == "") {
        //    swal("", "Please select the Account to delete", "error")
        //}
        //else {
        
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/DeleteParticipant?participantMasterId=` + this.state.actnId, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(data => {
            this.onFormSubmit();
            swal({

                text:" Participant Deleted Successfully",
                icon: "success"
            });
        });
        //}
    }
    onFormSubmit = () => {
       
        
        console.log("submit", this.state.SearchParticipant);

        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SearchParticipant`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.SearchParticipant)
        }).then(response => response.json())
            .then(sdata => {
                //this.state.searchData = sdata;

                console.log(sdata, 'SearchData Fields ')
           
                if (sdata.length > 0) {
                   
                    this.dataTable(sdata);
                 
                        // this.setState({ display: true, loader: true });


                    
                   
                    console.log(this.state.newdata, 'New Data123');
                }

                this.setState({ showparticipantgrid: true });
            });
        console.log(this.state.newdata, 'New Data');
    }
    dataTable = (ParticipantList) => {
        console.log("ParticipantList", ParticipantList);
        this.setState({
            newdata: ParticipantList.map((prop, key) => {
               
                return {
                    id: key,
                    participantTypeId: prop.participantTypeId,
                    participantType: prop.participantType,
                    participantCode: prop.participantCode,
                    participantName: prop.participantName,
                    status: prop.isActive,
                    btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.participantMasterId)} editModal={this.state.editModal}><Edit /></Button> 
                        <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete(prop.participantMasterId)} ><Delete /></Button>
                    </div>
                };
            })
        });

    }
    editFunction(id, pId) {

        document.getElementById("disp");

        this.setState({ participantMasterId: pId });

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
        this.setState({ edit, participantMasterId: id });

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
                            <Icon><img id="icon" src={searchparticipant} /></Icon>
                        </CardIcon>
                        {
                            <h4 > 
                                <small> <TranslationContainer translationKey="SearchParticipant" /> </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="ParticipantType"
                                    id="ddlstatus"
                                    lstObject={this.state.masterList}
                                    filterName='TreatyAccountingTo'
                                    value={this.state.SearchParticipant.participantTypeId}
                                    name='participantTypeId'
                                    onChange={this.onInputChange1}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="ParticipantCode"
                                    id="Participant"
                                    error={this.state.ParticipantCodeState}
                                    value={this.state.SearchParticipant.participantCode}
                                    name='participantCode'
                                    //onChange={this.onInputChange}
                                    onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="ParticipantName"
                                    id="TreatyCode"
                                    error={this.state.ParticipantNameState}
                                    value={this.state.SearchParticipant.participantName}
                                    name='participantName'
                                    //onChange={this.f}
                                    onChange={(evt) => this.onInputChange("string", evt)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem> 
                            <GridItem xs={12} sm={12} md={3}>
                                <Button id="top-bnt"  round color="info" onClick={() => this.onFormSubmit()} >
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
                                    <ParticipantMaster participantMasterId={this.state.participantMasterId} editModal={this.state.editModal} flagUpdate={this.state.flagUpdate} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} participantMasterId={this.state.participantMasterId} />
                                </div>
                            </div>
                        </Modal>
                    </CardBody>
                </Card>
                {this.state.showparticipantgrid  ?  <GridContainer>
                    <GridItem xs={12}>
                       
                            <ReactTable

                            
                            title={"Participant Details"}
                            data={this.state.newdata}
                                filterable
                                columns={[
                                    
                                    {
                                        Header: "ParticipantType",
                                        accessor: "participantType",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },

                                    {
                                        Header: "ParticipantCode",
                                        accessor: "participantCode",

                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "ParticipantName",
                                        accessor: "participantName",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "Status",
                                        accessor: "status",

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

                        

                    </GridItem>
                </GridContainer>:null}
            </div>
        );
    }
}

export default withStyles(style)(SearchParticipantMaster);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               