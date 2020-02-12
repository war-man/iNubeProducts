import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.jsx";

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
};

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#e91e63",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const createButton = {
    margin: "0px auto",
    height: "35px",
}


class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    showAddProductTable = () => {
        document.getElementById('addProductTable').style.display = 'block';
    }

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <FilterNone />
                    </CardIcon>
                    <h4 className={this.props.cardIconTitle}>
                        <small></small>
                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={2}>
                            <Button color="info" round className={classes.marginRight} style={createButton} onClick={this.showAddProductTable}>
                                <i className="fa fa-plus fa-lg" ></i> &nbsp; Add Product
                        </Button>
                        </GridItem>
                    </GridContainer>
                    <GridContainer id="addProductTable" style={{ display: 'none' }}>
                        <br/>   
                        <Paper className={classes.root}>
                            <Table  striped className={classes.table} style={{ borderRadius: '2px', display: 'block', overflowX: 'auto', whiteSpace: 'nowrap' }} id="productTable">
                                <TableHead>
                                    <TableRow className="table-row" style={{ height: '45px' }}>
                                        <CustomTableCell className="table-row">PARTNER CODE</CustomTableCell>
                                        <CustomTableCell className="table-row">PARTNER NAME</CustomTableCell>
                                        <CustomTableCell className="table-row">PRODUCT CODE</CustomTableCell>
                                        <CustomTableCell className="table-row">PRODUCT NAME</CustomTableCell>
                                        <CustomTableCell className="table-row">EFFECTIVE FROM</CustomTableCell>
                                        <CustomTableCell className="table-row">EFFECTIVE TO</CustomTableCell>
                                        <CustomTableCell className="table-row">STATUS</CustomTableCell>
                                        <CustomTableCell className="table-row" style={{ textAlign: 'center' }}>ACTIONS</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className="table-row" style={{ height: '20px' }}>
                                    <CustomTableCell>20165</CustomTableCell>
                                    <CustomTableCell>Taxi Operator</CustomTableCell>
                                    <CustomTableCell>0123</CustomTableCell>
                                    <CustomTableCell>Taxi Ride</CustomTableCell>
                                    <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                    <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                    <CustomTableCell>Active</CustomTableCell>
                                        <CustomTableCell>
                                            <button className='view-btn' style={{ marginLeft : '0px' }}><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                            <button className='edit-btn' style={{ marginLeft: '5px' }}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button className='delete-btn'><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </CustomTableCell>
                                    </TableRow>

                                    <TableRow className="table-row" style={{ height: '20px' }}>
                                        <CustomTableCell>20134</CustomTableCell>
                                        <CustomTableCell>Flight Operator</CustomTableCell>
                                        <CustomTableCell>01236</CustomTableCell>
                                        <CustomTableCell>Flight Delay</CustomTableCell>
                                        <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                        <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                        <CustomTableCell>Draft</CustomTableCell>
                                        <CustomTableCell>
                                            <button className='view-btn' style={{ marginLeft: '0px' }}><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                            <button className='edit-btn' style={{ marginLeft: '5px' }}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button className='delete-btn'><i class="fa fa-trash" aria-hidden="true"></i></button>
                                        </CustomTableCell>
                                    </TableRow>

                                    <TableRow className="table-row" style={{ height: '20px' }}>
                                        <CustomTableCell>20155</CustomTableCell>
                                        <CustomTableCell>Taxi Operator</CustomTableCell>
                                        <CustomTableCell>01237</CustomTableCell>
                                        <CustomTableCell>Taxi Ride</CustomTableCell>
                                        <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                        <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                        <CustomTableCell>Draft</CustomTableCell>
                                        <CustomTableCell>
                                            <button className='view-btn' style={{ marginLeft: '0px' }}><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                            <button className='edit-btn' style={{ marginLeft: '5px' }}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button className='delete-btn'><i class="fa fa-trash" aria-hidden="true"></i></button>
                                        </CustomTableCell>
                                    </TableRow>

                                    <TableRow className="table-row" style={{ height: '20px' }}>
                                        <CustomTableCell>20159</CustomTableCell>
                                        <CustomTableCell>Flight Operator</CustomTableCell>
                                        <CustomTableCell>01236</CustomTableCell>
                                        <CustomTableCell>Flight Delay</CustomTableCell>
                                        <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                        <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                        <CustomTableCell>Active</CustomTableCell>
                                        <CustomTableCell>
                                            <button className='view-btn' style={{ marginLeft: '0px' }}><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                            <button className='edit-btn' style={{ marginLeft: '5px' }}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button className='delete-btn'><i class="fa fa-trash" aria-hidden="true"></i></button>
                                        </CustomTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                           
                        </Paper>
                        
                    </GridContainer>
                </CardBody>
            </Card>
        );
    }
}
export default withStyles(style)(AddProduct);