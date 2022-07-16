const gql = require('graphql-tag');

module.exports = {
    getHighScore: gql`query($walletAddress:String, $id:String, $scoreId:String){
        player(id: $walletAddress) {
            id
            scores(id: $scoreId) {
            score
            }
        }
        }`,
    getSeason: gql` {
        seasons(orderBy: id, orderDirection: desc, firrst: 1) {
    id
   }
}`,
};