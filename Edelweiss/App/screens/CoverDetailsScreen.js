import * as React from 'react';
import { List, Checkbox,Text } from 'react-native-paper';

export default class CoverDetailsScreen extends React.Component {
  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return (
      <List.Section title="">
        <List.Accordion
          title="Cover details"
          left={props => <List.Icon {...props} icon="folder" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Billing details"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={this.state.expanded}
          onPress={this._handlePress}
        >
        <Text>
          <List.Item title="Total usage: 25 days" />
          <List.Item title="Billing:250rs" />
           <List.Item title="GST:50rs" />
            <List.Item title="Total:300rs" />
             <List.Item title="Billing:20rs" />
              <List.Item title="Febuary Billing:320rs" />
</Text>
        </List.Accordion>
      </List.Section>
    );
  }
}

