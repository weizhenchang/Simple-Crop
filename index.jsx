import React from "react";
import Core from "./index.js";

export class SimpleCrop extends React.Component {
  instance; //组件实例

  constructor(props) {
    super(props);
  }

  //初次渲染
  componentDidMount () {
    this.instance = new Core(this.props);
  }

  //更新
  componentDidUpdate (prevProps) {
    if (this.instance) {
      if (this.hasChanged(['src'], prevProps)) {
        this.instance.setImage(this.props.src);
      }

      if (this.hasChanged(['rotateSlider', 'startAngle', 'endAngle', 'gapAngle', 'lineationItemWidth'], prevProps)) {
        this.instance.initRotateSlider(this.props);
      }

      if (this.hasChanged(['cropSizePercent'], prevProps)
        || !this.isEquivalent(this.props.positionOffset, prevProps.positionOffset)
        || !this.isEquivalent(this.props.size, prevProps.size)) {
        this.instance.updateBox(this.props);
      }

      if (this.hasChanged(['borderWidth', 'borderColor', 'boldCornerLen', 'coverColor', 'borderDraw', 'coverDraw'], prevProps)) {
        this.instance.initBoxBorder(this.props)
      }

      if (!this.isEquivalent(this.props.funcBtns, prevProps.funcBtns)) {
        this.instance.initFuncBtns(this.props);
      }

      if (this.hasChanged(['scaleSlider', 'maxScale'], prevProps)) {
        this.instance.initScaleSlider(this.props)
      }

      if (this.hasChanged(['title'], prevProps)) {
        this.instance.initTitle(this.props);
      }

      if (this.props.visible == false) {
        this.instance.hide();
      } else {
        this.instance.show();
      }
    }
  }

  //属性是否发生变化
  hasChanged (names, props) {
    let cur = {};
    let prev = {};
    for (let i = 0; i < names.length; i++) {
      let item = names[i];
      cur[item] = this.props[item];
      prev[item] = props[item];
    }
    return !this.isEquivalent(cur, prev);
  }

  //根据两个简单对象的值比较它们是否相同
  isEquivalent (a, b) {
    if (a != null && b != null) {
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      if (aProps.length != bProps.length) {
        return false;
      }

      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }

      return true;
    } else if (a === b) {
      return true
    } else {
      return false
    }
  }

  render () {
    return <div />;
  }
}