import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Button, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';

function ProjectMedia() {
    return (
        <>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={500} //automatically provided
                    height={700} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px" }}
                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <div className='btnGroup'>
                    <Button className='mr-2'>
                        <Skeleton animation="wave" style={{ width: '100px' }} />
                    </Button>
                    <Button >
                        <Skeleton animation={false} style={{ width: '100px' }} />
                    </Button>
                </div>
            </Box>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={500} //automatically provided
                    height={700} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px" }}
                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <div className='btnGroup'>
                    <Button className='mr-2'>
                        <Skeleton animation="wave" style={{ width: '100px' }} />
                    </Button>
                    <Button >
                        <Skeleton animation={false} style={{ width: '100px' }} />
                    </Button>
                </div>
            </Box>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={500} //automatically provided
                    height={700} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px" }}
                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <div className='btnGroup'>
                    <Button className='mr-2'>
                        <Skeleton animation="wave" style={{ width: '100px' }} />
                    </Button>
                    <Button >
                        <Skeleton animation={false} style={{ width: '100px' }} />
                    </Button>
                </div>
            </Box>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={500} //automatically provided
                    height={700} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px" }}
                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <div className='btnGroup'>
                    <Button className='mr-2'>
                        <Skeleton animation="wave" style={{ width: '100px' }} />
                    </Button>
                    <Button >
                        <Skeleton animation={false} style={{ width: '100px' }} />
                    </Button>
                </div>
            </Box>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={500} //automatically provided
                    height={700} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px" }}
                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <div className='btnGroup'>
                    <Button className='mr-2'>
                        <Skeleton animation="wave" style={{ width: '100px' }} />
                    </Button>
                    <Button >
                        <Skeleton animation={false} style={{ width: '100px' }} />
                    </Button>
                </div>
            </Box>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={500} //automatically provided
                    height={700} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px" }}
                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <div className='btnGroup'>
                    <Button className='mr-2'>
                        <Skeleton animation="wave" style={{ width: '100px' }} />
                    </Button>
                    <Button >
                        <Skeleton animation={false} style={{ width: '100px' }} />
                    </Button>
                </div>
            </Box></>


    );
}

function SingleProject() {
    return (
        <div className="singleproduct">
            <div className="image-container">
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
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
                    <div className="projectTitle"><Skeleton animation="wave" />
                        <Skeleton animation={false} />
                        <Skeleton /></div>
                </div>
                <div className="mt-2">
                    <div className="descriptionTitle">Description</div>
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                    <Skeleton />
                </div>

                <div className="mt-2">
                    <div className="descriptionTitle">Price</div>
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                    <Skeleton />
                </div>
                {/* <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={500} //automatically provided
                    height={700} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px" }}
                /> */}
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <div className='btnGroup'>
                    <Button className='mr-2'>
                        <Skeleton animation="wave" style={{ width: '100px' }} />
                    </Button>
                    <Button >
                        <Skeleton animation={false} style={{ width: '100px' }} />
                    </Button>
                </div>
            </div>
        </div>
    )
}


function ScreenShortsMedia() {
    return (
        <>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={1000} //automatically provided
                    height={100} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px", height: '90px' }}

                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
            </Box>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={1000} //automatically provided
                    height={100} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px", height: '90px' }}

                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
            </Box>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={1000} //automatically provided
                    height={100} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px", height: '90px' }}

                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
            </Box>
            <Box className='projectCard'>
                <Image
                    src={`https://static.vecteezy.com/system/resources/previews/002/701/271/original/light-gray-gradient-blur-background-vector.jpg`}
                    alt="Picture of the codemarket"
                    width={1000} //automatically provided
                    height={100} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                    style={{ borderRadius: "5px", height: '90px' }}

                />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
            </Box>
        </>

    );
}
export { ProjectMedia, SingleProject, ScreenShortsMedia }