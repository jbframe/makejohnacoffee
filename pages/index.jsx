import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Axios from 'axios';
import Link from 'next/link'
import { NextSeo } from 'next-seo';

//tay tay quotes if needed
//https://api.taylor.rest/ RIP THIS API IS DEAD

export default function Home() {
  const [inputValues, setInputValues] = useState({
    'email':'',
    'message': '',
    'lastEmail': ''
  });
  const [placeholderValues, setPlaceholderValues] = useState({
    'email':'Email',
    'message': 'Message'
  });

  const [BMAC, setBMAC] = useState([])
  const [lastIDStored, setLastIDStored] = useState([]);
  const [msgSubmitted, setMsgSubmitted] = useState(false);

  //  COFFEE DRINK APIs
  //'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=coffee'
  // https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=[DRINK ID]

  const validateEmail = (email)=> {
      let re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

  const formSubmit = (e)=> {
    e.preventDefault();
    let isEmailValid = validateEmail(inputValues.email);
    if (!msgSubmitted && inputValues.email !== '' && inputValues.message !== '' && isEmailValid) {
      Axios.post('/api/postMessage/', {
        'email': inputValues.email,
        'message': inputValues.message,
        'source': 'client'
      })
      .then((res)=>{
        setPlaceholderValues({'email': 'Message Sent', 'message': 'You will receive an email when this coffee is made for John.'})
        setInputValues({'lastEmail': inputValues.email, 'email': '', 'message': ''})
        setMsgSubmitted(true);
        console.log(res.data);
      })
      .catch((err)=>console.log(err))

    } else if (!msgSubmitted && inputValues.message === '' && inputValues.email === '') {
      setPlaceholderValues({'email': 'You must enter an email', 'message': 'and a message!'})

    } else if (!msgSubmitted && (inputValues.email === '' || !isEmailValid)) {
      setInputValues({...inputValues, 'email': ''})
      setPlaceholderValues({...placeholderValues, 'email': 'You must enter a valid email!'})

    } else if (!msgSubmitted && inputValues.message === '') {
      setPlaceholderValues({...placeholderValues, 'message': 'You must enter a message!'})

    } else if (msgSubmitted) {
      setInputValues({...inputValues, 'email': inputValues.lastEmail, 'message': ''})
      setPlaceholderValues({...placeholderValues, 'message': 'Message'})
      setMsgSubmitted(false);
    }
  }

  const inputChange = (e)=> {

    if (e.target.name === 'email' && e.target.value.split('\n').length > 1) {
      e.preventDefault();
      let singleLineString = e.target.value.split('\n')[0]
      setInputValues({...inputValues, [e.target.name]: singleLineString})
    } else {
    setInputValues({...inputValues, [e.target.name]: e.target.value})
    }


  }

  const conditionalButtonText = ()=> {
    return (
      !msgSubmitted
        ?  <button className="button">Make John's ☕️</button>
        :  <button className="buttonSent">Make John another ☕️?</button>
    )
  }

  return (
    <div className="container">
      <NextSeo
        title="Make John a ☕️"
        description="MAKE John a coffee via the magic of the internet!"
        openGraph={{
          url: 'http://www.makejohnacoffee.com',
          title: 'Make John a ☕️',
          description: 'MAKE John a coffee via the magic of the internet!',
          images: [
            {
              url: 'https://lh3.googleusercontent.com/pw/ACtC-3ehLdNi9RVPczM5wmY6avT20LGbsEIImfGtWSD1fDlIF70PjqFiV_biwuT8aztmT3wnkvW0S4p6zxSHuN6Z8FzJdJzc0YZn-v8_bsxKRTY2VD3dpWeBsTJLYckZFEk-Mj-FS2p-FTVZqiYjzytLdeaPJw=w1200-h627-no?authuser=0',
              width: 1200,
              height: 627,
              alt: 'Make John a ☕️',
            }
          ],
          site_name: 'ake John a ☕️',
        }}
      />
      <Head>
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>

      <main>
        <h1 className="title">
          Make John a ☕️
        </h1>
        <div className="description">
          <div>MAKE John a coffee via the magic of the internet!</div>
          <div>&nbsp;</div>
          <div>Each time you 'Make John a ☕️ ', the MESSAGE you</div>
          <div>leave will be ENQUEUED on John's REAL LIFE internet</div>
          <div>connected COFFEE MACHINE. AND he'll reply over email</div>
          <div>while he drinks the coffee! You get to say hi and</div>
          <div>John gets caffeinated!</div>
        </div>
        <form className="form" onSubmit={formSubmit}>
          <textarea
            name="email"
            type="text"
            rows="1"
            placeholder={placeholderValues.email}
            value={inputValues.email}
            onChange={inputChange}>
          </textarea>
          <textarea
            name="message"
            type="text"
            rows="10"
            placeholder={placeholderValues.message}
            value={inputValues.message}
            onChange={inputChange}>
          </textarea>
          {conditionalButtonText()}
          </form>
{/*
        <p className="description">
        John's coffee machine will allow him to make 1 coffee for each make ☕️ press
        </p> */}

      </main>
  {// const getLastIDStorerd = ()=> {
  //   Axios.get('/api/getLastIDStored/')
  //   .then((res)=> {
  //     console.log(res.data[0]._fields[0].low);
  //     setLastIDStored(res.data[0]._fields[0].low);
  //     setApiFetch(false);
  //     getBMAC()
  //   })
  //   .catch((err)=>console.log(err))
  // }

  // const getBMAC = ()=> {
  //   Axios.post('/api/getBMAC/', {
  //     'email': inputValues.email,
  //     'message': inputValues.message,
  //     'url': 'https://developers.buymeacoffee.com/api/v1/supporters'
  //   })
  //   .then((res)=>{
  //     console.log(res.data)
  //     setBMAC(res.data)
  //     for(let i = 0; i < res.data.length; i++) {
  //       console.log(lastIDStored)
  //       if(res.data[i].support_id > lastIDStored) {
  //         let row = res.data[i];
  //         postBMAC(row.support_visibility, row.payer_email, row.support_note, row.support_id)

  //       } else {
  //         break
  //       }
  //     }
  //     getMsg()
  //   })
  //   .catch((err)=>console.log(err))
  // }

  // const postBMAC = (support_visibility, email, message, support_id)=> {
  //   Axios.post('/api/postBMAC/', {
  //     'email': email,
  //     'message': message,
  //     'source': 'BMAC',
  //     'support_visibility': support_visibility,
  //     'support_id': support_id

  //   })
  //   .then((res)=>console.log(res.data))
  //   .catch((err)=>console.log(err))
  }
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
              <a href="https://www.buymeacoffee.com/makejohnacoffee">Make John coffee while supporting code.org</a>
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
          font-size: 3rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.75;
          font-size: .8rem;
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

        textarea{
          border-radius: 5px;
          margin: 0 0 1rem 0;
          font-size: 1rem;
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

        .button:hover,
        .button:focus,
        .button:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .button {
          border-radius: 10px;
          background-color: white;
          font-size: 1.25rem;
          border-width: 1px;
        }

        .buttonSent {
          border-radius: 10px;
          background-color: white;
          font-size: 1.25rem;
          border-width: 1px;
          color: #0070f3;
          border-color: #0070f3;
        }


        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
