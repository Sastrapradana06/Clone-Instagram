import { Flex } from "@mantine/core";
import ButtonLink from "./button-link";
import { FaArrowLeftLong } from "react-icons/fa6";
import PropTypes from "prop-types";


export default function NavLink({ title, url }) {
  return (
    <div className="w-full h-max fixed bg-zinc-800 flex justify-center py-4 top-0">
      <Flex className="w-[90%] h-max m-auto " align={'center'} gap={'lg'}>
        <ButtonLink title={<FaArrowLeftLong size={20} />} url={`${url}`} style="cursor-pointer" />
        <p className="font-semibold">{title}</p>
      </Flex>

    </div>
  )
}

NavLink.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};