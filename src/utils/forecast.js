const rq=require("request")


const getloc=(dt1,dt2,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=1bb2e327183f343a0ab223f0a39a836c&query='+dt1+","+dt2+'&units=m'
    rq({url:url,json:true},(error,res)=>{
        if(error){
            callback("cannot get the weather information")
        }
        else if(res.body.error){
            callback("unable to find location")
        }
        else{const ct=res.body.current
        callback("",[ct.weather_descriptions[0],ct.temperature,ct.feelslike])
    }
    })
}

module.exports={
    getloc:getloc
}
