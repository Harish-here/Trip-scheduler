<template>
  <div class="row">
    <div class='col-lg-12'>
    <ul class='list-inline'>
      <li class='list-inline-item' @click="showTodays('1')"><a  href='#'>General</a></li>
      <li class='list-inline-item' @click="showTodays('2')"><a  href='#'>Today's</a></li>
      <li class='list-inline-item' @click="showTodays('3')"><a  href='#'>Search</a></li>
    </ul>
      <ul v-show='appointment.showGeneral'>
        <li>
          <label>
          Company
          </label>
          <select v-model='appointment.company' class='form-control compress'>
          <option v-for='i in companyData' :value='i.label'>{{i.label}}</option>
          </select>
        </li>
        <li>
          <label>From</label>
          <input  v-model='appointment.fromDate' class='form-control' type="date" id='fromDate' />
        </li>
        <li>
          <label>To</label>
          <input v-model='appointment.toDate' class='form-control' type="date" id='toDate' />
        </li>
        <li>
        <label>Appointment Status</label>
            <select class='form-control' v-model='appointment.status'  required='required'>
            <option value='Follow up'>Follow Up</option>
            <option value='send mail'>Send mail</option>
            <option value='send proposal'>Send proposal</option>
            <option value ='direct visit'>Direct visit</option>
            <option value ='higher official call'>Higher Official call</option>
            <option valu ='rejected'> Rejected</option>
            <option value='objection handeling call'>objection handeling call</option>
            <option value='signup mail'>Signup Mail</option>
            </select>
            </li>
            <li>
        <label>Lead</label>
            <select class='form-control' v-model='appointment.lead'  required='required'>
            <option value='call'>Call</option>
            <option value='email'>Email</option>
            <option value='facebook'>Facebook</option>
            <option value='FB messenger'>FB messenger</option>
            <option value='quora'>Quora</option>
            <option value ='linkedin comment'>Linkedin comment</option>
            <option value ='linkedin group'>Linkedin group</option>
            <option valu ='instagram'>Instagram</option>
            <option value='WhatsApp'>WhatsApp</option>
            <option value='twitter'>Twitter</option>
            <option value='youtube'>Youtube</option>
            </select>
            </li>
        <li>
            <button class='btn btn-primary' @click='getList'>List</button>
        </li>
      </ul>
      <ul v-show='appointment.showToday'  class='list-inline'>
        <li class='list-inline-item'>
        <label>staff</label>
            <select v-model='appointment.staffHolder' class='form-control' required='required'>
             <option disabled value="" selected>Please select Your Name</option>
            <option v-for=' i in staffData ' :value='i.label'>{{i.label}} </option>
            </select>
        </li>
        <li class='list-inline-item'>
        <button class='btn btn-primary btn-sm' @click='getTodayTask'>Get today's task</button>
        </li>
      
      </ul>
      <ul class='list-inline' v-show='appointment.showSearch'>
        <li class='list-inline-item'>
        <label>Search Term</label>
        <input type='text' v-model='appointment.search' class='form-control compress'/>
        </li>
        <li class='list-inline-item'>
        <label>Area</label>
         <select v-model='appointment.area' class='form-control'>
          <option value='company'>Company</option>
          <option value='phone'>Phone</option>
          <option value='person'>Person</option>
         </select>
        </li>
        <li class='list-inline-item'>
        <button class='btn btn-default btn-sm' @click='searchArea'>search </button>
        </li>
      </ul>
      <div class='col-md-12'>
      <h3><u>List of Appoinments</u></h3>
        <div v-show='appointment.showList' class='contanier-card col-md-offset-1 col-md-9 ' v-for='i in appointment.data'>
        <div class='row'>
        <div class='col-md-12'>
        <div id='title' @click="getComapnyList(i.appointmentId)" title='click to get this company list alone'>{{i.companyId}} <small>{{i.staffId}}</small>
        </div><br/>
        <ul class='list-inine' style='position:absolute;top:0;right:0;'>
        <li v-show="i.status == 'opened'" class='list-inline-item'><label class='label label-primary'><span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span> Opened</label></li>
          <li v-show="i.status == 'closed'" class='list-inline-item'><label class='label label-success'><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Finished</label></li>
          <li v-show="i.status == 'canceled'" class='list-inline-item'><label class='label label-danger'><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancelled</label></li>
        <li class='list-inline-item'>Assigned To : <b> {{i.nextAppointmentStaff}}</b></li>
        <li class='list-inline-item'>Kind : <b>{{i.nextAppointmentstatusId }}</b></li>
        <li class='list-inline-item'>Source : <b>{{i.appointmentLead }}</b></li>
        </ul>
        </div>
          <div class='col-md-4'>
          Last  :  <b>{{ changeTimetoDate(new Date(i.appointmentDate * 1000))}}</b>
          <br/>
          <p>
          {{i.appointmentDetails}}
          </p>
          </div>
          <div class='col-md-4'>
          Next  :  <b>{{changeTimetoDate(new Date(i.nextAppointmentDate * 1000))}}</b>
          <br/>
          <p>
          {{i.nextAppointmentDetails}}
          </p>
          </div>
          <div class='col-md-4'>
          <ul class='list-inline'>
          <li class='list-inline-item'>
          <div class="dropdown">
              <button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Contacted
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a>Name : <b>{{i.appointmentContactPerson}}</b></a></li>
                <li><a>Contact : <b>{{i.appointmentContact}}</b></a></li>
                <li><a>Experience : <b>{{i.appointmentstatusId}}</b></a></li>
              </ul>
            </div>
          </li>
          <li class='list-inline-item'>
            <div class="dropdown">
              <button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                To contact
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><a>Name : <b>{{i.nextAppointmentContactPerson}}</b></a></li>
                <li><a>Contact : <b>{{i.nextAppointmentContact}}</b></a></li>
                <li><a>Mail : <b>{{i.nextAppointmentPersonEmail}}</b></a></li>
              </ul>
            </div>
            </li>
            </ul>
            <ul class='list-inline'>
              <li v-show="i.status == 'closed'" class='list-inline-item'><button @click="sendStatus(i.appointmentId,'opened')" class='btn btn-info btn-xs'>Open</button></li>
              <li v-show="i.status == 'opened'" class='list-inline-item'><button @click="sendStatus(i.appointmentId,'closed')" class='btn btn-warning btn-xs'>Finish</button></li>
              <li v-show="i.status == 'opened'" class='list-inline-item'><button @click="sendStatus(i.appointmentId,'canceled')" class='btn btn-danger btn-xs'>cancel</button></li>
            </ul>
          </div>
          <!--<input type='button' @click="showMore(this,i.appointmentId)" style='padding:3px;' class='btn btn-primary input-sm' value='Show'/> -->
          
        </div>
        </div>
        </div>
    </div>
   
  </div>
</template>
<script>

import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      appointment : {
        fromDate : null,
        toDate : null,
        company : null,
        data : '',
        status : null,
        showList : false,
        
        lead: '',
        
        staffHolder:null,
        showToday : false,
        search : null,
        area : null,
        showSearch : false,
        showGeneral : true
      },
      
    }
  },
  computed : {
    companyData: function(){
      return this.$store.state.companyInfo
    },
    staffData: function(){
      return this.$store.state.staffInfo
    }
  },
  methods : {
    changeTimetoUnix : function(timeStr){
      return Math.round(new Date(timeStr).getTime()/1000)
    },
    changeTimetoDate : function(str){
      str = str.toString()
      return str.replace(/(.*?\d{4}).*/,'$1');
    },
    sendData : (url ,datas,json)=>{// ajax utli
      var head = (json) ? "application/json" : "application/x-www-form-urlencoded";
          var settings = {
                "async": true,
                "crossDomain": true,
                "url": url,
                "method": "POST",
                "headers": {
                  "content-type":head 
                },
                "data" : datas
              }

        $.ajax(settings).done(function (response) {
          return response;
        });
      },
      showTodays : function(stat){
        var self = this;
        switch(stat){
          case '1' : self.appointment.showGeneral = true;self.appointment.showToday = false;self.appointment.showSearch = false;break;
          case '2' : self.appointment.showToday = true;self.appointment.showGeneral = false;self.appointment.showSearch = false;break;
          case '3' : self.appointment.showSearch = true;self.appointment.showToday = false;self.appointment.showGeneral = false;break;
        }
      },
    getList : function(){
      // $('#loadingGif').css('display','block');
      $('#loadingGif').fadeIn();
      var self = this;
      var datas;
      var toDate = (self.appointment.toDate != null) ? self.appointment.toDate : 'null' ;
      var fromDate = (self.appointment.fromDate != null) ? self.appointment.fromDate : 'null' ;
      var company = (self.appointment.company != null) ? self.appointment.company : 'null' ;
      var status = (self.appointment.status != null) ? self.appointment.status : 'null' ;
      var staff = (self.appointment.staffHolder != null) ? self.appointment.staffHolder : 'null' ;
      datas = {
        'fromDate' :  fromDate,
        'toDate'  : toDate,
        'company' : company,
        'status' : status,
        'staff' : staff,
        'search' : 'null',
        'area' : 'null'
      }
          var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://www.hobse.com/hobsemap/hobse/index.php/Maps/listAppointment",
          "method": "POST",
          "headers": {
          "content-type": "application/x-www-form-urlencoded"
          },
          "data": datas
          }
            $.ajax(settings).done(function (response) {
               self.appointment.data = JSON.parse(response);
               console.log(self.appointment.data);
              //  $('#loadingGif').css('display','none');
              $('#loadingGif').fadeOut();
                self.appointment.showList = true;
                // self.appointment.toDate = self.appointment.fromDate = self.appointment.company = self.appointment.status = null;
            });

      
    },
    searchArea : function(){
      var self =this;
      $('#loadingGif').fadeIn();
      var datas = {
        'fromDate' :  'null',
        'toDate'  : 'null',
        'company' : 'null',
        'status' : 'null',
        'staff' : 'null',
        'search' : self.appointment.search,
        'area' : self.appointment.area
      };
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://www.hobse.com/hobsemap/hobse/index.php/Maps/listAppointment",
          "method": "POST",
          "headers": {
          "content-type": "application/x-www-form-urlencoded"
          },
          "data": datas
          }
            $.ajax(settings).done(function (response) {
               self.appointment.data = JSON.parse(response);
               console.log(self.appointment.data);
              //  $('#loadingGif').css('display','none');
              $('#loadingGif').fadeOut();
                self.appointment.showList = true;
                // self.appointment.toDate = self.appointment.fromDate = self.appointment.company = self.appointment.status = null;
            });

      

    },
    getTodayTask : function(){
      const self = this;
      let t = self.changeTimetoUnix(Date.now());
      self.appointment.toDate = t;
      self.appointment.fromDate = t;
      self.appointment.company = null;
      self.appointment.status = null;
      self.getList();
    },
    getComapnyList :function(id){
      var self = this;
        this.appointment.company = id;
        this.appoinment.fromDate = null;
        this.appoinment.toDate = null;
       
        self.getList();
    },
    sendStatus : function(id,action){
      var self = this;
      var datas = {
        'id' : id,
        'action' : action
      }
      var res = self.sendData('http://www.hobse.com/hobsemap/hobse/index.php/Maps/changeStatus',datas,false);
      
        self.getList();
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.contanier-card{
  border : 1px solid #777;
  padding: 10px;
  margin-bottom:5px;
}
.btnDetails{
  padding:2px;
}
#title{
  font-size:18px;
  font-weight : 600;
}
div small{
  color:grey;
  font-weight : normal;
}
.compress{
  width:250px;
}
</style>
