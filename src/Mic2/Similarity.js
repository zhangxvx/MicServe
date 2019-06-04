import React from 'react'
import { Card, Checkbox, Radio, Divider, Table, Button } from 'antd'
import { path, suffix } from '../path'

const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

const factors = ["用户类型", "性别", "年龄", "地址", "分公司", "账户类型", "户主关系", "用户行为"]
const factorsChecked = factors

const methods = ["余弦相似度", "皮尔森相关系数", "Jaccard相似系数"]
const probablys = ["attr_pro", "act_cos_pro", "act_pearson_pro", "act_jaccard_pro"]

const tableTitlesALL = ["用户ID", "用户标识", "姓名", "潜在概率"]
const tableIndexsAll = ["customer_id", "customer_name", "remark", "attr_pro"]

const tableTitlesOneAttr = ["用户ID", "用户标识", "姓名", "性别", "年龄", "用户类型", "账户类型",
  "所属分公司", "户主关系", "地址", "联系方式", "创建时间",]
const tableIndexsOneAttr = ["customer_id", "remark", "customer_name", "sex", "age", "dept",
  "gas_class", "company_code", "ria_nickname", "customer_address", "user_name", "create_date",]

const tableTitleOneAct = ["业务办理", "自抄", "意见反馈", "充值服务", "缴费服务",]
const tableIndexsOneAct = ["yewu", "zichao", "fankui", "chongzhi", "jiaofei"]
const columnsAll = []
const columnsOne1 = []
const columnsOne2 = []
const columnsOne4 = []


export class Similarity extends React.Component {
  constructor() {
    super()
    this.state = {
      factorsChecked: factorsChecked,
      indeterminate: true,
      factorsCheckAll: false,
      methodKey: 1,//方法选择
      columnsAll: columnsAll,
      oneUser: [],
      allUser: [],
    }
  }
  componentWillMount = () => {
    // 添加表头
    for (let i = 0; i < tableTitlesALL.length; i++) {
      columnsAll.push({
        "title": tableTitlesALL[i],
        "dataIndex": tableIndexsAll[i],
        "key": i.toString(),
        "width": 100
      })
    }

    columnsOne1.push({
      "title": "用户属性信息",
      "children": [],
    })
    columnsOne4.push({
      "title": "用户行为信息",
      "children": []
    })
    for (let i = 0; i < 6; i++) {
      columnsOne1[0]['children'].push({
        "title": tableTitlesOneAttr[i],
        "dataIndex": tableIndexsOneAttr[i],
        "key": i.toString(),
        "width": 100,
      })
      columnsOne2.push({
        "title": tableTitlesOneAttr[i + 6],
        "dataIndex": tableIndexsOneAttr[i + 6],
        "key": (i + 6).toString(),
        "width": 100
      })
      columnsOne4[0]['children'].push({
        "title": tableTitleOneAct[i],
        "dataIndex": tableIndexsOneAct[i],
        "key": (i + 12).toString(),
        "width": 100
      })
    }
    // this.setState({ columnsAll: columnsAll })
  }

  componentDidMount = () => {
    this.getData(this.state.factorsChecked, 'act_cos_pro')
  }

  getData = (checkedList, probably) => {
    if (!checkedList.length) {
      console.log("nodata")
      this.setState({
        allUser: new Array()
      })
    }
    else {
      if ("用户行为" != checkedList[checkedList.length - 1]) {
        columnsAll[3]["dataIndex"] = "attr_pro"
        probably = "attr_pro"
      }
      else {
        columnsAll[3]["dataIndex"] = "probably"
      }
      // let filepath=`${path}user/UserInformation/${table}${suffix}`
      let filepath=`${path}/UserInformation-${probably}${suffix}`
      fetch(filepath)
        .then(res => res.json())
        .then(json => {
          this.setState({
            allUser: json.data,
          })
        })
    }
  }

  onCheckChange = (checkedList) => {
    this.setState({
      factorsChecked: checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < factors.length),
      factorsCheckAll: checkedList.length === factors.length,
    });
    this.getData(checkedList, probablys[this.state.methodKey])
  }

  onCheckAllChange = (e) => {
    this.setState({
      factorsChecked: e.target.checked ? factors : [],
      indeterminate: false,
      factorsCheckAll: e.target.checked,
    });
    this.getData((e.target.checked ? factors : []), probablys[this.state.methodKey])
  }

  onRadioChange = (e) => {
    this.setState({
      methodKey: e.target.value,
    });
    this.getData(this.state.factorsChecked, probablys[e.target.value])
  }

  render() {
    let { factorsChecked, indeterminate, factorsCheckAll, methodKey, allUser } = this.state

    return (
      <Card>
        <span>相似度计算考虑因素:</span>
        <Divider className="divider-none" />
        <CheckboxGroup options={factors} value={factorsChecked} onChange={this.onCheckChange} />
        <Checkbox
          className="pull-right"
          indeterminate={indeterminate}
          onChange={this.onCheckAllChange}
          checked={factorsCheckAll}
        >
          全选
          </Checkbox>
        <Divider />

        <span>行为相似度计算方法:</span>
        <Divider className="divider-none" />
        <RadioGroup onChange={this.onRadioChange} value={methodKey}>
          <Radio value={1}>{methods[0]}</Radio>
          <Radio value={2}>{methods[1]}</Radio>
          <Radio value={3}>{methods[2]}</Radio>
        </RadioGroup>
        <Divider />
        <Table
          align='left'
          rowKey={record => record.customer_id}
          rowClassName={this.setRowClassName}
          columns={columnsAll}
          dataSource={allUser}
          position
          expandIconAsCell={false}
          expandRowByClick
          expandedRowRender={(record) => {
            return (
              <div>
                <Table className='inner-table' bordered align='left' rowKey={record => record.customer_id} columns={columnsOne1} dataSource={[record]} pagination={false} />
                <Table className='inner-table' bordered align='left' rowKey={record => record.customer_id} columns={columnsOne2} dataSource={[record]} pagination={false} />
                <Table className='inner-table' bordered align='left' rowKey={record => record.customer_id} columns={columnsOne4} dataSource={[record]} pagination={false} />
              </div>
            )
          }} />
      </Card>
    );
  }
}
