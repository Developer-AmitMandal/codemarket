'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ChakraProvider, SimpleGrid, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { useRouter } from 'next/navigation';
import { FcLike } from 'react-icons/fc'
import { FcLikePlaceholder } from 'react-icons/fc'
import { s3_bucket_url } from '@/app/components/configrations'
import { isEmptyArray } from "@/app/components/CustomFunctions";
import { SingleProject } from "@/app/components/CustomLoading";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './singleproduct.css'
export default function SingleProjectDescriptions({ params }) {

    const { id } = params;
    const router = useRouter();
    const toast = useToast();
    const [clickLike, setClickLike] = useState(null);

    const likeBtn = (index) => {
        if (clickLike === index) {
            setClickLike(null); // Toggle like state off
        } else {
            setClickLike(index); // Toggle like state on
        }
    };

    function formatLikes(likes) {
        if (likes >= 1000000) {
            return (likes / 1000000).toFixed(1) + 'm';
        } else if (likes >= 1000) {
            return (likes / 1000).toFixed(1) + 'k';
        } else {
            return likes.toString();
        }
    }
    const [projects, setProjects] = useState([]);
    const fetchProjects = async () => {
        try {
            const res = await axios.post('/api/projects/singleproject', { id: id });
            if (res.status === 201) {
                setProjects([res.data.projects]);
            } else {
                console.log('fetch post error');
            }
        } catch (error) {
            router.push('/')
            console.log('publish api error', error)
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);


    //------------------
    const [projectIds, setprojectIds] = useState([]);
    const [usersData, setUsers] = useState([]);
    const fetchusers = async () => {
        try {
            const res = await axios.post('/api/users', { token: sessionStorage.getItem('codemarket') });
            if (res.status === 201) {
                setprojectIds(res.data.users.projectList);
                setUsers(res.data.users);
            } else {
                console.log('fetch post error');
            }
        } catch (error) {
            console.log('get users api error', error)
        }
    }
    useEffect(() => {
        fetchusers();
    }, []);


    // Payment Button---------------------------------------------X
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };


    const handleOpenRazorpay = async (data) => {
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        const options = {
            key: 'rzp_test_zPDhEMoZ6ivNaQ',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'Code Market',//
            description: 'Code Market Subscription',//
            image: "/images/play_store_512.png",
            prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                name: usersData?.fullName, //your customer's name
                email: usersData?.email,
                contact: usersData?.mobile //Provide the customer's phone number for better conversion rates 
            },
            notes: {
                address: "Code Market"
            },
            theme: {
                // "color": "#3399cc"
            },
            handler: async function (response) {
                // console.log(response, "34")
                const res = await axios.post('/api/payment/verify', { response: response, email: usersData?.email, projectId: data?.notes?.projectId })
                if (res.status === 201) {
                    toast({ title: "Payment Under Processing..", status: 'info', duration: 10000, position: 'top', isClosable: true });
                    window.location.reload();
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    // payment btn 
    const handlePayment = (id, price) => {
        toast({ title: "Payment is Being Processing..", status: 'info', duration: 4000, position: 'top', isClosable: true });

        const _data = { amount: price, projectId: id, email: usersData?.email, fullName: usersData?.fullName }
        axios.post('/api/payment/order', _data)
            .then(res => {
                console.log(res.data, "29")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <ChakraProvider />
            <div className="singlepageProject">
                {
                    isEmptyArray(projects) ? <SingleProject /> :
                        projects?.map((project, index) => {

                            return (
                                <div key={index} className="singleproduct">
                                    <div className="image-container">
                                        <Image
                                            src={project?.thumbnail}
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
                                            <div className="descriptionTitle">Price: ₹{project?.price} /-</div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="descriptionTitle"> <DownloadForOfflineOutlinedIcon sx={{ marginRight: '2px', marginTop: '-2px', fontSize: '18px' }} />{project?.downloads > 1000 ? formatLikes(project?.downloads) : formatLikes(project?.downloads)}</div>
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
                                            {
                                                projectIds.includes(project._id) ?
                                                    <a
                                                        href={`${s3_bucket_url}/projects/${project?.file}`}
                                                        onClick={() => { toast({ title: "Project Downloading..", status: 'info', duration: 4000, position: 'top', isClosable: true }); }}
                                                    >
                                                        <Button
                                                            className='downloadButton'
                                                            leftIcon={<DownloadForOfflineOutlinedIcon sx={{ marginRight: '-5px', fontSize: '18px' }} />}

                                                        >
                                                            Download Project Source Code
                                                        </Button>
                                                    </a>
                                                    :
                                                    <Button
                                                        className='downloadButton'
                                                        leftIcon={<ShoppingCartIcon sx={{ marginRight: '-5px', fontSize: '18px' }} />}
                                                        onClick={() => { handlePayment(project?._id, project?.price) }}
                                                    >
                                                        Buy Project
                                                    </Button>
                                            }
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
                                                    src={`${s3_bucket_url}/thumbnails/${details?.image}`}
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
