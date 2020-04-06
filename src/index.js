import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const root = document.createElement('div')
root.id = 'app'
document.body.appendChild(root)

Vue.use(ElementUI)

new Vue({
    el: '#app',
    render: h => h(App)
})