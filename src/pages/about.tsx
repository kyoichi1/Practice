// import Head from "next/head";
// import Image from "next/image";
// import {
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache,
//   gql,
// } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { NextPage } from "next";

// type Props = {
//   user: {
//     pinnedItems: {
//       totalCount: number;
//       edges: {
//         node: {
//           id: string;
//           name: string;
//           url: string;
//           stargazers: {
//             totalCount: number;
//           };
//         };
//       };
//     };
//   };
// };
// [];

// // export default function Home({ pinnedItems }) {
// const About: NextPage<Props> = ({ pinnedItems }) => {
//   return (
//     <div className="">
//       {pinnedItems.map((item) => {
//         return (
//           <a key={item.id} href={item.url} className="">
//             <h2>{item.name}</h2>
//             <p>⭐ {item.stargazers.totalCount}</p>
//           </a>
//         );
//       })}
//     </div>
//   );
// };

// export async function getStaticProps() {
//   const httpLink = createHttpLink({
//     uri: "https://api.github.com/graphql",
//   });

//   const authLink = setContext((_, { headers }) => {
//     return {
//       headers: {
//         ...headers,
//         authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
//       },
//     };
//   });

//   const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//   });

//   const { data } = await client.query({
//     query: gql`
//       {
//         user(login: "colbyfayock") {
//           pinnedItems(first: 6, types: [REPOSITORY]) {
//             totalCount
//             edges {
//               node {
//                 ... on Repository {
//                   name
//                   id
//                   url
//                   stargazers {
//                     totalCount
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//   });

//   const { user } = data;
//   const pinnedItems: Props = user.pinnedItems.edges.map((edge) => edge.node);

//   return {
//     props: {
//       pinnedItems,
//     },
//   };
// }

// export default About;

import { Progress } from "@mantine/core";
import React from "react";

const about = () => {
  let a = 4;
  let b = 40;
  let c = 9;
  let d = "#68b5e8";
  let e = "#33b";
  let f = "#000532";

  return (
    <div className=" bg-green-200 m-auto w-20px">
      <h1>title</h1>
      <Progress
        className="w-[200px] h-30px"
        role={"w-20"}
        sections={[
          { value: a, color: d },
          { value: b, color: e },
          { value: c, color: f },
        ]}
      />
    </div>
  );
};

export default about;
