// @ts-check --jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';
import { Table } from 'antd';
import { format, formatDistance } from 'date-fns';

class ShowRulesets extends Component {
  componentDidMount() {
    this.props.fetchRulesets();
  }

  render() {
    const { rulesets, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

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
        key: 'created_at',
        render: created_at => (
          <span>
            <span>
              {format(new Date(created_at), 'MM/dd/YYYY', {
                awareOfUnicodeTokens: true
              })}{' '}
            </span>
            (<em>{formatDistance(new Date(created_at), new Date())}</em>)
          </span>
        )
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
