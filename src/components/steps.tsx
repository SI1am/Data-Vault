import React from "react";
import Stepper, { Step } from "./Stepper";
import { motion } from "framer-motion";

const Steps: React.FC = () => {
    return (
        <div>
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 py-4 text-4xl font-bold text-center text-black md:text-6xl"
            >
                How Data
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 inline-block text-transparent bg-clip-text">
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
                    <div className="p-6 w-full bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <span className="text-4xl font-bold text-blue-600">1</span>
                        <h3 className="text-2xl font-semibold mt-2">Create Your Vault</h3>
                        <p className="text-gray-600 mt-2">
                            Sign up and instantly create a secure digital vault for your files.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <span className="text-4xl font-bold text-blue-600">2</span>
                        <h3 className="text-2xl font-semibold mt-2">Upload</h3>
                        <p className="text-gray-600 mt-2">
                            Upload documents and let DataVault handle it for you.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <span className="text-4xl font-bold text-blue-600">3</span>
                        <h3 className="text-2xl font-semibold mt-2">Access Anywhere</h3>
                        <p className="text-gray-600 mt-2">
                            Securely access or share your files anytime, anywhere with full integrity assurance.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <span className="text-4xl font-bold text-blue-600">4</span>
                        <h3 className="text-2xl font-semibold mt-2">Stay Protected</h3>
                        <p className="text-gray-600 mt-2">
                            Enjoy peace of mind with advanced security and real-time breach monitoring.
                        </p>
                    </div>
                </Step>
            </Stepper>

        </div>
    );
};

export default Steps;
