import { ExperimentFilled, HomeFilled } from '@ant-design/icons';
import { MenuProps, App as AntdApp } from 'antd';
import { ConfigProvider, FloatButton, Layout, Menu, theme } from 'antd';
import React, { PropsWithChildren } from 'react';
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

const App: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    let location = useLocation();

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: "#8d18cc",
                borderRadius: 10,
            }
        }} locale={zhCN}>
            <AntdApp>
                <Layout hasSider style={{ minHeight: '100vh' }}>
                    <Sider theme='light'>
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
                            overflow: "scroll",
                            height: "100%",
                        }} id='content'>
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
                                <Outlet />
                                {children}
                            </div>
                            <FloatButton.BackTop style={{ insetBlockEnd: 84 }} target={() => document.getElementById("content")!!} />
                        </Content>
                    </Layout>
                </Layout>
            </AntdApp>
        </ConfigProvider>
    );
};

export default App;