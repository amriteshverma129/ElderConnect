const uscWelcomeMail = (name: string): string => {
    return `
    <!DOCTYPE html>

    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso]>
            <xml>
                <o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings>
            </xml>
        <![endif]-->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <!--<![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            .image_block img+div {
                display: none;
            }
    
            .menu_block.desktop_hide .menu-links span {
                mso-hide: all;
            }
    
            @media (max-width:700px) {
    
                .nl-container{
                    width: 100% !important;
                }
    
                .spacer_block{
                    height: 20px !important;
                }
    
                .desktop_hide table.icons-inner,
                .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                }
    
                .icons-inner {
                    text-align: center;
                }
    
                .icons-inner td {
                    margin: 0 auto;
                }
    
                .fullMobileWidth,
                .image_block img.big,
                .row-content {
                    width: 100% !important;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>
    
    <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin: 0 auto; width: 700px; background-color: #f9f9f9; padding-top: 30px; padding-bottom: 30px;" width="700">
            <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #142C60; width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 700; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad" style="width:100%;">
                                                                    <h2 align="left" style="font-family:'Poppins',sans-serif;font-weight: 500;font-size: 36px; line-height: 54px; color: #142C60; padding-left: 20px; padding-right: 20px; margin: 0;">Hello ${name}</h2>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-8" style="height:20px;line-height:80px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #142C60; width: 100%">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 500; text-align: left; vertical-align: top;">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td align="left" style="padding: 0;">
                                                                    <div style="padding-left: 20px; padding-right: 20px;">
                                                                        <p style="margin: 0;font-family:'Poppins',sans-serif; font-weight: 600;font-size: 20px; line-height: 32px; color: #142C60;; mso-line-height-alt: 24px;">
                                                                            Thank you or signing up to LOOP into The Power of Food Preparation from LOOP, USC & The Los Angeles Department of Aging.
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-8" style="height:20px;line-height:80px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #142C60; width: 100%">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:20px;padding-left:20px;">
                                                                    <div align="center" class="alignment">
                                                                        <img src="https://images.prismic.io/loop-web-members/f39b9434-8465-4c97-a0d1-318a0e33bcd4_Food+Prep.png?auto=compress,format" alt="Loop Village" width="100%" height="100%" style="width:100%;max-height:320px;border-radius:12px;object-fit:cover;">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>                                                    
                                                        <div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #142C60; width: 100%">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 500; text-align: left; vertical-align: top;">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td align="left" style="padding: 0;">
                                                                    <div style="padding-left: 20px; padding-right: 20px;">
                                                                        <p style="margin: 0;font-family:'Poppins',sans-serif; font-weight: 400;font-size: 20px; line-height: 32px; color: #142C60; mso-line-height-alt: 24px;">
                                                                            We will give you a 24-hour reminder before the event as well as a 1-hour reminder email with the link to the program.
                                                                        </p>
                                                                    </div>
                                                                    <div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;"> </div>
                                                                    <div style="padding-left: 20px; padding-right: 20px;">
                                                                        <p style="margin: 0;font-family:'Poppins',sans-serif; font-weight: 400;font-size: 20px; line-height: 32px; color: #142C60; mso-line-height-alt: 24px;">
                                                                            Our events are run through <a href="" style="font-weight: 700; color: #142C60;">LOOP on ZOOM</a> and are very easy to access on a computer, tablet or even your phone.
                                                                        </p>
                                                                    </div>
                                                                    <div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;"> </div>
                                                                    <div style="padding-left: 20px; padding-right: 20px;">
                                                                        <p style="margin: 0;font-family:'Poppins',sans-serif; font-weight: 400;font-size: 20px; line-height: 32px; color: #142C60; mso-line-height-alt: 24px;">
                                                                            If you do have any technical issues joining please don’t hesitate to reach out to us by calling or text us at <a href="" style="font-weight: 700; color: #142C60;">877-909-LOOP (5667)</a> or contact Carin Kreutzer at <a href="mailto:kreutzer@usc.edu" style="font-weight: 700; color: #142C60;">kreutzer@usc.edu</a>.
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-8" style="height:20px;line-height:80px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #142C60; width: 100%">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 500; text-align: left; vertical-align: top;">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td align="left" style="padding: 0;">
                                                                    <div style="padding-left: 20px; padding-right: 20px;">
                                                                        <p style="margin: 0;font-family:'Poppins',sans-serif; font-weight: 700;font-size: 20px; line-height: 32px; color: #142C60; mso-line-height-alt: 24px;">
                                                                            Happy Snacking!
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- End -->
    </body>
    
    </html>
    `;
};

export default uscWelcomeMail;
