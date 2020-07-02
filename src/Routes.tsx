import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { IRootState } from "./store/rootReducer";

const Posts = React.lazy(() => import("./components/Posts"));
const Login = React.lazy(() => import("./components/auth/Login"));
const Singin = React.lazy(() => import("./components/auth/Singin"));
const Settings = React.lazy(() => import("./components/user/Settings"));
const Profile = React.lazy(() => import("./components/user/Profile"));
const RegSuccess = React.lazy(() => import("./components/auth/RegSuccess"));
const PostCard = React.lazy(() => import("./components/PostCard"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const AddPost = React.lazy(() => import("./components/AddPost"));
const PostSuccess = React.lazy(() =>
  import("./components/AddPost/PostSuccess")
);
const Likes = React.lazy(() => import("./components/Likes"));
// const MyMessages = React.lazy(() =>
//   import("./components/MyMessages/MyMessages")
// );

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
        {props.authToken && <Redirect exact from="/singin" to="/" />}
        <Route exact path="/singin" component={Singin} />
        {!props.authToken && <Route path="/" component={Login} />}

        <Route exact path="/" component={Posts} />
        <Route exact path="/q-:q/page-:id" component={Posts} />
        <Route exact path="/page-:id" component={Posts} />
        <Route exact path="/q-:q" component={Posts} />

        <Route exact path="/myposts" component={Posts} />
        <Route exact path="/myposts/q-:q/page-:id" component={Posts} />
        <Route exact path="/myposts/page-:id" component={Posts} />
        <Route exact path="/myposts/q-:q" component={Posts} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/singin" component={Singin} />
        <Route exact path="/regsuccess" component={RegSuccess} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/user/:id" component={Profile} />
        {/* <Route exact path="/mymessages" component={MyMessages} />
        <Route exact path="/mymessages/page-:id" component={MyMessages} /> */}
        <Route path="/postcard/:id" component={PostCard} />
        <Route exact path="/addpost" component={AddPost} />
        <Route path="/postedit-:id" component={AddPost} />
        <Route exact path="/postsaccess" component={PostSuccess} />
        <Route path="/likes" component={Likes} />
        <Route path="/postlike/:id" component={Likes} />
        <Route path="/" component={NotFound} />
      </Switch>
    </React.Suspense>
  );
};

export default connect(mapStateToProps)(React.memo(Routes));
