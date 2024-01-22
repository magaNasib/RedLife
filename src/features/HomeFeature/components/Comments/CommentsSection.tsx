import {
    CardHeader,
    IconButton,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import React, { useState, useContext } from "react";
import { arrayUnion, doc, updateDoc, } from "firebase/firestore";
import { IPost } from "../AddPost";
import { auth, db } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AppContext";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
import Comment from "./Comment";

const CommentSection: React.FC<IPost> = ({ id, comments }) => {
    console.log(id);

    const { t } = useTranslation();
    const [text, setText] = useState('')
    const navigate = useNavigate();
    const triggerContext = useContext<any>(AuthContext)
    const [loading, setLoading] = useState(false)

    const addCommentHandler = () => {
        if (!auth.currentUser) return navigate('/login')
        setLoading(true)
        if (text) {

            const userDocRef = doc(db, 'donors', id);
            const myComment = {
                id: uuidv4(),
                displayName: auth.currentUser.displayName,
                comment: text,
                publish_date: new Date(),
                uid: auth.currentUser.uid
            }
            const updateData = {
                ['comments']: arrayUnion(myComment)
            };

            updateDoc(userDocRef, updateData)
                .then(() => {
                    setText('')
                    console.log('Document successfully updated!');
                    triggerContext.setTrigger((curr: boolean) => !curr)
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                })
                .finally(()=>{
                    setLoading(false)
                })
        }

    }

    return (
        <>
            <CardHeader bg='#FAFAFA'>
                {
                    comments.length > 0 && comments?.map((comment, index) => {
                        return <Comment {...comment} postId={id} key={index} />
                    })
                }
                <InputGroup>
                    <Input type="text" placeholder={t("CommentPlaceholder")} value={text} onChange={(e) => setText(e.target.value)} />
                    <InputRightElement>
                        <IconButton
                            onClick={addCommentHandler}
                            variant="ghost"
                            colorScheme="blue"
                            isLoading={loading}
                            aria-label="See menu"><FaArrowUp />
                        </IconButton>
                    </InputRightElement>
                </InputGroup>
            </CardHeader>
        </>

    )

}

export default CommentSection;