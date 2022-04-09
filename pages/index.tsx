import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";

const HomeScreen = () => {
  const t = useTranslations("HomeScreen");
  return (
    <div className={styles.container}>
      <h2>{t("hello")}</h2>
      <p>{t("workOnNextAuth")}</p>
      <SelectLocale />
    </div>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/Home/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
import SelectLocale from "../components/SelectLocale";
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
