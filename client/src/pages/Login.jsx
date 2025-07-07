import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios';
import { Link } from 'react-router-dom';

// yup resolver, react hook form
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../lib/validations/loginSchema";
import { useForm} from 'react-hook-form'

import { useAuth } from "../context/AuthContext";

const Register = () => {
    const { setUser } = useAuth();


    const toastss = (msg) => toast(msg)
    const navigate = useNavigate();

    // methods to integrate yup with RHK
    const methods = useForm({
        resolver: yupResolver(loginSchema)
    });

    // react hook form methods with yup resolver
    const { register, handleSubmit, formState: { errors } } = methods;

    const handleLogin = async (data) => {
        const email = data.email
        const password = data.password
        // console.log(username, password)
        try {
            console.log(email)
            console.log(password)
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
            console.log(res.data)
            setUser(res.data.user)
            if (res.status == 200) {
                navigate('/dashboard', {
                    state: { toast: { message: 'Login successful!' } }
                });
            }
        } catch (err) {
            toast.error("user not registered")
            console.log(err)
        }

    };

    return (

        <section className="text-gray-400 bg-gray-900 h-screen body-font">
            <ToastContainer />
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-3xl text-white">Welcome Back to Your Code Review Hub</h1>
                    <p className="leading-relaxed mt-4">Continue collaborating, refining, and reviewing code — smarter and faster.</p>
                </div>
                <form onSubmit={handleSubmit((data) => handleLogin(data))} className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-white text-lg font-medium title-font mb-5">Log In</h2>

                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                        <input {...register("email")} type="email" id="email" name="email" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-900 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <p className='text-red-500 text-sm'>{errors.email?.message}</p>
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                        <input {...register("password")} type="password" id="password" name="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-900 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <p className='text-red-500 text-sm'>{errors.password?.message}</p>
                    </div>
                    <button type='submit' className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Login</button>
                    <p className="text-xs mt-3">Don't have an account? <Link className='text-purple-300 underline' to="/">Register</Link></p>
                </form>
            </div>
        </section>


    );
}
export default Register