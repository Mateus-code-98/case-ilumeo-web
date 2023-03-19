import toast, { ToastOptions } from "react-hot-toast";
import React, { createContext, useCallback, useContext, PropsWithChildren, useState, useEffect } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { fail, info, success } from "../theme";
import { FiAlertOctagon } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { calculateVH } from "../services/calculateVH.service";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { detectMobileService } from "../services/detectMobile.service";

type INotifyTypes = "error" | "success" | "alert";

interface GlobalContextData {
    paginationLimit: number
    notify: (message: string, type: INotifyTypes) => void
    notifyOnly: (message: string, type: INotifyTypes) => void
    isMobile: boolean
    scrollBarVisible: boolean
    scrollIsDown: boolean
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

const IconToast = {
    error: <TiDeleteOutline style={{ marginRight: 10 }} size={26} color={fail} />,
    success: <BiCheckCircle style={{ marginRight: 10 }} size={26} color={success} />,
    alert: <FiAlertOctagon style={{ marginRight: 10 }} size={26} color={info} />,
}

const notifyProps: ToastOptions = {
    position: "top-right",
    duration: 1000000,
    style: {
        padding: 0,
        hyphens: "auto",
        maxWidth: 300,
        display: "flex",
        alignItems: "center"
    }
}

const isBodyScrolledDown = () => {
    return document.documentElement.scrollTop > 0 || document.body.scrollTop > 0;
}

const isBodyScrollBarVisible = () => {
    return document.documentElement.scrollHeight > document.documentElement.clientHeight || document.body.scrollHeight > document.body.clientHeight;
}

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const paginationLimit = 10

    const [isMobile, setIsMobile] = useState(false)
    const [scrollIsDown, setScrollIsDown] = useState(false)
    const [controlResize, setControlResize] = useState(false)
    const [controlScroll, setControlScroll] = useState(false)
    const [scrollBarVisible, setScrollBarVisible] = useState(false)

    const notify = (message: string, type: "error" | "success" | "alert") => toast((t) => (
        <span onClick={() => toast.dismiss(t.id)} style={{ display: "flex", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{IconToast[type]}</div>
            <div style={{ cursor: "default", textAlign: "center", color: "#000", fontSize: 13 }}>{message}</div>
        </span>
    ), notifyProps);

    const notifyOnlyAction = (message: string, type: "error" | "success" | "alert") => toast((t) => (
        <span onClick={() => toast.dismiss(t.id)} style={{ display: "flex", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{IconToast[type]}</div>
            <div style={{ cursor: "default", textAlign: "center", color: "#000", fontSize: 13, }}>{message}</div>
        </span>
    ), notifyProps);

    const notifyOnly = useCallback((message: string, type: "error" | "success" | "alert") => {
        toast.dismiss()
        setTimeout(() => {
            toast.dismiss()
            notifyOnlyAction(message, type)
        }, 100)
    }, [])

    window.onscroll = () => setControlScroll((prev) => !prev)

    window.onresize = () => setControlResize((prev) => !prev)

    useEffect(() => {
        const _isMobile = detectMobileService(navigator.userAgent || navigator.vendor, "http://detectmobilebrowser.com/mobile")
        setIsMobile(_isMobile)
        calculateVH()
        setScrollBarVisible(isBodyScrollBarVisible())
        setScrollIsDown(isBodyScrolledDown())
    }, [controlResize, controlScroll])

    return (
        <GlobalContext.Provider value={{ scrollBarVisible, scrollIsDown, notifyOnly, notify, isMobile, paginationLimit }}>
            {children}
            <ScrollToTopButton open={scrollIsDown} />
        </GlobalContext.Provider>
    )
}

export function useGlobal(): GlobalContextData {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobal must be used within an GlobalProvider")
    }
    return context;
}