import React, {Component} from 'react';
import '../styles/bigpost.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {connect} from "react-redux";
import {fetchPostById, getPostById} from "../action-creators/postActionCreator";
import PropTypes from "prop-types";
import {fetchComments, createComment} from "../action-creators/commentActionCreator";
import Comment from "./Comment";

class BigPost extends Component {

    componentDidMount() {
        this.props.getPostById(this.props.match.params.postId);
        this.props.fetchComments(this.props.match.params.postId, 1)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.post === undefined) {
            this.props.fetchPostById(this.props.match.params.postId);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments,
            content: ""

        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let babyComment = {
            content: this.state.content,
            likes: 0,
            dislikes: 0,
        };
        this.setState({content: ""});
        this.props.createComment(babyComment, this.props.match.params.postId);

    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            content: event.target.value
        });
    }

    render() {
        /*Creating html of comments received in props*/
        let a = typeof (this.props.post) === "undefined" ? "" : this.props.post;
        let commentElements = "";
        if (typeof this.props.comments.content !== "undefined") {
            commentElements = this.props.comments.content.map(comment => {
                    return <Comment key={comment.comment.id} idr={comment.comment.id}
                                    content={comment.comment.content} likes={comment.comment.likes}
                                    dislikes={comment.comment.dislikes} attitude={comment.attitudeDto}
                                    owner={comment.comment.owner} userId={comment.comment.userId}/>
                }
            );
        }
        return (
            <div className="bigpost-wrapper">
                {/*Dominikuv kod :)*/}
                <div className="bigpost">
                    <div className="bigpost-header"><i onClick={() => {
                        this.props.delete(this.props.id)
                    }} className="hover fas fa-trash"/>{a.title}</div>
                    <div dangerouslySetInnerHTML={{__html: a.content}} className="bigpost-body"/>

                    <div className="bigpost-footer">
                        <ul>
                            <li><i className="fas fa-angle-up fa-2x interactive-button"/></li>
                            <li className="bigpost-like">{a.likes}</li>
                            <li><i className="fas fa-angle-down fa-2x interactive-button"/></li>
                            <li className="bigpost-dislike">{a.dislikes}</li>
                        </ul>

                    </div>

                </div>
                <div className="bigpost-form">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <textarea className="bigpost-textarea" rows="3"
                                  placeholder="What are your thoughts about this?"
                                  onChange={this.handleChange.bind(this)}
                                  value={this.state.content}/>
                        <input type="submit" className="bigpost-submit-button" value="Comment"/>
                    </form>

                </div>
                {/*Displaying the comments html*/}
                <div className="comments-wrapper">
                    {commentElements}
                </div>
            </div>
        );
    }
}

BigPost.propTypes = {
    getPostById: PropTypes.func.isRequired,
    fetchPostById: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    post: state.forums.post,
    comments: state.forums.comments,
});


const mapDispatchToProps = (dispatch) => ({
    getPostById: (id) => {
        dispatch(getPostById(id))
    },
    fetchPostById: (id) => {
        dispatch(fetchPostById(id))
    },
    fetchComments: (id, page) => {
        dispatch(fetchComments(id, page))
    },
    createComment: (comment, postId) => {
        dispatch(createComment(comment, postId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BigPost);