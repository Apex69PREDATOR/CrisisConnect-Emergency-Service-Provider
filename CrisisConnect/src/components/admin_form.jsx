import React,{ useContext ,useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import './admin_form.css'
import CoordContext from '../context/coordinates/coordsContext'
import ServiceContext from '../context/service/serviceRoute'
const Admin_form = (title) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState:{errors,isSubmitting}
  } =useForm()
    const [Hide,setHide]=useState(false)
    const [nav,navfound]=useState(false)
    const [result,setResult]=useState(null)
    const [topplace,setTopplace]=useState(null)
    const delay=async(time)=>{
       await new Promise((resolve,reject)=>{
        setTimeout(()=>{
           resolve(1)
        },time * 1000)
       })
    }
    function top_places(data,result){
      let min=100000,smin=100000,tmin=100000,temp,temp2,arr=[],value,tempobj,tempobj2
       result.forEach((val)=>{
        value=Math.abs(Math.abs(val.lat)-Math.abs(data.latitude) + Math.abs(val.lon)-Math.abs(data.longitude))
        if(value<min ){
          temp=min
          tempobj=arr[0]
          min=value
          arr[0]=val
          temp2=smin
          tempobj2=arr[1]
          smin=temp
          arr[1]=tempobj
          tmin=temp2
          arr[2]=tempobj2
        }
        else if(value>min && value<smin ){
          temp=smin
          tempobj=arr[1]
          smin=value
          arr[1]=val
          tmin=temp
          arr[2]=tempobj  
        }

        else if(value>smin && value<tmin ){
          tmin=value
          arr[2]=val
        }
       })
       setTopplace(arr)
    }
    const findPlaces=async (data)=>{
      try{
      let obj={lat:data.latitude,lng:data.longitude,type:service}
        let res=await fetch("http://localhost:5000/find_keyplaces",{method:"POST",headers:{
          'Content-Type': 'application/json'
      },body:JSON.stringify(obj)})
      let r=await res.json()
      await delay(3)
      setHide(true)
      setResult(r)
      navfound(true)
      console.log(r)
      top_places(data,r)
    }
    catch(error){
      console.log(error)
    }
    }
    const coordinate=useContext(CoordContext)
    const service=useContext(ServiceContext)
   useEffect(()=>{
    if(coordinate){
      setValue('latitude',coordinate.lat)
      setValue('longitude',coordinate.lng)
    }
    else{
      setValue('latitude','cant get latitude')
      setValue('longitude','cant get longitude')
    }
   },[])
  return (
    <>
    {isSubmitting && <div class='planet-container'>
    <div class='night'></div>
    <div class='day'></div>
    <div class='clouds'></div>
    <div class='inner-shadow'></div>
</div>}
    {!Hide && (<form action="" className='Searching' onSubmit={handleSubmit(findPlaces)}>
        <label htmlFor="latitude">Latitude:</label>
        <input type="text" {...register("latitude",{required:true})} placeholder={"latitude"}/>
        <label htmlFor="longitude">Longitude:</label>
        <input type="text" {...register("longitude",{required:true})} placeholder={'longitude'}/>
        <input type="submit" disabled={isSubmitting} value={"submit"}/>
    </form>)}
    {Hide && result ?(<><span className='hide' > Click the links to open map</span>
    <div className='resultcontainer'>
      <table className='list-res'>
        <thead>
          <tr>
            <th>Name</th>
            <th>HouseNumber</th>
            <th className='post'>Postcode</th>
            <th>Street</th>
            <th className='link'>Map</th>
          </tr>
        </thead>
        <tbody>
    {result.map((val)=>{
     return <tr key={val.id}>
        <td >{val.tags.name}</td>
        <td >{val.tags['addr:housenumber']?val.tags['addr:housenumber']:'NA'}</td> 
        <td className='post'>{val.tags['addr:postcode']?val.tags['addr:postcode']:'NA'}</td>
        <td>{val.tags['addr:street']?val.tags['addr:street']:'NA' }</td>
        <td className='link'><span><a className='no-underline' href={nav?`https://www.google.com/maps/@${val.lat},${val.lon},15z?entry=ttu`:'#'} id='mapsr' target={'_blank'}>{nav?'click here':'submit to get link'}</a>
  </span></td>
      </tr>
    })}
    </tbody>
     </table>
    </div>
    </>):<span className='hide' >Submit to get results</span>
    }
    {topplace && (
      <>
      <h3 className='h-near'>
        Nearest Places
      </h3>
    <div className='con-suggplace'>
       {topplace.map((val)=>{
        if(val!==undefined){
        return <div className="result" key={val.id}>
        <div className="name">name : {val.tags.name}</div>
        <div className="address">address : {val.tags.name}, {val.tags['addr:housenumber']?val.tags['addr:housenumber']:'NA'}, {val.tags['addr:postcode']?val.tags['addr:postcode']:'NA'}, {val.tags['addr:street']?val.tags['addr:street']:'NA' }</div>
        <button className='m-link'><a className='no-underline' href={nav?`https://www.google.com/maps/@${val.lat},${val.lon},15z?entry=ttu`:'#'} id='mapsr' target={'_blank'}>{nav?'click here':'submit to get link'}</a>
  </button>
      </div>
        }
       })}
    </div></>)}
    </>
  )
}

export default Admin_form
