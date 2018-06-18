// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import api from './api/api'
Vue.config.productionTip = false

Vue.use(Vuex);
let temp;


axios.get(api.getCityAndState).then((data)=>{
  store.state.cityData = [...data.data.city]//setting the data
  store.state.stateData = [...data.data.state]//setting the data
}).catch((err)=>{
  alert(err)
})
const store = new Vuex.Store({
  state: {
    cityData : null,
    stateData : null,
    alt: false,
    label: "some thing happened",
    success:true
  },
  mutations : {
    refresh(state){
      axios.get('https://api.myjson.com/bins/1dfmy1').then(function(data){
        state.calendarData = data.data
      })
    },
    showAlert(state,str){
      state.alt = true;
      var s = str.split('|')
      state.label = s[1];
      (s[0] === 's') ? state.success = true: state.success = false;
      setTimeout(function(){
        state.alt = false;
      },3000);
    }
  }
});


axios.get('https://api.myjson.com/bins/1dfmy1').then((data)=>{
  //store.state.calendarData = [...data.data]//setting the data
  store.state.calendarData = data.data
}).catch((err)=>{
  alert(err)
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
