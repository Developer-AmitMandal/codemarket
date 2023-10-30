'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { Topnavbar } from "../components/before_loggedIn/topnavbar";
import { Button, SimpleGrid } from '@chakra-ui/react'
import Image from 'next/image'
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { useRouter } from 'next/navigation';
import { FcLike } from 'react-icons/fc'
import { FcLikePlaceholder } from 'react-icons/fc'
import { s3_bucket_url } from '@/app/components/configrations'
import { isEmptyArray } from "../components/CustomFunctions";
import { SingleProject } from "../components/CustomLoading";
import './singleproduct.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function SingleProjectDescriptions({ params }: any) {

    const router = useRouter();
    const [clickLike, setClickLike] = useState<number | null>(null);

    const likeBtn = (index: number) => {
        if (clickLike === index) {
            setClickLike(null); // Toggle like state off
        } else {
            setClickLike(index); // Toggle like state on



        }
    };

    function formatLikes(likes: number) {
        if (likes >= 1000000) {
            return (likes / 1000000).toFixed(1) + 'm';
        } else if (likes >= 1000) {
            return (likes / 1000).toFixed(1) + 'k';
        } else {
            return likes.toString();
        }
    }

    interface Project {
        _id: string;
        title: string;
        file: string;
        description: string;
        thumbnail: string;
        price: number,
        likes: number;
        downloads: number;
        details: [
            {
                id: string;
                title: string;
                image: string;
            }
        ];
    }

    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.post('/api/projects/singleproject', { id: params.id });
                if (res.status === 201) {
                    setProjects([res.data.projects]);
                } else {
                    console.log('fetch post error');
                }
            } catch (error) {
                console.log('publish api error', error)
            }
        }
        fetchProjects();
    }, [])


    return (
        <>
            <Topnavbar />
            <div className="singlepageProject">
                {
                    isEmptyArray(projects) ? <SingleProject /> :
                        projects?.map((project, index) => {
                            return (
                                <div className="singleproduct">
                                    <div className="image-container">
                                        <Image
                                            src={`${s3_bucket_url!}/thumbnails/${project?.thumbnail}`}
                                            alt="Picture of the codemarket"
                                            width={1000} //automatically provided
                                            height={1000} //automatically provided
                                            blurDataURL="data:..." // automatically provided
                                            placeholder="blur" // Optional blur-up while loading
                                            className="singleImage"
                                        />
                                    </div>
                                    <div className="detains-container">
                                        <div className="mt-2">
                                            <div className="descriptionTitle">Project Title</div>
                                            <div className="projectTitle">{project?.title}</div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="descriptionTitle">Description</div>
                                            {project?.description}
                                        </div>

                                        <div className="mt-2">
                                            <div className="descriptionTitle">Price: Primum</div>
                                            
                                            {/* ₹{project?.price} /- */}
                                        </div>
                                        <div className='btnGroup'>
                                            <Button
                                                className='likeButton mr-2'
                                                leftIcon={
                                                    clickLike === index ? <FcLike style={{ marginRight: '-2px', marginTop: '-3px', fontSize: '16px' }} /> : <FcLikePlaceholder style={{ marginRight: '-2px', marginTop: '-3px', fontSize: '16px' }} />}

                                                onClick={() => { likeBtn(index) }}
                                            >
                                                {project?.likes > 1000 ? formatLikes(project?.likes) : formatLikes(project?.likes)} Like
                                            </Button>

                                            {/* <Button
                                            className='downloadButton'
                                            leftIcon={}
                                            onClick={() => { }}
                                        >
                                            {project?.downloads > 1000 ? formatLikes(project?.downloads) : formatLikes(project?.downloads)} Downloads
                                        </Button> */}

                                            <Button
                                                className='subscriptionButton'
                                                leftIcon={<ArrowBackIosIcon sx={{ marginRight: '-15px', fontSize: '16px' }} />}
                                                rightIcon={<ArrowForwardIosIcon sx={{ marginLeft: '-12px', fontSize: '16px' }} />}
                                                onClick={() => { router.push('/auth/login') }}
                                            >
                                                <DownloadForOfflineOutlinedIcon sx={{ marginRight: '2px', marginTop: '-2px', fontSize: '18px' }} /> Source Code
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
                <div className="screenshorts">
                    <div className="descriptionTitle">Screen Shorts</div>
                    {
                        < SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' className="mt-1">
                            {
                                isEmptyArray(projects[0]?.details) ? "No Screen Shot Available" :
                                    projects[0]?.details.map((details, index) => {
                                        return (
                                            <div key={index} className="screensorts212">
                                                <Image
                                                    src={`${s3_bucket_url!}/thumbnails/${details?.image}`}
                                                    alt="Picture of the codemarket"
                                                    width={1000} //automatically provided
                                                    height={200} //automatically provided
                                                    blurDataURL="data:..." // automatically provided
                                                    placeholder="blur" // Optional blur-up while loading
                                                    style={{ borderRadius: "5px", height: '150px' }}
                                                    className="screenshortImage"
                                                />
                                                <div className="descriptionTitle p-1">{details?.title}</div>
                                            </div>
                                        )
                                    })
                            }
                        </SimpleGrid>
                    }
                </div>
            </div >
        </>
    )
}