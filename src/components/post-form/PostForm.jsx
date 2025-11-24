import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [submitting, setSubmitting] = useState(false); // track submit state

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log("problrm",userData);
    

    const submit = async (data) => {
        if (submitting) return; // prevent multiple submissions
        setSubmitting(true);

        try {
            let fileId = post?.featuredImage;

            if (data.image && data.image[0]) {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    if (post?.featuredImage) await appwriteService.deleteFile(post.featuredImage);
                    fileId = file.$id;
                }
            }

            const dbData = { ...data, featuredImage: fileId };

            let dbPost;
            if (post) {
                dbPost = await appwriteService.updatePost(post.$id, dbData);
            } else {
                dbPost = await appwriteService.createPost({ ...dbData, userId: userData.$id });
            }

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } catch (err) {
            console.error("PostForm :: submit :: error", err);
        } finally {
            setSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className=" mt-10 w-full flex-col flex-auto sm:flex-1 sm:flex-row">
            <div className="w-full px-2">
                <Input
                    label="Title :"
                    labelclass = "  text-black font-bold dark:text-white shadow-orange-300  "
                    placeholder="Title"
                    className=" mb-4 placeholder:font-bold font-bold "
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    labelclass = "  text-black font-bold dark:text-white shadow-orange-300  "
                    placeholder="Slug"
                    className="mb-4 placeholder:font-bold font-bold "
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className=" sm:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    labelclass = "  text-black font-bold dark:text-white shadow-orange-300  "
                    type="file"
                    className="  placeholder:font-bold  mb-4 font-bold"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        {(() => {
        const url = appwriteService.getFileDownload(post.featuredImage);
        const imageUrl = url.includes("?")
            ? url + "&mode=admin"
            : url + "?mode=admin";

        return (
            <img
                src={imageUrl}
                alt={post.title}
                className="rounded-xl w-full h-auto object-cover"
            />
        );
    })()}
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 font-bold"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" disabled={submitting}>
                    {submitting ? (post ? "Updating..." : "Submitting...") : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
