import Qs from "qs";
import axios from "axios";
import { searchClicks, deviceBind, deorderList } from "../api/api";
import {
  ONETOTAL,
  ALIPAYNAME,
  LOCKNUM,
  INIT_PARKINGLOT_LIST,
  INIT_DEORDER_LIST,
  INIT_DEORDER_LISTTOTAL,
  ONEFANMLI
} from "./mutation-type.js";
import removeEmpty from "@/utils/removeEmpty";
export default {
  changeIds(ctx, ids) {
    ctx.commit("changeIds", ids);
  },

  changeExportIds(ctx, exportIds) {
    ctx.commit("changeExportIds", exportIds);
  },
  Alipay({ commit }, data) {
    searchClicks("/Parking/selectLotInfo", data).then(res => {
      console.log(res);
      if (res.data.resCode == 0) {
        commit(ALIPAYNAME, res.data.result);
        commit(ONETOTAL, res.data.count);
      }
    });
  },
  async initParkingDevList({ commit }, params) {
    let msg = await deviceBind(removeEmpty(params));
    console.log(msg);
    if (msg.data.code === 200) {
      console.log("查看车位", msg.data);
      commit(INIT_PARKINGLOT_LIST, msg.data.data.list);
      commit(LOCKNUM, msg.data.data.total);
    }
  },
  // 查询全部停车场
  parktitle({ commit, state }, data) {
    let res = searchClicks("/Parking/selectLotInfo", {
      page: 1,
      pageSize: 0,
      userId: localStorage.getItem("userId"),
      dealer: localStorage.getItem("dealer")
    }).then(message => {
      console.log(message);
      commit("ONEFANMLI", message.data.result);
    });
  }
  // async initDeorderList({ commit }, params) {
  //   let msg = await deorderList(removeEmpty(params));
  //   console.log(msg);
  //   if (msg.status === 200) {
  //     console.log("查看订单", msg.data);
  //     commit(INIT_DEORDER_LIST, msg.data.result);
  //     commit(INIT_DEORDER_LISTTOTAL, msg.data.result.count);
  //   }
  // }
};