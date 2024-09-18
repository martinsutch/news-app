import { useParams } from "react-router-dom"
import FullArticle from "./FullArticle";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../utils/api";

const ArticlePage = () => {
    const { article_id } = useParams();
    const [commentsIsLoaded, setCommentsIsLoaded] = useState(false)
    const [allComments, setAllComments] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        getCommentsByArticleId(article_id).then((comments) => {
            setAllComments(comments)
            setCommentsIsLoaded(true)
        })
    }, [])

    return (
        <div className="page">
            <div className="column">
                <FullArticle article_id={article_id} />
                {commentsIsLoaded ? allComments.map((comment) => {
                    return <CommentCard comment={comment} />
                }) : "Loading... please wait..."}
            </div>
        </div>
    )
}

export default ArticlePage