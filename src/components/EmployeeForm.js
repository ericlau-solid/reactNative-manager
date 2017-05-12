import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, Text, View } from 'react-native';
import { CardSection, TextField } from './common';
import { employeeUpdate } from '../actions';

export class EmployeeFormComponent extends Component {
    render() {
    const { name, phone, shift } = this.props;
    return (
      <View>
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
            <Picker.Item label="Monday" value={1} />
            <Picker.Item label="Tuesday" value={2} />
            <Picker.Item label="Wednesday" value={3} />
            <Picker.Item label="Thursday" value={4} />
            <Picker.Item label="Friday" value={5} />
            <Picker.Item label="Saturday" value={6} />
            <Picker.Item label="Sunday" value={7} />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20,
  }
};

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift } = employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate,
})(EmployeeFormComponent);
