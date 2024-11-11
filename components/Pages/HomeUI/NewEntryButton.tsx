import { extraStyles, styles } from '@/Styles/Styles';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
interface NewEntryButtonProps {

}

const NewEntryButton: React.FC<NewEntryButtonProps> = ({ }) => {
    return (
        <TouchableOpacity style={[styles2.container,extraStyles.pinkShadow]} activeOpacity={0.8}>
            <MaterialCommunityIcons style={{marginLeft:5}} name="pencil-plus-outline" size={24} color="#f797b7" />
        </TouchableOpacity>
    )
}

export default NewEntryButton;



const styles2 = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: '14%',
        height: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

})