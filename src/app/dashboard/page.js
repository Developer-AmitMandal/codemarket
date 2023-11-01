'use client'
import { Button, SimpleGrid, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc'
import { FcLikePlaceholder } from 'react-icons/fc'
import Link from 'next/link';
import axios from 'axios';
import { s3_bucket_url } from '@/app/components/configrations'
import { ProjectMedia } from '../components/CustomLoading';
import { isEmptyArray } from '../components/CustomFunctions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default async function Home() {

  const router = useRouter();

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      if (res.status === 201) {
        setProjects(res.data.projects);
      } else {
        console.log('fetch post error');
      }
    } catch (error) {
      console.log('publish api error', error)
    }
  }

  const [projectIds, setprojectIds] = useState([]);
  const [usersData, setUsers] = useState([]);
  const fetchusers = async () => {
    try {
      const res = await axios.get('/api/users');
      if (res.status === 201) {
        setUsers(res.data.users);
        setprojectIds(res.data.users.projectList);
      } else {
        console.log('fetch post error');
      }
    } catch (error) {
      console.log('get users api error', error)
    }
  }

  useEffect(() => {
    fetchusers();
    fetchProjects();
  }, [])



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
      key: 'rzp_live_ZBISemUZOvkeJA',
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
      handler: function (response) {
        console.log(response, "34")
        axios.post('/api/payment/verify', { response: response, email: usersData?.email, projectId: data?.notes?.projectId })
          .then(res => {
            // console.log(res, "37");
            router.push(`/dashboard/${data?.notes?.projectId}`)
          })
          .catch(err => {
            console.log(err)
          })
      }

    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const toast = useToast();
  // payment btn 
  const handlePayment = (id, price) => {
    toast({ title: "Payment is Being Processing..", status: 'info', duration: 4000, position: 'top', isClosable: true });

    const _data = { amount: price, projectId: id, email: usersData?.email, fullName: usersData?.fullName }
    axios.post('/api/payment/order', _data)
      .then(res => {
        // console.log(res.data, "29")
        handleOpenRazorpay(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <>

      <main className="mainBody" id='learnmore'>
        {
          <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(350px, 1fr))' className='pb-20 mt-10'>
            {
              isEmptyArray(projects) ? <ProjectMedia /> :
                projects.map((project, index) => {
                  console.log()
                  return (
                    <div key={index} className='projectCard'>
                      <Link href={`/dashboard/${project?._id}`}>
                        <Image
                          src={`${s3_bucket_url}/thumbnails/${project?.thumbnail}`}
                          alt="Picture of the codemarket"
                          width={500} //automatically provided
                          height={500} //automatically provided
                          blurDataURL="data:..." // automatically provided
                          placeholder="blur" // Optional blur-up while loading
                          className='imageThumbnail'
                        />
                        <div className='p-1 title'>{project?.title}</div>
                        <div className='p-1 description'>{project?.description}</div>
                        <div className="mt-2 p-1">
                          {projectIds?.includes(project?._id) ? (
                            <div className="description">Purchased</div>
                          ) : (
                            <div className="description">Price: ₹{project?.price} /-</div>
                          )}
                        </div>
                        <div className="description p-1">Total Downloads: {project?.downloads > 1000 ? formatLikes(project?.downloads) : formatLikes(project?.downloads)}</div>

                      </Link>
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
                                Download Project Source Codes
                              </Button>
                            </a>
                            :
                            <Button
                              className='downloadButton'
                              leftIcon={<ShoppingCartIcon sx={{ marginRight: '-5px', fontSize: '18px' }} />}
                              onClick={() => { handlePayment(project?._id, project?.price) }}>
                              Buy Project
                            </Button>
                        }
                      </div>
                    </div>
                  )
                })
            }
          </SimpleGrid>
        }
      </main>
    </>
  )
}
