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
            dynamicList: [],
            indexList:[],
            qoutaflag:false,
            yearmasterlist: [],
            newdata: [],
            masterList: [],
            rimapId: "",
            showMapping: false,
            showRetentionflag: false,
            SelectedId: "",
            QuotaShare: false,
            surplus: false,
            rimappingId: "",
            Policydto: {
                policynumber: ""
            },
            CalculationDTO: {
                //policynumber: "",
                policystartdate: "",
                policyenddate: "",
                Name: "",
                Level: "",
                type: "",
                PremiumAmount: "",
                AllocationAmount: "",
                MapDetails: [

                    {
                        Type: "",
                        Percentage: "",
                        Limit: "",
                        AllocationBasis: "",
                        NoOfLines: "",
                        AllocatedAmount: "",
                        AllocatedPremium: "",
                        Participant: [
                            {
                                ParticipantId: "",
                                Branch: "",
                                Share: "",
                                CommissionRate: "",
                                BrokerageRate: "",
                                Commission: "",
                                Brokerage: "",
                                AllocatedAmount: "",
                                AllocatedPremium: ""
                            }
                        ]
                    },
                    {
                        Type1: "",
                        Percentage: "",
                        Limit: "",
                        AllocationBasis: "",
                        NoOfLines: "",
                        AllocatedAmount: "",
                        AllocatedPremium: "",
                        Participant: [
                            {
                                ParticipantId: "",
                                Branch: "",
                                Share: "",
                                CommissionRate: "",
                                BrokerageRate: "",
                                Commission: "",
                                Brokerage: "",
                                AllocatedAmount: "",
                                AllocatedPremium: ""
                            }
                        ]
                    },
                    {
                        Type2: "",
                        Percentage: "",
                        Limit: "",
                        AllocationBasis: "",
                        NoOfLines: "",
                        AllocatedAmount: "",
                        AllocatedPremium: "",
                        Participant: [
                            {
                                ParticipantId: "",
                                Branch: "",
                                Share: "",
                                CommissionRate: "",
                                BrokerageRate: "",
                                Commission: "",
                                Brokerage: "",
                                AllocatedAmount: "",
                                AllocatedPremium: ""
                            }
                        ]
                    }
                ]
            }
        };

    }
    onInputChange = (evt) => {
        debugger;
        const Data = this.state.CalculationDTO;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        const Data2 = this.state.CalculationDTO
        Data2[evt.target.name] = evt.target.value;
        this.setState({ Data2 });
        const Data3 = this.state.CalculationDTO.MapDetails[0];
        Data3[evt.target.name] = evt.target.value;
        this.setState({ Data3 });
        const Data4 = this.state.CalculationDTO.MapDetails[1];
        Data4[evt.target.name] = evt.target.value;
        this.setState({ Data4 });
        const Data1 = this.state.Policydto;
        Data1[evt.target.name] = evt.target.value;
        this.setState({ Data1 });
        console.log("Data", this.state.CalculationDTO)
        //console.log("Data1", this.state.Policydto)
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
                this.state.CalculationDTO.Name = data.Name;
                this.state.CalculationDTO.Level = data.Level;
                this.state.CalculationDTO.AllocationAmount = data.AllocationAmount;
                this.state.CalculationDTO.PremiumAmount = data.PremiumAmount;
                
                 //datalist = data.MapDetails;                
                //console.log("masterdata", data);
                //this.state.masterList = data.MapDetails;
                this.setState({ masterList: data.mapDetails, qoutaflag:true});

                console.log("masterdata", this.state.masterList);
               // console.log(datalist, 'new1');
                
            });
        //console.log(datalist, 'new');
        //this.setState({ masterList });
        console.log("masterdata1", this.state.masterList);
    }
    
    onChangeTreaty = (index) => {
        let indexlist = this.state.indexList;
        indexlist.push(index);
        this.setState({ indexlist });

        console.log("indexList", this.state.indexList);
       
    }
    onChangeTreaty1 = () => {
        this.setState({ surplus: true });
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
                                <CustomInput
                                    labelText="Product Name"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    value={this.state.CalculationDTO.Name}
                                    name='Name'
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
                                    value={this.state.CalculationDTO.Level}
                                    name='Level'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            {/* <GridItem xs={12} sm={12} md={3}>
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

                            </GridItem> */}
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="SumInsured"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    value={this.state.CalculationDTO.AllocationAmount}
                                    name='AllocationAmount'
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
                                    value={this.state.CalculationDTO.PremiumAmount}
                                    name='PremiumAmount'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>

                    </CardBody>
                </Card>
                
               
                {this.state.qoutaflag && this.state.masterList.map(item => {

                    return (<div>
                        {item.Type == "Retention" &&

                            <Card>

                                <CardHeader color="rose" icon>

                                    <h4 className={this.props.cardIconTitle}>
                                        <small> {item.Type} </small>
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                <GridContainer>

                                    <GridItem xs={12} sm={12} md={3}> <CustomInput
                                        labelText="Retention %"
                                        name="Type"
                                        value={item.Percentage}
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}> <CustomInput
                                        labelText="Retention Allocation SI"
                                        name="AllocatedAmount"
                                        value={item.AllocatedAmount}
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}> <CustomInput
                                        labelText="Limit"
                                        name="Limit"
                                        value={item.Limit}
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}> <CustomInput
                                        labelText="Premium Amount"
                                        name="AllocatedPremium"
                                        value={item.AllocatedPremium}
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}> <CustomInput
                                        labelText="Adjustment %"
                                        //name="amount"
                                        //value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].amount}
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}> <CustomInput
                                        labelText="Reallocated SI"
                                        name="retentionadded"
                                        //value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].retentionadded}
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}> <CustomInput
                                        labelText="Reallocated Limit"
                                        name="deallocatedretention"
                                        //value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].deallocatedretention}
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}> <CustomInput
                                        labelText="Reallocated Amount"
                                        name="deallocatedretention"
                                        //value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[0].deallocatedretention}
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>

                                </GridContainer>


                                </CardBody>


                            </Card>
                        }

                    
                    </div>);


                })}
                
                {this.state.qoutaflag && this.state.masterList.map((item,key) => {
                 
                    return (<div>
                        {item.Type == "QS" &&
                            <Card>

                                <CardHeader color="rose" icon>

                                    <h4 className={this.props.cardIconTitle}>
                                    <small> QuotaShare/Obligatory </small>
                                    </h4>
                                </CardHeader>
                               
                                <CardBody>

                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Type"
                                            name="Type1"
                                            value={item.Type}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Treaty Group Name"
                                            name="treatyshare"
                                            //value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].treatyshare}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Allocation SI"
                                            name="AllocationAmount"
                                        value={item.AllocatedAmount}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Allocation Premium"
                                            name="AllocatedPremium"
                                        value={item.AllocatedPremium}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Treaty Share"
                                            name="limit2"
                                            value={item.Percentage}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Limit"
                                            name="Limit"
                                            value={item.Limit}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>


                                    </GridContainer>

                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                        <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onChangeTreaty(key)}>TreatyDetails</Button>

                                        </GridItem>

                                    </GridContainer>

                                    {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                                </CardBody>
                               


                            </Card>
                        }
                        {item.Type == "QS"
                            && (this.state.indexList.findIndex(s=>s==key)!=-1?true:false) &&
                        <GridContainer xl={12}>
                            <GridItem lg={12}>



                                <ReactTable
                                    title={"QuotaShare/Obligatory"}
                                    data={item.participants}
                                    filterable
                                    columns={[
                                        {
                                            Header: "Participant",
                                            accessor: "ParticipantId",
                                            Width: "20px"

                                        },
                                        {
                                            Header: "Share",
                                            accessor: "Share",

                                        },
                                        {
                                            Header: "Amount",
                                            accessor: "AllocatedAmount",
                                            //Width: "10px"
                                        },
                                        {
                                            Header: "Premium",
                                            accessor: "AllocatedPremium",
                                            //Width: "20px"
                                        },
                                        {
                                            Header: "Brokerage",
                                            accessor: "Brokerage",
                                            //Width: "10px"
                                        },
                                        {
                                            Header: "Commission",
                                            accessor: "Commission",
                                            //Width: "10px"
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





                        </GridContainer>}
                       </div> );
                    

                })}
                {this.state.qoutaflag && this.state.masterList.map((item,key) => {

                    return (<div>
                        {item.Type == "Surplus" &&

                        <Card>

                            <CardHeader color="rose" icon>

                                <h4 className={this.props.cardIconTitle}>
                                    <small> {item.Type} </small>
                                </h4>
                            </CardHeader>
                                <CardBody>

                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Type"
                                            name="Type1"
                                            value={item.Type}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Treaty Group Name"
                                            name="treatyshare"
                                            //value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].treatyshare}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Allocation SI"
                                            name="AllocationAmount"
                                        value={item.AllocatedAmount}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Allocation Premium"
                                            name="AllocatedPremium"
                                        value={item.AllocatedPremium}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Treaty Share"
                                            name="TreatyShare"
                                            value={item.Percentage}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Lines"
                                            name="Lines"
                                            value={item.NoOfLines}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>


                                    </GridContainer>

                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                            <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onChangeTreaty(key)}>TreatyDetails</Button>

                                        </GridItem>

                                    </GridContainer>

                                    {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                                </CardBody>
                            

                            </Card>
                        }

                        {
                            item.Type == "Surplus" &&
                            (this.state.indexList.findIndex(s => s == key) != -1 ? true : false)  &&
                            <GridContainer xl={12}>
                                <GridItem lg={12}>



                                    <ReactTable
                                        title={"Surplus"}
                                        data={item.participants}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Participant",
                                                accessor: "ParticipantId",
                                                Width: "20px"

                                            },
                                            {
                                                Header: "Share",
                                                accessor: "Share",

                                            },
                                            {
                                                Header: "Amount",
                                                accessor: "AllocatedAmount",
                                                //Width: "10px"
                                            },
                                            {
                                                Header: "Premium",
                                                accessor: "AllocatedPremium",
                                                //Width: "20px"
                                            },
                                            {
                                                Header: "Brokerage",
                                                accessor: "Brokerage",
                                                //Width: "10px"
                                            },
                                            {
                                                Header: "Commission",
                                                accessor: "Commission",
                                                //Width: "10px"
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





                            </GridContainer>}
                    </div>);


                })}


            </div>
        );
    }
}

export default withStyles(style)(Reallocation);