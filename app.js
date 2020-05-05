let canvas = document.querySelector('#mychart');
let ctx = canvas.getContext('2d');

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = 'Black';

let massPopChart = new Chart(ctx, {
    type : 'line',
    data : {
        labels : ['Thane', 'Pune', 'Nashik', 'Nagpur', 'Chandrapur'],
        datasets : [{
            label : 'population',
            data : [11060148, 9429408, 6107187, 4653570, 2204307],
            /*backgroundColor : 'green',*/
            backgroundColor : ['blue', 'red', 'gold', "silver", 'green'],
            borderWidth : 1,
            borderColor : 'black',
            hoverBorderWidth : 4,
            hoverBorderColor : 'black',
        }],
    },
    options : {
        title : {
            display : true, 
            text : 'Largest District in Maharashtra',
            fontSize : 25,
            
        },
        legend : {
            position : 'right',
        }
    },
})









