import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import {Link} from 'react-router-dom'

function ScreenSource() {

  //// Load main articles from API ////
  const [sourceList, setSourceList] = useState([])

  useEffect(() => {

    async function loadAPISources() {
      const request = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=c25e3e4bf2a14dc2bfdcb8500e0154e4')
      const articles = await request.json()
      setSourceList(articles.sources)
      console.log(articles.sources)

    }
    loadAPISources()

  }, [])

  // const data = [
  //   {
  //     title: 'Ant Design Title 1',
  //   },
  //   {
  //     title: 'Ant Design Title 2',
  //   },
  //   {
  //     title: 'Ant Design Title 3',
  //   },
  //   {
  //     title: 'Ant Design Title 4',
  //   },
  // ];

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="HomeThemes">
        <List itemLayout="horizontal" dataSource={sourceList}
          renderItem={source => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={"/images/"+source.category+".png"}/>}
                // title={<Link to={"/screenarticlesbysource"}>{source.name}</Link>}
                title={<Link to={"/screenarticlesbysource/"+source.id}>{source.name}</Link>}
                description={source.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
export default ScreenSource;
