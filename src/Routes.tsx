import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { IRootState } from "./store/rootReducer";

const Posts = React.lazy(() => import("./components/posts/Posts"));
const FollowingPosts = React.lazy(() =>
  import("./components/posts/FollowingPosts")
);
const PostsUser = React.lazy(() => import("./components/posts/PostsUser"));
const Login = React.lazy(() => import("./components/auth/Login"));
const Registration = React.lazy(() => import("./components/auth/Registration"));
const Settings = React.lazy(() => import("./components/user/Settings"));
const Profile = React.lazy(() => import("./components/user/Profile"));
const RegSuccess = React.lazy(() => import("./components/auth/RegSuccess"));
const PostCard = React.lazy(() => import("./components/posts/PostCard"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const AddPost = React.lazy(() => import("./components/AddPost"));
const PostSuccess = React.lazy(() =>
  import("./components/AddPost/PostSuccess")
);
const Likes = React.lazy(() => import("./components/Likes"));
const Subscribs = React.lazy(() => import("./components/Subscribs"));
const MyMessages = React.lazy(() => import("./components/MyMessages"));

const mapStateToProps = (state: IRootState) => ({
  authToken: state.auth.authData.authToken,
});

type IProps = ReturnType<typeof mapStateToProps>;

const Routes: React.FC<IProps> = (props) => {
  return (
    <React.Suspense
      fallback={
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      }
    >
      <Switch>
        {props.authToken && <Redirect exact from="/login" to="/" />}
        {props.authToken && <Redirect exact from="/registration" to="/" />}
        {props.authToken && <Redirect exact from="/regsuccess" to="/" />}
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/regsuccess" component={RegSuccess} />
        {!props.authToken && <Route path="/" component={Login} />}

        <Route exact path="/posts" component={Posts} />
        <Route exact path="/" component={FollowingPosts} />
        <Route path="/myposts/:id" component={PostsUser} />
        <Route exact path="/myposts/q-:q" component={Posts} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/profile/:id" component={Profile} />
        <Route exact path="/direct" component={MyMessages} />
        <Route exact path="/direct/page-:id" component={MyMessages} />
        <Route path="/postcard/:id" component={PostCard} />
        <Route exact path="/addpost" component={AddPost} />
        <Route path="/postedit-:id" component={AddPost} />
        <Route exact path="/postsaccess" component={PostSuccess} />
        <Route path="/likes" component={Likes} />
        <Route path="/followers/:id" component={Subscribs} />
        <Route path="/following/:id" component={Subscribs} />
        <Route path="/postlike/:id" component={Likes} />
        <Route path="/" component={NotFound} />
      </Switch>
    </React.Suspense>
  );
};

export default connect(mapStateToProps)(React.memo(Routes));
