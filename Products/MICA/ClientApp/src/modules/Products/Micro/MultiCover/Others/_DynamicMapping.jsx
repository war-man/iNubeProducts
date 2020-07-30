import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import ProductConfig from "modules/Products/Micro/views/ProductConfig.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    ...customSelectStyle
};

    const DynamicMapping = (props) => {
    
   console.log("dynamic props",props)
   
        return (
            <GridContainer>
               
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown required={true} labelText="Dispatcher Task Name" lstObject={props.DispatcherMasterList} value={props.productPremium[props.mapindex].dispatcherId} name='dispatcherId' onChange={(e) => props.SetCoverProductDetailsValue('productPremium', e, props.mapindex, 0)} formControlProps={{ fullWidth: true }} />

      
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown required={true} labelText="Mapper Name" lstObject={props.MapperMasterList} value={props.productPremium[props.mapindex].mapperId} name='mapperId' onChange={(e) => props.SetCoverProductDetailsValue('productPremium', e, props.mapindex, 0)} formControlProps={{ fullWidth: true }} />
               
                    {/*<CustomInput
                        // disabled={this.state.disabledflag}

                        labelText="Mapper Name"
                        required={true}
                        value={props.RequestModel[props.mapindex].mapperName}
                        name="mapperName"

                        onChange={(event) => props.SetMapperValue(event, props.mapindex)}

                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    */}
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        // disabled={this.state.disabledflag}

                        labelText="Source Component"
                        required={true}
                        value={props.RequestModel[props.mapindex].sourceComponent}
                        name="sourceComponent"

                        onChange={(event) => props.SetMapperValue(event, props.mapindex)}

                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        //disabled={this.state.disabledflag}

                        labelText="Target Component"
                        required={true}
                        value={props.RequestModel[props.mapindex].targetComponent}
                        name="targetComponent"

                        onChange={(event) => props.SetMapperValue(event, props.mapindex)}

                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown required={true} labelText="Source Parameter"
                        lstObject={props.sourceResponse[props.mapindex].Value}
                        value={props.sourceValue}
                        name='sourceValue'
                        onChange={(e) => props.onSourceChange(e, props.mapindex)}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown required={true} labelText="Target Parameter"
                        lstObject={props.targetResponse[props.mapindex].Value}
                        value={props.targetValue}
                        name='targetValue'
                        onChange={(e) => props.onTargetChange(e, props.mapindex)}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={5} sm={3} md={3} lg={2}>

                    <Button color="info" round
                        onClick={() => props.onADD(props.mapindex)}
                    >
                        Map
                    </Button>
                </GridItem>

                {props.RequestModel[props.mapindex].mapperDetailsDTO.length > 0 && 



                    <GridItem xs={12}>
                        <ReactTable
                    data={props.RequestModel[props.mapindex].mapperDetailsDTO}//this.state.mapperList}
                    filterable
                    columns={[
                        {
                            Header: "Source Parameter",
                            accessor: "sourceParameter",
                            style: { textAlign: "left" },
                            headerClassName: 'react-table-center',
                            resizable: false,
                        },
                        {
                            Header: "Target Parameter",
                            accessor: "targetValue",
                            style: { textAlign: "left" },
                            headerClassName: 'react-table-center',
                            resizable: false,
                        },


                    ]}
                    defaultPageSize={5}
                    // pageSize={([clauseData.MasterDTO.ChangeTableList.tableInsurabledata[props.componentData.Iindex].InsurablesTableDataList.length + 1] < 6) ? [clauseData.MasterDTO.ChangeTableList.tableInsurabledata[props.componentData.Iindex].InsurablesTableDataList.length + 1] : 6}
                    showPaginationTop={false}
                    showPaginationBottom
                    className="-striped -highlight short-tab"

                        />
                    </GridItem>
                        }
                {props.RequestModel[props.mapindex].mapperDetailsDTO.length > 0 && <Button style={{'left':'44%'}} color="info" round
                    onClick={() => props.onSubmit()}
                >
                    SAVE
                    </Button>
                }
                {/*
                   <GridItem xs={12} sm={12} md={4}>
                    <Dropdown required={true} labelText="List2" lstObject={this.state.childList} value="" name='List3' onChange={(e) => this.onChange(e, "List3")} formControlProps={{ fullWidth: true }} />
                </GridItem>
               
                

             
              
               
                    */}
            </GridContainer>);
    
}

export default DynamicMapping;