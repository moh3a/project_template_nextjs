import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";

import SelectLocale from "../components/SelectLocale";
import WebSocket from "../components/WebSocket";
import SessionSection from "../components/SessionSection";

const HomeScreen = () => {
  const t = useTranslations("HomeScreen");

  return (
    <div className="container px-2 py-4">
      <h1 className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        {t("hello")}
      </h1>
      <SessionSection />
      <WebSocket />
      <SelectLocale />
      <TemplateFeatures />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/Home/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
import TemplateFeatures from "../components/TemplateFeatures";
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
