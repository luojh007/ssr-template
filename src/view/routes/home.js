import React, { Component } from 'react'
import styles from './home.less'
export default class Home extends Component {
  constructor(props) {
    super(props);


  }
  async componentDidMount() {
    console.log('start');
    const response = await this.minMaxWait(
      new Promise((res, rej) => { setTimeout(() => { console.log('异步方法'); res('返回数据'); }, 100) }),
      3000, 5000);
    console.log(response);
  }
  //实现等待一个异步请求，成功最小等待时间min，最长等待时间max
  minMaxWait(promise, min, max) {
    var startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
      var t = setTimeout(() => {
        reject('超时错误');
      }, max)
      promise.then((res, rej) => {
        let nowTime = new Date().getTime();
        if (nowTime - startTime < min) {
          console.log('请求成功')
          setTimeout(() => {
            clearTimeout(t)
            resolve(res);
          }, min - nowTime - startTime)
        } 
      }).catch(res => {
        reject(res)
      })
    })
  }
  render() {
    return (
      <div style={{ color: 'red' }} >
        我是根路由
    < span className={styles.main} > aaaaaa</span >
      </div >
    )
  }
}
