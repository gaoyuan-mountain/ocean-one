import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Button, Select, Table, Badge } from 'antd';
import { withRouter } from 'react-router-dom';
import { activityAction } from '../../redux/activity';
import Bread from 'common-components/Bread';

import './style.less';

const FormItem = Form.Item;
const columns = [{
  title: '活动编号',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '活动名称',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '活动状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => (
    text === 0 ? <Badge status="error" text="已结束" /> : <Badge status="success" text="进行中" />
  ),
}, {
  title: '操作',
  key: 'action',
  render: () => (
    <span>
      <a>删除</a>
    </span>
  ),
}];

const paths = [
  { text: 'Activity', link: '/#/activity/home' },
  { text: '查询表格', link: '/#/activity/searchTable' },
];

class SearchTable extends Component {
  componentDidMount() {
    this.props.dispatch(activityAction.list());
  }

  getSearchFields(fieldLabel, fieldKey) {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col span={8}>
        <FormItem label={fieldLabel}>
          {getFieldDecorator(fieldKey)(
            <Input />
          )}
        </FormItem>
      </Col>
    );
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    return [
      <Bread paths={paths} key="breadcrumb" />,
      <div key="activity-search-table" className="activity-search-table">
        <Card>
          <Form className="ant-advanced-search-form">
            <Row gutter={24}>
              {this.getSearchFields('活动编号', 'activityId')}
              {this.getSearchFields('活动名称', 'activityName')}
              <Col span={8}>
                <FormItem label="活动状态">
                  {this.props.form.getFieldDecorator('activityStatus', {
                    initialValue: 'all'
                  })(
                    <Select placeholder="Please select a country">
                      <Select.Option value="all">全部</Select.Option>
                      <Select.Option value="active">进行中</Select.Option>
                      <Select.Option value="timeover">已结束</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card style={{marginTop: '20px'}}>
          <Button type="primary" icon="plus">新建</Button>
          <Table columns={columns} dataSource={this.props.list} rowKey="id" />
        </Card>
      </div>
    ];
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.activity.list
  };
};

export default withRouter(connect(mapStateToProps)(Form.create()(SearchTable)));
