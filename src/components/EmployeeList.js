import React, { Component } from 'react';
import _map from 'lodash/map';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { getEmployees } from '../actions';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.getEmployees();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource = ({ employees }) => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow = (employee) => (
    <EmployeeListItem employee={employee} />
  );

  render() {
    return (
      <ListView 
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => ({
  employees: _map(state.employees, (val, uid) => ({
    ...val, uid
  }))
});

export default connect(mapStateToProps, { getEmployees })(EmployeeList);
