// pages/index.js
import { useQuery, gql } from '@apollo/client';
import Layout from '../components/layout';

const GET_HOME_PAGE = gql`
  query GET_HOME_PAGE($slug: String!) {
    pageBy(uri: $slug) {
      title
      content
    }
  }
`;

export default function Home() {
  const uri = '/home'; // The slug for the home page
  const { loading, error, data } = useQuery(GET_HOME_PAGE, {
    variables: { slug: uri },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Check if data is defined and contains the page
  if (!data || !data.pageBy) {
    return <p>404 - Page Not Found</p>;
  }

  const { title, content } = data.pageBy;

  return (
    <Layout>
      <div>
    
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Layout>
  );
}
