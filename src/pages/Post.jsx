import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="mt-16 w-full flex flex-auto">
            <Container>
                <div className=" w-full max-w-sm mx-auto flex justify-center mb-4 relative rounded-xl p-2">
                     {(() => {
        const url = appwriteService.getFileDownload(post.featuredImage);
        const imageUrl = url.includes("?")
            ? url + "&mode=admin"
            : url + "?mode=admin";

        return (
            <img
                src={imageUrl}
                alt={post.title}
                className="rounded-xl h-auto object-cover w-[300px]"
            />
        );
    })()}

                    {isAuthor && (
                        <div className="absolute right-12 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 flex flex-1">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="flex flex-col flex-auto p-1 w-[90vw]">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
