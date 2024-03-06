// pages/index.tsx
import Head from "next/head";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/button";

export default function Home() {
  const [components] = useStore('components');

  return (
    <div>
      <Head>
        <title>Pay Portal | UNIPaaS Platform</title>
      </Head>

      {components && <div>
        <h2 className="text-xl font-bold my-4">Pay Portal</h2>
        <div className="mt-4 flex items-baseline space-x-2">
          <div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => {
                const payPortal = components.create("payPortal", {
                  vendor: {
                    name: "Vendor Name",
                  }
                });
                payPortal.mount("#payPortal");
              }}>Create</Button>
              <Button onClick={() => {
                const payPortal = components.create("payPortal", {
                  vendor: {
                    name: "Vendor Name 2",
                  }
                });
                payPortal.mount("#payPortal");
              }}>Update</Button>

            </div>

            <br />
            <br />
            <div id="payPortal" className="w-full"/>
          </div>
        </div>
      </div>}
    </div>
  )
}
