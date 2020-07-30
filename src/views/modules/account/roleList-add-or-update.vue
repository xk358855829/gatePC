<template>
		<el-dialog :visible.sync="visible" :title="!dataForm.userid ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
				<el-form :model="dataForm" :rules="rules" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
						<el-row>
								<el-col :span="12">
										<el-form-item prop="userName" label="账号">
												<el-input v-model="dataForm.userName" placeholder="请输入账号" clearable></el-input>
										</el-form-item>
								</el-col>
								<el-col :span="12">
										<el-form-item prop="userAlias" label="用户名">
												<el-input v-model="dataForm.userAlias" placeholder="请输入用户名" clearable></el-input>
										</el-form-item>
								</el-col>
						</el-row>
						<el-row>
								<el-col :span="12">
										<el-form-item prop="password" label="密码">
												<el-input v-model="dataForm.password" placeholder="请输入密码" minlength="6" type="password"></el-input>
										</el-form-item>
								</el-col>
								<el-col :span="12">
										<el-form-item prop="comfirmPassword" label="确认密码">
												<el-input v-model="dataForm.comfirmPassword" placeholder="请再次输入密码" minlength="6" type="password"></el-input>
										</el-form-item>
								</el-col>
						</el-row>
						<el-row>
								<el-col :span="12">
										<el-form-item prop="phoneNum" label="手机号">
												<el-input v-model="dataForm.phoneNum" placeholder="请输入手机号" maxlength="11"></el-input>
										</el-form-item>
								</el-col>
								<el-col :span="12">
										<el-form-item prop="email" label="邮箱">
												<el-input v-model="dataForm.email" placeholder="请输入邮箱"></el-input>
										</el-form-item>
								</el-col>
						</el-row>
						<el-row v-if="dataForm.type!=0">
								<el-col :span="12">
										<el-form-item prop="type" label="用户类型">
												<el-select v-model="dataForm.type" filterable style="width: 100%">
														<el-option
																		v-for="item in userTypeList"
																		:key="item.roleId"
																		:label="item.roleName"
																		:value="item.roleId"
														></el-option>
												</el-select>
										</el-form-item>
								</el-col>
								<el-col :span="12">
								</el-col>
						</el-row>
				</el-form>
				<template slot="footer">
						<el-button @click="visible = false">{{ $t('cancel') }}</el-button>
						<el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
				</template>
		</el-dialog>
</template>

<script>
    import debounce from "lodash/debounce";

    export default {
        data() {
            return {
                visible: false,
                dataForm: {
                    userid: "",
                    userName: "",
                    password: "",
                    comfirmPassword: "",
                    userAlias: "",
                    phoneNum: "",
                    email: "",
                    type: "",
                    dealer: "",
                    orderDealer: "",
                    associated: "",
                    date: "",
                    permissions: ""
                },
                rules: {
                    userName: [
                        {
                            required: true,
                            trigger: blur,
                            message: "必填项不能为空"
                        }
                    ],
                    userAlias: [
                        {
                            required: true,
                            trigger: blur,
                            message: "必填项不能为空"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            trigger: blur,
                            message: "必填项不能为空"
                        }
                    ],
                    comfirmPassword: [
                        {
                            required: true,
                            trigger: blur,
                            message: "必填项不能为空"
                        }
                    ],
                    phoneNum: [
                        {
                            required: true,
                            trigger: blur,
                            message: "必填项不能为空"
                        }
                    ],
                    // email: [
                    //     {
                    //         required: true,
                    //         trigger: blur,
                    //         message: "必填项不能为空"
                    //     }
                    // ],
                    type: [
                        {
                            required: true,
                            trigger: blur,
                            message: "必填项不能为空"
                        }
                    ]
                },
                userTypeList: [
                    // {
                    //     roleDescribe: "拥有最高权限，可以对云平台所有信息进行添加，查看，删除，修改，审核操作。本账号给总公司使用，是唯一的，在云平台中不能删除",
                    //     roleId: 1,
                    //     roleName: "超级管理员",
                    // },
                    {
                        // roleDescribe: "大客户",
                        roleId: "1",
                        roleName: "管理员",
                    },
                    {
                        // roleDescribe: "岗亭操作员",
                        roleId: "2",
                        roleName: "非管理员",
                    }
                ],
            };
        },

        methods: {
            init() {
                this.visible = true;
                this.$nextTick(() => {
                    this.$refs["dataForm"].resetFields();
                    this.dataForm.comfirmPassword = "";
                    console.log(this.dataForm);
                    if (this.dataForm.userid) {
                        this.getInfo();
                    }
                });
            },

            // 获取信息
            getInfo() {
                this.$http.post(this.$apiUrl.loginUrl + '/webUser/findByPrimaryKey',JSON.stringify({userid:this.dataForm.userid})).then(res => {                    
                    if (res.code !== 0) {
                        return this.$message.error(res.message);
                    }
                    this.dataForm = res.data;
                    // this.dataForm.comfirmPassword = res.data.password;
                }).catch(() => {
                });
            },

            // 表单提交
            dataFormSubmitHandle: debounce(
                function () {
                    this.$refs["dataForm"].validate(valid => {
                        if (!valid) {
                            return false;
                        }
                        let data = this.dataForm;
                        let url = "/webUser/add";
                        if (this.dataForm.userid) {
                            url = "/webUser/update";                                                     
                        }else{
                            delete data.userid;
                        }                                                
                        delete data.comfirmPassword;
                        delete data.dealer;
                        delete data.orderDealer;
                        delete data.associated;
                        delete data.date;
                        delete data.permissions;
                        console.log(data);
                        this.$http.post(this.$apiUrl.loginUrl + url, JSON.stringify(data)).then(res => {
                            if (res.code !== 0) {
                                return this.$message.error(res.message);
                            }
                            this.$message({
                                message: this.$t("prompt.success"),
                                type: "success",
                                duration: 500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                }
                            });
                        }).catch(() => {
                        });
                    });
                }, 1000, {leading: true, trailing: false}
            )
        }
    };
</script>
