// fetch('http://localhost:3000/weather?address=Troyan').then((res) => {
//     res.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.location);
//             console.log(data.forecastData);
//         }
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const location_output = document.querySelector('#location');
const forecast_output = document.querySelector('#forecast');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;
    
    location_output.textContent = 'Loading...';
    forecast_output.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        if(data.error){
            location_output.textContent = data.error;
        }else{
            location_output.textContent = data.location;
            forecast_output.textContent = data.forecastData;
        }
    })
});
})