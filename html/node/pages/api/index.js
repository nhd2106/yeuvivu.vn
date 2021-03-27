import _ from 'lodash';

async function fetchAPI(query, { variables } = {}) {
   const baseURL = process.env.NODE_ENV === 'production' ? 'https://yeuvivu.vn:1337' : 'https://yeuvivu.vn:1337'
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


export async function getHomepageSeo() {
  const data = await fetchAPI(
    `
    query {
      homepageSeo {
        title,
        desccription,
        keywords,
        image{
          url
        }
      }
     }
    `
  );
  return data?.homepageSeo;
}

export async function getLinksAndPhone() {
  const data = await fetchAPI(
    `
    query {
      linksAndPhone {
        facebook
        instagram
        phone
      }
     }
    `
  );
  return data?.linksAndPhone;
}

export async function getPosters() {
  const data = await fetchAPI(
    `
    query {
      postersAndBanner {
        ads1 {
          url
        },
        ads2  {
          url
        },
        groupbanner {
          url
        },
        instagram {
          url
        }
        tu_van_poster {
          url
        }
      }
     }
    `
  );
  return data?.postersAndBanner;
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

export async function getAllPostsForHome(number) {
  const data = await fetchAPI(
    ` query {
            baiViets(sort: "published_at:desc", start: ${number*9 -9}, limit: 9) {
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
  );
  return data?.baiViets;
}

export async function getAllSearchPosts() {
  const data = await fetchAPI(
    ` query {
            baiViets{
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
  );
  return data?.baiViets;
}

export async function countAllPosts() {
  const data = await fetchAPI(
    ` query {
      baiViets {
        id,
      }
    }`,
  );
  return data?.baiViets.length;
}

export async function getPostByType(name, number, mien) {
  const where = {
    the_loai: {
      name
    },
  }
  if(mien) _.set(where, 'mien.ten', mien);
  const data = await fetchAPI(
         `
            query PostByType($where: JSON)  {
            baiViets(sort: "published_at:desc", where: $where, start: ${number*9 - 9}, limit: 9){
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
      variables: {
        where
      },
    }
  );
  return data?.baiViets;
}
export async function countPostsByType(name, mien) {
  const where = {
    the_loai: {
      name
    },
  }
  if(mien) _.set(where, 'mien.ten', mien);
  const data = await fetchAPI(
         `
            query PostByType($where: JSON)  {
            baiViets(sort: "published_at:desc", where: $where){
            id
         }
      }
    `,
    {
      variables: {
        where
      },
    }
  );
  return data?.baiViets.length;
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
            mota
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

