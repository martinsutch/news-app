import { relativeDate } from "../utils/utils"
import AuthorBox from "./AuthorBox"

const CommentCard = ({ comment }) => {
    return (
        <div className="card internal-column">
            <div className="internal-row push-apart">
                <div className="internal-row push-left">
                    <img className="icon" src={"/src/assets/date-outline.svg"}/>
                    <span>{relativeDate(comment.created_at)}</span>
                </div>
                <div className="internal-row push-right">
                    <AuthorBox className="internal-row push-right" item={comment}/>
                </div>
            </div>
            <div>
                <p>{comment.body}</p>
            </div>
            <div className="internal-row push-apart">
                <div className="internal-row push-left">
                    <img className="icon" src={"/src/assets/like-outline.svg"}/>
                    <span>{comment.votes} likes</span>
                </div>
            </div>
        </div>
    )
}

export default CommentCard