import { Layout } from "@/components/Layout/Layout";
import HeroSession from "@/components/Layout/Home/HeroSession";
import { Compass } from "lucide-react";
import ListAdventureSession from "@/components/Layout/Home/ListAdventureSession";

const HomePage = () => {

  return (
    <Layout>
      <section>
        <HeroSession />
      </section>
      <section className="w-full flex flex-col items-start justify-between py-8 md:py-12 px-[5%] mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="h-6 w-6 text-green-900" />
          <h2 className="mb-0 text-xl md:text-2xl font-bold text-green-900">Aventuras em Destaque</h2>
        </div>
        <ListAdventureSession/>
      </section>
    </Layout>
  );
};

export default HomePage;
