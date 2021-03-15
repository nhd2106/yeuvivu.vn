import _ from 'lodash';

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

export async function getProfileImage() {
  const data = await fetchAPI(
    `
    query {
        socialPoster{
               url {
             url
           }
       }
     }
    `
  );
  return data?.socialPoster;
}

export async function getAdsPoster1() {
  const data = await fetchAPI(
    `
    query {
        adsPoster1{
               url {
             url
           }
       }
     }
    `
  );
  return data?.adsPoster1;
}
export async function getAdsPoster2() {
  const data = await fetchAPI(
    `
    query {
        adsPoster2{
               url {
             url
           }
       }
     }
    `
  );
  return data?.adsPoster2;
}
export async function getGroupBanner() {
  const data = await fetchAPI(
    `
    query {
        groupBanner{
               url {
             url
           }
       }
     }
    `
  );
  return data?.groupBanner;
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
            baiViets(start: ${number*4 -4}, limit: 4) {
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
            baiViets(where: $where, start: ${number*4 - 4}, limit: 4){
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
