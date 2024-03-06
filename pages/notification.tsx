import Head from "next/head";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/button";

export default function PaymentsPage() {
  const [components] = useStore('components');

  return (
    <div>
      <Head>
        <title>Notification | UNIPaaS Platform</title>
      </Head>


      {components && <div>
        <h2 className="text-xl font-bold my-4">Notification</h2>


        <div className="mt-4 flex items-baseline space-x-2">
          <div>
            <Button onClick={() => {
              const payments = components.create("notification", {
                vendor: {
                  name: "Vendor Name",
                }
              });
              payments.mount("#notification");
            }}>Create</Button>
            <br />
            <br />
            <div id="notification" className="w-full mt-[200px]"/>
          </div>
        </div>
      </div>}
    </div>
  )
}
