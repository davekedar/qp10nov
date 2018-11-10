import PayPal from 'react-native-paypal-wrapper';
 
// 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
PayPal.initialize(PayPal.NO_NETWORK, "<your-client-id>");
PayPal.pay({
  price: '40.70',
  currency: 'INR',
  description: 'Your description goes here',
}).then(confirm => console.log(confirm))
  .catch(error => console.log(error));