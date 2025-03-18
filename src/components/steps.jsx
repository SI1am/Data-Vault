import Stepper, { Step } from "./Stepper";
import { LampContainer } from "./lamp";
import { motion } from "framer-motion";
const Steps = () => {

    return (
        <div>
            {/* <LampContainer className="w-full h-full"> */}
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8  py-4 text-4xl font-medium text-center text-black  md:text-7xl">
                How it works?
            </motion.h1>
            <Stepper
                initialStep={1}
                onFinalStepCompleted={() => console.log("All steps completed!")}
                backButtonText="Previous"
                nextButtonText="Next"

            >
                <Step>
                    <div className="p-6 w-full bg-white rounded-lg">
                        <span className="text-4xl font-bold text-blue-600">1</span>
                        <h3 className="text-xl font-semibold mt-2">Sign Up</h3>
                        <p className="text-gray-600 mt-2">Create your Account.</p>
                    </div>
                </Step>
                <Step>
                    <div className="p-6 bg-white rounded-lg">
                        <span className="text-4xl font-bold text-blue-600">2</span>
                        <h3 className="text-xl font-semibold mt-2">Upload Your Files</h3>
                        <p className="text-gray-600 mt-2"></p>
                    </div>
                </Step>
                <Step>
                    <div className="p-6 bg-white rounded-lg">
                        <span className="text-4xl font-bold text-blue-600">3</span>
                        <h3 className="text-xl font-semibold mt-2">Share </h3>
                        <p className="text-gray-600 mt-2"></p>
                    </div>
                </Step>
                <Step>
                    <div className="p-6 bg-white rounded-lg">
                        <span className="text-4xl font-bold text-blue-600">4</span>
                        <h3 className="text-xl font-semibold mt-2">Done</h3>
                        <p className="text-gray-600 mt-2">Welcome to Data-Vault</p>
                    </div>
                </Step>
            </Stepper>
            {/* </LampContainer> */}
        </div>

    );
};

export default Steps;
