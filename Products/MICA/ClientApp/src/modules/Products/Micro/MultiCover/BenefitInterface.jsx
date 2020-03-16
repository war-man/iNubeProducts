import React from "react";
import CWEDetails from "../MultiCover/_CWEDetails.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Add from "@material-ui/icons/AddCircleOutline";
import Button from "components/CustomButtons/Button.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import swal from 'sweetalert';
import Delete from "@material-ui/icons/Delete";
class BenefitInterface extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            hidepremiumAmount:false,

        }
        this.GetCWEService = this.GetCWEService.bind(this);
        this.GetClausesData = this.GetClausesData.bind(this);

        console.log("BenefitInterface Data", this.props);
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
                const lData = data;
                let locDTO = this.props.props.props.props.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });

            });
    }

    componentDidMount() {
        this.setState({ hidepremiumAmount: this.props.props.props.props.state.hidepremiumAmount});
        if (this.props.ProductDTO.ProductDTO.productId == 0) {
            if (this.props.props.props.props.state.MasterDTO.checkBox == false) {
                this.GetMasterService('BenefitCriteria', 0, this.props.Iindex, this.props.Bindex);
            }
        }
       
        if (this.props.ProductDTO['productCover'].singleValue === false) {
                this.benifitTable(this.props.Iindex, this.props.Bindex);
        }
        console.log("errormassage", this.props.props.props.props.state.errormessage)
        if (this.props.props.props.props.state.errormessage == true) {
            this.state.flag = true;
          
            this.setState({ flag: true });


        }
        if (this.props.props.props.props.state.CoverCollapseShow == true) {
            const filterCWEcoverid = this.props.props.props.props.state.TypeList.filter(s => s.mValue == "Benefit")[0].mID;
            if (filterCWEcoverid != undefined) {

                this.GetCWEDetails(this.props.ProductDTO, filterCWEcoverid, this.props.ProductDTO.productInsurableItem[this.props.Iindex].productCovers[this.props.Bindex].coverId, this.props.Iindex, this.props.Bindex);

            }


        }
        if (this.props.props.props.props.state.viewdisable == true) {
            if (this.props.ProductDTO.ProductDTO.productInsurableItems.length > 0) {
                if (this.props.ProductDTO.ProductDTO.productInsurableItems[this.props.Iindex].productCovers.length > 0) {
                    if (this.props.ProductDTO.ProductDTO.productInsurableItems[this.props.Iindex].productCovers[this.props.Bindex].singleValue == false) {
                        this.benifitTable(this.props.Iindex, this.props.Bindex);
                    }
                }
            }


        }
        //if (this.props.ProductDTO.ProductDTO.productInsurableItems.length > 0) {
        //    for (var i = 0; i < this.props.ProductDTO.ProductDTO.productInsurableItems.length; i++) {
        //        if (this.props.ProductDTO.ProductDTO.productInsurableItems[i].productCovers.length>0) {
        //            for (var j = 0; j < this.props.ProductDTO.ProductDTO.productInsurableItems[i].productCovers.length; j++) {
        //                if (this.props.ProductDTO.ProductDTO.productInsurableItems[i].productCovers[j].singleValue = true) {
        //                    this.benifitTable(this.props.Iindex, this.props.Bindex);
        //                }
        //            }
        //        }
        //    }
        //}

    }

    onBlur = (callcomponent, Iindex, Cindex) => {
        
        //if (this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].singleValue == false && callcomponent =="productBenefits") {

        //    const max = Math.max.apply(Math, this.props.ProductDTO.productInsurableItem[Iindex]['productCovers'][Cindex][callcomponent][0].benifitRangeDetails.map(function (o) { return o.benefitAmount; }))
        //    const min = Math.min.apply(Math, this.props.ProductDTO.productInsurableItem[Iindex]['productCovers'][Cindex][callcomponent][0].benifitRangeDetails.map(function (o) { return o.benefitAmount; }))
        //    console.log("maximum", max, min);
            

        //    if (max > this.props.ProductDTO.productInsurableItem[Iindex]['productCovers'][Cindex][callcomponent][0].maxBenefitAmount) {
        //        this.props.props.props.props.state.validationmaxbenefit = true;
        //        swal("", "Max Benefit Amount should not be less than highest value of all Benefit Amount", "error");
        //    }
        //} 
        //if (callcomponent == "productBenefits" && this.props.ProductDTO.productInsurableItem[Iindex]['productCovers'][Cindex][callcomponent][0].benefitAmount > this.props.ProductDTO.productInsurableItem[Iindex]['productCovers'][Cindex][callcomponent][0].maxBenefitAmount) {
        //        this.props.props.props.props.state.validationmaxbenefit = true;
        //        swal("", "Max Benefit Amount should not be less than  Benefit Amount", "error");
        //    }

 
        //if (this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].singleValue == false && callcomponent == "productPremium") {
           

        //} else {


        //}
      

        }

    

    SetCoverProductDetailsValue = (callcomponent, event, index, Iindex) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log("Insurableindex", Iindex)
        if (callcomponent === 'clauseDescription') {
            this.setState({ description: value });
        } else {
            if (callcomponent === "productBenefits") {

                let ProductBenefit = this.props.ProductDTO.productInsurableItem[Iindex]['productCovers'][index][callcomponent];
                console.log("before SetProductDetailsBenefitValue", ProductBenefit)
                ProductBenefit[0][name] = value;    

                this.setState({ ProductBenefit });
             
                console.log("SetProductDetailsBenefitValue", this.props.ProductDTO.productInsurableItem[Iindex]['productCovers'], name, value, Iindex,index)
            }
            else if (callcomponent === "productPremium") {

                let Productpremium = this.props.ProductDTO.productPremium;

                Productpremium[index][name] = value;

                this.setState({ Productpremium });
            }
            else {
                let ProductCover = this.props.ProductDTO.productInsurableItem[Iindex][callcomponent][index];

                ProductCover[name] = value;

                this.setState({ ProductCover });
            }
        }


        if (callcomponent === 'productCover') {

            if (event.target.name === "coverEventFactorValueFrom") {
         
                const ProductCoverData = this.props.ProductDTO.productInsurableItem[Iindex][callcomponent][index];
                ProductCoverData.productBenefits[0].benifitRangeDetails[0].fromValue = value;
                //  this.ProductDetails.productInsurableItem[Iindex].productCovers[index].productBenefits[0].benifitRangeDetails[0].fromValue = value;
                this.setState({ ProductCoverData });
                console.log(" this.ProductDetails.benifitRangeDetails", this.props.ProductDTO.benifitRangeDetails)
            }

        }

     


        
        console.log("SetProductDetailsValue", this.props.ProductDTO.productInsurableItem, name, value)
       // this.benifitTable(Iindex, index);
        //this.channelsTable();
    }

    /*benefit c/w/e*/

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
                const subLevelID = this.props.ProductDTO.productInsurableItem[Iindex].insurableItemTypeId;
           

                this.GetCWEService(type, event.target.value, level, subLevelID, Iindex);
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
    GetCWEDetails = (data, typeId, refID, Iindex = 0, Cindex = 0) => {



        const filterCWEtype = this.props.props.props.props.state.TypeList.filter(s => s.mID == typeId)[0].mValue;

        const CWEdata = this.props.state.ProductDTO.productClausesWarrentiesExclusions.filter(s => s.levelId == typeId && s.refId == refID && this.props.ProductDTO.ProductDTO.productId)
      
        if (CWEdata.length > 0) {
            console.log("CWEdata", CWEdata, filterCWEtype)
            if (filterCWEtype != undefined) {

                

                if (filterCWEtype == "Insurable Item") {

                    this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList = CWEdata;
                    this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].ptable = true
                    this.dataCWETable(filterCWEtype, Iindex);
                }

                if (filterCWEtype == "Cover") {
                 
                    this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList = CWEdata;
                    this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].ptable = true;
                    this.dataCWETable(filterCWEtype, Iindex, Cindex);
                }
                if (filterCWEtype == "Benefit") {
                
                    this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList = CWEdata;

                    this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.ptable = true;
                    this.dataCWETable(filterCWEtype, Iindex, Cindex);
                }

                this.setState({});
                //  console.log("GetCWEDetails", this.ProductDetails['productClausesWarrentiesExclusion'], this.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList);
            }



        }


    }

    GetCWEService = (type, pID, level, subLevelID, Iindex = 0, Cindex = 0) => {
      
        if (this.props.props.props.props.state.TypeList.length > 0) {
            const LevelmID = this.props.props.props.props.state.TypeList.filter(s => s.mValue == level);
            if (LevelmID.length > 0) {

                const Lid = LevelmID[0].mID;
                const that = this;
                //fetch(`https://localhost:44347/api/Product/   ?LOBId=`+this.state.ProductDTO.lobid +`&CWETypeID=`+ pID)
                fetch(`${productConfig.productConfigUrl}/api/Product/CWEDetails?LOBId=` + that.props.ProductDTO.ProductDTO.lobid + `&CWETypeID=` + pID + `&typeId=` + Lid, {
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
                            const InsurablesClause = that.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause;

                            InsurablesClause[Iindex].InsurablesClauseList = data;

                            this.setState({ InsurablesClause });
                         //   console.log("debugger", data, that.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause)
                        }

                        if (level === "Cover") {

                            const CoversClause = that.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause;


                            CoversClause[Cindex].CoversList = data;
                            this.setState({ CoversClause });

                        }
                        if (level === "Benefit") {

                            //  const BenefitList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].BenefitList;
                            const CoversClause = that.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause;

                            CoversClause[Cindex].BenefitList = data;

                            //this.setState({ BenefitList });
                            this.setState({ CoversClause });
                        }

                        //  console.log("clauses: ", this.state.clauses);
                        console.log("InsurablesClause: ", that.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause);

                    });
            }
        }
    }


    handleTreeChange = (currentNode, level, Iindex = 0, Cindex = 0) => {

        if (level === "Insurable Item") {
            console.log("currentNode", currentNode);
            let InsurList = this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList.filter(item => item.cweid == currentNode.cweid);
            if (currentNode.checked === true) {

                this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.push(currentNode);

                console.log("pks", InsurList);
                InsurList[0].checked = true;
                this.setState({});

            } else {
                this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList = this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList.filter(item => item.cweid !== currentNode.cweid);
                console.log("currentNode", this.state.cweList);
                InsurList[0].checked = false;
                this.setState({});
            }
        } else if (level === "Cover") {
            let CoverList = this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList.filter(item => item.cweid == currentNode.cweid);
            if (currentNode.checked === true) {

                this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.push(currentNode);

                console.log("pks", CoverList);
                CoverList[0].checked = true;
                this.setState({});

            } else {
                this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList = this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList.filter(item => item.cweid !== currentNode.cweid);
                console.log("currentNode", this.state.cweList);
                CoverList[0].checked = false;
                this.setState({});
            }

        } else if (level === "Benefit") {

            let BenefitList = this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList.filter(item => item.cweid == currentNode.cweid);
            if (currentNode.checked === true) {

                this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.push(currentNode);

                console.log("pks", BenefitList);
                BenefitList[0].checked = true;
                this.setState({});

            } else {
                this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList = this.props.props.props.props.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList.filter(item => item.cweid !== currentNode.cweid);
                console.log("currentNode", this.state.cweList);
                BenefitList[0].checked = false;
                this.setState({});
            }

        }

        this.AddCWEClauses(level, Iindex, Cindex);
    }




    AddCWEClauses(level, Iindex, Cindex) {
        //  this.FilterCWEType();

        if (level == "Insurable Item") {
          //  if (this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.length > 0) {

                this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].ptable = true;

            //}
        }
        if (level === "Cover") {

            //if (this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.length > 0) {

                this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].ptable = true;

            //}
        }
        if (level === "Benefit") {
//            if (this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.length > 0) {

                this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.ptable = true;

  //          }

        }
        

        this.setState({});
        this.dataCWETable(level, Iindex, Cindex);
    }


    dataCWETable = (level, Iindex, Cindex) => {

        if (level === "Insurable Item") {
            console.log("InsurableList", this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex])

            this.props.props.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.map((prop, key) => {

                return {
                    id: key + 1,
                    typeName: prop.typeName,
                    cwetypes: prop.cwetypes,
                    isPrint: <CustomCheckbox key={key}
                        name="isPrint"
                        value={prop.isPrint}
                        onChange={(e) => this.SetCWEValue(key, e,level,Iindex)}
                        disabled={this.props.props.props.props.state.viewdisable}
                        formControlProps={{
                            fullWidth: true
                        }}

                    />,
                    btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
                        {!this.props.props.props.props.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
                    </div>
                };

            })

            this.setState({});
        }

        if (level === "Cover") {

            
            this.props.props.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].CoversTableDataList = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.map((prop, key) => {

                return {
                    id: key + 1,
                    typeName: prop.typeName,
                    cwetypes: prop.cwetypes,
                    isPrint: <CustomCheckbox key={key}
                        name="isPrint"
                        value={prop.isPrint}
                        onChange={(e) => this.SetCWEValue(key, e, level, Iindex, Cindex)}
                        disabled={this.props.props.props.props.state.viewdisable}
                        formControlProps={{
                            fullWidth: true
                        }}

                    />,
                    btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
                        {!this.props.props.props.props.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
                        {!this.props.props.props.props.state.viewdisable && <Button justIcon round simple color="danger" className="remove" onClick={() => this.deleteCWE(level, Iindex, Cindex, key)} ><Delete /> </Button >}

                    </div>
                };

            })

            this.setState({});
        }
        if (level === "Benefit") {


            this.props.props.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].tableBenefitdata.BenefitTableDataList = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.map((prop, key) => {

                return {
                    id: key + 1,
                    typeName: prop.typeName,
                    cwetypes: prop.cwetypes,
                    isPrint: <CustomCheckbox key={key}
                        name="isPrint"
                        value={prop.isPrint}
                        onChange={(e) => this.SetCWEValue(key, e, level, Iindex, Cindex)}
                        disabled={this.props.props.props.props.state.viewdisable}
                        formControlProps={{
                            fullWidth: true
                        }}

                    />,
                    btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
                        {!this.props.props.props.props.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
                        {!this.props.props.props.props.state.viewdisable && <Button justIcon round simple color="danger" className="remove" onClick={() => this.deleteCWE(level, Iindex, Cindex, key)} ><Delete /> </Button >}

                    </div>
                };

            })

            this.setState({});
        }
    }


    deleteCWE = (level, Iindex, Cindex, key) => {

        if (level === "Insurable Item") {
            this.props.props.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList.splice(key, 1);
        }
        if (level === "Cover") {
          
            this.props.props.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].CoversTableDataList.splice(key, 1);
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.splice(key, 1);
        }
        if (level === "Benefit") {
            this.props.props.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].tableBenefitdata.BenefitTableDataList.splice(key, 1);
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.splice(key, 1);

        }
        this.dataCWETable(level, Iindex, Cindex);
    }
    handledescriptionCWE = (level, Iindex, Cindex = 0) => {
        if (level == "Insurable Item") {
            let editdescription = [...this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList];
            editdescription[this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex].description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description;
            this.setState({ editdescription });
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = false;
            this.setState({});
        }
        if (level == "Cover") {

            let editdescription = [...this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList];
            editdescription[this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex].description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description;
            this.setState({ editdescription });
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = false;
            this.setState({});
        }
      
        if (level == "Benefit") {

            let editdescription = [...this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList];
            editdescription[this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.tindex].description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.description;
            this.setState({ editdescription });
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.opendespcription = false;
            this.setState({});
        }


    }

    handleOpenCWE(level, Iindex, Cindex, index) {


        if (level == "Insurable Item") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex = index;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].open = true;

            // this.setState({ description: this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
            this.setState({});
        }
        if (level == "Cover") {
       
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList[index].description;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex = index;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].open = true;

            // this.setState({ description:this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
            this.setState({});
        }


        if (level == "Benefit") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList[index].description;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.tindex = index;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.open = true;
            // this.setState({ description: this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
            this.setState({});
        }

    };
    handleEditCWE = (level, Iindex, Cindex, index) => {

        if (level == "Insurable Item") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex = index;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = true;
            this.setState({});
        }
        if (level == "Cover") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList[index].description;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex = index;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = true;

            // this.setState({ description: this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
            this.setState({});
        }

        if (level == "Benefit") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.description = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList[index].description;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.tindex = index;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.opendespcription = true;
            // this.setState({ description: this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
            this.setState({});
        }
    };
    handleCloseCWE = (level, Iindex, Cindex) => {
        this.props.props.props.props.state.CustomClause.typeName = "";
        this.props.props.props.props.state.CustomClause.description = "";
        this.props.props.props.props.state.CustomClause.cwetypeId = "";
        if (level == "Insurable Item") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].open = false;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].mshow = false;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = false;
            this.setState({});
        }
        if (level == "Cover") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].open = false;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].mshow = false;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = false;
            this.setState({});
        }

        if (level == "Benefit") {

            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.open = false;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.mshow = false;
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.opendespcription = false;
            this.setState({});
        }
    };

    SetValueCWE = (event, level, Iindex, Cindex = 0) => {

        const value = event.target.value;
        if (level == "Insurable Item") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].description = value;
            this.setState({});
        }
        if (level == "Cover") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = value;
            this.setState({});
        }
        if (level == "Benefit") {
            this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.description = value;
            this.setState({});
        }

    }
    handledataCWE = (e, level, Iindex, Cindex = 0) => {

        this.props.props.props.props.state.CustomClause.label = this.props.props.props.props.state.CustomClause.typeName;

        let productDTO = this.props.ProductDTO;
        
        let CustomClause =this.props.props.props.props.state.CustomClause;
        let cwetypeId =this.props.props.props.props.state.CustomClause.cwetypeId;
        this.props.props.props.props.state.cvalue = (this.props.props.props.props.state.masterList.filter(e => e.mType === 'CWEType')[0]) === undefined
            ? []
            :this.props.props.props.props.state.masterList.filter((e) => e.mType === 'CWEType')[0].mdata
            ;
        let mvalue =this.props.props.props.props.state.cvalue.filter(o1 => o1.mID === cwetypeId);
        let cvalue = '';

        if (mvalue[0].mValue === 'Clauses') {
            cvalue = 'C';
        }
        else if (mvalue[0].mValue === 'Warrenties') {
            cvalue = 'W';
        }
        else if (mvalue[0].mValue === 'Exclusions') {
            cvalue = 'E';
        } else if (mvalue[0].mValue === 'Policy Wording') {
            cvalue = 'PW';
        }
        CustomClause['cwetypes'] = cvalue;
        this.setState({ CustomClause });
        let customInputClause = Object.assign({},this.props.props.props.props.state.CustomClause);

        const filterCWEcoverid = this.props.props.props.props.state.TypeList.filter(s => s.mValue == level)[0].mID;
        if (filterCWEcoverid != undefined) {
            customInputClause.levelId = filterCWEcoverid;

            if (level == "Cover") {
                customInputClause.subLevelId = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].coverTypeId;

                let productCoverClause = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList;
                const list = [...productCoverClause, customInputClause];
                // this.props.props.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList = list;
                this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList = list;
                this.setState({ productCoverClause });

            }

            if (level == "Benefit") {
                customInputClause.subLevelId = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].coverTypeId;
                let productCoverClause = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList;
                const list = [...productCoverClause, customInputClause];
                //this.props.props.props.props.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].tableBenefitdata.BenefitTableDataList = list;
                this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList = list;
                this.setState({ productCoverClause });

            }
        }
        console.log("customInputClause", customInputClause);
        this.handleCloseCWE(level, Iindex, Cindex);
        this.dataCWETable(level, Iindex, Cindex);
        this.setState({ customInputClause});
    }
    handleShowCWE = (level, Iindex, Cindex = 0) => {
        
        if (level == "Insurable Item") {
           this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].mshow = true;

            this.setState({});
        }
        if (level == "Cover") {
          
           this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].mshow = true;

            this.setState({});
        }
        if (level == "Benefit") {
           this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.mshow = true;

            this.setState({});
        }
        this.AddCWEClauses(level, Iindex, Cindex);
    };

    SetValue = (type, event) => {

        
        let ProductDTO = this.props.ProductDTO.CustomClause;
        let name = event.target.name;
        let value = event.target.value;
        ProductDTO[name] = value;

        this.setState({ ProductDTO });
    }

    /*Benefit range Table*/

    benifitTable = (Iindex, Cindex) => {
       
        console.log("testing table benefits", this.props.ProductDTO.productInsurableItem, Iindex, Cindex)
        if (this.props.ProductDTO.benifitRangeDetails.length > 0) {

            this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeTableDetails = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails.map((prop, key) => {

                return {
                    id: key + 1,
                    // fromValue: < CustomInput value={prop.fromValue} disabled={this.state.disabled} name = "fromValue"  onChange = {(e) => this.setBenifitValue('fromValue', e, key) }     formControlProps = {{  fullWidth: true }} />,
                    fromValue: prop.fromValue,
                    toValue: < CustomInput value={prop.toValue} disabled={this.props.props.props.props.state.viewdisable} name="toValue" onChange={(e) => this.setBenifitValue('toValue', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                    Amount: < CustomInput value={prop.benefitAmount} disabled={this.props.props.props.props.state.viewdisable} name="benefitAmount" onChange={(e) => this.setBenifitValue('benefitAmount', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                    PremiumAmount: <div>< CustomInput value={prop.premiumAmount} disabled={this.props.props.props.props.state.viewdisable} name="premiumAmount" onBlur={() => this.onBlurBenefit(key, Iindex, Cindex)} onChange={(e) => this.setBenifitValue('premiumAmount', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                         {(eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[key].premiumAmount) > eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[key].benefitAmount))? < p className="error">Premium Amount can not more then Benefit Amount</p>
                :null}

                        </div>,
                    btn: <div><Button color="info" disabled={this.props.props.props.props.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addRecord(e, key, Iindex, Cindex)}><Add /></Button>
                        <Button justIcon round simple color="danger" className="remove" disabled={this.props.props.props.props.state.viewdisable} onClick={(e) => this.deleteBenefit(e, key, Iindex, Cindex)} ><Delete /> </Button >

                    </div>,
                  
                };

            })


        }



    }
    onBlurBenefit = (index, Iindex, Cindex) => {
        if (eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].premiumAmount) > eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].benefitAmount)) {
           // this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeTableDetails[index].flag = true;
            this.props.props.props.props.state.premiumerror = true;

        } else {
            ///this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeTableDetails[index].flag=false
            this.props.props.props.props.state.premiumerror = false;
        }
        this.setState({});
    }
    setBenifitValue = (columnName, event, index, Iindex, Cindex) => {
       
        console.log("columnName", columnName, event);
        let responses = [... this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails];
        if (columnName === 'benefitAmount') {
            responses[index].benefitAmount = event.target.value;
            this.callbenefitmassage(event, index, Iindex, Cindex)
           
        }
        if (columnName === 'toValue') {
            responses[index].toValue = event.target.value;
        }
        if (columnName === 'fromValue') {
            responses[index].fromValue = event.target.value;
        }
        if (columnName === 'premiumAmount') {
            responses[index].premiumAmount = event.target.value;
        }
        this.setState({ responses });
       
        this.benifitTable(Iindex, Cindex);
        console.log("react table benefit", this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails);
      

        //if (this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].singleValue == false && columnName == "benefitAmount") {


        //    this.rangeBenefitValidation(Iindex, Cindex);



        //}



    }
    deleteBenefit = (event, index, Iindex, Cindex) => {
       
        console.log("index for benefit", index, Iindex, Cindex)
        let benefitValues = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0];
       this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeTableDetails.splice(index,1);
        benefitValues.benifitRangeDetails.splice(index,1);
        this.setState({ benefitValues });
        this.benifitTable(Iindex, Cindex);
    }

    addRecord = (event, index, Iindex, Cindex) => {
        event.preventDefault();
        const benefitValues = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0];
        const CoverValue = this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex];
        if (benefitValues.benifitRangeDetails[index].fromValue !== "" && benefitValues.benifitRangeDetails[index].toValue !== "" && benefitValues.benifitRangeDetails[index].benefitAmount !== "") {
            if (eval(benefitValues.benifitRangeDetails[index].fromValue) < eval(benefitValues.benifitRangeDetails[index].toValue) && eval(benefitValues.benifitRangeDetails[index].toValue) < eval(CoverValue.coverEventFactorValueTo) && eval(benefitValues.benifitRangeDetails[index].fromValue) <= eval(CoverValue.coverEventFactorValueTo)) {

                let len = benefitValues.benifitRangeDetails.length - 1;
                let x = eval(benefitValues.benifitRangeDetails[len].toValue) + 1;
                //  let ProductDetails = this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0];
                benefitValues['benifitRangeDetails'] = benefitValues.benifitRangeDetails.concat({ fromValue: x, toValue: "", benefitAmount: "", premiumAmount: ""  });

            }
            else if (eval(benefitValues.benifitRangeDetails[index].fromValue) > eval(benefitValues.benifitRangeDetails[index].toValue)) {
                swal("", "Cover to value cannot be more then from Cover From value", "error");
            }
            else if (eval(benefitValues.benifitRangeDetails[index].fromValue) === eval(benefitValues.benifitRangeDetails[index].toValue)) {
                swal("", "Cover event To value cannot be equal from Cover event from value", "error");
            }
            else if (eval(benefitValues.benifitRangeDetails[index].toValue) > eval(CoverValue.coverEventFactorValueTo)) {
                swal("", "Cover event factor to value cannot be beyond range defined", "error");
            }
        }
        this.setState({ benefitValues, CoverValue });
        this.benifitTable(Iindex, Cindex);
    }

    callbenefitmassage = (event, index, Iindex, Cindex) => {
        if (eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].fromValue) > eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].toValue)) {
            swal("", "Cover to value Can not more then from Cover From value", "error");
        }
        else if (eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].fromValue) === eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].toValue)) {
            swal("", "Cover event To value cannot be equal from Cover event from value", "error");
        }
        else if (eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].toValue) > eval(this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].coverEventFactorValueTo)) {
            swal("", "Cover event factor to value can not be beyond range defined", "error");
        }
    }



    rangeBenefitValidation = (Iindex, Cindex) => {



    //    let max = 0, min = 0;
    //    let responses = [... this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails];
    //    let BAlen = responses.length;
    //    for (var i = 0; i < BAlen; i++) {
     
    //        let temp = responses[i].benefitAmount;
    //        for (var j = 0; j < responses.length; j++) {

    //            if (temp > responses[j].benefitAmount) {
    //                max = responses[i].benefitAmount;

    //            } else if (temp < responses[j].benefitAmount) {

    //                min = responses[i].benefitAmount;
    //            }

    //        }
        
    //        console.log("max,min", max, min, responses);
    //}
    //    console.log("max,min", max, min, responses);
        //this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].max = max;
        //this.props.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].min = min;
    }


    SetCWEValue = (index, event,level,Iindex,Cindex) => {
     
        console.log("check", event.target.checked)
        let responses = this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex];
        if (level == "Cover") {

            responses['CoversTableList'][index].isPrint = event.target.checked;
        }
        if (level == "Benefit") {
            responses.BenefitTable.BenefitTableList[index].isPrint = event.target.checked;
        }
        this.setState({ responses });
        console.log("pks", this.props.props.props.props.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex]);
    }

    render() {
        console.log("BenefitInterface", this.props, this.props.props.props.props.state)
        return (
            
            <CWEDetails  props={this.props.props.props.props} {...this}/>
            );
    }
}
export default BenefitInterface;