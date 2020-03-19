import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class index extends Component {
  render() {
    return (
      <div>
        前端自动化构建
        <Link to={'/a.html'}>a跳转</Link>
        <Link to={'b.html'}>a跳转</Link>
      </div>
    )
  }
}
