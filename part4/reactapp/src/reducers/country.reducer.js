export default function countryReducer(country = '', action) {

  if(action.type === 'changeToEnglish') {
    
      let newCountry = action.countryChange
      return newCountry

  } else if(action.type === 'changeToFrench'){
      
    let newCountry = action.countryChange
      return newCountry

  } else {
    return country
  }
}