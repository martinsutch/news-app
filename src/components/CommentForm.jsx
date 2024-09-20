import { useContext, useEffect } from "react";
import { useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { StatusContext } from "../contexts/StatusContext";
import { postComment } from "../utils/api";

const CommentForm = ({ article_id, isCommentingDisabled, setIsCommentingDisabled, setIsCommenting }) => {
    const [body, setBody] = useState("");
    const [isBodyValid, setIsBodyValid] = useState(false);
    const [bodyPrompt, setBodyPrompt] = useState("*");
    const { activeUser } = useContext(ActiveUserContext);
    const { setStatus } = useContext(StatusContext);

    useEffect(() => {
        const draft = JSON.parse(localStorage.getItem("draftComment"));
        if (draft && draft.article_id === article_id && draft.username === activeUser.username) {
            setBody(draft.body);
            if (draft.body === "") {
                setBodyPrompt("*");
                setIsBodyValid(false);
            } else {
                setBodyPrompt("*");
                setIsBodyValid(true);
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsCommentingDisabled(true);
        setStatus({ icon: "loading", msg: "Posting your comment...", duration: 0 });

        postComment(article_id, { username: activeUser.username, body })
            .then(() => {
                setIsCommentingDisabled(false);
                setIsCommenting(false);
                setBody("");
                setStatus({ icon: "success", msg: "Your comment has been posted!", colour: "green", duration: 3000 });
                localStorage.removeItem("draftComment");
            })
            .catch(() => {
                setIsCommentingDisabled(false);
                setIsCommenting(true);
                setStatus({
                    icon: "error",
                    msg: "There was an issue posting your comment, please try again.",
                    colour: "red",
                    duration: 10000,
                });
            });
    };

    const handleChange = (e) => {
        setBody(e.target.value);
        if (e.target.value === "") {
            setBodyPrompt("*");
            setIsBodyValid(false);
        } else {
            setBodyPrompt("*");
            setIsBodyValid(true);
        }
    };

    const handleBlur = () => {
        localStorage.setItem("draftComment", JSON.stringify({ article_id, username: activeUser.username, body }));
        if (body === "") {
            setBodyPrompt("required *");
            setIsBodyValid(false);
        } else {
            setBodyPrompt("*");
            setIsBodyValid(true);
        }
    };

    return (
        <form className="card internal-column form" onSubmit={handleSubmit}>
            <div className="internal-row push-apart">
                <label>Write a comment:</label>
                <span className={isBodyValid ? "" : "red-text"}>{bodyPrompt}</span>
            </div>
            <textarea
                autoFocus
                value={body}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={isCommentingDisabled ? true : false}
            />
            <div className="internal-row full-width push-right">
                <button className={`button ${!isBodyValid || isCommentingDisabled ? "disabled" : ""}`} type="submit">
                    Post
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
