import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SearchProduct from "modules/Partners/Partner/views/_SearchProduct.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
//import bindModel from 'components/ModelBinding/bindModel.js';
import Button from "components/CustomButtons/Button";
import partnerconfig from "modules/Partners/PartnerConfig.js";
import swal from 'sweetalert';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import searchproduct from "assets/img/search-product.png";
import partner from "assets/img/searching-a-person.png";
import Icon from "@material-ui/core/Icon";

//import TableCell from '@material-ui/core/TableCell';
import { Redirect } from 'react-router-dom';
//import partnerconfig from "modules/Partners/Partner/PartnerConfig.jsx";
//import validator from "node_modules/clean-css/lib/optimizer";
import { Animated } from "react-animated-css";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import $ from "jquery";
import CardBody from "../../../../components/Card/CardBody";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import { type } from "os";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CommonMessage from "Messages/CommonMessage.jsx";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});

const paddingCard =
{
    padding: "10px",
};

class AssignProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: false,
            nodata: false,
            loader: true,
            searchGrid: false,
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false,
            entryFlag: false,
            displaypartnersearch: false,
            topics: [],
            lob: "",
            dflag: false,
            masterList: [],
            people: [],
            listdata: [],
            pks: 10,
            ProductNameState:"",
            listerror: false,
            effectiveToerror: false,
            effectiveFromerror: false,
            assignDateerror: false,
            partnercodeState:"",
            partneridState:"",
            partnerNameState: "",
            ProductCodeState:"",
            assignProductDto: {
                "assignProductID": 0,
                "partnerId": "",
                "partnerCode":"",
                "productId": 0,
                "assignDate": "",
                "effectiveFrom": "",
                "effectiveTo": "",
                "isActive": true,
                "isPaymentReceived": true,
                "lstProductId": [

                ]
            },
            displaypart: false,
            productSearchDTO:
                {
                    "productId": 0,
                    "lobid": 0,
                    "cobid": 0,
                    "productStatusId": 0,
                    "productName": "",
                    "productCode": "",
                    "activeFrom": "",
                    "activeTo": "",
                    "premiumAmount": 0,
                    "createdBy": 0,
                    "createdDate": "",
                    "modifyBy": 0,
                    "modifyDate": ""
                }, tabledata: [],
            partlist: [],
            cpartner: false,
            cpartnerid: "",
            Searchproduct: [],
            ProductDTO: {
                "lobid": "",
                "COBID": "",
                "activeTo": ""
            },
            lstProduct: [],
            masterLists: [],
            PartnerData: [],
            showtable: false,
            configurator: "",
            admin: "",
            confiVal: "",
            management: "",
            admins: "",
            value: props.state || '',
            selected: [],
            //redirect: false,
            listDet: "",
            // productDTO: props.lstProduct
            PartnerSearchDTO: {
                partnerCode: "",
                partnerName: "",
                partnerid: "",
                partnerTypeId: "",
                partnerClassId: "",
            },
                productSearchDTO: {
                    "productId": 0,
                    "lobid": "",
                    "cobid": "",
                    "productStatusId": 0,
                    "productName": "",
                    "productCode": "",
                    "activeFrom": null,
                    "activeTo": null,
                    "premiumAmount": 0,
                    "createdBy": null,
                    "createdDate": null,
                    "modifyBy": null,
                    "modifyDate": null,
                    "partnerId": "",
            },
                productpage:false,
            MasterDTO: {
                LOB: [],
                COB: [],
            },
            topics:[],
            rowData: {},
            partnername: "",
            partid: "",
            partname: "",

        };
        //this.dualChange = this.dualChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.Switchstatement = this.Switchstatement.bind(this);
        this.defulterror = this.defulterror.bind(this);
        this.showPartnerTable = this.showPartnerTable.bind(this);
    }
    //GetMasterData = (type, addType, event) => {
    //    console.log('GetMasterData', type, addType, event);
    //}

    editFunction(id, pId) {
        document.getElementById("disp");
        var orgArr = this.state.partlist
        var partArr = [];
        $.each(orgArr, function (k, v) {
            if (v.partnerId == pId) {
                partArr.push(orgArr[id]);
            }
        })
        //const partdata = partArr[0].partnerId;
        let state = this.state;
        state.partid = partArr[0].partnerId;
        state.rowData = partArr;
        state.partnername = this.state.rowData[0].partnerName;
        this.setState({ state });
        console.log("rowdata", this.state.partnername)
        console.log("partner id=", this.state.partid);
    }

    showPartnerTable = () => {
        this.setState({ loader: false });
        let partner = this.state.PartnerSearchDTO;
        if (partner.partnerid != "" || partner.partnerClassId != "" ||
            partner.partnerTypeId != "" || partner.partnerName != "") {

            //fetch(`https://localhost:44315/api/Partner/SearchPartner`, {
            fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/SearchPartner`, {
                method: 'POST',
                body: JSON.stringify(partner),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ partlist: data })
                    console.log("partlist array: ", this.state.partlist)
                    if (this.state.partlist.length > 0) {
                        this.datatable();
                        this.setState({ showtable: true });
                       // this.setState({ searchGrid: true });
                    } else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, showtable: false, nodata: true });
                            }.bind(this), 2000
                        );
                    }
                });
        }
        else {
            var msg = CommonMessage("SearchParameter", [])
            swal({
                text: msg,
                icon: "error"
            });
        }
    }

    datatable = () => {
        this.setState({ loader: true, showtable: true, });
        this.setState({
            tabledata: this.state.partlist.map((prop, key) => {
                const { classes } = this.props;
                return {
                    Partnerid: prop.partnerId,
                    PartnerCode: prop.partnerCode,
                    PartnerName: prop.partnerName,
                    PartnerTypeid: prop.partnerType,
                    Partnerclassid: prop.partnerClass,
                    radio: <input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.partnerId)} />
                };
            })
        });
    }

    showProductTable = () => {

        let search = this.state.productSearchDTO;
        search['partnerId'] = localStorage.getItem('partnerid');
        this.setState({ search });
        fetch(`${productConfig.productConfigUrl}/api/Product/SearchProduct`, {
            method: 'POST',
            body: JSON.stringify(search),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                let display = this.state.display;
                if (data.length > 0) {
                    this.setState({ display: true });
                    this.setState({ topics: data })
                    this.dataTable(data);
                    console.log("data save result:", data);
                    console.log("topics", this.state.topics);
                } else {
                    swal("", "No records found", "error");
                    this.setState({ display: false });
                }
            });

    }

    SetValue = (type, event) => {
        let dasboardDTO = this.state.productSearchDTO;
        let name = event.target.name;
        let value = event.target.value;
        dasboardDTO[name] = value;

        this.setState({ dasboardDTO })
        console.log("this.state.productSearchDTO", this.state.productSearchDTO);
    };

    GetMasterData = (type, addType, event) => {
        console.log('GetMasterData: ', type, addType, event)
        this.SetValue(type, event);
        let reg = this.state[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;

        this.setState({ reg });
        console.log("LOB", this.state[addType]);
        // console.log("lobid", this.state.dasboardDTO.lobid);
        this.GetMasterService(type, event.target.value);

    };



    SetPartnerValue = (event) => {
        event.preventDefault();

        let ProductDTO = this.state.PartnerSearchDTO;
        let name = event.target.name;
        let value = event.target.value;
        console.log('teset ' + event.target.value)
        ProductDTO[name] = value;

        this.setState({ ProductDTO });
        console.log("final data", this.state.ProductDTO);
    }

    SetData = (event) => {
        event.preventDefault();
        let assignProductDto = this.state.assignProductDto;
        let name = event.target.name;
        console.log("name", name);
        let value = event.target.value;
        console.log("value", value);
        console.log('teset ' + event.target.value);
        assignProductDto[name] = value;

        this.setState({ assignProductDto })
        console.log("final data", this.state.assignProductDto);

        this.defulterror(name);
    }

    handleRadioChange(e) {
        var rVal = e.target.value;
        this.setState({ selectedValue: e.target.value })
        if (rVal == "submit") {
            this.setState({
                entryFlag: true,
            })
        } else { }
    }

    handleOpen = () => {
        this.setState({ open: true });
        //fetch(`https://localhost:44315/api/Partner/GetAssignProduct`)
        fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/GetAssignProduct`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("All data coming", data);
                this.setState({ topics: data });
            });

    };

    handleclose = event => {
        this.setState({ showtable: false, productpage: true, displaypart:true});
    }

    handleSearch = event => {
        debugger;
        if (this.state.partid != "") {
            console.log("handle search", this.state.ProductDTO);
            this.setState({
                entryFlag: true
            });

            fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/GetAssignProductbyId`, {
                // fetch(`https://localhost:44315/api/Partner/GetAssignProductbyId?partnerId=` + this.state.partid, {
                method: 'POST',
                body: JSON.stringify(this.state.productSearchDTO),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ Searchproduct: data });
                    console.log("data save result:", data);
                    console.log("search product data", this.state.Searchproduct);
                });
        }
        else {
             console.log("handle search", this.state.ProductDTO);
            this.setState({
                entryFlag: true
            });

            fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/GetAssignProductbyId`, {
                // fetch(`https://localhost:44315/api/Partner/GetAssignProductbyId?partnerId=` + this.state.partid, {
                method: 'POST',
                body: JSON.stringify(this.state.productSearchDTO),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ Searchproduct: data });
                    console.log("data save result:", data);
                    console.log("search product data", this.state.Searchproduct);
                });
        }
    };

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    onDateChange = (type, name, event) => {
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1)
        }
        else {
            var mm = (today.getMonth() + 1);
        }
        var date = dt + '/' + mm + '/' + today.getFullYear();
        if (type == 'assignProductDto') {
            let assignProductDto = this.state.assignProductDto;
            assignProductDto[name] = date;
        }
        console.log("assignProductDto", this.state.assignProductDto);
        this.defulterror(name);
        //if (max == event.target.value)
        //var fromdatecomp = Date.parse(min);
        //if (Date.parse(min))
        //console.log("min",);
    };

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    //renderRedirect = () => {
    //    if (this.state.redirect == true) {
    //        return <Redirect to={{
    //            pathname: '/dashboard/home',
    //        }} />
    //    }
    //}

    defulterror(name) {
        console.log("name", name);
        let datename = this.state.assignProductDto;
        const { assignDateerror, effectiveFromerror, effectiveToerror, listerror } = this.state;
        // this.setState({ assignDateerror: false, effectiveFromerror: false, effectiveToerror: false, partnerIderror: false });
        switch (name) {
            case "assignDate":
                this.setState({ assignDateerror: false });
                break;
            case "effectiveFrom":
                this.setState({ effectiveFromerror: false });
                break;
            case "effectiveTo":
                this.setState({ effectiveToerror: false });
                break;
            case "listerror":
                this.setState({ listerror: false });
                break;
            default:
                break;
           
        }
    }

    onInputChange = (type,event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        const PartnerSearchDTO = this.state.PartnerSearchDTO;
        PartnerSearchDTO[name] = value;
        this.setState({ PartnerSearchDTO });
        this.change(event, name, type);
    }

    //    dualChange = (selected) => {
    //        this.setState({ selected:  selected });
    //        console.log("selected dual :", this.state.selected);
    //        //console.log("label", this.state.Searchproduct[selected].label);
    //}

    dualChange = (selected) => {
        this.setState({ selected });
        this.state.assignProductDto.effectiveFrom = ""; this.state.assignProductDto.effectiveTo = ""; this.setState(this.state.assignProductDto);

        console.log("value", this.state.selected);
        this.defulterror("listerror");
    }

    addRow() {
        var dualListVal = $("#listData-selected").val();
        console.log(dualListVal);
    }

    //Search product
    handleClick = () => {
        fetch(`${productConfig.productConfigUrl}/api/Product/SearchProduct`, {
            method: 'POST',
            body: JSON.stringify(this.state.productSearchDTO),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {


                this.setState({ topics: data })

                console.log("data save result:", data);
                console.log("topics", this.state.topics);

            });

    };

    onClicksave = (evt) => {

        this.errorMessage();
        //console.log("coming");
        let assignProductDto = this.state.assignProductDto;
        if (this.state.cpartnerid == "") {
            assignProductDto.partnerId = this.state.partid;
        } else {
            assignProductDto.partnerId = this.state.cpartnerid;
        }

        // validation of effective date
        this.state.assignProductDto.lstProductId.push(this.state.selected);
        console.log("arraylength", this.state.selected.length);
        console.log("select array: ", this.state.selected);

        console.log("list item value", this.state.assignProductDto.lstProductId);

        console.log("saveassignproduct", this.state.assignProductDto);




        var max = this.getMaxFromDate();
        var min = this.getMinToDate();
        let efffrom = this.state.assignProductDto.effectiveFrom;
        let effto = this.state.assignProductDto.effectiveTo;
        let asdate = this.state.assignProductDto.assignDate;
        let state = this.state;
        state.assignProductDto.effectiveFrom = this.datechange(this.state.assignProductDto.effectiveFrom);

        state.assignProductDto.effectiveTo = this.datechange(this.state.assignProductDto.effectiveTo);
        state.assignProductDto.assignDate = this.datechange(this.state.assignProductDto.assignDate);
        console.log("swagger data", this.state.assignProductDto);
        this.setState({ state });
        //if (this.state.assignProductDto.effectiveFrom >= max && this.state.assignProductDto.effectiveTo <= min)
        //{
        //fetch(`https://localhost:44315/api/Partner/SaveAssignProduct`, {
        fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/SaveAssignProduct`, {
            method: 'POST',
            body: JSON.stringify(this.state.assignProductDto),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(function (response) {

                return response.json();
            }).then(data => {

                if (data.status == 2) {
                    var msg = CommonMessage(data.messageKey, data.messageValue);
                    swal({

                       // text: data.responseMessage,
                        text: msg,
                        icon: "success"
                    });
                    //this.setState({ redirect: true });
                    //this.renderRedirect();
                    //assignProductDto["assignDate"] = "";
                    // assignProductDto["effectiveFrom"] = "";
                    //assignProductDto["effectiveTo"] = "";
                    this.setState({ assignProductDto });
                    let selected = this.state.selected;
                    let len = this.state.selected.length;
                    this.state.selected.splice(0, len);
                    this.setState({ selected });
                } else if (data.status == 8) {

                    swal({


                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                }
                console.log("data save ", data);
                console.log("search  data", this.state.Searchproduct);

            });
        //} else {
        //    swal(""," Specified Date is not  with in Product range","error")
        //}

        console.log("reset", this.state.assignProductDto, this.state.selected);
        //let assignProductDto = this.state.assignProductDto;
        this.state.assignProductDto.effectiveTo = effto;
        this.state.assignProductDto.effectiveFrom = efffrom;
        this.state.assignProductDto.assignDate = asdate;
    }

    addDetails = () => {
        console.log("list data people", this.state.listdata);

        document.getElementById('subHead').style.display = 'block'
        document.getElementById('custDetTable').style.display = 'block';
        var lobId = $("#lobId").val();
        var COBID = $("#COBID").val();
        var productcode = $("#productcode").val();
        var productname = $("#productname").val();
        var dateOfAssignment = $("#dateOfAssignment").val();
        var table = document.getElementById('custDetTable');
        var row = table.insertRow(-1);
        row.className = 'tableClassRow';
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        var cell3 = row.insertCell(-1);
        var cell4 = row.insertCell(-1);
        var cell5 = row.insertCell(-1);
        var cell6 = row.insertCell(-1);
        cell1.innerHTML = lobId;
        cell2.innerHTML = COBID;
        cell3.innerHTML = productcode;
        cell4.innerHTML = productname;
        cell5.innerHTML = dateOfAssignment;
        cell6.innerHTML = '<span class="delete"><i class="fa fa-trash del-btn" aria-hidden="true"></i><span/><span class="edit"><i class="fa fa-pencil ed-btn" aria-hidden="true"></i><span/>';

        $(".delete").on('click', function () {
            $(this).parent().parent().remove();
        });
    }

    componentDidMount() {

        if (localStorage.getItem('partnerid') > 0) {
            this.setState({ display: true, productpage:true});
        }


        console.log("Type", this.props)
        if (this.props.Type == true) {
            this.state.Type = true;
            //  this.state.animatedType = "fadeInUp";
            //this.setState({ animatedType: "fadeInUp" });
        }
        console.log("Type", this.state.animatedType)
        fetch(`https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/GetMasterData?sMasterlist=das`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });

                console.log('Master Data', this.state.masterList);
            });

        this.GetMasterService('LOB', 0);



        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetMasterData?sMasterlist=OrgCategory`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterLists: data });
            });

        fetch(`${partnerconfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=LOB`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })

            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
            });

        fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ PartnerData: data });
                console.log("data coming in partner", this.state.PartnerData);
            });
        if (this.props.location.state != null) {
            this.setState({
                cpartnerid: this.props.location.state.cpartnerid,
                partname: this.props.location.state.partname,
                productpage:true,
                cpartner: true,
            });
            this.setState({ displaypartnersearch: false });
        } else {
            this.setState({ displaypartnersearch: true });
        }

        let entryFlag = this.state.entryFlag;
        entryFlag = this.props.entryFlag;
        this.setState({ entryFlag });
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
    }

    GetMasterService = (type, pID) => {
        // fetch(`https://localhost:44347/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID,{
        fetch(`https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("mIsRequired", data);
            })
    };

    errorMessage() {
        let pks = 1;
        const { assignDate, effectiveFrom, effectiveTo } = this.state.assignProductDto;
        const dateFrom = this.state.assignProductDto.effectiveFrom;
        const dateTo = this.state.assignProductDto.effectiveTo;
        var datelist = new Date(dateFrom).getTime();
        console.log("datelist", datelist);
        console.log("datefrom", dateFrom);
        var datelistTo = new Date(dateTo).getTime();
        console.log("dateTo", datelistTo);
        if (datelist == datelistTo) {
            console.log("datecompaire");
        }
        else if (datelist > datelistTo) {
            console.log("first date is big");
        }
        else if (datelist < datelistTo) {
            console.log("first date is small");
        }

        const { selected } = this.state;
        if (selected.length <= 0 || assignDate == "" || effectiveFrom == "" || effectiveTo == "") {
            console.log("plz enter the values");
            if (selected.length <= 0) { this.Switchstatement("selected") }
            if (assignDate == "") { this.Switchstatement("assignDate"); console.log("assignDate", this.state.assignDateerror, this.state.assignProductDto.assignDate); pks++ }
            if (effectiveFrom == "") { this.Switchstatement("effectiveFrom"); pks++ }
            if (effectiveTo == "") { this.Switchstatement("effectiveTo"); pks++ }
            if (pks > 1) {
                var msg = CommonMessage("MissingField", [])
                swal({
                    text: msg,
                    icon: "error"
                });
            }

        }
    }

    Switchstatement(name) {
        const { assignDateerror, effectiveFromerror, effectiveToerror, listerror } = this.state;
        switch (name) {
            case "assignDate":
                this.setState({ assignDateerror: true });
                break;
            case "effectiveFrom":
                this.setState({ effectiveFromerror: true });
                break;
            case "effectiveTo":
                this.setState({ effectiveToerror: true });
                break;
            case "selected":
                this.setState({ listerror: true });
                break;
            default:
                break;
        }
    }

    getMinToDate = () => {
        let arr = this.state.Searchproduct.concat([]);
        let selected = this.state.selected;
        let min = null;
        if (arr.length > 0)
            min = arr.reduce(function (a, b) {
                if (a == undefined || a == null) return b;
                if (b == undefined || b == null) return a;

                let flag1 = false;
                let flag2 = false;

                for (let i = 0; i < selected.length; i++) {
                    if (a.productId + "" == selected[i] + "")
                        flag1 = true;
                    if (b.productId + "" == selected[i] + "")
                        flag2 = true;
                }
                if (!flag1) return b;
                if (!flag2) return a;
                if (a.activeTo == null) return b;
                if (b.activeTo == null) return a;
                let x = Date.parse(a.activeTo);
                let y = Date.parse(b.activeTo);
                if (x > y) return b;
                return a;
            });
        if (min == null || min == undefined) return null;
        for (let i = 0; i < selected.length; i++) {
            if (min.productId + "" == selected[i] + "")
                return min.activeTo;
        }
        return null;
    }

    getMaxFromDate = () => {
        let arr = this.state.Searchproduct.concat([]);

        let selected = this.state.selected;
        let max = null;
        if (arr.length > 0)
            max = arr.reduce(function (a, b) {
                if (a == undefined || a == null) return b;
                if (b == undefined || b == null) return a;

                let flag1 = false;
                let flag2 = false;

                for (let i = 0; i < selected.length; i++) {
                    if (a.productId + "" == selected[i] + "")
                        flag1 = true;
                    if (b.productId + "" == selected[i] + "")
                        flag2 = true;
                }
                if (!flag1) return b;

                if (!flag2) return a;
                console.log("arr", a, b);
                if (a.activeFrom == null) return b;
                if (b.activeFrom == null) return a;
                let x = Date.parse(a.activeFrom);
                let y = Date.parse(b.activeFrom);
                if (x > y) return a;
                console.log("maxdate", b)
                return b;
            });
        if (max == null || max == undefined) return null;
        for (let i = 0; i < selected.length; i++) {
            if (max.productId + "" == selected[i] + "")
                return max.activeFrom;
        }
        return null;
    }

    change = (event, stateName, type) => {
        switch (type) {
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "ID":
                if (validationPage.verifyID(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "phnumber":
                if (validationPage.verifyPhNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "pan":
                if (validationPage.verifyPanIndNum(event.target.value, 6)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "ID":
                if (validationPage.verifyID(event.target.value, 6)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    onlyalphabets = (e) => {
        return (e.charCode > 64 && e.charCode < 91) || (e.charCode > 96 && e.charCode < 123) || e.charCode == 32;   
    }
    render() {
        const { classes } = this.props;
        console.log("classes", classes);
        return (
            <div>
                {this.state.displaypartnersearch ?
                            <GridContainer>
                        {this.state.pageloader ?
                        <GridItem xs={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <Card>
                                    <CardHeader color="rose" icon>
                                        <CardIcon color="rose">
                                            { /*  <FilterNone /> */}
                                            <Icon><img id="icon" src={partner} /></Icon>
                                        </CardIcon>
                                        {
                                            <h4 className={this.cardIconTitle}>
                                                    <small> <TranslationContainer translationKey="SearchPartner" /> </small>
                                            </h4>
                                        }
                                    </CardHeader>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <CardBody>
                                            <GridItem>
                                                {/*<h5 className="seach-title">Search Partner</h5>**/}
                                                <GridContainer>
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <CustomInput
                                                            success={this.state.partnerNameState == "success"}
                                                            error={this.state.partnerNameState == "error"}
                                                            labelText="PartnerName"
                                                            name="partnerName"
                                                            value={this.state.PartnerSearchDTO.partnerName}
                                                            onChange={(e) => this.onInputChange("string", e)}
                                                            onKeyPress={(e)=>this.onlyalphabets(e)}
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <MasterDropdown
                                                            labelText="PartnerType"
                                                            id="PartnerSearchDTO.partnerTypeId"
                                                            lstObject={this.state.masterLists}
                                                            filterName='PartnerType'
                                                            value={this.state.PartnerSearchDTO.partnerTypeId}
                                                            model="ProductDTO"
                                                            name='partnerTypeId'
                                                            onChange={(e)=>this.SetPartnerValue(e)}
                                                            formControlProps={{ fullWidth: true }}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <MasterDropdown
                                                            labelText="PartnerClass"
                                                            id="PartnerSearchDTO.partClassId"
                                                            value={this.state.PartnerSearchDTO.partnerClassId}
                                                            lstObject={this.state.masterLists}
                                                            filterName='PartnerClass'
                                                            model="PartnerDTO"
                                                            name='partnerClassId'
                                                            onChange={(e) => this.SetPartnerValue(e)}
                                                            formControlProps={{ fullWidth: true }}
                                                        />
                                                    </GridItem>
                                                    <GridContainer lg={12} justify="center" >
                                                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                                <Button color="info" round onClick={this.showPartnerTable}>
                                                                        <TranslationContainer translationKey="Search" />
                                                    </Button>
                                                            </Animated>
                                                        </GridItem>
                                                    </GridContainer>

                                                </GridContainer>
                                            </GridItem>

                                        </CardBody>
                                    </Animated>
                                </Card>
                            </Animated>
                                </GridItem>
                                : <PageContentLoader />}

                        {this.state.loader ?
                            <GridContainer xl={12}>
                                {this.state.showtable ?
                                    <GridItem xs={12}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <ReactTable //id="coustTable"
                                        data={this.state.tabledata}
                                            filterable
                                            columns={[
                                                {
                                                    Header: "Select",
                                                    accessor: "radio",
                                                    minWidth: 5,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    sortable: false,
                                                    filterable: false,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "PartnerCode",
                                                    accessor: "PartnerCode",
                                                    minWidth: 10,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "PartnerName",
                                                    accessor: "PartnerName",
                                                    minWidth: 10,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "PartnerType",
                                                    accessor: "PartnerTypeid",
                                                    minWidth: 10,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "PartnerClass",
                                                    accessor: "Partnerclassid",
                                                    minWidth: 10,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                            ]}
                                            defaultPageSize={5}
                                            showPaginationTop={false}
                                            pageSize={([this.state.tabledata.length + 1] < 5) ? [this.state.tabledata.length + 1] : 5}
                                            //showPaginationBottom={([this.state.tabledata.length + 1] <= 5) ? false : true}
                                            showPaginationBottom={true}
                                            className="-striped -highlight"
                                            />
                                        </Animated>

                                        <GridContainer justify="center">
                                            <GridItem xs={3} sm={3} md={3}>
                                                <Button id="ok" color="info" round className={classes.marginRight} onClick={this.handleclose}>
                                                    <TranslationContainer translationKey="OK" />
                                                             </Button>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>

                                    : <GridItem lg={12}>{
                                        this.state.nodata ?
                                            <Card>
                                                <GridContainer lg={12} justify="center">
                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <img src={data_Not_found} className="tab-data-not-found" />
                                                    </Animated>
                                                </GridContainer>
                                                <GridContainer lg={12} justify="center">
                                                    <GridItem xs={5} sm={3} md={3} lg={1} >
                                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                            <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                                        </Animated>
                                                    </GridItem>
                                                </GridContainer>
                                            </Card>
                                            : null}
                                    </GridItem>
                                    }
                            </GridContainer>
                            : <Card style={paddingCard}>
                                <TableContentLoader />
                            </Card>
                        }
                    </GridContainer>
                    : null} 
                <GridContainer>
                    {this.state.productpage?
                        <GridItem xs={12} sm={12} md={12}>
                            <SearchProduct ProductDTO={this.state.ProductDTO} MasterDTO={this.state.MasterDTO} displaypartnersearch={this.state.displaypartnersearch} onInputChange={this.onInputChange} partname={this.state.partname} cpartner={this.state.cpartner} partnername={this.state.partnername} displaypart={this.state.displaypart} partid={this.state.partid} PartnerSearchDTO={this.state.PartnerSearchDTO} masterList={this.state.masterList} tabledata={this.state.tabledata} editFunction={this.editFunction} showPartnerTable={this.showPartnerTable} SetValue={this.SetValue} handleSearch={this.handleSearch} classes={this.classes} handleOpen={this.handleOpen} masterLists={this.state.masterLists} ProductNameState={this.state.ProductNameState} ProductCodeState={this.state.ProductCodeState} productSearchDTO={this.state.productSearchDTO} GetMasterData={this.GetMasterData} />
                            {/*{this.renderRedirect()}*/}
                            {this.state.entryFlag ? <AddProduct getMaxFromDate={this.getMaxFromDate} getMinToDate={this.getMinToDate} partid={this.state.partid} assignProductDto={this.state.assignProductDto} AssignProductList={this.state.AssignProductList} GetMasterData={this.GetMasterData} MasterDTO={this.state.MasterDTO} SetData={this.SetData} Searchproduct={this.state.Searchproduct} dualChange={this.dualChange} selected={this.state.selected} onDateChange={this.onDateChange} onClicksave={this.onClicksave} PartnerData={this.state.PartnerData} effectiveToerror={this.state.effectiveToerror} effectiveFromerror={this.state.effectiveFromerror} assignDateerror={this.state.assignDateerror} listerror={this.state.listerror} handleClose={this.handleClose} /> : null}

                        </GridItem>
                   :null }
                </GridContainer>
            </div>
        );
    }
}
export default withStyles(styles)(AssignProduct);