// pages/index.tsx
import Head from "next/head";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/button";
import { TextInput } from "@/components/inputs/text";
import { useState } from "react";

export default function PaymentsPage() {
  const [components] = useStore('components');

  const [invoiceId, setInvoiceId] = useState('INV-122');
  const [customer, setCustomer] = useState({
    reference: "CUSTOMER-343",
    name: "evg customer",
    email: "evgeni.leonti+customer1@unipaas.com",
  });


  return (
    <div>
      <Head>
        <title>Payments | UNIPaaS Platform</title>
      </Head>


      {components && <div>
        <h2 className="text-xl font-bold my-4">Payments</h2>


        <div className="mt-4 flex items-baseline space-x-2">
          <div>
            <Button onClick={() => {
              const payments = components.create("payments", {
                // // todo double check the mandatory/conditional fields
                // mode: 'create', //mandatory: create, edit and view
                // invoiceId, //conditional - provide if invoice created (edit/view)
                // customer, //conditional - provide once customer is selected
              });
              payments.mount("#payments");
            }}>Create</Button>
            <br />
            <br />
            <div id="payments" className="w-full"/>
          </div>
        </div>
      </div>}
    </div>
  )
}
