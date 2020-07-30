<template>
  <div class="aui-wrapper aui-page__login">
    <div class="aui-content__wrapper">
      <main class="aui-content">
        <div class="login-header">
          <h2 class="login-brand">{{ $t('brand.lg') }}</h2>
        </div>
        <div class="login-body">
          <h3 class="login-title">{{ $t('login.title') }}</h3>
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" status-icon>
            <!-- <el-form-item>
              <el-select v-model="$i18n.locale" class="w-percent-100">
                <el-option
                  v-for="(val, key) in i18nMessages"
                  :key="key"
                  :label="val._lang"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" :placeholder="$t('login.userName')">
                <span slot="prefix" class="el-input__icon">
                  <svg class="icon-svg" aria-hidden="true">
                    <use xlink:href="#icon-user" />
                  </svg>
                </span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" :placeholder="$t('login.password')">
                <span slot="prefix" class="el-input__icon">
                  <svg class="icon-svg" aria-hidden="true">
                    <use xlink:href="#icon-lock" />
                  </svg>
                </span>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-top:-10px;text-align: left">
              <el-checkbox v-model="checked" style="margin-top:-10px;">{{$t('login.remmberPassword')}}</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dataFormSubmitHandle()" class="w-percent-100">
                {{
                $t('login.title') }}
              </el-button>
            </el-form-item>
          </el-form>
          <!-- <el-button type="text" @click="centerDialogVisible = true">{{$t('login.register')}}</el-button> -->
          <el-dialog :title="$t('register.title')" :visible.sync="centerDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="50%" center>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" :rules="regRule" label-width="100px" :model="formLabelAlign" ref="formLabelAlign" @keyup.enter.native="submitForm()">
              <el-form-item label="公司名称：" prop="deptName">
                <el-input v-model="formLabelAlign.deptName"></el-input>
              </el-form-item>
              <el-form-item label="会员名称：" prop="userName">
                <el-input v-model="formLabelAlign.userName"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="formLabelAlign.email"></el-input>
              </el-form-item>
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-form-item prop="mobile" label="手机号：">
                    <el-input v-model="formLabelAlign.mobile" maxlength="11" @keyup.native="mobileValidate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-button icon="el-icon-mobile-phone" @click="sendcode" style="width: 100%" type="button" :disabled="disabled" v-if="disabled==false">发送验证码</el-button>
                  <el-button icon="el-icon-mobile-phone" @click="sendcode" style="width: 100%" type="button" :disabled="disabled" v-if="disabled==true">{{btntxt}}</el-button>
                </el-col>
              </el-row>
              <!-- <el-form-item label="验证码：" prop="code">
															<el-input v-model="formLabelAlign.code"></el-input>
              </el-form-item>-->
              <el-form-item prop="password" label="密码：">
                <el-input minlength="6" v-model="formLabelAlign.password" show-password placeholder="请输入不低于6位的密码"></el-input>
              </el-form-item>
              <el-form-item prop="comfirmpassword" label="确认密码：">
                <el-input v-model="formLabelAlign.comfirmpassword" show-password></el-input>
              </el-form-item>
            </el-form>
            <template slot="footer" class="dialog-footer">
              <el-switch v-model="value1" active-text="《门磁设备服务云平台网站服务条款》《法律申明和隐私权政策》"></el-switch>
              <el-row style="margin-top: 20px">
                <el-button type="primary" @click="submitForm()">同意条款并注册</el-button>
              </el-row>
            </template>
          </el-dialog>
          <!-- | -->
          <!-- <el-button type="text" @click="forgetpassword">{{$t('login.forgetPassword')}}</el-button> -->
        </div>
        <div class="Lfooter">
          <p>@copyright&nbsp;&nbsp;速利科技有限公司&nbsp;&nbsp;<a style="color:#5b829d;" @click="linkDownload('http://www.beian.miit.gov.cn')">浙ICP备17053660号</a>&nbsp;&nbsp;浙公网安备3301040084909号</p>
        </div>
      </main>     
    </div>
    <!--忘记密码弹框-->
    <forgetpwd v-if="centerDialogVisibleSecond" ref="forgetpwd"></forgetpwd>
  </div>
</template>

<script>
import qs from "qs";
import Cookies from "js-cookie";
import debounce from "lodash/debounce";
import { messages } from "@/i18n";
import { getUUID } from "@/utils";
import { isEmail, isMobile } from "@/utils/validate";
import forgetpwd from "../../../src/components/fogetpwd";

export default {
  data() {
    return {
      checked: false, //记住密码，默认为选中状态
      closeTimer: null,
      i18nMessages: messages,
      value1: true,
      centerDialogVisible: false,
      centerDialogVisibleSecond: false,
      captchaPath: "",
      dataForm: {
        userName: "",
        password: ""
      },
      identifyCode: "",
      labelPosition: "right",
      formLabelAlign: {
        userName: "", //会员名称
        deptName: "", //公司名称
        email: "", //邮箱
        mobile: "",
        password: "", //密码
        comfirmpassword: "",
        status: 1, //账号状态
        deptId: 0,
        pid: 0,
        roleIdList: ["1147694289157566466"]
      },
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      count: 0,
      show: ""
    };
  },
  components: {
    forgetpwd
  },
  computed: {
    dataRule() {
      return {
        userName: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ]
      };
    },
    regRule() {
      var validateComfirmPassword = (rule, value, callback) => {
        if (this.formLabelAlign.password !== value) {
          return callback(new Error(this.$t("user.validate.comfirmPassword")));
        }
        callback();
      };
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          return callback(
            new Error(
              this.$t("validate.format", { attr: this.$t("user.mobile") })
            )
          );
        }
        callback();
      };
      var validateCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入验证码"));
        } else if (value != this.identifyCode) {
          callback(new Error("验证码不正确!"));
        } else {
          callback();
        }
      };
      return {
        deptName: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          {
            min: 6,
            message: "密码不能低于6位,请输入至少6位的密码",
            trigger: "blur"
          }
        ],
        comfirmpassword: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateComfirmPassword, trigger: "blur" }
        ],
        mobile: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateMobile, trigger: "blur" }
        ],
        // code: [{ required: true, validator: validateCode, trigger: "blur" }],
        email: [
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ]
      };
    }
  },

  created() {
    this.getCookie();
  },

  methods: {
    //验证只能输入正整数
    mobileValidate() {
      this.formLabelAlign.mobile = this.formLabelAlign.mobile.replace(
        /[^\.\d]/g,
        ""
      );
      this.formLabelAlign.mobile = this.formLabelAlign.mobile.replace(".", "");
    },

    //发送手机验证码
    sendcode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.formLabelAlign.mobile == "") {
        this.$message({
          message: "手机号不能为空",
          center: true
        });
        return;
      }
      if (!reg.test(this.formLabelAlign.mobile)) {
        this.$message({
          message: "请输入正确的手机号",
          center: true
        });
        return;
      } else {
        this.time = 60;
        this.disabled = true;
        this.timer();
        this.$http
          .post(
            `/sys/sms/sendMessage?phoneNumber=${this.formLabelAlign.mobile}`
          )
          .then(({ data: res }) => {
            this.identifyCode = res;
          })
          .catch(() => {});
      }
    },

    //60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        this.closeTimer = setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
        clearInterval(this.closeTimer);
      }
    },

    //提交注册
    submitForm: debounce(function() {
      this.$refs["formLabelAlign"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          if (this.value1) {
            this.formLabelAlign["realName"] = this.formLabelAlign.deptName;
            this.$http
              .post("/sys/user/insert", this.formLabelAlign)
              .then(({ data: res }) => {
                if (res.code !== 0) {
                  return this.$message.error(res.msg);
                } else {
                  let params = {
                    pid: 0,
                    name: this.formLabelAlign.deptName
                  };
                  // this.$http.post('/sys/dept/saveDept', params).then(({data: res1}) => {
                  //     this.$message({
                  //         showClose: true,
                  //         message: '注册成功',
                  //         type: "success"
                  //     });
                  //     this.time = -2;
                  //     this.centerDialogVisible = false;
                  //     this.$refs['formLabelAlign'].resetFields();
                  // })
                  this.$message({
                    showClose: true,
                    message: "注册成功",
                    type: "success"
                  });
                  this.time = -2;
                  this.centerDialogVisible = false;
                  this.$refs["formLabelAlign"].resetFields();
                }
              })
              .catch(() => {});
          } else {
            return this.$message({
              showClose: true,
              message: "请先同意用户条款",
              type: "warning",
              duration: 1000
            });
          }
        }
      });
    }),

    //忘记密码
    forgetpassword() {
      this.centerDialogVisibleSecond = true;
      this.$nextTick(() => {
        this.$refs.forgetpwd.init();
      });
    },

    //设置cookie
    setCookie(c_name, c_pwd, c_check, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userpassword" +
        "=" +
        c_pwd +
        ";path=/;expires=" +
        exdate.toGMTString();
      window.document.cookie =
        "userchecked" +
        "=" +
        c_check +
        ";path=/;expires=" +
        exdate.toGMTString();
    },
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.dataForm.userName = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userpassword") {
            this.dataForm.password = arr2[1];
          } else if (arr2[0] == "userchecked") {
            this.checked = Boolean(arr2[1]);
          }
        }
      }
    },

    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", "", false, -1); //修改3值都为空，天数为负1天就好了
    },

    // 表单提交
    dataFormSubmitHandle: debounce(
      function() {
        let that = this;
        this.$refs["dataForm"].validate(valid => {
          if (!valid) {
            return false;
          }
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          if (this.checked == true) {
            //传入账号名，密码，和保存天数3个参数
            this.setCookie(
              this.dataForm.userName,
              this.dataForm.password,
              this.checked,
              30
            );
          } else {
            //清空Cookie
            this.clearCookie();
          }
          this.$http
            .post(
              this.$apiUrl.loginUrl + "/webUser/login",
              JSON.stringify(this.dataForm)
            )
            .then(res => {
              console.log(res);
              if (res.code == 0) {
                that.$store.state.user = res.data;
                sessionStorage.setItem("permissions", res.data.permissions);
                localStorage.setItem("userName", res.data.userName);
                localStorage.setItem("userid", res.data.userid);
                localStorage.setItem("userAlias", res.data.userAlias);
                // if (res.result.type == 9) {
                //   axios({
                //     method: "post",
                //     url: this.$apiUrl.gtUrl + "/web/reserve/selectByCarBid",
                //     data: Qs.stringify({
                //       uid: res.result.userId
                //     })
                //   }).then(message => {
                //     console.log(message);
                //     if (message.resCode == 0) {
                //       var html = "";
                //       message.result.forEach((a, b) => {
                //         html += a.bid + ",";
                //       });
                //       that.$router.push({
                //         path: "/pageHome/big",
                //         query: { devid: html.substring(0, html.length - 1) }
                //       });
                //     } else {
                //     }
                //   });
                // } else {
                // that.$router.push('/pageHome')
                //   Cookies.set("sessiontoken", res.data.token);
                that.$router.push({ path: "/" });
                // }
                // this.dataForm.captcha = "";
                // return this.$message.error(res.msg);
              } else {
                that.$alert("用户名或密码错误", "系统提示", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(() => {});
        });
      },
      1000,
      { leading: true, trailing: false }
    )
  },

  watch: {
    centerDialogVisibleSecond(newValue, oldValue) {
      this.centerDialogVisibleSecond = newValue;
    }
  }
};
</script>
<style scoped>
.aui-page__login .aui-content{
  padding: 0 15px 40px;
}
.Lfooter{
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
}
.Lfooter > p {
  color: #ffffff;
  font-size: 0.13rem;
  text-align: center;
  color: #5b829d;
}
</style>