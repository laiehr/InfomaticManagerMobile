import Vue from 'vue'
import App from './App'

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


import timePicker from './components/mx-datepicker/mx-datepicker.vue'
Vue.component('timePicker',timePicker)

let app = require("@/config");
require("./init");

import mixin from './config/mixin.js'
Vue.mixin(mixin);

import labInfoCard from './components/labComponent/labInfoCard.vue'
Vue.component('labInfoCard',labInfoCard)

import labSteps from './components/labComponent/labStepInfo.vue'
Vue.component('lab-Steps',labSteps)

import labTimeLine from './components/labComponent/labTimeLine.vue'
Vue.component('labTimeLine',labTimeLine)

import sticky from './components/labComponent/sticky.vue'
Vue.component('sticky',sticky)

import navTab from './components/labComponent/navTab.vue'
Vue.component('navTab',navTab)

Vue.config.productionTip = false

App.mpType = 'app'

uni.post("/api/config/GetBasicConfig", {}, msg => {
	if (msg.success) {
		app.webInfo = msg.info;
		app.titlePerfix = " - " + app.webInfo.title;
		app.userInfo = msg.userInfo;
		let ps = app.userInfo.permissons;
		app.checkPermission = (p) => {
			return (ps && ps.indexOf(p)) >= 0;
		}
	}

	const vm = new Vue({
	    ...App
	})
	vm.$mount()
})
