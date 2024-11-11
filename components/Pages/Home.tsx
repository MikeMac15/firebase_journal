import { Text, View, StyleSheet, Button } from 'react-native'
import { useUser } from '../Context/UserContext';
import { useState } from 'react';
import WelcomeAnimation from './IntroAnimation';
import Calendar from './HomeUI/Calendar';
import NewEntryButton from './HomeUI/NewEntryButton';

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    const { user, signOut } = useUser();
    const [showIntroAnimation, setShowIntroAnimation] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>("");
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
            showIntroAnimation ?
                <WelcomeAnimation setShowAnimation={setShowIntroAnimation} />
            :
            <>
                <Text>Welcome back, {user.displayName}!</Text>
                <Calendar setDate={setSelectedDate} />
                <NewEntryButton />
            <Button title="Sign Out" onPress={signOut} />
            </>
            }
        </View>
    )
}

export default Home;



const styles = StyleSheet.create({
    container: {

    },

})