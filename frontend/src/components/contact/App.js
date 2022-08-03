import { useState } from "react";
import { Channel, ChannelList, SendBirdProvider } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import ChannelPreview from "./ChannelPreview";
import ChatHeader from "./ChatHeader";
import "./styles.css";

export default function App({ user, theme, appId }) {
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
		<div className="SendBirdApp">
			<SendBirdProvider userId={user} appId={appId} theme={theme}>
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
