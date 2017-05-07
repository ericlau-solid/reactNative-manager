import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getEmployees } from '../actions';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.getEmployees();
  }

  render() {
    return (
      <View>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps, { getEmployees })(EmployeeList);
