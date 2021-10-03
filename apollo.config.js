module.exports = {
    client: {
      includes:['./src/**/*.tsx'],
      tag:"gql",
      service:{
          name:'xon-backend',
          url: 'http://localhost:5000/graphql'
      }
    }
  };