import React from "react";
import Card from "components/Card/Card.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import DynamicPageConfig from 'modules/DynamicPage/DynamicPageConfig.js';
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import { withStyles } from '@material-ui/core/styles';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import claimprocess from "assets/img/claim-process.png";
import MasterLayout from "./ViewMasterLayout.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import Modal from '@material-ui/core/Modal';



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
    headingPadding: {
        padding: "1rem",
        //textAlign: "center"
    }

};


class SearchPSD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtable: false,
            searchPsd: {
                psdId: "",
                psdName: "",
            },
            searchflag: false,
            searchData: [],
            viewModifyFlag: false,
            FinalModel: [],
            disable: false,
            disabled: false,
            editModal: false,
            visibility: false,
            open: false,
            close: false,
            viewModifyFlag: false,
            viewEditFlag:false,
        };
    }

    SetValue = (event) => {

        let name = event.target.name;
        let value = event.target.value;
        let searchPsd = this.state.searchPsd;
        searchPsd[name] = value;
        this.setState({ searchPsd });
       // this.change(event, name, type);

        console.log("claimNumber ", this.state.psd);

    };

    handleSearchPSD = () => {
 
        fetch(`${DynamicPageConfig.productConfigUrl}/api/PSD/GetPSDByPsdName?PsdName=` + this.state.searchPsd.psdName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ searchData: data });
                this.dataTable(data);
                console.log("data:", data, this.state.searchData);
            });
        // this.setState({ searchflag: true });
       // this.state.searchflag = true;
       
    }

    dataTable = (data) => {
        console.log("showdt", data);
        this.setState({ showtable: true })
        this.setState({
            psddata: data.map((prop, key) => {
                return {
                    id: key+1,
                    psdName: prop.psdName,
                    btn: <div>
                        < Tooltip title="View" placement="bottom" arrow >
                            <Button color="info" justIcon round simple className="view" onClick={() => this.handleView(prop.psdData)}  ><Visibility /></Button>
                        </ Tooltip>
                        < Tooltip title="Edit" placement="bottom" arrow >
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.handleEdit(prop.psdData)}  editModal={this.state.editModal}><Edit /></Button>
                        </ Tooltip>
                    </div>
                    
                };
            })
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    };


    handleView = (PsdData) => {
        this.setState({ FinalModel: PsdData});
       // this.setState({ partid: partnerId });
        this.handleOpen();
        let view = this.state;
        view.disabled = true;
        view.disable = true;
        view.editModal = true;
        view.open = true;
        view.close = false;
        view.visibility = false;
        view.close = false;
        view.viewEditFlag = true;

        this.setState({ view, viewModifyFlag: true, searchflag: true });

        
    };

    handleEdit = (PsdData) => {
        this.setState({ FinalModel: PsdData });
      //  this.setState({ partid: id });
        this.handleOpen();
        //console.log(id)
        let edit = this.state;
        edit.close = false;
        edit.editModal = true;
        edit.visibility = false;
        edit.open = true;
        edit.disabled = false;
        edit.disable = false;
        edit.close = false;
        edit.viewEditFlag = false;
        this.setState({ edit });
        console.log("edit", this.state.editModal);
        this.setState({ viewModifyFlag: false, searchflag: true });
        
    };
    handleOpen = () => {
        this.setState({ open: true });
    };



    render() {
        const { classes } = this.props;
        return (
            <div>

                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={claimprocess} /></Icon>

                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                            <small>Search PSD</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4}>
                                <CustomInput
                                    //required={true}
                                    labelText="PSD Name"
                                    name="psdName"
                                    value={this.state.searchPsd.psdName}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            
                                <GridItem xs={3} sm={3} md={3}>
                                    <Button color="warning" onClick={this.handleSearchPSD} round>
                                        Search
                            </Button>
                                </GridItem>
                            
                        </GridContainer>
                    </CardBody>
                </Card>
                {/* <MasterLayout searchData={this.state.searchData} searchflag={this.state.searchflag} PSDFlag={false}/>*/}

                <GridContainer xl={12}>
                    {this.state.showtable ?
                <GridItem xs={12}>
                        <ReactTable
                            title={"PSD"}
                                data={this.state.psddata}
                            filterable
                            columns={[
                                {
                                    Header: "S.No",
                                    accessor: "id",
                                    sortable: false,
                                    filterable: false,
                                    minWidth: 30,
                                    resizable: false,
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                },

                                {
                                    Header: "PSD Name",
                                    accessor: "psdName",
                                    headerClassName: 'react-table-center',
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                    // width: '50'
                                    minWidth: 40,
                                    resizable: false,

                                },
                                {
                                    Header: "Action",
                                    accessor: "btn",
                                    minwidth: 30,
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                    headerclassname: 'react-table-center',
                                    resizable: false,
                                },
                                
                            ]}
                            defaultPageSize={4}
                            showPaginationTop={false}
                            //pageSize={([this.state.data.length + 1] < 4) ? [this.state.data.length + 1] : 4}
                            //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                            showPaginationBottom={true}
                            className="-striped -highlight"
                        />
                        </GridItem>
                        : null}
                    </GridContainer>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>

                    <div className={classes.paper} id="modal">
                        {this.state.viewModifyFlag ? <h4><small className="center-text">View PSD</small></h4> : <h4><small className="center-text">Modify PSD</small></h4>}
                        <Button color="info"
                            round
                            className={classes.marginRight}
                            id="close-bnt"
                            onClick={this.handleClose}>
                            &times;
                                                        </Button>
                        <div id="disp" >
                            {this.state.searchflag ?
                                <MasterLayout
                                    viewEditFlag={this.state.viewEditFlag} editModal={this.state.editModal} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility}
                                    displaybtn={!this.state.disabled} visibility={this.state.visibility} FinalModel={this.state.FinalModel} searchData={this.state.searchData} searchflag={this.state.searchflag} />
                                : null}
                                </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
 export default withStyles(style)(SearchPSD);