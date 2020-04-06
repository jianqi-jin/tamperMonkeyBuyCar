<template>
    <div :class="(show?'openBox':'') + ' box'">
        <el-button-group>
            <el-button type="primary" size="mini" @click="load()">加载插件</el-button>
            <el-button round type='primary' size="mini" @click="toggle()">{{show?'缩小':'展开购物车'}}</el-button>
        </el-button-group>
        <div class="notice">（注意：下拉加载的商品需要重新加载插件哟~）</div>
        <div v-show="show">
            <el-table max-height="450" :data="goodsList" border stripe>
                <el-table-column show-overflow-tooltip v-for="col in columns"
                    :prop="col.id"
                    :key="col.id"
                    :label="col.label"
                    :width="col.width">
                    <template slot-scope="scope">
                        <img class="img" v-if="col.id == 'picUrl'" :src="scope.row.picUrl" alt="">
                        <a target="_blank" v-else-if="col.id == 'url'" :href="scope.row.url">点击跳转</a>
                        <p v-else>{{scope.row[col.id]}}</p>
                    </template>    
                </el-table-column>
            </el-table>
            <el-button type="primary" size="mini" @click="clean()">清空</el-button>
        </div>
        
    </div>
</template>

<script>
import {getElementsByAttr} from './utils/utils'
import {loadElmBtn, addGood, cleanGood, getGoodsList} from './utils/good'
import {IGood} from './utils/good'
export default {
    data: function(){
        return {
            msg: 'hello word',
            goodsList: [],
            show: false,
            columns: [],
            labels: ['编号', '图片', '价格', '标题', '地址', '来源']
        }
    },
    mounted(){
        this.columns = Object.keys(IGood()).map((v, id) => {
                return {
                    id: v,
                    label: this.labels[id], 
                    width: (id == 1 || id == 3) ? 150 : 70
                }
            })
        let goodsList = getGoodsList()
        if(!goodsList) return
        try{
            let json = JSON.parse(goodsList)
            this.goodsList = json || []
        }catch(e){
            console.log(e)
            this.goodsList = []
        }
    },
    methods: {
        load(){
            loadElmBtn(this.addGood)
        },
        addGood(event){
            addGood(event, this.goodsList)
        },
        toggle(){
            this.show = !this.show
        },
        clean(){
            cleanGood()
            this.goodsList = []
        }
    }
}
</script>


<style>
.notice{
    width: 300px;
    background: rgba(255, 255, 255);
}
.box{
    position: fixed;
    height: 0px;
    left: 10px;
    top: 100px;
    background: rgba(225, 225, 225, 0);
    z-index: 9;
    transition: all 0.3s;
}
.openBox{
    width: 600px;
    background: #fff;
    height: 550px;
    overflow-y: scroll;
    overflow: hidden;
    padding: 10px;
    transition: all 0.3s;
    box-shadow: 0 0 10px 0 #ccc;
}
.img{
    height: 100px;
}
#toolBtn{
    position: relative;
    bottom: 20px;
    left: 0;
    z-index: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: #409EFF;
    transition: all 0.5s;
}
#toolBtn:hover{
    width: 100%;
    border-radius: 0;
}
#toolBtn:hover::after{
    content: '添加'
}
</style>