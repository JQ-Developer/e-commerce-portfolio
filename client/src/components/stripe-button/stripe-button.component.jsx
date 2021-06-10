import StripeCheckout from "react-stripe-checkout";

//Axios for http request
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Iw7TjE81Eigk9fneof6AMQSjHwNKV0t9b6UP91v4U0rcyQM5lwRN0ZwvzSoOfBG1TSTGZvp64m4SONuYin5SkFP00awwgMQb4";

  //El token es lo que se pasa al backend para que procese el pago, pero como no estamos trabajando con backend aquí, solo alertaremos que se hizo efectivo el pago con una alerta, a modo de ejmplo claro está.
  //Tambien consoleamos lo que sea que es el token que se pasa al backend
  const onToken = (token) => {
    //returns a promise
    axios({
      //route
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment Successful");
      })
      .catch((error) => {
        console.log("Payment error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
