import { useParams } from "react-router-dom";
import FullArticle from "./FullArticle";
import { useContext, useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../utils/api";
import { StatusContext } from "../contexts/StatusContext";
import CommentForm from "./CommentForm";

const ArticlePage = () => {
    const { article_id } = useParams();
    const [commentsIsLoaded, setCommentsIsLoaded] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const [isCommenting, setIsCommenting] = useState(false);
    const [isCommentingDisabled, setIsCommentingDisabled] = useState(false);
    const { setStatus } = useContext(StatusContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setStatus({ icon: "loading", msg: "Loading... please wait...", duration: 0 });
        }, 3000);
        getCommentsByArticleId(article_id)
            .then((comments) => {
                setAllComments(comments);
                setCommentsIsLoaded(true);
                setStatus((prevStatus) => {
                    if (prevStatus.duration === 0 && prevStatus.icon === "loading") {
                        return { icon: "success", msg: "Page loaded!", colour: "green", duration: 2000 };
                    }
                    return prevStatus;
                });
                clearTimeout(loadingTimeout);
            })
            .catch(() => {
                clearTimeout(loadingTimeout);
                setStatus({
                    icon: "error",
                    msg: "There was an error fetching data. Please try again.",
                    colour: "red",
                    duration: 0,
                });
            });
    }, [isCommenting]);

    return (
        <div className="page">
            <div className="column">
                <FullArticle article_id={article_id} isCommenting={isCommenting} setIsCommenting={setIsCommenting} />
                {isCommenting ? (
                    <CommentForm
                        article_id={article_id}
                        isCommentingDisabled={isCommentingDisabled}
                        setIsCommentingDisabled={setIsCommentingDisabled}
                        setIsCommenting={setIsCommenting}
                    />
                ) : commentsIsLoaded ? (
                    allComments.map((comment) => <CommentCard key={comment.comment_id} comment={comment} />)
                ) : (
                    "Loading... please wait..."
                )}
            </div>
        </div>
    );
};

export default ArticlePage;
