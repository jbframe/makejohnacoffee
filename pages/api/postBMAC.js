import neo4j from 'neo4j-driver'
import Config  from './../../config.js'
import axios from 'axios'

const neo4jUri = 'neo4j://3.140.0.95:7687'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', Config.neo4jPassword)
)

export default function postBMAC(req, res) {
  console.log(req.body)

    // const params = [req.body.email, req.body.message, req.body.source, req.body.support_id, req.body.support_visibility]



    // console.log(1, params);

    // const postMessages = (params) => {
    //   const session = driver.session({database: 'neo4j'});

    //   return session.run('CREATE (:Message {message: $messageParam, email: $emailParam, source: $sourceParam, displayed: false, support_id: $support_idParam, support_visibility: $support_visibilityParam, timestamp: datetime()})', {messageParam: params[1], emailParam: params[0], sourceParam: params[2], support_idParam: params[3], support_visibilityParam: params[4]})
    //   .then(result => {
    //     console.log(result)
    //     res.status(200).json(result);
    //   })
    //   .catch(error => {
    //     throw error;
    //   })
    //   .finally(() => {

    //   });
    // }
    // postBMAC(params)


}