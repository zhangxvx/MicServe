import React from 'react'
import { Card, Tabs, Row, Col, Divider } from 'antd'
import { UserAttr } from './Mic2/UserAttr'
import { UserAttrStack } from './Mic2/UserAttrStack';
import { UserAction } from './Mic2/UserAction';
import { UserActionLine } from './Mic2/UserActionLine'
import { Similarity } from './Mic2/Similarity';
import { AppUserAttr } from './Mic2/AppUserAttr';
import { AppUserAction } from './Mic2/AppUserAction';
import { AppUserVisitTime } from './Mic2/AppUserVisitTime';


const TabPane = Tabs.TabPane
// 属性特征数据

let attr = [
  {
    "table": "UserTypeCount",
    "head": "用户类型分布",
    "title": "用户类型分布",
    "xname": "用户类型",
    "yname": "用户数目",
  },
  {
    "table": "UserSexCount",
    "head": "性别分布",
    "title": "用户性别分布",
    "xname": "性别",
    "yname": "用户数目",
  },
  {
    "table": "UserAccountTypeCount",
    "head": "账户类型分布",
    "title": "账户类型分布",
    "xname": "账户类型",
    "yname": "用户数目",
  },
  {
    "table": "UserAgeCount",
    "head": "年龄分布",
    "title": "用户年龄分布",
    "xname": "年龄",
    "yname": "用户数目",
  },
  {
    "table": "UserAddressCount",
    "head": "地址分布",
    "title": "用户地址分布",
    "xname": "行政区划",
    "yname": "用户数目",
  },
  {
    "table": "UserCompanyCount",
    "head": "所属分公司分布",
    "title": "用户所属分公司分布",
    "xname": "所属分公司",
    "yname": "用户数目",
  },
  {
    "table": "UserNickNameCount",
    "head": "与户主关系分布",
    "title": "与户主关系分布",
    "xname": "与户主关系",
    "yname": "用户数目",
  }
]
// 行为特征数据
let action = [
  {
    "table": "UserActionCount",
    "head": "行为类型分布",
    "title": "不同行为类型数量分布",
    "subtitle": "",
    "xname": "行为",
    "yname": "人次",
  },
  {
    "table": "UserActionCount",
    "head": "行为类型分布趋势",
    "title": "不同行为类型数量分布趋势",
    "subtitle": "",
    "xname": "年份",
    "yname": "人次",
  },
  {
    "table": "UserActionTimeCount",
    "head": "访问时间段分布",
    "title": "不同访问时间段数量分布",
    "subtitle": "",
    "xname": "时间段",
    "yname": "人次",
  },
  {
    "table": "UserActionAddressCount",
    "head": "访问地点分布",
    "title": "不同访问地点数量分布",
    "subtitle": "此图数据仅供参考",
    "xname": "地点",
    "yname": "人次",
  }
]

export class App extends React.Component {

  render() {
    const style = { width: "80%", marginLeft: "auto", marginRight: "auto" }
    return (
      <Tabs defaultActiveKey="1" size="large" style={style}>
        <TabPane tab="属性特征分析" key="1">
          <Row gutter={0}>
            <Col span={15}> <UserAttr attr={attr[3]} /></Col>
            <Col span={9}><UserAttrStack attr={attr[1]} /></Col>
          </Row><br />
          {/* <UserAttr attr={attr[0]} /><br /> */}
          {/* <UserAttr attr={attr[2]} /><br /> */}
          <UserAttr attr={attr[4]} /><br />
          {/* <UserAttr attr={attr[5]} /><br /> */}
          <UserAttr attr={attr[6]} /><br />
        </TabPane>
        <TabPane tab="行为特征分析" key="2">
          <Row gutter={0}>
            <Col span={15}><UserAction attr={action[0]} /></Col>
            <Col span={9}><UserActionLine attr={action[1]} /></Col>
          </Row><br />
          <UserAction attr={action[2]} /><br />
        </TabPane>
        <TabPane tab="App用户特征分析" key="3">
          <Card title="APP用户属性特征分析">
            <Row gutter={0}>
              <Col span={8}><AppUserAttr attr={attr[0]} /></Col>
              <Col span={8}><AppUserAttr attr={attr[1]} /></Col>
              <Col span={8}><AppUserAttr attr={attr[2]} /></Col>
            </Row>
            <Divider />
            <Row gutter={1}>
              <Col span={12}><AppUserAttr attr={attr[3]} /></Col>
              <Col span={12}><AppUserAttr attr={attr[4]} /></Col>
            </Row>
            <Divider />
            <Row gutter={1}>
              <Col span={12}><AppUserAttr attr={attr[5]} /></Col>
              <Col span={12}><AppUserAttr attr={attr[6]} /></Col>
            </Row>
          </Card><br />
          <Card title="APP用户行为特征分析">
            <Row gutter={16}>
              <Col span={12}><AppUserAction attr={action[0]} /></Col>
              <Col span={12}><AppUserAction attr={action[3]} /></Col>
            </Row><br />
            <Divider />
            <AppUserVisitTime attr={action[2]} />
          </Card>
        </TabPane>
        <TabPane tab="潜在APP用户推荐" key="4">
          <Similarity />
        </TabPane>
      </Tabs>
    )
  }
}