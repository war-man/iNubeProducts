import ProductConfig from "../src/modules/Products/Micro/views/ProductConfig.jsx";
import LoginPage from "../src/modules/Login/views/LoginPage.jsx";
//import PasswordPage from "../src/modules/Login/views/PasswordPage.jsx";
import CreatePartner from "../src/modules/Partners/Organization/views/CreatePartner.jsx";

//need to import the modules that you are testing 

export default
{
    //input for checking if correct components aare getting rendered
    testcases:
    [
          /*{
                name: 'name of the page wich you are testing as a string. This name will appear on the console',
                module: exact name of the module you want to test,
                components: [ {componentname: 'name of component', prop: [{propname: 'name of the prop which is unique to this component',propvalue: 'vale of the prop which is unique to this component'}]} ],
                
            },*/
            {
                name: 'Login Page',
                module: LoginPage,
                components: [{ componentname: 'CustomInput', prop: [{propvalue:"Username",propname:'labelText'}]}]

                
            },
            {
                name: 'Create Partner',
                module: CreatePartner,
                components: [{ componentname: 'CustomInput', prop: [{ propvalue: "Partner Name", propname: "labelText" }] },
                             { componentname: 'CustomInput', prop: [{ propvalue: "Telephone", propname: "labelText" }] }
                            ]
                             
            },
            {
                name: 'Product Config Page',
                module: ProductConfig,
                components: [
                                {
                                    componentname: 'CustomInput',
                                    prop: [ { propvalue: 'Product Name', propname: 'labelText' },
                                            { propvalue: 'Product Code', propname: 'labelText' }]
                                },

                                {
                                    componentname: 'Dropdown',
                                    prop: [{ propvalue: 'Line Of Business', propname: 'labelText' },
                                           { propvalue:'Class Of Business', propname:'labelText'}]
                                },
                                {
                                    componentname: 'CustomDatetime',
                                    prop: [{propvalue: 'Active From', propname:'labelText'},
                                           { propvalue:'Active To', propname:'labelText'}]
                                },
                                {
                                    componentname: 'MasterDropdown',
                                    prop:[{ propvalue:'Product Status',propname:'labelText'} ]
                                },
                                {
                                    componentname: 'NavPills',
                                    prop:[{ propvalue: ['Coverage', 'Clauses', 'Others'], propname:'tabs'}]
                                }
                                 
                            ]
            }
        
            /*{
                name: 'Coverage,ProductConfig',
                simulation: 'yes',
                binding: '',
                module: ProductConfig,
                components:
                [
                    {
                        componentname: 'Dropdown',
                        prop: [//covers
                               { propvalue: 'Covers', propname: 'labelText' },
                               { propvalue: 'Cover Event', propname: 'labelText' },
                               { propvalue: 'Cover Event Factor', propname: 'labelText' },
                               { propvalue: 'Cover Event Factor Unit', propname: 'labelText' },
                               //insurables
                               { propvalue: 'Insurable Items', propname: 'labelText' },
                               //Benefits
                               { propvalue: 'Benefit Criteria', propname: 'labelText' }
                        ]
                    },
                    {
                        componentname: 'CustomInput',
                        prop: [//covers
                               //{ propvalue: 'Cover Description', propname: 'labelText' },
                               { propvalue: 'Cover Event From Factor Value', propname: 'labelText',conditional: 1},
                               { propvalue: 'Cover Event To Factor Value', propname: 'labelText',conditional:1 },
                               //benefit
                               { propvalue: 'Benefit Criteria Value', propname: 'labelText' },
                               { propvalue: 'Benefit Amount', propname: 'labelText' },
                               { propvalue: 'Maximum Benefit Amount', propname: 'labelText' },
                               //premium
                               { propvalue: 'Premium Amount', propname: 'labelText' }
                        ]
                    },
                    {
                        componentname: 'FormControlLabel',
                        prop: [{ propvalue: 'Single', propname: 'label' },
                               { propvalue: 'Range', propname: 'label' }]
                    }
                    
                ]
            }*/

          
    ],

    //to check if component binding is correct 
    testsimulations:
    [
        {
            name: 'Product Config Page simulation',
            module: ProductConfig,
            components:
            [{
                  componentname: 'Dropdown',
                    prop: [{
                         
                          data:
                          {
                             LOB: [1],
                             COB: [2],
                             Cover: [3],
                             CoverEvent: [4],
                             CoverEventFactor: [5],
                             CoverEventFactorValue: [6],
                             InsuranceType: [7],
                            // Risk: [8],
                            // Claim: [9],
                            // channel: [10],
                             BenefitCriteria: [11]           
                          },
                          label:
                          {
                              'LOB':'Line Of Business',
                              'COB':'Class Of Business' ,
                              'Cover':'Covers',
                              'CoverEvent':'Cover Event',
                              'CoverEventFactor':'Cover Event Factor' ,
                              'CoverEventFactorValue':'Cover Event Factor Unit' ,
                              'InsuranceType':'Insurable Items' ,
                             // 'Risk':'risks',
                              //'Claim':'claims',
                              //'channel':'channel',
                              'BenefitCriteria':'Benefit Criteria'
                          },
                          array:
                          [
                                'LOB',
                                'COB',
                                'Cover',
                                'CoverEvent',
                                'CoverEventFactor' ,
                                'CoverEventFactorValue' ,
                                'InsuranceType',
                              //  'Risk',
                              //  'Claim',
                              //  'channel',
                                'BenefitCriteria'
                          ]

                  }]
            }]
        }
        
    ]
    
}


