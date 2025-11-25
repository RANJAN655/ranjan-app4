import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import PostCar from '../components/like/PostCar';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                // {console.log(posts) }
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full mt-14'>
            <Container>
                <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 '>
                    {posts.map((post) => (
                        <div key={post.$id} className='break-inside-avoid mb-4'>
                            <PostCard {...post} />
                            <PostCar{...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home