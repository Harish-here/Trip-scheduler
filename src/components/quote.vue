<template>
    <div id='quote'>
        <div v-if='(listData != null && listData.length > 0)'>
            <div v-for='i in listData[0].events' :key='i.id' class='fl w100'>
                <h4>{{i.place}}<small> - {{i.title}}</small></h4>
                <div v-if='(i.quotes != undefined) && (i.quotes.length != 0)'>
                    <div  class='quote' v-for='j in i.quotes' :key='j.hotelId'>
                        <div  data-toggle='collapse' :data-target="'#demo'+j.hotelId"  class='heading'>
                            {{j.hotelName}}
                            <span class='fr' style='color:#1a936f'>₹ {{j.budget}}</span>
                        </div>
                        <div :id="'demo'+j.hotelId" class='collapse f12' >
                        
                                <div class='fl w100 p2-4'>
                                     <i>Additional Featutre than Limit</i>
                                </div>
                                <div class='fl w60 p2-4'>
                                    <ul class='list-inline'>
                                        <li class='list-inline-item'><i class="fa fa-circle bl" aria-hidden="true"></i> Cab service</li>
                                        <li class='list-inline-item'><i class="fa fa-circle bl" aria-hidden="true"></i> Free Breakfast</li>
                                    </ul>
                                </div>
                                <div class='fl w40'>
                                    <ul class='fr'>
                                        <li class='fl w50 p2-4'><button class='btn btn-success btn-xs br10'>Accept</button></li>
                                        <li class='fl w50 p2-4'><button class='btn btn-danger btn-xs br10'>Cancel</button></li>
                                    </ul>
                                </div>
                        
                        </div>
                    </div>
                </div>
                <div class='fl w100 center b6 gray' v-else>
                  Oops ! No Quotes Recieved for this place...
                </div>
            </div> 
        </div> 
        <div class='fl w100 center gray b6 p5-10' v-else>
                click a city to view the quotes
        </div>   
    </div>
</template>

<script>

export default {
    name:'quote',
    props : ['listData'],
    data(){
        return {
            listDatas : this.listData
        }
    }
}

</script>

<style scoped>
.heading{
    padding:5px 10px;
    background-color:#efefef;
    font-weight:bold;
    color : #114b5f;
    border-radius : 2px;        
}
.quote{
    margin : 5px;
    display : block;
    position : relative;
}
.bl{
    color : #ADD8E6;
}
.br10{
    border-radius : 10px 10px;
}
#quoteLabel{
    font-size : 16px;
    color : #ddd;
    font-weight:bold;
    padding:5px;
    display:inline-block;
    position: absolute;
    left: 35%;
    transform: translateX(-30%);
}
.overFl{
    height : 95vh;
    overflow-y : auto;
}
.f12{
    font-size:12px;
}
</style>