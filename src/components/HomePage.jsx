import { useContext, useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import { StatusContext } from "../contexts/StatusContext";
import FilterMenu from "./FilterMenu";
import { useLocation, useParams } from "react-router-dom";

const HomePage = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [isArticlesLoaded, setIsArticlesLoaded] = useState(false);
  const { setStatus } = useContext(StatusContext);
  const { topic } = useParams();
  const [lastTopic, setLastTopic] = useState(topic);
  const location = useLocation();

  useEffect(() => {
    let statelessLastTopic = lastTopic;
    if (location.pathname === "/") setLastTopic(null);
    if (location.pathname === "/") statelessLastTopic = null;
    if (location.pathname.startsWith("/topic/")) setLastTopic(topic);

    const loadingMessages = [
      { msg: "Loading... please wait...", wait: 2000 },
      {
        msg: "Loading can take a while after a period of inactivity.",
        wait: 10000,
      },
      {
        msg: "It can take 50 seconds or more for the server to spin up.",
        wait: 20000,
      },
      { msg: "Still loading... thanks for being patient!", wait: 40000 },
      {
        msg: "Once the server has initialised, loading will be much quicker!",
        wait: 60000,
      },
      {
        msg: "The server hasn't responded yet. Please try reloading the page.",
        wait: 120000,
      },
    ];
    const timeouts = loadingMessages.map(({ msg, wait }) => {
      return setTimeout(() => {
        setStatus({ icon: "loading", msg, duration: 0 });
      }, wait);
    });

    getArticles(topic || statelessLastTopic)
      .then((articles) => {
        setAllArticles(articles);
        setIsArticlesLoaded(true);
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
        timeouts.forEach(clearTimeout);
      })
      .catch(() => {
        timeouts.forEach(clearTimeout);
        setStatus({
          icon: "error",
          msg: "There was an error fetching data. Please try again.",
          colour: "red",
          duration: 0,
        });
      });
    return () => timeouts.forEach(clearTimeout);
  }, [topic, location]);

  return (
    <div className="page">
      <div className="column">
        <FilterMenu topic={topic} lastTopic={lastTopic} />
        {location.pathname !== "/topic" ? (
          isArticlesLoaded ? (
            allArticles.map((article) => {
              return <ArticleCard key={article.article_id} article={article} />;
            })
          ) : (
            <>
              <ArticleCard key="a" article={"placeholder"} />
              <ArticleCard key="b" article={"placeholder"} />
              <ArticleCard key="c" article={"placeholder"} />
            </>
          )
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
