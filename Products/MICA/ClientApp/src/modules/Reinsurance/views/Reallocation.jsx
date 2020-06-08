import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import Paper from '@material-ui/core/Paper';
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
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import DefineMapping from "modules/Reinsurance/views/DefineMapping.jsx";
import Modal from '@material-ui/core/Modal';
import swal from 'sweetalert';
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

class Reallocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearmasterlist: [],
            newdata: [],
            rimapId:"",
            showMapping:false,
            showRetentionflag: false,
            SelectedId: "",
            rimappingId:"",
            Mapping: {
                year: "", 
                level: "",
                lobProductCover:""
            }
        };
        
    }
    //onInputChange = (evt) => {

    //    const Data = this.state.Mapping;
    //    Data[evt.target.name] = evt.target.value;
    //    this.setState({ Data });
    //    console.log("Data", this.state.Mapping)

    //} 

  
  
  
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader>
                     
                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="Policy Details" /> </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Policy Number"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    //value={this.state.Retention.percentage}
                                    //name='percentage'
                                    //onChange={(evt) => this.onInputChange("numeric", evt)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                    //  required={true}
                                    //onFocus={this.state.onClick}

                                    labelText="PolicyStartDate"
                                    id='EndDate'
                                    name='effectiveFrom'
                                    //onChange={(event) => this.onDateChange('datetime', 'effectiveFrom', event)}
                                    //value={this.state.Retention.effectiveFrom}
                                    //required={true}
                                    formControlProps={{ fullWidth: true }}
                                />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                    // required={true}
                                    //onFocus={this.state.onClick}
                                    labelText="PolicyEndDate"
                                    id='EndDate'
                                    name='effectiveTo'
                                    //onChange={(event) => this.onDateChange('datetime', 'effectiveTo', event)}
                                    //value={this.state.Retention.effectiveTo}
                                    //required={true}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Basis"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    //value={this.state.Retention.percentage}
                                    //name='percentage'
                                    //onChange={(evt) => this.onInputChange("numeric", evt)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Type"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    //value={this.state.Retention.percentage}
                                    //name='percentage'
                                    //onChange={(evt) => this.onInputChange("numeric", evt)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="SumInsured"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    //value={this.state.Retention.percentage}
                                    //name='percentage'
                                    //onChange={(evt) => this.onInputChange("numeric", evt)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Premium"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    //value={this.state.Retention.percentage}
                                    //name='percentage'
                                    //onChange={(evt) => this.onInputChange("numeric", evt)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        
                        </CardBody>
                    </Card>
                <Card>
                    <CardHeader color="rose" icon>

                        <h4 className={this.props.cardIconTitle}>
                            <small> Retention </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Retention %"
                                name="Allowance"
                                //value={this.state.goal.Allowance}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Adjustment %"
                                name="Cost"
                                //value={this.state.goal.Cost}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Limit"
                                name="ANP"
                                //value={this.state.goal.ANP}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Amount"
                                name="Manpower"
                                //value={this.state.goal.Manpower}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Retention Allocation SI"
                                name="ActiveAgents"
                                //value={this.state.goal.ActiveAgents}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                           
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Retention Added"
                                name="ActiveAgents"
                                //value={this.state.goal.ActiveAgents}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Deallocated Retention"
                                name="ActiveAgents"
                                //value={this.state.goal.ActiveAgents}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                          
                        </GridContainer>


                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                    </CardBody>
                </Card>
                <Card>
                    <CardHeader color="rose" icon>

                        <h4 className={this.props.cardIconTitle}>
                            <small> QuotaShare/Obligatory </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Treaty Name"
                                name="Allowance"
                                //value={this.state.goal.Allowance}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Treaty Share"
                                name="Cost"
                                //value={this.state.goal.Cost}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Limit"
                                name="ANP"
                                //value={this.state.goal.ANP}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Allocation SI"
                                name="Manpower"
                                //value={this.state.goal.Manpower}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Allocation Premium"
                                name="ActiveAgents"
                                //value={this.state.goal.ActiveAgents}
                                //onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            

                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={3} sm={3} md={3}>
                                <Button id="round" style={{ marginTop: '25px' }} color="info"  > <TranslationContainer translationKey="Treaty Details" />  </Button>

                            </GridItem>

                        </GridContainer>

                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                    </CardBody>
                </Card>  
                <GridContainer xl={12}>
                    <GridItem lg={12}>



                        <ReactTable
                            //data={this.state.newdata}
                            filterable
                            columns={[
                                {
                                    Header: "Participant",
                                    accessor: "recruitmentNo",
                                    Width: "20px"

                                },
                                {
                                    Header: "Share%",
                                    accessor: "name",

                                },
                                {
                                    Header: "Amount",
                                    accessor: "channel",
                                    //Width: "10px"
                                },
                                {
                                    Header: "Premium",
                                    accessor: "subChannel",
                                    //Width: "20px"
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
            </div>
        );
    }
}

export default withStyles(style)(Reallocation);