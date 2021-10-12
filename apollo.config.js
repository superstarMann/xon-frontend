module.exports = {
    client: {
      includes:['./src/**/*.{tsx,ts}'], //띄어쓰기 금지
      tag:"gql",
      service:{
          name:'xon-backend',
          url: 'http://localhost:5000/graphql'
      }
    }
  };