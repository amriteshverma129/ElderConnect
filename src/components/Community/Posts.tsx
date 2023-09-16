import React, { useEffect, useState } from "react";
import styles from "./Style/posts.module.scss";
import dynamic from "next/dynamic";
import CameraIcon from "../../icons/CameraIcon";
import RecorderIcon from "../../icons/RecorderIcon";
import ImageIcon from "../../icons/ImageIcon";
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import { Grid, Typography, Avatar } from "@mui/material";
const PostCard = dynamic(() => import("./PostCard"));
import { postType } from "./Type";
import Loader2 from "../Loader/Loader2";

const Posts = () => {
    const [posts, setPosts] = useState<Array<postType> | []>([]);
    const [loader, setLoader] = useState<boolean>(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const hasuraPostsRes = await client.query({
            query: gql`
                query Posts {
                    Posts {
                        postId
                        communityId
                        description
                        image
                        created_at
                        userName
                        email
                        videos
                    }
                }
            `,
        });
        const hasuraPostsData = await hasuraPostsRes.data;
        const postList = await hasuraPostsData.Posts;
        setPosts(postList);
        setLoader(false);
    };

    return (
        <div className={styles["posts"]}>
            <div className={styles["post-creator"]}>
                <div className={styles["post-creator-title-avatar-holder"]}>
                    <Avatar alt="Remy Sharp" src="/Community/post.jpeg" sx={{ height: "45px", width: "45px" }}>
                        Ashish Gupta
                    </Avatar>
                    <input
                        type="text"
                        className={styles["post-creator-input"]}
                        placeholder={`Hello Ashish, what in your mind?`}
                    />
                </div>
                <div className={styles["post-creator-icons-button-holder"]}>
                    <div className={styles["post-creator-icons"]}>
                        <span>
                            <CameraIcon />
                        </span>
                        <span>
                            <ImageIcon />
                        </span>
                        <span>
                            <RecorderIcon />
                        </span>
                    </div>
                </div>
            </div>
            {loader ? (
                <Loader2 />
            ) : posts && posts.length ? (
                posts.map((post: postType) => {
                    return (
                        <div key={post.postId}>
                            <PostCard
                                image={`${post.image}`}
                                postId={post.postId}
                                communityId={post.communityId}
                                description={post.description}
                                userName={post.userName}
                                email={post.email}
                                videos={post.videos}
                                created_at={post.created_at}
                            />
                        </div>
                    );
                })
            ) : (
                <Grid
                    sx={{
                        height: "80%",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        component="div"
                        sx={{
                            fontWeight: "bolder",
                        }}
                    >
                        No Events is Available
                    </Typography>
                </Grid>
            )}
        </div>
    );
};
export default Posts;
