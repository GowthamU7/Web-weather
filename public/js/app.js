// console.log("in console")
// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//         console.log(data)
//     })
// })

const weathersearch=document.querySelector('form')
const search=document.querySelector('input')
const msg=document.querySelector('#message')
weathersearch.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc=search.value
    fetch('http://localhost:3000/weather?address='+loc).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            msg.textContent=data.error
        }
        else{
            console.log(data)
            msg.textContent="It is "+data.weather+" and "+data.temperature+" out"+" but feels like "+data.feelslike
            }
        })
    })
})