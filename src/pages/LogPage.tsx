import { Space, message, Typography, theme, Alert } from "antd";

import api from "../common/api";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import DarkValue from '../common/darkvalue'

const logText = `2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:50 [INFO] 群 114514114 群成员信息刷新了一次
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-30 22:14:03 [INFO] Matcher(type='', module=src.base.event.event_root, lineno=36) running complete
2024-08-31 16:46:23 [ERROR] Running Matcher(type='', module=src.base.event.event_root, lineno=36) failed.
`

const { Title } = Typography;

const LogBox = ({ children }) => {
    const { token: { colorBgLayout, borderRadiusLG } } = theme.useToken();
    return <div style={{
        height: 500,
        width: '100%',
        borderRadius: 8,
        overflowY: 'scroll',
        boxSizing: 'border-box',
        background: colorBgLayout
    }}>{children}</div>
}

export default function Index() {
    const [messageApi, contextHolder] = message.useMessage();

    const { token: { colorBgElevated } } = theme.useToken();

    return <>
        {contextHolder}
        <Title level={2}>日志查询</Title>
        <Alert
            message="接口未完全实现"
            description="目前显示的并非真实日志，待 SSE 接入。"
            style={{
                marginBottom: 12
            }}
            type="info"
            showIcon
        />
        <LogBox>
            <DarkValue.Consumer>
                { value => <SyntaxHighlighter
                    PreTag="div"
                    CodeTag="span"
                    lineNumberStyle={{
                            background: colorBgElevated,
                            marginRight: '0.5em'
                        }}
                    customStyle={{
                        overflowX: 'none',
                        padding: 'none',
                        background: 'none',
                        fontFamily: "Consolas",
                    }}
                    language="accesslog"
                    showLineNumbers={true}
                    style={ value ? a11yDark : a11yLight}>
                    { logText }
                </SyntaxHighlighter>}
            </DarkValue.Consumer>
        </LogBox>
    </>
}