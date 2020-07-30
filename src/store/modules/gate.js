import { gates } from "../../api/api";
import { timeToDate } from "../../utils/validate";
export const GATELISTS = "GATELISTS";
export const GATELISTSTOTAL = "GATELISTSTOTAL";
const app = {
  state: {
    gatelistarr: [],
    gatelistcount: String
  },
  getters: {
    todoList(state) {
      var a, b;
      state.gatelistarr.length == 0
        ? (a = JSON.parse(sessionStorage.getItem("gatelist")))
        : (a = state.gatelistarr);
      // a.filter(
      //   x =>
      //     (x.date.time = timeToDate(JSON.stringify(x.date.time).slice(0, 10)))
      // );
      return {
        a: a,
        b: a.length
      };
    }
  },
  mutations: {
    [GATELISTS](state, gatelist) {
      sessionStorage.setItem("gatelist", JSON.stringify(gatelist));
      state.gatelistarr = gatelist;
    },
    [GATELISTSTOTAL](state, gatelistcount) {
      state.gatelistcount = gatelistcount;
    }
  },
  actions: {
    async gatepeople({ commit }, data) {
      let res = await gates(data);
      commit("GATELISTS", res.data.data.list);
      commit("GATELISTSTOTAL", res.data.data.total);
    }
  }
};
export default app;
