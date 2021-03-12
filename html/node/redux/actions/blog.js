import { put, takeLatest, all, call } from "redux-saga/effects";

import { BLOG } from "../constants";
import { fetchStrapi } from "../../utils/callStrapi";
import {
  graphQLCaller
} from '../../libs/backend';


export function* queryPosts  ({ the_loai, where }) {
  try {
    if (where) {
      console.log('called', where)
      const { baiViets: posts } = yield graphQLCaller(`query {
        baiViets(
          where:{
            the_loai: {
                 name: "${the_loai}"
            },
            mien: {
              ten: "${where}"
            }
          }) {
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
          published_at,
          slug,
          mota,
          the_loai {
            name
          }
        }
      }`)
      yield put({
        type: BLOG.update,
        posts,
      });
    } else {
      const { baiViets: posts } = yield graphQLCaller(`query {
        baiViets(where:{ the_loai: {
          name: "${the_loai}"
        }}) {
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
          published_at,
          slug,
          mota,
          the_loai {
            name
          }
        }
      }`)
      yield put({
        type: BLOG.update,
        posts,
      });
    }
  } catch (error) {
    console.log(error)
  }
}
export function* queryAllPosts  () {
  try {
    const { baiViets: posts } = yield graphQLCaller(` query {
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
    }`)
    yield put({
      type: BLOG.update,
      posts,
    });
  } catch (error) {
    console.log(error)
  }
}



export function* queryPostDetail({ slug }) {
  try {
    const { baiViets: postDetails } = yield graphQLCaller(`query{
      baiViets(where:{ slug: "${slug}" }) {
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
      }
    }`);
    yield put({
      type: BLOG.update,
      postDetails: {...postDetails[0]},
    });
  } catch (error) {
    console.log(error)
  }
}



export const handlerGetPosts = (the_loai, where) => ({
  type: BLOG.handlers.get,
  the_loai,
  where
});
export const handlerGetAllPosts = () => ({
  type: BLOG.handlers.getAll,
});
export const handlerGetPostDetails = (slug) => ({
  type: BLOG.handlers.getDetails,
  slug,
});

export default function* saga() {
  yield all([
    yield takeLatest(BLOG.handlers.get, queryPosts),
    yield takeLatest(BLOG.handlers.getAll, queryAllPosts),
    yield takeLatest(BLOG.handlers.getDetails, queryPostDetail),
  ]);
}
