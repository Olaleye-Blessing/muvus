const GroupAddMessage = ({
    handleChangeUserMessage,
    userMessage,
    handleSendMessage,
}) => {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="groupChat__form-message"
        >
            <textarea
                value={userMessage}
                onChange={(e) => handleChangeUserMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (
                        (e.key === "Enter" || e.code === "Enter") &&
                        !e.shiftKey
                    ) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
                name="message"
                id="message"
                cols="20"
                rows="1"
                placeholder="Enter your message..."
                className="groupChat__form-input"
            ></textarea>
            {/* <button type="submit" className="groupChat__form-send">
                send
            </button> */}
        </form>
    );
};

export default GroupAddMessage;
