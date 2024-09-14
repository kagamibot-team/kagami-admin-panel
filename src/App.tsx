import { ExperimentFilled, HomeFilled } from '@ant-design/icons';
import { MenuProps, App as AntdApp } from 'antd';
import { ConfigProvider, FloatButton, Layout, Menu, theme } from 'antd';
import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: "/",
        label: "首页",
        icon: <HomeFilled />,
    },
    {
        key: "/test",
        label: "测试页",
        icon: <ExperimentFilled />
    }
];

const OutBox: React.FC<PropsWithChildren<{}>> = (slot) => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <div
            style={{
                padding: 24,
                minHeight: "calc(100% - 32px)",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                margin: '16px 0',
                boxSizing: "border-box"
            }}
        >
            {slot.children}
        </div>
    );
};

const App: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    // 动态检测暗黑模式
    const queryDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const [themeStyle, setThemeStyle] = useState(queryDarkMode.matches ? true : false);
    useEffect(() => {
        queryDarkMode.addEventListener("change", () => {
            setThemeStyle(queryDarkMode.matches ? true : false)
        })
    })


    const navigate = useNavigate();
    let location = useLocation();

    return (
        <ConfigProvider theme={{
            algorithm: themeStyle ? theme.darkAlgorithm : theme.defaultAlgorithm,
            cssVar: true,
            token: {
                colorPrimary: "#8d18cc",
                borderRadius: 10,
            }
        }} locale={zhCN}>
            <AntdApp>
                <Layout hasSider style={{ minHeight: '100vh' }}>
                    <Sider theme='light' breakpoint="lg" collapsedWidth="0">
                        <div style={{
                            fontSize: 18,
                            marginLeft: 30,
                            marginTop: 20,
                            marginBottom: 12,
                            fontWeight: 700
                        }}>小镜 BOT 后台</div>
                        <Menu selectedKeys={[location.pathname]} mode="inline" items={items} onClick={({ key }) => {
                            if (key != location.pathname) {
                                navigate(key);

                            }
                        }} />
                    </Sider>
                    <Layout style={{ height: "100vh" }}>
                        <Content style={{
                            padding: '0 16px',
                            boxSizing: 'border-box',
                            overflowY: "scroll",
                            height: "100%",
                        }} id='content'>
                            <OutBox>
                                <Outlet />
                                {children}
                            </OutBox>
                            <FloatButton.BackTop style={{ insetBlockEnd: 84 }} target={() => document.getElementById("content")!!} />
                        </Content>
                    </Layout>
                </Layout>
            </AntdApp>
        </ConfigProvider>
    );
};

export default App;