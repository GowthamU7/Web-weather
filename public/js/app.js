

const weathersearch=document.querySelector('form')
const search=document.querySelector('input')
const msg=document.querySelector('#message')
const ext=document.querySelector('#extra')
weathersearch.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc=search.value
    fetch('/weather?address='+loc).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            msg.textContent=data.error
            ext.textContent="Make sure that u search for an appropriate loacation"
        }
        else{
            msg.textContent="It is "+data.weather+" and "+data.temperature+" out"+" but feels like "+data.feelslike
            ext.textContent="windspeed "+data.wind_speed+" and there is a chance of "+data.precip+"% Rain"+" will that be a good day "+data.is_day
        }
        })
    })
})