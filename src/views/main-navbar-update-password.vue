<template>
		<el-dialog
						:visible.sync="visible"
						:title="$t('updatePassword.title')"
						:close-on-click-modal="false"
						:close-on-press-escape="false"
						:append-to-body="true">
				<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()"
				         label-width="120px">
						<el-form-item :label="$t('updatePassword.username')">
								<span>{{ dataForm.userName }}</span>
						</el-form-item>
						<el-form-item prop="oldPassword" :label="$t('updatePassword.password')">
								<el-input v-model="dataForm.oldPassword" type="password"
								          :placeholder="$t('updatePassword.password')"></el-input>
						</el-form-item>
						<el-form-item prop="newPassword" :label="$t('updatePassword.newPassword')">
								<el-input minlength="6" v-model="dataForm.newPassword" type="password"
								          :placeholder="$t('updatePassword.newPassword')"></el-input>
						</el-form-item>
						<el-form-item prop="comfirmPassword" :label="$t('updatePassword.comfirmPassword')">
								<el-input v-model="dataForm.comfirmPassword" type="password"
								          :placeholder="$t('updatePassword.comfirmPassword')"></el-input>
						</el-form-item>
				</el-form>
				<template slot="footer">
						<el-button @click="visible = false">{{ $t('cancel') }}</el-button>
						<el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
				</template>
		</el-dialog>
</template>

<script>
    import debounce from 'lodash/debounce'
    import {clearLoginInfo} from '@/utils'

    export default {
        data() {
            return {
                visible: false,
                dataForm: {
                    userName: localStorage.getItem("userName"),
                    oldPassword: '',
                    newPassword: '',
                    comfirmPassword: ''
                }
            }
        },

        computed: {
            dataRule() {
                var validateComfirmPassword = (rule, value, callback) => {
                    if (this.dataForm.newPassword !== value) {
                        return callback(new Error(this.$t('updatePassword.validate.comfirmPassword')))
                    }
                    callback()
                }
                return {
                    oldPassword: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'},
                    ],
                    newPassword: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'},
                        {min: 6, message: '密码不能低于6位,请输入至少6位的密码', trigger: 'blur'}
                    ],
                    comfirmPassword: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'},
                        {validator: validateComfirmPassword, trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            init() {
                this.visible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields();                    
                })
            },

            // 表单提交
            dataFormSubmitHandle: debounce(function () {
                this.$refs['dataForm'].validate((valid) => {
                    if (!valid) {
                        return false
                    }
                    let data = this.dataForm;                    
                    data.newPassword2 = this.dataForm.comfirmPassword;
                    delete data.comfirmPassword;
                    console.log(data);
                    this.$http.post(this.$apiUrl.loginUrl + "/webUser/updatePassword",JSON.stringify(data)).then(res => {
                        if (res.code !== 0) {
                            return this.$message.error(res.message)
                        }
                        this.$message({
                            message: this.$t('prompt.success'),
                            type: 'success',
                            duration: 500,
                            onClose: () => {
                                this.visible = false
                                clearLoginInfo()
                                this.$router.replace({name: 'login'})
                            }
                        })
                    }).catch(() => {
                    })
                })
            }, 1000, {'leading': true, 'trailing': false})
        }
    }
</script>
