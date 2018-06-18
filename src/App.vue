<template>
  <div id="app" class='fl w100'>
      <transition name='fade'>
        <div v-show='showAlert' class='showAlert' :class='sucess'>
            {{label}}
        </div>
      </transition>

      <div class='fl w60 h-100 '>
            <div class='fl w100 p10-20'>
              <div class='fr'>
                  {{ (trip.employee !== null && trip.employee.hasOwnProperty('value')) ? trip.employee.label : trip.employee}}
                <i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
              </div>
              <h4>{{trip.name}}</h4> 
            </div>
            <div class='fl w100 p5-10'>
                <ul class='fl w100'>
                  <li class='fl w50'>
                    <button id='createBtn' class='btn btn-info btn-sm' @click="controlView('createTrip')">Create Trip</button></li>
                  <li v-if='employeeList.length > 0' class='fl w50 p5-10'>
                    <!-- <button class='fr btn btn-ghost btn-xs'>Set</button> -->
                    <select id='employeeView' v-model='trip.employee' class='fr w30 f14 b6 al-right p2-4' name='emplyoee' :disabled='show.trip' @change='getEmployeeTrip'>
                      <option v-for='i in employeeList' :value='i' :key='i.value'>{{i.label}}</option>
                    </select>
                    <span class='blue fr p5-10' style='background-color:#fff !important;'> Trips of </span>
                  </li>
                </ul>
            </div>
            <div class='fl w100 p5-10'>
              <div id='calendar'></div>
            </div>
      </div> 
      <div class='fl w40 h-100'>
          <ul id='trip' class='nav nav-tabs nav-justified'>
            <li title='View your overall trips' class='active'><a data-toggle='tab' href='#tab2'><i class="fa fa-calendar-o" aria-hidden="true"></i> Trips</a></li>
            <li title='create your schedule'  ><a data-toggle='tab' href='#tab1'><i class="fa fa-home" aria-hidden="true"></i> Manage</a></li>
            <li title="quotations recieved for the trip"><a data-toggle='tab' href='#tab3'><i class="fa fa-list-alt" aria-hidden="true"></i> Quotations</a></li>
          </ul>
          <div class='tab-content'>
            <div class='tab-pane' id='tab1' >
                <div v-show='!show.trip && !show.city && !show.template' style='text-align:center;margin-top:50px;'>
                  <button  id='createBtn' class='btn btn-info btn-sm' @click="controlView('createTrip')">Start to create Trip</button>
                </div>
                <!-- Trip details -->
                <div  id='tripCreation' v-show='show.trip'> 
                  <div class='fl w100 p5-10'>
                    <ul class='list-inline pull-left'>
                      <li class='list-inline-item'><button disabled='disabled' id='templateBtn' class='btn btn-ghost btn-xs' @click='sendTemplate'>save as Template</button></li>
                    </ul>
                    <ul v-if='show.tripBtn' class='list-inline pull-right'>
                      <li class='list-inline-item'><i  @click='controlView("editTrip")' class="fa fa-pencil" aria-hidden="true"></i></li>
                      <li class='list-inline-item'><i  @click='controlView("default")' class="fa fa-trash" aria-hidden="true"></i></li>
                    </ul>       
                    <table id='tripDetails'>
                        <tr>
                          <td class='w50'>
                              <label><i class="fa fa-car" aria-hidden="true"></i> Trip</label>
                              <input v-model='trip.name' type='text' class='form-control' placeholder='Trip Name' :class='{"br-read":tripRead}' required='required'>
                          </td>
                          <td class='w50' v-if='employeeList.length == 0'>
                              <label><i class="fa fa-user" aria-hidden="true"></i> Employee </label>
                              <input v-model='trip.employee' type='text' class='form-control'  placeholder='Employee Name' :class='{"br-read":tripRead}' required='required'>
                          </td>
                          <td class='w50' v-else>
                              <label><i class="fa fa-user" aria-hidden="true"></i> Employee</label>
                              <select v-model='trip.employee'  class='form-control' :class='{"br-read":tripRead}'>
                                <option v-for='i in employeeList' :value='i' :key='i.value'>{{i.label}}</option>
                              </select>
                            
                          </td>
                        </tr>
                        <tr v-if='false'>
                          <td>
                            <label>Company Id</label>
                            <input v-model='trip.companyId' type='text' class='form-control'>
                          </td>
                          <td>
                            <label>Employee ID</label>
                            <input v-model='trip.employeeId' type='text' class='form-control'>
                          </td>
                        </tr>
                    </table>
                  </div>
              
                  <div class='col-md-offset-3 col-md-6' style='text-align:center' >
                    <button class='btn btn-info btn-sm' type='button' v-show='!show.editBtn' id='scheduleBtn'  @click="controlView('addCity')" :disabled='trip.name !== null || trip.name != ""'>Next</button>
                    <button class='btn btn-info btn-sm' type='button' v-show='show.editBtn' id='editBtn'  @click="controlView('addCity')" :disabled='trip.name !== null || trip.name != ""'>Save</button>
                    <!-- end of trip -->
                  </div>
                      <!-- <div class='col-md-12'>
                         <div id='tripCreateInfo' style='display:none' class="alert alert-success fade in alert-dismissable">
                              <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>
                              <strong>Success !</strong> schedule is created
                          </div>
                          <div id='templateCreateInfo' style='display:none' class="alert alert-success fade in alert-dismissable">
                              <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>
                              <strong>Success !</strong> Template is created
                          </div> 
                          </div> -->
                </div>
                <!-- end of Trip details -->

                <!-- city details -->
                <div  id='cityCreation'  v-show='show.city'>
                      <div class='fl w100 p5-10'>
                            <ul class='list-inline w100 p5-10'>
                              <li v-if='show.trip' class="fl w40">Connected Hotels- <span class="badge badge-primary">{{num}}</span></li>
                              <li v-if='!show.trip' class='list-inline-item'><h4><small>Trip - </small>{{trip.store}}</h4></li>
                              <li v-if='(city.status == 0 || city.status == 2) && show.cityBtn' class='list-inline-item pull-right' @click='removeCity(city)'><i class="fa fa-trash" aria-hidden="true"></i></li>
                              <li v-if='(city.status == 0 || city.status == 3 || city.status == 4) && show.cityBtn' class='list-inline-item pull-right' @click='controlView("cityEdit")'><i class="fa fa-pencil" aria-hidden="true"></i></li>
                              <li v-if='show.trip' class='list-inline-item pull-right'><button class='btn btn-default btn-xs' @click='controlView("addCity")'> <i class="fa fa-plus" aria-hidden="true"></i> Add another city</button></li>
                              <li v-if='show.trip' class='list-inline-item pull-right'><button id='showTemplateBtn' @click='controlView("template")' class='btn btn-default btn-xs '>Show Template</button></li>
                            </ul>
                            <table id='cityDetails'>
                                <tr>
                                  <td class='w50'>
                                    <label><i class="fa fa-calendar" aria-hidden="true"></i> From</label>
                                    <input id='fromDate' type='text' class='form-control dbNo' :class='{"br-read" : cityRead}'>
                                      <datepicker v-model='city.start' :disabled='{"to" : new Date()}' :input-class='{"br-read" : cityRead,"form-control":true}' :required='true'/>
                                  </td>
                                  <td class='w50'>
                                    <label><i class="fa fa-calendar" aria-hidden="true"></i> To</label>
                                    <input id='toDate' type='text' class='form-control dbNo' :class='{"br-read" : cityRead}' @input='say'>
                                    <datepicker v-model='city.end' :disabled="range"  :input-class='{"br-read" : cityRead,"form-control":true}' :required='true' />
                                  </td>
                                </tr>
                                <tr>
                                  <td class='w50'>
                                    <label><i class="fa fa-building" aria-hidden="true"></i> Place to Visit</label>
                                    <input v-model='city.place' type='text' class='form-control'  :class='{"br-read" : cityRead}' required='required'>
                                  </td>
                                  <td class='w50'>
                                    <label><i class="fa fa-check-square" aria-hidden="true"></i> Purpose of Visit</label>
                                    <input v-model='city.purpose' type='text' class='form-control'  :class='{"br-read" : cityRead}' required='required'>
                                  </td>
                                </tr>
                                <tr>
                                  <td class='w50'>
                                    <label><i class="fa fa-map-marker" aria-hidden="true"></i> City</label>
                                    <select v-model='city.title' class='form-control'  :class='{"br-read" : cityRead}' required='required'>
                                      <option v-for='i in cityData' :value='i.label' :key='i.label'>{{i.label}}</option>
                                    </select>
                                  </td>
                                  <td class='w50'>
                                    <label><i class="fa fa-map-marker" aria-hidden="true"></i> State</label>
                                    <select v-model='city.state' type='text' class='form-control'  :class='{"br-read" : cityRead}' required='required'>
                                      <option v-for='j in stateData' :value='j.label' :key='j.label'>{{j.label}}</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label><i class="fa fa-map-marker" aria-hidden="true"></i> Locality</label>
                                    <select v-model='city.locality' class='form-control'  :class='{"br-read" : cityRead}' required='required'>
                                      <option v-for='i in locality' :value='i.value' :key='i.label'>{{i.label}}</option>
                                    </select>
                                  </td>
                                  <td>
                                    <label><i class="fa fa-building" aria-hidden="true"></i> Hotel</label>
                                    <select v-model='city.hotel' class='form-control'  :class='{"br-read" : cityRead}' required='required'>
                                      <option v-for='i in hotelData' :value='i.value' :key='i.label'>{{i.label}}</option>
                                    </select>
                                  </td>
                                </tr>  
                            </table>
                      </div>
                      <div class='col-md-offset-3 col-md-6' style='text-align:center;'>
                          <button class='btn btn-info btn-sm' v-show='show.cityAddBtn' :class='{"fl": !cities.length === 0}' @click='addCity' :disabled='!makeAdd'>Add to Trip</button>
                          <button id='changeBtn' class='btn btn-info btn-sm' v-show='show.cityEditBtn'  @click='sendEdit(city)'>Change</button>
                          <button v-if='cities.length > 0 && !show.cityEditBtn' id='saveBtn' class='btn btn-info btn-sm fr' @click='sendTrip'>Finish to Publish</button>
                      </div>
                </div>
                <!--end of city details -->

                    <!-- template view -->
                
                <div v-if='show.template' id='template' class='fl w100'>
                    <div class='fl w100 p5-10'>
                      <span class='pull-right'><button @click='controlView("addCity")' class='btn btn-default btn-xs'> Go to trip <i class="fa fa-chevron-right" aria-hidden="true"></i></button></span>
                      <h4>Templates</h4> 
                    </div>
                  <!--  <div v-for='i in trip.data'  class='col-md-3'>
                      <div  draggable='true' data-event='{"title" : "sample","stick":"true"}' class='template'>
                      {{i.label}}
                      </div>
                    </div> -->
                    <div v-for='i in trip.data'  class='fl w20' :key='i.value'>
                      <div @click='getTemplate(i.value)' class='template'>
                        {{i.label}}
                        <i id='trash' @click='deleteTemplate(i.value)' style='position:absolute;top:0;right:2px;padding:3px;cursor:pointer' class="fa fa-times-circle" aria-hidden="true"></i>
                      </div>
                    </div> 
                </div>
             
                  <!-- template list-->
                <div v-if='show.dataList' id='templateList' class='fl w100'>
                    <h5>Cities</h5>
                    <ul style='list-style:none;padding:0px;'>
                      <li class='listCity fl w33' v-for='i in trip.dataList' draggable='true' :data-event='JSON.stringify(i)' :key='i.id' >
                         <h4 class='f14 b6'>{{i.title}}<br> <small><b>Place - </b>{{i.place}} <br/> <b>From - </b>{{i.start}}  <b>To - </b>{{i.end}}</small></h4>
                      </li>
                    </ul>
                </div>
                  <!-- matched hotel -->
                
                <div v-if='show.hotel' id='hotelDisplay'>
                  <div class='fl w100 p5-10'>
                    <h4>Matched hotel in your schedule</h4>
                    <div v-if='hotelData.length > 0' v-for='j in hotelData' :key='j.hotelsmasterid'><!-- div  for loop -->
                        <div  class='quote'>
                            <div  data-toggle='collapse' :data-target="'#demo'+j.hotelsmasterid"  class='heading'>
                                {{j.hotelname}}
                                <span class='pull-right' style='color:#1a936f'>₹ {{j.price}}</span>
                            </div>
                            <div :id="'demo'+j.hotelsmasterid" class='collapse f12'>
                              start : {{j.hclCode}} 
                            </div>
                        </div>          
                    </div>
                    <div id='quoteLabel' v-else>
                      No Matched Hotel....
                    </div>
                  </div>
                </div>
                
            </div>
            <div class='tab-pane active' id='tab2'  style='overflow-y:auto;height:87vh' >
                <div class='fl w100 p5-10'>
                  <h4 class='fl w50'>{{monthCurrent}} Trips<small> of {{(trip.employee !== null && trip.employee.hasOwnProperty('label')) ? trip.employee.label : 'User'}}</small> </h4>
                  <div class='fr al-right w50 p5-10 f14'>Total Reschedule - <span class='badge bg-res-city'>{{rescheduleCount}}</span></div>
                    <div class='fl w100 p2-4' style='border-bottom:1px solid #e1e1e1;'  v-for='j in filterData' :key='j.id'>
                      <div class='p2-4 f14 fl w100 black center'>{{j.tripName}} 
                        <!-- <span class='label label-primary fr'>{{(function(){ 
                            switch(j.status){
                              case '0': return "Scheduled";break;
                              case '1': return "Approved";break;
                              case '2': return "Declined";break;
                              case '3': return "Reschedule the Date";break;
                              case '4': return "Reschedule the City";break;
                              case '5': return "In Approval process";break;
                            }
                        })()}}</span> -->
                      </div>
                      <table class='table table-striped fl w100 p2-4'>         
                        <thead>
                          <tr>
                            <th>City</th>
                            <!-- <th>Place</th> -->
                            <th>From</th>
                            <th>To</th>
                            
                            <th class='center'>
                            <button v-if='j.status == 0 || j.status == 2' title='Delete this Entire schedule' @click='deleteTrip(j.id)' class='btn btn-default btn-xs'><i class="fa fa-trash" aria-hidden="true"></i> </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for='i in j.events' :key='i.id' :class='{"br-left-res": i.status == "3" || i.status == "4"}'>
                            <td class='w20'>{{i.title.replace(/(.*?)-.*/g, "$1").trim()}}</td>
                            <!-- <td>{{i.place}}</td> -->
                            <td class='w20'>{{ i.start.substr(0,11) }}</td>
                            <td class='w20'>{{ i.end.substr(0,11) }}</td>
                            
                            <td class='w20 center'> 
                              <button @click='setCity(i)' class='btn btn-ghost btn-xs'  title='View this city Details'>View Details</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
            <div class='tab-pane' id='tab3'>
              <div v-if='quoteHtml' id='quotePlace' class='fl w100 p5-10'>
                <!-- <quote :listData='quotesData'/> -->
              </div>
              <div class='center fl w100 p10-20 gray' v-else>Select a city to view the quotes</div>
            </div>
          </div>       
      </div>
  </div>
</template>

<script>

import Vue from 'vue'
import quote from '@/components/quote'
import axios from 'axios'
import api from '@/api/api'
import datepicker from 'vuejs-datepicker'
Vue.component('quote',quote);
Vue.component('datepicker',datepicker)
let a
export default  a = {
  name: 'app',
  data (){
    return {
      trip : {
        id : '',
        name : null,
        employee : null,
        companyId : '',
        employeeId : '',
        data : [],
        dataList : [],
        store : ''
      },
      hotelData : [{label:"All",value:0}],
      locality: [{label:"All",value:0}],
      monthCurrent : '',
      tripRead : false,
      cityRead: false,
      filterCalendarData: [],
      show : {
        trip: false,
        city : false,
        cityBtn: false,
        editBtn : false,
        tripBtn: false,
        cityEditBtn : false,
        cityAddBtn : true,
        template : false,
        hotel : false,
        dataList : false,
        store : true
      },
      city : {
        id : Math.floor(Math.random() * 1000),
        start : new Date(),
        end : new Date(),
        purpose : null,
        place : null,
        title : null,
        state : null,
        status: null,
        hotel: null,
        locality: null
      },
      num: 0,
      cities : [],
      calendarData : '',
      quoteHtml: false,
      quotesData : null,
      date2 : null,
      employeeList: []
    
    }
  },

  computed : {
    cityData : function(){
      return this.$store.state.cityData;
    },

    filterData(){
      const self = this;
      if(self.filterCalendarData.length > 0 ){
        return self.filterCalendarData
      }else{
        return self.calendarData
      }
    },

    rescheduleCount(){
      var t = 0;
      if(this.filterData.length > 0){
        this.filterData.forEach(function(x){
         if(x.hasOwnProperty('events')){
          x.events.forEach(function(y){
              if(y['approveStatus'] == '3' || y['approveStatus'] == '4'){
                t++;
              } 
            });
          }
        });
      }
      return t
    },
    stateData : function(){
      return this.$store.state.stateData;
    },
    showAlert: function(){
      return this.$store.state.alt
    },
    label: function(){
      return this.$store.state.label
    },
    sucess: function(){
      if(this.$store.state.success){
        return {
          succ: true
        }
      }else{
        return { dele: true }
      }
    },
    range: function(){
      const self = this;
      return {
        "to": self.city.start 
      }
    },
    makeAdd: function(){
      const self = this
      return ((self.city.place !== null && self.city.place != "") && (self.city.purpose !== null && self.city.purpose != "") && (self.city.title !== null && self.city.title != "") && (self.city.state !== null && self.city.state != ""))
    }
  },
  watch : {
    cities : function(val,old){
      var self = this;
      
      if(self.cities.length === 0){
        self.makeDisable('showTemplateBtn',1);
        self.makeDisable('saveBtn',1)
      }else{
       old[old.length - 1].start = (old[old.length - 1].start != null) ? self.changeTimetoUnix(old[old.length - 1].start) : null;
       old[old.length - 1].end = (old[old.length - 1].end != null) ? self.changeTimetoUnix(old[old.length - 1].end):null;//make unix time stamp
        self.makeDisable('templateBtn',0)
        self.makeDisable('saveBtn',0)
        self.makeDisable('showTemplateBtn',0);
        
      }
    },
    'city.title' : function(ne,old){
      const self = this;
      var id = self.$store.state.cityData.find(function(x){
          if(x.label === ne){
            return x.value
          }
      });
      var ss = id.value.toString();
      $.post(api.getState,{id:ss}).done(function(data){
        var temp = JSON.parse(data);
        self.city.state = temp.label;
      });
      self.getConnected(id.value);
    },
    'city.locality' : function(ne,old){
      if(ne !== null){
        this.getHotels(ne);
      }
    },

    'trip.name': function(ne,old){
      const self = this;
      var t = (ne != null) ? ne.toString() : "";
      if(t != "" && t.length > 0){
        self.makeDisable('scheduleBtn',0);
        self.makeDisable('editBtn',0);
      }else{
          self.makeDisable('scheduleBtn',1);
          self.makeDisable('editBtn',1);
      }
    }
    
  },
  methods : {
    showp : function(sec){
      if(api.forProd){
        setProgress(sec);
      }
    },
    getQuote: function(obj){
      const self = this;//tool id tool regnise from trip scheduler
      $.post(api.getQuote,Object.assign(obj,{bToolId:2})).done(function(data){
        $('#quotePlace').html(data);
        self.quoteHtml = true;
       
      });
    },
    say: function(){
      console.log($('#todate').val());
    },

    getHotels: function(id){
      const self = this;
      $.post(api.getHotels,{id:id}).done(function(data){
        self.hotelData = JSON.parse(data);
      });
    },

    getLocality: function(id){
      const self = this;
      $.post(api.getLocality,{id:id}).done(function(data){
        self.locality= JSON.parse(data);
      });
    },

    assignQuote: function(obj){
        const self = this;
        self.getQuote(obj)
              self.openManageQuote();
    },
    makeDisable : function(id,type){
      if(type){
        $('#'+id).attr('disabled','disabled')
      }else{
        $('#'+id).removeAttr('disabled','disabled')
      }
    },
    getConnected: function(id){
      const self = this;
      $.post(api.getConnectedNum,{cityId:id}).done(function(data){
        self.num = (Number(data.toString()) !== NaN) ? Number(data.toString()) : 0
      });
      self.getLocality(id);
    },
    getEmployeeTrip: function(id){
    const self = this;
      if(api.forProd){
        $.post(api.getEmployeeTrip,{id:self.trip.employee.value}).done(function(data){
         var temp = JSON.parse(data.all);
          temp.forEach(function(x){
            if(x.hasOwnProperty('events')){
              x.events.forEach(function(y){
                switch(y['approveStatus']){
                  case '0' : y['className'] = 'bg-pending';break;
                  case '1' : y['className'] = 'bg-approved';break;
                  case '2' : y['className'] = 'bg-declined';break;
                  case '3' : y['className'] = 'bg-res-date';break;
                  case '4' : y['className'] = 'bg-res-city';break;
                  case '5' : y['className'] = 'bg-in-approval';break;
                }
              });
            }
          });
       self.calendarData = JSON.parse(JSON.stringify(temp));
       self.addEvents();
      });
      }else{
        $.get(api.getEmployeeTrip).done(function(data){
            var temp = data.all;
            temp.forEach(function(x){
              if(x.hasOwnProperty('events')){
                x.events.forEach(function(y){
                  switch(y['status']){
                    case '0' : y['className'] = 'bg-pending';break;
                    case '1' : y['className'] = 'bg-approved';break;
                    case '2' : y['className'] = 'bg-declined';break;
                    case '3' : y['className'] = 'bg-res-date';break;
                    case '4' : y['className'] = 'bg-res-city';break;
                    case '5' : y['className'] = 'bg-in-approval';break;
                  }
                });
              }
            });
       self.calendarData = JSON.parse(JSON.stringify(temp));
       self.addEvents();
      });
      }
      
    },
     changeTimetoUnix : function(timeStr){
      return Math.round(new Date(timeStr).getTime()/1000)
    },
    setCity : function(obj){
      const self = this;
      self.getQuote({bemId:obj.id,cityMasterId: obj.cityId,isquotes:1});
      var temp = JSON.parse(JSON.stringify(obj));
      self.getSingle(obj.id);
      self.city.id = temp.id;
      self.city.title = temp.title;
      console.log(temp.title)
      self.city.start = new Date(temp.start);
      self.city.end = new Date(temp.end);
      // console.log(temp)
      self.city.place = temp.place;
      self.city.purpose = temp.purpose;
      self.city.state = temp.state;
      self.city.status = temp.status;console.log(temp.status)
      self.show.trip = false
      self.controlView('cityView');
    },
    deleteTemplate: function(id){
      const self = this;
      if(confirm('Are you sure to delete this template?')){
        
      $.post(api.deleteTemplate,{id:id}).done(function(data){
            axios.get(api.getTemplate).then(function(data){
              self.$store.commit('showAlert','d|Template Deleted.!!');
              self.trip.data = data.data.templates;
            });
      });
    }
      
    },
    flush : function(){
      const self= this;
      for(var i in self.city){
          self.city[i] = null;
        }
        self.city.id = Math.floor(Math.random() * 1000);
    },
    addCity : function(){
      const self = this;
     // self.city.start = String($('#fromDate').val());
     // self.city.end = $('#toDate').val();
      if(self.city.start !== null && self.city.place !== null && self.city.purpose !== null){
        let temp = JSON.parse(JSON.stringify(self.city));
        temp.status = 0;
        self.cities.push(temp);
        $('#calendar').fullCalendar('addEventSource',{events : [self.city],color:'#3a87ad',textColor:'white'});
        self.city.start = null;
        self.city.end = null;
       
       self.flush() 
      }
    
    },
    removeCity : function(obj){
      const self = this;let isThere = 0;
      if(confirm('Are you sure to remove??')){
        $('#calendar').fullCalendar('removeEvents',obj.id);
        if(obj.state != null && obj.start != null){
          if(self.cities.length > 0){
            for(var i = 0;i<self.cities.length;i++){
              if(self.cities[i].id === obj.id){
                self.cities.splice(i,1);
                isThere = 1;
              }
            }
          }else{
                if(api.forProd){
                    setProgress(2);
                  }
              $.post(api.deleteTrip,obj).done(function(data){
             if(data){
               //self.fade('removeCityInfo',2);
              // $('#removeCityInfo').css('display','block');
               self.$store.commit('showAlert','s|Trip is Updated..!!')
             }
              
            });
          }
         
      }
      self.flush();
      }
    },
    openManage: function(){
      $('#app ul.nav li').removeClass('active');
      $('#app  ul.nav li:nth-child(2)').addClass('active');
      $('#app  .tab-content div.tab-pane').removeClass('active');
      $('#tab1').addClass('active')
    },
    openManageQuote: function(){
      $('#app ul.nav li').removeClass('active');
      $('#app  ul.nav li:nth-child(3)').addClass('active');
      $('#app  .tab-content div.tab-pane').removeClass('active');
      $('#tab3').addClass('active')
    },
    openManageTrip: function(){
      $('#app ul.nav li').removeClass('active');
      $('#app  ul.nav li:nth-child(1)').addClass('active');
      $('#app  .tab-content div.tab-pane').removeClass('active');
      $('#tab2').addClass('active')
    },

    setQuote: function(obj){
      self.quotesData = JSON.parse(JSON.stringify(obj));
    },

    createTrip : function(){
      const self= this;
      self.makeDisable('tripDetails input[type=text]',1)
      self.show.trip = true;
      self.show.city  = true;
      self.trip.id = '';
      self.trip.name = null;
      self.trip.store = '';
    },
    controlView : function(ctrl){
      const self = this;
      switch(ctrl){
        case 'createTrip' : self.show.city = false ;
                            self.tripRead = false;
                            self.show.template = false ;
                            self.makeDisable('tripDetails input[type=text]',0);
                            //self.makeDisable('scheduleBtn',0);
                            self.makeDisable('createBtn',1);
                            self.show.trip = true;
                            self.show.tripBtn = false;
                            self.show.dataList = false;
                            self.openManage();
                            break;
        case 'addCity' : self.show.trip = true;
                          self.flush();
                         self.show.city = true ;
                         self.show.editBtn = false;
                         self.show.template = false;
                         self.show.dataList = false;
                         self.tripRead = true;
                         self.show.tripBtn = true;
                         self.makeDisable('tripDetails input[type=text]',1);
                         self.makeDisable('scheduleBtn',1);
                         self.makeDisable('cityDetails input',0);
                         self.makeDisable('cityDetails select',0);
                         self.makeDisable('changeBtn',0);
                         self.controlView('cityEdit');
                         self.show.cityEditBtn = false;self.show.cityAddBtn = true;self.show.cityBtn = false;
                         break;
        case 'editTrip' : self.makeDisable('tripDetails input[type=text]',0);
                          self.makeDisable('scheduleBtn',0);
                          self.show.editBtn = true;
                          self.tripRead = false;
                          self.show.tripBtn = false;
                          self.controlView('cityView');break;
        case 'cityView' : self.makeDisable('cityDetails input',1);
                          self.cityRead = true;
                          self.show.city = true ;
                          self.makeDisable('cityDetails select',1);
                          self.makeDisable('changeBtn',1);
                          self.show.cityEditBtn = true;
                          self.show.cityAddBtn = false;
                          self.show.cityBtn = true;
                          self.openManage();
                          break;
        case 'cityEdit' : self.makeDisable('cityDetails input',0);
                          self.cityRead = false;
                          self.makeDisable('cityDetails select',0);
                           self.makeDisable('changeBtn',0);
                          self.show.cityEditBtn = true;self.show.cityAddBtn = false;self.show.cityBtn = false;
                          break;
        case 'template' : self.show.trip = false;
                          self.show.city = false;
                          self.show.template = true;
                          self.show.dataList = false;
                          break;
        case 'default' : if(confirm('Are You sure to cancel the trip?')){
                          $('#calendar').fullCalendar('removeEventSources');
                          $('#calendar').fullCalendar('addEventSource',{id: self.calendarData.tripId,events : [...self.calendarData.cities],color:'#88d498',textColor:'white'})
                          self.flush();
                          self.cityRead = false;
                          self.tripRead = false;
                          self.show.trip = true;
                          self.trip.name = null;
                          self.trip.employee = null;
                          self.show.city = false;self.makeDisable('createBtn',0);
                          break;
                          //here load the calendar with year data
                          }
        

      }
    },
    sendEdit : function(obj){
      const self = this;
      //fire a ajax request toDate send the change
      let isThere = false;
      for(var t in self.cities){
        if(t.id === obj.id){
          isThere = true;
          break;
        }
      }//checking whther it is in the cities array
      if(!isThere){
      let dataTosend = JSON.parse(JSON.stringify(obj));
      dataTosend.start = self.changeTimetoUnix(dataTosend.start);
      dataTosend.end = self.changeTimetoUnix(dataTosend.end);
     // if(confirm('Are you sure toDate change?')){
        
        $.post(api.editTrip,dataTosend ).done(function(data){
          self.$store.commit('showAlert','s|Trip Updated...!!');
          $('#calendar').fullCalendar('removeEvents',obj.id);
          $('#calendar').fullCalendar('addEventSource',{events : [obj],color:'#88d498',textColor:'white'})
          self.controlView('cityView')
        })
        //}
      }else{
        //if(confirm('Are you sure toDate change?')){
          $('#calendar').fullCalendar('removeEvents',obj.id);
          $('#calendar').fullCalendar('addEventSource',{events : [obj],className:'#88d498',textColor:'white'});
          self.controlView('cityView');
        //}
      }
        
    },
    sendChange : function(obj,diff){
      const self = this;
      let dataTosend = {
        id : obj.id,
        title : obj.title,
        start : (diff) ?  self.changeTimetoUnix(obj.start) + (diff  * 3600 * 1000) / 1000 : self.changeTimetoUnix(obj.start),
        end :  self.changeTimetoUnix(obj.end),
        purpose : obj.purpose,
        place : obj.place
      }
       
      // if(confirm('Are you sure toDate change?')){
         
          $.post(api.editTrip,dataTosend).done(function(data){
            //stop the spinner here
            self.$store.commit('showAlert','s|Trip Updated...!!');
            //$('#tripChangeInfo').css('display','inline');
            //self.fade('tripChangeInfo',3);
            self.refresh();
          });
      //}
    },
    
    refresh: function(){
      const self = this;
     // $('#calendar').fullCalendar('removeEventSources');
      axios(api.getTrip).then(function(data){
        var temp = data.data.all;
        temp.forEach(function(x){
              if(x.hasOwnProperty('events')){
                x.events.forEach(function(y){
                  y['title'] = y['title'] + ' - ' + x['tripName'];
                  switch(y['approveStatus']){
                    case '0' : y['className'] = 'bg-pending';break;
                    case '1' : y['className'] = 'bg-approved';break;
                    case '2' : y['className'] = 'bg-declined';break;
                    case '3' : y['className'] = 'bg-res-date';break;
                    case '4' : y['className'] = 'bg-res-city';break;
                    case '5' : y['className'] = 'bg-in-approval';break;
                  }
                });
              }
            });
        self.calendarData = JSON.parse(JSON.stringify(temp));
          $('#calendar').fullCalendar( 'removeEventSources')
          temp.map(function(x){
            $('#calendar').fullCalendar('addEventSource',x);
          });
      });
      
    },
    addEvents: function(){
      var temp = this.calendarData;
          $('#calendar').fullCalendar( 'removeEventSources')
          temp.map(function(x){
            $('#calendar').fullCalendar('addEventSource',x);
          });
    },
    getSome:function(){
      axios('https://api.myjson.com/bins/gx17t').then(function(data){
          var temp = data.data.all;
          $('#calendar').fullCalendar( 'removeEventSources')
          temp.map(function(x){
            $('#calendar').fullCalendar('addEventSource',x);
          });
      })
      
    },
    sendTrip : function(){
      const self = this;
      let dataToSend = {
        tripId : '',
        tripName : self.trip.name,
        employeeName : self.trip.employee,
        companyId : self.trip.companyId,
        employeeId : self.trip.employeeId,
        cities : self.cities
      }
      self.sample = JSON.stringify(dataToSend);
      // console.log(self.sample)
      // if(api.forProd){
      //   setProgress(3);
      // }
      if(confirm('Are you sure to Publish '+self.trip.name+' ?')){
          
          $.post(api.sendTrip,dataToSend).done(function(data){
          
            if(data){
            // $('#tripCreateInfo').css('display','block');
            self.$store.commit('showAlert','s|Trip '+self.trip.name+' is Published...!!');
              self.trip.name = null;
              self.trip.employee = null;
              self.cities = [];
              self.openManageTrip();
              self.refresh();
            // self.controlView('createTrip');
              self.makeDisable('createBtn',0);
            }
          });
      }
          
    },
    sendTemplate : function(){
      const self = this;
      let dataToSend = {
        tripId : '',
        tripName : self.trip.name,
        employeeName : self.trip.employee,
        companyId : self.trip.companyId,
        employeeId : self.trip.employeeId,
        cities : self.cities
      }
      self.date2 = JSON.stringify(dataToSend);
       
      $.post(api.sendTemplate,dataToSend).done(function(data){
        if(data){
          self.$store.commit('showAlert','s|Template Saved...!!');
         // $('#templateCreateInfo').css('display','block');
          self.controlView('createTrip');
        }
      })
    },
    deleteTrip : function(id){
      const self = this;
      if(confirm('Are you sure you want delete this Entire trip ?')){
       
      $.post(api.deleteAllTrip,{tripId : id}).done(function(data){
        self.refresh();
        if(data){
          $('#calendar').fullCalendar('removeEventSources',id);
          //$('#deleteTripInfo').css('display','block');
          // self.controlView('createTrip');
          self.$store.commit('showAlert',"d|Trip got Deleted..!!")
        }
      })}
    },
    changeDate : function(event){//change the date of the evnt while dragginh or dropping
      const self =this;let isThere = false;
      if(self.cities.length > 0){
          //if(confirm('Are you sure toDate change the date?')){    
            for(var i in self.cities){
              if(event.id === self.cities[i].id){
                self.cities[i].end = self.changeTimetoUnix(event.end);
                self.cities[i].start = self.changeTimetoUnix(event.start);
                isThere = true;
              }
            }
        
        }
        if(!isThere){
          self.sendChange(event,0);
        }
    },
   getTemplate : function(id){
    const self =this;
    
      $.get(api.getTemplateList).done(function(data){
    
        let temp = data;
        self.trip.dataList = data.cities
        self.show.dataList = true;
        $(function(){
          $('#templateList ul li').draggable({
              zIndex: 999,
              revert: true,      // will cause the event toDate go back toDate its original position
              revertDuration: 0 
       });
        });

      });
     
    },
    getSingle: function(id){
      const self = this
      $.post(api.getSingle,{id : id }).done(function(dat){
        if(api.forProd){
                    var temp = JSON.parse(dat)
                    self.trip.store = temp.tripName;
                    self.show.store = true;
                  }
      });
    }
  },
  created(){
    const self = this;let cal = void 0,id;
    
     axios.get(api.getTrip).then((data)=>{
       //store.state.calendarData = [...data.data]//setting the data
       
      // cal = data.data.all;
       var temp = JSON.parse(JSON.stringify(data.data.all));
       temp.forEach(function(x){
         if(x.hasOwnProperty('events')){
           x.events.forEach(function(y){
             y['title'] = y['title'] + ' - ' + x['tripName'];
            switch(y['approveStatus']){
              case '0' : y['className'] = 'bg-pending';break;
              case '1' : y['className'] = 'bg-approved';break;
              case '2' : y['className'] = 'bg-declined';break;
              case '3' : y['className'] = 'bg-res-date';break;
              case '4' : y['className'] = 'bg-res-city';break;
              case '5' : y['className'] = 'bg-in-approval';break;
            }
           });
         }
       });//inserting the color class
       cal = JSON.parse(JSON.stringify(temp));
       self.calendarData = JSON.parse(JSON.stringify(data.data.all));
      
       
          $(function(){
  
        $('#calendar').fullCalendar({
                // put your options and callbacks here
                height : 520,
                eventClick : function (cals,js,view){
                  if(self.cities.length === 0 && !self.show.trip){
                    $.post(api.getSingle,{id : cals.id }).done(function(dat){
                      self.trip.id = cals.source.id;
                      const cityId = cals.id;
                      let isThere;//toDate check the click is been made on city that is created or on the calendar
                      if(api.forProd){
                        var temp = JSON.parse(dat)
                        self.trip.store = temp.tripName
                      }  //getting the quote
                       self.getQuote({bemId:cals.id,cityMasterId:cals.cityId,isquotes:1});
                        // console.log(cals.title.replace(/(.*?)-.*/g, "$1").trim());
                        self.city.title = cals.title.replace(/(.*?)-.*/g, "$1").trim();
                        self.city.start = cals.start._d;
                        self.city.end = ( cals.end !== undefined && cals.end !== null  ) ? cals.end._d : cals.start._d;
                        // $('#fromDate').val(cals.start.format('DD-MM-YY'));
                        // $('#toDate').val((cals.end != null && cals.end != undefined ) ? cals.end.format('DD-MM-YY') : null);
                        self.city.state = cals.state;
                        self.city.place = cals.place;
                        self.city.purpose = cals.purpose;
                        self.city.id = cals.id;
                        self.city.status = cals.status;
                        for(var t in self.cities){
                          
                          if(cals.id == self.cities[t].id){
                            isThere = true;
                            break;
                          }
                        }
                        if(!isThere){
                          
                          self.controlView('cityView');
                          self.show.trip = false;
                          self.quotesData = cal.filter(function(x){
                            if(cals.source.id == x.id){
                              return x.events
                            }
        
                          });
                          
                          //for hotel --- >>>
                            $.post(api.getHotelNearBy,{id : cals.id }).done(function(dat){
                              self.hoteldata = JSON.parse(dat);
                              self.show.hotel = true;
                            });
                        }else{
                        self.controlView('cityView');
                        self.show.trip = true;
                        }
                        
                    });
                  }else{
                    $.post(api.getSingle,{id : cals.id }).done(function(dat){
                      if(api.forProd){
                        var temp = JSON.parse(dat)
                        self.trip.store = temp.tripName
                      }

                      if(self.cities.length > 0){
                        var ss = self.cities.findIndex(function(x){
                          return x.id == cals.id
                        });
                        
                        if(ss >= 0){
                          self.trip.id = cals.source.id;
                            self.city.title = cals.title.replace(/(.*?)-.*/g, "$1").trim();
                            self.city.start = cals.start._d;
                            self.city.end = (cals.end !== null && cals.end !== undefined ) ? cals.end._d : null;
            
                            self.city.state = cals.state;
                            self.city.place = cals.place;
                            self.city.purpose = cals.purpose;
                            self.city.id = cals.id;
                            self.controlView('cityView');
                            self.show.trip = true;
                        }else{
                          self.$store.commit('showAlert',"s|You Can't view the Details of cities outside your trip while creating..!!")
                        }
                      }
                      else{
                        self.show.trip = false;
                        self.trip.id = cals.source.id;
                          self.city.title = cals.title.replace(/(.*?)-.*/g, "$1").trim();
                          self.city.start = cals.start._d;
                          self.city.end = (cals.end !== null && cals.end !== undefined ) ? cals.end._d : null;
          
                          self.city.state = cals.state;
                          self.city.place = cals.place;
                          self.city.purpose = cals.purpose;
                          self.city.id = cals.id;
                          self.controlView('cityView');
                          
                      }
                    });
                    
                  }
                  
                
                },
                eventSources : cal,
                eventLimit: 3, // for all non-agenda views
                viewRender : function (view, element) {
                    var t = new RegExp(String.trim(view.title.toString().substr(0,3)));
                    var temp = self.calendarData.filter(x => { 
                        
                       // console.log( x.events.some(y => new RegExp(t).test(y.start)));
                         return x.events.some(y => t.test(y.start))  
                        
                      });
                      self.filterCalendarData = temp;
                      self.monthCurrent = (self.filterCalendarData.length > 0) ? view.title.split(' ')[0] : 'Overall'
                },
                droppable : true,
                drop : function(event){
                //  $(this).removeClass('template');
                },
                editable : true,
                allDay : true,
                eventResize : function(event,delta,revert){
                  if(confirm('Are you sure to change?')){
                    self.changeDate(event);
                    }else{
                      revert();
                    }
                  
                },
                eventDrop : function(event,delta,revert){
                  let isThere = false;
                  if(confirm('Are you sure to change?')){
                    if(self.cities.length > 0){
                        
                        self.sendChange(event,delta._days);
                    }
                    else{
                      //check the incoming city obj whether it is newly created or alreay exisited
                      for(var i = 0 ; i < self.cities.length;i++){
                        if(self.cities[i].id === event.id){
                            isThere = true;
                            break;
                        }
                      }
                      if(!isThere){
                        self.sendChange(event,delta._days);
                        return;
                      }
                    }
                  }else{
                  revert();
                  }
                },
                eventRender : function(event,ele){
                  
                  var cont = "<h5>"+event.title+"</h5><div id='qtip_ol'> <div class='lp0'><b>Place - </b>"+event.place+"</div> <div><b>Purpose - </b>"+event.purpose+"</div><div> "+ 
                  "</div><div><b>Status -</b> "+
                  (function(){ 
                    switch(event.approveStatus){
                      case '0': return "Scheduled";break;
                      case '1': return "Approved";break;
                      case '2': return "Declined";break;
                      case '3': return "Reschedule the Date";break;
                      case '4': return "Reschedule the City";break;
                      case '5': return "In Approval process";break;
                    }
                  })()+"</div>"
                  ele.qtip({
                          content: cont
                        });
                },
                eventReceive : function(event){
                  let isThere = false;
                  for(var i=0;i<self.cities.length;i++){
                    if(self.cities[i].id === event.id){
                      isThere = true;
                      break;
                    }
                  }
                  if(!isThere){
                    self.cities.push({id:event.id,start:self.changeTimetoUnix(event.start),end:self.changeTimetoUnix(event.end),title:event.title,purpose:event.purpose,place:event.place})
                  }else{
                    $('#calendar').fullCalendar('removeEvents',event.id)
                  }
                }
          
              });
                  //make save btn disabled
                  self.makeDisable('templateBtn',1)
                  self.makeDisable('saveBtn',1)
              });

          });
        //get template
        axios.get(api.getTemplate).then(function(data){
          self.trip.data = data.data.templates;
          
        });
     //get employee list
     if(api.forProd){
     axios.get(api.getEmployeeList).then(function(data){
        self.employeeList = data.data;
     });
     
     }
     axios.get(api.getThisEmployee).then(function(data){
       self.trip.employee = data.data
     });
    
}
  }

</script>

<style src='@/assets/basic.css'>

</style>
