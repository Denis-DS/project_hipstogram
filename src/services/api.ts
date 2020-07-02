import {
  TGetCommentQuery,
  IFilterPosts,
  TPostsData,
  TGetLikeQuery,
} from "../store/posts/types";
import { IMessageFilter, TQueryMessage } from "../store/message/types";

function getHeaders(authToken: string) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
}

export async function queryFetch(data: object, url: string) {
  return fetch(url, data).then((response) => response.json());
}

//Comments

export async function queryComments(
  authToken: string,
  query: TGetCommentQuery
) {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `query getComments($query:String){
                CommentFind(query: $query){
                  _id, createdAt, text, owner{nick, avatar{url}, _id},
                  answers{_id, createdAt, text, owner{nick, avatar{url}, _id},
                    answers{_id, createdAt, text, owner{nick, avatar{url}, _id}}
                    }
                }
              }`,
      variables: { query: JSON.stringify(query) },
    }),
  };
  return queryFetch(data, "/graphql").then((data) => data.data.CommentFind);
}

export async function mutationComments(
  authToken: string,
  text: string,
  post: string,
  answerTo: string | null
) {
  let variables = {
    text: text,
    post: { _id: post },
    answerTo: { _id: answerTo },
  };
  !answerTo && delete variables.answerTo;
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `mutation setComment($text:String, $post:PostInput, $answerTo: CommentInput) {
                CommentUpsert(comment:{text: $text, post: $post, answerTo:$answerTo}){
                  _id
                }
              }`,
      variables,
    }),
  };
  return queryFetch(data, "/graphql").then(
    (data) => data.data.CommentUpsert._id
  );
}

//like

export async function mutationLike(
  authToken: string,
  text: string,
  post: string,
  answerTo: string | null
) {
  let variables = {
    text: text,
    post: { _id: post },
    answerTo: { _id: answerTo },
  };

  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `mutation setLike($post:PostInput, $answerTo: UserInput) {
                LikeUpsert(like:{post: $post, user:$answerTo}){
                  _id
                }
              }`,
      variables,
    }),
  };
  return queryFetch(data, "/graphql").then((data) => data.data.LikeUpsert._id);
}

export async function queryLike(authToken: string, query: TGetLikeQuery) {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `query getLike($query:String) {
                LikeFind(query: $query){
                  _id post{_id} owner{nick, avatar{url}, _id}
                }
              }`,
      variables: { query: JSON.stringify(query) },
    }),
  };
  return queryFetch(data, "/graphql").then((data) => data.data.LikeFind);
}

export async function delLike(authToken: string, query: TGetCommentQuery) {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `mutation delLike($_id:ID) {
                LikeDelete(_id: $_id){
                  _id
                }
              }`,
      variables: { query: JSON.stringify(query) },
    }),
  };
  return queryFetch(data, "/graphql").then(
    (data) => data.data.CommentUpsert._id
  );
}

//addPost

interface IPhoto {
  _id: string;
}

export const addPost = async (
  authToken: string,
  title: string,
  idPhotos: IPhoto[],
  _id: string | null
) => {
  const variables = {
    title: title,
    img: idPhotos,
    _id: _id,
  };
  if (!_id) delete variables._id;
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `mutation addPost($_id: ID, $title: String, $img:[ImageInput]) {
              PostUpsert(post:{_id: $_id, title: $title, images: $img }) {
                _id
              }
            }`,
      variables,
    }),
  };

  return await queryFetch(data, "/graphql").then(
    (data) => data.data.PostUpsert._id
  );
};

export async function upLoadPhoto(authToken: string, body: FormData) {
  const data = {
    method: "POST",
    headers: authToken ? { Authorization: "Bearer " + authToken } : {},
    body: body,
  };

  return await queryFetch(data, "/upload").then((data) => data._id);
}

//postsCard

export const queryPostData = async (id: string, authToken: string) => {
  const advQuery = `[{"_id": "${id}"}]`;
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `query getPost($adId: String){
                            PostFindOne(query: $adId) {
                              _id,
                              createdAt,
                              owner{_id, nick, avatar{url},createdAt},
                              images{url, _id},
                              title,
                              likes{_id, owner{_id}},
                              likesCount
                            }
                          }`,
      variables: { adId: advQuery },
    }),
  };

  return await queryFetch(data, "/graphql").then(
    (data) => data.data.PostFindOne
  );
};

// Advs

export const queryPostsData = async (authToken: string, query: TPostsData) => {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `query getPosts($query: String){
                PostFind(query: $query) {
                _id,
                images{
                 url
                }
                createdAt,
                title,
                likesCount,
                comments{
                  _id
                }
                }
            }`,
      variables: { query: JSON.stringify(query) },
    }),
  };

  return await queryFetch(data, "/graphql").then((data) => data.data.PostFind);
};

export const queryPostsCount = async (
  authToken: string,
  query: IFilterPosts[]
) => {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `query countPosts($query:String){
                PostCount(query: $query)
              }`,
      variables: { query: JSON.stringify(query) },
    }),
  };

  return await queryFetch(data, "/graphql").then((data) => data.data.PostCount);
};

// auth

export const getAuthToken = async (login: string, password: string) => {
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query login($login: String!, $password: String!){
          login(login:$login, password:$password)
          }`,
      variables: { login: login, password: password },
    }),
  };

  return await queryFetch(data, "/graphql").then((data) => data.data.login);
};

export const regUserRequest = async (login: string, password: string) => {
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation reg($login: String!, $password: String!) {
                createUser(login: $login, password: $password) {
                  _id
                }
              }`,
      variables: { login: login, password: password },
    }),
  };

  return await queryFetch(data, "/graphql").then(
    (data) => data.data.createUser
  );
};

// message

export async function queryMessages(authToken: string, query: TQueryMessage) {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `query incomingMessage($query: String) {
          MessageFind(query: $query){
            _id createdAt text 
            image {url}
            owner {nick avatar{url} phones}
          }
        }`,
      variables: { query: JSON.stringify(query) },
    }),
  };

  return await queryFetch(data, "/graphql").then(
    (data) => data.data.MessageFind
  );
}

export async function mutationMessage(
  authToken: string,
  userId: string,
  text: string,
  imgId: string | null
) {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `mutation sendMessage($to:UserInput, $text:String, $image:ImageInput){
              MessageUpsert(message:{to:$to, text:$text, image:$image}){
                _id
              }
            }`,
      variables: { to: { _id: userId }, text: text, image: { _id: imgId } },
    }),
  };

  return await queryFetch(data, "/graphql").then(
    (data) => data.data.MessageUpsert._id
  );
}

export const queryMessageCount = async (
  authToken: string,
  query: IMessageFilter[]
) => {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `query countAds($query:String){
                MessageCount(query: $query)
              }`,
      variables: { query: JSON.stringify(query) },
    }),
  };

  return await queryFetch(data, "/graphql").then(
    (data) => data.data.MessageCount
  );
};

// profile

export async function queryUserData(userId: string, authToken: string) {
  const userQuery = `[{"_id": "${userId}"}]`;
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `query getUsers($userQuery: String){
                  UserFindOne(query: $userQuery){
                    _id login nick
                    avatar{
                      _id
                      url
                    }
                    likesCount
                    followers {
                      _id
                      login nick
                      avatar{
                        _id
                        url
                      }
                    }
                    following {
                      _id
                      login nick
                      avatar{
                        _id
                        url
                      }
                    }
                  }
                }`,
      variables: { userQuery: userQuery },
    }),
  };

  return queryFetch(data, "/graphql").then((data) => data.data.UserFindOne);
}

export async function mutationUserData(
  userId: string,
  authToken: string,
  login: string,
  nick: string
) {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `mutation userUpdate ($id: String, $login: String, $nick: String){
          UserUpsert(user:{
            _id:$id, login:$login, nick:$nick
          })
          {
            _id
          }
        }`,
      variables: {
        id: userId,
        login: login,
        nick: nick,
      },
    }),
  };

  return await queryFetch(data, "/graphql").then(
    (data) => data.data.UserUpsert._id
  );
}

export async function addAvatarToUser(
  authToken: string,
  userId: string,
  avaId: string
) {
  const data = {
    ...getHeaders(authToken),
    body: JSON.stringify({
      query: `mutation addAvatarToUser ($id: String, $avaId: ID){
          UserUpsert(user:{
            _id:$id, avatar:{_id: $avaId}
          })
          {
            avatar{_id url}
          }
        }`,
      variables: { id: userId, avaId: avaId },
    }),
  };

  return await queryFetch(data, "/graphql").then(
    (data) => data.data.UserUpsert.avatar
  );
}
