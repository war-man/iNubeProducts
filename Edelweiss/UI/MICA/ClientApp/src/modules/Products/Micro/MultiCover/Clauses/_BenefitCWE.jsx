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

const BenefitClauses = (props) => {
    const { classes } = props;
    console.log('BenefitCWE ', props);
    const ProductDetails = props.props.props.props.props;
    const clauseData = props.props.props.props.props.props.state;
    const propFun = props.props;
    const Bindex = props.props.props.Bindex
    const Iindex = props.props.props.Iindex;
    console.log("props data ", props);
            let contents = clauseData.masClausesWarrentiesExclusionsDTO === undefined
                ? []
                : clauseData.masClausesWarrentiesExclusionsDTO
                ;
            console.log('clauseData ', clauseData);
            return (
                <div>
                   
                    <GridContainer id="clauseSection">
                        <GridItem xs={12} sm={6}>
                         
                            <MasterDropdown labelText="Select C/W/E" id="ProductDTO.cweid" lstObject={clauseData.masterList}
                                
                                filterName='CWEType'
                                value={ProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].cweid}
                                model="ProductDTO" name='cweid'
                                onChange={(e) => propFun.GetClausesData('Clauses', 'productCovers', e, "Benefit",Iindex, Bindex)}
                                disabled={clauseData.viewdisable}
                                formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <br />
                        
                        <GridItem xs={12} sm={6} className="dropdowntree">
                          
                            <CustomDropDownTree 
                                data={clauseData.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Bindex].BenefitList}
                                onChange={(e) => propFun.handleTreeChange(e, "Benefit", Iindex, Bindex)}

                            />
                            
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        {/*
                        <GridItem xs={3} sm={4}>
                       
                        <Button color="info" round onClick={clauseData.AddClauses}>
                            Add
                       </Button>

                       </GridItem>
                       */}
                       </GridContainer>
                       
                       <GridContainer >
                       <GridItem xs={12}>
                              
                            {clauseData.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Bindex].BenefitTable.ptable && <div>
                                
                                <GridContainer justify="center">
                                     
                                     <GridItem xs={12}>
                                     <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>    

                                           <CardBody className="react-tab-width-clauses">
                               

                                    <ReactTable
                                                    data={clauseData.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Bindex].tableBenefitdata.BenefitTableDataList}
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
                                                    pageSize={([clauseData.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Bindex].tableBenefitdata.BenefitTableDataList.length + 1] < 6) ? [clauseData.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Bindex].tableBenefitdata.BenefitTableDataList.length + 1] : 6}
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
                                                        <Button color="info" onClick={clauseData.handleOpen.bind(this, index)}><Icon><img id="icon-bnt-view" src={view} /></Icon></Button>
                                                        <Button color="info" onClick={clauseData.handleEdit.bind(this, index)}><Icon><img id="icon-bnt-edit" src={edit} /></Icon></Button>
                                                    </CustomTableCell>
                                                    <CustomTableCell>
                                                        <CustomCheckbox key={index}
                                                            name="isPrint"
                                                            value={item.isPrint}
                                                            onChange={(e) => clauseData.SetclauseValue(index, e)}
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
                                    open={clauseData.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Bindex].BenefitTable.open}
                                    onClose={() => propFun.handleCloseCWE("Benefit", Iindex, Bindex)}>
                                    <div className={classes.paper} id="modal-description">
                                        <GridItem xs={12}>
                                            <h4> <small>Description</small>  </h4>

                                            <Button color="info" className={classes.marginRight} style={searchClose} onClick={() => propFun.handleCloseCWE("Benefit", Iindex, Bindex)}>
                                                &times;
                                           </Button>

                                        </GridItem>
                                        <GridItem>
                                            <p id="description-paragraph">{clauseData.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Bindex].BenefitTable.description}</p>
                                        </GridItem>
                                    </div>
                                </Modal>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"

                                    open={clauseData.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Bindex].BenefitTable.opendespcription}
                                    onClose={() => propFun.handleCloseCWE("Benefit", Iindex, Bindex)}>
                                    <div className={classes.paper} id="modal-description">
                                        <GridItem xs={12}>
                                            <h4> <small>Description</small> </h4> <Button color="info" className={classes.marginRight} style={searchClose} onClick={() => propFun.handleCloseCWE("Benefit", Iindex, Bindex)}>
                                                &times;
                                           </Button>

                                        </GridItem>
                                        <GridItem xs={12}   >

                                            <CustomInput

                                                id="gstnumber"
                                                value={clauseData.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Bindex].BenefitTable.description}
                                                name="description"
                                                multiline={true}
                                                onChange={(e) => propFun.SetValueCWE(e, "Benefit", Iindex, Bindex)}
                                                disabled={clauseData.viewdisable}
                                                formControlProps={{
                                                    fullWidth: true

                                                }}
                                            />
                                        </GridItem>
                                        <GridItem>
                                            <Button id="margin-left-40" color="info" onClick={()=>propFun.handledescriptionCWE("Benefit", Iindex, Bindex)}>Save</Button>
                                        </GridItem>
                                    </div>
                                </Modal>

                               
                                <GridContainer xs={12} sm={12} md={12}>
                  
                                    {!clauseData.viewdisable && <Button id="top" color="info" onClick={() => propFun.handleShowCWE("Benefit", Iindex, Bindex)}>Custom Clause</Button>}
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                        open={clauseData.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Bindex].BenefitTable.mshow}
                                onClose={propFun.handleClose}>
                                <div className={classes.paper} id="modal">
                                        <h4> <small>Custom C/W/E</small> </h4>
                                            <Button color="info" className={classes.marginRight} style={searchClose} onClick={propFun.handleClose}>
                                        &times;
                                                            </Button>
                                                            <GridContainer justify="center">
                                                            <GridItem xs={12} sm={4} md={4}>
                                    <MasterDropdown labelText="Select Type"
                                                            id="ProductDTO.cwetypeId.cweid"
                                        lstObject={clauseData.masterList}
                                        filterName='CWEType'
                                                        value={ProductDetails.ProductDTO.CustomClause.cwetypeId}
                                        model="ProductDTO"
                                                            name='cwetypeId'
                                                    onChange={(e) => propFun.SetValue('CustomClause', e)}
                                                    disabled={clauseData.viewdisable}
                                                formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4}>
                                    <CustomInput
                                                    labelText="Type Name"
                                                    
                                        id="gstnumber"
                                                        value={ProductDetails.ProductDTO.CustomClause.typeName}
                                        name="typeName"
                                                    onChange={(e) => propFun.SetValue('CustomClause', e)}
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
                                                        value={ProductDetails.ProductDTO.CustomClause.description}
                                        name="description"
                                                    onChange={(e) => propFun.SetValue('CustomClause', e)}
                                                    disabled={clauseData.viewdisable}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                                        />
                                    </GridItem>
                                    </GridContainer>
                                    <GridContainer justify="center">
                                    <GridItem xs={3} sm={3} md={3}>           
                                                    <Button id="margin-left-180" color="info" onClick={(e) => propFun.handledataCWE(e, "Benefit", Iindex,Bindex)}>Add Clause</Button>
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


export default withStyles(extendedFormsStyle)(BenefitClauses);