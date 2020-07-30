import Cookies from 'js-cookie'
import qs from 'qs'

export default {
    data() {
        /* eslint-disable */
        return {
            ids: "",//id的集合（string）
            exportIds: null,
            // 设置属性
            mixinViewModuleOptions: {
                activatedIsNeed: true,    // 此页面是否在激活（进入）时，调用查询数据列表接口？
                getDataListURL: '',       // 数据列表接口，API地址
                getDataListIsPage: false, // 数据列表接口，是否需要分页？
                deleteURL: '',            // 删除接口，API地址
                deleteIsBatch: false,     // 删除接口，是否需要批量？
                deleteIsBatchKey: 'id',   // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
                exportURL: '',             // 导出接口，API地址
            },
            // 默认属性
            dataForm: {},               // 查询条件
            dataList: [],               // 数据列表
            order: '',                  // 排序，asc／desc
            orderField: '',             // 排序，字段
            page: 1,                    // 当前页码
            limit: 10,                  // 每页数
            total: 0,                   // 总条数
            dataListLoading: false,     // 数据列表，loading状态
            dataListSelections: [],     // 数据列表，多选项
            addOrUpdateVisible: false,   // 新增／更新，弹窗visible状态
            storeselection: []//存储选中列表的数据
        }
        /* eslint-enable */
    },
    activated() {
        if (this.mixinViewModuleOptions.activatedIsNeed) {
            this.getDataList()
        }
    },
    methods: {
        // 获取数据列表
        getDataList() {
            this.dataListLoading = true
            this.$http.get(
                this.mixinViewModuleOptions.getDataListURL,
                {
                    params: {
                        order: this.order,
                        orderField: this.orderField,
                        page: this.mixinViewModuleOptions.getDataListIsPage ? this.page : null,
                        limit: this.mixinViewModuleOptions.getDataListIsPage ? this.limit : null,
                        ...this.dataForm,
                    }
                }
            ).then(({ data: res }) => {
                this.dataListLoading = false
                if (res.code !== 0) {
                    this.dataList = []
                    this.total = 0
                    return this.$message.error(res.msg)
                }
                this.dataList = this.mixinViewModuleOptions.getDataListIsPage ? res.data.list : res.data
                this.total = this.mixinViewModuleOptions.getDataListIsPage ? res.data.total : 0
            }).catch(() => {
                this.dataListLoading = false
            })
        },

        // 多选
        dataListSelectionChangeHandle(val) {
            this.storeselection = [];
            this.dataListSelections = val;
            for (let obj of this.dataListSelections) {
                this.storeselection.push(obj.id);
            }
            this.ids = this.storeselection.join(",");
            this.$store.dispatch('changeIds', this.ids)
        },

        // 排序
        dataListSortChangeHandle(data) {
            if (!data.order || !data.prop) {
                this.order = ''
                this.orderField = ''
                return false
            }
            this.order = data.order.replace(/ending$/, '')
            this.orderField = data.prop.replace(/([A-Z])/g, '_$1').toLowerCase()
            this.getDataList()
        },

        // 分页, 每页条数
        pageSizeChangeHandle(val) {
            this.page = 1
            this.limit = val
            this.getDataList()
        },

        // 分页, 当前页
        pageCurrentChangeHandle(val) {
            this.page = val
            this.getDataList()
        },

        // 新增、修改
        addOrUpdateHandle(id) {
            this.addOrUpdateVisible = true;
            this.$nextTick(() => {
                this.$refs.addOrUpdate.dataForm.id = id;
                this.$refs.addOrUpdate.init();
            })
        },

        // 删除
        deleteHandle(id) {
            if (this.mixinViewModuleOptions.deleteIsBatch && !id && this.dataListSelections.length <= 0) {
                return this.$message({
                    message: this.$t('prompt.deleteBatch'),
                    type: 'warning',
                    duration: 500
                })
            }
            this.$confirm(this.$t('prompt.info', { 'handle': this.$t('delete') }), this.$t('prompt.title'), {
                confirmButtonText: this.$t('confirm'),
                cancelButtonText: this.$t('cancel'),
                type: 'warning'
            }).then(() => {
                this.dataListLoading = true;
                this.$http.delete(
                    `${this.mixinViewModuleOptions.deleteURL}${this.mixinViewModuleOptions.deleteIsBatch ? '' : '/' + id}`,
                    this.mixinViewModuleOptions.deleteIsBatch ? {
                        'data': id ? [id] : this.dataListSelections.map(item => item[this.mixinViewModuleOptions.deleteIsBatchKey])
                    } : {}
                ).then(({ data: res }) => {
                    if (res.code !== 0) {
                        return this.$message.error(res.msg)
                    }
                    this.$message({
                        message: this.$t('prompt.success'),
                        type: 'success',
                        duration: 500,
                        onClose: () => {
                            this.getDataList()
                        }
                    })
                }).catch(() => {
                    this.dataListLoading = false;
                })
            }).catch(() => {
            })
        },

        // 导出
        exportHandle() {
            let isExport = false, params = {
                // token: Cookies.get('sessiontoken'),
                ids: null
            };
            if (this.exportIds) {
                params.ids = this.exportIds;
                isExport = true;
            }
            if (this.ids) {
                params.ids = this.ids;
                isExport = true;
            }
            let queryParams = qs.stringify(params);
            if (isExport) {
                let _this = this, url = `${window.SITE_CONFIG['apiURL']}${this.mixinViewModuleOptions.exportURL}?${queryParams}`, xhr = new XMLHttpRequest();        //发起请求
                xhr.open('get', url);
                xhr.responseType = 'blob';//规定响应为流文件
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var currentBrowserType = _this.browserType();  //判断浏览器类型  见上述browserType函数；
                            console.log(currentBrowserType);
                            if (currentBrowserType.browser === 'ie' && (currentBrowserType.version == "10.0" || currentBrowserType.version == "11.0")) { // for IE
                                var href = window.URL.createObjectURL(this.response);
                                var elemIF = document.createElement("iframe");
                                elemIF.src = `${window.SITE_CONFIG['apiURL']}${_this.mixinViewModuleOptions.exportURL}?${queryParams}`;
                                elemIF.style.display = "none";
                                document.body.appendChild(elemIF);
                            } else if (currentBrowserType.browser === 'chrome') {
                                var href = window.URL.createObjectURL(this.response);
                                var elemIF = document.createElement("iframe");
                                elemIF.src = `${window.SITE_CONFIG['apiURL']}${_this.mixinViewModuleOptions.exportURL}?${queryParams}`;
                                elemIF.style.display = "none";
                                document.body.appendChild(elemIF);
                            } else {
                                window.location.href = `${window.SITE_CONFIG['apiURL']}${_this.mixinViewModuleOptions.exportURL}?${queryParams}`
                            }
                        }
                    }
                }

                // window.location.href = `${window.SITE_CONFIG['apiURL']}${this.mixinViewModuleOptions.exportURL}?${queryParams}`
                return this.$message({
                    message: "导出成功",
                    type: "success",
                    duration: 1000
                })
            } else {
                return this.$message({
                    message: "请选择导出的数据",
                    type: "info",
                    duration: 1000
                })
            }
        },

        browserType() {
            var userAgent = navigator.userAgent.toLowerCase();
            var testCenter = {
                ie: function isIE() { //ie?
                    if (!!window.ActiveXObject || "ActiveXObject" in window)
                        return true;
                    else
                        return false;
                },
                edge: () => {
                    return /dge/.test(userAgent)
                },
                chrome: () => {
                    return /chrome/.test(userAgent)
                },
                safari: () => {
                    return /safari/.test(userAgent) && !(/chrome/.test(userAgent))
                },
                opera: () => {
                    return /opera/.test(userAgent)
                },
                msie: () => {
                    return /msie/.test(userAgent) && !/opera/.test(userAgent)
                },
                mozilla: () => {
                    return /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
                }
            };
            var browserObj = {};
            for (var k in testCenter) {
                var result = testCenter[k]();
                var version = (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];
                if (result) {
                    browserObj.browser = k;
                    browserObj.version = version;
                    return browserObj;
                }
            }
        },
    }
}
