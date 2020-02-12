import Table from '@material-ui/core/Table';
import React from "react";
import Heading from "components/Heading/Heading.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Icon from "@material-ui/core/Icon";
import edit from "assets/img/edit.png";
import view from "assets/img/view.png";
import ClauseCreate from './_ClauseCreate.jsx';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Button from "components/CustomButtons/Button.jsx";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import $ from 'jquery';
import CustomDropDownTree from "components/CustomDropdownTree/CustomDropDownTree.jsx";
import DropdownTreeSelect from "react-dropdown-tree-select";
import data from 'views/Test/data.json';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import ProductConfig from "modules/Products/Micro/views/ProductConfig.jsx";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import {Animated} from "react-animated-css";
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

const radioAlign = {
    marginLeft: "50px",
    marginTop: "-35px"
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#086b77",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        maxWidth: "107px"
    },
}))(TableCell);

const modalStyles = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    padding: '20px',
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
const tableStyle = { borderRadius: '10px  ', width: '170%' }


const tableRow = { height: 'Auto', width: 'Auto' , }


const textAlign = {
    textAlign: 'center'
}

const subHeading = { color: '#407ba4', marginLeft: '10px', display: 'none' }

const radioLabel = {
    marginTop: "-15px"
};


const createButton = {
    left: "-20px",
};

const container = { marginLeft: '110px' }

const Clauses = (props) => {
       const { classes } = props;
    const clauseData = props.componentData;
    console.log("props data ", props);
            let contents = props.componentData.masClausesWarrentiesExclusionsDTO === undefined
                ? []
                : props.componentData.masClausesWarrentiesExclusionsDTO
                ;
            console.log('clauseData ', clauseData);
            return (
                <div>
                   
                    <GridContainer id="clauseSection">
                        <GridItem xs={12} sm={6}>
                         
                            <MasterDropdown labelText="Select C/W/E" id="ProductDTO.cweid" lstObject={clauseData.masterList}
                                
                                filterName='CWEType'
                                value={clauseData.ProductDTO.productCover.cweid}
                                model="ProductDTO" name='cweid'
                                onChange={(e) => clauseData.GetMasterData('Clauses', 'productCover', e)}
                                disabled={clauseData.viewdisable}
                                formControlProps={{ fullWidth: true }} />{clauseData.errormessage && (clauseData.ProductDTO.productCover.cweid == "") ? <p className="error">This Field is Required</p> : null}
                        
                        </GridItem>
                        <br />
                        
                        <GridItem xs={12} sm={6} className="dropdowntree">
                          
                            <CustomDropDownTree 
                                data={clauseData.clauses}
                                onChange={props.componentData.handleddlChange}
                            />
                            
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        {/*
                        <GridItem xs={3} sm={4}>
                       
                        <Button color="info" round onClick={props.componentData.AddClauses}>
                            Add
                       </Button>

                       </GridItem>
                       */}
                       </GridContainer>
                       
                       <GridContainer >
                       <GridItem xs={12}>
                                <br />
                                {props.componentData.ctable && <div>
                                
                                <GridContainer justify="center">
                                     
                                     <GridItem xs={12}>
                                     <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>    

                                           <CardBody className="react-tab-width-clauses">
                               

                                    <ReactTable
                                        data={clauseData.tabledata}
                                        filterable
                                        columns={[
                                            //{
                                            //    Header: "S-No",
                                            //    accessor: "id",
                                            //    //style: { textAlign: "right" }
                                            //    // width: '50'
                                            //    minWidth: 50
                                            //},

                                            {
                                                Header: "C/W/E NAME",
                                                accessor: "typeName",
                                                style: { textAlign: "left" },
                                                headerClassName: 'react-table-center',
                                                //width: '50'
                                                // minWidth: 100
                                                resizable: false,
                                            },
                                            {
                                                Header: "C/W/E",
                                                accessor: "cwetypes",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                //width: '50'
                                                // minWidth: 200
                                                resizable: false,
                                            },
                                            {
                                                Header: "C/W/E Full Text",
                                                accessor: "btn",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                //width: '50'
                                                resizable: false,
                                            },
                                            {
                                                Header: "Print",
                                                accessor: "isPrint",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                //width: '50' 
                                                resizable: false,

                                            },



                                        ]}
                                        defaultPageSize={5}
                                        pageSize={([clauseData.tablelength + 1] < 6) ? [clauseData.tablelength + 1] : 6}
                                        showPaginationTop={false}
                                        showPaginationBottom
                                        className="-striped -highlight short-tab"
                                    //loading={this.state.newdata}
                                    //   loadingText="coming"
                                    />
                                
                                </CardBody>
                                </Animated>
                                </GridItem>
                                </GridContainer>
                                    {/*
                                    <Table style={tableStyle} id="clauseTable">
                                        <TableHead>
                                            <TableRow className="table-row" style={tableRow}>

                                                <CustomTableCell className="table-row">C/W/E NAME</CustomTableCell>
                                                <CustomTableCell className="table-row">C/W/E</CustomTableCell>
                                                <CustomTableCell className="table-row">C/W/E Full Text</CustomTableCell>
                                                <CustomTableCell className="table-row">Print</CustomTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {clauseData.ProductDTO.productClausesWarrentiesExclusion.map((item, index) =>
                                                <TableRow className="table-row" style={tableRow}>
                                                    <CustomTableCell id="name" className="table-row" >{item.typeName}</CustomTableCell>
                                                    <CustomTableCell id="name" className="table-row" >{item.cwetypes}</CustomTableCell>
                                                    <CustomTableCell>
                                                        <Button color="info" onClick={props.componentData.handleOpen.bind(this, index)}><Icon><img id="icon-bnt-view" src={view} /></Icon></Button>
                                                        <Button color="info" onClick={props.componentData.handleEdit.bind(this, index)}><Icon><img id="icon-bnt-edit" src={edit} /></Icon></Button>
                                                    </CustomTableCell>
                                                    <CustomTableCell>
                                                        <CustomCheckbox key={index}
                                                            name="isPrint"
                                                            value={item.isPrint}
                                                            onChange={(e) => props.componentData.SetclauseValue(index, e)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}

                                                        />
                                                    </CustomTableCell>
                                                </TableRow>
                                            )
                                            }
                                        </TableBody>
                                    </Table>
                                    */}
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={props.componentData.open}
                                        onClose={props.componentData.handleClose}>
                                        <div className={classes.paper} id="modal-description">
                                        <GridItem xs={12}>
                                                <h4> <small>Description</small>  </h4> 
                                                
                                                <Button color="info" className={classes.marginRight} style={searchClose} onClick={props.componentData.handleClose}>
                                                    &times;
                                           </Button>
                                               
                                            </GridItem>
                                            <GridItem>
                                                <p id="description-paragraph">{props.componentData.description}</p>
                                            </GridItem>
                                        </div>
                                    </Modal>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={props.componentData.opendescription}
                                        onClose={props.componentData.handleClose}>
                                        <div className={classes.paper} id="modal-description">
                                        <GridItem xs={12}>
                                                <h4> <small>Description</small> </h4> <Button color="info" className={classes.marginRight} style={searchClose} onClick={props.componentData.handleClose}>
                                                    &times;
                                           </Button>
                                                
                                            </GridItem>
                                            <GridItem xs={12}   >

                                                <CustomInput
                                               
                                                    id="gstnumber"
                                                    value={props.componentData.description}
                                                    name="description"
                                                    multiline={true}
                                                onChange={(e) => props.componentData.SetValue('clauseDescription', e)}
                                                disabled={clauseData.viewdisable}
                                                    formControlProps={{
                                                        fullWidth: true

                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem>
                                                <Button id="margin-left-40" color="info" onClick={props.componentData.handledescription.bind(this)}>Save Description</Button>
                                            </GridItem>
                                        </div>
                                    </Modal>
                               
                                <GridContainer xs={12} sm={12} md={12}>
                  
                            <Button id="top" color="info" onClick={props.componentData.handleShow}>Custom Clause</Button>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={props.componentData.mshow}
                                onClose={props.componentData.handleClose}>
                                <div className={classes.paper} id="modal">
                                        <h4> <small>Custom C/W/E</small> </h4>
                                            <Button color="info" className={classes.marginRight} style={searchClose} onClick={props.componentData.handleClose}>
                                        &times;
                                                            </Button>
                                                            <GridContainer justify="center">
                                                            <GridItem xs={12} sm={4} md={4}>
                                    <MasterDropdown labelText="Select Type"
                                                            id="ProductDTO.cwetypeId.cweid"
                                        lstObject={clauseData.masterList}
                                        filterName='CWEType'
                                                            value={clauseData.ProductDTO.CustomClause.cwetypeId}
                                        model="ProductDTO"
                                                            name='cwetypeId'
                                                    onChange={(e) => props.componentData.SetValue('CustomClause', e)}
                                                    disabled={clauseData.viewdisable}
                                                formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4}>
                                    <CustomInput
                                                    labelText="Type Name"
                                                    
                                        id="gstnumber"
                                        value={clauseData.ProductDTO.CustomClause.typeName}
                                        name="typeName"
                                                    onChange={(e) => props.componentData.SetValue('CustomClause', e)}
                                                    disabled={clauseData.viewdisable}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4}>
                                    <CustomInput
                                                    labelText="Description:"
                                                    
                                        id="gstnumber"
                                        value={clauseData.ProductDTO.CustomClause.description}
                                        name="description"
                                                    onChange={(e) => props.componentData.SetValue('CustomClause', e)}
                                                    disabled={clauseData.viewdisable}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                                        />
                                    </GridItem>
                                    </GridContainer>
                                    <GridContainer justify="center">
                                    <GridItem xs={3} sm={3} md={3}>           
                                        <Button id="margin-left-180" color="info" onClick={props.componentData.handledata}>Add Clause</Button>
                                    </GridItem>
                                    </GridContainer>
                               </div>
                                        </Modal>
                                         
                                                   
                           
                                </GridContainer>
                                </div>
                                }
                            </GridItem>
                        </GridContainer>
                    
                </div>
            );
}


export default withStyles(extendedFormsStyle)(Clauses);