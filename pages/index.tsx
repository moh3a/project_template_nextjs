import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";

import SelectLocale from "../components/SelectLocale";
import WebSocket from "../components/WebSocket";
import SessionSection from "../components/SessionSection";

const HomeScreen = () => {
  const t = useTranslations("HomeScreen");

  return (
    <div style={{ padding: "0 2rem" }}>
      <h1>{t("hello")}</h1>
      <SessionSection />
      <WebSocket />
      <SelectLocale />
      <h2>This app is a PWA</h2>
      <p>
        it means that althogh it is on the web, it can be installed on your
        windows or your android.
      </p>
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
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
