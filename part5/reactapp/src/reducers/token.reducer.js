export default function tokenReducer(token = ' ', action) {

  if(action.type === 'addToken') {
    
      return action.myToken

  } else {
    
      return token;
  }
}