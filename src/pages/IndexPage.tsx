import { Space, Button, message, Typography, Card, Statistic, Col, Row } from "antd";
import { Liquid } from '@ant-design/plots';

import api from "../common/api";

const { Title } = Typography;

const StateLiquid = () => {
    const config = {
        autoFit: true,
        percent: 0.314,
        style: {
            outlineBorder: 4,
            outlineDistance: 8,
            waveLength: 128,
        },
    };
    return <Liquid {...config} />;
};

export default function Index() {
    const [messageApi, contextHolder] = message.useMessage();

    return <>
        {contextHolder}
        <Title>小镜 Bot 超级无敌的后台</Title>
        <Space direction="vertical" size={16} style={{ display: 'flex' }}>
            <Card title="小镜状态">
                <Card title="粑粑" type="inner">
                    <Row gutter={16}>
                        <Col span={12}><Statistic title="粑粑数" value={114514} /></Col>
                        <Col span={12}><Statistic title="粑粑数" value={114514} /></Col>
                    </Row>
                </Card>
            </Card>
            <Card title="这是什么，按一下">
                <Button onClick={() => {
                    api.ping().then(data => {
                        messageApi.success(data, 1)
                    }).catch(error => {
                        messageApi.error(String(error))
                    })
                }}>Ping</Button>
            </Card>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card title="粑粑库存">
                        <StateLiquid />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="粑粑库存">
                        <StateLiquid />
                    </Card>
                </Col>
            </Row>
        </Space>
    </>
}