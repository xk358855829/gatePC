import Vue from 'vue'
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
    return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
    return /^http[s]?:\/\/.*/.test(s)
}

export function add(m) {
  return m < 10 ? "0" + m : m;
}
export function timeToDate(data) {
  var d = new Date(data * 1000); //时间戳记得乘以1000再进行处理
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  // return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  return (
    year +
    "-" +
    add(month) +
    "-" +
    add(date) +
    " " +
    add(hour) +
    ":" +
    add(minute) +
    ":" +
    add(second)
  );
}
export function obtainnewtime() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var strHours = date.getHours();
  var strMinutes = date.getMinutes();
  var strSeconds = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (strHours >= 0 && strHours <= 9) {
    strHours = "0" + strHours;
  }
  if (strMinutes >= 0 && strMinutes <= 9) {
    strMinutes = "0" + strMinutes;
  }
  if (strSeconds >= 0 && strSeconds <= 9) {
    strSeconds = "0" + strSeconds;
  }
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    strHours +
    seperator2 +
    strMinutes +
    seperator2 +
    strSeconds;
  return currentdate;
}
Vue.filter("typean", function(val) {
  if (val == "A") {
    val = "打折优惠金额";
  } else if (val == "B") {
    val = "满额优惠";
  } else if (val == "C") {
    val = "满折优惠";
  } else {
    val = "减优惠金额";
  }
  return val;
});
Vue.filter("archtype", function(val) {
  if (val == 1) {
    val = "电子券";
  } else {
    val = "纸券";
  }
  return val;
});
Vue.filter("userwaytyape", function(val) {
  if (val == 1) {
    val = "免费时长";
  } else if (val == 2) {
    val = "现金抵用券";
  } else if (val == 3) {
    val = "满减券";
  } else {
    val = "折扣";
  }
  return val;
});
Vue.filter("statusele", function(val) {
  if (val == 0) {
    val = "已使用";
  } else if (val == 1) {
    val = "未使用";
  } else if (val == -1) {
    val = "已失效";
  } else {
    val = "未发放";
  }
  return val;
});
Vue.filter("time", function(val) {
  var date = new Date(val);
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var strHours = date.getHours();
  var strMinutes = date.getMinutes();
  var strSeconds = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (strHours >= 0 && strHours <= 9) {
    strHours = "0" + strHours;
  }
  if (strMinutes >= 0 && strMinutes <= 9) {
    strMinutes = "0" + strMinutes;
  }
  if (strSeconds >= 0 && strSeconds <= 9) {
    strSeconds = "0" + strSeconds;
  }
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    strHours +
    seperator2 +
    strMinutes +
    seperator2 +
    strSeconds;
  return currentdate;
});