import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


function ScreenSource(props) { 
  // on passe les props de mapDispatchToProps (écriture dans store) & mapStateToProps (lecture du store).

  //// Load main articles from API ////
  const [sourceList, setSourceList] = useState([])
  
  useEffect(() => {

    async function loadAPISources() {

      const request = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=f5ac6b785031436a835bce1f09dbc88e&country='+ props.selectCountry) 
                                           
      const articles = await request.json()
     
      setSourceList(articles.sources)
      // console.log(articles.sources)
    }
    loadAPISources()
    
  }, [props.selectCountry])


  //// Load articles from MongoDB //// À réparer
  useEffect(() => {

    async function loadArticles() {
      
      const request = await fetch('/wishList/'+ props.myToken)
      const body = await request.json()

      if(body.loadArticles) {
        props.importArticles(body.loadArticles)
      }
    }
    loadArticles()
  }, [])


  return (
    <div>
      <Nav />
      <div className="Banner" style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Avatar src={"./images/uk.png"} alt="british flag" onClick={() => props.changeToEnglish()}
                  style={{marginRight: 10}}/>
          <Avatar src={"./images/fr.png"} alt="british flag" onClick={() => props.changeToFrench()}/>
                                                
      </div>

      <div className="HomeThemes">
       
        <List itemLayout="horizontal" 
              dataSource={sourceList}
              renderItem={source => (
                <List.Item>
                  <List.Item.Meta
                    avatar={ <Avatar src={source.urlToImage}/> }
                    title={ <Link to={"/screenarticlesbysource/"+source.id}>{source.name}</Link> }
                    description={source.description}
                  />
                </List.Item>
              )}
        />

      </div>
    </div>
  );
}


function mapStateToProps(state) { 
  return { selectCountry : state.country, myToken : state.token }
}

function mapDispatchToProps(dispatch) { 
  return {
    changeToEnglish: function() { // changeToEnglish = props = propriété = key
      dispatch({ type : 'changeToEnglish', countryChange : 'gb' }) // dispatch = action = value
    },
    changeToFrench: function() {
      dispatch({ type : 'changeToFrench', countryChange : 'fr' })
    },
    importArticles: function (articles) {
      dispatch({ type: 'importArticles', articles })
    }
  }
}


export default connect( // pour connecter les fonctions redux et le composant ScreenSource
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)
