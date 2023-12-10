const axios = require('axios');
const fs = require('fs');

const getChainsdata = async () => {
  const {data} = await axios.get('http://localhost:8080/api/' + 'chains')
  console.log("chains data", data)
  const jsonString = JSON.stringify(data, null, 2);

    // Write the JSON string to a file
    fs.writeFile('chains.json', jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Data written to chains.json');
      }
    });
}
getChainsdata()