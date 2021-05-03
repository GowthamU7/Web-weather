

const weathersearch=document.querySelector('form')
const search=document.querySelector('input')
const msg=document.querySelector('#message')
const ext=document.querySelector('#extra')
const sim=document.querySelector("#similar")
var x=0
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
            for(var j=x-1;j>-1;j--){
                var ele=document.getElementById("ul")
                ele.removeChild(ele.childNodes[j])
            }
            console.log(data.similar_search)
            msg.textContent="It is "+data.weather+" and "+data.temperature+" out"+" but feels like "+data.feelslike
            ext.textContent="windspeed "+data.wind_speed+" and there is a chance of "+data.precip+"% Rain"+" will that be a good day "+data.is_day
            if(data.similar_search.length>1){
                var se=""
                for(var i=0;i<data.similar_search.length;i++){
                    var p=document.createElement("li")
                    p.textContent =data.similar_search[i]
                    document.getElementById("ul").appendChild(p)
                }
            }
            else{
                var p=document.createElement("li")
                p.innerHTML="-------------------------"
                document.getElementById("ul").appendChild(p)
            }
            x=data.similar_search.length
        }
        })
    })
})