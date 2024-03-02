import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className=" self-center whitespace-nowrap text-xl sm:text-2xl font-semibold dark:text-white "
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-2xl">
                Alfred's{" "}
              </span>{" "}
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6 mt-6">
            <div className="">
              <Footer.Title title="About" className="text-lg sm:text-xl" />
              <Footer.LinkGroup col className="text-[16px]">
                <Footer.Link
                  href="https://www.alfred'sbetprediction.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bet Prediction Mobile App
                </Footer.Link>

                <Footer.Link
                  href="https://www.alfred'sbetprediction.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bet Prediction Mobile App
                </Footer.Link>

                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Alfred's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow us" className="text-lg sm:text-xl" />
              <Footer.LinkGroup col className="text-[16px]">
                <Footer.Link
                  href="https://www.github.com/techyobura"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Code base
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" className="text-lg sm:text-xl" />
              <Footer.LinkGroup col className="text-[16px]">
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex justify-center items-center mt-4">
          <Footer.Copyright
            href="#"
            by="Alfred's blog"
            year={new Date().getFullYear()}
          />
        </div>
        <div className="flex gap-6 mt-4 justify-center">
          <Footer.Icon href="#" icon={BsFacebook} />
          <Footer.Icon href="#" icon={BsTwitter} />
          <Footer.Icon href="#" icon={BsInstagram} />
          <Footer.Icon href="https://github.com/techyobura" icon={BsGithub} />
          <Footer.Icon href="#" icon={BsDribbble} />
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
