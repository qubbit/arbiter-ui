// @ts-check --jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';
import { Table, Divider, Tag } from 'antd';

class ShowRulesets extends Component {
  componentDidMount() {
    this.props.fetchRulesets();
  }

  render() {
    const { rulesets } = this.props;

    if (rulesets.length === 0) {
      return <div>There are no rulesets here</div>;
    }

    const columns = [
      {
        title: 'Partner',
        dataIndex: 'partner',
        key: 'partner'
      },
      {
        title: 'Created',
        dataIndex: 'created_at',
        key: 'created_at'
      },
      {
        title: 'Active',
        dataIndex: 'is_active',
        key: 'is_active',
        render: is_active => (is_active ? 'Yes' : 'No')
      }
    ];

    return (
      <div className="page view-rulesets">
        <Table dataSource={rulesets} columns={columns} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.rulesets
});

export default connect(
  mapStateToProps,
  { ...actions.rulesets }
)(ShowRulesets);
