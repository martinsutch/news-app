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

export const getArticleById = (article_id) => {
    return api.get(`/articles/${article_id}`).then(({ data: { article } }) => {
        return article;
    });
};

export const getCommentsByArticleId = (article_id) => {
    return api.get(`/articles/${article_id}/comments`).then(({ data: { comments } }) => {
        return comments;
    });
};

export const patchArticleById = (article_id, data) => {
    return api.patch(`/articles/${article_id}`, data).then(({ data: { comment } }) => {
        return comment;
    });
};
