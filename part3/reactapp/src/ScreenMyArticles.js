import React, { useState } from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';


const { Meta } = Card;



function ScreenMyArticles(props) {
  // console.log(props)


  //// Modal options from doc + 2 parameters ////
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
  var showModal = (title, content) => {
    setIsModalVisible(true)
    setTitle(title)
    setContent(content)
  }
  var handleOk = e => {
    console.log(e)
    setIsModalVisible(false)
  }
  var handleCancel = e => {
    console.log(e)
    setIsModalVisible(false)
  }
  //////////////////////////////////////////////


  //No articles
  var noArticles;
  if(props.myArticles.length === 0) {
    noArticles = <div>No Articles</div>
  }

  return (
    <div>
      <Nav />
      <div className="Banner" />

      {noArticles}
      
      <div className="Card">

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
                    <Icon type="read" key="ellipsis2" 
                          onClick={() => showModal(article.title, article.content)} />,
           
                    <Icon type="delete" key="ellipsis" 
                          onClick={() => props.deleteFromWishList(article.title)} />]}>

              <Meta title={article.title} description={article.description}/>
            </Card>

            <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <p>{content}</p>
            </Modal>
          </div>

        )}

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  
  return { myArticles : state.wishList }
}

function mapDispatchToProps(dispatch) {

  return {
    deleteFromWishList: function(articleTitle) {
      dispatch({ type : 'deleteArticle', title : articleTitle })
    }
  }}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles)

// export default ScreenMyArticles;