import cloneDeep from "lodash/cloneDeep";
import {
  ONETOTAL,
  INIT_DEORDER_LISTTOTAL,
  INIT_PARKINGLOT_LIST,
  ONEFANMLI
} from "./mutation-type.js";
export default {
  // 重置vuex本地储存状态
  resetStore(state) {
    Object.keys(state).forEach(key => {
      state[key] = cloneDeep(window.SITE_CONFIG["storeState"][key]);
    });
  },

  changeIds(state, ids) {
    state.ids = ids;
  },

  changeExportIds(state, exportIds) {
    state.exportIds = exportIds;
  },
  ALIPAYNAME: (state, name) => {
    console.log(name);
    state.apliyparkName = name;
  },
  [ONETOTAL](state, m) {
    state.parkingtotal = m;
  },
  LOCKNUM(state, m) {
    state.total = m;
  },
  [INIT_PARKINGLOT_LIST](state, m) {
    state.parkDevList.count = m.count;
    state.parkDevList.list = m.parkingDevList;
  },
  [ONEFANMLI](state, m) {
    console.log(m)
    state.ONEreslist = m;
  }
  // INIT_DEORDER_LISTTOTAL: (state, m) => {
  //   state.total = m;
  // }
};