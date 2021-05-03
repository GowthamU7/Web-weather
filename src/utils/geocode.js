const rq=require("request")

const geocode=(add,callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+add+'.json?access_token=pk.eyJ1IjoiZ293dGhhbW1kYiIsImEiOiJja28zcmZiczMxYzd0MnFwZ3YweTFpcGJjIn0.AIIjeDv7buOa9xK4u3uCSA&limit=3'
    rq({url:geourl,json:true},(error,res)=>{
        if(error){
            callback('unable to connect to location')
        }else if(res.body.features.length==0){
            callback("unable to find location try an another search")
        }
        else{
            const l=res.body.features.length
            const areas=[]
            for(var i=0;i<l;i++){
                areas.push(res.body.features[i].place_name)
            }

            callback(undefined,[
            res.body.features[0].center[0],res.body.features[0].center[1],res.body.features[0].place_name,areas
            ])
        }
    })
}

module.exports={
    geocode:geocode
}
