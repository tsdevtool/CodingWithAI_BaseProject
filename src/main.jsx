import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserHistory } from 'history';
import './index.css';
import Login from './container/Auth/Login';
import CodeEditorWrapper from './Code_Editor/code_editor.jsx';
import AI_chat from './main/AI_chat.jsx';

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* <AI_chat /> */}
		<CodeEditorWrapper />
		{/* <HistoryBrowserRouter history={history}>
			<App />
		</HistoryBrowserRouter> */}
	</React.StrictMode>,
);
