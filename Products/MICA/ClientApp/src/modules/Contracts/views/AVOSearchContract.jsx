import React, { isValidElement } from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import $ from 'jquery';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Paper from '@material-ui/core/Paper';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from "@material-ui/icons/Visibility";
import IconButton from '@material-ui/core/IconButton';
import ContractConfig from "modules/Contracts/ContractConfig.js";
import GenerateContract from "./GenerateContract";
import Modal from '@material-ui/core/Modal';
import GetApp from "@material-ui/icons/GetApp";
import PDFViewer from 'pdf-viewer-reactjs';

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

class AVOSearchContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RequrementNo:"",
            showtable: false,
            newdata: [],
            open: false,
            disabled: false,
            editModal: false,
            close: false,
            flagmodify: false,
            flagsave: false,
            Contractflag:false,
            ParticipantList: {
                contracts: []
            },
            SearchContract: {
                RecNum: "",
                Name: "",
                Channel: "",
                SubChannel: "",
                Designation:""
            },
            isimage: false,
            openpop: false,
            bytearr: [],
            docbyte: [],
            base64: [],
        };
    }
    onInputChange = (evt) => {
        const Data = this.state.SearchContract;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.SearchContract)
    }
    handleView = (RNo) => {
      
        this.setState({ RequrementNo: RNo });

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
        edit.flagmodify = false;
    }
   
    //componentDidMount() {
    //    this.setState({ flagmodify: this.props.flagmodify })
    //}
    dataTable = (Data) => {
        this.state.ParticipantList = Data;
        debugger;
        console.log("ParticipantList", this.state.ParticipantList);
        console.log("ParticipantList1", this.state.ParticipantList.contracts);
        this.setState({
            newdata: this.state.ParticipantList.contracts.map((prop, key) => {
                return {
                    id: key,
                    recruitmentNo: prop.recruitmentNo,
                    name: prop.name,
                    channel: prop.channel,
                    subChannel: prop.subChannel,
                    designation: prop.designation,
                    levelId: prop.levelId,
                    contractTerm: prop.contractTerm,
                    averageIncome: prop.averageIncome,
                    duration: prop.duration,
                    codingMonth: prop.codingMonth,
                    numberOfFreeMonth: prop.numberOfFreeMonth,
                    allowance: prop.allowance,
                    totalCost: prop.totalCost,
                    totalAnpTarget: prop.totalAnpTarget,
                    manPower: prop.manPower,
                    activityAgents: prop.activityAgents,
                    action: <div>
                        <Tooltip title="View" placement="bottom" arrow>
                            <Button color="info" justIcon round simple className="view" onClick={() => this.handleView(prop.recruitmentNo)}><Visibility /></Button>
                        </Tooltip>

                        <Tooltip title="PDF View" placement="bottom" arrow>
                            <Button color="info" justIcon round simple className="download" onClick={this.documentLinkView.bind(this, key)}> <GetApp /></Button>
                        </Tooltip>

                    </div>,

                    //btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.retentionGroupId)} editModal={this.state.editModal}><Edit /></Button>
                    //    <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete(prop.retentionGroupId)} ><Delete /></Button>
                    //</div>
                };
            })
        });

    }

    documentLinkView = (key) => {
        console.log("check id", key, this.state.ParticipantList.contracts[key].recruitmentNo);
        fetch(`${ContractConfig.ContractConfigURL}/api/DMS/GetDocumentById?id=` + this.state.ParticipantList.contracts[key].recruitmentNo, {
            method: 'get',
            headers: {

                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },

        }).then(response => response.json())

            .then(data => {
                console.log("Data:fgdgh", data);
                this.setState({ bytearr: data.data });

                console.log("doc123data", this.state.bytearr);

                if (data.fileExtension == "pdf") {
                    this.setState({ isimage: true });
                }
                else {
                    this.setState({ isimage: false });
                }


                this.setState({ openpop: true });
            });

    }

    handleClosePop = () => {
        this.setState({ openpop: false });
    };

    downloadpdfFun = (key) => {
        const invNo = this.state.ParticipantList.contracts[key].recruitmentNo;
        console.log("Number", invNo);
        window.open(
            'https://invoiceawsbucket.s3.amazonaws.com/Invoice_' + invNo + '.pdf',
            '_blank' // <- This is what makes it open in a new window.
        );
        //window.location.href="https://invoiceawsbucket.s3.amazonaws.com/c1ffb69e-2818-4933-869e-35603a7d7208InvoiceOla00123.pdf"; // <- To open in same page
    }

    onFormSubmit = () => {
        debugger;
        this.setState({ showtable: true });
        console.log("submit", this.state.SearchPeople);
        fetch(`${ContractConfig.ContractConfigURL}/api/Contract/SearchContract`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.SearchContract)
        }).then(response => response.json())
            .then(sdata => {
                //this.state.searchData = sdata;
                console.log(sdata, 'SearchData Fields ')
                console.log(sdata.contracts[0].recruitmentNo, 'SearchData Fields1 ')
              
                this.dataTable(sdata);
                    console.log(this.state.newdata, 'New Data123');
                

                //this.setState({ showRetentionflag: true });
            });
        console.log(this.state.newdata, 'New Data');
    }
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={role} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> Search Contract </small>
                                </h4>
                            }
                        </CardHeader>
                        <CardBody>
                            <GridContainer>

                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Recruitment Number"
                                    name="RecNum"
                                    value={this.state.SearchContract.RecNum}
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Name"
                                    name="Name"
                                    value={this.state.SearchContract.Name}
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Channel"
                                    name="Channel"
                                    value={this.state.SearchContract.Channel}
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="SubChannel"
                                    name="SubChannel"
                                    value={this.state.SearchContract.SubChannel}
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}> <CustomInput
                                    labelText="Designation"
                                    name="Designation"
                                    value={this.state.SearchContract.Designation}
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
                                open={this.state.openpop}
                                onClose={this.handleClosePop}>

                                <div className={classes.paper} id="modal">
                                    <h4><small className="center-text">View Document</small></h4>

                                    <Button color="info"
                                        round
                                        className={classes.marginRight}
                                        id="close-bnt"
                                        onClick={this.handleClosePop}>
                                        &times;
                        </Button>

                                    <div id="disp">
                                        {this.state.isimage ?
                                            <PDFViewer
                                                document={{
                                                    base64: this.state.bytearr,
                                                }}
                                            />


                                            : <img style={{ width: "40rem" }}
                                                src={
                                                    this.state.docbyte = "data:image;base64," + this.state.bytearr
                                                }
                                            />


                                        }
                                    </div>

                                </div>
                            </Modal>

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
                                        <GenerateContract ParticipantList={this.state.ParticipantList} RequrementNo={this.state.RequrementNo} editModal={this.state.editModal} flagUpdate={this.state.flagUpdate} flagsave={this.state.flagsave} flagmodify={this.state.flagmodify} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} RecNum={this.state.SearchContract.RecNum}  />
                                    </div>
                                </div>








                            </Modal>
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
                                            Header: "Recruitment Number",
                                            accessor: "recruitmentNo",
                                            Width: "20px"

                                        },
                                        {
                                            Header: "Name",
                                            accessor: "name",

                                        },
                                        {
                                            Header: "Channel",
                                            accessor: "channel",
                                            //Width: "10px"
                                        },
                                        {
                                            Header: "SubChannel",
                                            accessor: "subChannel",
                                            //Width: "20px"
                                        },
                                        {
                                            Header: "Designation",
                                            accessor: "designation",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "levelId",
                                            accessor: "levelId",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "ContractTerm",
                                            accessor: "contractTerm",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "AverageIncome",
                                            accessor: "averageIncome",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "Duration",
                                            accessor: "duration",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "CodingMonth",
                                            accessor: "codingMonth",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "NumberOfFreeMonth",
                                            accessor: "numberOfFreeMonth",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "Allowance",
                                            accessor: "allowance",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "TotalCost",
                                            accessor: "totalCost",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "TotalAnpTarget",
                                            accessor: "totalAnpTarget",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "ManPower",
                                            accessor: "manPower",
                                            // Width: "20px"
                                        },
                                        {
                                            Header: "ActivityAgents",
                                            accessor: "activityAgents",
                                            // Width: "20px"
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
                                    //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                    //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                    className="-striped -highlight"
                                />


                            </GridItem>


                            <Paper className={classes.root} style={{ marginLeft: '75px', marginRight: '75px' }} >
                             

                            </Paper>

                 



                        </GridContainer>

                    }
                </GridItem>
            </GridContainer >
        );
    }
}
export default withStyles(style)(AVOSearchContract);