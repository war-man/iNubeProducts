import React from "react";
//import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
//import Datetime from "react-datetime";



// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
//import config from '../../../../config';
//import Dropdown from "components/Dropdown/Dropdown.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import $ from 'jquery';
import Button from "components/CustomButtons/Button.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Paper from '@material-ui/core/Paper';

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
};

const modalStyles = {
   width : "1100px",
   
};
const searchBtn = {
    width: "120px",
    height: "35px",
    margin: "0 auto"
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            show: false,
            hide: false,
            ddlval: 0,
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };

  
    onClickshow = () => {
        //const { show } = this.state.show;
        //const { hide } = this.state.hide;
       
        if (this.state.ddlval === 1 || this.state.ddlval === 3) {
            this.setState({ show: true });
            this.setState({ hide: false });
        }
        else if (this.state.ddlval === 2) {
            this.setState({ hide: true });
            this.setState({ show: false });
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ ddlval: event.target.value });
        this.setState({ show: false });
        this.setState({ hide: false });
       
        if (event.target.value === 1) {
            document.getElementById('searchmember').style.display = 'block';
            document.getElementById('searchpolicy').style.display = 'none';
            document.getElementById('searchclaim').style.display = 'none';
        }
        else if (event.target.value === 2) {
            document.getElementById('searchmember').style.display = 'none';
            document.getElementById('searchpolicy').style.display = 'block';
            document.getElementById('searchclaim').style.display = 'none';
        }
        else if (event.target.value === 3) {
            document.getElementById('searchclaim').style.display = 'block';
            document.getElementById('searchmember').style.display = 'none';
            document.getElementById('searchpolicy').style.display = 'none';
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card style={{boxShadow:'none' }}>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Search </small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={4}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Search
                                    </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.simpleSelect}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "simpleSelect",
                                                    id: "simple-select"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Select
                                     </MenuItem>
                                                <MenuItem

                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="1"
                                                >
                                                    Member
                                      </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    Policy
                                     </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="3"
                                                >
                                                    Claim
                                     </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>

                                </GridContainer>

                                <GridContainer>
                                    <div id="searchmember" style={{ display: 'none' }}>

                                        <div style={modalStyles}>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Mobile No"
                                                    id="mobileNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Reference ID"
                                                    id="refid"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>

                                        </div>
                                    </div>

                                </GridContainer>
                                <GridContainer>
                                    <div id="searchpolicy" style={{ display: 'none' }}>
                                        <div style={modalStyles}>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Policy No"
                                                    id="policyNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Mobile No"
                                                    id="mobileNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Reference ID"
                                                    id="refid"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </div>
                                    </div>
                                </GridContainer>
                                <GridContainer>
                                    <div id="searchclaim" style={{ display: 'none' }}>
                                        <div style={modalStyles}>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Claim No"
                                                    id="claimNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Mobile No"
                                                    id="mobileNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Reference ID"
                                                    id="refid"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </div>
                                    </div>

                                    <GridItem xs={12} sm={6} md={7}>
                                        <Button color="info" round className={classes.marginRight} style={searchBtn} onClick={this.onClickshow}>
                                            Search
                                        </Button>
                                    </GridItem>

                                </GridContainer>


                                {this.state.show && <div id="memberdetails" >
                                    <GridContainer>
                                        <Paper className={classes.root} style={{ marginLeft: '70px', marginRight: '70px' }} >
                                            <table className="createTableClass table-striped " style={{ borderRadius: '6px  ', width: '100%', margin: '0 auto' }} id="paymentTable">
                                                <thead className="tableClassRow" style={{ height: '10px' }}>
                                                    <tr className="tableClassRow">
                                                        <th className="tableClassRow" ><h7><b>REFERENCE ID</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>CLAIM NO</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>MEMBER NAME</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>PARTNER CODE</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>PARTNER NAME</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>PRODUCT CODE</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>PRODUCT NAME</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>POLICY NO</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>EFFECTIVE FROM</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>DATE&TIME</b></h7></th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </Paper>

                                    </GridContainer>
                                </div>
                                }



                                {this.state.hide && <div id="policydetails" >

                                    <GridContainer>
                                        <Paper className={classes.root} style={{ marginLeft: '70px', marginRight: '70px' }} >
                                            <table className="createTableClass table-striped " style={{ borderRadius: '6px  ', width: '100%', margin: '0 auto' }} id="paymentTable">
                                                <thead className="tableClassRow" style={{ height: '10px' }}>
                                                    <tr className="tableClassRow">

                                                        <th className="tableClassRow" ><h7><b>POLICY-NO</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>PARTNER-CODE</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>PARTNER-NAME</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>PRODUCT-CODE</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>PRODUCT-NAME</b></h7></th>
                                                        <th className="tableClassRow" ><h7><b>EFFECTIVE-FROM</b></h7></th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </Paper>

                                    </GridContainer>
                                </div>
                                }
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>


                   );
    }
}
export default withStyles(style)(Search);