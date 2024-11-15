import { useContext, useEffect, useState } from "react";
import { getArticleById } from "../utils/api";
import { useLocation } from "react-router-dom";
import { relativeDate } from "../utils/utils";
import AuthorBox from "./AuthorBox";
import LikeButton from "./LikeButton";
import { StatusContext } from "../contexts/StatusContext";

const FullArticle = ({ article_id, isCommenting, setIsCommenting }) => {
  const [article, setArticle] = useState();
  const [articleIsLoaded, setArticleIsLoaded] = useState(false);
  const [bodyIsLoaded, setBodyIsLoaded] = useState(false);
  const { state } = useLocation(); //pre-loaded article passed from home
  const [likes, setLikes] = useState(0);
  const { setStatus } = useContext(StatusContext);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setStatus({
        icon: "loading",
        msg: "Loading... please wait...",
        duration: 0,
      });
    }, 2000);
    if (state) {
      setArticle(state.article);
      setLikes(state.votes);
      setArticleIsLoaded(true);
    }
    getArticleById(article_id)
      .then((updatedArticle) => {
        setArticle(updatedArticle);
        setLikes(updatedArticle.votes);
        setArticleIsLoaded(true);
        setBodyIsLoaded(true);
        setStatus((prevStatus) => {
          if (prevStatus.duration === 0 && prevStatus.icon === "loading") {
            return {
              icon: "success",
              msg: "Page loaded!",
              colour: "green",
              duration: 2000,
            };
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
  }, []);

  const handleClick = () => {
    setIsCommenting(!isCommenting);
  };

  return (
    <>
      <div className="card without-padding column">
        {articleIsLoaded ? (
          <img className="header-img" src={article.article_img_url} />
        ) : (
          <div className="header-img placeholder"></div>
        )}
      </div>
      <article className="card internal-column">
        <span
          className={`subtle-topic ${articleIsLoaded ? "" : "placeholder"}`}
        >
          {articleIsLoaded ? article.topic : "Topic"}
        </span>
        <h2 className={articleIsLoaded ? "" : "placeholder"}>
          {articleIsLoaded ? article.title : "Article Title Loading"}
        </h2>
        {bodyIsLoaded ? (
          <p>{article.body}</p>
        ) : (
          <>
            <span className="placeholder">The article is loading...</span>
            <div className="placeholder internal-row push-apart">
              <span></span>
              <img className="status spin" src={`/assets/loading.svg`} />
              <span></span>
            </div>
            <span className="placeholder">
              Thanks for waiting for this to load...
            </span>
          </>
        )}
        <div className="internal-row push-apart">
          <div className="internal-row push-left">
            <img className="icon" src={"/assets/date-outline.svg"} />
            <span className={articleIsLoaded ? "" : "placeholder"}>
              {articleIsLoaded
                ? relativeDate(article.created_at)
                : "Date created"}
            </span>
          </div>
          <div className="internal-row push-right">
            {articleIsLoaded ? (
              <AuthorBox
                key="load"
                className="internal-row push-right"
                item={article}
              />
            ) : (
              <AuthorBox
                key="placeholder"
                className="internal-row push-right"
                item={"placeholder"}
              />
            )}
          </div>
        </div>
      </article>
      <div className="card internal-row push-evenly">
        <LikeButton likes={likes} setLikes={setLikes} article_id={article_id} />
        <div
          onClick={handleClick}
          className="button internal-row"
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
        >
          <img className="icon" src={"/assets/comment-outline.svg"} />
          <span>
            {articleIsLoaded
              ? article.comment_count +
                " comment" +
                (article.comment_count === 1 ? "" : "s")
              : "0 comments"}
          </span>
        </div>
      </div>
    </>
  );
};

export default FullArticle;
