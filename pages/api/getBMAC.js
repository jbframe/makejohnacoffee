import neo4j from 'neo4j-driver'
import axios from 'axios'

const neo4jUri = 'bolt://3.140.0.95:7687'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', process.env.DB_AUTH)
)

export default function getBMAC(req, res) {
  const BMAC = async (queryString) => {
        let result = axios(req.body.url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.API_TOKEN}`,
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