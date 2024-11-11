import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import dayjs from "dayjs";
import { extraStyles } from "@/Styles/Styles";


interface CalendarProps {
    setDate: React.Dispatch<React.SetStateAction<string>>;
    // dates: string[];
}

// const Calendar: React.FC<CalendarProps> = ({setDate, dates}) => {
const Calendar: React.FC<CalendarProps> = ({setDate}) => {
   

    // const customDatesStyles = dates.map(date => ({
    //     date: dayjs(date).toDate(),  // Convert to a JavaScript Date in local time
    //     style: { backgroundColor: "#fac8d4" },
    //     textStyle: { color: "black", fontWeight: "bold" as "bold" },
    // }));

    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

    const onDateChange = (date: Date) => {
        setSelectedStartDate(date);

        const formattedDate = dayjs(date).format("YYYY-MM-DD"); // Format as YYYY-MM-DD for consistent lookup
        setDate(formattedDate);
        
    };

    const startDate = selectedStartDate ? dayjs(selectedStartDate).format("YYYY-MM-DD") : "";

    return (
        <View style={[styles.container,extraStyles.shadow]}>
        <View style={{transform:'scale(0.9)'}}>
            <CalendarPicker
                onDateChange={onDateChange}
                todayBackgroundColor="#ccc"
                todayTextStyle={{color:'black'}}
                selectedDayColor="#333"
                selectedDayTextColor="#FFFFFF"
                // dayShape="square"
                textStyle={{fontSize:19}}
                // customDatesStyles={customDatesStyles}
            />

            <View style={styles.textContainer}>
                <Text>SELECTED DATE: {startDate}</Text>
                {selectedEntry && (
                    <Text style={styles.entryText}>Journal Entry: {selectedEntry}</Text>
                )}
            </View>
        </View>
        </View>
    );
};

export default Calendar;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        // transform:'scale(0.9)',
        backgroundColor:'white',
        borderRadius:10
        
    },
    textContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    entryText: {
        marginTop: 10,
        color: "#555",
        fontSize: 16,
    },
});

