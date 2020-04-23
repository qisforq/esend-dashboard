const fs = require('fs');
const path = require('path');

module.exports = async function readSSLCert() {
  const certPath = path.join(__dirname, '../../ripple-root-ca.crt')
  try {
    const caCert = await fs.readFileSync(certPath);
    return caCert;
  }
  catch(e) {
    console.log('Error reading the CA cert file', e)
  }
}