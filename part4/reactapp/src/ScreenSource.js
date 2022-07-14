import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


function ScreenSource(props) {

  //// Load main articles from API ////
  const [sourceList, setSourceList] = useState([])
  
  useEffect(() => {

    async function loadAPISources() {

      var changeCountry = ''
      if(props.selectCountry === 'gb') {
        changeCountry = 'gb'
      } else if (props.selectCountry === 'fr') {
        changeCountry = 'fr'
      }

      const request = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=c25e3e4bf2a14dc2bfdcb8500e0154e4&country='+ changeCountry)
      const articles = await request.json()
     
      setSourceList(articles.sources)
      // console.log(articles.sources)
    }
    loadAPISources()
    
  }, [props.selectCountry])


  return (
    <div>
      <Nav />
      <div className="Banner" style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Avatar src={"./images/uk.png"} alt="british flag" onClick={() => props.changeCountry('gb')}
                  style={{marginRight: 10}}/>
          <Avatar src={"./images/fr.png"} alt="british flag" onClick={() => props.changeCountry('fr')}/>
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
  return { selectCountry : state.country }
}

function mapDispatchToProps(dispatch) {
  return {
    changeCountry: function(country) {
      dispatch({ type : 'changeCountry', countryChange : country })
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)
