"use client"
import React, { ChangeEvent, useEffect, useState } from 'react';
import './css/adminpanel.css';
import { Button, ChakraProvider, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { customTheme } from '../components/chakraui';

export default function AdminPanel({ params }: any) {

    const toast = useToast();

    const [projectData, setProjectData] = useState({
        uploadtype: '',
        title: '',
        description: '',
        likes: 0,  // Initialize with 0
        downloads: 0,  // Initialize with 0
        price: 0,
    });

    const inputData1 = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    }

    const selectInput = (e: ChangeEvent<HTMLSelectElement>) => {
        setProjectData({ ...projectData, uploadtype: e.target.value });
        localStorage.setItem('type', e.target.value);
    }


    const [fileData, setfileData] = useState({
        file: '',
        thumbnail: '',
    });
    const fileInput1 = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setfileData({ ...fileData, [e.target.name]: file });
            // Handle the file here, e.g., save it to state or perform other actions.
        } else {
            // Handle the case when no file is selected
        }
    }

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const typeFromLocalStorage = localStorage.getItem('type');
            if (typeFromLocalStorage) {
                setProjectData((prevData) => ({
                    ...prevData,
                    uploadtype: typeFromLocalStorage,
                }));
            }
        }
    }, []); // Include projectData as a dependency

    const [isDisabledButton, setisDisabledButton] = useState(false);

    const publishData = async () => {
        const { title, description, likes, downloads, price } = projectData;
        if (!title) {
            toast({ title: 'Enter Project Title', status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else if (!description) {
            toast({ title: 'Enter Project Description', status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else if (!price) {
            toast({ title: 'Enter Project price', status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else if (!likes) {
            toast({ title: 'Increase Likes', status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else if (!downloads) {
            toast({ title: 'Increase Downloads', status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else {
            const formData = new FormData();
            formData.set('file', fileData.file);
            formData.set('thumbnail', fileData.thumbnail);
            formData.set('title', projectData.title);
            formData.set('description', projectData.description);
            formData.set('likes', projectData.likes.toString());
            formData.set('price', projectData.price.toString());
            formData.set('downloads', projectData.downloads.toString());
            try {
                setisDisabledButton(true);
                const res = await axios.post(`/api/projects`, formData);
                if (res.status === 201) {
                    toast({ title: res.data.msg, status: 'success', duration: 4000, position: 'top-right', isClosable: true });
                    window.location.reload();
                    setisDisabledButton(false);
                } else {
                    setisDisabledButton(false);
                    toast({ title: res.data.msg, status: 'error', duration: 4000, position: 'top-right', isClosable: true });
                }
            } catch (error) {
                setisDisabledButton(false);
                console.log('publish api error', error)
            }
        }
    }

    return (
        <main className="adminpanel">
            <ChakraProvider theme={customTheme} />
            <form className='uploadproject'>
                <div>
                    <select
                        value={projectData?.uploadtype}
                        id="type"
                        name="uploadtype"
                        onChange={selectInput}
                        autoComplete="country-name"
                        className="form-control mt-3 p-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value='new'>Publish New Project</option>
                        <option value='update'>Already Have Project</option>
                    </select>


                    {
                        projectData?.uploadtype === 'new' ?
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    onChange={inputData1}
                                    id="title"
                                    autoComplete="title"
                                    className="mt-3 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Project Title"
                                />

                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={inputData1}
                                    rows={3}
                                    className="mt-3 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-10"
                                    defaultValue={''}
                                    placeholder='Descriptions..'
                                />

                                <input
                                    type="number"
                                    name="price"
                                    onChange={inputData1}
                                    id="price"
                                    autoComplete="price"
                                    className="mt-3 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="₹ Price"
                                />
                                <input
                                    type="number"
                                    name="likes"
                                    onChange={inputData1}
                                    id="likes"
                                    autoComplete="likes"
                                    className="mt-3 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Likes"
                                />
                                <input
                                    type="number"
                                    name="downloads"
                                    onChange={inputData1}
                                    id="downloads"
                                    autoComplete="downloads"
                                    className="mt-3 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Downloads"
                                />

                                <div className='mt-3'>
                                    <label>Thumbnail</label>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={fileInput1}
                                        id="thumbnail"
                                        autoComplete="thumbnail"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="thumbnail"
                                    />
                                </div>

                                <div className='mt-3'>
                                    <label>File</label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={fileInput1}
                                        id="file"
                                        autoComplete="file"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="file"
                                    />
                                </div>
                            </div>

                            :
                            <div>
                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={inputData1}
                                    rows={3}
                                    className="mt-3 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-10"
                                    defaultValue={''}
                                    placeholder='Descriptions..'
                                />

                                <input
                                    type="file"
                                    name="image"
                                    onChange={inputData1}
                                    id="image"
                                    autoComplete="image"
                                    className="mt-3 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="image"
                                />

                            </div>

                    }


                </div>


                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button type='reset' className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Button>
                    <Button
                        onClick={publishData}
                        isLoading={isDisabledButton}
                        loadingText='Publishing..'
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover-bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Publish
                    </Button>
                </div>
            </form>
        </main>
    )
}
