import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, Icon } from 'antd'
import {path ,suffix}  from '../path'


export class UserAttrStack extends React.Component {
  constructor() {
    super()
    this.state = {
      legend: [],
      tag: [],
      tdata: {},
    }
  }

  componentWillMount = () => {
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
          flag: 1
        })
      })
      .catch(err => console.log(`Get ${table} Failed！`))
  }

  getOption = () => {
    let { title, xname, yname, table } = this.props.attr
    let { legend, tag, tdata, flag } = this.state

    let seriesLabelPosition = 'insideTop'
    let data = []

    if (flag) {
      // console.log("legend:", legend, "tag:", tag, "tdata:", tdata)
      for (let i = 0; i < legend.length; i++) {
        data[i] = tdata[legend[i]]
        // data[i] = []
        // tag.forEach(x => {
        //   data[i].push(tdata[x][i])
        // })
      }
      // console.log(data)
    }

    let option = {
      title: {
        text: title,
        x: 'center',
        y: 'top',
      },
      textStyle: {
        fontWeight: 'bold',
        // color: 'black',
      },
      grid: {
        left: '15%',
      },
      tooltip: {
        // trigger: 'axis'
      },
      legend: {
        bottom: 0,
        data: legend,
        // selected: { '官网': false }
      },
      xAxis: {
        name: xname,
        type: 'category',
        axisLabel: {
          interval: 0
        },
        data: tag
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
      series: [
        {
          name: legend[0],
          type: 'bar',
          stack: '总数',
          barMaxWidth: 100,
          // barMinHeight: 50,
          data: data[0],
          label: {
            normal: {
              show: true, //开启显示
              position: seriesLabelPosition, //在上方显示
            }
          }
        },
        {
          name: legend[1],
          type: 'bar',
          stack: '总数',
          barMaxWidth: 100,
          // barMinHeight: 50,
          data: data[1],
          label: {
            normal: {
              show: true, //开启显示
              position: seriesLabelPosition, //在上方显示
            }
          }
        },
        {
          name: legend[2],
          type: 'bar',
          stack: '总数',
          barMaxWidth: 100,
          // barMinHeight: 50,
          data: data[2],
          label: {
            normal: {
              show: true, //开启显示
              position: seriesLabelPosition, //在上方显示
            }
          }
        },
        {
          name: legend[3],
          type: 'bar',
          stack: '总数',
          // barMaxWidth: 100,
          // barMinHeight: 50,
          // barGap: '0%',
          // barCategoryGap: '1%',
          data: data[3],
          label: {
            normal: {
              show: true, //开启显示
              position: seriesLabelPosition, //在上方显示
              fontSize: 13,
            }
          }
        }
      ]
    }
    return option
  }

  render() {
    let head = this.props.attr.head

    return (
      <Card title={head}>
        <ReactEcharts
          option={this.getOption()}
          style={{ height: 500 }}
          lazyUpdate />
      </Card>
    )
  }
}

