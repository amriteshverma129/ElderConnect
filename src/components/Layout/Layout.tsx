import Footer from "./Footer";
import Nav from "./Nav";
import { Container, Box } from "@mui/material";
import { LayoutProps } from "./Type";
import styles from "./Style/layout.module.scss";
//import NotificationBar from "../Account/NotificationBar";
import TrialPeriodModal from "../Modal/TrialPeriodModal";

export const Layout: React.FunctionComponent<LayoutProps> = ({ children, showNavBar = true, showFooter = true }) => {
    return (
        <div className={styles["layout"]}>
            {showNavBar && <Nav />}
            {/* <NotificationBar /> */}
            <TrialPeriodModal />
            <Container maxWidth={false} sx={{ p: { xs: "0px" } }}>
                <Box sx={{ flexGrow: 1 }}>{children}</Box>
            </Container>
            {showFooter && <Footer />}
        </div>
    );
};
