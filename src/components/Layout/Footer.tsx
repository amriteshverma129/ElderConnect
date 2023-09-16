import styles from "./Style/footer.module.scss";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import { Avatar } from "@mui/material";
import moment from "moment";
import { useUser } from "../Authenticate/UserContext";

export default function Footer() {
    const { user, userDetails } = useUser();

    return (
        <div className={styles["footer"]}>
            <div className={styles["footer-lists"]}>
                <div>
                    <ul>
                        <li>The LOOP Village</li>
                        <li>
                            <Link href={"/UI/Footer/About Loop Village"} passHref>
                                About LOOP Village
                            </Link>
                        </li>
                        <li>
                            <Link href={"/UI/Footer/About Founders"} passHref>
                                About Founders
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={"/UI/Footer/Careers"} passHref>
                                Careers
                            </Link>
                        </li> */}
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Support</li>
                        <li>
                            <Link href={"/UI/Footer/FAQs"} passHref>
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link href={"/UI/Footer/Contact Us"} passHref>
                                Contact Us
                            </Link>
                        </li>
                        {(user.email || user.phone_number) && (
                            <li>
                                <Link href={"/UI/Footer/Cancellation Process"} passHref>
                                    Cancellation Process
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link href={"/UI/Footer/Report Your Concern"} passHref>
                                Report Your Concern
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Legals</li>
                        <li>
                            <Link href={"/UI/Footer/Privacy Policy"} passHref>
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href={"/UI/Footer/Term Of Use"} passHref>
                                Terms Of Use
                            </Link>
                        </li>
                        <li>
                            <Link href={"/UI/Footer/Fitness Waiver"} passHref>
                                Fitness Waiver
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Quick Links</li>
                        {user &&
                            !userDetails.roles
                                ?.split(",")
                                .some(
                                    (role) =>
                                        role?.trim() === "The Loop Spectrum Role" ||
                                        role?.trim() === "The Loop One Generation Role" ||
                                        role?.trim() === "The Loop USC Role",
                                ) && (
                                <li>
                                    <Link href={"/UI/Account/Purchase Membership"} passHref>
                                        Purchase Membership
                                    </Link>
                                </li>
                            )}
                        <li>
                            <Link href={"/UI/Account/"} passHref>
                                My Account
                            </Link>
                        </li>
                        <li>
                            <Link href={"/UI/Account/Profile"} passHref>
                                My Profile
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={"/"} passHref>
                                Settings
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
            <div className={styles["footer-copyright"]}>
                <div className={styles["footer-copyright-title"]}>
                    <Link href="/UI/Events/" passHref>
                        <Avatar
                            alt="LOOP Tech"
                            src="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                            sx={{ width: 24, height: 24, backgroundColor: "purple", cursor: "pointer" }}
                        />
                    </Link>
                    <span>&copy; {moment().format("YYYY")} The LOOP Village Rights Reserved</span>
                </div>
                <div className={styles["footer-copyright-icons"]}>
                    <span className={styles["footer-copyright-icon"]}>
                        <a
                            href="https://twitter.com/TheLoopVillage"
                            aria-label="twitter"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <TwitterIcon />
                        </a>
                    </span>
                    <span className={styles["footer-copyright-icon"]}>
                        <a
                            href="https://facebook.com/theloopvillage"
                            aria-label="facebook"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FacebookIcon />
                        </a>
                    </span>
                    <span className={styles["footer-copyright-icon"]}>
                        <a
                            href="https://www.linkedin.com/company/loop-village/"
                            aria-label="linkedin"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkedInIcon />
                        </a>
                    </span>
                    <span className={styles["footer-copyright-icon"]}>
                        <a
                            href="https://www.instagram.com/theloopvillage/"
                            aria-label="instagram"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <InstagramIcon />
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}
