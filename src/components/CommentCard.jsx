import { useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { StatusContext } from "../contexts/StatusContext";
import { relativeDate } from "../utils/utils";
import AuthorBox from "./AuthorBox";
import { deleteComment } from "../utils/api";

const CommentCard = ({ comment }) => {
    const { activeUser } = useContext(ActiveUserContext);
    const { setStatus } = useContext(StatusContext);
    const [deleteDisabled, setDeleteDisabled] = useState(false);
    const [commentDeleted, setCommentDeleted] = useState(false);

    const handleDelete = () => {
        setDeleteDisabled(true);
        setStatus({ icon: "loading", msg: "You're deleting your comment...", duration: 0 });
        deleteComment(comment.comment_id)
            .then(() => {
                setStatus({ icon: "success", msg: "You've deleted your comment.", duration: 3000 });
                setCommentDeleted(true);
            })
            .catch(() => {
                setStatus({
                    icon: "error",
                    msg: "There was an issue deleting your comment, please try again.",
                    colour: "red",
                    duration: 0,
                });
                setDeleteDisabled(false);
            });
    };

    return (
        <>
            {commentDeleted ? null : (
                <div className="card internal-column">
                    <div className="internal-row push-apart">
                        <div className="internal-row push-left">
                            <img className="icon" src={"/src/assets/date-outline.svg"} />
                            <span>{relativeDate(comment.created_at)}</span>
                        </div>
                        <div className="internal-row push-right">
                            <AuthorBox className="internal-row push-right" item={comment} />
                        </div>
                    </div>
                    <div>
                        <p>{comment.body}</p>
                    </div>
                    <div className="internal-row push-apart">
                        <div className="internal-row push-left">
                            <img className="icon" src={"/src/assets/like-outline.svg"} />
                            <span>
                                {comment.votes} like{comment.votes === 1 ? "" : "s"}
                            </span>
                        </div>
                        {activeUser.username === comment.author ? (
                            <div
                                className={`button subtle internal-row ${deleteDisabled ? "disabled" : ""}`}
                                onClick={handleDelete}
                                role="button"
                                tabIndex="0"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") handleDelete();
                                }}
                            >
                                <span>Delete my comment</span>
                                <img className="icon" src={"/src/assets/delete.svg"} />
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentCard;
