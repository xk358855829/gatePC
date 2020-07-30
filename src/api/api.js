import axios from "axios";
import Qs from "qs";
import Vue from "vue";
let url = "http://39.104.99.181:8711";
// let url = "http://192.168.2.143:8711";
let dev_url = "http://39.104.113.112:2088";
let yuyue_url = "http://39.104.99.181:8762";
export const searchClicks = (baseurl, data) =>
         axios.post(url + baseurl, JSON.stringify(data));
// 设备列表
export const gates = data =>
  axios.post(`${url}/device/dmInfo/getDeviceInfoList`, JSON.stringify(data));
// 设备绑定列表   
export const deviceBind = data =>
  axios.post(`${url}/device/user/bindDeviceList`, JSON.stringify(data));
// 设备解绑   
export const toUnbound = data =>
  axios.post(`${url}/device/dmInfo/deleteDevice`, JSON.stringify(data));
// 获取开关记录  
export const getdeviceRecord = data =>
  axios.post(`${url}/device/record/openCloseRecord`, JSON.stringify(data));
// 获取报警信息  
export const getalarmInfo = data =>
  axios.post(`${url}/device/record/warningRecord`, JSON.stringify(data));
  

// 车位查询  
export const parkingDevList = params =>
  axios.post(`${yuyue_url}/web/parkingdevList/list`, Qs.stringify(params));
export const deorderList = params =>
  axios.post(
    `${yuyue_url}/app/reserve/selectByCarList`,
    Qs.stringify(params)
  );
// 查询主页支付类型
export const payerules = data =>
  axios.post(`${dev_url}/feeOrder/orders`, Qs.stringify(data)); 