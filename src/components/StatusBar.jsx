import { useContext, useEffect, useState } from "react"
import { StatusContext } from "../contexts/StatusContext"

const StatusBar = () => {
    const { status } = useContext(StatusContext);
    const [isVisible, setIsVisible] = useState(false)
    
    useEffect(() => {
        if (status.duration >= 0) setIsVisible(true)
        const timeout = setTimeout(() => {
            if (status.duration) setIsVisible(false)
        },status.duration || 0)
        return () => clearTimeout(timeout)
    }, [status])

    return (
        <div className={`status-bar internal-row ${status.colour} ${isVisible ? "visible" : ""}`}>
                <img className={`status ${status.icon === "loading" ? "spin" : ""}`} src={`/src/assets/${status.icon}.svg`} />
                <span>{status.msg}</span>
        </div>
    )
}

export default StatusBar