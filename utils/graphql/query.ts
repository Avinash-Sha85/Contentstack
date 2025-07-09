export const GET_ALL_BLOG_POSTS_QUERY = `
  query {
    all_blog_post {
      items {
        title
        url
        description
        featured_imageConnection {
        edges {
          node {
            url
          }
        }
      }
        system {
          tags
          publish_details {
            time
          }
        }
      }
    }
  }
`;
