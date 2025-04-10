import React from "react";
import Stepper, { Step } from "./Stepper";
import { motion } from "framer-motion";

const Steps: React.FC = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 py-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black dark:text-[#f8fafc]"
            >
                How Data
                <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#93c5fd] inline-block text-transparent bg-clip-text">
                    Vault
                </span>{" "}
                Works
            </motion.h1>

            <Stepper
                initialStep={1}
                onFinalStepCompleted={() => console.log("All steps completed!")}
                backButtonText="Back"
                nextButtonText="Continue"
            >
                <Step>
                    <div className="p-4 sm:p-6 w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-[#3b82f6]/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <span className="text-3xl sm:text-4xl font-bold text-[#3b82f6] dark:text-[#60a5fa]">1</span>
                        <h3 className="text-xl sm:text-2xl font-semibold mt-2 text-black dark:text-[#f8fafc]">Create Your Vault</h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-[#f8fafc]/80 mt-2">
                            Sign up and instantly create a secure digital vault for your files.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="p-4 sm:p-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-[#3b82f6]/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <span className="text-3xl sm:text-4xl font-bold text-[#3b82f6] dark:text-[#60a5fa]">2</span>
                        <h3 className="text-xl sm:text-2xl font-semibold mt-2 text-black dark:text-[#f8fafc]">Upload</h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-[#f8fafc]/80 mt-2">
                            Upload documents and let DataVault handle it for you.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="p-4 sm:p-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-[#3b82f6]/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <span className="text-3xl sm:text-4xl font-bold text-[#3b82f6] dark:text-[#60a5fa]">3</span>
                        <h3 className="text-xl sm:text-2xl font-semibold mt-2 text-black dark:text-[#f8fafc]">Access Anywhere</h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-[#f8fafc]/80 mt-2">
                            Securely access or share your files anytime, anywhere with full integrity assurance.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="p-6 bg-white dark:bg-[#150050] border border-gray-200 dark:border-[#3F0071]/50 rounded-2xl shadow-sm">
                        <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">4</span>
                        <h3 className="text-2xl font-semibold mt-2 text-black dark:text-white">Stay Protected</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Enjoy peace of mind with advanced security and real-time breach monitoring.
                        </p>
                    </div>
                </Step>
            </Stepper>

        </div>
    );
};

export default Steps;
