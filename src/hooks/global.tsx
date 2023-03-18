import toast, { ToastOptions } from "react-hot-toast";
import React, { createContext, useCallback, useContext, PropsWithChildren } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { fail, info, success } from "../theme";
import { FiAlertOctagon } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { detectMobileService } from "../services/detectMobile.service";

type INotifyTypes = "error" | "success" | "alert";

interface GlobalContextData {
    paginationLimit: number
    notify: (message: string, type: INotifyTypes) => void
    notifyOnly: (message: string, type: INotifyTypes) => void
    isMobile: boolean
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

const IconToast = {
    error: <TiDeleteOutline style={{ marginRight: 10 }} size={26} color={fail} />,
    success: <BiCheckCircle style={{ marginRight: 10 }} size={26} color={success} />,
    alert: <FiAlertOctagon style={{ marginRight: 10 }} size={26} color={info} />,
}

const notifyProps: ToastOptions = {
    position: "top-right",
    duration: 10000,
    style: {
        padding: 0,
        hyphens: "auto",
        maxWidth: 300,
        display: "flex",
        alignItems: "center"
    }
}

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const paginationLimit = 10

    const isMobile = detectMobileService(navigator.userAgent || navigator.vendor, "http://detectmobilebrowser.com/mobile")

    const notify = (message: string, type: "error" | "success" | "alert") => toast((t) => (
        <span onClick={() => toast.dismiss(t.id)} style={{ display: "flex", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <div>{IconToast[type]}</div>
            <div style={{ cursor: "default", textAlign: "center" }}>{message}</div>
        </span>
    ), notifyProps);

    const notifyOnlyAction = (message: string, type: "error" | "success" | "alert") => toast((t) => (
        <span onClick={() => toast.dismiss(t.id)} style={{ display: "flex", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <div>{IconToast[type]}</div>
            <div style={{ cursor: "default", textAlign: "center" }}>{message}</div>
        </span>
    ), notifyProps);

    const notifyOnly = useCallback((message: string, type: "error" | "success" | "alert") => {
        toast.dismiss()
        setTimeout(() => {
            toast.dismiss()
            notifyOnlyAction(message, type)
        }, 100)
    }, [])

    window.onresize = () => {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    return (
        <GlobalContext.Provider value={{ notifyOnly, notify, isMobile, paginationLimit }}>
            {children}
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