import React from "react";
import { IoIosFlash, IoIosLink } from "react-icons/io";
import { Link } from "react-router-dom";
import FeaturesCard from "../components/FeaturesCard";
import { FaCode, FaCodeBranch, FaLock, FaRobot } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";

const Home = () => {
    const featuresArr = [
        {
            icon: <IoIosFlash size={50} className="text-blue-500" />,
            head: "Real Time Collaboration",
            subHead: "Instantly see what others are typing...",
            hoverColor: "blue-950",
        },
        {
            icon: <FaRobot size={50} className="text-purple-500" />,
            head: "AI-Powered Suggestions",
            subHead: "Get intelligent suggestions...",
            hoverColor: "purple-950",
        },
        {
            icon: <FaCode size={50} className="text-green-500" />,
            head: "Monaco Code Editor",
            subHead: "Experience the power of VS Code...",
            hoverColor: "green-950",
        },
        {
            icon: <FaLock size={50} className="text-red-500" />,
            head: "Private & Secure Rooms",
            subHead: "Each room is unique and protected...",
            hoverColor: "red-950",
        },
        {
            icon: <CiMobile1 size={50} className="text-indigo-500" />,
            head: "Fully Responsive Design",
            subHead: "Join rooms, edit code, and review...",
            hoverColor: "indigo-950",
        }
    ];


    return (
        <>
            <section className={`relative h-[80vh] bg-cover bg-center bg-no-repeat bg-[url(/hero.png)] select-none`}>
                <div className="absolute inset-0 bg-black/50 bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
                        Review-Sync
                    </h1>
                    <h2 className="text-gray-300 text-lg md:text-2xl max-w-3xl leading-relaxed">
                        Collaborate, Code, Create - with AI
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Real-time collaboration with live editor, AI suggestions, and team review tools, all that just in your browser.
                    </p>
                    <Link to="/Register" className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg justify-center items-center mt-5">
                        Get Started
                    </Link>
                </div>
            </section>
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 py-24 mx-auto">

                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-xs text-blue-400 tracking-widest font-medium title-font mb-1">Review Sync</h2>
                        <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-white">Key Features</h1>
                    </div>

                    <div className="flex flex-wrap -m-4 justify-center md:gap-y-10 gap-0">
                        {
                        featuresArr.map((feature, indx) => (
                            <FeaturesCard
                                key={indx}
                                icon={feature.icon}
                                head={feature.head}
                                subHead={feature.subHead}
                                hoverColor={feature.hoverColor}
                            />
                        ))
                        }
                    </div>
                </div>
            </section>

            <footer class="text-gray-400 bg-gray-900 body-font">
                <div class="container px-5 py-8 mx-auto flex items-center justify-center sm:flex-row flex-col">
                    <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <img src="/logo.png" className='w-12 h-12 aspect-square rounded' />
                        <span class="ml-3 text-xl">Review Sync</span>
                    </a>
                    <p class="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2025 ReviewSync
                    </p>
                </div>
            </footer>
        </>

    );
};

export default Home;