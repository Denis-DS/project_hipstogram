import React, { useEffect } from "react";
import { IPosts, IGallery } from "../../../store/posts/types";
import PostUser from "../PostUser";
import Post from "../Post";
import PostCardFollowing from "../PostCardFollowing";
import { IPostCardPayload } from "../../../store/post/types";
import { handlerPostCardData } from "../../../services/helpers";

const Gallery = ({
  postsData,
  isMyPosts,
  onScroll,
  postFollowing,
}: IGallery) => {
  const element = document.getElementById("main");

  const handleScroll = () => {
    if (
      (element?.offsetHeight ? element?.offsetHeight : 0) +
        (element?.scrollTop ? element?.scrollTop : 0) !==
      element?.scrollHeight
    ) {
      return;
    }

    if (typeof onScroll === "function") {
      onScroll();
    }
  };

  useEffect(() => {
    document.getElementById("main")?.addEventListener("scroll", handleScroll);
    return () =>
      document
        .getElementById("main")
        ?.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPostsUser = (d: IPosts) => {
    return (
      <PostUser
        likes={d.likes}
        comments={d.comments}
        key={d._id}
        _id={d._id}
        title={d.title}
        createdAt={d.createdAt}
        images={d.images}
      />
    );
  };

  const renderPosts = (d: IPosts) => {
    return (
      <Post
        likes={d.likes}
        comments={d.comments}
        key={d._id}
        _id={d._id}
        title={d.title}
        createdAt={d.createdAt}
        images={d.images}
      />
    );
  };

  const renderPostCardFollowing = (d: IPostCardPayload) => {
    return (
      <PostCardFollowing
        postID={d._id}
        key={d._id}
        postCard={handlerPostCardData(d)}
      />
    );
  };

  return (
    <React.Fragment>
      {postsData.map((d: any) => {
        if (!postFollowing) {
          if (!isMyPosts) {
            return renderPosts(d);
          } else {
            return renderPostsUser(d);
          }
        } else {
          return renderPostCardFollowing(d);
        }
      })}
    </React.Fragment>
  );
};

export default React.memo(Gallery);
