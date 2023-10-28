import axios from 'axios'
// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
  // const res = await axios.post(`${process.env.api_url}/api/users`, {
  //   name: 'amit', roll: '120'
  // })
  // console.log(res.data.users, res.status);

  return <h1>Hello, Home page!</h1>
}