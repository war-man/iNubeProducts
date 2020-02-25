import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Button from "components/CustomButtons/Button.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';

import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";

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
    ...customCheckboxRadioSwitch,
    // ...profileStyles
};

//const itemStyle = { marginTop: "25px" }

class Mapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RateParam: [],
            //RiskParam: [
            //    {
            //        "mID": 147,
            //        "mValue": "FIR Document",
            //        "mType": null
            //    },
            //    {
            //        "mID": 148,
            //        "mValue": "Insured/Member Bank Account Number",
            //        "mType": null
            //    },
            //    {
            //        "mID": 187,
            //        "mValue": "Email",
            //        "mType": null
            //    },
            //    {
            //        "mID": 194,
            //        "mValue": "Policy Number",
            //        "mType": null
            //    }],
            RiskParam: [],
            mapDto: {
                RateParameter: "",
                rateName: "",
                RiskParameterName: "",
                riskName: "",
            },
            payTableFlag: false,
            mapList: [],
            addList: [],
            mappingListDto: {
                mapping: [],
            },
            result:[],
        };
    }
  
    componentDidMount() {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetHandleEventsMaster`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("RateParam: ", data);
                this.setState({ RateParam: data });
            });
        fetch(`${productConfig.productConfigUrl}/api/Product/GetRiskParam`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("RiskParam: ", data);
                this.setState({ RiskParam: data });
            });
        this.setState({ });
    }
    SetRateData = (type, event, index) => {
        console.log("map:", this.state.mapDto);
        const mapDto = this.state.mapDto;
        mapDto[event.target.name] = event.target.value;
        this.setState({ mapDto });
        console.log("name", event.target.name);
      //  this.change(event, event.target.name, type);
        console.log("map:", this.state.mapDto);

    }
    SetRiskData = (type, event, index) => {
        console.log("map:", this.state.mapDto);
     
        const mapDto = this.state.mapDto;
        mapDto[event.target.name] = event.target.value;
        this.setState({ mapDto });
        console.log("name", event.target.name);
        //  this.change(event, event.target.name, type);
        console.log("map:", this.state.mapDto);

    }
    handlePaymenttable = () => {
     
        this.setState({
            payTableFlag: true
        });

       // let len = this.state.PaymentDto.length - 1;
        //this.state.PaymentDto[len].invoiceId = this.state.InvoiceId;
        //this.state.PaymentDto[len].paymentDate = this.datechange(this.state.PaymentDto[len].paymentDate);
        this.addlist();
        this.payTable(this.state.addList);
       
        console.log("paymentdto:", this.state.mapDto);
    }

    addlist = () => {
  
        //this.state.mapDto = this.state.mapDto.concat({
        //    RateParameter: "",
        //    RiskParameterName: "",
        //}
        //)
        let rateval = this.state.RateParam.filter(x => x.mID == this.state.mapDto.RateParameter);
        let rval = rateval[0].mValue;
        let riskval = this.state.RiskParam.filter(x => x.mID == this.state.mapDto.RiskParameter);
        let rival = riskval[0].mValue;
        this.state.mapDto.rateName = rval;
        this.state.mapDto.riskName = rival;
        this.setState({});
        let obj = Object.assign({}, this.state.mapDto);
        this.state.addList.push(obj);
        //this.handlePaymenttable();
        console.log("mapDto:", this.state.addList, this.state.mapDto.RateParameterName);
    }
    payTable = (pay) => {
        this.setState({
            mapList: pay.map((prop, key) => {
                return {
                    SNo: key + 1,
                    RateParameter: prop.rateName,
                    RiskParameter: prop.riskName,
                   
                };
            })
        });
        // this.paidAmount();
    }

    handleSaveMap = () => {

        let mappingListDtos = this.state.mappingListDto;

        mappingListDtos['mapping'] = this.state.addList;

        this.setState({ mappingListDto: mappingListDtos });
        this.props.savemappingFun(mappingListDtos);
        fetch(`${productConfig.productConfigUrl}/api/Product/CreateMapping`, {
            method: 'Post',
            body: JSON.stringify(this.state.mappingListDto),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("result: ", data);
                this.setState({ result: data });
            });
    }

    render() {
        const { classes } = this.props;
   //     const prop = props.componentData;
        let index = this.state.mapDto.length - 1;
        console.log("index",index);
        return (
            <div>
            <GridContainer>
                <GridItem xs={12} sm={4}>
                      <Dropdown
                    labelText="Rate Parameter"
                    id="RateParameter"
                            value={this.state.mapDto.RateParameter}
                            lstObject={this.state.RateParam}
                    required={true}
                        name='RateParameter'
                            onChange={(e) => this.SetRateData("string", e, index)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />

                </GridItem>
                <GridItem xs={12} sm={4}>
                    <Dropdown
                        labelText="Risk Parameter"
                        id="RiskParameter"
                            value={this.state.mapDto.RiskParameter}
                        lstObject={this.state.RiskParam}
                        required={true}
                        name='RiskParameter'
                            onChange={(e) => this.SetRiskData("string", e, index)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                    <GridContainer justify="center">
                        <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handlePaymenttable} >
                            Add
                        </Button>
                    </GridContainer>
            </GridContainer>
                {
                    this.state.payTableFlag ?
                        <GridContainer>
                            <GridItem xs={12}>

                                <ReactTable
                                    data={this.state.mapList}
                                    filterable
                                    columns={[
                                        {
                                            Header: " S No",
                                            accessor: "SNo",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,

                                        },
                                        {
                                            Header: "Rate Parameter",
                                            accessor: "RateParameter",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,

                                        },
                                        {

                                            Header: "Risk Parameter",
                                            accessor: "RiskParameter",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },

                                    ]}
                                    defaultPageSize={3}
                                    showPaginationTop={false}
                                    //pageSize={([prop.paymentForInvoice.length + 1] < 5) ? [prop.paymentForInvoice.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />
                            </GridItem>
                      
                <GridContainer justify="center">
                    <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleSaveMap} >
                        Save
                        </Button>
                            </GridContainer>
                        </GridContainer> 
                        : null}
       </div>
        );
    }
}
export default withStyles(style)(Mapping);