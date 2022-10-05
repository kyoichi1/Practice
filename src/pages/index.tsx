import Head from "next/head";
import Image from "next/image";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { FC } from "react";

const Home: FC<Props> = ({ pinnedItems }) => {
  // const id = pinnedItems.id;
  // const first = pinnedItems.first;
  return (
    <div className="text-centert bg-slate-400 justify-center text-center">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="bg-blue-300 ml-3 flex items-center justify-center">
          {pinnedItems.map((item) => {
            return (
              <a
                key={item.id}
                href={item.url}
                className="bg-blue-400 block h-20 m-3  w-96 "
              >
                <h2 className="mt-4">{item.name}</h2>
                <p className="mt-4"> ⭐ {item.stargazers.totalCount}</p>
                <p className="mt-4">🍴 {item.forks.totalCount}</p>

                <p className="mt-4">{item.primaryLanguage.name}</p>
                <p className="mt-4]">{item.primaryLanguage.color}</p>
                <div>{item.name}</div>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    };
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        user(login: "kyoichi1") {
          pinnedItems(first: 2, types: [REPOSITORY]) {
            edges {
              node {
                ... on Repository {
                  name
                  id
                  url
                  primaryLanguage {
                    id
                    color
                    name
                  }
                  stargazers {
                    totalCount
                  }
                  forks {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  const { user } = data;
  const pinnedItems = user.pinnedItems.edges.map(
    (edge: { node: any }) => edge.node
  );

  return {
    props: {
      pinnedItems,
    },
  };
}

export default Home;
