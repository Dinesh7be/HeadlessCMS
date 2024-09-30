// pages/[...slug].js
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Layout from '../components/layout';

const GET_PAGE_BY_SLUG = gql`
  query GET_PAGE_BY_SLUG($slug: String!) {
    pageBy(uri: $slug) {
      title
      content
    }
  }
`;

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Construct the full URI from the slug array
  const uri = slug ? `/${slug.join('/')}` : null;

  // Prevent access to /home and return a 404
  if (uri === '/home') {
    return <p>404 - Page Not Found</p>;
  }

  const { loading, error, data } = useQuery(GET_PAGE_BY_SLUG, {
    variables: { slug: uri },
    skip: !uri, // Skip the query if uri is not available yet
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
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Layout>
  );
};

export default Page;
