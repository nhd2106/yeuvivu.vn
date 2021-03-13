async function fetchAPI(query, { variables } = {}) {
   const baseURL = process.env.NODE_ENV === 'production' ? 'https://yeuvivu.vn:1337' : 'http://localhost:1337'
  const res = await fetch(`${baseURL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($where: JSON) {
      posts(where: $where) {
        slug
      }
    }
    `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  );
  return data?.posts[0];
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
      {
        baiViets {
          slug
        }
      }
    `);
  return data?.baiViets;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    ` query {
            baiViets {
              tieuDe,
              anhGioiThieu {
                url
              },
              tags {
                tagName
              },
              mien{
                ten
              },
              published_at,
              slug,
              mota,
              the_loai {
                name
              }
            }
          }`,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: "published" }),
        },
      },
    }
  );
  return data?.baiViets;
}
export async function getPostByType(name, preview) {
  const data = await fetchAPI(
         `
            query PostByType($where: JSON)  {
            baiViets(where: $where){
            tieuDe,
            anhGioiThieu {
                url
              },
              tags {
                tagName
              },
              mien{
                ten
              },
              published_at,
              slug,
              mota,
              the_loai {
                name
              }
         }
      }
    `,
    {
      preview,
      variables: {
        where: {
          the_loai: {
              name
          },
        },
      },
    }
  );
  return data?.baiViets;
}

export async function getPostAndMorePosts(slug, preview) {
    const data = await fetchAPI(
        `
           query PostByType($where: JSON)  {
           baiViets(where: $where){
            tieuDe,
            anhGioiThieu {
              url
            },
            tags {
              tagName
            },
            mien{
              ten
            }
            noiDung,
            published_at,
            slug
        }
     }
   `,
   {
     preview,
     variables: {
       where: {
         slug
       },
     },
   }
 );
  return data;
}
