import logo from './logo.svg';
import './App.css';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { PayPalButton } from "react-paypal-button-v2";

function App() {
  const onSuccess = (payment) => {
    // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        //lklkoj
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
}

const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log('The payment was cancelled', data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
}

const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
}

let env = 'sandbox'; // you can set here to 'production' for production
let currency = 'USD'; // or you can set this value from your props or state
let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

const client = {
    sandbox:    'YOUR-SANDBOX-APP-ID',
    production: 'YOUR-PRODUCTION-APP-ID',
}
  return (
    <div className="App">
     {/* <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> */}
     <PayPalButton
        amount="1.00"
        currency="CAD"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          console.log('details, datadetails, data',details, data);
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
        // currency="CAD"
        onError={(er,ers)=>{
          console.log('er,ers',er,ers);
        }}
        options={{
          clientId: "Ad6s8ESWuYL9Sd0nMIHApST_Ja62ze3ivhJTUKlUwK0eAdvQI8i8hQtS7LbLmSbWw2I10_J_qE765vye"
        }}
      />
    </div>
  );
}

export default App;
