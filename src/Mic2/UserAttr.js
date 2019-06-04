import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, Icon } from 'antd'
import { path, suffix } from '../path'

export class UserAttr extends React.Component {
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
    // let filepath=`${path}/attr/${table}${suffix}`
    let filepath=`${path}/${table}${suffix}`
    fetch(filepath)
      .then(res => res.json())
      .then(json => {
        this.setState({
          legend: json.legend,
          tag: json.tag,
          tdata: json.data,
          flag: true,
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
    let { title, xname, yname, table } = this.props.attr
    let { legend, tag, tdata, flag } = this.state

    let seriesLabelPosition = 'top'
    let piedata = []
    let data = [], rotate = 0, dataZoomShow = false, xZoom = 100
    let center = ['50%', '50%']

    if (flag) {
      /**饼图数据叠加 */
      legend.forEach(x => {
        let value = 0
        tdata[x].forEach(y => {
          value += y
        })
        piedata.push({ value: value, name: x })
      })
      /**数据插入 */
      legend.forEach(x => {
        data.push(tdata[x])
      })

      if (table == 'UserAgeCount') {
        center = ['25%', '30%']
        /**调成legend顺序 */
        let temp = tag[4]
        tag.splice(4, 1)
        tag.splice(0, 0, temp)
        for (let i = 0; i < legend.length; i++) {
          let t = data[i][4]
          data[i].splice(4, 1)
          data[i].splice(0, 0, t)
        }
      }
      else if (table == 'UserAddressCount') {
        rotate = -35
        xZoom = 30
        dataZoomShow = true
        center = ['20%', '35%']
        let address = ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '宝山区',
          '闵行区', '嘉定区', '浦东新区', '松江区', '金山区', '青浦区', '奉贤区', '崇明区', '其它']
        data = this.adjustList(address, legend, tag, data)
        tag = address
      }
      else if (table == 'UserNickNameCount') {
        center = ['70%', '40%']
        let name = ['自己', '默认', '其他', '租房', '父母', '家庭', '子女', '公司']
        data = this.adjustList(name, legend, tag, data)
        tag = name
      }
    }

    let option = {
      title: {
        text: title,
        left: 'center',
        top: 'top',
      },
      textStyle: {
        fontWeight: 'bold',
        // color: 'black',
      },
      tooltip: {
        // trigger: 'axis'
      },
      legend: {
        bottom: 0,
        data: legend,
        // selected: { '官网': false }
      },
      dataZoom: [{
        show: dataZoomShow,
        type: 'slider',
        xAxisIndex: 0,
        zlevel: -1,
        bottom: '5%',
        start: 0,
        end: xZoom,
      }],
      xAxis: {
        name: xname,
        type: 'category',
        axisLabel: {
          interval: 0,
          rotate: rotate
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
        zlevel: -2,
      },
      series: [
        {
          name: legend[0],
          type: 'bar',
          barMaxWidth: 100,
          data: data[0],
          label: {
            normal: {
              show: true, //开启显示
              position: seriesLabelPosition, //在上方显示
              fontSize: 13,
            },
          },

        },
        {
          name: legend[1],
          type: 'bar',
          barMaxWidth: 100,
          data: data[1],
          label: {
            normal: {
              show: true, //开启显示
              position: seriesLabelPosition, //在上方显示
              fontSize: 13,
            },
          },
        },
        {
          name: legend[2],
          type: 'bar',
          barMaxWidth: 100,
          // barMinHeight: 50,
          data: data[2],
          label: {
            normal: {
              show: true, //开启显示
              position: seriesLabelPosition, //在上方显示
              fontSize: 13,
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
          data: data[3],
          label: {
            normal: {
              show: true, //开启显示
              position: seriesLabelPosition, //在上方显示
              fontSize: 13,
            },
          },
        },
        {
          name: '访问方式',
          type: 'pie',
          zlevel: -1,
          center: center,
          radius: '30%',
          data: piedata,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          /*
          label: {
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
          },*/
          labelLine: {
            normal: {
              length: 1,
              smooth: true
            }
          },
        }
      ],
    }
    return option
  }

  /**调成legend顺序 */
  adjustList = (list, legend, tag, data) => {
    let b = [[], [], [], []]
    for (let i = 0; i < list.length; i++) {
      let index = tag.indexOf(list[i])
      for (let j = 0; j < legend.length; j++) {
        let c = b[j]
        c = c.concat(data[j][index])
        b[j] = c
      }
    }
    return b
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

