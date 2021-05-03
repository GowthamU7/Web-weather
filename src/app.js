const ep=require("express")
const pt=require("path")
const hbs=require('hbs')
const app=ep()
const geocode=require('./utils/geocode')
const getloc=require('./utils/forecast')
// define paths for express config
const public_path=pt.join(__dirname,'../public')
const viewspath=pt.join(__dirname,'../templates/views')
const partialspath=pt.join(__dirname,'../templates/partials')

// setup handlebars for view engune
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setting up staic directory

app.use(ep.static(public_path))
const port=process.env.PORT || 3000



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide seach term'
        })
    }
    geocode.geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error
            })
        }
        getloc.getloc(data[1],data[0],(error,fsdata)=>{
            if(error){return res.send({error:error})}
            console.log(data[3])
            res.send({
                weather:fsdata[0],
                temperature:fsdata[1]+" degrees",
                feelslike:fsdata[2]+" degrees",
                latitude:data[1],
                logitude:data[0],
                location:data[2],
                wind_speed:fsdata[3],
                precip:fsdata[4],
                is_day:fsdata[5],
                similar_search:data[3]

            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide seach term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather app",
        name:"gowtham"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        get:"help",
        show:"weather"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"weather app",
        help:"how may i help you"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:"help article not found"
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        message:"404 my page error"
    })
})


app.listen(port,()=>{
    console.log(`listening on... ${port}`)})
