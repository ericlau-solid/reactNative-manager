import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, Text } from 'react-native';
import { Card, CardSection, TextField, Button } from './common';
import { employeeUpdate } from '../actions';

export class EmployeeCreate extends Component {
  render() {
    const { name, phone, shift } = this.props;
    return (
      <Card>
        <CardSection>
          <TextField 
            label={'Name'} placeholder={'Jane'} 
            value={name}
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
          />
        </CardSection>
        <CardSection>
          <TextField 
            label={'Phone'} placeholder={'555-555-5555'} 
            value={phone}
            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
          />
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerLabelStyle}>Shift</Text>
          <Picker
            selectedValue={shift}
            onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Monday" value="1" />
            <Picker.Item label="Tuesday" value="2" />
            <Picker.Item label="Wednesday" value="3" />
            <Picker.Item label="Thursday" value="4" />
            <Picker.Item label="Friday" value="5" />
            <Picker.Item label="Saturday" value="6" />
            <Picker.Item label="Sunday" value="7" />
          </Picker>
        </CardSection>
        <CardSection>
          <Button>
            Add
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20,
  }
};

const mapStateToProps = ({ employeeAddForm }) => {
  const { name, phone, shift } = employeeAddForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate,
})(EmployeeCreate);
