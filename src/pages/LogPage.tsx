import { message, Typography, theme } from "antd";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import DarkValue from '../common/darkvalue'
import React, { PropsWithChildren, useEffect, useState } from "react";

const LogRef = React.createRef<HTMLDivElement>();

const { Title } = Typography;

const LogBox: React.FC<PropsWithChildren> = ({ children }) => {
    const { token: { colorBgLayout } } = theme.useToken();
    return <div ref={LogRef} style={{
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
    const [logs, setLogs] = useState("");

    useEffect(() => {
        const eventSource = new EventSource("/kagami-api/logs");

        eventSource.onmessage = event => {
            setLogs(prev => (prev == "" ? event.data : prev + "\n" + event.data));
            if(LogRef.current!.scrollTop > LogRef.current!.scrollHeight - LogRef.current!.offsetHeight - 100){
                LogRef.current!.scrollTop = LogRef.current!.scrollHeight; // - LogRef.current!.offsetHeight;
            }
        };

        eventSource.onerror = err => {
            messageApi.error("连接到日志服务器时出现问题，请查看控制台，或刷新页面");
            console.error(err);
            eventSource.close();
        }

        return () => {
            eventSource.close();
        };
    }, []);

    return <>
        {contextHolder}
        <Title level={2}>日志查询</Title>
        <LogBox>
            <DarkValue.Consumer>
                {value => <SyntaxHighlighter
                    PreTag="div"
                    CodeTag="span"
                    lineNumberStyle={{
                        background: colorBgElevated,
                        marginRight: '0.5em'
                    }}
                    customStyle={{
                        overflowX: 'unset',
                        padding: 'none',
                        background: 'none',
                        fontFamily: "Consolas",
                    }}
                    language="accesslog"
                    showLineNumbers={true}
                    style={value ? a11yDark : a11yLight}>
                    {logs}
                </SyntaxHighlighter>}
            </DarkValue.Consumer>
        </LogBox>
    </>
}