import { useEffect, useState } from "react"
import { getArticleById } from "../utils/api"
import { useLocation } from "react-router-dom";
import { relativeDate } from "../utils/utils";
import AuthorBox from "./AuthorBox";

const FullArticle = ({ article_id }) => {
    const [article, setArticle] = useState();
    const [articleIsLoaded, setArticleIsLoaded] = useState(false)
    const [bodyIsLoaded, setBodyIsLoaded] = useState(false)
    const { state } = useLocation(); //pre-loaded article passed from home
    
    useEffect(() => {
        if (state) {
            setArticle(state.article)
            setArticleIsLoaded(true)
        }
        getArticleById(article_id).then((updatedArticle) => {
            setArticle(updatedArticle)
            setArticleIsLoaded(true)
            setBodyIsLoaded(true)
        })
    },[])
    
    return(
        <>
        {articleIsLoaded ? <>
                <div className="card without-padding column">
                    <img className="header-img" src={article.article_img_url} />
                </div>
                <article className="card internal-column">
                    <span className="subtle-topic">{article.topic}</span>
                    <h2>{article.title}</h2>
                    {bodyIsLoaded ? <p>{article.body}</p> : <p>Loading... please wait...</p>}
                    <div className="internal-row push-apart">
                        <div className="internal-row push-left">
                        <img className="icon" src={"/src/assets/date-outline.svg"}/>
                        <span>{relativeDate(article.created_at)}</span>
                    </div>
                    <div className="internal-row push-right">
                        <AuthorBox className="internal-row push-right" item={article}/>
                    </div>
            </div>
                </article>
                <div className="card internal-row push-evenly">
                    <div className="button internal-row">
                        <img className="icon" src={"/src/assets/like-outline.svg"}/>
                        <span>{article.votes} likes</span>
                    </div>
                    <div className="button internal-row">
                        <img className="icon" src={"/src/assets/comment-outline.svg"}/>
                        <span>{article.comment_count} comments</span>
                    </div>
                </div>
            </> : "Loading... please wait..."}
        </>
    )
}

export default FullArticle