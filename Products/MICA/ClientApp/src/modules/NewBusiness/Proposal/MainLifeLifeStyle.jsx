import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "../../../components/Grid/GridContainer";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Questionnaires from "./Questionnaires.jsx";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/CustomButtons/Button.jsx";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import CardBody from "components/Card/CardBody.jsx";
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
const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const MainlifeLifeStyle = (props) => {
    console.log("My Life Styleprops", props.LifeStyleQuesDTO, "proppsdata", props);
    console.log("masterdto13", props.MasterDataDto);

   
    let classes = props.classes;
    return (
        <div>
            {/*Tobacco*/}

        <GridContainer lg={12}>
                <GridItem xl={12} sm={4} md={3}>
                <CustomInput
                    labelText="Height"
                        id="Height"
                        name="Height"
                       // value={props.LifeStyleQA.Height}
                        onChange={props.QuestionalDetailsSetValue}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
                <GridItem xl={12} sm={4} md={3}>
                    <MasterDropdown
                        labelText=""
                        // id="LeadDTO.gender"
                        value={""}
                        lstObject={props.MasterDataDto}
                        filterName='HeightFeets'
                        //  model="LeadDTO"
                        name='HeightFeets'
                        onChange={(e)=>props.QuestionalDetailsSetValue(e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
            

                <GridItem xl={12} sm={4} md={3}>
                <CustomInput
                    labelText="Weight"
                        id="Weight"
                       // value={props.LifeStyleQA.Weight}
                        onChange={(e) => props.QuestionalDetailsSetValue(e)}
                        name="Weight"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                </GridItem>

                
                <GridItem xl={12} sm={4} md={3}>
                    <MasterDropdown
                        labelText=""
                        // id="LeadDTO.gender"
                      //  value={props.LifeStyleQA.WeightUnit}
                        lstObject={props.MasterDataDto}
                        filterName='HeightFeets'
                        //  model="LeadDTO"
                        name='HeightFeets'
                       onChange={(e)=>props.QuestionalDetailsSetValue(e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
           
        </GridContainer>
        <GridContainer lg={12}>
            <GridItem xs={12}>
                <p>Do You Consume Tobacco ?</p>
                </GridItem>

                <GridItem xs={12} sm={6} >
                    <div>

                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValue === "TabacoYes"}
                                    onChange={props.handleRadioChangeT}
                                    value="TabacoYes"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Yes"
                        />


                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValue === "TabacoNo"}
                                    onChange={props.handleRadioChangeT}
                                    value="TabacoNo"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="No"
                        />
                    </div>
                </GridItem>
            </GridContainer>
                {props.showradioval && 
                    <GridContainer lg={12}>
                    <GridItem xl={12} sm={4} md={4}>
                    <MasterDropdown
                        labelText="Type"
                        value={props.LifeStyleQA.SmokeType}
                        lstObject={props.MasterDataDto}
                        filterName='SmokeTypes'
                        name='SmokeType'
                        onChange={(e) => props.QuestionalDetailsSetValue(e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    

                </GridItem>
                   <GridItem xl={12} sm={4} md={5}>
                    <MasterDropdown
                        labelText="How many sticks per day"
                        value={props.LifeStyleQA.SmokeQuantity}
                        lstObject={props.MasterDataDto}
                        filterName='SmokeSticks'
                        name='SmokeQuantity'
                        onChange={(e) => props.QuestionalDetailsSetValue(e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />


                    </GridItem>
                
               
                
                <GridItem xl={12} sm={4} md={4}>
                    <CustomInput
                        labelText="How Long(Years)?"
                        id="SmokeDuration"
                        name="SmokeDuration"
                        value={props.LifeStyleQA.SmokeDuration}
                        name="SmokeDuration"
                        onChange={(e) => props.QuestionalDetailsSetValue(e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                  </GridItem>

                <GridItem xl={12} sm={4} md={3}>
                <Button color="info"
                    round className={props.classes.marginRight}
                        onClick={props.QuestionAddButton}
                    id="saveBtn" >
                        ADD
                                </Button>
                    </GridItem>
                </GridContainer>}

        {props.showradioval && 

                <GridContainer xl={12}>
                    <GridItem lg={12}>

                        <CardBody>

                        <ReactTable
                            data={props.tobaccodata}
                            filterable
                            columns={[
                                {
                                    Header: "TYPE",
                                    accessor: "Type",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,

                                },
                                {
                                    Header: "HOW MANY STICKS PER DAY",
                                    accessor: "SticksCount",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                    /* minWidth: 150,
                                       style: { textAlign: "center" },
                                       headerClassName: 'react-table-center'*/
                                },
                                {

                                    Header: "HOW LONG(YEARS)?",
                                    accessor: "Years",
                                    //minWidth: 150,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },
                                {

                                    Header: "DELETE",
                                    accessor: "actions",
                                    //minWidth: 150,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },

                            ]}
                            defaultPageSize={2}
                            showPaginationTop={false}
                            // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        />

                    </CardBody>
                </GridItem>
            </GridContainer>}
            <br />
            <br />
           
        {/*Alcohol*/}
         <GridContainer lg={12}>
                <GridItem xs={12}>
                   <p>Do You Consume Alcohol ?</p>
                </GridItem>

                <GridItem xs={12} sm={6}>
                    <div>

                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValueMLLSQ2 === "AlcoholYes"}
                                    onChange={props.handleRadioChangeT}
                                    value="AlcoholYes"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Yes"
                        />


                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValueMLLSQ2 === "AlcoholNo"}
                                    onChange={props.handleRadioChangeT}
                                    value="AlcoholNo"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="No"
                        />
                    </div>
                </GridItem>
            </GridContainer>
            {props.showAlcoholradioval &&
                <GridContainer lg={12}>

                <GridItem xs={4}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                        <InputLabel
                            htmlFor="ddlval"
                            className={classes.selectLabel}
                        >
                            Type
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu
                            }}
                            classes={{
                                select: classes.select
                            }}
                            value={props.showMLLS}
                            onChange={(e) => props.handleSimple(e)}
                            inputProps={{
                                name: "ddlval",
                                id: "ddlval"
                            }}
                        >


                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}

                            >
                                SELECT
                                    </MenuItem>
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="1"
                            >

                                HARD LIQUOR
                                    </MenuItem>
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="2"
                            >

                                BEER
                                    </MenuItem>

                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="3"
                            >

                                WINE
                                    </MenuItem>

                        </Select>
                    </FormControl>
                </GridItem>

                <GridItem xs={4}>
                    <CustomInput
                        labelText="Quantity(ml)"
                        id="Weight"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={4}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                        <InputLabel
                            htmlFor="time-interval"
                            className={classes.selectLabel}
                        >
                            Per
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu
                            }}
                            classes={{
                                select: classes.select
                            }}
                            value={props.showMLLS}
                            onChange={(e) => props.handleSimple(e)}
                            inputProps={{
                                name: "ddlval",
                                id: "ddlval"
                            }}
                        >


                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="1"
                            >
                                WEEK
                                    </MenuItem>

                        </Select>
                    </FormControl>
                </GridItem>

            </GridContainer>}
            {props.showAlcoholradioval &&
                <GridContainer lg={12}>
                <GridItem xs={4}>
                    <CustomInput
                        labelText="How Long(Years)?"
                        id="Height"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xl={12} sm={4} md={3}>
                    <Button color="info"
                        round className={props.classes.marginRight}
                        //onClick={props.handleLeadSave}
                        id="saveBtn" >
                        ADD
                                </Button>
                </GridItem>

            </GridContainer>}
         {props.showAlcoholradioval && <GridContainer lg={12}>

                <GridItem lg={12}>
                    <CardBody >

                        <ReactTable
                            data={props.data1}
                            filterable
                            columns={[
                                {
                                    Header: "TYPE",
                                    accessor: "Type",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,

                                },
                                {
                                    Header: "NUMBER",
                                    accessor: "LeadNo",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                    /* minWidth: 150,
                                       style: { textAlign: "center" },
                                       headerClassName: 'react-table-center'*/
                                },
                                {

                                    Header: "PER",
                                    accessor: "LeadDate",
                                    //minWidth: 150,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                },
                                {

                                    Header: "HOW LONG(YEARS)?",
                                    accessor: "LeadDate",
                                    //minWidth: 150,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },
                                {

                                    Header: "DELETE",
                                    accessor: "LeadDate",
                                    //minWidth: 150,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                },

                            ]}
                            defaultPageSize={2}
                            showPaginationTop={false}
                            // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        />

                    </CardBody>
                </GridItem>
            </GridContainer>}

            <br />
            <br />

            {/*Question1*/}
            <GridContainer lg={12}>
                <GridItem xs={12}>
                  
                   
                        <p>1. {(props.LifeStyleQuesDTO[0] !== undefined) ? props.LifeStyleQuesDTO[0].questionText:""}</p>
                    
                </GridItem>
           
            
                <GridItem xs={4} sm={6} >
                    <div>

                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValue === "Question1Yes"}
                                    onChange={props.handleRadioChangeT}
                                    value="Question1Yes"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Yes"
                        />


                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValue === "Question1no"}
                                    onChange={props.handleRadioChangeT}
                                    value="Question1no"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="No"
                        />
                    </div>
                </GridItem>


            </GridContainer>


           
            {props.showQuestion1 &&
                <GridContainer lg={12}>
                <GridItem xs={6}>
                    
                    <CustomInput
                        labelText={(props.LifeStyleQuesDTO[4] !== undefined) ? props.LifeStyleQuesDTO[4].questionText : ""}
                        id="Specification"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                    </GridContainer>}
               
            <br />
            <br />

            {/*Question2*/}
            <GridContainer lg={12}>
                <GridItem xs={24}>
                    
                        {<p>2. {(props.LifeStyleQuesDTO[1] !== undefined) ? props.LifeStyleQuesDTO[1].questionText : ""}</p>}
                    
                </GridItem>
           
                <GridItem xs={4} sm={6}>
                    <div>

                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValue === "Question2Yes"}
                                    onChange={props.handleRadioChangeT}
                                    value="Question2Yes"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Yes"
                        />


                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValue === "Question2No"}
                                    onChange={props.handleRadioChangeT}
                                    value="Question2No"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="No"
                        />
                    </div>
                </GridItem>
            </GridContainer>

            {props.showQuestion2 &&
                <GridContainer lg={12}>
                <GridItem xs={6}>
                   
                    <CustomInput
                        labelText={(props.LifeStyleQuesDTO[5] !== undefined) ? props.LifeStyleQuesDTO[5].questionText : ""}
                        id="Specification"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
            </GridContainer>}

            <br />
            <br />

            {/*Question3*/}
            <GridContainer lg={12}>
                <GridItem xs={24}>
                    
                        {<p>3. {(props.LifeStyleQuesDTO[2] !== undefined) ? props.LifeStyleQuesDTO[2].questionText : ""}</p>}
                    
                </GridItem>
           
            
                <GridItem xs={4} sm={6}>
                    <div>

                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValue === "Question3Yes"}
                                    onChange={props.handleRadioChangeT}
                                    value="Question3Yes"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Yes"
                        />


                        <FormControlLabel
                            control={
                                <Radio
                                    checked={props.selectedValue === "Question3No"}
                                    onChange={props.handleRadioChangeT}
                                    value="Question3No"
                                    name="radio1"
                                    aria-label="B"
                                    icon={
                                        <FiberManualRecord
                                            className={classes.radioUnchecked}
                                        />
                                    }
                                    checkedIcon={
                                        <FiberManualRecord
                                            className={classes.radioChecked}
                                        />
                                    }
                                    classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="No"
                        />
                    </div>
                </GridItem>

            </GridContainer>
            {props.showQuestion3 &&
                <GridContainer lg={12}>
             
                <GridItem xs={12}>
                    <CustomInput
                        labelText={(props.LifeStyleQuesDTO[6] !== undefined) ? props.LifeStyleQuesDTO[6].questionText : ""}
                        id="Specification"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
            </GridContainer>}
        </div>
             )
     }
export default withStyles(style)(MainlifeLifeStyle);