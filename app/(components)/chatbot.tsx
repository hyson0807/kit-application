import {View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform} from 'react-native'
import React, {useState} from 'react'
import {AntDesign} from "@expo/vector-icons";
import {router} from "expo-router";
import { useMutation, useQuery } from "convex/react";
import {api} from "@/convex/_generated/api";


const Chatbot = () => {
    const sendQuestion = useMutation(api.chat.sendQuestion); //질문 db 저장
    const user = useQuery(api.users.getUserInfo); //유저정보 (clerk_id, username)
    const question = useQuery(api.chat.getQuestion); // 질문 querying
    const [newQuestion, setNewQuestion] = useState("");


    if (!user || !question) {
        return (
            <View className="flex-1 items-center justify-center"><Text>Loading</Text></View>
        )
    }




    const data = [
        {id: '1', text: "123"},
        {id: '2', text: "123"},
        {id: '3', text: "123"},
    ]

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="flex-1">
                {/* 헤더 */}
                <View className='flex flex-row items-center justify-between w-full h-10 bg-slate-400 px-3' >
                    <AntDesign name="left" size={24} color="black" onPress={()=> router.push("/forum")}/>
                    <Text>{user.username}</Text>
                    <Text>Profile</Text>
                </View>
                {/* 채팅 메세지 화면 */}
                <ChatContainer/>
                {/* 질문입력+버튼 */}
                <View className="absolute bottom-0 w-full flex flex-row justify-between   border-t-2 rounded-md bg-white px-3 py-3 ">
                    <TextInput
                        value={newQuestion}
                        onChangeText={(newQuestion) => setNewQuestion(newQuestion)}
                        placeholder="Write a question..."
                        autoCapitalize="none"
                        className="flex-1"
                    />
                    <TouchableOpacity
                        className="flex items-center justify-center w-10 h-10 rounded-full border-2"
                        onPress={() => {
                            if (!newQuestion.trim()) return; // 빈 문자열 방지
                            sendQuestion({user: user.userId, body: newQuestion});
                            setNewQuestion("");
                        }}
                    >
                        <Text className="text-sm">send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )

    function ChatContainer() {
        return (
            <FlatList
                data={question}
                keyExtractor={(item) => item._id} // convex에서 가져온 데이터라면 _id 사용
                renderItem={({ item }) => (
                    <View className="items-end pr-3">
                        <Text>{item.content}</Text>
                    </View>
                )}
                inverted
                contentContainerStyle={{ paddingTop: 100 }} // 입력창 공간 확보
            />
        )
    }
}
export default Chatbot
