import neo4j from 'neo4j-driver'
import Config  from './../../config.js'
import axios from 'axios'

const neo4jUri = 'neo4j://3.140.0.95:7687'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', Config.neo4jPassword)
)

export default function getBMAC(req, res) {
  const BMAC = async (queryString) => {
        let result = axios(req.body.url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Config.token}`,
          }
        })
        .then((result)=> {
          let data = result.data.data
          res.status(200).json(data)
        })
        .catch((err)=>{console.log(err)})


  }
  BMAC()


}