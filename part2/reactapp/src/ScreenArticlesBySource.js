import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'
import { useParams } from 'react-router-dom';

const { Meta } = Card;

function ScreenArticlesBySource() {

  const [articleList, setArticleList] = useState([])
  const { id } = useParams();
  // https://www.geeksforgeeks.org/reactjs-useparams-hook/
  // The useParams hook returns an object of key/value pairs, of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.

  //// Load article details ////
  useEffect(() => {

    async function loadArticleDetails() {

      const request = await fetch("https://newsapi.org/v2/top-headlines?sources="+id+"&apiKey=b32c8b844d1243b1a7998d8228910f50")
      const articleDetails = await request.json()

      setArticleList(articleDetails.articles)
      // console.log(articleDetails)
    }
    loadArticleDetails()

  }, [])


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

  return (

    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
     
      {articleList.map((article, i) => (

          <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
            
            <Card style={{width: 300, margin: '15px', display: 'flex', 
                          flexDirection: 'column', justifyContent: 'space-between'}}
                  cover={<img alt="example" src={article.urlToImage}/>}
                  actions={[
                    <Icon type="read" key="ellipsis2" 
                          onClick={() => showModal(article.title, article.content)} />, 
                    <Icon type="like" key="ellipsis" />]}>
              <Meta title={article.title} description={article.description}/>
            </Card>

            <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <p>{content}</p>
            </Modal>
          </div>

      ))}

      </div>
    </div>
  );
}
export default ScreenArticlesBySource;
