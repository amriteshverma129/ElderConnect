import { Dispatch, SetStateAction } from "react";

export type LayoutProps = {
    showNavBar?: boolean;
    showFooter?: boolean;
};

export type linktype = {
    label: string;
    path: string;
    tab: string;
};
export interface SideBarProps {
    setShow: Dispatch<SetStateAction<boolean>>;
    setClass: Dispatch<SetStateAction<string>>;
    show: boolean;
}
