import axios from "axios";

const api = axios.create({
    baseURL: "https://nc-news-n3b4.onrender.com/api",
});

export const getArticles = () => {
    return api.get("/articles").then(({ data: { articles } }) => {
        return articles;
    });
};

export const getUserByUsername = (username) => {
    return api.get(`/users/${username}`).then(({ data: { user } }) => {
        return user;
    });
};
