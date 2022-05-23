import Dialog from "../../components/Dialog";
import { BannerIcon } from "./BannerIcon";
import DungImage from "../../images/dung.jpg";
import QuangImage from "../../images/quang.jpg";
import NhanImage from "../../images/nhan.jpg";
import TeacherImage from "../../images/hoang-dung.png";
import hcmuteLogo from "../../images/hcmute.jpeg";
import { Button } from "../../components/Button";
import { useState } from "react";

interface IBannerProps {}

const authors = [
  {
    name: "Tien Dung",
    image: DungImage,
  },
  {
    name: "Viet Quang",
    image: QuangImage,
  },
  {
    name: "Van Nhan",
    image: NhanImage,
  },
];

const Banner: React.FC<IBannerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex w-full space-x-2">
        <BannerIcon className="flex-shrink-0 w-30 h-30" />
        <div>
          <h1 className="mb-1 text-4xl font-bold">Maze Solving Simulation</h1>
          <h2 className="text-lg font-normal text-gray-600">
            The primary goal of this application is to create an simulation maze
            which is able to find way from start point to goal in the maze.
            <br />
            We use many different algorithms to find the way.
          </h2>
          <div className="mt-4">
            <h3 className="mt-1 text-lg font-bold">Authors</h3>
            <div className="flex mt-1 space-x-2">
              {authors.map(({ name, image }) => (
                <AvatarCard name={name} avatar={image} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mt-1 text-lg font-bold">Teacher</h3>
            <div className="mt-1">
              <AvatarCard name="Hoang Dung" avatar={TeacherImage} />
            </div>
          </div>
          <div className="flex items-center mt-3 space-x-1">
            {/* <img src={hcmuteLogo} className="object-cover w-4 h-4" /> */}
            <p className="text-lg text-gray-600 text-md ">
              Student from Ho Chi Minh University of Technology and Education
            </p>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            rightIcon={<RightIcon />}
            className="mt-1 ml-auto mr-0"
          >
            Continue
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default Banner;

const AvatarCard: React.FC<{ name: string; avatar: string }> = ({
  name,
  avatar,
}) => {
  return (
    <div className="flex items-center">
      <img
        src={avatar}
        alt={name + " | Author"}
        className="object-cover w-5 h-5 rounded-full"
      />
      <p className="ml-1 font-bold text-gray-600 ">{name}</p>
    </div>
  );
};

export const RightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2 h-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
