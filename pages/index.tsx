import { useTranslations } from "next-intl";
import Link from "next/link";

const HomeScreen = () => {
  const t = useTranslations("HomeScreen");

  return (
    <div className="container px-2 py-4">
      <h1 className="select-none bg-clip-text text-8xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        {t("hello")}
      </h1>
      <Link href="/features" passHref>
        <button className="px-3 py-1 rounded-lg text-white font-bold bg-pink-500 shadow-lg shadow-pink-500/50 hover:bg-violet-500 hover:shadow-violet-500/50">
          Check out the features
        </button>
      </Link>
    </div>
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
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
