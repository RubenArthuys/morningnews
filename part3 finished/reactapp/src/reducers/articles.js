// La fonction reducer accepte 2 paramètres : (le state, et l'action)
export default function(wishList = [], action) {
  // on initialise le state wishList du store avec un tableau vide 

  if(action.type == 'addArticle') {
      var wishListCopy = [ ... wishList]

      var findArticle = false
      
      for(let i=0; i<wishListCopy.length; i++) {
        if(wishListCopy[i].title == action.articleLiked.title) {
          findArticle = true
        }
      }

      if(!findArticle) {
        wishListCopy.push(action.articleLiked)
      }
      
      return wishListCopy

  } else if(action.type == 'deleteArticle') {
      var wishListCopy = [ ... wishList]
      var position = null

      for(let i=0; i<wishListCopy.length; i++) {
        if(wishListCopy[i].title == action.title) {
          position = 1
        }
      }
      if(position != null) {
        wishListCopy.splice(position, 1)
      }
      return wishListCopy

  } else {
      return wishList
  }
}