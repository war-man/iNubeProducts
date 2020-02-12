WHAT HAS BEEN DONE TILL NOW:

1) Counting number of components in each module :-
We need to check if the number of each component in each module is correc. Input and Output for this is from an excel sheet.

2) Cheking if correct components are there in each module :-
For example, 2 modules might have the same number of 'CustomInput' components, but some property of the component for example     'LabelText' property of the 'CustomInput' in each module maybe different. So we need to check if each module has the correct component by looking at the unique properies of eah component. 
The general function which can be used for all components of all modules has been written. What this function does is, it takes in the unique properties and the values of unique properties of the components and checks the code to see if these exist in the right module. The input for this is a file in json format and output is on the console. This should be changed so that  both    input and outputs are from an excel sheet. The function used in the first point(counting components) for getting input and output from excel sheet can be used for this.  

3) Testing component binding :-
 Some components are bound to certain values. For example a dropdown is bound to certain variable from which is gets the contents of the dropdown. We need to check if each dropdown is bound to the correct variable. This variable gets its contents from the server database. During testing, we can not make a call to the server as it takes too long to respond. So what we have done is, provide our own values to the variable and testing it based on that. For this, a function has been written just for 'DropDown' component. Function needs to be written for other components using the same idea and it has to be generalized. 


WHAT ELSE NEEDS TO BE DONE: 
1) Validations
2) Navigation

Imp point - Try to make everything generalized. Nothing should be hardcoded. 