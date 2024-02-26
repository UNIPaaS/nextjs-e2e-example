import Head from "next/head";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/button";

export default function PaymentsPage() {
  const [components] = useStore('components');

  return (
    <div>
      <Head>
        <title>Balance | UNIPaaS Platform</title>
      </Head>


      {components && <div>
        <h2 className="text-xl font-bold my-4">Balance</h2>


        <div className="mt-4 flex items-baseline space-x-2">
          <div>
            <Button onClick={() => {
              const payments = components.create("balance", {
                vendor: {
                  name: "Vendor Name",
                }
              });
              payments.mount("#balance");
            }}>Create</Button>
            <br />
            <br />
            <div id="balance" className="w-full"/>
          </div>
        </div>
      </div>}
    </div>
  )
}
