import { useEffect, useState } from "react"
import { getUserByUsername } from "../utils/api"
import { relativeDate } from "../utils/utils"
import { Link } from "react-router-dom"
import AuthorBox from "./AuthorBox"

const ArticleCard = ({article}) => {

    return (
        <Link to={`/../../article/${article.article_id}`} state={{article}}>
            <article className="card">
                <div className="internal-row push-apart">
                    <span className="subtle-topic">{article.topic}</span>
                    <div className="internal-row push-right">
                        <AuthorBox item={article}/>
                    </div>
                </div>
                <h2 className="card-title">{article.title}</h2>
                <div className="internal-row">
                    <img className="square-img" src={article.article_img_url} />
                    <div className="internal-column push-left">
                        <div className="internal-row push-left">
                            <img className="icon" src={"/src/assets/date-outline.svg"}/>
                            <span>{relativeDate(article.created_at)}</span>
                        </div>
                        <div className="internal-row push-left">
                            <img className="icon" src={"/src/assets/like-outline.svg"}/>
                            <span>{article.votes} likes</span>
                        </div>
                        <div className="internal-row push-left">
                            <img className="icon" src={"src/assets/comment-outline.svg"}/>
                            <span>{article.comment_count} comments</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default ArticleCard