import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, Select } from 'antd'
import { path, suffix } from '../path'
const Option = Select.Option

export class UserActionLine extends React.Component {
  constructor() {
    super()
    this.state = {
      legend: [],
      tag: [],
      tdata: {},
      year: [],
      select: '全部',
    }
  }

  componentDidMount = () => {
    let table = this.props.attr.table
    // let filepath=`${path}/action/${table}${suffix}`
    let filepath=`${path}/${table}${suffix}`
    fetch(filepath)
      .then(res => res.json())
      .then(json => {
        this.setState({
          legend: json.legend,
          tag: json.tag,
          tdata: json.data,
          year: json.year,
          flag: true
        })
      })
      .catch(err => {
        console.log(`Get ${table} Failed！`)
        this.setState({
          flag: false
        })
      })
  }


  getOption = () => {
    let { legend, tag, tdata, year, flag, select } = this.state
    let { title, xname, yname, table } = this.props.attr
    let data = null

    if (flag) {
      if (table == 'UserActionCount') {
        let actions = ['缴费服务', '自抄', '充值服务']
        //tag= ["业务办理", "充值服务", "意见反馈", "液化气服务", "燃气报修", "缴费服务", "自抄"]
        // console.log(legend, tag, tdata)
        data = this.adjustList(actions, year, legend, tag, tdata)
        // console.log(data)
        tag = actions
      }
    }

    let series = []
    for (let t of tag) {
      series.push({
        name: t,
        type: 'line',
        // stack: '总量',
        data: data[select][t]
      })
    }
    let option = {
      title: {
        text: title,
        left: 'center',
      },
      textStyle: {
        fontWeight: 'bold',
        // color: 'black',
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '15%',
      },
      legend: {
        left: 'center',
        bottom: 0,
        data: tag,
      },
      xAxis: {
        name: xname,
        type: 'category',
        boundaryGap: false,
        data: year,
      },
      yAxis: {
        name: yname,
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
          }
        },
      },
      textStyle: {
        fontWeight: 'bold',
      },
      series: series
    }
    return option
  }

  adjustList = (list, year, legend, tag, tdata) => {
    let data = {}
    data['全部'] = {}
    for (let leg of legend) {
      data[leg] = {}
      for (let l of list) {
        data[leg][l] = []
        data['全部'][l] = []
      }
    }

    for (let l of list) {
      let index = tag.indexOf(l)
      for (let y of year) {
        let sum = 0
        for (let leg of legend) {
          data[leg][l].push(tdata[y][leg][index])
          sum += tdata[y][leg][index]
        }
        data['全部'][l].push(sum)
      }
    }
    // console.log(data)
    return data
  }

  selectChange = (key) => {
    // console.log(key)
    this.setState({
      select: key
    })
  }

  render() {
    let head = this.props.attr.head
    let { legend, select } = this.state
    let divstyle = { height: 20 }
    let style = { width: 100, height: 20 }
    let selects = ['全部'].concat(legend)

    return (
      <Card title={
        <React.Fragment>
          {head}
          <div style={divstyle} className='pull-right'>
            <label for='select'>访问方式：</label>
            <Select id='select' defaultValue={select} onChange={this.selectChange} style={style} >
              {selects.map(x => <Option key={x}>{x}</Option>)}
            </Select>
          </div>
        </React.Fragment>}
      >
        <ReactEcharts
          option={this.getOption()}
          style={{ height: 500 }}
          lazyUpdate />
      </ Card>
    )
  }
}