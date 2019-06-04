import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Select } from 'antd'
import { path, suffix } from '../path'
export class AppUserVisitTime extends React.Component {
  constructor() {
    super()
    this.state = {
      legend: [],
      tdata: {},
      year: [],
    }
  }

  componentDidMount = () => {
    let table = this.props.attr.table
    // let filepath=`${path}/app/action/${table}${suffix}`
    let filepath=`${path}/APP${table}${suffix}`
    fetch(filepath)
      .then(res => res.json())
      .then(json => {
        this.setState({
          legend: json.legend,
          tdata: json.data,
          year: json.year,
          flag: 1,
        })
      })
      .catch(err => console.log(`Get ${table} Failed！`))
  }

  handleChange = (value) => {
    this.setState({
      year: value
    })
  }

  getOption = () => {
    let { legend, tdata, year, flag } = this.state
    let { title, xname, yname } = this.props.attr

    let option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          show: true,
          top: '5%',
          // bottom: 0,
          left: 'center',
          autoPlay: true,
          playInterval: 2000,
          data: year
        },
        title: {
          text: title,
          left: 'center'
        },
        textStyle: {
          fontWeight: 'bold',
          // color: 'black',
        },
        tooltip: {
          // trigger: 'axis',
        },
        xAxis: {
          name: xname,
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: -30,
          },
          data: legend
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
            type: 'bar',
            barMaxWidth: 100,
            // data: data,
            label: {
              normal: {
                show: true, //开启显示
                position: 'top', //在上方显示
                color: '#000000',
              },
            },
          }
        ],
        // color: color
      },
      options: [
        {
          series: [
            {
              data: flag ? tdata[year[0]] : []
            }
          ]
        },
        {
          series: [
            {
              data: flag ? tdata[year[1]] : []
            }
          ]
        },
        {
          series: [
            {
              data: flag ? tdata[year[2]] : []
            }
          ]
        },
        {
          series: [
            {
              data: flag ? tdata[year[3]] : []
            }
          ]
        }
      ]
    }

    return option
  }

  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        style={{ height: 500 }}
        lazyUpdate />
    )
  }
}