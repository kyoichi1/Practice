import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Progress } from "@mantine/core";

const GithubPages = ({ pinnedItems }) => {
  let a = 4;
  let b = 40;
  let c = 9;
  let d = "#68b5e8";
  let e = "#33b";
  let f = "#000532";
  return (
    <div className="">
      {pinnedItems.map((item) => {
        return (
          <a key={item.id} href={item.url}>
            <h2>{item.name}</h2>
            <h2>{item.description}</h2>
            {item.languages.edges.map((language) => {
              return (
                <div key={language.node.name} className>
                  <p>{language.node.name}</p>
                  <p>{language.node.color}</p>
                </div>
              );
            })}
            <p>🍴{item.forkCount}</p>
            <p>⭐ {item.stargazerCount}</p>
          </a>
        );
        <Progress
          className="h-30px w-[200px]"
          role={"w-20"}
          sections={[
            { value: a, color: d },
            { value: b, color: e },
            { value: c, color: f },
          ]}
        />;
      })}
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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        user(login: "kyoichi1") {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            totalCount
            edges {
              node {
                ... on Repository {
                  name
                  description
                  id
                  url
                  languages(first: 10) {
                    edges {
                      node {
                        color
                        name
                      }
                    }
                  }
                  stargazerCount
                  forkCount
                }
              }
            }
          }
        }
      }
    `,
  });

  const { user } = data;
  const pinnedItems = user.pinnedItems.edges.map((edge) => edge.node);

  return {
    props: {
      pinnedItems,
    },
  };
}

export default GithubPages;
