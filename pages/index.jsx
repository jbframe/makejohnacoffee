import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Axios from 'axios';
import Link from 'next/link'

//tay tay quotes if needed
//https://api.taylor.rest/

export default function Home() {
  const [inputValues, setInputValues] = useState({
    'email':'',
    'message': ''
  });
  const [apiFetch, setApiFetch] = useState(false);
  const [msgQueue, setmsgQueue] = useState([]);

  const getMsg = ()=> {
    Axios.get('/api/getMessages/')
    .then((res)=> {
      console.log(res.data.records);
      setApiFetch(true);
    })
    .catch((err)=>console.log(err))
  }

  const getBMAC = ()=> {
    Axios.post('/api/getBMAC/', {
      'email': inputValues.email,
      'message': inputValues.message,
      'url': 'https://developers.buymeacoffee.com/api/v1/supporters'
    })
    .then((res)=>console.log(res.data))
    .catch((err)=>console.log(err))
  }

  if(!apiFetch) {
    getMsg()
    getBMAC()
  }
  const formSubmit = (e)=> {
    e.preventDefault();
    Axios.post('/api/postMessage/', {
      'email': inputValues.email,
      'message': inputValues.message
    })
    .then((res)=>console.log(res.data))
    .catch((err)=>console.log(err))
  }

  const inputChange = (e)=> {
    setInputValues({...inputValues, [e.target.name]: e.target.value})
  }

  return (
    <div className="container">
      <Head>
        <title>Make John a ☕️</title>
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>

      <main>
        <h1 className="title">
          Make John a ☕️
        </h1>

        <form className="form" onSubmit={formSubmit}>
          <textarea
            name="email"
            type="text"
            rows="1"
            placeholder="Email"
            value={inputValues.email}
            onChange={inputChange}>
          </textarea>
          <textarea
            name="message"
            type="text"
            rows="10"
            placeholder="Message"
            value={inputValues.message}
            onChange={inputChange}>
          </textarea>
          <button>Make ☕️</button>
          </form>
{/*
        <p className="description">
        John's coffee machine will allow him to make 1 coffee for each make ☕️ press
        </p> */}





      </main>

      <footer >
        <div style={{"display": "flex"}}>
              <div><Image src="/LI-In-Bug.png" width="16" height="16" /></div>
              <a href="http://linkedin.com/in/jbframe" >John Frame</a>
              <div><Image src="/LI-In-Bug.png" width="16" height="16" /></div>
        </div>
        <div style={{"display": "flex"}}>
            <div><Image src="/GitHub-Mark-64px.png" width="16" height="16" /></div>
              <a href="https://github.com/jbframe/makejohnacoffee">Checkout the code</a>
              <div><Image src="/GitHub-Mark-64px.png" width="16" height="16" /></div>
        </div>
        <div style={{"display": "flex"}}>
          <div><Image src="/favicon-16x16.webp" width="16" height="16" /></div>
              <a href="https://www.buymeacoffee.com/makejohnacoffee">Make me coffee while supporting code.org</a>
            <div><Image src="/favicon-16x16.webp" width="16" height="16" /></div>
        </div>




      </footer>

      <style jsx>{`
        .container {
          min-height: 50vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .form {
          margin: 1rem;
          padding: 1.5rem;
          color: inherit;
          display: flex;
          flex-direction: column;
          border: 1px solid #eaeaea;
          border-radius: 10px;
        }

        button:hover,
        button:focus,
        button:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        textarea{
          border-radius: 5px;
          margin: 0 0 1rem 0;
          font-size: 1rem;
        }

        button {
          border-radius: 10px;
          background-color: white;
          font-size: 1.25rem;
          border-width: 1px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          color: #0070f3;
          text-decoration: none;
          padding: 0 0.5rem;
        }

        a:hover,
        a:focus,
        a:active {
          text-decoration: underline;
        }




      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
