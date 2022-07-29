import "./styles.css";
import { SendBirdProvider, ChannelList, Channel } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChannelPreview from "./ChannelPreview";

export default function App({ user, theme }) {
  const [channel, setChannel] = useState(null);

  const onChannelSelect = (_channel) => {
    setChannel(_channel);
    window.history.pushState({}, _channel.name, "/" + _channel.url);
  };

  const onBack = () => {
    setChannel(null);
    window.history.pushState({}, document.title, "/");
  };


  return (
    <div className={"SendBirdApp " + (theme ? "dark" : null)}>
      <SendBirdProvider userId={user} appId="CB108BAB-EB6F-4BA7-A7C5-40E73836AAE1">
        {channel ? (
          <Channel
            channelUrl={channel.url}
            renderChatHeader={({ channel, user }) => (
              <ChatHeader channel={channel} user={user} onBack={onBack} />
            )}
          />
        ) : (
          <ChannelList
            renderChannelPreview={({ channel }) => (
              <ChannelPreview
                channel={channel}
                onChannelSelect={onChannelSelect}
              />
            )}
          />
        )}
      </SendBirdProvider>
    </div>
  );
}
