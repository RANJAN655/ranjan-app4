import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import PostCar from '../components/like/PostCar';

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
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

export default AllPosts