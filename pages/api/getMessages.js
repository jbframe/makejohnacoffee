import neo4j from 'neo4j-driver'
import config  from './../../config.js'

const neo4jUri = 'neo4j://localhost'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', config.neo4jPassword)
)


//console.log(`Database running at ${neo4jUri}`)

export default function postMesssages(req, res) {
  //console.log(req.body);

  const searchMessages = async (queryString) => {
    const session = driver.session({database: 'neo4j'});
    return session.readTransaction((tx) =>
        tx.run('MATCH (n:Message) RETURN n LIMIT 25')
      )
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        return session.close();
      });
  }
  searchMessages()


}