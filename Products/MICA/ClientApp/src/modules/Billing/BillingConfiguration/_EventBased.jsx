import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardBody from "components/Card/CardBody.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import { Animated } from "react-animated-css";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ReactTable from "react-table";
import Add from "@material-ui/icons/AddCircleOutline";
import Delete from "@material-ui/icons/Delete";


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
class EventBased extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    };
//const EventBased = (props) => {
//    let classes = props.classes;
    //console.log("props coming", props);
    //const prop = props.props;
    //console.log("props.props", prop);
    //console.log("index", props.index);
    //prop.billingItem[props.index].eventMappingId = prop.objecteventVal[0];
    //console.log("eventmapping", prop.billingItem[props.index].eventMappingId);
    //console.log("valuefactor: ", prop.ValueFactor[props.index]['valueFactorlist']);
    //if (this.props.sendbillingid != null) {
    //    if (this.props.sendbillingid != "") {
    //        const prop = props;
    //    }
    //}
    //else {

    //}


    SetCategory = ((type, event, index) => {
        debugger
        console.log("catelog index: ", index);
        console.log("value: ", event.target.value);
        let billingItem = this.props.props.billingItem;

        let name = event.target.name;
        let value = event.target.value;
        billingItem[index][name] = value;
       // console.log("categoryid:", this.state.billingItem[index].categoryTypeId);
        this.setState({ billingItem });
        //this.change(event, name, type);
        const showList = this.props.props.showlist[index];
        if (event.target.value == 10) {
            this.props.props.billingItem[index].rateTypeId = "";
            showList['disableRate'] = false;

            //showList['catddl'] = true;
            showList['catCount'] = true;
            showList['CountRate'] = true;
            showList['valuefactor'] = false;
            showList['rate'] = false;
            showList['eventtable'] = false;
            showList['addibtn'] = false;

        }

        if (event.target.value == 11) {
            this.props.props.billingItem[index].rateTypeId = "";
            if (this.props.props.objecteventVal[0] != 2) {
                let mappingid = this.props.props.objectVal;
                this.GetValueFactor(mappingid, index);
            }
            //showList['catddl'] = true;
            showList['catCount'] = true;
            showList['CountRate'] = true;
            showList['valuefactor'] = true;
            showList['rate'] = false;
            showList['eventtable'] = false;
            showList['addibtn'] = false;

        }
        if (event.target.value == 12) {
            //this.state.billingItem[index].rateTypeId = "";
            //showList['disableRate'] = false;

            showList['catCount'] = true;
            showList['CountRate'] = true;
            // showList['valuefactor'] = false;
            showList['rate'] = false;
            //showList['eventtable'] = false;
            // showList['addibtn'] = false;
        }
        if (event.target.value == 13) {
            this.props.props.billingItem[index].rateTypeId = "15";

            // showList['disableRate'] = true;

            // showList['valuefactor'] = false;
            showList['rate'] = true;
            showList['eventtable'] = false;
            showList['addibtn'] = false;
        }
        if (event.target.value == 14) {
            // this.state.billingItem[index].rateTypeId = "";
            showList['disableRate'] = false;

            showList['catCount'] = true;
            showList['CountRate'] = true;
            // showList['valuefactor'] = true;
            showList['rate'] = false;
            //showList['eventtable'] = false;
            //showList['addibtn'] = false;
        }
        if (event.target.value == 15) {

            showList['ratedisplay'] = true;
            showList['percentdisplay'] = false;
            showList['eventtable'] = true;
            showList['addibtn'] = true;

        }
        if (event.target.value == 16) {
            if (this.props.props.billingItem[index].rateCategoryId == "12" || this.props.props.billingItem[index].rateCategoryId == "14") {

                showList['ratedisplay'] = false;
                showList['percentdisplay'] = true;
                showList['eventtable'] = true;
                showList['addibtn'] = true;
            }
        }
        this.setState({ showList });
        this.setState({});
        //console.log("categoryid:", this.state.billingItem[index].categoryTypeId);
        //console.log("showlist", this.state.showlist, this.state.billingItem);
    })
    SetRate = ((type, event, index) => {
        this.setState({ disableRate: false });
        console.log("catelog index: ", index);
        console.log("value: ", event.target.value);
        let billingItem = this.props.props.billingItem;
        let name = event.target.name;
        let value = event.target.value;
        billingItem[index][name] = value;
        this.setState({ billingItem });
        //this.change(event, name, type);
    })
    addrowBtn = (event, index) => {

        console.log("addbtn index: ", index);
        if (this.state.count > 0) {
            let len = this.props.props.billingItem[index].tblBillingItemDetail.length - 1;
            let x = eval(this.props.props.billingItem[index].tblBillingItemDetail[len].to) + 1;

            if (this.props.props.billingItem[index].rateTypeId == "15") {
                //let len = this.state.billingItem[index].tblBillingItemDetail.length - 1;
                //let x = eval(this.state.billingItem[index].tblBillingItemDetail[len].to) + 1;
                this.props.props.billingItem[index].tblBillingItemDetail = this.props.props.billingItem[index].tblBillingItemDetail.concat({ from: x, to: "", amount: "" });
                this.props.props.billingItem[index].BillingItemDetail = this.props.props.billingItem[index].BillingItemDetail.concat({ from: x, to: "", amount: "" });
            }
            else if (this.props.props.billingItem[index].rateTypeId == "16" && this.props.props.billingItem[index].rateCategoryId == "14") {
                //let length = this.state.billingItem[index].BillingItemDetail.length-1;
                let previouspercent = Number(this.props.props.billingItem[index].tblBillingItemDetail[len].ratePercent);
                let previouscumulative = Number(this.props.props.billingItem[index].tblBillingItemDetail[len].cumulative);
                console.log("previouscumulative", this.props.props.billingItem[index].tblBillingItemDetail[len].cumulative);
                console.log("previouspercent", this.props.props.billingItem[index].tblBillingItemDetail[len].ratePercent);
                let addper = previouscumulative + previouspercent;

                this.props.props.billingItem[index].tblBillingItemDetail = this.props.props.billingItem[index].tblBillingItemDetail.concat({ from: x, to: "", ratePercent: "", cumulative: addper });
                this.props.props.billingItem[index].BillingItemDetail = this.props.props.billingItem[index].BillingItemDetail.concat({ from: x, to: "", ratePercent: "", cumulative: addper });

            }
            else {

                this.props.props.billingItem[index].tblBillingItemDetail = this.props.props.billingItem[index].tblBillingItemDetail.concat({ from: x, to: "", ratePercent: "" });
                this.props.props.billingItem[index].BillingItemDetail = this.props.props.billingItem[index].BillingItemDetail.concat({ from: x, to: "", ratePercent: "" });
            }
        }
        this.state.count = this.state.count + 1;
        this.eventTable(index);

    }
    eventTable = (index) => {

        console.log("table index: ", index, this.props.props.billingItem[index]);
        console.log("billingitemdetails:", this.props.props.billingItem[index].BillingItemDetail);
        if (this.props.props.billingItem[index].rateTypeId == "15") {

            this.props.props.billingItem[index].BillingItemDetail = this.props.props.billingItem[index].BillingItemDetail.map((prop, key) => {
                return {
                    SNo: key + 1,
                    From: < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].from} disabled={this.props.props.viewdisable} name="from" onChange={(e) => this.setBenifitValue('from', e, key, index)} formControlProps={{ fullWidth: true }} />,
                    To: < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].to} disabled={this.props.props.viewdisable} name="to" onChange={(e) => this.setBenifitValue('to', e, key, index)} formControlProps={{ fullWidth: true }} />,
                    Amount: < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].amount} disabled={this.props.props.viewdisable} name="amount" onChange={(e) => this.setBenifitValue('amount', e, key, index)} formControlProps={{ fullWidth: true }} />,
                    btn: <div> <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, index)}><Add /></Button>
                        <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteChannel(e, key, index)} ><Delete /> </Button ></div>
                };
            })
        }
        else if (this.props.props.billingItem[index].rateTypeId == "16" && this.props.props.billingItem[index].rateCategoryId == "14") {

            this.props.props.billingItem[index].BillingItemDetail = this.props.props.billingItem[index].BillingItemDetail.map((prop, key) => {
                return {
                    SNo: key + 1,
                    //: < CustomInput value={prop.seqNo} disabled={this.state.viewdisable} name="seqNo" onChange={(e) => this.setBenifitValue('seqNo', e, key)} formControlProps={{ fullWidth: true }} />,
                    From: < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].from} disabled={this.props.props.viewdisable} name="from" onChange={(e) => this.setBenifitValue('from', e, key, index)} formControlProps={{ fullWidth: true }} />,
                    To: < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].to} disabled={this.props.props.viewdisable} name="to" onChange={(e) => this.setBenifitValue('to', e, key, index)} formControlProps={{ fullWidth: true }} />,
                    RatePercent: <GridContainer>
                        <GridItem xs={12} sm={12} md={4} lg={4}>
                            < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].cumulative} disabled={true} name="cumulative" onChange={(e) => this.setBenifitValue('cumulative', e, key, index)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <span id="slab-concat"> + </span>
                        <GridItem xs={12} sm={12} md={4} lg={6}>
                            < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].ratePercent} disabled={this.props.props.viewdisable} name="ratePercent" onChange={(e) => this.setBenifitValue('ratePercent', e, key, index)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                    </GridContainer>,
                    btn: <div> <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, index)}><Add /></Button>
                        <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteChannel(e, key, index)} ><Delete /> </Button ></div>
                };
            })
        }
        else {
            this.props.props.billingItem[index].BillingItemDetail = this.props.props.billingItem[index].BillingItemDetail.map((prop, key) => {
                return {
                    SNo: key + 1,
                    //: < CustomInput value={prop.seqNo} disabled={this.state.viewdisable} name="seqNo" onChange={(e) => this.setBenifitValue('seqNo', e, key)} formControlProps={{ fullWidth: true }} />,
                    From: < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].from} disabled={this.props.props.viewdisable} name="from" onChange={(e) => this.setBenifitValue('from', e, key, index)} formControlProps={{ fullWidth: true }} />,
                    To: < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].to} disabled={this.props.props.viewdisable} name="to" onChange={(e) => this.setBenifitValue('to', e, key, index)} formControlProps={{ fullWidth: true }} />,
                    RatePercent: < CustomInput value={this.props.props.billingItem[index].BillingItemDetail[key].ratePercent} disabled={this.state.viewdisable} name="ratePercent" onChange={(e) => this.setBenifitValue('ratePercent', e, key, index)} formControlProps={{ fullWidth: true }} />,
                    btn: <div> <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, index)}><Add /></Button>
                        <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteChannel(e, key, index)} ><Delete /> </Button ></div>
                };
            })
        }

        this.setState({});

        console.log("details:", this.props.props.billingItem[index].BillingItemDetail);
    }

    setBenifitValue = (columnName, event, index, i) => {

        console.log("columnName", columnName, event);
        let responses = [...this.props.props.billingItem[i].tblBillingItemDetail];


        if (columnName === 'from') {
            responses[index].from = event.target.value;
        }
        if (columnName === 'to') {
            responses[index].to = event.target.value;
        }
        if (columnName === 'amount') {
            responses[index].amount = event.target.value;
        }

        if (columnName === 'ratePercent') {
            responses[index].ratePercent = event.target.value;
        }

        if (columnName === 'cumulative') {
            responses[index].cumulative = event.target.value;
        }
        this.setState({ responses });
        console.log("tblBillingItemDetail", this.props.props.billingItem[i].tblBillingItemDetail)
        this.eventTable(i);


    }
    deleteChannel = (event, index, i) => {


        this.state.billingItem[i].tblBillingItemDetail.splice(index, 1);
        this.state.billingItem[i].BillingItemDetail.splice(index, 1);
        this.setState({});
        this.eventTable(i);

    }


    render() {
        const { classes } = this.props;
        console.log("props coming", props);
        const prop = this.props.props;
        const props = this.props;
        console.log("props.props", prop);
        console.log("index", props.index);
    return (

        <CardBody>

            <GridContainer>
                {prop.showlist[props.index]['catddl'] && <GridItem xs={12} sm={12} md={4}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <MasterDropdown
                            labelText="Category/Type"
                            id="Category"
                            disabled={prop.showlist[props.index]['disableRate']}
                            value={prop.billingItem[props.index].categoryTypeId}
                            lstObject={prop.masterList}
                            required={true}
                            filterName='CategoryType'
                            model="billingItem"
                            name='categoryTypeId'
                            onChange={(e) => this.SetCategory("string", e, props.index)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        /></Animated>
                </GridItem>}

                {/* {prop.showlist[props.index]['valuefactor'] && <GridItem xs={12} sm={12} md={4}  >

                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <MasterDropdown
                            labelText="Value Factor"
                            id="Value Factor"
                            value={prop.billingItem[props.index].valueFactorId}
                            lstObject={prop.masterList}
                            required={true}
                            filterName='ValueFactor'
                            model="billingItem"
                            name='valueFactorId'
                            onChange={(e) => prop.SetCategory("string", e, props.index)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        /></Animated>


                </GridItem>
                } */}
                {prop.showlist[props.index]['valuefactor'] && <GridItem xs={12} sm={12} md={4}  >

                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Dropdown
                            labelText="Value Factor"
                            id="Value Factor"
                            value={prop.billingItem[props.index].valueFactorId}
                            lstObject={prop.ValueFactor[props.index]['valueFactorlist']}
                            required={true}
                            name='valueFactorId'
                            onChange={(e) => this.SetCategory("string", e, props.index)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </Animated>
                </GridItem>
                }


                {prop.showlist[props.index]['catCount'] && <GridItem xs={12} sm={12} md={4} >
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <MasterDropdown
                            labelText="Rate Category"
                            id="Rate Category"
                            value={prop.billingItem[props.index].rateCategoryId}
                            lstObject={prop.masterList}
                            required={true}
                            filterName='RateCategory'
                            model="billingItem"
                            name='rateCategoryId'
                            onChange={(e) => this.SetCategory("string", e, props.index)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        /> </Animated>
                </GridItem>
                }

                {prop.showlist[props.index]['CountRate'] && <GridItem xs={12} sm={12} md={4}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <MasterDropdown
                            labelText="Rate Type"
                            id="Rate Type"
                            disabled={prop.showlist[props.index]['disableRate']}
                            value={prop.billingItem[props.index].rateTypeId}
                            lstObject={prop.masterList}
                            required={true}
                            filterName='RateType'
                            model="billingItem"
                            name='rateTypeId'
                            onChange={(e) => this.SetCategory("string", e, props.index)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        /> </Animated>
                </GridItem>}





                {prop.showlist[props.index]['rate'] && <GridItem xs={12} sm={12} md={4}>

                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <CustomInput
                            success={prop.rateState === "success"}
                            error={props.rateState === "error"}
                            labelText="Rate(Amount)"
                            name="rate"
                            value={prop.billingItem[props.index].rate}
                            onChange={(e) => this.SetRate("number", e, props.index)}
                            id="Rate"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </Animated>

                </GridItem>}




                <GridItem xs={12} sm={12} md={4}>
                    <div id="treshold" style={{ display: 'none' }} >
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <CustomInput
                                labelText="Treshold"
                                //value={prop.billingItem[props.index].threshold}
                                name="threshold"
                                onChange={(e) => prop.SetCategory("string", e, props.index)}
                                id="Treshold"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            /> </Animated>

                    </div>
                </GridItem>
            </GridContainer>
            <GridContainer justify="center">
                {prop.showlist[props.index]['addibtn'] && <GridItem>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={(e) => this.addrowBtn(e, props.index)}>
                            Add Item
                                               </Button>
                    </Animated>
                </GridItem>}
            </GridContainer>
            <GridContainer justify="center">
                {prop.showlist[props.index]['eventtable'] && <GridItem>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                        <ReactTable
                            data={prop.billingItem[props.index].BillingItemDetail}
                            filterable
                            columns={[
                                {
                                    Header: " S No",
                                    accessor: "SNo",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,

                                },
                                {
                                    Header: "From",
                                    accessor: "From",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,

                                },
                                {

                                    Header: "To",
                                    accessor: "To",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,

                                },
                                {
                                    Header: "Amount",
                                    accessor: "Amount",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,
                                    //disabled: prop.ratedisplay,
                                    show: prop.showlist[props.index]['ratedisplay'],
                                },
                                {
                                    Header: "Rate (%)",
                                    accessor: "RatePercent",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 250,
                                    //disabled: prop.percentdisplay,
                                    show: prop.showlist[props.index]['percentdisplay'],
                                },
                                {
                                    Header: "",
                                    accessor: "btn",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 150,
                                  //  resizable: false,
                                },


                            ]}
                            defaultPageSize={5}
                            showPaginationTop={false}
                           // pageSize={([prop.billingItem[props.index].BillingItemDetail.length + 1] < 5) ? [prop.billingItem[props.index].BillingItemDetail.length + 1] : 5}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        />

                    </Animated>
                </GridItem>}
            </GridContainer>


        </CardBody>


        );
    }
}

export default withStyles(style)(EventBased);

{/* <GridContainer justify="center">
                            <GridItem>
                                <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={prop.saverowsBtn}>
                                    Save
                                </Button>
                            </GridItem>
                        </GridContainer> */}