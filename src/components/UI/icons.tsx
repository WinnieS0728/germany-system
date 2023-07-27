import { TfiHarddrive } from "react-icons/tfi";
import { FaPen, FaArrowLeft } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";
import { BiSearchAlt2, BiErrorAlt } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiSolidChevronDownCircle } from "react-icons/bi";

export const Save = () => <TfiHarddrive className='text-xl' />;

export const Add = () => <FaPen />;

export const Back = () => <FaArrowLeft />;

export const AddFiles = () => <MdCreateNewFolder className='text-xl' />;

export const Send = () => <PiNotePencilFill className='text-xl' />;

export const Search = () => <BiSearchAlt2 />;

export const NewDetail = () => <AiFillPlusCircle />;

export const ShowDetail = () => <BiSolidChevronDownCircle />;

export const Delete = () => (
  <FaMinusCircle style={{ color: "red", fontSize: "1.25rem" }} />
);

export const Error = () => <BiErrorAlt style={{ color: "red" }} />;
