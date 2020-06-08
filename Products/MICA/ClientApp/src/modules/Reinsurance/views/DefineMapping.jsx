import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import mapping from "assets/img/mapping.png";
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
import Add from "@material-ui/icons/AddCircleOutline";
import Delete from "@material-ui/icons/Delete";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import swal from 'sweetalert';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
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

class DefineMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DefineDTOTableData: [],
            flag: true,
            flagUpdate: false,
            DefineDTOData: [{
                "treatyCode": "",
                "treatydescription": "",
                "treatyGroupId": "",
                "treatyType": "",
                "sequence": ""
            }],
            treatymasterlist: [],
            treatycodemasterlist: [],
            tretyMasterData:[],
            treatydata: [],
            masterList: [],
            yearmasterlist: [],
            mappingDetail: [
                {
                    retentionGroupId: "",
                    treatyGroupId:"",
                    sequenceNo: ""
                }
            ],
            Mapping: {
                year: "",
                level: "",
                lobProductCover: "",
                retensionGroupId: "",
                //SequenceNumber:""
                TblRimappingDetail: []
                
            }
        };
    }


    settreatyGroupId = (event, index) => {
        console.log(index, 'Index');
        let name = event.target.name;
        let value = event.target.value;
        let treatyGridData = this.state.DefineDTOData;

        treatyGridData[index][name] = value;

        this.setState({ treatyGridData });
        let SendValue = parseInt(value);
        console.log(value,'value')
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetDescriptionRIGrid?treatyid=` + SendValue, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                
                this.setState({ treatydata: data });
                console.log("treatydata: ", this.state.treatydata);
                this.state.DefineDTOData[index].treatydescription = data[0].treatyDescription;


                this.setState({});

                this.AddTreatyTable();
                console.log("Descripion1 ", this.state.treatydata, this.state.DefineDTOData);
            });
        let c = this.state.DefineDTOData[index].treatyCode;
        debugger;
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/TreatyCode?treatyId=` + c, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);

                this.setState({ treatycodemasterlist: data });
                this.AddTreatyTable();
                console.log("treatycodemasterlist", this.state.treatycodemasterlist)

            });
        //this.state.DefineDTOData[index].treatydescription = this.state.treatydata.treatyDescription;
        //console.log("Descripion ", this.state.treatydata);
        console.log("Descripion1 ", this.state.treatydata, this.state.DefineDTOData);
    }
    

    settreatygroup = (event, index) => {
        //let name = event.target.name;
        //let value = event.target.value;
        
        //let treatyGridData = this.state.DefineDTOData;

        //treatyGridData[index][name] = value;
        debugger
        //this.setState({ treatyGridData });
        console.log(index, 'Index');
        let name = event.target.name;
        let value = event.target.value;
        let treatyGridData = this.state.DefineDTOData;

        treatyGridData[index][name] = value;

        this.setState({ treatyGridData });
        let SendValue = parseInt(value);
        console.log(value, 'value')
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetDescriptionRIGrid?treatyid=` + this.state.DefineDTOData[0].treatyCode, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {

                this.setState({ treatydata: data });
                console.log("treatydata: ", this.state.treatydata);
                this.state.DefineDTOData[index].treatyType = data[0].treatyType;


                this.setState({});

                this.AddTreatyTable();
                console.log("Descripion1 ", this.state.treatydata, this.state.DefineDTOData);
            });

        //this.state.DefineDTOData[index].treatydescription = this.state.treatydata.treatyDescription;
        //console.log("Descripion ", this.state.treatydata);
        console.log("Descripion1 ", this.state.treatydata, this.state.DefineDTOData);

    }

    handletreatygrid = (event, index) => {
        let name = event.target.name;
        let value = event.target.value;
        let treatyGridData = this.state.DefineDTOData;

        treatyGridData[index][name] = value;

        this.setState({ treatyGridData });
    }

    componentDidMount() {
        const props = this.props;
        console.log("porpsdat", props)
        console.log(props.rimappingId, 'DataID');
        if (props.rimappingId != undefined) {
            console.log(this.props.flagEdit, 'FlagEditProps');
            this.setState({ flag: false, flagUpdate: this.props.flagUpdate });
            //fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyRImapping?rimappingId=` + this.props.rimappingId, {
            //    method: 'PUT',
            //    headers: {
            //        'Accept': 'application/json',
            //        'Content-Type': 'application/json',
            //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            //    },
            //})
            //    .then(response => response.json())
            //    .then(data => {
            //        this.setState({ Mapping: data });
            //        console.log(data, 'Mydata')
            //        console.log("Accountss data: ", data);
            //    });
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetRImappingBYId?RImappingById=` + this.props.rimappingId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                //  body: JSON.stringify(this.state.SearchParticipant)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ Mapping: data });
                    console.log(data, 'MyData1');
                    console.log(this.state.Mapping, 'Data1');
                });
        }

        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/TreatyName`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ treatymasterlist: data });
                this.AddTreatyTable();
                console.log("treatymasterlist", this.state.treatymasterlist)
            });
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MasterYearData`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("yearmasterlist: ", data);
                this.setState({ yearmasterlist: data });
            });
        console.log("data", this.state.masterList);
        //let c = this.state.DefineDTOData[0].treatyCode;
        //debugger;
        //fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/TreatyCode?treatyId=` + c, {
        //    method: 'get',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log("masterList: ", data);

        //        this.setState({ treatycodemasterlist: data });
        //        this.AddTreatyTable();
        //        console.log("treatycodemasterlist", this.state.treatycodemasterlist)

        //    });
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/RetentionGroup`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
                this.AddTreatyTable();
            });
        console.log("data", this.state.masterList);

   
    }
    onInputChange = (evt) => {
        const Data = this.state.Mapping;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });

        console.log("Data", this.state.Mapping)

    }
    onInputChange1 = (evt) => {
        let Data = this.state.mappingDetail[0];
      
        Data[evt.target.name] = evt.target.value;

        this.setState({ Data });
        //
        //let arr = this.state.Mapping;
        // arr[0].push(this.state.mappingDetail);
        console.log("Data", this.state.mappingDetail)
        console.log("Data1111", this.state.Mapping)
    }
    reset = () => {
        //Setting States After Saving
        let MappingDto = this.state.Mapping;
        let MappingDto1 = this.state.Mapping.TblRimappingDetail
        MappingDto['year'] = "";
        MappingDto['level'] = "";
        MappingDto['LobProductCover'] = "";
        MappingDto1['retentionGroupId'] = "";
        


        this.setState({ MappingDto, MappingDto1});

        //let status = this.state;
        //status['accountNameState'] = "";
        //status['accountDescState'] = "";
        //this.setState({ status });
    }
    onFormSubmit = (evt) => {

        this.state.Mapping.TblRimappingDetail = this.state.DefineDTOData;
        this.setState({});
        console.log("submit", this.state.Mapping);

        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SaveRIMapping`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.Mapping)
        }).then(response => response.json()) 
            .then(data => {
                if (data.status == 2) {
                    debugger;
                    this.reset();
                    swal({

                        //   title: "Perfect",

                        //text: data.responseMessage,
                        text: "Data Saved Successfully",
                        icon: "success"
                    });
                    this.setState({ errormessage: false });
                    //this.HandleApi();
                    //this.setState({ redirect: true });
                    //this.renderRedirect();
                } else if (data.status == 8) {

                    swal({
                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                } else if (data.status == 4) {

                    swal({
                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                }
            });
    }
    AddTreatyRecord = (event, index) => {

        //if (this.state.treatydata[index].treatyGroup !== "" && this.state.treatydata[index].businessTypeId !== "" ) {
        let TreatyDetails = this.state;
        TreatyDetails['DefineDTOTableData'] = this.state.DefineDTOTableData.concat({ treatyGroup: "", businessTypeId: "" });
        TreatyDetails['DefineDTOData'] = this.state.DefineDTOData.concat({ treatyGroup: "", businessTypeId: "" });

        this.setState({ TreatyDetails });
        let mappingdeatils = this.state;
        mappingdeatils['DefineDTOData'] = this.state.DefineDTOData.concat({
            "treatyGroupId": "",
        });
        this.setState({ mappingdeatils });
        //console.log("treatydata", this.state.treatydata[index].treatyGroup, this.state.treatydata);
        console.log("add defination", this.state.DefineDTOData);
        this.AddTreatyTable();

        // }
    }
    onInputBranchesChange = (event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        //this.state.treatydata[name] = value;
        //this.setState({ treatydata})


        let treatydata = this.state.DefineDTOData;

        treatydata[index][name] = value;

        this.setState({ treatydata });
        this.AddTreatyTable();
    }
    deleteTreatyRecord = (event, index) => {

        let deldata = this.state.DefineDTOTableData.splice(index, 1);
        this.state.DefineDTOData.splice(index, 1);
        //let deldata = this.state.treatydata.filter(item => item.treatyGroup !== index);
        this.setState({ deldata })
        console.log("deldata", this.state.deldata);
        this.AddTreatyTable();
    }
    AddTreatyTable = () => {




        this.setState({
            DefineDTOTableData: this.state.DefineDTOData.map((prop, key) => {
                //console.log("this.ProductDetails.productChannel[key].channelTypeId", key, con, this.ProductDetails.productChannel[key].channelTypeId, this.state.chindex + 1);
                return {
                    SNo: key + 1,
                    Treatycode: <MasterDropdown labelText="TreatyCode" id="MaritalStatus" lstObject={this.state.treatymasterlist} filterName='TratyGroup' value={this.state.DefineDTOData[key].treatyCode} name='treatyCode' onChange={(e) => this.settreatyGroupId(e, key)} formControlProps={{ fullWidth: true }} />,
                    TreatyDescription: <CustomInput labelText="TreatyDescription" value={this.state.DefineDTOData[key].treatydescription} name="treatydescription" onChange={(e) => this.handletreatygrid(e, key)} formControlProps={{ fullWidth: true }} />,
                    Treatygroup: <MasterDropdown labelText="TreatyGroup" filterName='TreatyGroupName' lstObject={this.state.treatycodemasterlist} value={this.state.DefineDTOData[key].treatyGroupId} name='treatyGroupId' formControlProps={{ fullWidth: true }} onChange={(e) => this.settreatygroup(e, key)} />,
                    Treatytype: <CustomInput labelText="TreatyType" value={this.state.DefineDTOData[key].treatyType} name="treatyType" onChange={(e) => this.handletreatygrid(e, key)} formControlProps={{ fullWidth: true }} />,
                    Sequence: <CustomInput labelText="Sequence" value={this.state.DefineDTOData[key].Sequence} name="Sequence" onChange={(e) => this.handletreatygrid(e, key)} formControlProps={{ fullWidth: true }} />,
                    Actions: < div > <Button justIcon round simple color="info" className="add" onClick={(e) => this.AddTreatyRecord(e, key)} ><Add /> </Button >
                        <Button justIcon round simple color="danger" className="remove" onClick={(e) => this.deleteTreatyRecord(e, key)} ><Delete /> </Button >
                    </div >
                };
            })
        });
        //}
    }
    onFormModify = (id) => {
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyRImapping?rimappingId=` + this.props.rimappingId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.Mapping)
        }) //.then(response => response.json())
            .then(data => {
                console.log("data456", data);
                this.setState({ treatyDTO: data });
                swal({

                    text: "Data Updated Successfully",
                    icon: "success"
                });
                console.log("Treaty data:", this.state.Mapping);
            });
        //let flageUpdate = this.state.flagUpdate
        //this.setState({ flageUpdate:true})
    }

    render() {
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={mapping} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small><TranslationContainer translationKey="RI Mapping & Sequencing" /></small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Year"
                                    id="ddlstatus"
                                    lstObject={this.state.yearmasterlist}
                                    filterName='Year'
                                    value={this.state.Mapping.year}
                                    name='year'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />



                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Level"
                                    id="ContactNo"
                                    value={this.state.Mapping.level}
                                    name='level'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />


                            </GridItem> <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="LOBProductCover"
                                    id="ContactNo"
                                    value={this.state.Mapping.lobProductCover}
                                    name='lobProductCover'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />


                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem>
                                <Button id="button-search-partner" color="info" round>
                                    <TranslationContainer translationKey="Map" /> 
                                    </Button>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <CardHeader color="info" icon >

                                {
                                    <h3 >
                                        <small> <TranslationContainer translationKey="RetentionMapping" /></small>
                                    </h3>
                                }
                            </CardHeader>

                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="RetentionGroup"
                                    id="ddlstatus"
                                    lstObject={this.state.masterList}
                                    filterName='TratyCode'
                                    value={this.state.Mapping.retensionGroupId}
                                    name='retensionGroupId'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        //StyleType={true}
                                        //title={"Branch Details "}
                                        data={this.state.DefineDTOTableData}

                                        filterable

                                        //getTdProps={() => ({

                                        //    style: {

                                        //        overflow: 'visible',

                                        //    },

                                        //})}

                                        columns={[

                                            {

                                                Header: "SNo",

                                                accessor: "SNo",

                                                headerClassName: 'react-table-center',

                                                style: { textAlign: "center" },

                                                minWidth: 20,

                                                sortable: false,



                                                //  filterable: false

                                            },

                                            {



                                                Header: "TreatyCode",

                                                accessor: "Treatycode",

                                                minWidth: 40,

                                                // style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },

                                            {

                                                Header: "TreatyDescription",

                                                accessor: "TreatyDescription",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },
                                            {

                                                Header: "TreatyGroup",

                                                accessor: "Treatygroup",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },
                                            {

                                                Header: "TreatyType",

                                                accessor: "Treatytype",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },
                                            {

                                                Header: "Sequence",

                                                accessor: "Sequence",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },
                                            {

                                                Header: "Action",

                                                accessor: "Actions",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },

                                        ]}

                                        defaultPageSize={5}

                                        //pageSize={([TreatyData.TreatytableData.length + 2] < 5) ? [TreatyData.TreatytableData.length + 2] : 5}

                                        showPaginationTop={false}

                                        showPaginationBottom

                                        className="-striped -highlight long-tab"

                                    //loading={this.state.newdata}



                                    //   loadingText="coming"

                                    />







                                </Animated>


                            </GridItem>
                        </GridContainer>



                        <GridContainer justify="center">
                            {this.state.flag &&
                                <GridItem >
                                    <Button id="button-search-partner" color="info" round onClick={() => this.onFormSubmit()}>
                                        Save
                                    </Button>
                                </GridItem>}

                            {this.state.flagUpdate &&
                                <GridItem >
                                <center>
                                    <Button color="info" round onClick={this.onFormModify}><TranslationContainer translationKey="Update" /></Button>
                                </center>
                            </GridItem>}
                        </GridContainer>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(DefineMapping);