import React from "react";
import { Modal } from "@mui/material";
import styles from "./style/termConditionModal.module.scss";
import { TermConditionModalProps } from "./Type";
import CrossIcon from "../../icons/CrossIcon";

export default function PrivacyPolicyModal(props: TermConditionModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleOpen}>{props.children}</div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className={styles["termCondition"]}>
                    <div className={styles["termCondition-pop-up"]}>
                        <div className={styles["termCondition-heading-cross-holder"]}>
                            <div className={styles["termCondition-heading"]}>Privacy Policy</div>
                            <div onClick={handleClose}>
                                <CrossIcon />
                            </div>
                        </div>
                        <div style={{ maxHeight: "450px", minHeight: "300px", width: "100%", overflowY: "scroll" }}>
                            <div className={styles["termCondition-rule"]}>
                                <div className={styles["termCondition-para"]}>
                                    This privacy policy (“Policy”) describes how the personally identifiable information
                                    (“Personal Information”) you may provide on the theloopvillage.com website
                                    (“Website” or “Service”) and any of its related products and services (collectively,
                                    “Services”) is collected, protected and used. It also describes the choices
                                    available to you regarding our use of your Personal Information and how you can
                                    access and update this information.
                                    <br />
                                    <br />
                                    This Policy is a legally binding agreement between you (“User”, “you” or “your”) and
                                    LOOP Village Inc (“LOOP Village Inc”, “we”, “us” or “our”). By accessing and using
                                    the Website and Services, you acknowledge that you have read, understood, and agree
                                    to be bound by the terms of this Policy. This Policy does not apply to the practices
                                    of companies that we do not own or control, or to individuals that we do not employ
                                    or manage.
                                </div>
                                <div className={styles["termCondition-title"]}>Automatic collection of information</div>
                                <div className={styles["termCondition-para"]}>
                                    Our top priority is customer data security and, as such, we exercise the no logs
                                    policy. We may process only minimal user data, only as much as it is absolutely
                                    necessary to maintain the Website and Services. Information collected automatically
                                    is used only to identify potential cases of abuse and establish statistical
                                    information regarding the usage and traffic of the Website and Services. This
                                    statistical information is not otherwise aggregated in such a way that would
                                    identify any particular user of the system.
                                </div>
                                <div className={styles["termCondition-title"]}>Collection of personal information</div>
                                <div className={styles["termCondition-para"]}>
                                    You can access and use the Website and Services without telling us who you are or
                                    revealing any information by which someone could identify you as a specific,
                                    identifiable individual. If, however, you wish to use some of the features on the
                                    Website, you may be asked to provide certain Personal Information (for example, your
                                    name and e-mail address). We receive and store any information you knowingly provide
                                    to us when you make a purchase, or fill any online forms on the Website. When
                                    required, this information may include the following:
                                    <br />
                                    <br />
                                    <ul>
                                        <li>Personal details such as name, country of residence, etc.</li>
                                        <li>Contact information such as email address, address, etc.</li>
                                        <li>Payment information such as credit card details, bank details, etc.</li>
                                    </ul>
                                    Some of the information we collect is directly from you via the Website and
                                    Services. However, we may also collect Personal Information about you from other
                                    sources such as public databases and our joint marketing partners. You can choose
                                    not to provide us with your Personal Information, but then you may not be able to
                                    take advantage of some of the features on the Website. Users who are uncertain about
                                    what information is mandatory are welcome to contact us.
                                </div>
                                <div className={styles["termCondition-title"]}>
                                    Use and processing of collected information
                                </div>
                                <div className={styles["termCondition-para"]}>
                                    In order to make the Website and Services available to you, or to meet a legal
                                    obligation, we may need to collect and use certain Personal Information. If you do
                                    not provide the information that we request, we may not be able to provide you with
                                    the requested products or services. Any of the information we collect from you may
                                    be used for the following purposes:
                                    <br />
                                    <br />
                                    <ul>
                                        <li>Create and manage user accounts</li>
                                        <li>Fulfill and manage orders</li>
                                        <li>Deliver products or services</li>
                                        <li>Improve products and services</li>
                                        <li>Send administrative information</li>
                                        <li>Send marketing and promotional communications</li>
                                        <li>Respond to inquiries and offer support</li>
                                        <li>Request user feedback</li>
                                        <li>Improve user experience</li>
                                        <li>Post customer testimonials</li>
                                        <li>Enforce terms and conditions and policies</li>
                                        <li>Protect from abuse and malicious users</li>
                                        <li>Respond to legal requests and prevent harm</li>
                                        <li>Run and operate the Website and Services</li>
                                    </ul>
                                    Processing your Personal Information depends on how you interact with the Website
                                    and Services, where you are located in the world and if one of the following
                                    applies: <br />
                                    <br />
                                    <ul>
                                        <li>
                                            you have given your consent for one or more specific purposes; this,
                                            however, does not apply, whenever the processing of Personal Information is
                                            subject to California Consumer Privacy Act or European data protection law;
                                        </li>
                                        <li>
                                            provision of information is necessary for the performance of an agreement
                                            with you and/or for any pre-contractual obligations thereof;{" "}
                                        </li>
                                        <li>
                                            processing is necessary for compliance with a legal obligation to which you
                                            are subject;
                                        </li>
                                        <li>
                                            processing is related to a task that is carried out in the public interest
                                            or in the exercise of official authority vested in us;{" "}
                                        </li>
                                        <li>
                                            processing is necessary for the purposes of the legitimate interests pursued
                                            by us or by a third party.
                                        </li>
                                    </ul>
                                    Note that under some legislations we may be allowed to process information until you
                                    object to such processing (by opting out), without having to rely on consent or any
                                    other of the following legal bases below. In any case, we will be happy to clarify
                                    the specific legal basis that applies to the processing, and in particular whether
                                    the provision of Personal Information is a statutory or contractual requirement, or
                                    a requirement necessary to enter into a contract.
                                </div>
                                <div className={styles["termCondition-title"]}>Billing and payments</div>
                                <div className={styles["termCondition-para"]}>
                                    We use third party payment processors to assist us in processing your payment
                                    information securely. Such third party processors’ use of your Personal Information
                                    is governed by their respective privacy policies which may or may not contain
                                    privacy protections as protective as this Policy. We suggest that you review their
                                    respective privacy policies.
                                </div>
                                <div className={styles["termCondition-title"]}>Disclosure of information</div>
                                <div className={styles["termCondition-para"]}>
                                    Depending on the requested Services or as necessary to complete any transaction or
                                    provide any service you have requested, we may share your information with your
                                    consent with our trusted third parties that work with us, any other affiliates and
                                    subsidiaries we rely upon to assist in the operation of the Website and Services
                                    available to you. We do not share Personal Information with unaffiliated third
                                    parties.
                                    <br />
                                    <br /> These service providers are not authorized to use or disclose your
                                    information except as necessary to perform services on our behalf or comply with
                                    legal requirements. We may share your Personal Information for these purposes only
                                    with third parties whose privacy policies are consistent with ours or who agree to
                                    abide by our policies with respect to Personal Information. These third parties are
                                    given Personal Information they need only in order to perform their designated
                                    functions, and we do not authorize them to use or disclose Personal Information for
                                    their own marketing or other purposes.
                                    <br />
                                    <br />
                                    We will disclose any Personal Information we collect, use or receive if required or
                                    permitted by law, such as to comply with a subpoena, or similar legal process, and
                                    when we believe in good faith that disclosure is necessary to protect our rights,
                                    protect your safety or the safety of others, investigate fraud, or respond to a
                                    government request.
                                    <br />
                                    <br />
                                    In the event we go through a business transition, such as a merger or acquisition by
                                    another company, or sale of all or a portion of its assets, your user account, and
                                    Personal Information will likely be among the assets transferred.
                                </div>
                                <div className={styles["termCondition-title"]}>Retention of information</div>
                                <div className={styles["termCondition-para"]}>
                                    We will retain and use your Personal Information for the period necessary to comply
                                    with our legal obligations, resolve disputes, and enforce our agreements unless a
                                    longer retention period is required or permitted by law. We may use any aggregated
                                    data derived from or incorporating your Personal Information after you update or
                                    delete it, but not in a manner that would identify you personally. Once the
                                    retention period expires, Personal Information shall be deleted. Therefore, the
                                    right to access, the right to erasure, the right to rectification and the right to
                                    data portability cannot be enforced after the expiration of the retention period.
                                </div>
                                <div className={styles["termCondition-title"]}>Transfer of information</div>
                                <div className={styles["termCondition-para"]}>
                                    Depending on your location, data transfers may involve transferring and storing your
                                    information in a country other than your own. You are entitled to learn about the
                                    legal basis of information transfers to a country outside the European Union or to
                                    any international organization governed by public international law or set up by two
                                    or more countries, such as the UN, and about the security measures taken by us to
                                    safeguard your information. If any such transfer takes place, you can find out more
                                    by checking the relevant sections of this Policy or inquire with us using the
                                    information provided in the contact section.
                                </div>
                                <div className={styles["termCondition-title"]}>The rights of users</div>
                                <div className={styles["termCondition-para"]}>
                                    You may exercise certain rights regarding your information processed by us. In
                                    particular, you have the right to do the following:
                                    <br />
                                    <br />
                                    <ul>
                                        <li>
                                            you have the right to withdraw consent where you have previously given your
                                            consent to the processing of your information;
                                        </li>
                                        <li>
                                            you have the right to object to the processing of your information if the
                                            processing is carried out on a legal basis other than consent;
                                        </li>
                                        <li>
                                            you have the right to learn if information is being processed by us, obtain
                                            disclosure regarding certain aspects of the processing and obtain a copy of
                                            the information undergoing processing;
                                        </li>
                                        <li>
                                            you have the right to verify the accuracy of your information and ask for it
                                            to be updated or corrected;
                                        </li>
                                        <li>
                                            you have the right, under certain circumstances, to restrict the processing
                                            of your information, in which case, we will not process your information for
                                            any purpose other than storing it;
                                        </li>
                                        <li>
                                            you have the right, under certain circumstances, to obtain the erasure of
                                            your Personal Information from us;
                                        </li>
                                        <li>
                                            {" "}
                                            you have the right to receive your information in a structured, commonly
                                            used and machine readable format and, if technically feasible, to have it
                                            transmitted to another controller without any hindrance. This provision is
                                            applicable provided that your information is processed by automated means
                                            and that the processing is based on your consent, on a contract which you
                                            are part of or on pre-contractual obligations thereof.
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles["termCondition-title"]}>The right to object to processing</div>
                                <div className={styles["termCondition-para"]}>
                                    Where Personal Information is processed for the public interest, in the exercise of
                                    an official authority vested in us or for the purposes of the legitimate interests
                                    pursued by us, you may object to such processing by providing a ground related to
                                    your particular situation to justify the objection.
                                </div>
                                <div className={styles["termCondition-title"]}>Data protection rights under GDPR</div>
                                <div className={styles["termCondition-para"]}>
                                    If you are a resident of the European Economic Area (EEA), you have certain data
                                    protection rights and LOOP Village Inc aims to take reasonable steps to allow you to
                                    correct, amend, delete, or limit the use of your Personal Information. If you wish
                                    to be informed what Personal Information we hold about you and if you want it to be
                                    removed from our systems, please contact us. In certain circumstances, you have the
                                    following data protection rights:
                                    <br />
                                    <br />
                                    <ul>
                                        <li>
                                            You have the right to request access to your Personal Information that we
                                            store and have the ability to access your Personal Information.
                                        </li>
                                        <li>
                                            You have the right to request that we correct any Personal Information you
                                            believe is inaccurate. You also have the right to request us to complete the
                                            Personal Information you believe is incomplete.
                                        </li>
                                        <li>
                                            You have the right to request the erase your Personal Information under
                                            certain conditions of this Policy.
                                        </li>
                                        <li>
                                            You have the right to object to our processing of your Personal Information.
                                        </li>
                                        <li>
                                            You have the right to seek restrictions on the processing of your Personal
                                            Information. When you restrict the processing of your Personal Information,
                                            we may store it but will not process it further.
                                        </li>
                                        <li>
                                            You have the right to be provided with a copy of the information we have on
                                            you in a structured, machine-readable and commonly used format.
                                        </li>
                                        <li>
                                            You also have the right to withdraw your consent at any time where LOOP
                                            Village Inc relied on your consent to process your Personal Information.
                                        </li>
                                        <li>
                                            You have the right to complain to a Data Protection Authority about our
                                            collection and use of your Personal Information. For more information,
                                            please contact your local data protection authority in the European Economic
                                            Area (EEA).
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles["termCondition-title"]}>California privacy rights</div>
                                <div className={styles["termCondition-para"]}>
                                    In addition to the rights as explained in this Policy, California residents who
                                    provide Personal Information (as defined in the statute) to obtain products or
                                    services for personal, family, or household use are entitled to request and obtain
                                    from us, once a calendar year, information about the Personal Information we shared,
                                    if any, with other businesses for marketing uses. If applicable, this information
                                    would include the categories of Personal Information and the names and addresses of
                                    those businesses with which we shared such personal information for the immediately
                                    prior calendar year (e.g., requests made in the current year will receive
                                    information about the prior year). To obtain this information please contact us.
                                </div>
                                <div className={styles["termCondition-title"]}>How to exercise these rights</div>
                                <div className={styles["termCondition-para"]}>
                                    Any requests to exercise your rights can be directed to LOOP Village Inc through the
                                    contact details provided in this document. Please note that we may ask you to verify
                                    your identity before responding to such requests. Your request must provide
                                    sufficient information that allows us to verify that you are the person you are
                                    claiming to be or that you are the authorized representative of such person. You
                                    must include sufficient details to allow us to properly understand the request and
                                    respond to it. We cannot respond to your request or provide you with Personal
                                    Information unless we first verify your identity or authority to make such a request
                                    and confirm that the Personal Information relates to you.
                                </div>
                                <div className={styles["termCondition-title"]}>Privacy of children</div>
                                <div className={styles["termCondition-para"]}>
                                    We do not knowingly collect any Personal Information from children under the age of
                                    18. If you are under the age of 18, please do not submit any Personal Information
                                    through the Website and Services. We encourage parents and legal guardians to
                                    monitor their children’s Internet usage and to help enforce this Policy by
                                    instructing their children never to provide Personal Information through the Website
                                    and Services without their permission. If you have reason to believe that a child
                                    under the age of 18 has provided Personal Information to us through the Website and
                                    Services, please contact us. You must also be at least 16 years of age to consent to
                                    the processing of your Personal Information in your country (in some countries we
                                    may allow your parent or guardian to do so on your behalf).
                                </div>
                                <div className={styles["termCondition-title"]}>Cookies</div>
                                <div className={styles["termCondition-para"]}>
                                    The Website and Services use “cookies” to help personalize your online experience. A
                                    cookie is a text file that is placed on your hard disk by a web page server. Cookies
                                    cannot be used to run programs or deliver viruses to your computer. Cookies are
                                    uniquely assigned to you, and can only be read by a web server in the domain that
                                    issued the cookie to you.
                                    <br />
                                    <br />
                                    We may use cookies to collect, store, and track information for statistical purposes
                                    to operate the Website and Services. You have the ability to accept or decline
                                    cookies. Most web browsers automatically accept cookies, but you can usually modify
                                    your browser setting to decline cookies if you prefer. You may learn more about
                                    cookies and how they work here.
                                </div>
                                <div className={styles["termCondition-title"]}>Do Not Track signals</div>
                                <div className={styles["termCondition-para"]}>
                                    Some browsers incorporate a Do Not Track feature that signals to websites you visit
                                    that you do not want to have your online activity tracked. Tracking is not the same
                                    as using or collecting information in connection with a website. For these purposes,
                                    tracking refers to collecting personally identifiable information from consumers who
                                    use or visit a website or online service as they move across different websites over
                                    time. The Website and Services do not track its visitors over time and across third
                                    party websites. However, some third party sites may keep track of your browsing
                                    activities when they serve you content, which enables them to tailor what they
                                    present to you.
                                </div>
                                <div className={styles["termCondition-title"]}>Email marketing</div>
                                <div className={styles["termCondition-para"]}>
                                    We offer electronic newsletters to which you may voluntarily subscribe at any time.
                                    We are committed to keeping your e-mail address confidential and will not disclose
                                    your email address to any third parties except as allowed in the information use and
                                    processing section or for the purposes of utilizing a third party provider to send
                                    such emails. We will maintain the information sent via e-mail in accordance with
                                    applicable laws and regulations.
                                    <br />
                                    <br />
                                    In compliance with the CAN-SPAM Act, all e-mails sent from us will clearly state who
                                    the e-mail is from and provide clear information on how to contact the sender. You
                                    may choose to stop receiving our newsletter or marketing emails by following the
                                    unsubscribe instructions included in these emails or by contacting us. However, you
                                    will continue to receive essential transactional emails.
                                </div>
                                <div className={styles["termCondition-title"]}>Links to other resources</div>
                                <div className={styles["termCondition-para"]}>
                                    The Website and Services contain links to other resources that are not owned or
                                    controlled by us. Please be aware that we are not responsible for the privacy
                                    practices of such other resources or third parties. We encourage you to be aware
                                    when you leave the Website and Services and to read the privacy statements of each
                                    and every resource that may collect Personal Information.
                                </div>
                                <div className={styles["termCondition-title"]}>Information security</div>
                                <div className={styles["termCondition-para"]}>
                                    We secure information you provide on computer servers in a controlled, secure
                                    environment, protected from unauthorized access, use, or disclosure. We maintain
                                    reasonable administrative, technical, and physical safeguards in an effort to
                                    protect against unauthorized access, use, modification, and disclosure of Personal
                                    Information in its control and custody. However, no data transmission over the
                                    Internet or wireless network can be guaranteed. Therefore, while we strive to
                                    protect your Personal Information, you acknowledge that
                                    <br />
                                    <br />
                                    <ul>
                                        <li>
                                            there are security and privacy limitations of the Internet which are beyond
                                            our control;
                                        </li>
                                        <li>
                                            the security, integrity, and privacy of any and all information and data
                                            exchanged between you and the Website and Services cannot be guaranteed; and
                                        </li>
                                        <li>
                                            any such information and data may be viewed or tampered with in transit by a
                                            third party, despite best efforts.
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles["termCondition-title"]}>Data breach</div>
                                <div className={styles["termCondition-para"]}>
                                    In the event we become aware that the security of the Website and Services has been
                                    compromised or users Personal Information has been disclosed to unrelated third
                                    parties as a result of external activity, including, but not limited to, security
                                    attacks or fraud, we reserve the right to take reasonably appropriate measures,
                                    including, but not limited to, investigation and reporting, as well as notification
                                    to and cooperation with law enforcement authorities. In the event of a data breach,
                                    we will make reasonable efforts to notify affected individuals if we believe that
                                    there is a reasonable risk of harm to the user as a result of the breach or if
                                    notice is otherwise required by law. When we do, we will post a notice on the
                                    Website, send you an email.
                                </div>
                                <div className={styles["termCondition-title"]}>Changes and amendments</div>
                                <div className={styles["termCondition-para"]}>
                                    We reserve the right to modify this Policy or its terms relating to the Website and
                                    Services from time to time in our discretion and will notify you of any material
                                    changes to the way in which we treat Personal Information. When we do, we will
                                    revise the updated date at the bottom of this page. We may also provide notice to
                                    you in other ways in our discretion, such as through contact information you have
                                    provided. Any updated version of this Policy will be effective immediately upon the
                                    posting of the revised Policy unless otherwise specified. Your continued use of the
                                    Website and Services after the effective date of the revised Policy (or such other
                                    act specified at that time) will constitute your consent to those changes. However,
                                    we will not, without your consent, use your Personal Information in a manner
                                    materially different than what was stated at the time your Personal Information was
                                    collected.
                                </div>
                                <div className={styles["termCondition-title"]}>Acceptance of this policy</div>
                                <div className={styles["termCondition-para"]}>
                                    You acknowledge that you have read this Policy and agree to all its terms and
                                    conditions. By accessing and using the Website and Services you agree to be bound by
                                    this Policy. If you do not agree to abide by the terms of this Policy, you are not
                                    authorized to access or use the Website and Services.
                                </div>
                                <div className={styles["termCondition-title"]}>Contacting us</div>
                                <div className={styles["termCondition-para"]}>
                                    If you would like to contact us to understand more about this Policy or wish to
                                    contact us concerning any matter relating to individual rights and your Personal
                                    Information, you may send an email to info@theloopvillage.com.
                                    <br />
                                    This document was last updated on April 6, 2021
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}