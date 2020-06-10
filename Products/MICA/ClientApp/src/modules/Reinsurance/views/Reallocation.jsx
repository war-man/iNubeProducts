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
            rimappingId: "",
            Policydto: {
                policynumber:""
            },
            CalculationDTO: {
                //policynumber: "",
                policystartdate: "",
                policyenddate: "",
                productname:"",
                basis: "",
                type: "",
                riallocationDetails: [{
                    suminsured: null,
                    premium: null,
                    ricalculation: [

                    {
                            retention: "",
                            adjustment: "",
                            limit1: "",
                            amount: "",
                            retentionallocationsi: "",
                            retentionadded: "",
                            deallocatedretention: "",
                        },
                        {
                            treatyname: "",
                            treatyshare: "",
                            limit2: "",
                            allocationsi: "",
                            allocationpremium: "",
                        },
                        {
                            treatyname1: "",
                            treatyshare1: "",
                            limit3: "",
                            allocationsi1: "",
                            allocationpremium1: ""
                        }
                    ]
                }],
                //retention: "",
                //adjustment: "",
                //limit: "",
                //amount: "",
                //retentionallocationsi: "",
                //retentionadded: "",
                //deallocatedretention: "",
                //treatyname: "",
                //treatyshare: "",
                //limit: "",
                //allocationsi: "",
                //allocationpremium: "",
                //treatyname1: "",
                //treatyshare1: "",
                //limit1: "",
                //allocationsi1: "",
                //allocationpremium1: ""
            }
        };
        
    }
    onInputChange = (evt) => {
        debugger;
        const Data = this.state.CalculationDTO;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        const Data2 = this.state.CalculationDTO.riallocationDetails[0].ricalculation[0];
        Data2[evt.target.name] = evt.target.value;
        this.setState({ Data2 });
        const Data3 = this.state.CalculationDTO.riallocationDetails[0].ricalculation[1];
        Data3[evt.target.name] = evt.target.value;
        this.setState({ Data3 });
        const Data4 = this.state.CalculationDTO.riallocationDetails[0].ricalculation[2];
        Data4[evt.target.name] = evt.target.value;
        this.setState({ Data4 });
        const Data1 = this.state.Policydto;
        Data1[evt.target.name] = evt.target.value;
        this.setState({ Data1 });
        console.log("Data", this.state.CalculationDTO)
        console.log("Data1", this.state.Policydto)
    } 

    onDateChange = (formate, name, event) => {

        //const { validdate } = this.state.fields;
        //this.setState({ validdate: false });
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1);
        }
        else {
            var mm = (today.getMonth() + 1);
        }
         

        //var date = today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' + today.getDate();
        var date = dt + '/' + mm + '/' + today.getFullYear();
        const fields = this.state.CalculationDTO;
        fields[name] = date;
        this.setState({ fields });

    };
    componentDidMount() {
    }
    onFormSubmit = () => {
        debugger;
       
        console.log("submit", this.state.SearchPeople);
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetAllocationByPolicyNo?PolicyNo=` + this.state.Policydto.policynumber, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.state.CalculationDTO.productname = data.productName;
                this.state.CalculationDTO.riallocationDetails.suminsured = data.riallocationDetails[0].sumInsured;
                this.state.CalculationDTO.riallocationDetails.premium= data.riallocationDetails[0].premium;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].retention = data.riallocationDetails[0].ricalculation[0].type;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].amount = data.riallocationDetails[0].ricalculation[0].premium;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].retentionallocationsi = data.riallocationDetails[0].ricalculation[0].sumInsured;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].treatyname = data.riallocationDetails[0].ricalculation[1].type;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].allocationsi = data.riallocationDetails[0].ricalculation[1].sumInsured;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].allocationpremium = data.riallocationDetails[0].ricalculation[1].premium;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[2].treatyname1 = data.riallocationDetails[0].ricalculation[2].type;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[2].allocationsi1 = data.riallocationDetails[0].ricalculation[2].sumInsured;
                this.state.CalculationDTO.riallocationDetails[0].ricalculation[2].allocationpremium1 = data.riallocationDetails[0].ricalculation[2].premium;
                //this.state.CalculationDTO.productname = data.productName;
                    
                
                console.log("masterdata", data);
                this.setState({ masterList: data });
            });
        console.log(this.state.newdata, 'New Data');
    }
    
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
                                    value={this.state.Policydto.policynumber}
                                    name='policynumber'
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
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                    //  required={true}
                                    //onFocus={this.state.onClick}

                                    labelText="PolicyStartDate"
                                    id='EndDate'
                                    name='policystartdate'
                                    onChange={(event) => this.onDateChange('datetime', 'effectiveFrom', event)}
                                    value={this.state.CalculationDTO.policystartdate}
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
                                    name='policyenddate'
                                    onChange={(event) => this.onDateChange('datetime', 'effectiveTo', event)}
                                    value={this.state.CalculationDTO.policyenddate}
                                    //required={true}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Product Name"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    value={this.state.CalculationDTO.productname}
                                    name='productname'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Basis"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    value={this.state.CalculationDTO.basis}
                                    name='basis'
                                    onChange={this.onInputChange}
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
                                    value={this.state.CalculationDTO.type}
                                    name='type'
                                    onChange={this.onInputChange}
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
                                    value={this.state.CalculationDTO.riallocationDetails.suminsured}
                                    name='suminsure'
                                    onChange={this.onInputChange}
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
                                    value={this.state.CalculationDTO.riallocationDetails.premium}
                                    name='premium'
                                    onChange={this.onInputChange}
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
                                name="retention"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].retention}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Adjustment %"
                                name="adjustment"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].adjustment}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Limit"
                                name="limit1"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].limit1}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                           
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Retention Allocation SI"
                                name="retentionallocationsi"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].retentionallocationsi}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Amount"
                                name="amount"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].amount}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Retention Added"
                                name="retentionadded"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].retentionadded}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Deallocated Retention"
                                name="deallocatedretention"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].deallocatedretention}
                                onChange={this.onInputChange}
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
                                name="treatyname"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].treatyname}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Treaty Share"
                                name="treatyshare"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].treatyshare}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Limit"
                                name="limit2"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].limit2}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Allocation SI"
                                name="allocationsi"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].allocationsi}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Allocation Premium"
                                name="allocationpremium"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].allocationpremium}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            

                        </GridContainer>
                        {/*<GridContainer justify="center">
                            <GridItem xs={3} sm={3} md={3}>
                                <Button id="round" style={{ marginTop: '25px' }} color="info"  > <TranslationContainer translationKey="Treaty Details" />  </Button>

                            </GridItem>

                        </GridContainer>*/}

                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                    </CardBody>
                </Card>  
                <Card>
                    <CardHeader color="rose" icon>

                        <h4 className={this.props.cardIconTitle}>
                            <small> Surplus </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Treaty Name"
                                name="treatyname1"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[2].treatyname1}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Treaty Share"
                                name="treatyshare1"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[2].treatyshare1}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Limit"
                                name="limit1"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[2].limit3}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Allocation SI"
                                name="allocationsi1"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[2].allocationsi1}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}> <CustomInput
                                labelText="Allocation Premium"
                                name="allocationpremium1"
                                value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[2].allocationpremium1}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>


                        </GridContainer>
                        {/* <GridContainer justify="center">
                            <GridItem xs={3} sm={3} md={3}>
                                <Button id="round" style={{ marginTop: '25px' }} color="info"  > <TranslationContainer translationKey="Treaty Details" />  </Button>

                            </GridItem>

                        </GridContainer>*/}

                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                    </CardBody>
                </Card>  
                {/*  <GridContainer xl={12}>
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





                </GridContainer>*/}
            </div>
        );
    }
}

export default withStyles(style)(Reallocation);