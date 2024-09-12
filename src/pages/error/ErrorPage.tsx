import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    return <Empty description="你来到了没有页面的荒原">
        <Button onClick={() => navigate(-1)}>返回上一页</Button>
    </Empty>
}