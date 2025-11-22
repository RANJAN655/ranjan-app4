const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteName: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),

     // Likes collection
    likesCollectionId: import.meta.env.VITE_APPWRITE_LIKE_ID,

    // Subscribe collection
    subsCollectionId: import.meta.env.VITE_APPWRITE_SUBSCRIBE_ID,

    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
