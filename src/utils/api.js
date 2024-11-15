import axios from "axios";

const api = axios.create({
    baseURL: "https://nc-news-n3b4.onrender.com/api",
});

export const getArticles = (topic) => {
    return api.get(`/articles${topic ? `?topic=${topic}` : ""}`).then(({ data: { articles } }) => {
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
    return api.patch(`/articles/${article_id}`, data).then(({ data: { article } }) => {
        return article;
    });
};

export const postComment = (article_id, data) => {
    return api.post(`/articles/${article_id}/comments`, data).then(({ data: { comment } }) => {
        return comment;
    });
};

export const deleteComment = (comment_id) => {
    return api.delete(`/comments/${comment_id}`).then(() => {
        return;
    });
};

export const getTopics = () => {
    return api.get("/topics").then(({ data: { topics } }) => {
        return topics;
    });
};
