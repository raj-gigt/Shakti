import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import prosumerImage from "../assets/prosumer.jpeg";
import consumerImage from "../assets/consumer.jpeg";
import producerImage from "../assets/producer.jpeg";
import evChargingImage from "../assets/evCharging.jpeg";
import rePredImage from "../assets/REPred.jpeg";
import loadPredImage from "../assets/loadPred.jpeg";
import algoTradingImage from "../assets/algoTrading.jpeg";
import paymentImage from "../assets/payment.jpeg";

const LandingPage = () => {
  return (
    //<div className="p-4">
    //  <h1 className="text-2xl font-bold">Home Page</h1>
    //
    //  <p>Welcome to the Energy Trading Platform.</p>
    //</div>
    <div>
      <Navbar />
      <div className="pt-20 md:pt-24 lg:pt-32 p-4 md:p-8">
        <div id="home" className="scroll-mt-20 p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800">
            Unlock Energy Savings: Trade Renewable Power Seamlessly
          </h1>
          <p className="text-lg md:text-2xl mt-2 text-center text-gray-600">
            Trade with local buyers and sellers to get the best rates on clean
            energy.
          </p>
          <div className="mt-6 flex flex-col items-center">
            <div className="text-xl md:text-3xl font-bold mb-2 text-blue-600">
              Simple
            </div>
            <div className="text-xl md:text-3xl font-bold mb-2 text-blue-600">
              Transparent
            </div>
            <div className="text-xl md:text-3xl font-bold text-blue-600">
              Efficient
            </div>
          </div>
        </div>
        <div id="features" className="scroll-mt-20 p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Features and Benefits
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card
              title="Prosumer"
              backgroundImage={prosumerImage}
              oneLiner="Maximize returns on RTS installations"
            />
            <Card
              title="Consumer"
              backgroundImage={consumerImage}
              oneLiner="Reduce Electricity Bills"
            />
            <Card
              title="Producer"
              backgroundImage={producerImage}
              oneLiner="Get higher Feed in Tariffs"
            />
            <Card
              title="EV Charging"
              backgroundImage={evChargingImage}
              oneLiner="Optimize EV charging schedules"
            />
          </div>
        </div>
        <div id="how-it-works" className="scroll-mt-20 p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            How It Works
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card
              title="Predicting RE Generation"
              backgroundImage={rePredImage}
              oneLiner="Integrate Local & Global Data for RE Prediction"
            />
            <Card
              title="Demand Forecasting"
              backgroundImage={loadPredImage}
              oneLiner="Predict Device Level Energy Consumption"
            />
            <Card
              title="Algorithmic Energy Trading"
              backgroundImage={algoTradingImage}
              oneLiner="Automate Energy Bids & Demand Management"
            />
            <Card
              title="Integrated Billing Interface"
              backgroundImage={paymentImage}
              oneLiner="Interface with EB Meters and DISCOM Billing Platform"
            />
          </div>
        </div>
        <div id="workflow" className="scroll-mt-20 p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Workflow
          </h1>
          <div className="workflow-container relative mt-4">
            <div className="workflow-step step-1">
              <div className="workflow-step-circle">1</div>
              <div className="workflow-step-content">
                Create an account with your energy meter connection ID and phone
                number
              </div>
            </div>
            <div className="workflow-step step-2">
              <div className="workflow-step-circle">2</div>
              <div className="workflow-step-content">
                Set up your account by entering the electrical system details
              </div>
            </div>
            <div className="workflow-step step-3">
              <div className="workflow-step-circle">3</div>
              <div className="workflow-step-content">
                Sit back and enjoy your savings
              </div>
            </div>
            <div className="workflow-connector"></div>
          </div>
        </div>
        <div id="contact-us" className="scroll-mt-20 p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Contact Us
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Get in touch with our support team.
          </p>
          <div className="mt-4">
            <p className="text-gray-700">
              <strong>Harish:</strong> 9786324868
            </p>
            <p className="text-gray-700">
              <strong>Keshav:</strong> 8471802972
            </p>
            <p className="text-gray-700">
              <strong>Harshin:</strong> 7356793830
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
