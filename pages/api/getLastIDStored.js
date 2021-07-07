import neo4j from 'neo4j-driver'
import axios from 'axios'

const neo4jUri = 'bolt://3.140.0.95:7687'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', process.env.DB_AUTH)
)

export default function getLastIDStored(req, res) {
  const getLastIDStored = async (queryString) => {
    const session = driver.session({database: 'neo4j'});
    return session.readTransaction((tx) =>
        tx.run('MATCH (n:Message) RETURN n.support_id ORDER BY n.support_id LIMIT 1')
      )
      .then(result => {

        res.status(200).json(result.records)
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        return session.close();
      });
  }
  getLastIDStored()


}