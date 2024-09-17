import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"
import ArticleCard from "./ArticleCard"

const HomePage = () => {
    const [allArticles, setAllArticles] = useState([])
    const [isArticlesLoaded, setIsArticlesLoaded] = useState(false)
    useEffect(()=>{
        getArticles().then((articles) => {
            setAllArticles(articles)
            setIsArticlesLoaded(true)
            console.log(articles)
        })
    },[])

    return (
        <div className="page">

            <div className="column">
            {isArticlesLoaded ? allArticles.map((article) => {
                return <ArticleCard key={article.article_id} article={article} />
            }) : "Loading... please wait..."}
            </div>

        </div>
    )
}

export default HomePage