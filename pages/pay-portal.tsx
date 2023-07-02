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
            <Button onClick={() => {
              const payPortal = components.create("payPortal", {});
              payPortal.mount("#payPortal");
            }}>Create</Button>
            <br />
            <br />
            <div id="payPortal" className="w-full"/>
          </div>
        </div>
      </div>}
    </div>
  )
}
