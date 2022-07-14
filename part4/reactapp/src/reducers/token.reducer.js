export default function tokenReducer(token = ' ', action) {

  if(action.type === 'addToken') {
    
      let tokenCopy = token + action.token

      return tokenCopy

  } else {
    
      return token;
  }
}