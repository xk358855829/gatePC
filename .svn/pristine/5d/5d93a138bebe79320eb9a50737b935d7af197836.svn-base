<template>
		<div :id="id" :data="data" style="height: 600px;"></div>
</template>

<script>
    export default {
        props: ["id", "data"],
        data() {
            return {
                ChartLineGraph: null,//图表实例
            }
        },

        methods: {
            drawLineGraph(id, data) {
                let _this = this;
                let myChart = document.getElementById(id)
                this.ChartLineGraph = this.$echarts.init(myChart)
                this.ChartLineGraph.setOption(data);
                window.addEventListener("resize", function () {
                    _this.ChartLineGraph.resize();
                })
            }
        },

        mounted() {
            this.drawLineGraph(this.id, this.data);
        },

        watch: {
            data: {
                handler(newvalue, oldvalue) {
                    this.drawLineGraph(this.id, newvalue);
                }
            },
            deep: true
        },

        beforeDestroy() {
            if (this.ChartLineGraph) {
                this.ChartLineGraph.clear();
            }
        }
    }
</script>