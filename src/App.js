import Header from './components/Header';
import Panel from './components/Panel';
import Proposals from './components/Proposals/Proposals';

export default function App() {

    return (
        <>
            <Header />
            <main className="main container">
                <Panel />
                <Proposals />
            </main>
        </>
    );
}
