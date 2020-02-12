import ReactTestUtils from 'react-dom/test-utils';

function testsimfunction(wrapper, componentname, prop)
{
    if (componentname == 'Dropdown')
    {
        let loc = prop[0].data;
        wrapper.setState({
            MasterDTO: loc
        });

        for (let i = 0; i < prop[0].array.length; i++)
        {
            //console.log(wrapper.find(componentname).filterWhere(n => n.props()['lstObject'] == prop[0].data[prop[0].array[i]]).props()['labelText']);
            if((wrapper.find(componentname).filterWhere(n => n.props()['lstObject'] == prop[0].data[prop[0].array[i]]).props()['labelText'].localeCompare(prop[0].label[prop[0].array[i]]))!=0)
            {
                return (0);
            }
        }
        return (1);
    }
}
function testfunction(wrapper, componentname, value)
{
    //certain different components
    if (value.propname == 'tabs')
    {
        
        for (let i = 0; i < value.propvalue.length; i++)
        {
            const input = wrapper.find(componentname).filterWhere(n => n.props()[value.propname][i]['tabButton'] == value.propvalue[i]);
            if (input.length != 1)
                return (0);
        }
        return (1);
    }
    
    //any general simple component
    console.log('HELLO',wrapper.find(componentname).filterWhere(n => n.props()[value.propname] == value.propvalue).props()[value.propname]);
    return (wrapper.find(componentname).filterWhere(n => n.props()[value.propname] == value.propvalue).length);

}

export { testfunction, testsimfunction}