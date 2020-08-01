import { IAdv } from "../store/addPost/types";
import { IImages, IPostcardData, IPostCardPayload } from "../store/post/types";
import {
  IFilterPosts,
  ISortPosts,
  TPostsData,
  IPostsDataPayload,
} from "../store/posts/types";
import { IMessageData, IMessageDataPayload } from "../store/message/types";
import {
  IGetCommentsSuccess,
  ICommentsDataPayload,
} from "../store/comments/types";
import { IGetLikeSuccess, ILikeDataPayload } from "../store/like/types";
import { IUserSuggestionsPayload, IUserSuggestions } from "../store/user/types";
import img from "../img/user-img.png";
import { upLoadPhoto } from "./api";

export const handlerComentsData = (
  commentsData: ICommentsDataPayload[]
): IGetCommentsSuccess[] => {
  return (
    commentsData &&
    commentsData.map((d) => {
      return {
        _id: d._id,
        text: d.text ? d.text : "No text",
        createdAt: formatDate(d.createdAt),
        avatar: d.owner.avatar?.url
          ? d.owner.avatar?.url
          : "images/0f002ed3beed73ec35d983ee39492793",
        nick: d.owner.nick ? d.owner.nick : "No name",
        answers: d.answers !== null ? handlerComentsData(d.answers) : null,
        userId: d.owner._id,
      };
    })
  );
};

//like
export const handlerLikeData = (
  likeData: ILikeDataPayload[]
): IGetLikeSuccess[] => {
  return (
    likeData &&
    likeData.map((d) => {
      return {
        idLike: d._id,
        _id: d.owner._id,
        idPost: d.post?._id,
        images: d.post?.images
          ? d.post.images[0]?.url
            ? d.post.images[0]?.url
            : "images/dccf1f2c0f3750711e76f4ef5e24b041"
          : "images/dccf1f2c0f3750711e76f4ef5e24b041",
        avatar: d.owner.avatar?.url
          ? d.owner.avatar?.url
          : "images/0f002ed3beed73ec35d983ee39492793",
        login: d.owner.login ? d.owner.login : "No name",
      };
    })
  );
};

//AddPost

export async function handlerPostImg(
  oldImages: IAdv["oldImages"],
  refPhotos: any,
  jwtToken: string
) {
  const idPhotos = [];
  for (let i = 0; i < 1; i++) {
    let imgId = oldImages && oldImages[i]?._id ? oldImages[i]._id : null;
    const photo = refPhotos[i]?.current?.elements[0] as HTMLInputElement;
    if (!photo) {
      return;
    }
    if (photo.files?.length) {
      const body = new FormData(refPhotos[i].current);
      imgId = await upLoadPhoto(jwtToken, body);
    }

    idPhotos.push({ _id: imgId });
  }
  return idPhotos;
}

//postCard

export function formatDate(date: string): string {
  return new Date(Number(date)).toLocaleDateString();
}

export function handlerImagesPost(images: IImages[] | null) {
  if (images && images.length > 0 && images[0].url) {
    let result = [];
    for (let img of images) {
      img.url &&
        result.push({
          url: `/${img.url}`,
          _id: img._id,
        });
    }
    return result;
  } else {
    return [];
  }
}

export function handlerPostCardData(
  postCardData: IPostCardPayload
): IPostcardData {
  return {
    _id: postCardData._id,
    userId: postCardData.owner._id,
    postDate: formatDate(postCardData.createdAt),
    title: postCardData.title || "No text",
    userDate: formatDate(postCardData.owner.createdAt),
    login: postCardData.owner.login,
    nick: postCardData.owner.nick ? postCardData.owner.nick : "No name",
    avatar: postCardData.owner.avatar
      ? `/${postCardData.owner.avatar.url}`
      : img,
    images: handlerImagesPost(postCardData.images),
    likesCount: Number(postCardData.likesCount),
    likes: postCardData.likes,
    comments: postCardData.comments,
  };
}

//Posts

export function getPostCountFilter(
  type: string,
  quest: string,
  userId: string
): IFilterPosts {
  let filter: IFilterPosts = type === "myposts" ? { ___owner: userId } : {};
  quest &&
    (filter.$or = [{ title: `/${quest}/` }, { description: `/${quest}/` }]);
  return filter;
}

export function getPostsDataQuery(
  filter: IFilterPosts,
  postCount: number,
  page: number,
  limit: number,
  sortType: string
): TPostsData {
  let sort: ISortPosts[] = [];
  switch (sortType) {
    case "dateDesc":
      sort = [{ _id: -1 }];
      break;
  }
  const checkPage =
    page * limit > postCount ? Math.ceil(postCount / limit) - 1 : page - 1;

  const skip = checkPage * limit;
  return [filter, { limit: [limit], skip: [skip], sort }];
}

export function handlerPostsData(postsData: IPostsDataPayload[]) {
  return postsData.map((d: IPostsDataPayload) => {
    return {
      ...d,
      title: d.title || "No text",
      createdAt: new Date(Number(d.createdAt)).toLocaleString(),
      images:
        d.images && d.images[0]?.url
          ? `/${d.images[0].url}`
          : "/images/dccf1f2c0f3750711e76f4ef5e24b041",
      likes: d.likes?.length || 0,
      comments: d.comments ? d.comments.length : "0",
    };
  });
}

// message

export function handlerMessagesData(
  messagesData: IMessageDataPayload[]
): IMessageData[] {
  return messagesData.map((d: IMessageDataPayload) => {
    return {
      _id: d._id,
      text: d.text ? d.text : "No text",
      createdAt: formatDate(d.createdAt),
      image: d.image?.url ? d.image.url : null,
      avatar: d.owner.avatar?.url
        ? d.owner.avatar?.url
        : "images/0f002ed3beed73ec35d983ee39492793",
      login: d.owner.login ? d.owner.login : "No name",
    };
  });
}

//User

export function handlerUserSuggestions(
  userSuggestionsData: IUserSuggestionsPayload[]
): IUserSuggestions[] {
  return userSuggestionsData.map((d: IUserSuggestionsPayload) => {
    return {
      ...d,
      _id: d._id,
      login: d.login,
      avatar: d?.avatar ? `/${d.avatar.url}` : img,
    };
  });
}
