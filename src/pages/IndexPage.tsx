import { Button, message } from "antd";
import api from "../common/api";

export default function Index() {
    const [messageApi, contextHolder] = message.useMessage();

    return <>
        {contextHolder}
        <Button onClick={() => { api.ping().then(data => {
            messageApi.success(data, 1)
        }).catch(error => {
            messageApi.error(String(error))
        }) }}>Ping</Button>
    </>
}