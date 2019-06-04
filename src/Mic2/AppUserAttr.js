import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { path, suffix } from '../path'
export class AppUserAttr extends React.Component {
  constructor() {
    super()
    this.state = {
      legend: [],
      tdata: {},
    }
  }

  componentWillMount = () => {
    let table = this.props.attr.table
    // let filepath=`${path}/app/attr/${table}${suffix}`
    let filepath=`${path}/APP${table}${suffix}`
    fetch(filepath)
      .then(res => res.json())
      .then(json => {
        this.setState({
          legend: json.legend,
          tdata: json.data
        })
      })
      .catch(err => console.log(`Get ${table} Failed！`))
  }

  getOption = () => {
    let { legend, tdata } = this.state
    let { title, xname, table } = this.props.attr

    let data = [], legtype = null
    let labelStyle = {
      normal: {
        show: true,
        formatter: '{a|{a}}\n{hr|}\n {b|{b}:}{c|{c}} {per|{d}%} ',
        backgroundColor: '#eee',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 4,
        verticalAlign: 'middle',
        rich: {
          a: {
            color: 'black',
            align: 'center',
            padding: 2,
            fontWeight: 'bolder',
          },
          hr: {
            borderColor: '#aaa',
            width: '100%',
            borderWidth: 0.5,
            height: 0
          },
          b: {
            padding: 2,
            fontWeight: 'bolder',
          },
          c: {
            padding: 2,
            fontWeight: 'bolder',
          },
          per: {
            color: 'white',
            backgroundColor: '#333',
            padding: 2,
            borderRadius: 2,
            fontWeight: 'bolder',
          }
        }
      }
    }

    if (table == 'UserAddressCount') {
      legtype = 'scroll'
      labelStyle = {}
    }

    for (let i = 0; i < legend.length; i++) {
      data.push({ "name": legend[i], "value": tdata[i] })
    }

    let option = {
      title: {
        text: title,
        left: 'center',
        top: 'top'
      },
      textStyle: {
        fontWeight: 'bold',
        // color: 'black',
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        type: legtype,
        left: 'center',
        bottom: 0,
        data: legend,
      },
      series: [
        {
          name: xname,
          type: 'pie',
          radius: '45%',
          data: data,
          label: labelStyle,
          labelLine: {
            normal: {
              length: 1,
              smooth: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
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