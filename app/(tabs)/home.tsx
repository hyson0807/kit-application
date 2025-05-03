import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {router} from "expo-router";

const data = [
    {id: '1', component: <FeaturedKit/>},
    {id: '2', component: <CommunityPicks/>},
    {id: '3', component: <Else/>}
]


const MainHeader = () => {
    return (
        <View>
            <Image
                source={require('../../assets/images/mainbg.png')}
                style={{ width: '100%', height: 400 }}
                resizeMode="stretch"
            />
        </View>
    )
}

const Home = () => {
    return (
        <View className="flex-1 bg-white">
            <View className="flex-row justify-between items-center px-6 my-2">
                <Text className="text-black font-bold text-xl">KIT</Text>
                <MaterialIcons name="language" size={24} color="black" />
            </View>
            <FlatList
                data={data}
                renderItem={({item})=> item.component}
                keyExtractor={(item)=> item.id}
                ListHeaderComponent={<MainHeader />}
            >

            </FlatList>
        </View>
    )
}

    function CommunityPicks() {
        return (
            <View className='flex-1 mb-5'>
                <View className='my-4 px-4'>
                    <Text className='text-black font-bold text-xl'>Community Picks</Text>
                </View>

                <View className='flex-row bg-white rounded-lg w-[90%] mx-auto'>
                    <View className='items-center w-1/2 mt-2'>
                        <TouchableOpacity className='items-center justify-center' style={{ width: 150 }} onPress={() => console.log('KIT for Travelers')}>
                            <Image
                                source={require('../../assets/images/travel.png')}
                                style={{ width: '100%', height: 150 }}
                                resizeMode="contain"
                            />
                            <Text className='text-lg my-2'>KIT for Travelers</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='items-center w-1/2 mt-2'>
                        <TouchableOpacity className='items-center justify-center' style={{ width: 150 }} onPress={() => console.log('KIT for Style')}>
                            <Image
                                source={require('../../assets/images/community.png')}
                                style={{ width: '100%', height: 150 }}
                                resizeMode="contain"
                            />
                            <Text className='text-lg my-2'>Community</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
}

function FeaturedKit() {
    return (
        <View className='flex-1 mb-5'>
            <View className='my-4 px-4'>
                <Text className='text-black font-bold text-xl'>Featured Kit</Text>
            </View>

            <View className='flex-row bg-white rounded-lg w-[90%] mx-auto'>
                <View className='items-center w-1/2 mt-2'>
                    <TouchableOpacity
                        className='items-center justify-center'
                        style={{ width: 150 }}
                        onPress={() => console.log('KIT for Foodies')}
                    >
                        <Image
                            source={require('../../assets/images/Foodies.png')}
                            style={{ width: 150, height: 150 }}
                            resizeMode="contain"
                        />
                        <Text className='text-lg my-2'>KIT for Foodies</Text>
                    </TouchableOpacity>
                </View>
                <View className='items-center w-1/2 mt-2'>
                    <TouchableOpacity className='items-center justify-center' style={{ width: 150 }} onPress={() => console.log('KIT for Style')}>
                        <Image
                            source={require('../../assets/images/style.png')}
                            style={{ width: 150, height: 150 }}
                            resizeMode="contain"
                        />
                        <Text className='text-lg my-2'>KIT for Style</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

function Else() {
    return (
        <View className='flex-1 mb-5'>
            <View className='my-4 px-4'>
                <Text className='text-black font-bold text-xl'>Else</Text>
            </View>

            <View className='flex-row bg-white rounded-lg w-[90%] mx-auto'>
                <View className='items-center w-1/2 mt-2'>
                    <Image
                        source={require('../../assets/images/Foodies.png')}
                        style={{ width: '100%', height: 150 }}
                        resizeMode="contain"
                    />
                    <Text className='text-lg my-2'>KIT for Foodies</Text>
                </View>
                <View className='items-center w-1/2 mt-2'>
                    <Image
                        source={require('../../assets/images/style.png')}
                        style={{ width: '100%', height: 150 }}
                        resizeMode="contain"
                    />
                    <Text className='text-lg my-2'>KIT for Style</Text>
                </View>
            </View>

        </View>
    )
}
export default Home
