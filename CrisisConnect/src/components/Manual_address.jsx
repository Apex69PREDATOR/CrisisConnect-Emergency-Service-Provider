import React from 'react'
import { useForm } from 'react-hook-form'
import "./Manualaddress.css"
const Manual_address = (title) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = async (data) => {
    data["hservice"] = title.hservice
    let res = await fetch("http://localhost:5000/reqsermanually", {
      method: "POST", headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(data)
    })
    let r = await res.text()
    alert(r)
    hide_page()
  }

  const hide_page = () => {
    let mp = document.querySelector(".manual_address")
    let sheet = document.getElementsByClassName("sheet")[0]
    mp.style.display = "none"
    sheet.style.display = "none"
  }
  return (
    <div className='manual_address'>
      <div className="sheetnav">
        <div className="head">
          Fill in the boxes with correct info
        </div>
        <button className='cancel-address' onClick={hide_page}>X</button>
      </div>
      <form className='sheetform' onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting && <div className='loading top-28'></div>}
        <div className="homediv">
          <h3>
          {title.hservice}
          </h3>
        </div>
        <div className="homediv">
          <label htmlFor="haddress">
            Address:
          </label>
          <input type="text" {...register("haddress", { required: true })} placeholder="Current address" />
        </div>
        <div className="homediv">
          <label htmlFor="hcountry">
            Country:
          </label>
          <select  {...register("hcountry", { required: true })} placeholder="Country">
            <option value="">Country</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Eswatini">Eswatini</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Greece">Greece</option>
            <option value="Grenada">Grenada</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Ivory Coast">Ivory Coast</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
          </select>
        </div>
        <div className="homediv">
          <label htmlFor="hstate">
            State:
          </label>
          <input type="text" {...register("hstate", { required: true })} placeholder="State" />
        </div>
        <div className="homediv">
          <label htmlFor="hcity">
            City:
          </label>
          <input type="text" {...register("hcity", { required: true })} placeholder="Current city" />
        </div>
        <div className="homediv">
          <label htmlFor="hpin">
            Pin-code:
          </label>
          <input type="number" {...register("hpin", { required: true })} placeholder="Pincode" />
        </div>
        <div className="homediv">
          <label htmlFor="hdistrict">
            District:
          </label>
          <input type="text" {...register("hdistrict", { required: true })} placeholder="District" />
        </div>
        <div className="butons">
          <button disabled={isSubmitting} type='submit' style={{position:'relative',bottom:'3vh'}}>Confirm</button>
        </div>
      </form>
    </div>
  )
}

export default Manual_address
