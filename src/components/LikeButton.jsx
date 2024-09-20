import { useContext, useState } from "react";
import { StatusContext } from "../contexts/StatusContext";
import { patchArticleById } from "../utils/api";

const LikeButton = ({ likes, setLikes, article_id }) => {
    const [liked, setLiked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { status, setStatus } = useContext(StatusContext);

    const handleLike = () => {
        setDisabled(true);
        if (liked) {
            setLiked(false);
            setLikes(likes - 1);
            setStatus({ icon: "loading", msg: "You're removing your like.", duration: 0 });
            patchArticleById(article_id, { inc_votes: -1 })
                .then(() => {
                    setStatus({ icon: "success", msg: "You've removed your like.", duration: 3000 });
                    setDisabled(false);
                })
                .catch(() => {
                    setLiked(true);
                    setLikes(likes);
                    setStatus({
                        icon: "error",
                        msg: "There was an issue removing your like, please try again.",
                        colour: "red",
                        duration: 0,
                    });
                    setDisabled(false);
                });
        } else {
            setLiked(true);
            setLikes(likes + 1);
            setStatus({ icon: "loading", msg: "You're liking this article!", colour: "green", duration: 0 });
            patchArticleById(article_id, { inc_votes: 1 })
                .then(() => {
                    setStatus({ icon: "success", msg: "You've liked this article!", colour: "green", duration: 2000 });
                    setDisabled(false);
                })
                .catch(() => {
                    setLiked(false);
                    setLikes(likes);
                    setStatus({
                        icon: "error",
                        msg: "There was an issue liking this article, please try again.",
                        colour: "red",
                        duration: 0,
                    });
                    setDisabled(false);
                });
        }
    };

    return (
        <div
            onClick={handleLike}
            className={`button internal-row ${disabled ? "disabled" : ""}`}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleLike();
            }}
        >
            <img className="icon" src={`/src/assets/like-${liked ? "fill" : "outline"}.svg`} />
            <span>
                {likes} like{likes === 1 ? "" : "s"}
            </span>
        </div>
    );
};

export default LikeButton;
