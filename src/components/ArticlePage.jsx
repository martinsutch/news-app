import { useParams } from "react-router-dom"
import FullArticle from "./FullArticle";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../utils/api";

const ArticlePage = () => {
    const { article_id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="page">
            <div className="column">
                <FullArticle article_id={article_id} />
            </div>
        </div>
    )
}

export default ArticlePage