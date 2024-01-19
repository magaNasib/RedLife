import { Button, IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader } from "@chakra-ui/popover";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaCopy } from "react-icons/fa";
import { MdDelete, MdReport } from "react-icons/md";
import { auth } from "../../firebase";
import { useToast } from "@chakra-ui/toast";
import { BiShare } from "react-icons/bi";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

const PostScoialButtons = ({ id }: { id: string }) => {
    const toast = useToast()

    return (

        <Popover>
        <PopoverTrigger>
            <Button flex="1" variant="ghost" leftIcon={<BiShare size={20} />} >

            </Button>
        </PopoverTrigger>
        <PopoverContent borderRadius={'15px'} bgColor={'gray.50'} w={'auto'} minW={'140px'} p={'2'}>
            <Flex gap={'2'}>
                <FacebookShareButton
                    url={window.location.href + id}
                    hashtag="#redlife"
                >
                    <FacebookIcon size={32} round />        
                </FacebookShareButton>
                <TwitterShareButton
                    url={window.location.href + id}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                    url={window.location.href + id}
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton
                    url={window.location.href + id}
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </Flex>
        </PopoverContent>
    </Popover>

    )
}

export default PostScoialButtons