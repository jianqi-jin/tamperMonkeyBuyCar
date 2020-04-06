// const {getElementsByAttr} = require('./utils')

let id = 0
let GM_getValue = window.GM_getValue
let GM_setValue = window.GM_setValue
import {getElementsByAttr} from './utils'

let config = {
    main: [
        {
            from: '淘宝',
            goodItemAttr: ['div', 'data-category', 'auctions'],
            titleQuery: '.J_IconMoreNew .J_ClickStat',
            urlQuery: '.J_IconMoreNew .J_ClickStat',
            priceQuery: '.J_IconMoreNew .row-1',
            picUrlQuery: '.J_ItemPic',
            rep: /^https:\/\/s.taobao.com(.*?)/
        },{
            from: '京东',
            goodItemAttr: ['div', 'class', 'gl-i-wrap'],
            titleQuery: '.p-name.p-name-type-2 a',
            urlQuery: '.p-name.p-name-type-2 a',
            priceQuery: '.p-price',
            picUrlQuery: '.p-img img',
            rep: /^https:\/\/search.jd.com(.*?)/
        }
    ]
}

let location = window.location.href
let mainConfig
for(var o of config.main){
    if(o.rep.test(location)){
        mainConfig = o
        break
    }
}
function loadElmBtn(callback){
    let domList = getElementsByAttr(...mainConfig.goodItemAttr)
    for(var element of domList){
        let btn = document.createElement('div')
        btn.innerText = '+'
        btn.id = 'toolBtn'
        btn.onclick = callback
        if(element.querySelector('#toolBtn')){
            element.removeChild(element.querySelector('#toolBtn'))
        }
        element.appendChild(btn)
    }
}
/**
 * 
 * @param {点击事件event} event 
 * @param {*操作商品列表} goodsList 
 */
function addGood(event, goodsList){
    id = goodsList.length
    let goodDom = event.path[1]
    let title = goodDom.querySelector(mainConfig.titleQuery).innerText
    let url =  goodDom.querySelector(mainConfig.urlQuery).href
    let price = goodDom.querySelector(mainConfig.priceQuery).innerText
    let picUrl = goodDom.querySelector(mainConfig.picUrlQuery).src
    goodsList.push(IGood({
        picUrl,
        price,
        title,
        url,
        from: mainConfig.from
    }))
    GM_setValue('toolGoodsList', JSON.stringify(goodsList))
    return goodsList
}


function getGoodsList(){
    return GM_getValue('toolGoodsList')
}
function cleanGood(){
    GM_setValue('toolGoodsList', '')
}

/**
 * 说明：为了格式化控制good数据格式一致
 * inter
 * @param {good数据} obj 
 */
function IGood(obj){
    return Object.assign({
        id,
        picUrl: '',
        price: '',
        title: '',
        url: '',
        from: ''
    }, obj)
}

export {
    loadElmBtn,
    addGood,
    IGood,
    cleanGood,
    getGoodsList
}