const GroupMessages = ({ messages, user }) => {
    messages = [...messages].filter(({ from }) => from !== "fake document");

    const convertDateToReadableDate = (date) =>
        date.toDate().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

    const extractTimeFromDate = (date) =>
        date.toDate().toLocaleTimeString("en-US");

    return (
        <ul className="groupChat__lists">
            {messages.map(({ message, from, createdAt, email }, i) => (
                <li
                    key={`${from}${i}`}
                    className={`groupChat__list ${
                        user === email ? "sent" : ""
                    }`}
                >
                    <figure className="groupChat__user-avatar">
                        {from[0]}
                    </figure>
                    <div className="groupChat__user-detail">
                        <h4 className="groupChat__user-name">{from}</h4>
                        <p className="groupChat__user-msg">{message}</p>
                        <div className="groupChat__user-period">
                            <span className="groupChat__user-date">
                                {convertDateToReadableDate(createdAt)}
                            </span>
                            <span className="groupChat__user-time">
                                {extractTimeFromDate(createdAt)}
                            </span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GroupMessages;
