import SelectLocale from "../components/SelectLocale";
import WebSocket from "../components/WebSocket";
import SessionSection from "../components/SessionSection";
import TemplateFeatures from "../components/TemplateFeatures";

const FeaturesScreen = () => {
  return (
    <>
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
