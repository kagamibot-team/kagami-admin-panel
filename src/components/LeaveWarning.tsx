import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

const LeaveWarning: React.FC<{ modified: boolean }> = ({ modified }) => {
    const [open, setOpen] = useState(false);
    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        return modified && !open && currentLocation.pathname != nextLocation.pathname;
    })

    useEffect(() => {
        if (blocker.state == "blocked") {
            setOpen(true);
        }
    }, [blocker]);

    return <Modal centered open={open} onCancel={() => {
        blocker.reset?.();
        setOpen(false);
    }} onOk={() => {
        blocker.proceed?.();
    }}>
        <p>当前页面存在未保存的内容，确认离开吗？</p>
    </Modal>
}

export default LeaveWarning;
