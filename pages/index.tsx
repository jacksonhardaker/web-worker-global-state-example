import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "../src/state/hooks/useState";
import styles from "../styles/Home.module.css";

const ChildComponent = () => {
  const [count] = useState("count", 0);
  return <p>{count}</p>;
};

const Home: NextPage = () => {
  const [count, setCount] = useState("count", 0);
  console.log({ count });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ChildComponent />
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <button onClick={() => setCount((c) => c + 1)}>
          <>{count}: ++</>
        </button>
      </main>
    </div>
  );
};

export default Home;