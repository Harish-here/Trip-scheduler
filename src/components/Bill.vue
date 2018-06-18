<template>
  <div class='row'>
   <div class='col-md-12'>
    <form>
        <ul class='col-md-5'>
            <li class='compress'><label>Company</label>
            <select v-model='appointment.company' class='form-control' required='required'>
             <option disabled value="" selected>Please select Company</option>
            <option v-for="i in companyData" class='form-control' :value='i.label' v-on:change='getNumber'>{{i.label}}</option>
            </select>
            </li>
            <li class='compress'><label>Handled By</label>
            <select v-model='appointment.staff' class='form-control' required='required'>
             <option disabled value="" selected>Please select Your Name</option>
            <option v-for=' i in staffData ' :value='i.label'>{{i.label}} </option>
            </select>
            </li>
            </li>
            <li class='compress'><label>Details</label>
            <textarea v-model='appointment.details' class='form-control' id='staffId' required='required'></textarea>
            </li>
            </li>
            <li class='compress'><label>Experience</label>
            <select class='form-control' v-model='appointment.status'>
            <option value='positive'> Positive</option>
            <option value='negative'>Negative</option>
            <option value='hard'>Hard</option>
            <option value ='neutral'>Neutral</option>
            </select>
            </li>
            <li class='compress'>
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
            </li>
            <li class='compress'><label>Date</label>
            <input type='date' class='form-control' v-model='appointment.date' required='required'/>
            </li>
            </li>
            <li class='compress'><label>Appointment Date</label>
            <input class='form-control' type='date' v-model='nextAppointment.date' required='required'/>
            </li>
            </ul>
            
            <ul class='col-md-5'>
            </li>
            <li class='compress'><label>Appointment Details</label>
            <textarea v-model='nextAppointment.details' class='form-control' id='staffId' required='required'></textarea>
            </li>
            </li>
            <li class='compress'><label>Type</label>
            <select class='form-control' v-model='nextAppointment.status' required='required'>
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
            <li class='compress'><label>Assigned To</label>
            <select v-model='nextAppointment.staff' class='form-control' required='required'>
             <option disabled value="" selected>Please select Your Name</option>
            <option v-for=' i in appointment.staffData ' :value='i.label'>{{i.label}} </option>
            </select>
            </li>
            </li>
            <li class='compress'><label>Contacted Person </label>
            <input class='form-control' id='staffId' required='required' v-model='appointment.contactPerson'/>
            </li>
            <li class='compress'><label>Contacted Phone No.</label>
            <input class='form-control' id='staffId' required='required' v-model='appointment.contact'/><button @click.submit.prevent='copyContact' class='pull-right btn btn-default btn-xs'>Copy</button>
            </li>
            </li>
            <li class='compress'><label>Appointment Contact Person</label>
            <input class='form-control' id='staffId' required='required' v-model='nextAppointment.contactPerson'/>
            </li>
            </li>
            </li>
            <li class='compress'><label>Appiontment Contact</label>
            <input class='form-control' id='staffId' required='required' v-model='nextAppointment.contact'/>
            </li>
            <li class='compress'><label>Email</label>
            <input class='form-control' required='required' v-model='nextAppointment.email'/>
            </li>
            <button type='submit' id='sub' @click.submit.prevent='makeApp' class='btn btn-primary btn-sm'>Make Appointment</button>
        </ul>
        
    </form>
    <ul class='col-md-2'>
    <br/>
    <li><button class='btn btn-default btn-sm' @click="notPickUp('1')">Didn't pick Up</button></li>
    <li><button class='btn btn-default btn-sm' @click="notPickUp('2')">Wrong Number</button></li>
    <li><button class='btn btn-default btn-sm' @click="notPickUp('3')">Reset All</button></li>
    </ul>
   </div>
   
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Make',
  data(){
      return {
          msg : "Hello",
          appointment : {
              date :null,
              details : null,
              contact : null,
              contactPerson : null,
              status : null,
              company : null,
              staff :null,
              lead:null
          },
          nextAppointment : {
              date :null,
              details : null,
              contact : null,
              contactPerson : null,
              status : null,
              staff : null,
              email : null
          }
          
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
  methods:{
      changeTimetoUnix : function(timeStr){
      return Math.round(new Date(timeStr).getTime()/1000)
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
      makeApp : function(){
          var self = this;
          var appD,nxtD,datas;
          $('#loadingGif').css('display','block');
          $("#sub").html('Adding...')
          appD = self.appointment;
          nxtD = self.nextAppointment;
          datas = {
                'appDate' : self.changeTimetoUnix(Date.now()),
                'appDetails' : appD.details,
                'appContact' : appD.contact,
                'appContactPerson' : appD.contactPerson,
                'appStatus' : appD.status,
                'appCompany' : appD.company,
                'appStaff' : appD.staff,
                'nxxtDate' : self.changeTimetoUnix(nxtD.date),
                'nxxtDetails' : nxtD.details,
                'nxxtContact' : nxtD.contact,
                'nxxtContactPerson' : nxtD.contactPerson,
                'nxxtStatus' : nxtD.status,
                'appLead' : appD.lead,
                'nxxtStaff' : nxtD.staff,
                'nxxtEmail' : nxtD.email
          };

    
            var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://www.hobse.com/hobsemap/hobse/index.php/Maps/appoinment",
          "method": "POST",
          "headers": {
          "content-type": "application/x-www-form-urlencoded"
          },
          "data": datas
          }
          $.ajax(settings).done(function (response) {
             console.log(response)
             $('#loadingGif').css('display','none');
            $("#sub").html('Make Appointment')
            });
            appD.date = appD.details = appD.status = appD.staff = appD.company = appD.contact = appD.contactPerson = appD.lead = '';
            nxtD.date = nxtD.details = nxtD.status = nxtD.contact = nxtD.contactPerson = nxtD.staff = nxtD.email ='';
             
      },
      notPickUp : function(type){
          var self= this;
          switch(type){
              case '1' : self.appointment.lead = 'call';
              self.appointment.details = "Made a call, did not picked it";
              self.nextAppointment.details = "Follow up the call,did not picked it Yesterday";
              self.nextAppointment.status = "Follow up";
              self.nextAppointment.staff = self.appointment.staff;
              self.appointment.status = "neutral";
              self.nextAppointment.date = Math.round((Date.now()/ + 24 * 60 * 60 )/1000);
              self.appointment.date = Math.round(Date.now()/1000);break;
              break;
              case '2' : self.appointment.lead = 'call';
              self.appointment.details = "it was wrong number";
              self.nextAppointment.details = "do not follow up it is wrong number";
              self.nextAppointment.status = "Follow up";
              self.nextAppointment.staff = self.appointment.staff;
              self.appointment.status = "neutral";
              self.nextAppointment.date = Math.round((Date.now() + 24 * 60 * 60 )/1000);
              self.appointment.date = Math.round(Date.now()/1000);break;
              case '3' : for(var i in self.appointment){
                  if(self.appointment.prototype.hasOwnProperty(i)){
                      if(!Array.isArray(self.appointment[i])){
                          self.appointment[i] = null;
                      }
                  }
              }
              for(var i in self.nextAppointment){
                  if(self.nextAppointment.hasOwnProperty(i)){
                      if(!Array.isArray(self.nextAppointment[i])){
                          self.nextAppointment[i] = null;
                      }
                  }
              }
              break;
          }
      },
      copyContact : function(){
          var self = this;
          self.nextAppointment.contact = self.appointment.contact;
          self.nextAppointment.contactPerson = self.appointment.contactPerson;
      },
          getNumber : function(){
              alert('hi');
          }
  },
  watch : {
      'appointment.company' : function(oldval,val){
          var self = this;var sample = '';
         var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://www.hobse.com/hobsemap/hobse/index.php/Maps/getCompanyNumber",
          "method": "POST",
          "headers": {
          "content-type": "application/x-www-form-urlencoded"
          },
          "data": {'id' : oldval}
          }
          $.ajax(settings).done(function (response) {
             var t =JSON.parse(response);
             self.appointment.contact = t.mobile
          
            });
       
      }
  }
}
</script>

<style>
.compress{
    max-width:300px;
}
ul{
    list-style:none;
}
li{
    margin-bottom:10px;
}
</style>
