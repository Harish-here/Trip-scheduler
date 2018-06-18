const forProd = true;

const prodPath = 'http://www.hobse.com/demo/index.php/customer/scheduler';
const local = "http://localhost/";

export default {
    sendTrip: (forProd) ? prodPath + "/create" : "http://localhost/",
    sendTemplate: (forProd) ? prodPath + "/createTemplate" : "http://localhost/",
    getThisEmployee: (forProd) ? prodPath + "/employee" : "https://api.myjson.com/bins/p7eyl",
    deleteTrip: (forProd) ? prodPath + "/tripDelete" : "http://localhost/",
    deleteAllTrip: (forProd) ? prodPath + "/deleteTrip" : "http://localhost/",
    editTrip: (forProd) ? prodPath + "/tripEdit" : "http://localhost/",
    getTrip: (forProd) ? prodPath + "/getSchedule" : "https://api.myjson.com/bins/de0gd",
    forProd: forProd,
    getEmployeeList: (forProd) ? prodPath + "/employeeList" : "https://api.myjson.com/bins/1bxo75", 
    getEmployeeTrip: (forProd) ? prodPath + "/getSchedule" : "https://api.myjson.com/bins/j7c99",//stuff left on backend
    getSingle: (forProd) ? prodPath + "/getSingle" : "http://localhost/",
    getCityAndState: (forProd) ? prodPath + "/cityAndState" : "https://api.myjson.com/bins/aqof1",
    getNearByHotel: (forProd) ? prodPath + "/getNearByHotel" : "https://api.myjson.com/bins/1d7a3h",
    getState: (forProd) ? prodPath + "/getState" : "http://localhost/",
    getTemplate: (forProd) ? prodPath + "/getTemplates" : "https://api.myjson.com/bins/1bqnt1",
    getTemplateList: (forProd) ? prodPath + "/getTemplatesList" : "https://api.myjson.com/bins/vo6yl",
    deleteTemplate: (forProd) ? prodPath + "/deleteTemplate" : "http://localhost/",
    getConnectedNum: (forProd) ? prodPath + '/connectedHotels' : "http://localhost/",
    getQuote: (forProd) ? 'http://www.hobse.com/demo/index.php/customer/booking/getquotes' : "http://localhost/",
    getHotels: (forProd) ? prodPath +'/connectdHtls' : '',
    getLocality: (forProd) ? prodPath + '/locality' : ''
}
