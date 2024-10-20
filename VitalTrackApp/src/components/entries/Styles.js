import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C',
        padding: 20,
    },
    header: {
        backgroundColor: '#4c4c4c',
        width: '90%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: 10,
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#7BB7E0',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#DE0F3F',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },

 
  
 
  
  
    logButton: {
        backgroundColor: '#de0f3f',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    logButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    entryCard: {
        backgroundColor: '#4c4c4c',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    entryContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
 
    date: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noEntriesText: {
        color: '#ffffff',
    },
    wellBeingIcons: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        tintColor: '#ffffff',
    },
    wellbeing: {
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
    },

    // Additional styles for Carousel
    slide: {
        flex: 1,
        justifyContent: 'center', // Centers content vertically within each slide
        alignItems: 'center', // Centers content horizontally
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#333', // Background color for carousel slides
        marginVertical: 10, // Adds vertical spacing between slides
    },

    // Pagination (dots) for Carousel
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10, // Add margin above the pagination dots
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
    },
    activeDot: {
        backgroundColor: '#7BB7E0', // Active dot color (matches the app's theme)
    },
    inactiveDot: {
        backgroundColor: '#C4C4C4', // Inactive dot color (gray)
    },

 
    textContent: {
        flexDirection: 'column',
    },
    summary: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 5,
    },
 
    icon: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        tintColor: '#ffffff',
    },
});

export default styles;
