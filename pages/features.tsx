import { useEffect } from "react";
import Link from "next/link";

import SelectLocale from "../components/SelectLocale";
import WebSocket from "../components/WebSocket";
import SessionSection from "../components/SessionSection";
import TemplateFeatures from "../components/TemplateFeatures";

const FeaturesScreen = () => {
  // need to fix this problem!!
  useEffect(() => {
    console.log("hello there");
  }, []);

  return (
    <>
      <Link href="/" passHref>
        <button className="px-3 py-1 rounded-lg text-white font-bold bg-pink-500 shadow-lg shadow-pink-500/50 hover:bg-violet-500 hover:shadow-violet-500/50">
          Go back home
        </button>
      </Link>
      <SessionSection />
      <WebSocket />
      <SelectLocale />
      <TemplateFeatures />
    </>
  );
};

import { GetStaticProps } from "next";
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/Home/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
FeaturesScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default FeaturesScreen;
