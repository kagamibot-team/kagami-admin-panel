import { Button, Card, Col, Divider, message, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title"
import LeaveWarning from "../components/LeaveWarning";
import { useState } from "react";
import api from "../common/api";

const MessagePage: React.FC = () => {
    const [broadcast_msg, set_broadcast_msg] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    return <>
        {contextHolder}
        <LeaveWarning modified={
            broadcast_msg.length > 0
        } />
        <Title level={2}>消息有关</Title>
        <Divider />
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <Card title="群发消息" type="inner">
                    <Space direction="vertical" style={{ display: "flex" }}>
                        <TextArea
                            autoSize={{ minRows: 5 }}
                            value={broadcast_msg}
                            onChange={e => set_broadcast_msg(e.target.value)}
                            placeholder="要开大喇叭发什么呢……？" />
                        <Button type="primary" disabled={broadcast_msg.length == 0} onClick={
                            () => {
                                api.broadcast({
                                    message: broadcast_msg,
                                    is_admin: false,
                                }).then(data => {
                                    messageApi.success(data);
                                    set_broadcast_msg("");
                                }).catch(error => {
                                    messageApi.error(String(error))
                                })
                            }
                        }>发！</Button>
                    </Space>
                </Card>
            </Col>
        </Row>
    </>
}

export default MessagePage;
