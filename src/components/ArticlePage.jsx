import { useParams } from "react-router-dom"
import FullArticle from "./FullArticle";
import { useContext, useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../utils/api";
import { StatusContext } from "../contexts/StatusContext";

const ArticlePage = () => {
    const { article_id } = useParams();
    const [commentsIsLoaded, setCommentsIsLoaded] = useState(false)
    const [allComments, setAllComments] = useState([])
    const { status, setStatus } = useContext(StatusContext);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setStatus({icon: "loading", msg: "Loading... please wait...", duration: 0})
        }, 2000)
        window.scrollTo(0, 0)
        getCommentsByArticleId(article_id).then((comments) => {
            setAllComments(comments)
            setCommentsIsLoaded(true)
            setStatus((prevStatus) => {
                if (prevStatus.duration === 0 && prevStatus.icon === "loading") {
                    return { icon: "success", msg: "Page loaded!", colour: "green", duration: 2000 };
                }
                return prevStatus;
            });
            clearTimeout(loadingTimeout)
        })
        .catch(() => {
            clearTimeout(loadingTimeout)
            setStatus({icon: "error", msg: "There was an error fetching data. Please try again.", colour:"red", duration: 0})
        })
    }, [])

    return (
        <div className="page">
            <div className="column">
                <FullArticle article_id={article_id} />
                {commentsIsLoaded ? allComments.map((comment) => {
                    return <CommentCard key={comment.comment_id} comment={comment} />
                }) : "Loading... please wait..."}
            </div>
        </div>
    )
}

export default ArticlePage