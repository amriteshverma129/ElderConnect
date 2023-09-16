import * as React from "react";
import { Box, Modal, CardMedia, IconButton, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface VideoModalProps {
    src: string;
    title: string | undefined;
    children: React.ReactNode;
    cloudVideo?: boolean;
}
export default function VideoModal(props: VideoModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div onClick={handleOpen}>{props.children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { lg: 800, md: 700, xs: "90%" },
                        height: "auto",
                    }}
                    onClick={() => handleClose}
                >
                    <IconButton onClick={handleClose} sx={{ position: "absolute", top: 0, right: 0, p: 0, m: 0 }}>
                        <CancelIcon
                            sx={{
                                color: "red",
                                height: { lg: "30px", md: "20px", xs: "0px" },
                                width: { lg: "30px", md: "20px", xs: "0px" },
                            }}
                        />
                    </IconButton>
                    <Grid
                        container
                        sx={{ border: { lg: "25px solid white", md: "15px solid white", xs: "10px solid white" } }}
                    >
                        {props && props.cloudVideo ? (
                            <iframe
                                src={props.src}
                                title={props.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ objectFit: "cover" }}
                                height="400px"
                                width="100%"
                            ></iframe>
                        ) : (
                            <CardMedia
                                component="video"
                                image={props.src}
                                controls
                                title={props.title}
                                style={{ objectFit: "cover" }}
                                height="100%"
                                width="100%"
                            />
                        )}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
