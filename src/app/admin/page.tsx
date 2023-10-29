import './css/adminpanel.css'

export default async function AdminPanel({ params }: any) {
    return (
        <main className="adminpanel">
            <div>
                <div> Upload Project </div>
                <div>
                    <input type='text' className='form-control'/>
                </div>
            </div>

            <div>
                <div> Project Details </div>
            </div>
        </main>
    )
}