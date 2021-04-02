import neo4j from 'neo4j-driver'
import Config  from './../../config.js'
import axios from 'axios'

const neo4jUri = 'neo4j://localhost'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', Config.neo4jPassword)
)


export default function getBMAC(req, res) {
  console.log(req.body)
  let result = axios(req.body.url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${Config.token}`,
    }
  })
  .then((result)=>res.status(200).json(result.data))
  .catch((err)=>{console.log(err)})





  // const searchMessages = (params) => {
  //   const session = driver.session({database: 'neo4j'});

  //   return session.readTransaction((tx) =>
  //       tx.run('CREATE (n:Message {message: "hi" })')
  //     )
  //     .then(result => {


  //       res.status(200).json(result);
  //     })
  //     .catch(error => {
  //       throw error;
  //     })
  //     .finally(() => {
  //       return session.close();
  //     });
  // }
  // searchMessages(params)


}