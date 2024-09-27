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
            setLogs(prev => {
                // 提前判断是否需要滚动，这样就可以保证一次性更新很多很多行的时候能够正常输出
                let do_auto_scroll = (
                    LogRef.current!.scrollTop > LogRef.current!.scrollHeight - LogRef.current!.offsetHeight - 100
                    || prev.length == 0     // 我添加了提前显示 50 行的特性，最开始还是先滚到最下面比较好
                );
                setTimeout(() => {
                    if (do_auto_scroll) {
                        LogRef.current!.scrollTop = LogRef.current!.scrollHeight; // - LogRef.current!.offsetHeight;
                    }
                }, 0);
                return prev == "" ? event.data : prev + "\n" + event.data;
            });
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
                        fontFamily: "monospace",
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