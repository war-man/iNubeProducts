/*
**READ ME:
**--------
**
**This is the main file for writing test scripts. We take input from an excel file, create a new excel file
**and override the excelsheet. Modifying the same file can causes a few issues 
**(as on the day this comment was made) including:
**---1.All rows and columns having data are hidden by default
**---2.If we modify the excel file the cells sometimes get linked.
**-----So colour of one cell gets binded to colour of another
**and the code to get around these is way too long compared to creating a new workbook. We could have used 
**xlsx-js instead of exceljs but styling and colours is only supported in the paid version.
**
**To execute the file, open the shell(command prompt/terminal) and run npm test. If there are any issues,
**there is a file containing issues already encountered.
** ~Abhay
*/


//Related to enzyme==================================================================================================
import React from 'react';
import { shallow, configure, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
jest.setTimeout(50000);//Change this line to change the timeout
//-------------------------------------------------------------------------------------------------------------------

//Related to Redux==================================================================================================
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
//-------------------------------------------------------------------------------------------------------------------

//Related to getting test data and importing other files=============================================================
import { apiMockList } from './ApiHandler.js'
import Excel from 'exceljs';
const TESTINPUT = './Test/TestData.xlsx'; //How to go to excel file from root directory(Client App Folder)
const BackPath = '../src/'; //Dynamically imported components take path relative to test file(the one currently open). 
//So we need  to specify a back path for reaching src folder from the test file.
//This is a bug. Do something in the babelrc file to get rid of this issue
const dynamicallyImportedComponents = {};//Structure will be filled by a config sheet
import { testfunction, testsimfunction } from './generalfunction.js';
import testlist from './generalInput.js';
//-------------------------------------------------------------------------------------------------------------------

//Related to handling server calls===================================================================================
require('isomorphic-fetch'); //To interpret the fetch function used in a few pages
import nock from 'nock'; //To mock API requests. Look into the API handler file for more details
import waitUntil from 'async-wait-until'; //To halt the test until a condition is met(mainly to wait until loaded)
//-------------------------------------------------------------------------------------------------------------------

//Global constants===================================================================================================

const oldWorkbook = new Excel.Workbook(); //The input excel file
const newWorkbook = new Excel.Workbook(); //Output excel file which overrides old file.

const successColor = 'FF00FF00' //In argb hex code
const failureColor = 'FFFF0000' //In argb hex code
const headingColor = 'FF66FFF7' //In argb hex code

//argb code is alpha, red, green and blue in form 'aarrggbb'. All values range 0-255 and are written in hex
//Under any circumstance, do NOT, I repeat, do NOT set success to red and failure to green


const rowColorForHeading = { type: 'pattern', pattern: 'solid', fgColor: { argb: headingColor } };
const rowColorForSuccess = { type: 'pattern', pattern: 'solid', fgColor: { argb: successColor } };
const rowColorForFailure = { type: 'pattern', pattern: 'solid', fgColor: { argb: failureColor } };
const tabColorForSuccess = { argb: successColor };
const tabColorForFailure = { argb: failureColor };
const tabColorForHeading = { argb: headingColor };
//-------------------------------------------------------------------------------------------------------------------


//Global variables===================================================================================================
let oldWorksheet = ''; //old sheet for each test
let newWorksheet = '';//new sheet for each test
let sheetName = ''; //required to identify the test
let ColumnTranslation = {};//To identify column number from names. Useful if somone decides to reorder  the columns.
let testPasses = true;//Check if overall test passed or failed 
let columnWidth = 0; //Width of each column
let readLoaded = false;//To halt execution till excel has been read from
let writeLoaded = false;//To halt execution till excel has been written into
let configurationsLoaded = false;
//-------------------------------------------------------------------------------------------------------------------


//Description about the test=========================================================================================
describe('Test for MICA', () => {//Describe the test
    //-------------------------------------------------------------------------------------------------------------------


    //Mocking APIs=======================================================================================================
    beforeAll(() => {
        for (let i = 0; i < apiMockList.length; i++) {
            let url = apiMockList[i].url;
            let requestType = apiMockList[i].requestType;
            let path = apiMockList[i].path;
            let requestData = apiMockList[i].requestData;
            let responseCode = apiMockList[i].responseCode;
            let responseBody = apiMockList[i].responseBody;
            nock(url).persist()[requestType](path, requestData).reply(responseCode, responseBody);
        }
    });
    //-------------------------------------------------------------------------------------------------------------------


    //Description about what the test does===============================================================================
    it('Could successfully get input and modify the excel file', async () => { //Test should be async to use waitUntil()
        //-------------------------------------------------------------------------------------------------------------------


        //Reading the input file (Testdata.xlsx)=============================================================================
        oldWorkbook.xlsx.readFile(TESTINPUT).then(() => { readLoaded = true });
        await waitUntil(() => readLoaded);
        //-------------------------------------------------------------------------------------------------------------------

        /********************************************************************************************************************
        ============================================BEGINNING OF CONFIGURATIONS==============================================
        ********************************************************************************************************************/

        //Configuration 1: Configure the imports of modules based on path names==============================================

        //<<Step 1>>: Create a new worksheet (simply edit the sheetname in each configuration):
        sheetName = 'Module Path Resolver';
        oldWorksheet = oldWorkbook.getWorksheet(sheetName);
        newWorksheet = newWorkbook.addWorksheet(sheetName);
        console.log('count:', oldWorksheet.rowCount);
        for (let i = 1; i <= oldWorksheet.rowCount; i++)
            for (let j = 1; j <= oldWorksheet.columnCount; j++) {
                newWorksheet.getRow(i).getCell(j).value = oldWorksheet.getRow(i).getCell(j).value
            }

        //<<Step 2>>: Set value of column Translation(No need to change anything here):
        ColumnTranslation = {}
        for (let j = 1; j <= oldWorksheet.columnCount; j++) { ColumnTranslation['' + oldWorksheet.getRow(1).getCell(j).value] = j }

        //<<Step 3>>: Do the configurations:
        for (let i = 2; i <= newWorksheet.rowCount; i++) {
            let moduleName = newWorksheet.getRow(i).getCell(ColumnTranslation['Module']).value;
            let modulePath = newWorksheet.getRow(i).getCell(ColumnTranslation['Module Path']).value;
            if (moduleName === null) throw ('Custom error. Received a blank cell for "Module"\nIn row number ' + i + '\nIn configuration sheet "' + sheetName + '"');
            if (modulePath === null) throw ('Custom error. Received a blank cell for "Module Path"\nIn row number ' + i + '\nIn configuration sheet "' + sheetName + '"');
            let unextractedModule = await import(modulePath);
            dynamicallyImportedComponents[moduleName] = unextractedModule.default;

        }

        //<<Step 4>>: Set configuration colours
        for (let i = 1; i <= newWorksheet.rowCount; i++) {
            let row = newWorksheet.getRow(i);
            //Heading colour for first row
            if (i == 1) {
                for (let j = 1; j <= newWorksheet.columnCount; j++) { row.getCell(j).fill = rowColorForHeading; }
            }
            //Success colour for next row
            else {
                for (let j = 1; j <= newWorksheet.columnCount; j++) { row.getCell(j).fill = rowColorForSuccess }
            }
        }


        //<<Step 5>>: Specify Tab colour of sheet (No need to change anything here):
        newWorksheet.properties.tabColor = tabColorForHeading;

        //<<Step 6>>: Set column width (Change only width)
        columnWidth = 30
        for (let j = 1; j <= newWorksheet.columnCount; j++) { newWorksheet.getColumn(j).width = columnWidth }

      




        /********************************************************************************************************************
        ==============================================END OF CONFIGURATIONS==================================================
        ********************************************************************************************************************/


        /********************************************************************************************************************
        ============================================BEGINNING OF ALL TEST CASES==============================================
        ********************************************************************************************************************/

        //Test case 1: Test for number of components==========================================================================

        //<<Step 1>>: Create a new worksheet (simply edit the sheetname in each test):
        testPasses = true;
        sheetName = 'Number Of Components';
        oldWorksheet = oldWorkbook.getWorksheet(sheetName);
        newWorksheet = newWorkbook.addWorksheet(sheetName);
        for (let i = 1; i <= oldWorksheet.rowCount; i++)
            for (let j = 1; j <= oldWorksheet.columnCount; j++) {
                newWorksheet.getRow(i).getCell(j).value = oldWorksheet.getRow(i).getCell(j).value
            }

        //<<Step 2>>: Set value of column Translation(No need to change anything here):
        ColumnTranslation = {}
        for (let j = 1; j <= oldWorksheet.columnCount; j++) { ColumnTranslation['' + oldWorksheet.getRow(1).getCell(j).value] = j }

        //<<Step 3>>: Do the test (make calculations and write output to the new worksheet sheet):
        const initialState = { output: 10 } //these 3 lines are for redux components
        const mockStore = configureStore()
        let store, ModuleTag
        for (let i = 2; i <= newWorksheet.rowCount; i++) {
            let moduleName = newWorksheet.getRow(i).getCell(ColumnTranslation['Module']).value;
            let Module = dynamicallyImportedComponents[moduleName];
            //let ModuleTag=mount(<Module/>);
            store = mockStore(initialState)
            ModuleTag = mount(<Provider store={store}><Module /></Provider>)
            let value = ModuleTag.find(newWorksheet.getRow(i).getCell(ColumnTranslation['Component']).value).length
            newWorksheet.getRow(i).getCell(ColumnTranslation['Actual Occurrences']).value = value;
        }

        //<<Step 4>>: Set test case colours(set consitions for success and error):
        for (let i = 1; i <= newWorksheet.rowCount; i++) {
            let row = newWorksheet.getRow(i);
            //Heading colour for first row
            if (i == 1) {
                for (let j = 1; j <= newWorksheet.columnCount; j++) { row.getCell(j).fill = rowColorForHeading; }
            }
            //Condition for success
            else if (row.getCell(ColumnTranslation['Expected Occurrences']).value == row.getCell(ColumnTranslation['Actual Occurrences']).value) {
                for (let j = 1; j <= newWorksheet.columnCount; j++) { row.getCell(j).fill = rowColorForSuccess }
            }
            //Condition for failure
            else {
                for (let j = 1; j <= newWorksheet.columnCount; j++) { row.getCell(j).fill = rowColorForFailure }
                testPasses = false;
            }
        }

        //<<Step 5>>: Specify Tab colour of sheet (No need to change anything here):
        if (testPasses)
            newWorksheet.properties.tabColor = tabColorForSuccess;
        else
            newWorksheet.properties.tabColor = tabColorForFailure;


        //<<Step 6>>: Set column width (Change only width)
        columnWidth = 15
        for (let j = 1; j <= newWorksheet.columnCount; j++) { newWorksheet.getColumn(j).width = columnWidth }


        //<<Step 7>>: Set filters to columns (Might not work as there is an issue with autofilters in exceljs. Check if this can be fixed)
        newWorksheet.autoFilter = {
            from: { row: 1, column: 1 },
            to: { row: newWorksheet.rowCount, column: newWorksheet.columnCount }
        };

        //End of test case 1-------------------------------------------------------------------------------------------------




        /********************************************************************************************************************
        ==============================================END OF ALL TEST CASES==================================================
        ********************************************************************************************************************/


        //Handling sheets from old workbook that were not added to the new workbook==========================================

        /*
        **(Presently,ignores all sheets in old workbook that were not mentioned in this test file.
        **If you want to preserve those sheets, for some reason, iterate through all sheets in old workbook
        **and add those sheets which were missing to the new workbook
        */

        //-------------------------------------------------------------------------------------------------------------------

        //Writing the output file Testdata.xlsx)=============================================================================
        newWorkbook.xlsx.writeFile(TESTINPUT).then(() => { writeLoaded = true });
        await waitUntil(() => writeLoaded);
        //-------------------------------------------------------------------------------------------------------------------

        //Conclude the asynchronous test=====================================================================================
        //        done();
    })

    /******************************TEST TO SEE IF CORRECT COMPONENTS ARE GETTING RENDERED**********************************/
    for (let i = 0; i < testlist.testcases.length; i++) {
        test('Rendering correct components for ' + testlist.testcases[i].name, () => {
            for (let j = 0; j < testlist.testcases[i].components.length; j++) {
                let Temp = testlist.testcases[i].module;
                let wrapper = mount(< Temp />);
                //testsimfunction(wrapper);
                let component = testlist.testcases[i].components[j].componentname;
                for (let k = 0; k < testlist.testcases[i].components[j].prop.length; k++) {
                    var value = testlist.testcases[i].components[j].prop[k];

                    expect(testfunction(wrapper, component, value)).toBe(1);
                    //console.log('done');
                }
            }
        });
    }
    /**********************************************************************************************************************/

    /******************************TESTS TO CHECK BINDING OF COMPONENTS****************************************************/
   for (let i = 0; i < testlist.testsimulations.length; i++) {
        test(testlist.testsimulations[i].name, () => {
            let Temp = testlist.testsimulations[i].module;
            let x = testlist.testsimulations[i];
            console.log(x.components[0]);
            let wrapper = mount(< Temp />);
            for (let j = 0; j < x.components.length; j++) {
                expect(testsimfunction(wrapper, x.components[j].componentname, x.components[j].prop)).toBe(1);
            }
        });
    }


    /**********************************************************************************************************************/
  
})
//--------