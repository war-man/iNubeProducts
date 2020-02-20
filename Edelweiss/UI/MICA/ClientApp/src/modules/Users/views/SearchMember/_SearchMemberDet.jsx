import React from "react";
import Search from "@material-ui/icons/Search";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "components/CustomButtons/Button.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";


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

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#e91e63",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const searchBtn = {
    height: "35px",
    marginTop : "25px"
}
class SearchMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false,
            topics: [],
            lob: "",
            productStatus: ""
        };
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    componentDidMount() {
        fetch('api/SampleData/GetDropDownFromList', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ topics: data });
            });
    }
    showSearchResults = () => {
        document.getElementById('memberTable').style.display = 'block';
    }

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Search />
                    </CardIcon>
                    <h4 className={this.props.cardIconTitle}>
                        <small> Search Member </small>
                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Insured/Member Mobile Number"
                                id="mobileNo"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Reference ID"
                                id="referenceId"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Button color="info" round className={classes.marginRight} style={searchBtn} onClick={this.showSearchResults}>
                                Search Partner
                             </Button>
                        </GridItem>

                        <Table className={classes.table} style={{ borderRadius: '2px', display: 'none', overflowX: 'auto', whiteSpace: 'nowrap', width: 'min-content' }} id="memberTable">
                            <TableHead>
                                <TableRow className="table-row" style={{ height: '45px' }}>
                                    <CustomTableCell className="table-row">REFERENCE ID</CustomTableCell>
                                    <CustomTableCell className="table-row">MOBILE NO</CustomTableCell>
                                    <CustomTableCell className="table-row">MEMBER NAME</CustomTableCell>
                                    <CustomTableCell className="table-row">PARTNER CODE</CustomTableCell>
                                    <CustomTableCell className="table-row">PARTNER NAME</CustomTableCell>
                                    <CustomTableCell className="table-row">PRODUCT CODE</CustomTableCell>
                                    <CustomTableCell className="table-row">PRODUCT NAME</CustomTableCell>
                                    <CustomTableCell className="table-row">EFFECTIVE FROM</CustomTableCell>
                                    <CustomTableCell className="table-row">CLAIM</CustomTableCell>
                                    <CustomTableCell className="table-row">ACTION</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow className="table-row" style={{ height: '20px' }}>
                                    <CustomTableCell>1</CustomTableCell>
                                    <CustomTableCell>201621345</CustomTableCell>
                                    <CustomTableCell>Member Name</CustomTableCell>
                                    <CustomTableCell>2134</CustomTableCell>
                                    <CustomTableCell>Taxi Operator</CustomTableCell>
                                    <CustomTableCell>456</CustomTableCell>
                                    <CustomTableCell>Taxi Ride</CustomTableCell>
                                    <CustomTableCell>DD/MM/YY</CustomTableCell>
                                    <CustomTableCell>Yes</CustomTableCell>
                                    <CustomTableCell>
                                        <button className='view-btn' style={{ marginLeft: '-2px' }}><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                    </CustomTableCell>
                                </TableRow>

                                <TableRow className="table-row" style={{ height: '20px' }}>
                                    <CustomTableCell>2</CustomTableCell>
                                    <CustomTableCell>201621345</CustomTableCell>
                                    <CustomTableCell>Member Name</CustomTableCell>
                                    <CustomTableCell>2134</CustomTableCell>
                                    <CustomTableCell>Taxi Operator</CustomTableCell>
                                    <CustomTableCell>456</CustomTableCell>
                                    <CustomTableCell>Taxi Ride</CustomTableCell>
                                    <CustomTableCell>DD/MM/YY</CustomTableCell>
                                    <CustomTableCell>Yes</CustomTableCell>
                                    <CustomTableCell>
                                        <button className='view-btn' style={{ marginLeft: '-2px' }}><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                    </CustomTableCell>
                                </TableRow>

                                <TableRow className="table-row" style={{ height: '20px' }}>
                                    <CustomTableCell>3</CustomTableCell>
                                    <CustomTableCell>201621345</CustomTableCell>
                                    <CustomTableCell>Member Name</CustomTableCell>
                                    <CustomTableCell>2134</CustomTableCell>
                                    <CustomTableCell>Taxi Operator</CustomTableCell>
                                    <CustomTableCell>456</CustomTableCell>
                                    <CustomTableCell>Taxi Ride</CustomTableCell>
                                    <CustomTableCell>DD/MM/YY</CustomTableCell>
                                    <CustomTableCell>Yes</CustomTableCell>
                                    <CustomTableCell>
                                        <button className='view-btn' style={{ marginLeft: '-2px' }} ><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                    </CustomTableCell>
                                </TableRow>

                                <TableRow className="table-row" style={{ height: '20px' }}>
                                    <CustomTableCell>4</CustomTableCell>
                                    <CustomTableCell>201621345</CustomTableCell>
                                    <CustomTableCell>Member Name</CustomTableCell>
                                    <CustomTableCell>2134</CustomTableCell>
                                    <CustomTableCell>Taxi Operator</CustomTableCell>
                                    <CustomTableCell>456</CustomTableCell>
                                    <CustomTableCell>Taxi Ride</CustomTableCell>
                                    <CustomTableCell>DD/MM/YY</CustomTableCell>
                                    <CustomTableCell>Yes</CustomTableCell>
                                    <CustomTableCell>
                                        <button className='view-btn' style={{ marginLeft: '-2px' }}><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                    </CustomTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </GridContainer>
                    
                </CardBody>
            </Card>
        );
    }
}
export default withStyles(style)(SearchMember);