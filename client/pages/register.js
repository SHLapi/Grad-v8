import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Context } from '../context/index';
// import { user } from '../models/user';



const register = () => {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { state } = useContext(Context);
    const { user } = state;
    const router = useRouter();

    useEffect(() => { if (user !== null) router.push("/"); }, [user]);

    const handleSubmit= async (e)=>{
        try{
            setLoading(true);
            e.preventDefault();
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, 
            {
                fname,
                lname, 
                email, 
                password,
            });
            // console.log(data);
            toast.success("REGISTERED SUCCESSFULLY");
            setLoading(false);
            router.push("/login");
        }catch(err){
            toast(err.response.data);
            setLoading(false);
        }
    };
return (
    <>
        <br/>
        <h3 style= {{display:'flex', alignItems:'center',justifyContent:'center'}}>Register</h3><br/>
        <div className="container col-md-4 offset-md-4 pb-5">
            <div className="">
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    key="fname"
                    className="form-control mb-4 pb-2" 
                    value={fname} 
                    onChange={e=>setFName(e.target.value)}
                    placeholder="First name"
                    required />

                    <input 
                    type="text" 
                    key="lname"
                    className="form-control mb-4 pb-2" 
                    value={lname}
                    onChange={e=>setLName(e.target.value)}
                    placeholder="Last name"
                    required />

                    <input 
                    type="Email" 
                    key="email"
                    className="form-control mb-4 pb-2" 
                    value={email} 
                    onChange={e=>setEmail(e.target.value)}
                    placeholder="Email" 
                    required />

                    <input 
                    type="password" 
                    className="form-control mb-4 pb-2 " 
                    value={password} 
                    key="password"
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="Password" 
                    required />
                    
                    
                    <p className="text-center p-3"> Already on Courseme ?{"  "}
                        <Link href="/login">
                            <a>login</a>
                        </Link>
                    </p>
                    
                    <button 
                    className='btn btn-primary block'
                    type="submit"
                    key="submit"
                    disabled={!fname || !password || !email || loading }
                    > 
                    {loading? <SyncOutlined spin /> : 'Register'}
                    </button>

                </form>
            </div>
        </div>
    </>
)
}

export default register