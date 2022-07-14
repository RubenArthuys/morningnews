export default function countryReducer(country = 'gb', action) {

  if(action.type === 'changeCountry') {
    
      let newCountry = country.slice() // copy of country
      newCountry = action.countryChange // rewrite country
      return newCountry

  } else {
      return country;
  }
}