import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd'
import { path, suffix } from '../path'

export class UserAction extends React.Component {
  constructor() {
    super()
    this.state = {
      legend: [],
      tag: [],
      tdata: {},
      year: [],
      flag: false,
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
    let { legend, tag, tdata, year, flag } = this.state
    let { title, xname, yname, table } = this.props.attr

    let xrotate = 0, xZoomEnd = 100, dataZoom = false

    if (flag) {
      if (table == 'UserActionCount') {
        let actions = ['缴费服务', '自抄', '充值服务', '业务办理', '液化气服务', '燃气报修', '意见反馈']
        // ["业务办理", "充值服务", "意见反馈", "液化气服务", "燃气报修", "缴费服务", "自抄"]
        // console.log(legend, tag, tdata)
        tdata = this.adjustList(actions, year, legend, tag, tdata)
        // console.log(data)
        tag = actions

      }
      else if (table == 'UserActionTimeCount') {
        xrotate = -30
        xZoomEnd = 50
        dataZoom = true
      }
    }

    let option = {
      //timeline基本配置都写在baseoption 中
      baseOption: {
        timeline: {
          axisType: 'category',
          show: true,
          top: '10%',
          left: '25%',
          right: '27%',
          autoPlay: true,
          playInterval: 2000,
          data: year,
          lineStyle: {
            width: 1,
          },
        },
        textStyle: {
          fontWeight: 'bold',
          // color: 'black',
        },
        title: {
          text: title,
          left: 'center',
        },
        tooltip: {
          // trigger: 'axis'
        },
        legend: {
          left: 'center',
          bottom: 0,
          data: legend,
          // selected: { '官网': false }
        },
        dataZoom: [
          {
            show: dataZoom,
            type: 'slider',
            xAxisIndex: 0,
            // zlevel:1,
            bottom: '5%',
            start: 0,
            end: xZoomEnd,
          },
        ],
        xAxis: {
          name: xname,
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: xrotate
          },
          data: tag
        },
        yAxis: {
          name: yname,
          type: 'value',
          splitLine: {
            // show: false,
            lineStyle: {
              type: 'dashed',
            }
          },
        },
        series: [
          {
            name: legend[0],
            type: 'bar',
            barMaxWidth: 100,
            // barMinHeight: 50,
            label: {
              normal: {
                show: true, //开启显示
                position: 'top', //在上方显示
              },
            },
          },
          {
            name: legend[1],
            type: 'bar',
            barMaxWidth: 100,
            // barMinHeight: 50,
            label: {
              normal: {
                show: true, //开启显示
                position: 'top', //在上方显示
              },
            },
          },
          {
            name: legend[2],
            type: 'bar',
            barMaxWidth: 100,
            // barMinHeight: 50,
            label: {
              normal: {
                show: true, //开启显示
                position: 'top', //在上方显示
              },
            },
          },
          {
            name: legend[3],
            type: 'bar',
            barMaxWidth: 100,
            // barMinHeight: 50,
            barGap: '0%',
            barCategoryGap: '50%',
            label: {
              normal: {
                show: true, //开启显示
                position: 'top', //在上方显示
              },
            },
          }
        ],
        textStyle: {
          fontWeight: 'bold',
          // color: 'black',
        },
      },
      //变量则写在options中
      options:
        [
          {
            series: [
              {
                data: flag ? tdata[year[0]][legend[0]] : []
              },
              {
                data: flag ? tdata[year[0]][legend[1]] : []
              },
              {
                data: flag ? tdata[year[0]][legend[2]] : []
              },
              {
                data: flag ? tdata[year[0]][legend[3]] : []
              },
            ]
          },
          {
            series: [
              {
                data: flag ? tdata[year[1]][legend[0]] : []
              },
              {
                data: flag ? tdata[year[1]][legend[1]] : []
              },
              {
                data: flag ? tdata[year[1]][legend[2]] : []
              },
              {
                data: flag ? tdata[year[1]][legend[3]] : []
              },
            ]
          },
          {
            series: [
              {
                data: flag ? tdata[year[2]][legend[0]] : []
              },
              {
                data: flag ? tdata[year[2]][legend[1]] : []
              },
              {
                data: flag ? tdata[year[2]][legend[2]] : []
              },
              {
                data: flag ? tdata[year[2]][legend[3]] : []
              },
            ]
          },
          {
            series: [
              {
                data: flag ? tdata[year[3]][legend[0]] : []
              },
              {
                data: flag ? tdata[year[3]][legend[1]] : []
              },
              {
                data: flag ? tdata[year[3]][legend[2]] : []
              },
              {
                data: flag ? tdata[year[3]][legend[3]] : []
              },
            ]
          },
        ]
    }
    return option
  }

  adjustList = (list, year, legend, tag, tdata) => {
    let data = {}
    for (let y of year) {
      data[y] = {}
      for (let leg of legend) {
        data[y][leg] = []
      }
    }
    for (let i = 0; i < list.length; i++) {
      let index = tag.indexOf(list[i])
      for (let y of year) {
        for (let leg of legend) {
          let c = data[y][leg]
          c = c.concat(tdata[y][leg][index])
          data[y][leg] = c
        }
      }
    }
    return data
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