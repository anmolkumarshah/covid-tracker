var canvas1 = document.querySelector('#mychart1');
var ctx1 = canvas1.getContext('2d');

var canvas2 = document.querySelector('#mychart2');
var ctx2 = canvas2.getContext('2d');

navigator.geolocation.getCurrentPosition(resolve, reject);

function resolve(event){
    let lat = event.coords.latitude;
    let lon = event.coords.longitude;
    getLocation(lat, lon);
}

function reject(){
    console.log('Location not found')
}

async function getLocation(latitude, longitude){
        let result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=657bfb1a1f124b378f84858776f26a60`);

        let data = await result.json();


        let country = data.results[0].components.country;
        let state = data.results[0].components.state;
        let district = data.results[0].components.state_district;
    
        str = district;
        s = str.split(/(?<=^\S+)\s/)
        district = s[0];
    
        getInfo(state, district);
        getZone(district);
//        getMore(district);
}

function more(active, deceased, confirmed, recovered){
    document.querySelector('#active').innerHTML = active;
    document.querySelector('#decreased').innerHTML = deceased;
    document.querySelector('#confirmed').innerHTML = confirmed;
    document.querySelector('#recovered').innerHTML = recovered;
    
    document.querySelector('.current').style.display = "block";
}

function show(DataAr){
    let active = [];
    let dateAr = [];
    let deceased = [];
    let confirmed = [];
    let recovered = [];
    
    DataAr.forEach(item => active.push(item.active));
    DataAr.forEach(item => dateAr.push(item.date));
    DataAr.forEach(item => deceased.push(item.deceased));
    DataAr.forEach(item => confirmed.push(item.confirmed));
    DataAr.forEach(item => recovered.push(item.recovered));
    
    console.log(active, dateAr, deceased, confirmed, recovered);
    
    display1(active, dateAr, deceased, confirmed, recovered);
    display2(active, dateAr, deceased, confirmed, recovered);
    more(active[active.length - 1], deceased[active.length - 1],confirmed[active.length - 1],recovered[active.length - 1])
}

async function getZone(district){
    let data = await fetch('https://cors-anywhere.herokuapp.com/https://api.covid19india.org/zones.json');
    let result = await data.json();
    console.log(result.zones)
    result.zones.forEach((item) => {
        if(item.district === district){
            document.querySelector('.show-zone').innerHTML = `${district} is in ${item.zone} zone`;
            document.querySelector('.show-zone').style.backgroundColor = `${item.zone}`;
            document.querySelector('.show-zone').style.display = 'block';
        }
    })
    
}




async function getInfo(state, district){
        
        document.querySelector('.show-location').innerHTML = `You are currently in ${state} and in ${district} district`;
        document.querySelector('.show-location').style.display = 'block';
        let result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.covid19india.org/districts_daily.json`);

        let data = await result.json();
  
        let listStates = Object.keys(data.districtsDaily);
        let listDistrict = Object.keys(data.districtsDaily[state]);        
        
        str = district;
        s = str.split(/(?<=^\S+)\s/)
        district = s[0];
    
        addState(listStates);
//        adddistrict(listDistrict);  
    
        let DataAr = data.districtsDaily[state][district];
        console.log(DataAr)
        
        document.querySelector('#auto').addEventListener('click', show(DataAr));    
    }

/********************************************************************************/
/* ADD STATE */

async function addState(arr){
    let html = '<option value="%value%">%value%</option>';
    for(let i=0; i<arr.length; i++){
       let newhtml = html.replace('%value%', arr[i]); 
       newhtml = newhtml.replace('%value%', arr[i]);
       document.querySelector('#state').insertAdjacentHTML('beforeend', newhtml);  
    }   
}
/********************************************************************************/


let inputState = document.querySelector('#state');
async function temp(){
    let result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.covid19india.org/districts_daily.json`);

        let data = await result.json();
        let listDistrict = Object.keys(data.districtsDaily[inputState.value]);
        adddistrict(listDistrict)
}

inputState.addEventListener('input',temp)

/********************************************************************************/
/* ADD DISTRICT */
async function adddistrict(arr){
    let html = '<option  class="option" value="%value%">%value%</option>';
    for(let i=0; i<arr.length; i++){
       let newhtml = html.replace('%value%', arr[i]); 
       newhtml = newhtml.replace('%value%', arr[i]);
       document.querySelector('#dist').insertAdjacentHTML('beforeend', newhtml);  
    }   
}

/********************************************************************************/


document.querySelector('#submit').addEventListener('click', function(){
    if(document.querySelector('#state').value !== 'Choose..' && document.querySelector('#dist').value !== 'Choose..')
        getInfo(document.querySelector('#state').value,document.querySelector('#dist').value);
        getZone(document.querySelector('#dist').value);
})



function display1(active, dateAr, deceased, confirmed, recovered){
    
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 10;
//Chart.defaults.global.defaultFontColor = 'Black';
    
        let covid1 = new Chart(ctx1, {
        type : 'line',
        data : {
            labels : dateAr,
            datasets : [
                {
                label : 'Active',
                data : active,
                backgroundColor : '',
                borderWidth : 1,
                borderColor : 'black',
                hoverBorderWidth : 3,
                hoverBorderColor : 'black',
                order: 1,
                },                 
                ],
        },
        options : {
            title : {
                display : true, 
                text : `Trend of Active Covid Patients`,
                fontSize : 25,

            },
            legend : {
                position : 'right',
            }
        },
    })
}

function display2(active, dateAr, deceased, confirmed, recovered){
/*    
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = 'Black';*/
    
        let covid2 = new Chart(ctx2, {
        type : 'line',
        data : {
            labels : dateAr,
            datasets : [
                {
                    label : 'recovered',
                    data : recovered,
                    backgroundColor : '',
                    borderWidth : 1,
                    borderColor : 'black',
                    hoverBorderWidth : 1,
                    hoverBorderColor : 'black',
                    order: 4,
                }
                
                ],
        },
        options : {
            title : {
                display : true, 
                text : `Trend of Recovered Covid Patients`,
                fontSize : 25,

            },
            legend : {
                position : 'right',
            }
        },
    })
}



/*
document.querySelector('#auto').addEventListener('click',function(){
      canvas.style.display = 'block';                                           
});
*/


















