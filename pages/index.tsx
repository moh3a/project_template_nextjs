import React, { useCallback, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import axios from "axios";
import io, { Socket } from "socket.io-client";

import SelectLocale from "../components/SelectLocale";
import WebSocket from "../components/WebSocket";
import SessionSection from "../components/SessionSection";
import { DefaultEventsMap } from "@socket.io/component-emitter";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const HomeScreen = () => {
  const t = useTranslations("HomeScreen");
  const [input, setInput] = useState("");

  const socketInitializer = useCallback(async () => {
    await axios.post("/api/socket");
    socket = io();

    socket.on("connection", () => {
      console.log("client connected!");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  }, []);

  useEffect(() => {
    socketInitializer();
  }, [socketInitializer]);

  return (
    <div style={{ padding: "0 2rem" }}>
      <h1>{t("hello")}</h1>
      <SessionSection />
      <WebSocket socket={socket} input={input} setInput={setInput} />
      <SelectLocale />
      <h2>This app is a PWA</h2>
      <p>
        it means that althogh it is on the web, it can be installed on your
        windows or your android.
      </p>
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
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
