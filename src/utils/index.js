import Cookies from 'js-cookie'
import store from '@/store'
import CryptoJS from 'crypto-js'

/**
 * 时间转换成yyyy-MM-dd格式
 * @param {*} key 
 */
export function dateFormatter(str) {
    //默认返回yyyy-MM-dd HH-mm-ss
    var hasTime = arguments[1] != false ? true : false; //可传第二个参数false，返回yyyy-MM-dd
    var d = new Date(str);
    var year = d.getFullYear();
    var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    if (hasTime) {
        return (
            [year, month, day].join("-") + " " + [hour, minute, second].join(":")
        );
    } else {
        return [year, month, day].join("-");
    }
}

/**
 * 权限
 * @param {*} key
 */
export function hasPermission(key) {
    return window.SITE_CONFIG['permissions'].indexOf(key) !== -1 || false
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
    store.commit('resetStore')
    Cookies.remove('sessiontoken')
    localStorage.clear();
    window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] = false
}

/**
 * 获取uuid
 */
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}

/**
 * 获取svg图标(id)列表
 */
export function getIconList() {
    var res = []
    var list = document.querySelectorAll('svg symbol')
    for (var i = 0; i < list.length; i++) {
        res.push(list[i].id)
    }

    return res
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'pid') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
        if (!temp[data[k][pid]] || data[k][id] === data[k][pid]) {
            res.push(data[k])
            continue
        }
        if (!temp[data[k][pid]]['children']) {
            temp[data[k][pid]]['children'] = []
        }
        temp[data[k][pid]]['children'].push(data[k])
        data[k]['_level'] = (temp[data[k][pid]]._level || 0) + 1
    }
    return res
}


export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
