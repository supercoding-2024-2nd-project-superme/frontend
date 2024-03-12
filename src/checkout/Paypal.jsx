import React, { useEffect, useRef } from "react";

const Paypal = () => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        //데이터 받아서 채우기
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "ivory baseball cap",
                amount: {
                  currency_code: "USD",
                  value: 50.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <>
      <div ref={paypal}></div>
    </>
  );
};

export default Paypal;
