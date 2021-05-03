

const weathersearch=document.querySelector('form')
const search=document.querySelector('input')
const msg=document.querySelector('#message')
const ext=document.querySelector('#extra')
const sim=document.querySelector("#similar")
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
            console.log(data.similar_search)
            msg.textContent="It is "+data.weather+" and "+data.temperature+" out"+" but feels like "+data.feelslike
            ext.textContent="windspeed "+data.wind_speed+" and there is a chance of "+data.precip+"% Rain"+" will that be a good day "+data.is_day
            if(data.similar_search.length>1){
                var se=""
                for(var i=0;i<data.similar_search.length;i++){
                    var p=document.createElement("p")
                    p.textContent =data.similar_search[i]
                    document.getElementById("rv").appendChild(p)
                }
            }
            else{
                var p=document.createElement("p")
                p.innerHTML="No Relevent Locations Found"
                document.getElementById("rv").appendChild(p)
            }
        }
        })
    })
})