import neo4j from 'neo4j-driver'
import Config  from './../../config.js'


const neo4jUri = 'bolt://3.140.0.95:7687'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', Config.neo4jPassword)
)


export default function postMesssage(req, res) {

  const params = [req.body.email, req.body.message, req.body.source]
  console.log(params);

  const postMessages = (params) => {
    const session = driver.session({database: 'neo4j'});

    return session.run('CREATE (:Message {message: $messageParam, email: $emailParam, source: $sourceParam, displayed: false,timestamp: datetime()})', {messageParam: params[0], emailParam: params[1], sourceParam: params[2]})
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
  postMessages(params)


}