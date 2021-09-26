export const groupChatReducer = (state, { type, payload }) => {
    if (type === "group_exists") {
        // let { exists, name } = payload;
        state = { ...state, ...payload };
    }
    if (type === "messages") {
        state = { ...state, messages: payload };
    }
    if (type === "coverPic") {
        state = { ...state, coverPic: payload };
    }
    return state;
};
