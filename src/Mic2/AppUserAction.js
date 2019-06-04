import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {path ,suffix}  from '../path'

export class AppUserAction extends React.Component {
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
          flag: 1
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
    let { title, table, subtitle, xname } = this.props.attr
    let { legend, tdata, year, flag } = this.state

    let data = {}
    let selected = {}
    let legendBottom = 0

    for (let y of year) {
      data[y] = []
      for (let i = 0; i < legend.length; i++) {
        data[y].push({ "name": legend[i], "value": tdata[y][i] })
      }
    }
    // console.log(data)
    if (table == "UserActionCount") {
      selected = { '缴费服务': false, '自抄': false }
    }
    else {
      legendBottom = 25
    }

    let option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          show: true,
          left: '20%',
          right: '20%',
          bottom: '10%',
          autoPlay: true,
          playInterval: 2000,
          data: year
        },
        textStyle: {
          fontWeight: 'bold',
          // color: 'black',
        },
        title: {
          text: title,
          subtext: subtitle,
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          width: '70%',
          bottom: legendBottom,
          data: legend,
          selected: selected,
        },
        series: [
          {
            name: xname,
            type: 'pie',
            radius: '45%',
            center: ['50%', '45%'],
            // data: data,
            label: {
              normal: {
                formatter: '{a|{a}}\n{hr|}\n {b|{b}:}{c|{c}} {per|{d}%}  ',
                backgroundColor: 'white',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                fontWeight: 'bold',
                verticalAlign: 'middle',
                rich: {
                  a: {
                    align: 'center',
                    padding: 2
                  },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    color: 'black',
                    padding: 2
                  },
                  c: {
                    color: 'black',
                    padding: 2
                  },
                  per: {
                    color: 'white',
                    backgroundColor: '#333',
                    padding: 2,
                    borderRadius: 2
                  }
                }
              }
            },
            labelLine: {
              normal: {
                length: 1,
                // length2: 2
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
      },
      options: [
        {
          series: [
            {
              data: flag ? data[year[0]] : []
            }
          ]
        },
        {
          series: [
            {
              data: flag ? data[year[1]] : []
            }
          ]
        },
        {
          series: [
            {
              data: flag ? data[year[2]] : []
            }
          ]
        },
        {
          series: [
            {
              data: flag ? data[year[3]] : []
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