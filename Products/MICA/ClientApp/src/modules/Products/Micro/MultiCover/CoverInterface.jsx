import React from "react";
import AddCover from "./_AddCover.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Add from "@material-ui/icons/AddCircleOutline";
import Button from "components/CustomButtons/Button.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import BenefitInterface from "../MultiCover/BenefitInterface.jsx";
import swal from 'sweetalert';
import Accordion from "components/Accordion/AccordianWithoutLoop.jsx";
import GridItem from "components/Grid/GridItem.jsx";

class CoverInterface extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
            CoverRiskList:[],
            hidepremiumAmount:false,
            productBenefits: 
            {
                     "max": "",
                     "min":"",
                    "currencyId": "",
                    "benefitId": 0,
                    "cweid": "",
                    "productId": "",
                    "benefitTypeId": "",
                    "benefitAmount": "",
                    "benefitCriteria": "",
                    "benefitCriteriaValue": "",
                    "maxBenefitAmount": "",
                    "premiumAmount": "",
                    "singleValue": false,
                    benifitRangeDetails: [
                        //{
                        //    // "benefitRangeId": 0,
                        //    //"benifitId": 0,
                        //    "fromValue": "",
                        //    "toValue": "",
                        //    "benefitAmount": ""
                        //}
                    ],
                    "benifitRangeTableDetails": [],
            },
            benifitRangeDetails: 
                {
                    // "benefitRangeId": 0,
                    //"benifitId": 0,
                    "fromValue": "",
                    "toValue": "",
                    "benefitAmount": "",
                    "premiumAmount":""
                }
            

        }
        this.GetClausesData = this.GetClausesData.bind(this);
        this.GetCWEService = this.GetCWEService.bind(this);
    };

    GetMasterService = (type, pID, Iindex = 0, Cindex = 0) => {

        //fetch(`https://localhost:44347/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID)
        fetch(`${productConfig.productConfigUrl}/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("data come from server", data);
                if (type === "Cover") {

                    if (this.props.props.state.MasterDTO[type].length > 0) {
                        // const repdata = this.props.props.state.MasterDTO[type].filter(item => item.mID === data.mID);
                        console.log("MasterDTOData", this.props.props.state.MasterDTO);
                        //    if (repdata.length == 0) {
                        const arr = [];
                        arr.push(data);
                        this.props.props.state.MasterDTO[type].push(arr);
                        console.log("MasterDTOData", this.props.props.state.MasterDTO);
                        this.setState({});
                        //   }

                    } else {
                        const arr = [];
                        arr.push(data);
                        this.props.props.state.MasterDTO[type].push(arr);
                        console.log("MasterDTOData", this.props.props.state.MasterDTO);
                        this.setState({});
                    }
                }
                //else if (type == "BenefitCriteria") {//SAME AS CoverEventFactor
                //    console.log("sending index1", Iindex, Cindex);
                //    const arr = [];
                //    arr.push(data);

                //    if (Iindex >= this.props.props.state.MasterDTO[type].length) {
                //        this.props.props.state.MasterDTO[type].push(arr);
                //        console.log("MasterDTOData5", this.props.props.state.MasterDTO, Iindex, Cindex);
                //        this.setState({});
                //    } else {
                //        if (Cindex <= this.props.props.state.MasterDTO[type][Iindex].length) {
                //            this.props.props.state.MasterDTO[type][Iindex][Cindex] = data;
                //            console.log("MasterDTOData4", data, this.props.props.state.MasterDTO, Iindex, Cindex);
                //            this.setState({});
                //        } else {
                //            this.props.props.state.MasterDTO[type][Iindex][Cindex].push(data);
                //            console.log("MasterDTOData3", data, this.props.props.state.MasterDTO, Iindex, Cindex);
                //            this.setState({});
                //        }
                //    }
                //}
                //if (type === "Risk") {


                //    this.props.props.state.MasterDTO[type] = this.props.props.state.MasterDTO[type].concat(data);


                //}

                else {
                    const lData = data;
                    let locDTO = this.props.props.state.MasterDTO;
                    locDTO[type] = lData;
                    this.setState({ locDTO });
                    console.log("GetMasterService", data);
                }
            });

        //if (type === "COB") {
        //    this.FilterType();
        //}
        console.log("MasterDTOData", this.props.props.state.MasterDTO);
    };

    SetCoverEventValue = (event) => {

        const masterDTO = this.props.props.state.MasterDTO;
        console.log('Componenet call', event.target.checked);
    


            if (event.target.checked != undefined) {
                masterDTO['checkBox'] = event.target.checked;
                this.props.props.state.CoverEventShow = event.target.checked;
           //     this.props.ProductDTO.isCoverEvent = event.target.checked;
             //   this.props.ProductDTO.productCover['singleValue'] = event.target.checked;

                this.props.ProductDTO.productCover.coverEventId = "";


                //this.ProductDetails.productCover.singleValue = true;
                // this.ProductDetails.productCover.singleValueSelected = "0";

                this.props.ProductDTO.productCover.coverEventFactorValueUnitId = "";

                this.props.ProductDTO.productCover.coverEventFactorId = "";
                console.log("select checkbox", this.props.ProductDTO, this.props.ProductDTO.productCover, event.target.checked, this.props.ProductDTO.isCoverEvent);
                this.setState({});
            }

        this.setState({ masterDTO });
        
    };
    GetInusrableMasterData = (type, addType, event, Iindex, Cindex = 0) => {
        //index=>Cindex
        console.log("index", Cindex, Iindex);
        //this.SetValue(type, event);
        let name = event.target.name;
        let value = event.target.value;
        console.log("insurablelist", this.props.ProductDTO, this.props.props.state.RiskList);
        const filtertype = this.props.props.state.RiskList.filter(m => m.mValue === "Insurable Item");
        if (name == "coverTypeId") {
          
            //const Covertemp = this.props.props.state.MasterDTO.Cover[Iindex][0].filter(item => item.mID == value);
            //console.log("Covertemp", Covertemp, this.props.props.state.MasterDTO, this.props.props.state.MasterDTO.Cover[Iindex]);
            //this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails[Cindex].inputType = Covertemp[0].mValue;
            //this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails[Cindex].levelId = filtertype[0].mID;
            //this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails[Cindex].inputId = value;

            if (filtertype.length > 0) {
               // this.GetRiskClaimMaster('Risk', filtertype[0].mID, event.target.value);
                this.GetRiskClaimMaster('Risk', "64", 1000);

            }
        }
        if (name === "insurableItemTypeId" || name === "insurableCategoryId") {
            const reg = this.props.ProductDTO[addType][Iindex];

            reg[name] = value;
            this.setState({ reg });

            if (name === "insurableItemTypeId") {

                this.props.ProductDTO.insurableRcbdetails[Iindex].levelId = filtertype[0].mID;
                const Insurabletypetemp = this.props.props.state.MasterDTO.InsuranceType.filter(item => item.mID == value);
                this.props.ProductDTO.insurableRcbdetails[Iindex].inputType = Insurabletypetemp[0].mValue;

                this.props.ProductDTO.insurableRcbdetails[Iindex].inputId = value;

            }

            console.log("event", event.target.name)
            console.log("insurableRcbdetails", this.props.ProductDTO.insurableRcbdetails[Iindex])

        } else {
            const reg = this.props.ProductDTO;
            reg[addType][name] = value;
            this.setState({ reg });
        }

        if (type === "Cover") {

            if (filtertype.length > 0) {
               // this.GetRiskClaimMaster('Risk', filtertype[0].mID, event.target.value);
                this.GetRiskClaimMaster('Risk', "64",1000);
              
            }
        }

        if (type != "") {
            if (type === "CoverEventFactorValue") {
                this.GetMasterService(type, event.target.value, Iindex, Cindex);
                console.log("sending index", Iindex, Cindex);
            } else if (type !== "CoverEventFactor") {
                this.GetMasterService(type, event.target.value);
            }
            else {
                if (type === "CoverEventFactor") {
                 
                    this.GetMasterService('BenefitCriteria', event.target.value, Iindex, Cindex);
                    // this.GetMasterService('Risk', event.target.value);
                    //this.GetMasterService('Claim', event.target.value);
                }
                this.GetMasterService(type, event.target.value, Iindex, Cindex);
                console.log("sending index2", Iindex, Cindex);
            }

        }

        this.setState({});
        console.log("reg", this.props.ProductDTO.productInsurableItem);
    }


    GetRiskClaimMaster = (type, typeId, pID) => {

        //fetch(`https://localhost:44347/api/Product/GetRiskClaimMaster?masterType=` + type + `&parentID=` + pID)
        fetch(`${productConfig.productConfigUrl}/api/Product/GetRiskClaimMaster?masterType=` + type + `&typeId=` + typeId + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Risk data  server for cover level", data);
                if (type === "Risk") {
                    if (typeId == 64) {
                        this.state.CoverRiskList = data;
                    }
                }
            });
    }

    SetCoverProductDetailsValue = (callcomponent, event, index, Iindex) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log("Insurableindex", Iindex)
        if (callcomponent === 'clauseDescription') {
            this.setState({ description: value });
        } else {
            if (callcomponent === 'productBenefits') {

                let ProductBenefit = this.props.ProductDTO['productCover'][index][callcomponent][0];

                ProductBenefit[name] = value;

                this.setState({ ProductBenefit });

            }
            else if (callcomponent === 'productPremium') {

                let Productpremium = this.props.ProductDTO.productPremium;

                Productpremium[index][name] = value;

                this.setState({ Productpremium });
            }
            else {
                let ProductCover = this.props.ProductDTO[callcomponent];

                ProductCover[name] = value;

                this.setState({ ProductCover });
            }
        }


        if (callcomponent === 'productCover') {

            if (event.target.name === "coverEventFactorValueFrom") {
            
                const ProductCoverData = this.props.ProductDTO[callcomponent];
               // ProductCoverData.productBenefits[0].benifitRangeDetails[0].fromValue = value;
                //  this.ProductDetails.productInsurableItem[Iindex].productCovers[index].productBenefits[0].benifitRangeDetails[0].fromValue = value;
                this.setState({ ProductCoverData });
                console.log(" this.ProductDetails.benifitRangeDetails", this.props.ProductDTO.benifitRangeDetails)
            }

        }

       

        console.log("SetProductDetailsValue", this.props.ProductDTO, name, value)
       // this.props.benifitTable(Iindex, index);
        //this.channelsTable();
    }
    handleRadioChange = (event, Iindex, Cindex) => {

        let ProductCover = this.props.ProductDTO['productCover'];

      
        ProductCover['singleValue'] = event.target.value === "1" ? false : true;
        ProductCover['singleValueSelected'] = event.target.value;
        this.setState({ ProductCover });

        console.log("single or range", this.props.ProductDTO['productCover']);
       // this.benifitTable(Iindex, Cindex);
       
    }
    benifitTable = (Iindex, Cindex) => {
        console.log("testing table benefits", this.props.ProductDTO.productInsurableItem)
        if (this.props.ProductDTO.benifitRangeDetails.length > 0) {

            this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeTableDetails = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails.map((prop, key) => {

                return {
                    id: key + 1,
                    // fromValue: < CustomInput value={prop.fromValue} disabled={this.state.disabled} name = "fromValue"  onChange = {(e) => this.setBenifitValue('fromValue', e, key) }     formControlProps = {{  fullWidth: true }} />,
                    fromValue: prop.fromValue,
                    toValue: < CustomInput value={prop.toValue} disabled={this.state.viewdisable} name="toValue" onChange={(e) => this.setBenifitValue('toValue', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                    Amount: < CustomInput value={prop.benefitAmount} disabled={this.state.viewdisable} name="benefitAmount" onChange={(e) => this.setBenifitValue('benefitAmount', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                    PremiumAmount: < CustomInput value={prop.premiumAmount} disabled={this.state.viewdisable} name="premiumAmount" onChange={(e) => this.setBenifitValue('premiumAmount', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                    btn: <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addRecord(e, key, Iindex, Cindex)}><Add /></Button>

                };

            })


        }



        //this.state.benifittabledata = this.ProductDetails.tblBenifitRangeDetails[0].fromValue;
        console.log("this.benefit", this.state.benifittabledata);
    }

    setBenifitValue = (columnName, event, index, Iindex, Cindex) => {
        console.log("columnName", columnName, event);
       
        let responses = [... this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails];
        if (columnName === 'benefitAmount') {
            responses[index].benefitAmount = event.target.value;
          //  this.callbenefitmassage(event, index, Iindex, Cindex)
        }
        if (columnName === 'toValue') {
            responses[index].toValue = event.target.value;
        }
        if (columnName === 'fromValue') {
            responses[index].fromValue = event.target.value;
        }
        this.setState({ responses });

       // this.benifitTable(Iindex, Cindex);
        console.log("react table benefit", this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails);

    }
  
    /*Insurable ,cover,benefit level CWE change event*/
    GetClausesData = (type, addType, event, level, Iindex = 0, Cindex = 0) => {

        console.log("index", Iindex);
        // this.SetValue(type, event);


        //let reg = this.state[addType][0];
        //let name = event.target.name;
        //let value = event.target.value;
        //reg[name] = value;
        //console.log("event", event.target.name)
        //this.setState({ reg });

        if (type === "Clauses") {
            //if (level === "Product") {
            //    this.ProductDetails.productInsurableItem[0].productCovers[0].cweid = event.target.value;

            //    this.GetCWEService(type, event.target.value, "51");
            //}

          
                    if (level === "Insurable Item") {
                        this.props.ProductDTO.productInsurableItem[Iindex].cweid = event.target.value;
                       const subLevelID= this.props.ProductDTO.productInsurableItem[Iindex].insurableItemTypeId;
                        this.GetCWEService(type, event.target.value, level,subLevelID, Iindex);
                    }
                    if (level === "Cover") {
                        this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].cweid = event.target.value;
                        const subLevelID = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].coverTypeId;
                        this.GetCWEService(type, event.target.value, level, subLevelID, Iindex, Cindex);
                    }
                    if (level === "Benefit") {
                        this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].cweid = event.target.value;
                        const subLevelID = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].coverTypeId;
                        this.GetCWEService(type, event.target.value, level, subLevelID, Iindex, Cindex);
            }
        
                }
         
        this.setState({});
    }

    GetCWEService = (type, pID, level, subLevelID, Iindex = 0, Cindex = 0) => {
        if (this.props.props.state.TypeList.length > 0) {
            const LevelmID = this.props.props.state.TypeList.filter(s => s.mValue == level);
            if (LevelmID.length > 0) {

                const Lid = LevelmID[0].mID;

        //fetch(`https://localhost:44347/api/Product/   ?LOBId=`+this.state.ProductDTO.lobid +`&CWETypeID=`+ pID)
        fetch(`${productConfig.productConfigUrl}/api/Product/CWEDetails?LOBId=` + this.props.ProductDTO.ProductDTO.lobid + `&CWETypeID=` + pID + `&typeId=` + Lid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
              
                //if (Lid === "51") {
                //    this.calltruedata(data);
                //    this.setState({
                //        clauses: data,

                //    });
                //}
                for (var i = 0; i < data.length; i++) {
                    data[i].levelId = Lid;
                    data[i].subLevelId = subLevelID;


                }
                
             
                if (level === "Insurable Item") {
                    const InsurablesClause = this.props.props.state.MasterDTO.MasterList.InsurablesClause;
                  
                    InsurablesClause[Iindex].InsurablesClauseList = data;
                   
                    this.setState({ InsurablesClause });
                    console.log("debugger", data, this.props.props.state.MasterDTO.MasterList.InsurablesClause)
                }

                if (level === "Cover") {

                    const CoversClause = this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause;


                    CoversClause[Cindex].CoversList = data;
                    this.setState({ CoversClause });

                }
                if (level === "Benefit") {

                    //  const BenefitList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].BenefitList;
                    const CoversClause = this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause;

                    CoversClause[Cindex].BenefitList = data;

                    //this.setState({ BenefitList });
                    this.setState({ CoversClause });
                }

              //  console.log("clauses: ", this.state.clauses);
                console.log("InsurablesClause: ", this.props.props.state.MasterDTO.MasterList.InsurablesClause);

            });
            }
        }
    }

    handleTreeChange = (currentNode, level, Iindex = 0, Cindex = 0) => {

        if (level === "Insurable Item") {
            console.log("currentNode", currentNode);
            let InsurList = this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList.filter(item => item.cweid == currentNode.cweid);
            if (currentNode.checked === true) {

                this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.push(currentNode);

                console.log("pks", InsurList);
                InsurList[0].checked = true;
                this.setState({});

            } else {
                this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList = this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList.filter(item => item.cweid !== currentNode.cweid);
                console.log("currentNode", this.state.cweList);
                InsurList[0].checked = false;
                this.setState({});
            }
        } else if (level === "Cover") {
            let CoverList = this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList.filter(item => item.cweid == currentNode.cweid);
            if (currentNode.checked === true) {

                this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.push(currentNode);

                console.log("pks", CoverList);
                CoverList[0].checked = true;
                this.setState({});

            } else {
                this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList = this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList.filter(item => item.cweid !== currentNode.cweid);
                console.log("currentNode", this.state.cweList);
                CoverList[0].checked = false;
                this.setState({});
            }

        } else if (level === "Benefit") {

            let BenefitList = this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList.filter(item => item.cweid == currentNode.cweid);
            if (currentNode.checked === true) {

                this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.push(currentNode);

                console.log("pks", BenefitList);
                BenefitList[0].checked = true;
                this.setState({});

            } else {
                this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList = this.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList.filter(item => item.cweid !== currentNode.cweid);
                console.log("currentNode", this.state.cweList);
                BenefitList[0].checked = false;
                this.setState({});
            }

        }
        console.log("test1", this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex]);
        this.AddCWEClauses(level, Iindex, Cindex);
    }
    AddCWEClauses(level, Iindex, Cindex) {
        //  this.FilterCWEType();

        if (level == "Insurable Item") {
            if (this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.length > 0) {

                this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].ptable = true;

            }
        }
        if (level === "Cover") {

            if (this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.length > 0) {

                this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].ptable = true;

            }
        }
        if (level === "Benefit") {
            if (this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.length > 0) {

                this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.ptable = true;

            }

        }

        //if (this.state.cwe.length > 0) {
        //    this.setState({ ctable: true });

        //   



        //    debugger
        //    //let productDTO = this.ProductDetails;
        //    //let productClause = this.ProductDetails.productClausesWarrentiesExclusion;
        //    //let newCov = this.state.clauses.filter(o1 => this.state.cwe.some(o2 => o1.cweid === o2.cweid));
        //    //console.log("clausessome", newCov);
        //    //const list = [...productClause, ...newCov];
        //    //console.log("newCov", newCov, list);
        //    //productDTO['productClausesWarrentiesExclusion'] = list;
        //    //this.setState({ productDTO });

        //    this.state.cwe = [];


        //   }
        console.log("test2", this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex]);
        this.setState({});
        this.dataCWETable(level, Iindex, Cindex);
    }


    dataCWETable = (level, Iindex, Cindex) => {
        console.log("test3", this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex]);
        if (level === "Insurable Item") {
            console.log("InsurableList", this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex])

            this.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.map((prop, key) => {

                return {
                    id: key + 1,
                    typeName: prop.typeName,
                    cwetypes: prop.cwetypes,
                    isPrint: <CustomCheckbox key={key}
                        name="isPrint"
                        value={prop.isPrint}
                        onChange={(e) => this.SetCWEValue(key, e, Iindex)}
                        disabled={this.props.props.state.viewdisable}
                        formControlProps={{
                            fullWidth: true
                        }}

                    />,
                    btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
                        {!this.props.props.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
                    </div>
                };

            })

            this.setState({});
        }

        if (level === "Cover") {


            this.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].CoversTableDataList = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.map((prop, key) => {

                return {
                    id: key + 1,
                    typeName: prop.typeName,
                    cwetypes: prop.cwetypes,
                    isPrint: <CustomCheckbox key={key}
                        name="isPrint"
                        value={prop.isPrint}
                        onChange={(e) => this.SetclauseValue(key, e)}
                        disabled={this.props.props.state.viewdisable}
                        formControlProps={{
                            fullWidth: true
                        }}

                    />,
                    btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
                        {!this.props.props.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
                    </div>
                };

            })

            this.setState({});
        }
        if (level === "Benefit") {


            this.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].tableBenefitdata.BenefitTableDataList = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.map((prop, key) => {

                return {
                    id: key + 1,
                    typeName: prop.typeName,
                    cwetypes: prop.cwetypes,
                    isPrint: <CustomCheckbox key={key}
                        name="isPrint"
                        value={prop.isPrint}
                        onChange={(e) => this.SetclauseValue(key, e)}
                        disabled={this.props.props.state.viewdisable}
                        formControlProps={{
                            fullWidth: true
                        }}

                    />,
                    btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
                        {!this.props.props.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
                    </div>
                };

            })

            this.setState({});
        }
        console.log("test4", this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex]);
    }

    handledescriptionCWE=(level, Iindex, Cindex = 0)=> {
        if (level == "Insurable Item") {
            let editdescription = [...this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList];
            editdescription[this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex].description = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description;
            this.setState({ editdescription });
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = false;
            this.setState({});
        }
        if (level == "Cover") {

            let editdescription = [...this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList];
            editdescription[this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex].description = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description;
            this.setState({ editdescription });
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = false;
            this.setState({});
        }
       
        if (level == "Benefit") {

            let editdescription = [...this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList];
            editdescription[this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.tindex].description = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.description;
            this.setState({ editdescription });
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.opendespcription = false;
            this.setState({});
        }


    }

    handleOpenCWE(level, Iindex, Cindex, index) {


        if (level == "Insurable Item") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex = index;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].open = true;

            // this.setState({ description: this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
            this.setState({});
        }

        if (level == "Cover") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList[index].description;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex = index;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].open = true;

            // this.setState({ description: this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
            this.setState({});
        }

        if (level == "Benefit") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex = index;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].open = true;

            // this.setState({ description: this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
            this.setState({});
        }

    };
    handleEditCWE=(level, Iindex, Cindex, index)=> {

        if (level == "Insurable Item") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex = index;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = true;
            this.setState({});
        }
        if (level == "Cover") {
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList[index].description;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex = index;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = true;
            this.setState({});

        }
        if (level == "Benefit") {
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList[index].description;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.tindex = index;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.opendespcription = true;
            this.setState({});

        }

        
    };
    handleCloseCWE=(level, Iindex, Cindex) =>{
        if (level == "Insurable Item") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].open = false;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].mshow = false;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = false;
            this.setState({});
        }
        if (level == "Cover") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].open = false;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].mshow = false;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = false;
            this.setState({});
        }

        if (level == "Benefit") {

            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.open = false;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.mshow = false;
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.opendespcription = false;
            this.setState({});
        }
    };

    SetValueCWE = (event, level, Iindex, Cindex = 0) => {

        const value = event.target.value;
        if (level == "Insurable Item") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description = value;
            this.setState({});
        }
        if (level == "Cover") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = value;
            this.setState({});
        }
        if (level == "Benefit") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.description = value;
            this.setState({});
        }

    }

    /*Validation*/

    ValdationCheckFun = () => {
        let ValidationValue = true;
       
        if (this.props.props.state.MasterDTO.checkBox == true) {
            if (this.props.ProductDTO.productCover.coverEventFactorId == "" || this.props.ProductDTO.productCover.coverEventFactorValueUnitId == "" || this.props.ProductDTO.productCover.coverEventId == "") {
                ValidationValue = false

            } else {
                ValidationValue = true;

            }
        } else {
            ValidationValue = true;
        }

        if (this.props.ProductDTO.productCover.singleValue == false) {
            if (this.props.ProductDTO.productCover.coverEventFactorValueFrom == "" || this.props.ProductDTO.productCover.coverEventFactorValueTo=="") {
                ValidationValue = false;
            }
            else {
                ValidationValue = true;
              
            }
        }
        return ValidationValue;
    }


    /*Add Cover Collapse */
    

    addCoverelist = (e, index, Iindex) => {
        console.log("cover index", index);
     
        if (this.props.ProductDTO.productCover.coverTypeId != "" && this.props.ProductDTO.productCover.coverDescription != ""&&  this.ValdationCheckFun()) {
            this.props.ProductDTO.ProductDTO.isCoverEvent = true;
            this.addCoverCWEFun(index, Iindex);
            this.addCoversFun(index, Iindex);

            const covereventid = this.props.ProductDTO.productCover.coverEventId;
            const covereventfactorid = this.props.ProductDTO.productCover.coverEventFactorId;
            const covereventfactorevalueid = this.props.ProductDTO.productCover.coverEventFactorValueUnitId;
           
            const pCover = Object.assign({}, this.props.ProductDTO.productCover);
            if (this.props.props.state.MasterDTO.checkBox == false) {
                this.GetMasterService('BenefitCriteria', 0, Iindex, index);
            }
            const pbenefit = Object.assign({}, this.state.productBenefits);
            const pbenefitrange = Object.assign({}, this.state.benifitRangeDetails);
            pCover.productBenefits = pCover.productBenefits.concat(pbenefit);

            
            if (pCover.singleValue == false) {
          
                pCover.productBenefits[0].benifitRangeDetails = pCover.productBenefits[0].benifitRangeDetails.concat(pbenefitrange);
                pCover.productBenefits[0].benifitRangeDetails[0].fromValue = pCover.coverEventFactorValueFrom;
            }

            console.log("Clone", pCover.productBenefits, pCover)


            //const b = Object.assign({}, pCover, {
            //    productBenefits: [{
            //        ...pCover.productBenefits,
            //        groups: 'some changed value'
            //    }]
            //});
           
            //pCover.productBenefits[0].cweid = "";
            //pCover.productBenefits[0].benefitTypeId = "";
            //pCover.productBenefits[0].benefitAmount = "";
            //pCover.productBenefits[0].benefitCriteria = "";
            //pCover.productBenefits[0].benefitCriteriaValue = "";
            //pCover.productBenefits[0].maxBenefitAmount = "";
            //pCover.productBenefits[0].singleValue = "";

            this.props.ProductDTO.productInsurableItem[Iindex].productCovers = this.props.ProductDTO.productInsurableItem[Iindex].productCovers.concat(pCover);




            //pCover.coverEventId = covereventid;
            //pCover.coverEventFactorId = covereventfactorid;
            //pCover.coverEventFactorValueUnitId = covereventfactorevalueid;






            //this.ProductDetails.productPremium = this.ProductDetails.productPremium.concat({
            //    "productId": 0,
            //    "premiumAmount": "",
            //    "currencyId": ""
            //});
            //this.ProductDetails.productBenefit = this.ProductDetails.productBenefit.concat({
            //    "currencyId": "",
            //    "benefitId": 0,
            //    "productId": "",
            //    "benefitTypeId": "",
            //    "benefitAmount": "",
            //    "benefitCriteria": "",
            //    "benefitCriteriaValue": "",
            //    "maxBenefitAmount": "",
            //    "singleValue": true,
            //    "benifitRangeDetails": []
            //});


            //this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails = this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails.concat(

            //    {

            //        "inputType": "string",
            //        "isReqired": true,
            //        "inputId": 0,
            //        "levelId": 0,
            //        "insurableRcbdetailsId": 0,
            //        "coverChildRcbdetails": [
            //            {

            //                "inputType": "string",
            //                "isReqired": true,
            //                "inputId": 0,
            //                "coverRcbdetailsId": 0
            //            }
            //        ]
            //    }
            //);
            this.props.props.addCoverRiskParameter(Iindex);

            const filtertype = this.props.props.state.RiskList.filter(m => m.mValue === "Insurable Item");


            const Covertemp = this.props.props.state.MasterDTO.Cover[Iindex][0].filter(item => item.mID == this.props.ProductDTO.productCover.coverTypeId);
            console.log("Covertemp", Covertemp, this.props.props.state.MasterDTO, this.props.props.state.MasterDTO.Cover[Iindex], Iindex,index);
            this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails[index].inputType = Covertemp[0].mValue;
            this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails[index].levelId = filtertype[0].mID;
            this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails[index].inputId = this.props.ProductDTO.productCover.coverTypeId;



            console.log("adding cover", this.ProductDetails);
            let insulen = this.props.ProductDTO.insurableRcbdetails.length - 2;
            this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails[index].coverChildRcbdetails = this.state.CoverRiskList;
            //this.props.ProductDTO.insurableRcbdetails[Iindex].coverRcbdetails[index].coverChildRcbdetails = this.props.props.state.FilterCoverDTO.concat({

            //    "mID": 53,
            //    "mValue": "Cover Name",
            //    "mType": "Risk",
            //    "mIsRequired": true,
            //    "planCode": null,
            //    "lob": null,
            //    "cob": null,
            //    "disable": true,
            //    "value": null,
            //    "label": null,
            //    "levelId": 55,
            //    "subLevelId": 0
            //}, {
            //        "mID": 48,
            //        "mValue": "CEF Value",
            //        "mType": "Risk",
            //        "mIsRequired": true,
            //        "planCode": null,
            //        "lob": null,
            //        "cob": null,
            //        "disable": true,
            //        "value": null,
            //        "label": null,
            //        "levelId": 55,
            //        "subLevelId": 0
            //    },
               
            //);
         



           // console.log("length", this.props.ProductDTO.productInsurableItem[Iindex].productCovers.length);
          //  console.log("length", this.state.Insurabletitle[Iindex]);
            const CoverType = this.props.props.state.MasterDTO.Cover[this.props.Iindex][0].filter(item => item.mID == pCover.coverTypeId)[0].mValue;
            const CoverEventID = this.props.props.state.MasterDTO.CoverEvent.filter(item => item.mID == pCover.coverEventId);

            this.props.props.state.InitialInsurable[Iindex].InitialCover = this.props.props.state.InitialInsurable[Iindex].InitialCover.concat({ view: !this.props.props.state.viewdisable,title: "Cover:", value: CoverType, title1:"", value1: "", deleteAccordion: this.deleteAccordion, Iindex: Iindex, content: <BenefitInterface props={this} ProductDTO={this.props.ProductDTO} Bindex={this.props.props.state.InitialInsurable[Iindex].InitialCover.length} Iindex={Iindex} /> })
         

            /*delete selected cover */
            this.props.props.state.MasterDTO.Cover[Iindex][0] = this.props.props.state.MasterDTO.Cover[Iindex][0].filter(s => s.mID !== pCover.coverTypeId);

            
          //  this.props.ProductDTO.productCover.productBenefits[0].benifitRangeDetails[0].fromValue = this.props.ProductDTO.productCover.coverEventFactorValueFrom;


            /*benefit table show on radio change*/
            //if (this.props.ProductDTO['productCover'].singleValue === false) {
            //    this.benifitTable(Iindex, index);
            //}
            //reset cover

            this.props.ProductDTO.productCover.coverTypeId = "";
            //this.props.ProductDTO.productCover.coverEventId = "";
            this.props.ProductDTO.productCover.coverEventFactorValueUnitId = "";
            this.props.ProductDTO.productCover.coverEventFactorValueTo = "";
            this.props.ProductDTO.productCover.coverEventFactorValueFrom = "";
            this.props.ProductDTO.productCover.coverEventFactorId = "";
            this.props.ProductDTO.productCover.coverDescription = "";
            this.props.ProductDTO.productCover.cweid = "";
            //this.props.ProductDTO.productCover.singleValue = false;
            //this.props.ProductDTO.productCover.singleValueSelected = "0";

            //this.props.ProductDTO.productCover.productBenefits[0].currencyId = "";
            //this.props.ProductDTO.productCover.productBenefits[0].cweid = "";
            //this.props.ProductDTO.productCover.productBenefits[0].benefitTypeId = "";
            //this.props.ProductDTO.productCover.productBenefits[0].benefitAmount = "";
            //this.props.ProductDTO.productCover.productBenefits[0].benefitCriteria = "";
            //this.props.ProductDTO.productCover.productBenefits[0].benefitCriteriaValue = "";
            //this.props.ProductDTO.productCover.productBenefits[0].maxBenefitAmount = "";
            //this.props.ProductDTO.productCover.productBenefits[0].singleValue = "";

        
          //  this.props.ProductDTO.productCover.productBenefits = [...this.state.productBenefits];
           
            console.log("productBenefits update", this.props.props.state.MasterDTO.checkBox);

           // this.props.ProductDTO.productCover.cwetypeId = "";
            this.props.props.CheckedRadioFun(this.props.props.state.SelectedName, 'radiolist');
            this.setState({});

        }

    }

    addCoversFun = (Cindex, Iindex, that = this) => {

        if (that.props.props.state.MasterDTO.Cover.length > 0) {
            const TypeId = this.props.props.state.MasterDTO.Cover[Iindex][0].filter(item => item.mID === this.props.ProductDTO.productCover.coverTypeId);
            //const TypeId = this.state.MasterDTO.InsuranceType.filter(item => item.mID === this.ProductDetails.productInsurableItem[Iindex].insurableItemTypeId);
            this.props.props.state.Covertitle.push([TypeId[0].mValue]);
            this.props.props.state.Insurabletitle[Iindex].push([TypeId[0].mValue]);
            that.setState({});
        }
    }
    addCoverCWEFun = (Cindex, Iindex, that = this) => {

        

        that.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause = that.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause.concat({ "CoversList": [], "BenefitList": [] });


        that.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable = that.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable.concat({ "CoversTableList": [], "BenefitTable": { "BenefitTableList": [], "ptable": false }, "ptable": false });

        that.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata = that.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata.concat({ "CoversTableDataList": [], "tableBenefitdata": { "BenefitTableDataList": [], "btable": false }, "ctable": false }); 

      //console.log("CovertitleData ", that.state.Covertitle, that.state.MasterDTO.MasterList.InsurablesClause);
        that.setState({});
        // }
    }

    componentDidMount() {


        this.setState({ hidepremiumAmount: this.props.props.state.hidepremiumAmount });
        if (this.props.props.state.CoverCollapseShow == true) {
            const filterCWEid = this.props.props.state.TypeList.filter(s => s.mValue == "Insurable Item")[0].mID;
            if (filterCWEid != undefined) {
            
                this.GetCWEDetails(this.props.ProductDTO, filterCWEid, this.props.ProductDTO.productInsurableItem[this.props.Iindex].insurableItemId, this.props.Iindex);

            }
           
            if (this.props.ProductDTO.productInsurableItem[this.props.Iindex].productCovers.length > 0) {

                for (var j = 0; j < this.props.ProductDTO.productInsurableItem[this.props.Iindex].productCovers.length; j++) {
                    this.addCoverCWEFun(j, this.props.Iindex, this);

                            //CWE cover

                            const filterCWEcoverid = this.props.props.state.TypeList.filter(s => s.mValue == "Cover")[0].mID;
                            if (filterCWEcoverid != undefined) {
                      
                                this.GetCWEDetails(this.props.ProductDTO, filterCWEcoverid, this.props.ProductDTO.productInsurableItem[this.props.Iindex].productCovers[j].coverId, this.props.Iindex, j);

                            }




                    const CoverType = this.props.props.state.MasterDTO.Cover[this.props.Iindex][0].filter(item => item.mID == this.props.ProductDTO.productInsurableItem[this.props.Iindex].productCovers[j].coverTypeId)[0].mValue;
                            this.props.props.state.Covertitle.push(CoverType);
                    console.log("CoverTypeId productCovers", this.props.props.state.Covertitle, CoverType, this.props.ProductDTO.productInsurableItem[this.props.Iindex].productCovers[j])
                            if (CoverType != undefined) {
                                // if (this.state.Insurabletitle[i][this.ProductDetails.productInsurableItem[i].productCovers.length].length > 0) {
                                this.props.props.state.InitialInsurable[this.props.Iindex].InitialCover = this.props.props.state.InitialInsurable[this.props.Iindex].InitialCover.concat({ view: !this.props.props.state.viewdisable, title: "Cover:", value: CoverType, content: <BenefitInterface props={this} ProductDTO={this.props.ProductDTO} productClausesWarrentiesExclusions={this.props.productClausesWarrentiesExclusions} Bindex={j} Iindex={this.props.Iindex} /> })
                                //}
                            }
                        }
                    }

                }
         
    }


    GetCWEDetails = (data, typeId, refID, Iindex = 0, Cindex = 0) => {



        const filterCWEtype = this.props.props.state.TypeList.filter(s => s.mID == typeId)[0].mValue;
        console.log("productClausesWarrentiesExclusions filter", this.props, this.props.ProductDTO.productClausesWarrentiesExclusion);
        const CWEdata = this.props.props.state.ProductDTO.productClausesWarrentiesExclusions.filter(s => s.levelId == typeId && s.refId == refID && this.props.ProductDTO.ProductDTO.productId)
        
        if (CWEdata.length > 0) {
            console.log("CWEdata", CWEdata, filterCWEtype)
            if (filterCWEtype != undefined) {
               
                if (filterCWEtype == "Product") {
                    this.props.ProductDTO['productClausesWarrentiesExclusion'] = CWEdata;


                    this.setState({ ctable: true });

                   // this.dataTable();
                    console.log("productClausesWarrentiesExclusion", this.props.ProductDTO['productClausesWarrentiesExclusion']);
                }


                if (filterCWEtype == "Insurable Item") {

                    this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList = CWEdata;
                    this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].ptable = true
                    this.dataCWETable(filterCWEtype, Iindex);
                }

                if (filterCWEtype == "Cover") {
                    
                    this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList = CWEdata;
                    this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].ptable = true;
                    this.dataCWETable(filterCWEtype, Iindex, Cindex);
                }
                if (filterCWEtype == "Benefit") {
                    this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList = CWEdata;


                }

                this.setState({});
                //  console.log("GetCWEDetails", this.ProductDetails['productClausesWarrentiesExclusion'], this.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList);
            }



        }
        

    }

    handleShowCWE=(level, Iindex, Cindex = 0)=> {
        
        if (level == "Insurable Item") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].mshow = true;

            this.setState({});
        }
        if (level == "Cover") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].mshow = true;

            this.setState({});
        }
        if (level == "Benefit") {
            this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.mshow = true;

            this.setState({});
        }
    };


    handledataCWE = (e, level, Iindex, Cindex = 0) => {

        this.props.props.state.CustomClause.label = this.props.props.state.CustomClause.typeName;

        let productDTO = this.props.ProductDTO;
      
        let CustomClause = this.props.props.state.CustomClause;

        let cwetypeId = this.props.props.state.CustomClause.cwetypeId;
        this.props.props.state.cvalue = (this.props.props.state.masterList.filter(e => e.mType === 'CWEType')[0]) === undefined
            ? []
            : this.props.props.state.masterList.filter((e) => e.mType === 'CWEType')[0].mdata
            ;
        let mvalue = this.props.props.state.cvalue.filter(o1 => o1.mID === cwetypeId);
        let cvalue = '';

        if (mvalue[0].mValue === 'Clauses') {
            cvalue = 'C';
        }
        else if (mvalue[0].mValue === 'Warrenties') {
            cvalue = 'W';
        }
        else if (mvalue[0].mValue === 'Exclusions') {
            cvalue = 'E';
        }
        CustomClause['cwetypes'] = cvalue;
        this.setState({ CustomClause });
        let customInputClause = Object.assign({}, this.props.props.state.CustomClause);


        if (level == "Insurable Item") {
          
            let productInsurableClause = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList;
            const list = [...productInsurableClause, customInputClause];
             //this.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList = list;
             this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList = list;
            this.setState({ productInsurableClause });

        }
        if (level == "Cover") {

            let productCoverClause = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList;
            const list = [...productCoverClause, customInputClause];
             this.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList = list;
             this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList = list;
            this.setState({ productCoverClause });

        }

        if (level == "Benefit") {
        
            let productCoverClause = this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList;
            const list = [...productCoverClause, customInputClause];
             this.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].tableBenefitdata.BenefitTableDataList = list;
             this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList = list;
            this.setState({ productCoverClause });

        }
        this.handleCloseCWE(level, Iindex, Cindex);
        this.dataCWETable(level, Iindex, Cindex);

        this.props.props.state.CustomClause.cwetypeId = "";
        this.props.props.state.CustomClause.label = "";
    }


    SetValue = (type, event) => {

        
        let ProductDTO = this.props.ProductDTO.CustomClause;
        let name = event.target.name;
        let value = event.target.value;
        ProductDTO[name] = value;

        this.setState({ ProductDTO });
    }
   

    SetCWEValue = (index, event, Iindex) => {
       
        console.log("check", event.target.checked)
        let responses = [...this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList];
        responses[index].isPrint = event.target.checked;

        this.setState({ responses });
        console.log("pks", this.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList);
    }
    /*Delete accordion for cover*/
    deleteAccordion = (e, Iindex, index ) => {
        this.props.props.deleteCoverRiskParameter(Iindex, index);
        console.log("deleteAccordion", e, index, Iindex, this.props.ProductDTO.productInsurableItem);
        this.props.props.state.InitialInsurable[Iindex].InitialCover.splice(index, 1);
        const deletecover = this.props.props.state.MasterDTO.CoverMaster.filter(s => s.mID == this.props.ProductDTO.productInsurableItem[Iindex].productCovers[index].coverTypeId);
        console.log("deletecover", deletecover);
        if (deletecover.length > 0) {
            this.props.props.state.MasterDTO.Cover[Iindex][0].push(deletecover[0])
        }
        this.props.ProductDTO.productInsurableItem[Iindex].productCovers.splice(index, 1);

        if (this.props.props.state.InitialInsurable[Iindex].InitialCover.length == 0 && this.props.props.state.InitialInsurable.length == 1) {

            this.props.ProductDTO.ProductDTO.isCoverEvent = false;
        }

       
        this.setState({});
    }
    /* Add collapse in insurable level*/

    AccordianFunction = (Iindex) => {
        console.log("AddCont: cover", this.props.props.state.InitialInsurable[Iindex], this.props.props.state.MasterDTO.Cover[Iindex], this.props.ProductDTO.productInsurableItem[Iindex]);
       // const CoverEventID = this.props.props.state.MasterDTO.CoverEvent.filter(item => item.mID == this.props.ProductDTO.productCover.coverEventId);

        console.log("CoverMasterDTO", this.props.props.state.MasterDTO, this.props.props.state.MasterDTO.CoverMaster, this.props.ProductDTO.productInsurableItem[Iindex].productCovers, this.props.ProductDTO.isCoverEvent)

        this.props.ProductDTO.productInsurableItem[Iindex].productCovers = this.props.ProductDTO.productInsurableItem[Iindex].productCovers;
        return (
            <GridItem xs={12}>
                {(this.props.props.state.InitialInsurable[Iindex].InitialCover.length>0)?this.props.props.state.InitialInsurable[Iindex].InitialCover.map((prop, key) => {
                    return (

                        <Accordion
                            index={Iindex}
                            
                            collapses={
                                [{
                                    key: key, view: !this.props.props.state.viewdisable, title: "Cover:", value: this.props.props.state.MasterDTO.CoverMaster.filter(item => item.mID == this.props.ProductDTO.productInsurableItem[Iindex].productCovers[key].coverTypeId)[0].mValue,
                                    title1: (this.props.props.state.CoverEventShow === false) ? "" : "CoverEvent:",
                                    value1: (this.props.props.state.CoverEventShow === false) ? "" : (this.props.props.state.viewdisable) ? ((this.props.props.state.MasterDTO.CoverEvent.filter(item => item.mID == this.props.ProductDTO.productInsurableItem[Iindex].productCovers[key].coverEventId).length > 0) ? this.props.props.state.MasterDTO.CoverEvent.filter(item => item.mID == this.props.ProductDTO.productInsurableItem[Iindex].productCovers[key].coverEventId)[0].mValue : "") : this.props.props.state.MasterDTO.CoverEvent.filter(item => item.mID == this.props.ProductDTO.productCover.coverEventId)[0].mValue, deleteAccordion: this.deleteAccordion, Iindex: Iindex, content: <BenefitInterface props={this} ProductDTO={this.props.ProductDTO} state={this.props.props.state} Bindex={key} Iindex={Iindex} />
                                }]
                            }
                       
                        />

                    );
                })
                :null}
            </GridItem>
        )


    };


    render() {
        console.log("CoverInterface", this.props)
     
        return (
            
            <AddCover {...this.props} {...this} />
            
            
            
            );


    }







}
export default CoverInterface;