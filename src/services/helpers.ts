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
          : "images/696abe18feffa8c402f137b7423a869e",
        nick: d.owner.nick ? d.owner.nick : "No name",
        answers: d.answers !== null ? handlerComentsData(d.answers) : null,
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
        _id: d._id,
        text: d.text ? d.text : "No text",
        createdAt: new Date(Number(d.createdAt)).toLocaleString(),
        avatar: d.owner.avatar?.url
          ? d.owner.avatar?.url
          : "images/696abe18feffa8c402f137b7423a869e",
        nick: d.owner.nick ? d.owner.nick : "No name",
        answers: d.answers !== null ? handlerComentsData(d.answers) : null,
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

//AdvCard

export function formatDate(date: string): string {
  return new Date(Number(date)).toLocaleDateString();
}

export function handlerImagesPost(images: IImages[] | null) {
  if (images && images.length > 0 && images[0].url) {
    let result = [];
    for (let img of images) {
      img.url &&
        result.push({
          url: `http://hipstagram.asmer.fs.a-level.com.ua/${img.url}`,
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

    nick: postCardData.owner.nick ? postCardData.owner.nick : "No name",
    avatar: postCardData.owner.avatar
      ? `http://hipstagram.asmer.fs.a-level.com.ua/${postCardData.owner.avatar.url}`
      : "https://apollo-ireland.akamaized.net/v1/files/76ojf53mron92-UA/image;s=261x203",
    images: handlerImagesPost(postCardData.images),
    likesCount: Number(postCardData.likesCount),
    likes: postCardData.likes,
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
          ? `http://hipstagram.asmer.fs.a-level.com.ua/${d.images[0].url}`
          : "https://boatparts.com.ua/design/boatparts/images/no_image.png",
      likesCount: d.likesCount || "0",
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
      text: d.text ? d.text : "Не умею писать",
      createdAt: formatDate(d.createdAt),
      image: d.image?.url ? d.image.url : null,
      avatar: d.owner.avatar?.url
        ? d.owner.avatar?.url
        : "images/696abe18feffa8c402f137b7423a869e",
      nick: d.owner.nick ? d.owner.nick : "Безымянный",
      phones: d.owner.phones?.length
        ? d.owner.phones.join(", ")
        : "Нет телефона",
    };
  });
}
