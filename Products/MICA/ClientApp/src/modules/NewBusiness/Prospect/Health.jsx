import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Datetime from "react-datetime";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import CardMedia from '@material-ui/core/CardMedia';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import Edit from "@material-ui/icons/Edit";
import data from "views/Test/data.json";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import Icon from "@material-ui/core/Icon";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CustomDropDownTree from "components/CustomDropdownTree/CustomDropDownTree.jsx";
import Add from "@material-ui/icons/AddCircleOutline"; 
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";



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
const MyBtn={
    padding: "31px"
};


const Health = (props) => {
    let classes = props.classes;
    console.log("Health Props:",props);
    return (
        <div>
          

                <GridContainer lg={12}>
                    <GridItem xs={3}>
                        

                                    <h3>
                        <small>Who pays your current Hospital Bills?</small> 
                                    </h3>
                    
                </GridItem>
                <GridItem xs={3}>
                    <Button color="info" justify="center" style={MyBtn}>Myself</Button>
                </GridItem>
                <GridItem xs={3}>
                    <Button color="info" justify="center" style={MyBtn}>Insurance Policy</Button>
                </GridItem>
                <GridItem xs={3}>
                    <Button color="info" justify="center" style={MyBtn}>Empolyer</Button>
                </GridItem>




                <GridItem xs={3}>


                    <h3>
                        <small>Who will takes care of your hospital expenses during your retirement?</small>
                    </h3>

                </GridItem>
                <GridItem xs={3}>
                    <Button color="info" style={MyBtn}>Myself</Button>
                </GridItem>
                <GridItem xs={3}>
                    <Button color="info" style={MyBtn}>Insurance Policy</Button>
                </GridItem>
                <GridItem xs={3}>
                    <Button color="info" style={MyBtn}>Children</Button>
                </GridItem>



                <GridItem xs={3}>


                    <h3>
                        <small>Are you ready for the other health adversities in life?</small>
                    </h3>

                </GridItem>
              
                <GridItem xs={12} sm={6} className="dropdowntree">

                    <CustomDropDownTree
                        data={props.healthAdversitiesData[0].mdata}
                        onChange={props.handleddtChange}
                    />
                </GridItem>
             





                </GridContainer>
           
            

            <GridContainer lg={12}>
                <GridItem xs={3}>


                    <h3>
                        <small>Is your existing solution sufficient to meet increasing health expenses?</small>
                    </h3>

                </GridItem>
                {/*<GridItem xs={3}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                        <InputLabel
                            htmlFor="time-interval"
                            className={classes.selectLabel}
                        >
                            Available Annual Amount
                                 </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu
                            }}
                            classes={{
                                select: classes.select
                            }}
                            value={props.interval}
                            onChange={(e) => props.handleSimple(e)}
                            inputProps={{
                                name: "interval",
                                id: "time-interval"
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
                                value="2"
                            >
                                Below LKR 100,000
                                         </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="3"
                            >
                                LKR 100,000 - 200,000
                                    </MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>*/}
                <GridItem xs={6} lg={3}>
                <MasterDropdown
                    labelText="Available Annual Amount"
                    value={props.HealthMasddlDTO.availableAnnualAmount}
                    lstObject={props.masterList}
                    required={true}
                    filterName='Available Annual Amount'
                    model="HealthMasddlDTO"
                    name='availableAnnualAmount'
                    //onChange={(e) => props.HealthddlSetValue("string", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                </GridItem>

                <GridItem xs={6} lg={3}>
                    <MasterDropdown
                        labelText="Coverage"
                        value={props.HealthMasddlDTO.Coverage}
                        lstObject={props.masterList}
                        required={true}
                        filterName='Coverage'
                        model="HealthMasddlDTO"
                        name='Coverage'
                        //onChange={(e) => props.HealthddlSetValue("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
            
                <GridItem xs={6} lg={3}>
                    <MasterDropdown
                        labelText="Adequecy"
                        value={props.HealthMasddlDTO.Adequecy}
                        lstObject={props.masterList}
                        required={true}
                        filterName='Adequecy'
                        model="HealthMasddlDTO"
                        name='Adequecy'
                        //onChange={(e) => props.HealthddlSetValue("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridContainer justify="center">
                    <div id="searchTableSec" >


                <GridItem xs={12}>


                    <CardBody className="Health-react-tab">

                        <ReactTable
                            data={props.data}
                            filterable
                            columns={[
                                {
                                   
                                    accessor: "Type",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,
                                    resizable: false,

                                },
                                {
                                    Header: "CURRENT REQUIREMENT",
                                    accessor: "LeadNo",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,
                                    resizable: false,
                                    /* minWidth: 150,
                                       style: { textAlign: "center" },
                                       headerClassName: 'react-table-center'*/
                                },
                                {

                                    Header: "AVAILABLE FUND",
                                    accessor: "LeadDate",
                                    //minWidth: 150,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,
                                    resizable: false,
                                },
                                {
                                    Header: "GAP",
                                    accessor: "ProposerName",
                                    //minWidth: 150,
                                    //style: { textAlign: "center" },
                                    //headerClassName: 'react-table-center'
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,
                                    resizable: false,
                                },
                              
                            ]}
                            defaultPageSize={3}
                            showPaginationTop={false}
                            //pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        />

                    </CardBody>

                        </GridItem>
                        </div>
                       </GridContainer>

            </GridContainer>

        </div>
        )

}
export default withStyles(style)(Health);