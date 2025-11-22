import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Permission } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            const rk = ID.unique()
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    rk,
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    getFileDownload(fileId) { 
    return this.bucket.getFileDownload(
        conf.appwriteBucketId,
        fileId
    );
}



// =============== LIKES ==================

    // Like a post
    async likePost(postId, userId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.likesCollectionId,
                ID.unique(),
                { postId, userId }
            );
        } catch (error) {
            console.log("Like error :: likePost ::", error);
        }
    }

    // Unlike a post
    async unlikePost(postId, userId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.likesCollectionId,
                [
                    Query.equal("postId", postId),
                    Query.equal("userId", userId),
                ]
            );

            if (result.documents.length > 0) {
                return await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.likesCollectionId,
                    result.documents[0].$id
                );
            }
        } catch (error) {
            console.log("Like error :: unlikePost ::", error);
        }
    }

    // Check if user liked a post
    async isLiked(postId, userId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.likesCollectionId,
                [
                    Query.equal("postId", postId),
                    Query.equal("userId", userId),
                ]
            );

            return result.total > 0;
        } catch (error) {
            console.log("Like error :: isLiked ::", error);
            return false;
        }
    }

    // Count likes for a post
    async getLikesCount(postId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.likesCollectionId,
                [Query.equal("postId", postId)]
            );

            return result.total;
        } catch (error) {
            console.log("Like error :: getLikesCount ::", error);
            return 0;
        }
    }


    // =============== SUBSCRIBE ==================

    async subscribe(channelId, userId) {
        try {
            if (!channelId || !userId) {
                console.warn("subscribe called without channelId or userId");
                return null;
            }

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.subsCollectionId,
                ID.unique(),
                { channelId, userId },
                [
                    Permission.read("any"),
                    Permission.write(`user:${userId}`)
                ]
            );
        } catch (error) {
            console.log("Subscribe error :: subscribe ::", error);
            return null;
        }
    }

    // Unsubscribe
    async unsubscribe(channelId, userId) {
        try {
            if (!channelId || !userId) {
                console.warn("unsubscribe called without channelId or userId");
                return null;
            }

            const res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.subsCollectionId,
                [
                    Query.equal("channelId", channelId),
                    Query.equal("userId", userId),
                ]
            );

            if (res.documents.length > 0) {
                return await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.subsCollectionId,
                    res.documents[0].$id
                );
            }

            return null;
        } catch (error) {
            console.log("Subscribe error :: unsubscribe ::", error);
            return null;
        }
    }

    // Check if subscribed
    async isSubscribed(channelId, userId) {
        try {
            if (!channelId || !userId) {
                console.warn("isSubscribed called without channelId or userId");
                return false;
            }

            const res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.subsCollectionId,
                [
                    Query.equal("channelId", channelId),
                    Query.equal("userId", userId),
                ]
            );

            return res.total > 0;
        } catch (error) {
            console.log("Subscribe error :: isSubscribed ::", error);
            return false;
        }
    }

    // Subscriber count
    async subscribersCount(channelId) {
        try {
            if (!channelId) {
                console.warn("subscribersCount called without channelId");
                return 0;
            }

            const res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.subsCollectionId,
                [Query.equal("channelId", channelId)]
            );

            return res.total;
        } catch (error) {
            console.log("Subscribe error :: subscribersCount ::", error);
            return 0;
        }
    }
}


const service = new Service()
export default service