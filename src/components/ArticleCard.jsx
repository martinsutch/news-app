import { relativeDate } from "../utils/utils";
import { Link } from "react-router-dom";
import AuthorBox from "./AuthorBox";

const ArticleCard = ({ article }) => {
  const placeholder = article === "placeholder";

  return (
    <Link
      to={placeholder ? null : `/../../article/${article.article_id}`}
      state={{ article }}
    >
      <article className="card">
        <div className="internal-row push-apart">
          <span className={`subtle-topic ${placeholder ? "placeholder" : ""}`}>
            {placeholder ? "Topic" : article.topic}
          </span>
          <div className="internal-row push-right">
            <AuthorBox item={placeholder ? "placeholder" : article} />
          </div>
        </div>
        <h2 className={`card-title ${placeholder ? "placeholder" : ""}`}>
          {placeholder ? "Title" : article.title}
        </h2>
        <div className="internal-row">
          <img
            className={`square-img ${placeholder ? "placeholder" : ""}`}
            src={article.article_img_url}
          />
          <div className="internal-column push-left">
            <div className="internal-row push-left">
              <img className="icon" src={"/assets/date-outline.svg"} />
              <span className={placeholder ? "placeholder" : ""}>
                {relativeDate(article.created_at)}
              </span>
            </div>
            <div className="internal-row push-left">
              <img className="icon" src={"/assets/like-outline.svg"} />
              <span className={placeholder ? "placeholder" : ""}>
                {article.votes} like{article.votes === 1 ? "" : "s"}
              </span>
            </div>
            <div className="internal-row push-left">
              <img className="icon" src={"/assets/comment-outline.svg"} />
              <span className={placeholder ? "placeholder" : ""}>
                {article.comment_count} comment
                {article.comment_count === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
