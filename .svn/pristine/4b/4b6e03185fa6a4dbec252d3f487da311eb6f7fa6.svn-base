<template>
		<el-dialog title="忘记密码"
		           :visible.sync="centerDialogVisibleSecond"
		           :close-on-click-modal="false"
		           :close-on-press-escape="false"
		           :before-close="handleClose"
		>
				<el-form label-width="120px" ref="forgetpwdform" :model="forgetpwdform" :rules="rules">
						<el-form-item prop="username" label="账户名">
								<el-input v-model="forgetpwdform.username"></el-input>
						</el-form-item>
						<el-row :gutter="20">
								<el-col :span="14">
										<el-form-item prop="phone" label="手机号：">
												<el-input v-model="forgetpwdform.phone" maxlength="11"></el-input>
										</el-form-item>
								</el-col>
								<el-col :span="10">
										<el-button @click="sendcodeMsg" :disabled="disabled">{{sendcode}}</el-button>
								</el-col>
						</el-row>
						<el-row>
								<el-col>
										<el-form-item prop="code" label="验证码：">
												<el-input v-model="forgetpwdform.code"></el-input>
										</el-form-item>
								</el-col>
						</el-row>
						<el-form-item prop="newpassword" label="新密码">
								<el-input minlength="6" type="password" v-model="forgetpwdform.newpassword"></el-input>
						</el-form-item>
						<el-form-item prop="repeatpassword" label="确认密码">
								<el-input type="password" v-model="forgetpwdform.repeatpassword"></el-input>
						</el-form-item>

				</el-form>
				<template slot="footer">
						<el-button type="default" @click="handleClose">取消</el-button>
						<el-button type="primary" @click="handleSubmit">提交</el-button>
				</template>
		</el-dialog>
</template>

<script>
    import qs from "qs"

    export default {
        name: "forgetpwd",
        data() {
            return {
                getCode: "",
                sendcode: "发送验证码",
                disabled: false,
                centerDialogVisibleSecond: false,
                forgetpwdform: {
                    phone: "",
                    code: "",
                    username: "",
                    newpassword: "",
                    repeatpassword: ""
                }
            }
        },

        computed: {
            rules() {
                var validateComfirmPassword = (rule, value, callback) => {
                    if (this.forgetpwdform.newpassword !== value) {
                        return callback(new Error(this.$t('user.validate.comfirmPassword')))
                    }
                    callback()
                }
                var validateCode = (rule, value, callback) => {
                    if (!value) {
                        callback(new Error('请输入验证码'))
                    } else if (value != this.getCode) {
                        callback(new Error('验证码不正确!'))
                    } else {
                        callback()
                    }
                }
                return {
                    username: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    code: [
                        {required: true, validator: validateCode, trigger: 'blur'}
                    ],
                    newpassword: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'},
                        {min: 6, message: '密码不能低于6位,请输入至少6位的密码', trigger: 'blur'}
                    ],
                    repeatpassword: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'},
                        {validator: validateComfirmPassword, trigger: 'blur'}
                    ],
                }
            }
        },

        methods: {
            //初始化页面
            init() {
                this.centerDialogVisibleSecond = true;
                this.$nextTick(() => {
                    this.$refs['forgetpwdform'].resetFields();
                })
            },

            //手机号正则判断
            judgePhone() {
                const reg = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;
                if (this.forgetpwdform.phone == '') {
                    this.$message("请输入手机号码")
                    return false;
                } else if (!reg.test(this.forgetpwdform.phone)) {
                    this.$message("手机号格式不正确")
                    return false;
                } else {
                    return true;
                }
            },

            //发送验证码
            sendcodeMsg() {
                let _this = this;
                if (_this.judgePhone()) {
                    var num = 60;
                    var timer = setInterval(function () {
                        num--;
                        _this.disabled = true;
                        _this.sendcode = num + '秒后重新获取';
                        if (num === 0) {
                            _this.sendcode = '获取验证码';
                            _this.disabled = false;
                            clearInterval(timer)
                        }
                    }, 1000)
                    _this.$http.post("/sys/sms/sendMessage", qs.stringify(
                        {phoneNumber: _this.forgetpwdform.phone}
                    )).then((res) => {
                        _this.getCode = res.data;
                    })
                }

            },
            //关闭页面
            handleClose() {
                this.centerDialogVisibleSecond = false;
            },

            //表单提交
            handleSubmit() {
                let _this = this;
                _this.$refs['forgetpwdform'].validate(valid => {
                    if (valid) {
                        _this.$http.put("/sys/user/password", {
                            "username": _this.forgetpwdform.username,
                            "mobile": _this.forgetpwdform.phone,
                            "newPassword": _this.forgetpwdform.newpassword,
                            "password": _this.forgetpwdform.newpassword
                        }).then(({data: res}) => {
                            if (res.msg === 'OK') {
                                _this.$message({
                                    type: "success",
                                    message: "密码重置成功",
                                    duration: 1000
                                })
                                _this.handleClose();
                            } else {
                                _this.$message({
                                    type: "error",
                                    message: "密码重置失败",
                                    duration: 1000
                                })
                            }
                        })
                    } else {
                        return
                    }
                })
            }
        },
        watch: {
            centerDialogVisibleSecond(newValue, oldValue) {
                this.centerDialogVisibleSecond = newValue;
            }
        }
    }
</script>