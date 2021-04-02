import neo4j from 'neo4j-driver'
import Config  from './../../config.js'
import axios from 'axios'
import fetch from 'node-fetch'

const neo4jUri = 'neo4j://localhost'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', Config.neo4jPassword)
)


export default function postMesssage(req, res) {

  const params = [req.body.email, req.body.message]
  console.log(params);

  const searchMessages = (params) => {
    const session = driver.session({database: 'neo4j'});

    return session.run(`
    CREATE (n:Message {message: $messageParam, email: $emailParam})
    SET n.created = nProperties.created
    `, {messageParam: params[0], emailParam: params[1]})
    .then(result => {
      console.log(result)
      res.status(200).json(result);
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      return session.close();
    });
  }
  searchMessages(params)


}