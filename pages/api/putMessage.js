import neo4j from 'neo4j-driver'


const neo4jUri = 'bolt://3.140.0.95:7687'
const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic('neo4j', process.env.DB_AUTH)
)


export default function putMesssage(req, res) {

  const params = [req.body.identity]
  console.log(params);

  const putMessage = (params) => {
    const session = driver.session({database: 'neo4j'});

    return session.run('MATCH (n) WHERE ID(n) = $identityParam SET n.displayed = true RETURN n', {identityParam: params[0]})
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
  putMessage(params)


}