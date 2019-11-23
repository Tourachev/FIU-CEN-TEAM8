import React, { Component } from "react";
import CommentList from "../CommentList";
import FormComponent from "../FormComponent";
import Context from "../Context";
import { Link } from "react-router-dom";

export default class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      loading: false,
      bookid: this.props.bookid
    };

    this.addComment = this.addComment.bind(this);
  }

  /**
   *
   * @param {Adcomment} comment
   */
  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  // componentDidMount() {
  //   //loading
  //   this.setState({ loading: true });

  //   //get all the comments
  //   fetch("/api/comments")
  //     .then(res => res.json())
  //     .then(comments => {
  //       this.setState(
  //         {
  //           comments: comments,
  //           loading: false
  //         },
  //         () => console.log("Comments fetched..", comments)
  //       );
  //     });
  //   // .catch(err => {
  //   //   this.setState({ loading: false });
  //   // });
  // }

  componentDidMount() {
    //loading mode
    this.setState({ loading: true });

    fetch("/personal-info", {
      method: "POST",
      body: JSON.stringify({ username: this.props.username }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(personalInfo =>
        this.setState({
          nickname: personalInfo.nickname
        })
      )
      .catch(err => {
        console.log(err);
      });

    //get all the comments
    fetch("/comments/getComments", {
      method: "POST",
      body: JSON.stringify({
        bookid: this.props.bookid
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,

          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  form() {
    if (this.props.isLoggedIn) {
      return (
        <FormComponent
          addComment={this.addComment}
          username={this.props.username}
          bookid={this.props.bookid}
          nickname={this.props.nickname}
        />
      );
    } else {
      return (
        <div class='ohoh'>
          <p class='lead'>Looks like you're not logged in!</p>
          <p class='lead'>Click below to get to the login page.</p>
          <hr class='my-4' />
          <p class='lead'>
            <Link to='/login'>
              <button type='button' class='btn btn-outline-primary btn-block'>
                Take Me There!
              </button>
            </Link>
          </p>
        </div>
      );
    }
  }

  render() {
    // const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
    // const { comments, loading } = this.state;
    return (
      <Context.Consumer>
        {context => (
          <React.Fragment>
            <div className='App container bg-light shadow'>
              <div className='row'>
                <div className='col-4  pt-3 border-right'>
                  {this.form()}
                </div>
                <div className='col-8  pt-3 bg-white'>
                  {/* Comment List Component */}
                  <CommentList
                    loading={this.state.loading}
                    comments={this.state.comments}
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </Context.Consumer>
    );
  }
}
