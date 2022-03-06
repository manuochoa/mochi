import { useState } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import Proposals from './components/Proposals/Proposals';
import NotificationProvider from './contexts/NotificationProvider';
import ConnectPopup from './components/ConnectPopup';

export default function App() {
    const [popupVisible, setPopupVisible] = useState(false);

    return (
        <NotificationProvider>
            <Header setPopupVisible={setPopupVisible} />
            <main className="main container">
                <Panel />
                <Proposals />
            </main>
            <ConnectPopup popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
        </NotificationProvider>
    );
}
