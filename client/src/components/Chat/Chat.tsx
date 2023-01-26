import useWebSocket from "react-use-websocket";
import { useCallback, useRef } from "react";
import "../../styles/Chat.css";

function Chat() {
  const WS_URL = "ws://127.0.0.1:8000";
  const inputRef = useRef<HTMLInputElement>(null);

  let sendBtnClicked: Function;
  sendBtnClicked = useCallback(() => {
    if (inputRef.current?.value) {
      sendMessage(inputRef.current?.value);
      inputRef.current.value = "";
    }
  }, []);

  const { sendMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: (message) => {
      let data = JSON.parse(message.data);
      if (data.type == "allMessages") {
        for (let msg of data.body) {
          createMsgItem(msg);
        }
      }
      if (data.type == "newMessage") {
        createMsgItem(data.body);
      }
    },
    share: true,
    filter: () => false,
  });

  const onEnterPressed = (e: any) => {
    if (e.code === "Enter") sendBtnClicked();
  };

  const createMsgItem = (msg: string) => {
    let listItem = document.createElement("li");
    listItem.innerText = msg;
    listItem.classList.add("chatMsg");
    document.getElementById("messages")?.appendChild(listItem);
    const msgContainer = document.getElementById("messageContainer");
    if (msgContainer) msgContainer.scrollTo(0, msgContainer.scrollHeight);
  };

  return (
    <div id="chat" style={{ maxWidth: "190px" }}>
      <p style={{ borderBottom: "1px solid black", fontWeight: "bold" }}>
        Chatinator
      </p>
      <div
        style={{ height: "70%", overflowY: "scroll", wordWrap: "break-word" }}
        id="messageContainer"
      >
        <ul id="messages"></ul>
      </div>
      <div>
        <input
          ref={inputRef}
          onKeyDown={onEnterPressed}
          style={{ width: "90%" }}
        ></input>
        <button onClick={() => sendBtnClicked()}>Senden</button>
      </div>
    </div>
  );
}

export default Chat;
