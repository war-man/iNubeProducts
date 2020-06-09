import React from "react";
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import NeedAnalysis from "./NeedAnalysis.jsx";
import Modify from "../Lead/Modify.jsx";

const ModifyProspect =(props)=> {

    let classes = props.classes;
  
       
    return (
        <div>
           

            <Card className="assignCard">
                
                <CardBody>
                    <GridContainer lg={12} justify="center">
                        <GridItem xs={12}>
                            <Accordion
                                active={0}
                                collapses={[
                                   
                                    {
                                        title: "Prospect Information",
                                        content: < Modify props={props} modifypage="true" />
                                      
                                    },
                                
                                    {
                                       
                                        title: "Need Analysis",
                                        content: <NeedAnalysis />



                                    }
                                ]}
                            />
                        </GridItem>
                    </GridContainer>

               </CardBody>
                  
            </Card>
        </div>
        );
    


            }

export default ModifyProspect;
