import { detectMobileService } from "./detectMobile.service";

export const calculateVH = () => {
    const isMobile = detectMobileService(navigator.userAgent || navigator.vendor, "http://detectmobilebrowser.com/mobile")
    if (isMobile) {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    else {
        document.documentElement.style.setProperty('--vh', "1vh");
    }
};