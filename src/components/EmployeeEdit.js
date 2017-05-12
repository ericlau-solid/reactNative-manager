import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { employeeBootstrapForm, employeeUpdateStorage } from '../actions';
import EmployeeForm from './EmployeeForm';

export class EmployeeEditComponent extends Component {
  componentDidMount() {
    this.props.employeeBootstrapForm(this.props.employee);
  }

  renderButton = () => {
    const { name, phone, shift, saving, } = this.props;
    if (saving) {
      return <Spinner size="large" />;
    } 

    return (
      <Button onPress={() => this.props.employeeUpdateStorage({ name, phone, shift })}>
        Save
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift, saving } = employeeForm;
  return { name, phone, shift, saving };
};

export default connect(mapStateToProps, {
  employeeBootstrapForm, employeeUpdateStorage,
})(EmployeeEditComponent);
