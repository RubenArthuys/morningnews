import React from 'react';
import './App.css';
import { Card, Icon } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';


const { Meta } = Card;


function ScreenMyArticles(props) {
  // console.log(props)


  //// Delete from store & BDD ////
  var deleteArticles = async function(article) {

    props.deleteFromWishList(article.title)

    await fetch('/wishList', {
      method : 'DELETE',
      headers : {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `tokenFromFront=${props.myToken}&titleFromFront=${article.title}`
    })
  }


  //// No articles ////
  var noArticles;
  if(props.myArticles.length === 0) {
    noArticles = <div style={{ marginTop: "30px"}} >No Articles</div>
  }

  return (
    <div>
      <Nav />
      <div className="Banner" />

      <div className="Card">

        {noArticles}

        {props.myArticles.map((article, i) => 
          // {console.log(article)}

          <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
            
            <Card style={{
                  width: 300, 
                  margin: '15px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between'}}
                  cover={<img alt="example" src={article.urlToImage}/>}
                  actions={[
                    <Icon type="read" key="ellipsis2" />,
                    <Icon type="delete" key="ellipsis" 
                          onClick={() => deleteArticles(article)} />]}>

              <Meta title={article.title} description={article.description}/>
            </Card>

          </div>

        )}

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  
  return { myArticles : state.wishList, myToken : state.token }
}

function mapDispatchToProps(dispatch) {

  return {
    deleteFromWishList: function(articleTitle) {
      dispatch({ 
        type : 'deleteArticle', 
        title : articleTitle 
      })
    }
  }}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles)

// export default ScreenMyArticles;