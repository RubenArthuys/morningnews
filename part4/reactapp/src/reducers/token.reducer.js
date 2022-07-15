export default function tokenReducer(token = ' ', action) {

  if(action.type === 'addToken') {
    
      return action.token

  } else {
    
      return token;
  }
}