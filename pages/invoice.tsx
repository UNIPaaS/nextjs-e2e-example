// pages/index.tsx
import Head from "next/head";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/button";
import { TextInput } from "@/components/inputs/text";
import { useState } from "react";

export default function Home() {
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
        <title>Invoice | UNIPaaS Platform</title>
      </Head>


      {components && <div>
        <h2 className="text-xl font-bold my-4">Invoice</h2>

        {/* settings */}
        <div>
          <div className="flex items-baseline space-x-2">
            {/* customer reference */}
            <TextInput label="Customer Reference" value={customer.reference} setValue={(reference => ({
              ...customer,
              reference
            }))} />

            {/* customer name */}
            <TextInput label="Customer Name" value={customer.name} setValue={(name => ({
              ...customer,
              name
            }))} />

            {/* customer email */}
            <TextInput label="Customer Email" value={customer.email} setValue={(email => ({
              ...customer,
              email
            }))} />
          </div>
        </div>


        <div className="mt-4 flex items-baseline space-x-2">
          <div>
            <Button onClick={() => {
              const payPortal = components.create("invoice", {
                // todo double check the mandatory/conditional fields
                mode: 'create', //mandatory: create, edit and view
                invoiceId, //conditional - provide if invoice created (edit/view)
                customer, //conditional - provide once customer is selected
              });
              payPortal.mount("#invoice");
            }}>Create</Button>
            <br />
            <br />
            <div id="invoice" className="w-full"/>
          </div>
        </div>
      </div>}
    </div>
  )
}
