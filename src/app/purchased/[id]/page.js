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
import { s3_bucket_url } from '@/app/components/configrations';
import { ProjectMedia } from '@/app/components/CustomLoading';
import { isEmptyArray } from '@/app/components/CustomFunctions';

export default async function Purchased({ params }) {
  const id = params.id

  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const res = await axios.post('/api/projects/multiproject', { userId: id });
      if (res.status === 201) {
        setProjects(res.data.projects)

      } else {
        console.log('fetch post error');
      }
    } catch (error) {
      console.log('publish api error', error)
    }
  }
  useEffect(() => {
    if (id) {
      fetchProjects();
    }
  }, [id]);


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

  const toast = useToast();


  return (
    <div className="mainBody" id='learnmore'>
      {
        <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(350px, 1fr))' className='pb-20 mt-10'>
          {
            isEmptyArray(projects) ? <div className="text-center">You have not purchased any projects</div> :
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

                        <div className="description">Purchased</div>

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

                    </div>
                  </div>
                )
              })
          }
        </SimpleGrid>
      }
    </div>
  )
}
