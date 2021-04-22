import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Axios from 'axios';
import Link from 'next/link'


export default function Home() {
  const [msgQueue, setMsgQueue] = useState([]);
  const getMsg = ()=> {
    Axios.get('/api/getMessages/')
    .then((res)=> {
      console.log(res.data.records);
      setMsgQueue(res.data.records)
      setApiFetch(false);
    })
    .catch((err)=>console.log(err))
  }

  useEffect(()=> {
    getMsg()
  }, [])

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [tayTay, setTayTay] = useState('')


  const putMsg = (identity)=> {
    Axios.put('/api/putMessage', {
      displayed: 'true',
      identity: identity
    })
    .then((res)=>{
      console.log(res.data)
      getMsg()
    })
    .catch((err)=>console.log(err))
  }


  const onSubmit = (e)=> {
    e.preventDefault();
    if (msgQueue.length > 0) {
      console.log(msgQueue[0]._fields[0].properties.email)
    setEmail(msgQueue[0]._fields[0].properties.email);
    setMessage(msgQueue[0]._fields[0].properties.message);
    setTayTay('')
    putMsg(msgQueue[0]._fields[0].identity.low);
    } else {
      Axios.get('https://api.taylor.rest/')
      .then((res)=>{
        setEmail('')
        setMessage(`You have no messages but here is a quote from Taylor Swift.`)
        setTayTay(res.data .quote)
        getMsg()

        console.log(res.data)
      })
      .catch((err)=>console.log(err))

    }
  }




  return (
    <div className="container">
      <Head>
        <title>Coffee Machine</title>
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>

      <main>
        <form className="form">
          <button onClick={onSubmit}>Show MSG for this ☕️</button>
          <div>Email:</div>
          <div>{email}</div>
          <div>Message:</div>
          <div>{message}</div>
          <div>{tayTay}</div>

        </form>
     </main>

      <footer >





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

        div {
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
